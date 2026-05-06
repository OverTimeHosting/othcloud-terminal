/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/developers.css';
import { localize } from '../../../../nls.js';
import { $, append, clearNode, Dimension } from '../../../../base/browser/dom.js';
import { CancellationToken } from '../../../../base/common/cancellation.js';
import { DisposableStore } from '../../../../base/common/lifecycle.js';
import { EditorPane } from '../../../browser/parts/editor/editorPane.js';
import { IEditorOpenContext } from '../../../common/editor.js';
import { IEditorGroup } from '../../../services/editor/common/editorGroupsService.js';
import { IStorageService, StorageScope, StorageTarget } from '../../../../platform/storage/common/storage.js';
import { ITelemetryService } from '../../../../platform/telemetry/common/telemetry.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { DevelopersInput, DevelopersEditorOptions } from './developersInput.js';
import { STORAGE_TASKS_REV } from './developersActivityBar.js';

const STORAGE_NEW_TASK_PREFILL = 'othcloud.developers.newTaskPrefill';
import {
	DevelopersClient, DevelopersApiError, DevelopersAccessTokenMissingError,
	setAccessToken, getAccessToken,
	DevTask, DevMessage, DevChecklistItem, DevActivity, DevUser, DevService
} from './developersClient.js';
import { IAuthenticationService } from '../../../services/authentication/common/authentication.js';
import { IQuickInputService, IQuickPickItem } from '../../../../platform/quickinput/common/quickInput.js';
import { INotificationService, Severity } from '../../../../platform/notification/common/notification.js';
import { Schemas } from '../../../../base/common/network.js';
import { URI } from '../../../../base/common/uri.js';
import { IEditorService } from '../../../services/editor/common/editorService.js';
import { IEditorGroupsService } from '../../../services/editor/common/editorGroupsService.js';
import { BrowserViewUri } from '../../../../platform/browserView/common/browserViewUri.js';

const STORAGE_ACCESS_TOKEN = 'othcloud.developers.accessToken';
const STORAGE_JWT = 'othcloud.developers.jwt';
const STORAGE_USER = 'othcloud.developers.user';
const STORAGE_TASKS_LAYOUT = 'othcloud.developers.tasksLayout';

type TasksLayout = 'kanban' | 'table';

type View =
	| { kind: 'home' }
	| { kind: 'tasks' }
	| { kind: 'task'; taskId: number }
	| { kind: 'services' }
	| { kind: 'service'; serviceId: number };

export class DevelopersPage extends EditorPane {

	static readonly ID = 'othcloudDevelopersPage';

	private container!: HTMLElement;
	private mainArea!: HTMLElement;

	private jwt: string | null = null;
	private user: DevUser | null = null;
	private view: View = { kind: 'home' };
	private tasksLayout: TasksLayout = 'kanban';
	private _timerCleanup: (() => void) | null = null;

	constructor(
		group: IEditorGroup,
		@ITelemetryService telemetryService: ITelemetryService,
		@IThemeService themeService: IThemeService,
		@IStorageService private readonly _storage: IStorageService,
		@IAuthenticationService private readonly _authService: IAuthenticationService,
		@IQuickInputService private readonly _quickInput: IQuickInputService,
		@INotificationService private readonly _notification: INotificationService,
		@IEditorService private readonly _editorService: IEditorService,
		@IEditorGroupsService private readonly _editorGroupsService: IEditorGroupsService,
	) {
		super(DevelopersPage.ID, group, telemetryService, themeService, _storage);
		const storedToken = this._storage.get(STORAGE_ACCESS_TOKEN, StorageScope.APPLICATION) ?? null;
		setAccessToken(storedToken);
		this.jwt = this._storage.get(STORAGE_JWT, StorageScope.APPLICATION) ?? null;
		const cachedUser = this._storage.get(STORAGE_USER, StorageScope.APPLICATION);
		if (cachedUser) {
			try { this.user = JSON.parse(cachedUser) as DevUser; } catch { /* ignore */ }
		}
		const layout = this._storage.get(STORAGE_TASKS_LAYOUT, StorageScope.APPLICATION);
		if (layout === 'table' || layout === 'kanban') {
			this.tasksLayout = layout;
		}

		// Reflect external mutations to auth state (e.g. sign-out from the
		// Accounts dropdown) by reading storage and re-rendering.
		const storeFilter = this._register(new DisposableStore());
		this._register(
			this._storage.onDidChangeValue(StorageScope.APPLICATION, STORAGE_USER, storeFilter)(() => {
				const raw = this._storage.get(STORAGE_USER, StorageScope.APPLICATION);
				this.user = raw ? this.tryParseUser(raw) : null;
				this.jwt = this._storage.get(STORAGE_JWT, StorageScope.APPLICATION) ?? null;
				if (!this.user) {
					this.view = { kind: 'home' };
				}
				if (this.mainArea) {
					void this.renderMain();
				}
			}),
		);
	}

	private tryParseUser(raw: string): DevUser | null {
		try { return JSON.parse(raw) as DevUser; } catch { return null; }
	}

	/** Notify other UI surfaces (e.g. the activity-bar sidebar) that task data has changed. */
	private bumpTasksRev(): void {
		this._storage.store(STORAGE_TASKS_REV, String(Date.now()), StorageScope.APPLICATION, StorageTarget.MACHINE);
	}

	/**
	 * Open an http(s) URL inside the built-in othcloud browser editor instead
	 * of the system browser. If a browser group already exists, reuse it so
	 * we don't pile up new editor groups.
	 */
	private async openInInternalBrowser(url: string): Promise<void> {
		const targetGroup = (() => {
			for (const g of this._editorGroupsService.groups) {
				if (g.editors.some(e => e.resource?.scheme === Schemas.vscodeBrowser)) {
					return g;
				}
			}
			return this._editorGroupsService.activeGroup;
		})();
		await this._editorService.openEditor(
			{ resource: BrowserViewUri.forUrl(url), options: { pinned: true } },
			targetGroup.id,
		);
		if (!targetGroup.isLocked) {
			targetGroup.lock(true);
		}
	}

	protected createEditor(parent: HTMLElement): void {
		this.container = append(parent, $('.othcloud-developers'));
		this.mainArea = append(this.container, $('.dev-main'));
		void this.renderMain();
	}

	override async setInput(input: DevelopersInput, options: DevelopersEditorOptions | undefined, context: IEditorOpenContext, token: CancellationToken): Promise<void> {
		await super.setInput(input, options, context, token);
		const view = options?.view ?? input.initialView ?? 'home';
		const taskId = options?.taskId ?? input.initialTaskId;
		const serviceId = options?.serviceId ?? input.initialServiceId;
		if (taskId !== undefined) {
			this.view = { kind: 'task', taskId };
		} else if (serviceId !== undefined) {
			this.view = { kind: 'service', serviceId };
		} else if (view === 'services') {
			this.view = { kind: 'services' };
		} else if (view === 'tasks') {
			this.view = { kind: 'tasks' };
		} else {
			this.view = { kind: 'home' };
		}
		await this.renderMain();
	}

	override layout(dimension: Dimension): void {
		if (this.container) {
			this.container.style.width = `${dimension.width}px`;
			this.container.style.height = `${dimension.height}px`;
		}
	}

	override focus(): void {
		super.focus();
		this.container?.focus?.();
	}

	private applyAuth(token: string, user: DevUser): void {
		this.jwt = token;
		this.user = user;
		this._storage.store(STORAGE_JWT, token, StorageScope.APPLICATION, StorageTarget.MACHINE);
		this._storage.store(STORAGE_USER, JSON.stringify(user), StorageScope.APPLICATION, StorageTarget.MACHINE);
	}

	private signOut(): void {
		this.jwt = null;
		this.user = null;
		this._storage.remove(STORAGE_JWT, StorageScope.APPLICATION);
		this._storage.remove(STORAGE_USER, StorageScope.APPLICATION);
		this.view = { kind: 'home' };
		void this.renderMain();
	}

	// ---------- Main area ----------

	private async renderMain(): Promise<void> {
		// Tear down any per-view timers (e.g. the task timer ticker) before
		// the DOM is replaced — otherwise they leak ticking onto detached nodes.
		if (this._timerCleanup) {
			this._timerCleanup();
			this._timerCleanup = null;
		}
		clearNode(this.mainArea);

		if (!getAccessToken()) {
			this.renderAccessTokenGate();
			return;
		}

		if (!this.jwt || !this.user) {
			this.renderCenteredAuth();
			return;
		}

		if (this.view.kind === 'home') {
			this.renderHome();
		} else if (this.view.kind === 'tasks') {
			await this.renderTasksList();
		} else if (this.view.kind === 'task') {
			await this.renderTaskDetail(this.view.taskId);
		} else if (this.view.kind === 'services') {
			await this.renderServicesList();
		} else {
			await this.renderServiceDetail(this.view.serviceId);
		}
	}

	// ---------- Access token gate ----------

