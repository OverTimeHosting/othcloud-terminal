/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/developers.css';
import { localize } from '../../../../nls.js';
import { $, append, clearNode, Dimension } from '../../../../base/browser/dom.js';
import { CancellationToken } from '../../../../base/common/cancellation.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { renderIcon } from '../../../../base/browser/ui/iconLabel/iconLabels.js';
import { EditorPane } from '../../../browser/parts/editor/editorPane.js';
import { IEditorOpenContext } from '../../../common/editor.js';
import { IEditorGroup } from '../../../services/editor/common/editorGroupsService.js';
import { IStorageService, StorageScope, StorageTarget } from '../../../../platform/storage/common/storage.js';
import { ITelemetryService } from '../../../../platform/telemetry/common/telemetry.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { DevelopersInput, DevelopersEditorOptions } from './developersInput.js';
import {
	DevelopersClient, DevelopersApiError, DevelopersAccessTokenMissingError,
	setAccessToken, getAccessToken,
	DevTask, DevMessage, DevChecklistItem, DevActivity, DevUser
} from './developersClient.js';

const STORAGE_ACCESS_TOKEN = 'othcloud.developers.accessToken';
const STORAGE_JWT = 'othcloud.developers.jwt';
const STORAGE_USER = 'othcloud.developers.user';

type View =
	| { kind: 'home' }
	| { kind: 'tasks' }
	| { kind: 'task'; taskId: number };

export class DevelopersPage extends EditorPane {

	static readonly ID = 'othcloudDevelopersPage';

	private container!: HTMLElement;
	private accountChip!: HTMLElement;
	private mainArea!: HTMLElement;

