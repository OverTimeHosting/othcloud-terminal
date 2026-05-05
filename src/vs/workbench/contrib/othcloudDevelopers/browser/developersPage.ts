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
import { STORAGE_ACTIVITY_BAR_ENABLED } from './developersActivityBar.js';
import {
	DevelopersClient, DevelopersApiError, DevelopersAccessTokenMissingError,
	setAccessToken, getAccessToken,
	DevTask, DevMessage, DevChecklistItem, DevActivity, DevUser
} from './developersClient.js';

const STORAGE_ACCESS_TOKEN = 'othcloud.developers.accessToken';
const STORAGE_JWT = 'othcloud.developers.jwt';
const STORAGE_USER = 'othcloud.developers.user';
const STORAGE_TASKS_LAYOUT = 'othcloud.developers.tasksLayout';

type TasksLayout = 'kanban' | 'table';

type View =
	| { kind: 'home' }
	| { kind: 'tasks' }
	| { kind: 'task'; taskId: number };

export class DevelopersPage extends EditorPane {

	static readonly ID = 'othcloudDevelopersPage';

	private container!: HTMLElement;
	private mainArea!: HTMLElement;

	private jwt: string | null = null;
	private user: DevUser | null = null;
	private view: View = { kind: 'home' };
	private tasksLayout: TasksLayout = 'kanban';

	constructor(
		group: IEditorGroup,
		@ITelemetryService telemetryService: ITelemetryService,
		@IThemeService themeService: IThemeService,
		@IStorageService private readonly _storage: IStorageService,
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

	protected createEditor(parent: HTMLElement): void {
		this.container = append(parent, $('.othcloud-developers'));
		this.mainArea = append(this.container, $('.dev-main'));
		void this.renderMain();
	}

	override async setInput(input: DevelopersInput, options: DevelopersEditorOptions | undefined, context: IEditorOpenContext, token: CancellationToken): Promise<void> {
		await super.setInput(input, options, context, token);
		const view = options?.view ?? input.initialView ?? 'home';
		const taskId = options?.taskId ?? input.initialTaskId;
		if (taskId) {
			this.view = { kind: 'task', taskId };
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
		} else {
			await this.renderTaskDetail(this.view.taskId);
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
		const signOutBtn = append(row, $('button.dev-button.secondary', {}, localize('othcloud.dev.signOutAction', 'Sign out'))) as HTMLButtonElement;
		tasksBtn.onclick = () => {
			// Open the tasks view in this same pane. The dedicated floating
			// window is reachable via the menubar — this keeps the home view
			// useful even when the user doesn't want a separate window.
			this.view = { kind: 'tasks' };
			void this.renderMain();
		};
		signOutBtn.onclick = () => this.signOut();

		// Settings strip — for now just one toggle for the activity bar entry.
		const settings = append(card, $('.dev-home-settings'));
		const cbWrap = append(settings, $('label.dev-checkbox'));
		const cb = append(cbWrap, $('input')) as HTMLInputElement;
		cb.type = 'checkbox';
		cb.checked = this._storage.getBoolean(STORAGE_ACTIVITY_BAR_ENABLED, StorageScope.APPLICATION, false);
		append(cbWrap, $('span', {}, localize('othcloud.dev.showInActivityBar', 'Show Developers in the activity bar')));
		cb.onchange = () => {
			this._storage.store(STORAGE_ACTIVITY_BAR_ENABLED, cb.checked, StorageScope.APPLICATION, StorageTarget.MACHINE);
		};
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
				const tasks = await DevelopersClient.listTasks(this.jwt!);
				clearNode(body);
				if (this.tasksLayout === 'table') {
					this.renderTasksTable(body, tasks, load);
				} else {
					this.renderTasksKanban(body, tasks, load);
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
	}

	private renderTasksKanban(parent: HTMLElement, tasks: DevTask[], reload: () => Promise<void>): void {
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
			this.renderKanbanColumn(board, col.status, col.label, buckets.get(col.status) ?? [], reload);
		}
	}

	private renderTasksTable(parent: HTMLElement, tasks: DevTask[], reload: () => Promise<void>): void {
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
				if ((e.target as HTMLElement).closest('select')) { return; }
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

	private renderKanbanColumn(parent: HTMLElement, status: string, label: string, tasks: DevTask[], reload: () => Promise<void>): void {
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
			this.renderKanbanCard(list, t, status, reload);
		}
	}

	private renderKanbanCard(parent: HTMLElement, t: DevTask, status: string, reload: () => Promise<void>): void {
		const card = append(parent, $('.dev-kanban-card'));
		card.onclick = (e) => {
			// Don't trigger when the user clicks a status-move button.
			if ((e.target as HTMLElement).closest('.dev-kanban-move')) {
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

		const moves = append(card, $('.dev-kanban-moves'));
		for (const target of DevelopersPage.KANBAN_COLUMNS) {
			if (target.status === status) { continue; }
			const btn = append(moves, $('button.dev-kanban-move', {}, '→ ' + target.label)) as HTMLButtonElement;
			btn.onclick = async (e) => {
				e.stopPropagation();
				btn.disabled = true;
				try {
					await DevelopersClient.patchTask(this.jwt!, t.id, { status: target.status });
					await reload();
				} catch {
					btn.disabled = false;
				}
			};
		}
	}

	private async openNewTaskDialog(onCreated: () => Promise<void>): Promise<void> {
		// Render the form as an overlay-style card centered on the main area.
		clearNode(this.mainArea);
		const center = append(this.mainArea, $('.dev-auth-center'));
		const card = append(center, $('.dev-auth-card'));

		append(card, $('h2.dev-auth-title', {}, localize('othcloud.dev.newTask', 'New task')));

		const form = append(card, $('.dev-form'));
		append(form, $('label', {}, localize('othcloud.dev.title', 'Title')));
		const title = append(form, $('input')) as HTMLInputElement;
		append(form, $('label', {}, localize('othcloud.dev.description', 'Description')));
		const desc = append(form, $('textarea.dev-textarea')) as HTMLTextAreaElement;
		desc.rows = 4;
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

		cancel.onclick = () => void onCreated();
		submit.onclick = async () => {
			if (!title.value.trim()) {
				error.textContent = localize('othcloud.dev.titleRequired', 'Title is required.');
				error.style.display = '';
				return;
			}
			submit.disabled = true;
			try {
				await DevelopersClient.createTask(this.jwt!, title.value.trim(), desc.value, assigneeSelect.value || undefined);
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
				const empty = append(descView, $('.dev-desc-empty', {}, localize('othcloud.dev.descEmpty', 'No description yet.')));
				void empty;
			} else {
				append(descView, $('pre.dev-desc-text', {}, text));
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

		await loadHeader();
		await loadMessages();
		await loadChecklist();
		await loadActivity();
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
		default: return a.kind + (a.detail ? ' (' + a.detail + ')' : '');
	}
}