	private renderAccessTokenGate(): void {
		const center = append(this.mainArea, $('.dev-auth-center'));
		const card = append(center, $('.dev-auth-card'));

		append(card, $('h2.dev-auth-title', {}, localize('othcloud.dev.tokenTitle', 'Server access')));
		append(card, $('.dev-auth-sub', {}, localize(
			'othcloud.dev.tokenSub',
			'Enter the access token configured on the server (OTHCLOUD_ACCESS_TOKEN) to continue.',
		)));

		const form = append(card, $('.dev-form'));
		append(form, $('label', {}, localize('othcloud.dev.token', 'Access token')));
		const tokenInput = append(form, $('input')) as HTMLInputElement;
		tokenInput.type = 'password';
		tokenInput.autocomplete = 'off';

		const error = append(card, $('.dev-error'));
		error.style.display = 'none';

		const submit = append(card, $('button.dev-button.dev-auth-submit', {}, localize('othcloud.dev.continue', 'Continue'))) as HTMLButtonElement;

		const doSubmit = async () => {
			const tok = tokenInput.value.trim();
			if (!tok) {
				error.textContent = localize('othcloud.dev.tokenRequired', 'Token is required.');
				error.style.display = '';
				return;
			}
			setAccessToken(tok);
			this._storage.store(STORAGE_ACCESS_TOKEN, tok, StorageScope.APPLICATION, StorageTarget.MACHINE);
			await this.renderMain();
		};
		submit.onclick = doSubmit;
		tokenInput.onkeydown = (e) => { if (e.key === 'Enter') { void doSubmit(); } };
		tokenInput.focus();
	}

	private clearAccessToken(): void {
		setAccessToken(null);
		this._storage.remove(STORAGE_ACCESS_TOKEN, StorageScope.APPLICATION);
		// Clearing the access token also signs you out — JWTs are useless
		// without a way to send them through the gate.
		this.jwt = null;
		this.user = null;
		this._storage.remove(STORAGE_JWT, StorageScope.APPLICATION);
		this._storage.remove(STORAGE_USER, StorageScope.APPLICATION);
		this.view = { kind: 'home' };
		void this.renderMain();
	}

	// ---------- Centered auth (login + register) ----------

	private renderCenteredAuth(): void {
		let mode: 'login' | 'register' = 'login';
		const center = append(this.mainArea, $('.dev-auth-center'));
		const card = append(center, $('.dev-auth-card'));

		append(card, $('h2.dev-auth-title', {}, localize('othcloud.dev.account', 'othcloud account')));
		const sub = append(card, $('.dev-auth-sub'));
		const updateSub = () => {
			sub.textContent = mode === 'login'
				? localize('othcloud.dev.signInSub', 'Sign in to view and create tasks.')
				: localize('othcloud.dev.registerSub', 'Create an account to get started.');
		};

		const tabs = append(card, $('.dev-auth-tabs'));
		const loginTab = append(tabs, $('button', {}, localize('othcloud.dev.signIn', 'Sign in')));
		const registerTab = append(tabs, $('button', {}, localize('othcloud.dev.register', 'Register')));

		const form = append(card, $('.dev-form'));
		append(form, $('label', {}, localize('othcloud.dev.username', 'Username')));
		const usernameInput = append(form, $('input')) as HTMLInputElement;
		usernameInput.type = 'text';
		usernameInput.autocomplete = 'username';

		append(form, $('label', {}, localize('othcloud.dev.password', 'Password')));
		const passwordInput = append(form, $('input')) as HTMLInputElement;
		passwordInput.type = 'password';

		const error = append(card, $('.dev-error'));
		error.style.display = 'none';

		const submit = append(card, $('button.dev-button.dev-auth-submit')) as HTMLButtonElement;

		const changeTokenRow = append(card, $('.dev-auth-footer'));
		const changeTokenLink = append(changeTokenRow, $('button.dev-back', {}, localize('othcloud.dev.changeToken', 'Use a different access token'))) as HTMLButtonElement;
		changeTokenLink.onclick = () => this.clearAccessToken();

		const refreshTabs = () => {
			loginTab.classList.toggle('active', mode === 'login');
			registerTab.classList.toggle('active', mode === 'register');
			passwordInput.autocomplete = mode === 'login' ? 'current-password' : 'new-password';
			submit.textContent = mode === 'login'
				? localize('othcloud.dev.signIn', 'Sign in')
				: localize('othcloud.dev.createAccount', 'Create account');
			updateSub();
		};
		loginTab.onclick = () => { mode = 'login'; refreshTabs(); };
		registerTab.onclick = () => { mode = 'register'; refreshTabs(); };
		refreshTabs();

		const doSubmit = async () => {
			const u = usernameInput.value.trim();
			const p = passwordInput.value;
			if (!u || !p) {
				error.textContent = localize('othcloud.dev.required', 'Username and password are required.');
				error.style.display = '';
				return;
			}
			submit.disabled = true;
			error.style.display = 'none';
			try {
				const res = mode === 'login'
					? await DevelopersClient.login(u, p)
					: await DevelopersClient.register(u, p);
				this.applyAuth(res.token, res.user);
				this.view = { kind: 'home' };
				await this.renderMain();
			} catch (err) {
				if (err instanceof DevelopersApiError && err.status === 401 && /access token/i.test(err.message)) {
					// Bad access token — kick the user back to the token gate.
					this.clearAccessToken();
					return;
				}
				if (err instanceof DevelopersAccessTokenMissingError) {
					this.clearAccessToken();
					return;
				}
				const msg = err instanceof DevelopersApiError ? err.message : String(err);
				error.textContent = msg;
				error.style.display = '';
				submit.disabled = false;
			}
		};
		submit.onclick = doSubmit;
		passwordInput.onkeydown = (e) => { if (e.key === 'Enter') { void doSubmit(); } };
		usernameInput.focus();
	}

	// ---------- Home (post sign-in default) ----------

	private renderHome(): void {
		const center = append(this.mainArea, $('.dev-auth-center'));
		const card = append(center, $('.dev-home-card'));
		append(card, $('h2.dev-auth-title', {}, localize(
			'othcloud.dev.welcome', 'Welcome, {0}', this.user!.username,
		)));
		append(card, $('p.dev-home-text', {}, localize(
			'othcloud.dev.homeBody', 'Your othcloud account is connected. Open the Tasks window from the Developers menu, or use the button below.',
		)));
		const row = append(card, $('.dev-home-actions'));
		const tasksBtn = append(row, $('button.dev-button', {}, localize('othcloud.dev.openTasks', 'Open Tasks Window'))) as HTMLButtonElement;
		const servicesBtn = append(row, $('button.dev-button.secondary', {}, localize('othcloud.dev.openServices', 'Open Services'))) as HTMLButtonElement;
		const signOutBtn = append(row, $('button.dev-button.secondary', {}, localize('othcloud.dev.signOutAction', 'Sign out'))) as HTMLButtonElement;
		tasksBtn.onclick = () => {
			this.view = { kind: 'tasks' };
			void this.renderMain();
		};
		servicesBtn.onclick = () => {
			this.view = { kind: 'services' };
			void this.renderMain();
		};
		signOutBtn.onclick = () => this.signOut();
	}

	// ---------- Kanban board ----------

	private static readonly KANBAN_COLUMNS: ReadonlyArray<{ status: string; label: string }> = [
		{ status: 'open', label: 'Open' },
		{ status: 'in_progress', label: 'In Progress' },
		{ status: 'done', label: 'Done' },
	];

	private async renderTasksList(): Promise<void> {
		const toolbar = append(this.mainArea, $('.dev-tasks-toolbar'));
		append(toolbar, $('strong', {}, localize('othcloud.dev.tasksTitle', 'Tasks')));
		append(toolbar, $('span.spacer'));

		const layoutGroup = append(toolbar, $('.dev-layout-toggle'));
		const kanbanBtn = append(layoutGroup, $('button.dev-layout-btn', {}, localize('othcloud.dev.kanban', 'Kanban'))) as HTMLButtonElement;
		const tableBtn = append(layoutGroup, $('button.dev-layout-btn', {}, localize('othcloud.dev.table', 'Table'))) as HTMLButtonElement;
		const reflectLayout = () => {
			kanbanBtn.classList.toggle('active', this.tasksLayout === 'kanban');
			tableBtn.classList.toggle('active', this.tasksLayout === 'table');
		};
		reflectLayout();

		const refresh = append(toolbar, $('button.dev-button.secondary', {}, localize('othcloud.dev.refresh', 'Refresh'))) as HTMLButtonElement;
		const newBtn = append(toolbar, $('button.dev-button', {}, localize('othcloud.dev.newTask', 'New task'))) as HTMLButtonElement;

		const body = append(this.mainArea, $('.dev-tasks-body'));
		append(body, $('.dev-empty', {}, localize('othcloud.dev.loading', 'Loading…')));

		const load = async () => {
			clearNode(body);
			try {
				// Fetch services in parallel so we can show "Service: <name>"
				// chips on tasks. We swallow service-list errors so the tasks
				// view still renders even if the user has no service access.
				const [tasks, services] = await Promise.all([
					DevelopersClient.listTasks(this.jwt!),
					DevelopersClient.listServices(this.jwt!).catch(() => [] as DevService[]),
				]);
				const serviceMap = new Map<number, string>(services.map(s => [s.id, s.title]));
				clearNode(body);
				if (this.tasksLayout === 'table') {
					this.renderTasksTable(body, tasks, serviceMap, load);
				} else {
					this.renderTasksKanban(body, tasks, serviceMap, load);
				}
			} catch (err) {
				clearNode(body);
				const msg = err instanceof DevelopersApiError ? err.message : String(err);
				append(body, $('.dev-error', {}, msg));
			}
		};

		const setLayout = (l: TasksLayout) => {
			if (this.tasksLayout === l) { return; }
			this.tasksLayout = l;
			this._storage.store(STORAGE_TASKS_LAYOUT, l, StorageScope.APPLICATION, StorageTarget.MACHINE);
			reflectLayout();
			void load();
		};
		kanbanBtn.onclick = () => setLayout('kanban');
		tableBtn.onclick = () => setLayout('table');

		refresh.onclick = () => void load();
		// The dialog clears the main area, so cancel/create must rebuild the
		// whole tasks view rather than re-using `load` (which writes into a
		// node that no longer exists).
		newBtn.onclick = () => void this.openNewTaskDialog(async () => {
			this.view = { kind: 'tasks' };
			await this.renderMain();
		});
		void load();

		// If the editor's "Create Task from Selection" command stashed a
		// prefill, immediately open the new-task dialog and consume it.
		const prefillRaw = this._storage.get(STORAGE_NEW_TASK_PREFILL, StorageScope.APPLICATION);
		if (prefillRaw) {
			this._storage.remove(STORAGE_NEW_TASK_PREFILL, StorageScope.APPLICATION);
			try {
				const prefill = JSON.parse(prefillRaw) as { title?: string; description?: string };
				void this.openNewTaskDialog(async () => {
					this.view = { kind: 'tasks' };
					await this.renderMain();
				}, prefill);
			} catch { /* ignore bad payload */ }
		}
	}