	private jwt: string | null = null;
	private user: DevUser | null = null;
	private view: View = { kind: 'home' };

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
	}

	protected createEditor(parent: HTMLElement): void {
		this.container = append(parent, $('.othcloud-developers'));

		const topbar = append(this.container, $('.dev-topbar'));
		append(topbar, $('.dev-brand', {}, 'othcloud · Developers'));
		this.accountChip = append(topbar, $('.dev-account.signed-out'));
		this.accountChip.onclick = () => {
			if (this.user) {
				this.signOut();
			}
		};

		this.mainArea = append(this.container, $('.dev-main'));

		this.refreshAccountChip();
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

	// ---------- Account chip ----------

	private refreshAccountChip(): void {
		clearNode(this.accountChip);
		if (this.user) {
			this.accountChip.classList.remove('signed-out');
			this.accountChip.appendChild(renderIcon(Codicon.account));
			append(this.accountChip, $('span', {}, this.user.username));
			this.accountChip.title = localize('othcloud.dev.signOut', 'Sign out of othcloud account');
		} else {
			this.accountChip.classList.add('signed-out');
			this.accountChip.appendChild(renderIcon(Codicon.account));
			append(this.accountChip, $('span', {}, localize('othcloud.dev.notSignedIn', 'Not signed in')));
		}
	}

	private applyAuth(token: string, user: DevUser): void {
		this.jwt = token;
		this.user = user;
		this._storage.store(STORAGE_JWT, token, StorageScope.APPLICATION, StorageTarget.MACHINE);
		this._storage.store(STORAGE_USER, JSON.stringify(user), StorageScope.APPLICATION, StorageTarget.MACHINE);
		this.refreshAccountChip();
	}

	private signOut(): void {
		this.jwt = null;
		this.user = null;
		this._storage.remove(STORAGE_JWT, StorageScope.APPLICATION);
		this._storage.remove(STORAGE_USER, StorageScope.APPLICATION);
		this.refreshAccountChip();
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
		this.refreshAccountChip();
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
	}

	// ---------- Tasks list ----------

	private async renderTasksList(): Promise<void> {
		const toolbar = append(this.mainArea, $('.dev-tasks-toolbar'));
		append(toolbar, $('strong', {}, localize('othcloud.dev.tasksTitle', 'Tasks')));
		append(toolbar, $('span.spacer'));

		const refresh = append(toolbar, $('button.dev-button.secondary', {}, localize('othcloud.dev.refresh', 'Refresh'))) as HTMLButtonElement;
		const newBtn = append(toolbar, $('button.dev-button', {}, localize('othcloud.dev.newTask', 'New task'))) as HTMLButtonElement;

		const list = append(this.mainArea, $('.dev-tasks-list'));
		append(list, $('.dev-empty', {}, localize('othcloud.dev.loading', 'Loading…')));

		const load = async () => {
			clearNode(list);
			append(list, $('.dev-empty', {}, localize('othcloud.dev.loading', 'Loading…')));
			try {
				const tasks = await DevelopersClient.listTasks(this.jwt!);
				clearNode(list);
				if (tasks.length === 0) {
					append(list, $('.dev-empty', {}, localize('othcloud.dev.noTasks', 'No tasks yet. Create one to get started.')));
					return;
				}
				for (const t of tasks) {
					this.renderTaskRow(list, t);
				}
			} catch (err) {
				clearNode(list);
				const msg = err instanceof DevelopersApiError ? err.message : String(err);
				append(list, $('.dev-error', {}, msg));
			}
		};

		refresh.onclick = () => void load();
		newBtn.onclick = () => this.renderNewTaskForm(list, load);
		void load();
	}

	private renderTaskRow(parent: HTMLElement, t: DevTask): void {
		const row = append(parent, $('.dev-task-row'));
		const main = append(row, $('div', { style: 'flex: 1 1 auto; min-width: 0;' }));
		append(main, $('.title', {}, t.title));
		const metaText = t.assigneeUsername
			? localize('othcloud.dev.taskMeta', '#{0} · by {1} · for {2}', String(t.id), t.creatorUsername, t.assigneeUsername)
			: localize('othcloud.dev.taskMetaNoAssignee', '#{0} · by {1}', String(t.id), t.creatorUsername);
		append(main, $('.meta', {}, metaText));
		append(row, $('.status', {}, t.status));
		row.onclick = () => {
			this.view = { kind: 'task', taskId: t.id };
			void this.renderMain();
		};
	}

	private renderNewTaskForm(listEl: HTMLElement, onCreated: () => Promise<void>): void {
		clearNode(listEl);
		const wrap = append(listEl, $('.dev-form', { style: 'padding: 14px; gap: 8px;' }));
		append(wrap, $('label', {}, localize('othcloud.dev.title', 'Title')));
		const title = append(wrap, $('input')) as HTMLInputElement;
		append(wrap, $('label', {}, localize('othcloud.dev.description', 'Description')));
		const desc = append(wrap, $('input')) as HTMLInputElement;
		append(wrap, $('label', {}, localize('othcloud.dev.assignTo', 'Assign to (optional username)')));
		const assignee = append(wrap, $('input')) as HTMLInputElement;

		const error = append(wrap, $('.dev-error'));
		error.style.display = 'none';

		const buttons = append(wrap, $('div', { style: 'display: flex; gap: 6px;' }));
		const submit = append(buttons, $('button.dev-button', {}, localize('othcloud.dev.create', 'Create'))) as HTMLButtonElement;
		const cancel = append(buttons, $('button.dev-button.secondary', {}, localize('othcloud.dev.cancel', 'Cancel'))) as HTMLButtonElement;

		cancel.onclick = () => void onCreated();
		submit.onclick = async () => {
			if (!title.value.trim()) {
				error.textContent = localize('othcloud.dev.titleRequired', 'Title is required.');
				error.style.display = '';
				return;
			}
			submit.disabled = true;
			try {
				await DevelopersClient.createTask(this.jwt!, title.value.trim(), desc.value, assignee.value.trim() || undefined);
				await onCreated();
			} catch (err) {
				const msg = err instanceof DevelopersApiError ? err.message : String(err);
				error.textContent = msg;
				error.style.display = '';
				submit.disabled = false;
			}
		};
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

		const chat = append(main, $('.dev-chat'));
		const chatMessages = append(chat, $('.dev-chat-messages'));
		const chatInputWrap = append(chat, $('.dev-chat-input'));
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
		const loadHeader = async () => {
			task = await DevelopersClient.getTask(this.jwt!, taskId);
			titleEl.textContent = task.title;
			const metaText = task.assigneeUsername
				? localize('othcloud.dev.taskMetaFull', '#{0} · by {1} · for {2} · {3}', String(task.id), task.creatorUsername, task.assigneeUsername, task.status)
				: localize('othcloud.dev.taskMetaFullNoAssignee', '#{0} · by {1} · {2}', String(task.id), task.creatorUsername, task.status);
			metaEl.textContent = metaText;
		};

		const renderMessages = (msgs: DevMessage[]) => {
			clearNode(chatMessages);
			for (const m of msgs) {
				const node = append(chatMessages, $('.dev-chat-message'));
				if (m.authorId === this.user!.id) {
					node.classList.add('mine');
				}
				append(node, $('.author', {}, `${m.authorUsername} · ${formatTime(m.createdAt)}`));
				append(node, $('.body', {}, m.body));
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