	private renderTasksKanban(parent: HTMLElement, tasks: DevTask[], serviceMap: Map<number, string>, reload: () => Promise<void>): void {
		const board = append(parent, $('.dev-kanban'));
		const buckets = new Map<string, DevTask[]>();
		for (const col of DevelopersPage.KANBAN_COLUMNS) {
			buckets.set(col.status, []);
		}
		for (const t of tasks) {
			const status = buckets.has(t.status) ? t.status : 'open';
			buckets.get(status)!.push(t);
		}
		for (const col of DevelopersPage.KANBAN_COLUMNS) {
			this.renderKanbanColumn(board, col.status, col.label, buckets.get(col.status) ?? [], serviceMap, reload);
		}
	}

	private renderTasksTable(parent: HTMLElement, tasks: DevTask[], _serviceMap: Map<number, string>, reload: () => Promise<void>): void {
		if (tasks.length === 0) {
			append(parent, $('.dev-empty', {}, localize('othcloud.dev.noTasks', 'No tasks yet. Create one to get started.')));
			return;
		}
		const wrap = append(parent, $('.dev-table-wrap'));
		const table = append(wrap, $('table.dev-table')) as HTMLTableElement;

		const head = append(table, $('thead'));
		const headRow = append(head, $('tr'));
		for (const h of [
			localize('othcloud.dev.colId', '#'),
			localize('othcloud.dev.colTitle', 'Title'),
			localize('othcloud.dev.colStatus', 'Status'),
			localize('othcloud.dev.colAssignee', 'Assignee'),
			localize('othcloud.dev.colCreator', 'Creator'),
			localize('othcloud.dev.colUpdated', 'Updated'),
			'',
		]) {
			append(headRow, $('th', {}, h));
		}
		const body = append(table, $('tbody'));
		for (const t of tasks) {
			const row = append(body, $('tr.dev-table-row'));
			row.onclick = (e) => {
				const target = e.target as HTMLElement;
				if (target.closest('select') || target.closest('.dev-service-chip')) { return; }
				this.view = { kind: 'task', taskId: t.id };
				void this.renderMain();
			};
			append(row, $('td.dev-col-id', {}, '#' + t.id));
			append(row, $('td.dev-col-title', {}, t.title));

			const statusTd = append(row, $('td'));
			const select = append(statusTd, $('select.dev-select')) as HTMLSelectElement;
			for (const col of DevelopersPage.KANBAN_COLUMNS) {
				const opt = document.createElement('option');
				opt.value = col.status;
				opt.textContent = col.label;
				if (col.status === t.status) { opt.selected = true; }
				select.appendChild(opt);
			}
			select.onclick = (e) => e.stopPropagation();
			select.onchange = async () => {
				const previous = t.status;
				select.disabled = true;
				try {
					await DevelopersClient.patchTask(this.jwt!, t.id, { status: select.value });
					this.bumpTasksRev();
					await reload();
				} catch {
					select.value = previous;
					select.disabled = false;
				}
			};

			append(row, $('td', {}, t.assigneeUsername ?? '—'));
			append(row, $('td', {}, t.creatorUsername));
			append(row, $('td.dev-col-updated', {}, formatTime(t.updatedAt)));
			append(row, $('td'));
		}
	}

	private renderKanbanColumn(parent: HTMLElement, status: string, label: string, tasks: DevTask[], serviceMap: Map<number, string>, reload: () => Promise<void>): void {
		const col = append(parent, $('.dev-kanban-col'));
		const head = append(col, $('.dev-kanban-head'));
		append(head, $('span.label', {}, label));
		append(head, $('span.count', {}, String(tasks.length)));

		const list = append(col, $('.dev-kanban-list'));
		if (tasks.length === 0) {
			append(list, $('.dev-kanban-empty', {}, localize('othcloud.dev.kanbanEmpty', 'No tasks')));
			return;
		}
		for (const t of tasks) {
			this.renderKanbanCard(list, t, status, serviceMap, reload);
		}
	}

	private renderKanbanCard(parent: HTMLElement, t: DevTask, status: string, serviceMap: Map<number, string>, reload: () => Promise<void>): void {
		const card = append(parent, $('.dev-kanban-card'));
		card.onclick = (e) => {
			// Don't trigger when the user clicks a status-move button or the service chip.
			const target = e.target as HTMLElement;
			if (target.closest('.dev-kanban-move') || target.closest('.dev-service-chip')) {
				return;
			}
			this.view = { kind: 'task', taskId: t.id };
			void this.renderMain();
		};
		append(card, $('.title', {}, t.title));
		const metaText = t.assigneeUsername
			? localize('othcloud.dev.taskMeta', '#{0} · by {1} · for {2}', String(t.id), t.creatorUsername, t.assigneeUsername)
			: localize('othcloud.dev.taskMetaNoAssignee', '#{0} · by {1}', String(t.id), t.creatorUsername);
		append(card, $('.meta', {}, metaText));
		if (t.serviceId !== undefined) {
			const chip = append(card, $('button.dev-service-chip')) as HTMLButtonElement;
			const sname = serviceMap.get(t.serviceId) ?? `Service #${t.serviceId}`;
			chip.title = localize('othcloud.dev.openService', 'Open service "{0}"', sname);
			chip.textContent = '⛓ ' + sname;
			chip.onclick = (e) => {
				e.stopPropagation();
				this.view = { kind: 'service', serviceId: t.serviceId! };
				void this.renderMain();
			};
		}

		const moves = append(card, $('.dev-kanban-moves'));
		for (const target of DevelopersPage.KANBAN_COLUMNS) {
			if (target.status === status) { continue; }
			const btn = append(moves, $('button.dev-kanban-move', {}, '→ ' + target.label)) as HTMLButtonElement;
			btn.onclick = async (e) => {
				e.stopPropagation();
				btn.disabled = true;
				try {
					await DevelopersClient.patchTask(this.jwt!, t.id, { status: target.status });
					this.bumpTasksRev();
					await reload();
				} catch {
					btn.disabled = false;
				}
			};
		}
	}

	private async openNewTaskDialog(
		onCreated: () => Promise<void>,
		prefill?: { title?: string; description?: string; source?: { filePath: string; lineStart: number; lineEnd: number; snippet?: string } },
	): Promise<void> {
		// Render the form as an overlay-style card centered on the main area.
		clearNode(this.mainArea);
		const center = append(this.mainArea, $('.dev-auth-center'));
		const card = append(center, $('.dev-auth-card'));

		append(card, $('h2.dev-auth-title', {}, localize('othcloud.dev.newTask', 'New task')));

		const form = append(card, $('.dev-form'));
		append(form, $('label', {}, localize('othcloud.dev.title', 'Title')));
		const title = append(form, $('input')) as HTMLInputElement;
		if (prefill?.title) { title.value = prefill.title; }
		append(form, $('label', {}, localize('othcloud.dev.description', 'Description')));
		const desc = append(form, $('textarea.dev-textarea')) as HTMLTextAreaElement;
		desc.rows = 4;
		if (prefill?.description) { desc.value = prefill.description; }
		desc.placeholder = localize('othcloud.dev.descPlaceholder', 'Add details, links, anything useful…');
		append(form, $('label', {}, localize('othcloud.dev.assignToSelect', 'Assign to')));
		const assigneeSelect = append(form, $('select.dev-select')) as HTMLSelectElement;
		const noOpt = document.createElement('option');
		noOpt.value = '';
		noOpt.textContent = localize('othcloud.dev.unassigned', '(unassigned)');
		assigneeSelect.appendChild(noOpt);

		const error = append(card, $('.dev-error'));
		error.style.display = 'none';

		const buttons = append(card, $('div', { style: 'display: flex; gap: 6px; justify-content: flex-end;' }));
		const cancel = append(buttons, $('button.dev-button.secondary', {}, localize('othcloud.dev.cancel', 'Cancel'))) as HTMLButtonElement;
		const submit = append(buttons, $('button.dev-button', {}, localize('othcloud.dev.create', 'Create'))) as HTMLButtonElement;

		// Populate the user list. If it fails, fall back to a free-text input.
		try {
			const users = await DevelopersClient.listUsers(this.jwt!);
			for (const u of users) {
				const opt = document.createElement('option');
				opt.value = u.username;
				opt.textContent = u.username + (u.id === this.user!.id ? ' (you)' : '');
				assigneeSelect.appendChild(opt);
			}
		} catch (err) {
			error.textContent = (err instanceof DevelopersApiError ? err.message : String(err));
			error.style.display = '';
		}

		// Show a small banner when a code source was captured so the user
		// knows it'll be saved on the task.
		if (prefill?.source) {
			const banner = append(card, $('.dev-source-banner'));
			const fileName = prefill.source.filePath.split('/').pop() ?? prefill.source.filePath;
			banner.textContent = localize(
				'othcloud.dev.sourceCaptured',
				'📎 Linked source: {0}:{1}-{2}',
				fileName, String(prefill.source.lineStart), String(prefill.source.lineEnd),
			);
		}

		cancel.onclick = () => void onCreated();
		submit.onclick = async () => {
			if (!title.value.trim()) {
				error.textContent = localize('othcloud.dev.titleRequired', 'Title is required.');
				error.style.display = '';
				return;
			}
			submit.disabled = true;
			try {
				await DevelopersClient.createTask(
					this.jwt!, title.value.trim(), desc.value, assigneeSelect.value || undefined,
					undefined, prefill?.source,
				);
				this.bumpTasksRev();
				await onCreated();
			} catch (err) {
				const msg = err instanceof DevelopersApiError ? err.message : String(err);
				error.textContent = msg;
				error.style.display = '';
				submit.disabled = false;
			}
		};
		title.focus();
	}

	// ---------- Task detail ----------

	private async renderTaskDetail(taskId: number): Promise<void> {
		const wrap = append(this.mainArea, $('.dev-detail'));
		const main = append(wrap, $('.dev-detail-main'));
		const aside = append(wrap, $('.dev-detail-aside'));

		const header = append(main, $('.dev-detail-header'));
		const back = append(header, $('button.dev-back', {}, '← ' + localize('othcloud.dev.backToList', 'Back to tasks'))) as HTMLButtonElement;
		back.onclick = () => { this.view = { kind: 'tasks' }; void this.renderMain(); };
		const titleEl = append(header, $('h2', {}, '…'));
		const metaEl = append(header, $('.meta', {}, ''));

		// Description section: read-only by default, click "Edit" to reveal a
		// resizable textarea + save/cancel.
		const descSection = append(main, $('.dev-desc-section'));
		const descHeader = append(descSection, $('.dev-desc-header'));
		append(descHeader, $('h4', {}, localize('othcloud.dev.description', 'Description')));
		const descEditBtn = append(descHeader, $('button.dev-back', {}, localize('othcloud.dev.edit', 'Edit'))) as HTMLButtonElement;
		const descView = append(descSection, $('.dev-desc-view'));

		const chat = append(main, $('.dev-chat'));
		const chatMessages = append(chat, $('.dev-chat-messages'));
		const chatInputWrap = append(chat, $('.dev-chat-input'));
		const fileInput = append(chatInputWrap, $('input.dev-chat-file')) as HTMLInputElement;
		fileInput.type = 'file';
		fileInput.accept = 'image/png,image/jpeg,image/gif,image/webp,image/svg+xml';
		fileInput.style.display = 'none';
		const attachBtn = append(chatInputWrap, $('button.dev-button.secondary', {}, '📎')) as HTMLButtonElement;
		attachBtn.title = localize('othcloud.dev.attachImage', 'Attach an image');
		attachBtn.onclick = () => fileInput.click();
		const chatInput = append(chatInputWrap, $('input')) as HTMLInputElement;
		chatInput.placeholder = localize('othcloud.dev.chatPlaceholder', 'Write a message — prefix with /check to add a checklist item');
		const sendBtn = append(chatInputWrap, $('button.dev-button', {}, localize('othcloud.dev.send', 'Send'))) as HTMLButtonElement;

		// Source (jump-to-file) — only rendered when the task has one
		const sourceSection = append(aside, $('.dev-aside-section'));
		append(sourceSection, $('h4', {}, localize('othcloud.dev.source', 'Source')));
		const sourceContent = append(sourceSection, $('div'));
		sourceSection.style.display = 'none';

		// Time tracker (shown above the checklist)
		const timeSection = append(aside, $('.dev-aside-section'));
		append(timeSection, $('h4', {}, localize('othcloud.dev.timeTracking', 'Time')));
		const timeContent = append(timeSection, $('.dev-time-content'));
		const timeTotalEl = append(timeContent, $('.dev-time-total', {}, '0:00:00'));
		const timeRunningEl = append(timeContent, $('.dev-time-running'));
		timeRunningEl.style.display = 'none';
		const timeBtn = append(timeContent, $('button.dev-button', {}, localize('othcloud.dev.startTimer', 'Start timer'))) as HTMLButtonElement;

		// Linked commits (above checklist)
		const commitsSection = append(aside, $('.dev-aside-section'));
		const commitsHeader = append(commitsSection, $('.dev-desc-header'));
		append(commitsHeader, $('h4', {}, localize('othcloud.dev.linkedCommits', 'Linked commits')));
		const addCommitBtn = append(commitsHeader, $('button.dev-back', {}, localize('othcloud.dev.linkCommit', 'Link'))) as HTMLButtonElement;
		const commitsList = append(commitsSection, $('div'));

		const checklistSection = append(aside, $('.dev-aside-section'));
		append(checklistSection, $('h4', {}, localize('othcloud.dev.checklist', 'Checklist')));
		const checklistList = append(checklistSection, $('div'));

		const activitySection = append(aside, $('.dev-aside-section.activity'));
		append(activitySection, $('h4', {}, localize('othcloud.dev.activity', 'Activity')));
		const activityList = append(activitySection, $('div'));

		let task: DevTask | null = null;
		const renderDescription = () => {
			clearNode(descView);
			if (!task) { return; }
			const text = task.description.trim();
			if (text.length === 0) {
				append(descView, $('.dev-desc-empty', {}, localize('othcloud.dev.descEmpty', 'No description yet.')));
			} else {
				renderMarkdownInto(append(descView, $('.dev-desc-render')), text);
			}
			descEditBtn.disabled = false;
			descEditBtn.textContent = localize('othcloud.dev.edit', 'Edit');
		};
		const beginEditDescription = () => {
			if (!task) { return; }
			clearNode(descView);
			const ta = append(descView, $('textarea.dev-textarea')) as HTMLTextAreaElement;
			ta.rows = 6;
			ta.value = task.description;
			ta.placeholder = localize('othcloud.dev.descPlaceholder', 'Add details, links, anything useful…');
			const row = append(descView, $('.dev-desc-edit-actions'));
			const save = append(row, $('button.dev-button', {}, localize('othcloud.dev.save', 'Save'))) as HTMLButtonElement;
			const cancel = append(row, $('button.dev-button.secondary', {}, localize('othcloud.dev.cancel', 'Cancel'))) as HTMLButtonElement;
			descEditBtn.disabled = true;
			cancel.onclick = () => renderDescription();
			save.onclick = async () => {
				save.disabled = true;
				cancel.disabled = true;
				try {
					const updated = await DevelopersClient.patchTask(this.jwt!, taskId, { description: ta.value });
					task = updated;
					this.bumpTasksRev();
					renderDescription();
					void loadActivity();
				} catch {
					save.disabled = false;
					cancel.disabled = false;
				}
			};
			ta.focus();
		};
		descEditBtn.onclick = () => beginEditDescription();

		const loadHeader = async () => {
			task = await DevelopersClient.getTask(this.jwt!, taskId);
			titleEl.textContent = task.title;
			const metaText = task.assigneeUsername
				? localize('othcloud.dev.taskMetaFull', '#{0} · by {1} · for {2} · {3}', String(task.id), task.creatorUsername, task.assigneeUsername, task.status)
				: localize('othcloud.dev.taskMetaFullNoAssignee', '#{0} · by {1} · {2}', String(task.id), task.creatorUsername, task.status);
			metaEl.textContent = metaText;
			renderDescription();
			renderCommits();
			renderSource();
		};

		const renderSource = () => {
			clearNode(sourceContent);
			if (!task || !task.source) {
				sourceSection.style.display = 'none';
				return;
			}
			sourceSection.style.display = '';
			const src = task.source;
			const fileName = src.filePath.split('/').pop() ?? src.filePath;
			const link = append(sourceContent, $('button.dev-source-link')) as HTMLButtonElement;
			link.textContent = `${fileName}:${src.lineStart}-${src.lineEnd}`;
			link.title = src.filePath;
			link.onclick = async () => {
				try {
					await this._editorService.openEditor({
						resource: URI.parse(src.filePath),
						options: {
							pinned: false,
							selection: {
								startLineNumber: src.lineStart,
								startColumn: 1,
								endLineNumber: src.lineEnd,
								endColumn: 1,
							},
						},
					});
				} catch (err) {
					this._notification.notify({ severity: Severity.Error, message: String((err as Error).message ?? err) });
				}
			};
			if (src.snippet) {
				const pre = append(sourceContent, $('pre.dev-source-snippet'));
				pre.textContent = src.snippet;
			}
		};

		const renderMessages = (msgs: DevMessage[]) => {
			clearNode(chatMessages);
			for (const m of msgs) {
				const node = append(chatMessages, $('.dev-chat-message'));
				if (m.authorId === this.user!.id) {
					node.classList.add('mine');
				}
				append(node, $('.author', {}, `${m.authorUsername} · ${formatTime(m.createdAt)}`));
				if (m.body) {
					append(node, $('.body', {}, m.body));
				}
				if (m.attachmentId !== undefined) {
					const imgWrap = append(node, $('.attachment'));
					const img = append(imgWrap, $('img.dev-chat-image')) as HTMLImageElement;
					img.alt = m.attachmentName ?? 'attachment';
					DevelopersClient.fetchAttachmentBlobUrl(this.jwt!, m.attachmentId).then(
						url => { img.src = url; },
						() => { imgWrap.textContent = localize('othcloud.dev.attachmentFailed', '(image failed to load)'); },
					);
				}
			}
			chatMessages.scrollTop = chatMessages.scrollHeight;
		};

		const renderChecklist = (items: DevChecklistItem[]) => {
			clearNode(checklistList);
			if (items.length === 0) {
				append(checklistList, $('.dev-activity-row', {}, localize('othcloud.dev.checklistEmpty', 'No items yet.')));
				return;
			}
			for (const it of items) {
				const row = append(checklistList, $('.dev-checklist-item'));
				const cb = append(row, $('input')) as HTMLInputElement;
				cb.type = 'checkbox';
				cb.checked = it.done;
				const label = append(row, $('span.label', {}, it.label));
				if (it.done) { label.classList.add('done'); }
				cb.onchange = async () => {
					try {
						await DevelopersClient.setChecklistDone(this.jwt!, taskId, it.id, cb.checked);
						this.bumpTasksRev();
						label.classList.toggle('done', cb.checked);
						void loadActivity();
					} catch {
						cb.checked = !cb.checked;
					}
				};
			}
		};

		const renderActivity = (items: DevActivity[]) => {
			clearNode(activityList);
			if (items.length === 0) {
				append(activityList, $('.dev-activity-row', {}, localize('othcloud.dev.activityEmpty', 'No activity yet.')));
				return;
			}
			for (const a of items) {
				const row = append(activityList, $('.dev-activity-row'));
				append(row, $('span.who', {}, a.actorName));
				append(row, $('span', {}, ' ' + describeActivity(a) + ' · ' + formatTime(a.createdAt)));
			}
		};

		const loadMessages = async () => {
			try {
				const msgs = await DevelopersClient.listMessages(this.jwt!, taskId);
				renderMessages(msgs);
			} catch { /* ignore */ }
		};
		const loadChecklist = async () => {
			try {
				const items = await DevelopersClient.listChecklist(this.jwt!, taskId);
				renderChecklist(items);
			} catch { /* ignore */ }
		};
		const loadActivity = async () => {
			try {
				const items = await DevelopersClient.listActivity(this.jwt!, taskId);
				renderActivity(items);
			} catch { /* ignore */ }
		};

		// ---------- Time tracker ----------

		let timeTickHandle: ReturnType<typeof setInterval> | null = null;
		const stopTick = () => { if (timeTickHandle !== null) { clearInterval(timeTickHandle); timeTickHandle = null; } };
		// Make sure ticking stops when the view changes (renderMain replaces DOM).
		this._timerCleanup = stopTick;

		const renderTimer = (summary: import('./developersClient.js').DevTaskTime) => {
			stopTick();
			const baseSec = summary.totalSec;
			const running = summary.running;
			const update = () => {
				const extra = running ? Math.floor((Date.now() - new Date(running.startAt).getTime()) / 1000) : 0;
				timeTotalEl.textContent = formatDuration(baseSec + extra);
			};
			update();
			if (running) {
				timeRunningEl.style.display = '';
				timeRunningEl.textContent = localize('othcloud.dev.timerRunning', 'Running since {0}', new Date(running.startAt).toLocaleTimeString());
				timeBtn.textContent = localize('othcloud.dev.stopTimer', 'Stop timer');
				timeTickHandle = setInterval(update, 1000);
			} else {
				timeRunningEl.style.display = 'none';
				timeBtn.textContent = localize('othcloud.dev.startTimer', 'Start timer');
			}
		};
		const loadTime = async () => {
			try {
				const summary = await DevelopersClient.getTaskTime(this.jwt!, taskId);
				renderTimer(summary);
			} catch { /* ignore */ }
		};
		timeBtn.onclick = async () => {
			timeBtn.disabled = true;
			try {
				const summary = await DevelopersClient.getTaskTime(this.jwt!, taskId);
				if (summary.running) {
					await DevelopersClient.stopTimer(this.jwt!, taskId);
				} else {
					await DevelopersClient.startTimer(this.jwt!, taskId);
				}
				await loadTime();
				await loadActivity();
				this.bumpTasksRev();
			} finally {
				timeBtn.disabled = false;
			}
		};

		// ---------- Linked commits ----------

		const renderCommits = () => {
			clearNode(commitsList);
			if (!task || !task.commits || task.commits.length === 0) {
				append(commitsList, $('.dev-activity-row', {}, localize('othcloud.dev.noCommits', 'No commits linked yet.')));
				return;
			}
			for (const c of task.commits) {
				const row = append(commitsList, $('.dev-repo-row'));
				const link = append(row, $('a')) as HTMLAnchorElement;
				link.href = c.url;
				link.title = c.url;
				link.textContent = (c.repoFullName ? c.repoFullName + '@' : '') + c.sha.substring(0, 7);
				link.onclick = (e) => {
					e.preventDefault();
					void this.openInInternalBrowser(c.url);
				};
				// PR finder: only meaningful for GitHub-hosted commits with a parsed repo.
				if (c.repoFullName && c.url.includes('github.com')) {
					const pr = append(row, $('button.dev-back', {}, 'PR')) as HTMLButtonElement;
					pr.title = localize('othcloud.dev.findPr', 'Find pull request for this commit');
					pr.onclick = async () => {
						pr.disabled = true;
						try {
							const prUrl = await this.findGithubPullForCommit(c.repoFullName!, c.sha);
							if (prUrl) {
								await this.openInInternalBrowser(prUrl);
							} else {
								this._notification.notify({ severity: Severity.Info, message: localize('othcloud.dev.noPrForCommit', 'No pull request found for that commit.') });
							}
						} catch (err) {
							this._notification.notify({ severity: Severity.Error, message: String((err as Error).message ?? err) });
						} finally {
							pr.disabled = false;
						}
					};
				}
				const del = append(row, $('button.dev-back', {}, '×')) as HTMLButtonElement;
				del.title = localize('othcloud.dev.unlinkCommit', 'Unlink');
				del.onclick = async () => {
					del.disabled = true;
					try {
						await DevelopersClient.removeCommit(this.jwt!, taskId, c.id);
						task = await DevelopersClient.getTask(this.jwt!, taskId);
						renderCommits();
					} catch {
						del.disabled = false;
					}
				};
			}
		};
		addCommitBtn.onclick = async () => {
			const url = await this._quickInput.input({
				prompt: localize('othcloud.dev.commitUrlPrompt', 'Paste a commit URL (e.g. https://github.com/owner/repo/commit/<sha>)'),
				placeHolder: 'https://github.com/owner/repo/commit/abcdef1234',
			});
			if (!url) { return; }
			const parsed = parseCommitUrl(url.trim());
			if (!parsed) {
				this._notification.notify({ severity: Severity.Error, message: localize('othcloud.dev.commitUrlBad', 'Could not parse commit URL.') });
				return;
			}
			try {
				await DevelopersClient.addCommit(this.jwt!, taskId, parsed);
				task = await DevelopersClient.getTask(this.jwt!, taskId);
				renderCommits();
				void loadActivity();
			} catch (err) {
				const msg = err instanceof DevelopersApiError ? err.message : String(err);
				this._notification.notify({ severity: Severity.Error, message: msg });
			}
		};

		const send = async () => {
			const v = chatInput.value.trim();
			if (!v) { return; }
			chatInput.value = '';
			sendBtn.disabled = true;
			try {
				if (v.startsWith('/check ') && task && task.creatorId === this.user!.id) {
					const label = v.slice('/check '.length).trim();
					if (label) {
						await DevelopersClient.addChecklistItem(this.jwt!, taskId, label);
						await DevelopersClient.postMessage(this.jwt!, taskId, `[+] ${label}`);
					}
				} else {
					await DevelopersClient.postMessage(this.jwt!, taskId, v);
				}
				this.bumpTasksRev();
				await loadMessages();
				await loadChecklist();
				await loadActivity();
			} catch {
				chatInput.value = v;
			} finally {
				sendBtn.disabled = false;
			}
		};
		sendBtn.onclick = send;
		chatInput.onkeydown = (e) => { if (e.key === 'Enter') { void send(); } };

		fileInput.onchange = async () => {
			const file = fileInput.files?.[0];
			fileInput.value = '';
			if (!file) { return; }
			const caption = chatInput.value.trim();
			chatInput.value = '';
			attachBtn.disabled = true;
			sendBtn.disabled = true;
			try {
				await DevelopersClient.postMessageWithAttachment(this.jwt!, taskId, file, caption);
				this.bumpTasksRev();
				await loadMessages();
				await loadActivity();
			} catch (err) {
				chatInput.value = caption;
				const msg = err instanceof DevelopersApiError ? err.message : String(err);
				console.warn('image upload failed:', msg);
			} finally {
				attachBtn.disabled = false;
				sendBtn.disabled = false;
			}
		};

		// "Complete" button at the bottom of the detail view (main column).
		const completeBar = append(main, $('.dev-complete-bar'));
		const completeBtn = append(completeBar, $('button.dev-button.dev-complete-btn')) as HTMLButtonElement;
		const refreshCompleteBtn = () => {
			if (task && task.status === 'done') {
				completeBtn.textContent = localize('othcloud.dev.markIncomplete', 'Mark as not done');
				completeBtn.classList.add('secondary');
			} else {
				completeBtn.textContent = localize('othcloud.dev.complete', 'Complete task');
				completeBtn.classList.remove('secondary');
			}
		};
		completeBtn.onclick = async () => {
			if (!task) { return; }
			completeBtn.disabled = true;
			try {
				const next = task.status === 'done' ? 'open' : 'done';
				task = await DevelopersClient.patchTask(this.jwt!, taskId, { status: next });
				this.bumpTasksRev();
				refreshCompleteBtn();
				void loadActivity();
			} finally {
				completeBtn.disabled = false;
			}
		};

		await loadHeader();
		refreshCompleteBtn();
		await loadMessages();
		await loadChecklist();
		await loadActivity();
		await loadTime();
	}

	// ---------- Services list ----------

	private async renderServicesList(): Promise<void> {
		const toolbar = append(this.mainArea, $('.dev-tasks-toolbar'));
		append(toolbar, $('strong', {}, localize('othcloud.dev.servicesTitle', 'Services')));
		append(toolbar, $('span.spacer'));
		const refresh = append(toolbar, $('button.dev-button.secondary', {}, localize('othcloud.dev.refresh', 'Refresh'))) as HTMLButtonElement;
		const newBtn = append(toolbar, $('button.dev-button', {}, localize('othcloud.dev.newService', 'New service'))) as HTMLButtonElement;

		const body = append(this.mainArea, $('.dev-tasks-body'));
		const load = async () => {
			clearNode(body);
			append(body, $('.dev-empty', {}, localize('othcloud.dev.loading', 'Loading…')));
			try {
				const services = await DevelopersClient.listServices(this.jwt!);
				clearNode(body);
				if (services.length === 0) {
					append(body, $('.dev-empty', {}, localize('othcloud.dev.noServices', 'No services yet. Create one to get started.')));
					return;
				}
				const wrap = append(body, $('.dev-table-wrap'));
				const table = append(wrap, $('table.dev-table')) as HTMLTableElement;
				const head = append(table, $('thead'));
				const headRow = append(head, $('tr'));
				for (const h of [
					localize('othcloud.dev.colId', '#'),
					localize('othcloud.dev.colTitle', 'Title'),
					localize('othcloud.dev.colDescription', 'Description'),
					localize('othcloud.dev.colRepoCol', 'Repository'),
					localize('othcloud.dev.colCreator', 'Creator'),
					localize('othcloud.dev.colUpdated', 'Updated'),
				]) {
					append(headRow, $('th', {}, h));
				}
				const tbody = append(table, $('tbody'));
				for (const s of services) {
					const row = append(tbody, $('tr.dev-table-row'));
					row.onclick = (e) => {
						// Don't navigate when the user clicks the repo link itself.
						if ((e.target as HTMLElement).closest('a')) { return; }
						this.view = { kind: 'service', serviceId: s.id };
						void this.renderMain();
					};
					append(row, $('td.dev-col-id', {}, '#' + s.id));
					append(row, $('td.dev-col-title', {}, s.title));
					append(row, $('td', {}, (s.description || '').slice(0, 80)));

					const repoCell = append(row, $('td.dev-col-repos'));
					if (s.repos.length === 0) {
						append(repoCell, $('span.dev-col-repos-empty', {}, '—'));
					} else {
						const primary = s.repos[0];
						const link = append(repoCell, $('a')) as HTMLAnchorElement;
						link.href = primary.url;
						link.textContent = primary.name;
						link.title = primary.url;
						link.onclick = (e) => {
							e.stopPropagation();
							e.preventDefault();
							void this.openInInternalBrowser(primary.url);
						};
						if (s.repos.length > 1) {
							append(repoCell, $('span.dev-col-repos-extra', {}, ` +${s.repos.length - 1}`));
						}
					}

					append(row, $('td', {}, s.creatorUsername));
					append(row, $('td.dev-col-updated', {}, formatTime(s.updatedAt)));
				}
			} catch (err) {
				clearNode(body);
				const msg = err instanceof DevelopersApiError ? err.message : String(err);
				append(body, $('.dev-error', {}, msg));
			}
		};
		refresh.onclick = () => void load();
		newBtn.onclick = () => void this.openNewServiceDialog(load);
		void load();
	}

	private async openNewServiceDialog(onCreated: () => Promise<void>): Promise<void> {
		clearNode(this.mainArea);
		const center = append(this.mainArea, $('.dev-auth-center'));
		const card = append(center, $('.dev-auth-card'));

		append(card, $('h2.dev-auth-title', {}, localize('othcloud.dev.newService', 'New service')));

		const form = append(card, $('.dev-form'));
		append(form, $('label', {}, localize('othcloud.dev.title', 'Title')));
		const title = append(form, $('input')) as HTMLInputElement;
		append(form, $('label', {}, localize('othcloud.dev.description', 'Description')));
		const desc = append(form, $('textarea.dev-textarea')) as HTMLTextAreaElement;
		desc.rows = 4;

		// Optional repo to link at creation time (chosen via GitHub OAuth picker).
		append(form, $('label', {}, localize('othcloud.dev.repoOptional', 'GitHub repository (optional)')));
		const repoRow = append(form, $('.dev-repo-picker-row'));
		const pickedRepoLabel = append(repoRow, $('span.dev-repo-picked', {}, localize('othcloud.dev.noRepoPicked', '(none picked)')));
		const pickRepoBtn = append(repoRow, $('button.dev-button.secondary', {}, localize('othcloud.dev.pickRepoBtn', 'Pick a repo'))) as HTMLButtonElement;
		const clearRepoBtn = append(repoRow, $('button.dev-back', {}, localize('othcloud.dev.clearRepo', 'Clear'))) as HTMLButtonElement;
		clearRepoBtn.style.display = 'none';

		let pickedRepo: { name: string; url: string } | null = null;
		const refreshPickedLabel = () => {
			if (pickedRepo) {
				pickedRepoLabel.textContent = pickedRepo.name;
				clearRepoBtn.style.display = '';
			} else {
				pickedRepoLabel.textContent = localize('othcloud.dev.noRepoPicked', '(none picked)');
				clearRepoBtn.style.display = 'none';
			}
		};

		pickRepoBtn.onclick = async () => {
			pickRepoBtn.disabled = true;
			try {
				const choice = await this.pickGithubRepo();
				if (choice) {
					pickedRepo = choice;
					refreshPickedLabel();
				}
			} finally {
				pickRepoBtn.disabled = false;
			}
		};
		clearRepoBtn.onclick = () => { pickedRepo = null; refreshPickedLabel(); };

		const error = append(card, $('.dev-error'));
		error.style.display = 'none';

		const buttons = append(card, $('div', { style: 'display: flex; gap: 6px; justify-content: flex-end;' }));
		const cancel = append(buttons, $('button.dev-button.secondary', {}, localize('othcloud.dev.cancel', 'Cancel'))) as HTMLButtonElement;
		const submit = append(buttons, $('button.dev-button', {}, localize('othcloud.dev.create', 'Create'))) as HTMLButtonElement;

		const cleanup = () => {
			this.view = { kind: 'services' };
			void this.renderMain();
		};
		cancel.onclick = cleanup;
		submit.onclick = async () => {
			if (!title.value.trim()) {
				error.textContent = localize('othcloud.dev.titleRequired', 'Title is required.');
				error.style.display = '';
				return;
			}
			submit.disabled = true;
			try {
				const created = await DevelopersClient.createService(this.jwt!, title.value.trim(), desc.value);
				if (pickedRepo) {
					try {
						await DevelopersClient.addServiceRepo(this.jwt!, created.id, { ...pickedRepo, provider: 'github' });
					} catch { /* surface in service detail */ }
				}
				// Jump straight to the new service detail so the user can keep iterating.
				this.view = { kind: 'service', serviceId: created.id };
				await this.renderMain();
				await onCreated();
			} catch (err) {
				const msg = err instanceof DevelopersApiError ? err.message : String(err);
				error.textContent = msg;
				error.style.display = '';
				submit.disabled = false;
			}
		};
		title.focus();
	}

	/**
	 * Open the GitHub repo picker (re-uses VSCode's GitHub auth) and resolve
	 * to the chosen repo, or null if the user cancelled / sign-in failed.
	 */
	private async pickGithubRepo(): Promise<{ name: string; url: string } | null> {
		try {
			let sessions = await this._authService.getSessions('github');
			let session = sessions.find(s => s.scopes.includes('repo')) ?? sessions[0];
			if (!session) {
				try {
					session = await this._authService.createSession('github', ['repo']);
				} catch {
					this._notification.notify({ severity: Severity.Error, message: localize('othcloud.dev.ghAuthFailed', 'GitHub sign-in was cancelled or failed.') });
					return null;
				}
			}
			const repos = await this.fetchGithubRepos(session.accessToken);
			if (repos.length === 0) {
				this._notification.notify({ severity: Severity.Info, message: localize('othcloud.dev.ghNoRepos', 'No repositories found on this GitHub account.') });
				return null;
			}
			const items: (IQuickPickItem & { url: string; name: string })[] = repos.map(r => ({
				label: r.full_name,
				description: r.private ? localize('othcloud.dev.ghPrivate', 'private') : localize('othcloud.dev.ghPublic', 'public'),
				detail: r.description ?? '',
				url: r.html_url,
				name: r.full_name,
			}));
			const picked = await this._quickInput.pick(items, {
				canPickMany: false,
				placeHolder: localize('othcloud.dev.pickRepo', 'Pick a GitHub repository to link'),
				matchOnDescription: true,
				matchOnDetail: true,
			});
			if (!picked) { return null; }
			return { name: picked.name, url: picked.url };
		} catch (err) {
			const msg = err instanceof DevelopersApiError ? err.message : String(err);
			this._notification.notify({ severity: Severity.Error, message: msg });
			return null;
		}
	}

	// ---------- Service detail ----------

	private async renderServiceDetail(serviceId: number): Promise<void> {
		const wrap = append(this.mainArea, $('.dev-detail'));
		const main = append(wrap, $('.dev-detail-main'));
		const aside = append(wrap, $('.dev-detail-aside'));

		const header = append(main, $('.dev-detail-header'));
		const back = append(header, $('button.dev-back', {}, '← ' + localize('othcloud.dev.backToServices', 'Back to services'))) as HTMLButtonElement;
		back.onclick = () => { this.view = { kind: 'services' }; void this.renderMain(); };
		const titleEl = append(header, $('h2', {}, '…'));
		const metaEl = append(header, $('.meta', {}, ''));

		// Description section (editable, mirroring task detail)
		const descSection = append(main, $('.dev-desc-section'));
		const descHeader = append(descSection, $('.dev-desc-header'));
		append(descHeader, $('h4', {}, localize('othcloud.dev.description', 'Description')));
		const descEditBtn = append(descHeader, $('button.dev-back', {}, localize('othcloud.dev.edit', 'Edit'))) as HTMLButtonElement;
		const descView = append(descSection, $('.dev-desc-view'));

		// Service tasks list
		const tasksSection = append(main, $('.dev-service-tasks'));
		const tasksHeader = append(tasksSection, $('.dev-desc-header'));
		append(tasksHeader, $('h4', {}, localize('othcloud.dev.tasksTitle', 'Tasks')));
		const newTaskBtn = append(tasksHeader, $('button.dev-back', {}, localize('othcloud.dev.newTask', 'New task'))) as HTMLButtonElement;
		const tasksList = append(tasksSection, $('.dev-service-task-list'));

		// Repos sidebar
		const reposSection = append(aside, $('.dev-aside-section'));
		const reposHeader = append(reposSection, $('.dev-desc-header'));
		append(reposHeader, $('h4', {}, localize('othcloud.dev.repos', 'Linked repositories')));
		const addRepoBtn = append(reposHeader, $('button.dev-back', {}, localize('othcloud.dev.linkRepo', 'Link repo'))) as HTMLButtonElement;
		const reposList = append(reposSection, $('div'));

		let service: DevService | null = null;

		const renderDescription = () => {
			clearNode(descView);
			if (!service) { return; }
			const text = service.description.trim();
			if (text.length === 0) {
				append(descView, $('.dev-desc-empty', {}, localize('othcloud.dev.descEmpty', 'No description yet.')));
			} else {
				append(descView, $('pre.dev-desc-text', {}, text));
			}
			descEditBtn.disabled = false;
			descEditBtn.textContent = localize('othcloud.dev.edit', 'Edit');
		};
		const beginEditDescription = () => {
			if (!service) { return; }
			clearNode(descView);
			const ta = append(descView, $('textarea.dev-textarea')) as HTMLTextAreaElement;
			ta.rows = 6;
			ta.value = service.description;
			const row = append(descView, $('.dev-desc-edit-actions'));
			const save = append(row, $('button.dev-button', {}, localize('othcloud.dev.save', 'Save'))) as HTMLButtonElement;
			const cancel = append(row, $('button.dev-button.secondary', {}, localize('othcloud.dev.cancel', 'Cancel'))) as HTMLButtonElement;
			descEditBtn.disabled = true;
			cancel.onclick = () => renderDescription();
			save.onclick = async () => {
				save.disabled = true;
				try {
					service = await DevelopersClient.patchService(this.jwt!, serviceId, { description: ta.value });
					renderDescription();
				} catch {
					save.disabled = false;
				}
			};
			ta.focus();
		};
		descEditBtn.onclick = () => beginEditDescription();

		const renderRepos = () => {
			clearNode(reposList);
			if (!service || service.repos.length === 0) {
				append(reposList, $('.dev-activity-row', {}, localize('othcloud.dev.noRepos', 'No repositories linked yet.')));
				return;
			}
			for (const r of service.repos) {
				const row = append(reposList, $('.dev-repo-row'));
				const link = append(row, $('a', {})) as HTMLAnchorElement;
				link.href = r.url;
				link.title = r.url;
				link.textContent = r.name;
				link.onclick = (e) => {
					e.preventDefault();
					void this.openInInternalBrowser(r.url);
				};
				const del = append(row, $('button.dev-back', {}, '×')) as HTMLButtonElement;
				del.title = localize('othcloud.dev.unlinkRepo', 'Unlink');
				del.onclick = async () => {
					del.disabled = true;
					try {
						await DevelopersClient.removeServiceRepo(this.jwt!, serviceId, r.id);
						service = await DevelopersClient.getService(this.jwt!, serviceId);
						renderRepos();
					} catch {
						del.disabled = false;
					}
				};
			}
		};
		addRepoBtn.onclick = () => void this.linkRepoFlow(serviceId, async () => {
			service = await DevelopersClient.getService(this.jwt!, serviceId);
			renderRepos();
		});

		const loadTasks = async () => {
			clearNode(tasksList);
			try {
				const tasks = await DevelopersClient.listTasks(this.jwt!, { serviceId });
				if (tasks.length === 0) {
					append(tasksList, $('.dev-activity-row', {}, localize('othcloud.dev.serviceNoTasks', 'No tasks yet for this service.')));
					return;
				}
				for (const t of tasks) {
					const row = append(tasksList, $('button.dev-sidebar-task'));
					append(row, $('.dev-sidebar-task-title', {}, t.title));
					append(row, $('.dev-sidebar-task-meta', {}, `#${t.id} · ${t.status}` + (t.assigneeUsername ? ` · ${t.assigneeUsername}` : '')));
					row.onclick = () => {
						this.view = { kind: 'task', taskId: t.id };
						void this.renderMain();
					};
				}
			} catch (err) {
				const msg = err instanceof DevelopersApiError ? err.message : String(err);
				append(tasksList, $('.dev-error', {}, msg));
			}
		};
		newTaskBtn.onclick = () => void this.openNewTaskDialogForService(serviceId, service?.title ?? '', loadTasks);

		const loadHeader = async () => {
			service = await DevelopersClient.getService(this.jwt!, serviceId);
			titleEl.textContent = service.title;
			metaEl.textContent = localize('othcloud.dev.serviceMeta', '#{0} · by {1}', String(service.id), service.creatorUsername);
			renderDescription();
			renderRepos();
		};

		await loadHeader();
		await loadTasks();
	}

	private async openNewTaskDialogForService(serviceId: number, serviceTitle: string, onCreated: () => Promise<void>): Promise<void> {
		// Re-uses the same shape as openNewTaskDialog but injects serviceId.
		clearNode(this.mainArea);
		const center = append(this.mainArea, $('.dev-auth-center'));
		const card = append(center, $('.dev-auth-card'));
		const heading = serviceTitle.trim().length > 0
			? localize('othcloud.dev.newTaskForServiceNamed', 'New task for {0}', serviceTitle)
			: localize('othcloud.dev.newTaskForService', 'New task for service #{0}', String(serviceId));
		append(card, $('h2.dev-auth-title', {}, heading));

		const form = append(card, $('.dev-form'));
		append(form, $('label', {}, localize('othcloud.dev.title', 'Title')));
		const title = append(form, $('input')) as HTMLInputElement;
		append(form, $('label', {}, localize('othcloud.dev.description', 'Description')));
		const desc = append(form, $('textarea.dev-textarea')) as HTMLTextAreaElement;
		desc.rows = 4;
		append(form, $('label', {}, localize('othcloud.dev.assignToSelect', 'Assign to')));
		const assigneeSelect = append(form, $('select.dev-select')) as HTMLSelectElement;
		const noOpt = document.createElement('option');
		noOpt.value = '';
		noOpt.textContent = localize('othcloud.dev.unassigned', '(unassigned)');
		assigneeSelect.appendChild(noOpt);

		const error = append(card, $('.dev-error'));
		error.style.display = 'none';

		const buttons = append(card, $('div', { style: 'display: flex; gap: 6px; justify-content: flex-end;' }));
		const cancel = append(buttons, $('button.dev-button.secondary', {}, localize('othcloud.dev.cancel', 'Cancel'))) as HTMLButtonElement;
		const submit = append(buttons, $('button.dev-button', {}, localize('othcloud.dev.create', 'Create'))) as HTMLButtonElement;

		try {
			const users = await DevelopersClient.listUsers(this.jwt!);
			for (const u of users) {
				const opt = document.createElement('option');
				opt.value = u.username;
				opt.textContent = u.username + (u.id === this.user!.id ? ' (you)' : '');
				assigneeSelect.appendChild(opt);
			}
		} catch { /* ignore */ }

		const back = () => { this.view = { kind: 'service', serviceId }; void this.renderMain(); };
		cancel.onclick = back;
		submit.onclick = async () => {
			if (!title.value.trim()) {
				error.textContent = localize('othcloud.dev.titleRequired', 'Title is required.');
				error.style.display = '';
				return;
			}
			submit.disabled = true;
			try {
				await DevelopersClient.createTask(this.jwt!, title.value.trim(), desc.value, assigneeSelect.value || undefined, serviceId);
				this.bumpTasksRev();
				back();
				await onCreated();
			} catch (err) {
				const msg = err instanceof DevelopersApiError ? err.message : String(err);
				error.textContent = msg;
				error.style.display = '';
				submit.disabled = false;
			}
		};
		title.focus();
	}

	// ---------- Repo linking via VSCode GitHub auth ----------

	private async linkRepoFlow(serviceId: number, onLinked: () => Promise<void>): Promise<void> {
		const picked = await this.pickGithubRepo();
		if (!picked) { return; }
		try {
			await DevelopersClient.addServiceRepo(this.jwt!, serviceId, { ...picked, provider: 'github' });
			await onLinked();
		} catch (err) {
			const msg = err instanceof DevelopersApiError ? err.message : String(err);
			this._notification.notify({ severity: Severity.Error, message: msg });
		}
	}

	private async fetchGithubRepos(token: string): Promise<Array<{ full_name: string; html_url: string; private: boolean; description: string | null }>> {
		const out: Array<{ full_name: string; html_url: string; private: boolean; description: string | null }> = [];
		// Single-page fetch (up to 100 repos sorted by recent push) keeps the
		// flow snappy. Users with more repos can type to filter the picker.
		const res = await fetch('https://api.github.com/user/repos?per_page=100&sort=pushed', {
			headers: {
				'Authorization': `token ${token}`,
				'Accept': 'application/vnd.github+json',
			},
		});
		if (!res.ok) {
			throw new Error(`GitHub API ${res.status}`);
		}
		const data = await res.json() as Array<{ full_name: string; html_url: string; private: boolean; description: string | null }>;
		out.push(...data);
		return out;
	}

	/**
	 * Look up pull requests that contain the given commit and return the URL
	 * of the most recent one (or null). Reuses VSCode's GitHub session.
	 */
	private async findGithubPullForCommit(repoFullName: string, sha: string): Promise<string | null> {
		const sessions = await this._authService.getSessions('github');
		const session = sessions.find(s => s.scopes.includes('repo')) ?? sessions[0]
			?? await this._authService.createSession('github', ['repo']);
		const res = await fetch(`https://api.github.com/repos/${repoFullName}/commits/${sha}/pulls`, {
			headers: {
				'Authorization': `token ${session.accessToken}`,
				'Accept': 'application/vnd.github+json',
			},
		});
		if (!res.ok) {
			throw new Error(`GitHub API ${res.status}`);
		}
		const prs = await res.json() as Array<{ html_url: string; updated_at: string }>;
		if (prs.length === 0) { return null; }
		// Most recently updated PR first.
		prs.sort((a, b) => (b.updated_at ?? '').localeCompare(a.updated_at ?? ''));
		return prs[0].html_url;
	}
}

function formatTime(iso: string): string {
	try {
		const d = new Date(iso);
		return d.toLocaleString();
	} catch {
		return iso;
	}
}

function describeActivity(a: DevActivity): string {
	switch (a.kind) {
		case 'created': return localize('othcloud.dev.act.created', 'created the task');
		case 'assigned': return localize('othcloud.dev.act.assigned', 'assigned it to {0}', a.detail);
		case 'renamed': return localize('othcloud.dev.act.renamed', 'renamed to "{0}"', a.detail);
		case 'edited-description': return localize('othcloud.dev.act.editedDescription', 'edited the description');
		case 'status': return localize('othcloud.dev.act.status', 'set status to {0}', a.detail);
		case 'message': return localize('othcloud.dev.act.message', 'sent a message');
		case 'checklist-add': return localize('othcloud.dev.act.checkAdd', 'added "{0}" to the checklist', a.detail);
		case 'checklist-check': return localize('othcloud.dev.act.checkOn', 'checked an item');
		case 'checklist-uncheck': return localize('othcloud.dev.act.checkOff', 'unchecked an item');
		case 'attachment': return localize('othcloud.dev.act.attachment', 'attached "{0}"', a.detail);
		case 'timer-start': return localize('othcloud.dev.act.timerStart', 'started the timer');
		case 'timer-stop': return localize('othcloud.dev.act.timerStop', 'stopped the timer');
		case 'commit-link': return localize('othcloud.dev.act.commitLink', 'linked commit {0}', a.detail.substring(0, 7));
		case 'commit-unlink': return localize('othcloud.dev.act.commitUnlink', 'unlinked a commit');
		default: return a.kind + (a.detail ? ' (' + a.detail + ')' : '');
	}
}

function formatDuration(totalSec: number): string {
	const sec = Math.max(0, Math.floor(totalSec));
	const h = Math.floor(sec / 3600);
	const m = Math.floor((sec % 3600) / 60);
	const s = sec % 60;
	const pad = (n: number) => String(n).padStart(2, '0');
	return `${h}:${pad(m)}:${pad(s)}`;
}

/**
 * Minimal markdown renderer: splits on ```language\n…\n``` fences and renders
 * each block as a styled <pre><code>; everything else becomes plain text
 * paragraphs. We intentionally avoid the full markdown service to keep the
 * surface tiny and predictable.
 */
function renderMarkdownInto(container: HTMLElement, text: string): void {
	const fence = /```(\w*)\n?([\s\S]*?)```/g;
	let lastIndex = 0;
	let match: RegExpExecArray | null;
	const flushText = (chunk: string) => {
		const trimmed = chunk.trim();
		if (!trimmed) { return; }
		append(container, $('p', {}, trimmed));
	};
	while ((match = fence.exec(text)) !== null) {
		if (match.index > lastIndex) {
			flushText(text.slice(lastIndex, match.index));
		}
		const lang = match[1] ?? '';
		const code = match[2] ?? '';
		const wrap = append(container, $('div'));
		if (lang) {
			append(wrap, $('.dev-desc-code-header', {}, lang));
		}
		append(wrap, $('pre.dev-desc-code', {}, code));
		lastIndex = match.index + match[0].length;
	}
	if (lastIndex < text.length) {
		flushText(text.slice(lastIndex));
	}
}

/**
 * Parse a GitHub-style commit URL into the fields we store. Returns null if the
 * URL doesn't match a recognised pattern.
 */
function parseCommitUrl(url: string): { url: string; sha: string; repoFullName: string } | null {
	try {
		const u = new URL(url);
		// Match /owner/repo/commit/<sha> for github.com / gitlab / generic git hosts.
		const parts = u.pathname.split('/').filter(Boolean);
		const idx = parts.indexOf('commit');
		if (idx < 2 || idx + 1 >= parts.length) {
			return null;
		}
		const sha = parts[idx + 1];
		const repoFullName = `${parts[idx - 2]}/${parts[idx - 1]}`;
		if (!/^[0-9a-f]{7,40}$/i.test(sha)) {
			return null;
		}
		return { url, sha, repoFullName };
	} catch {
		return null;
	}
}
