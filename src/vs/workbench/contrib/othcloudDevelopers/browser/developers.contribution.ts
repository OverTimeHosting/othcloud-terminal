/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize, localize2 } from '../../../../nls.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { Action2, MenuId, MenuRegistry, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { ICodeEditorService } from '../../../../editor/browser/services/codeEditorService.js';
import { IInstantiationService, ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { IStorageService, StorageScope, StorageTarget } from '../../../../platform/storage/common/storage.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { EditorExtensions, IEditorFactoryRegistry, IEditorSerializer } from '../../../common/editor.js';
import { EditorPaneDescriptor, IEditorPaneRegistry } from '../../../browser/editor.js';
import { IEditorService } from '../../../services/editor/common/editorService.js';
import { registerWorkbenchContribution2, WorkbenchPhase } from '../../../common/contributions.js';
import { DevelopersInput } from './developersInput.js';
import { DevelopersPage } from './developersPage.js';
import { DevelopersAccountMenuContribution } from './developersAccountMenu.js';
import { DevelopersActivityBarContribution, OthcloudActivityBarEnabledContext, STORAGE_ACTIVITY_BAR_ENABLED } from './developersActivityBar.js';
import { IQuickInputService, IQuickPickItem } from '../../../../platform/quickinput/common/quickInput.js';
import { INotificationService, Severity } from '../../../../platform/notification/common/notification.js';
import { DevelopersClient, DevStatus, setAccessToken } from './developersClient.js';

const OPEN_DEVELOPERS_COMMAND = 'othcloud.developers.open';

// Top-level menubar entry that sits next to Terminal (order 7) — see
// src/vs/workbench/browser/parts/titlebar/menubarControl.ts for siblings.
const MenubarDevelopersMenu = new MenuId('MenubarDevelopersMenu');

MenuRegistry.appendMenuItem(MenuId.MenubarMainMenu, {
	submenu: MenubarDevelopersMenu,
	title: {
		value: 'Developers',
		original: 'Developers',
		mnemonicTitle: localize({ key: 'mDevelopers', comment: ['&& denotes a mnemonic'] }, "&&Developers"),
	},
	order: 8,
});

class DevelopersInputSerializer implements IEditorSerializer {
	canSerialize(_input: DevelopersInput): boolean { return true; }
	serialize(input: DevelopersInput): string {
		return JSON.stringify({
			view: input.initialView,
			taskId: input.initialTaskId,
			serviceId: input.initialServiceId,
		});
	}
	deserialize(instantiationService: IInstantiationService, serialized: string): DevelopersInput {
		try {
			const o = JSON.parse(serialized) as { view?: any; taskId?: any; serviceId?: any };
			return instantiationService.createInstance(DevelopersInput, {
				view: o.view,
				taskId: typeof o.taskId === 'number' ? o.taskId : undefined,
				serviceId: typeof o.serviceId === 'number' ? o.serviceId : undefined,
			});
		} catch {
			return instantiationService.createInstance(DevelopersInput, {});
		}
	}
}

Registry.as<IEditorPaneRegistry>(EditorExtensions.EditorPane).registerEditorPane(
	EditorPaneDescriptor.create(
		DevelopersPage,
		DevelopersPage.ID,
		localize('othcloud.developers.paneName', 'Developers'),
	),
	[new SyncDescriptor(DevelopersInput)],
);

Registry.as<IEditorFactoryRegistry>(EditorExtensions.EditorFactory)
	.registerEditorSerializer(DevelopersInput.ID, DevelopersInputSerializer);

registerAction2(class OpenDevelopersAction extends Action2 {
	constructor() {
		super({
			id: OPEN_DEVELOPERS_COMMAND,
			title: {
				value: 'Open Developers',
				original: 'Open Developers',
				mnemonicTitle: localize({ key: 'miOpenDevelopers', comment: ['&& denotes a mnemonic'] }, "&&Open Developers"),
			},
			category: localize2('othcloud.developers.category', 'Developers'),
			icon: Codicon.tools,
			f1: true,
			menu: [{
				id: MenubarDevelopersMenu,
				group: '1_open',
				order: 1,
			}],
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const editorService = accessor.get(IEditorService);
		const instantiationService = accessor.get(IInstantiationService);
		const input = instantiationService.createInstance(DevelopersInput, { view: 'home' });
		await editorService.openEditor(input, { pinned: true });
	}
});

export const OPEN_TASKS_WINDOW_COMMAND = 'othcloud.developers.openTasks';
export const OPEN_TASK_IN_WINDOW_COMMAND = 'othcloud.developers.openTaskInWindow';
export const OPEN_SERVICES_WINDOW_COMMAND = 'othcloud.developers.openServices';
export const STORAGE_NEW_TASK_PREFILL = 'othcloud.developers.newTaskPrefill';

registerAction2(class OpenTasksWindowAction extends Action2 {
	constructor() {
		super({
			id: OPEN_TASKS_WINDOW_COMMAND,
			title: {
				value: 'Open Tasks Window',
				original: 'Open Tasks Window',
				mnemonicTitle: localize({ key: 'miOpenTasks', comment: ['&& denotes a mnemonic'] }, "Open &&Tasks Window"),
			},
			category: localize2('othcloud.developers.category', 'Developers'),
			icon: Codicon.checklist,
			f1: true,
			menu: [{
				id: MenubarDevelopersMenu,
				group: '1_open',
				order: 2,
			}],
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const editorService = accessor.get(IEditorService);
		const instantiationService = accessor.get(IInstantiationService);
		const input = instantiationService.createInstance(DevelopersInput, { view: 'tasks' });
		// Opens as a pinned tab in the active editor group. The previous
		// auxiliary-window flow lost the `view: 'tasks'` state because VSCode
		// rebuilds the input from URI alone when crossing into an aux window
		// via SyncDescriptor — landing the user on the Developers home page.
		await editorService.openEditor(input, { pinned: true });
	}
});

registerAction2(class OpenServicesWindowAction extends Action2 {
	constructor() {
		super({
			id: OPEN_SERVICES_WINDOW_COMMAND,
			title: {
				value: 'Open Services Window',
				original: 'Open Services Window',
				mnemonicTitle: localize({ key: 'miOpenServices', comment: ['&& denotes a mnemonic'] }, "Open &&Services Window"),
			},
			category: localize2('othcloud.developers.category', 'Developers'),
			icon: Codicon.server,
			f1: true,
			menu: [{
				id: MenubarDevelopersMenu,
				group: '1_open',
				order: 3,
			}],
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const editorService = accessor.get(IEditorService);
		const instantiationService = accessor.get(IInstantiationService);
		const input = instantiationService.createInstance(DevelopersInput, { view: 'services' });
		await editorService.openEditor(input, { pinned: true });
	}
});

registerAction2(class NewTaskFromSelectionAction extends Action2 {
	constructor() {
		super({
			id: 'othcloud.developers.newTaskFromSelection',
			title: localize2('othcloud.developers.newTaskFromSelection', 'othcloud Developer: Create Task from Selection'),
			category: localize2('othcloud.developers.category', 'Developers'),
			f1: true,
			menu: [
				{
					id: MenuId.EditorContext,
					group: '9_othcloud',
					order: 1,
				},
			],
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const editorService = accessor.get(IEditorService);
		const storage = accessor.get(IStorageService);
		const instantiationService = accessor.get(IInstantiationService);
		const codeEditor = accessor.get(ICodeEditorService).getActiveCodeEditor();

		let title = '';
		let description = '';
		let source: { filePath: string; lineStart: number; lineEnd: number; snippet?: string } | undefined;
		if (codeEditor) {
			const model = codeEditor.getModel();
			const selection = codeEditor.getSelection();
			if (model && selection && !selection.isEmpty()) {
				const text = model.getValueInRange(selection);
				const fileName = model.uri.path.split('/').pop() ?? model.uri.path;
				title = `${fileName}:${selection.startLineNumber}-${selection.endLineNumber}`;
				description = '```\n' + text + '\n```';
				// Store the structured source separately so the task detail can
				// show a "Jump to source" action that opens the file at the
				// captured range. The frontend sends the URI string verbatim.
				source = {
					filePath: model.uri.toString(),
					lineStart: selection.startLineNumber,
					lineEnd: selection.endLineNumber,
					snippet: text.length > 2000 ? text.slice(0, 2000) + '\n…' : text,
				};
			}
		}

		// Persist the prefill so DevelopersPage can pick it up on render.
		storage.store(STORAGE_NEW_TASK_PREFILL, JSON.stringify({ title, description, source }), StorageScope.APPLICATION, StorageTarget.MACHINE);

		const input = instantiationService.createInstance(DevelopersInput, { view: 'tasks' });
		await editorService.openEditor(input, { pinned: true });
	}
});

registerAction2(class OpenTaskInWindowAction extends Action2 {
	constructor() {
		super({
			id: OPEN_TASK_IN_WINDOW_COMMAND,
			title: localize2('othcloud.developers.openTaskInWindow', 'Open Task in Window'),
			category: localize2('othcloud.developers.category', 'Developers'),
		});
	}

	async run(accessor: ServicesAccessor, taskId: number): Promise<void> {
		if (typeof taskId !== 'number') { return; }
		const editorService = accessor.get(IEditorService);
		const instantiationService = accessor.get(IInstantiationService);
		const input = instantiationService.createInstance(DevelopersInput, { view: 'task', taskId });
		await editorService.openEditor(input, { pinned: true });
	}
});

registerAction2(class SignOutAction extends Action2 {
	constructor() {
		super({
			id: 'othcloud.developers.signOut',
			title: localize2('othcloud.developers.signOutAction', 'Sign out of othcloud Developer'),
			category: localize2('othcloud.developers.category', 'Developers'),
			f1: true,
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const storage = accessor.get(IStorageService);
		// We only clear the JWT + cached user — keep the access token so the
		// user doesn't have to re-enter the server password to sign back in.
		storage.remove('othcloud.developers.jwt', StorageScope.APPLICATION);
		storage.remove('othcloud.developers.user', StorageScope.APPLICATION);
	}
});

registerAction2(class ManageStatusesAction extends Action2 {
	constructor() {
		super({
			id: 'othcloud.developers.manageStatuses',
			title: localize2('othcloud.developers.manageStatuses', 'Manage Task Statuses'),
			category: localize2('othcloud.developers.category', 'Developers'),
			f1: true,
			menu: [{
				id: MenubarDevelopersMenu,
				group: '2_settings',
				order: 2,
			}],
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const storage = accessor.get(IStorageService);
		const quickInput = accessor.get(IQuickInputService);
		const notif = accessor.get(INotificationService);

		const jwt = storage.get('othcloud.developers.jwt', StorageScope.APPLICATION);
		const tok = storage.get('othcloud.developers.accessToken', StorageScope.APPLICATION);
		if (!jwt || !tok) {
			notif.notify({ severity: Severity.Warning, message: localize('othcloud.developers.signInFirst', 'Sign in to othcloud Developer first.') });
			return;
		}
		setAccessToken(tok);

		const showPicker = async () => {
			let statuses: DevStatus[] = [];
			try {
				statuses = await DevelopersClient.listStatuses(jwt);
			} catch (err) {
				notif.notify({ severity: Severity.Error, message: String((err as Error).message ?? err) });
				return;
			}
			statuses.sort((a, b) => a.order - b.order);

			const items: (IQuickPickItem & { kind: 'add' | 'status'; status?: DevStatus })[] = [
				{ label: '$(add) Add new status…', kind: 'add' },
				...statuses.map(s => ({
					label: s.label,
					description: s.key === 'open' ? '(default — cannot remove)' : s.key,
					kind: 'status' as const,
					status: s,
				})),
			];
			const picked = await quickInput.pick(items, {
				placeHolder: localize('othcloud.developers.statusPick', 'Pick a status to remove, or add a new one'),
				matchOnDescription: true,
			});
			if (!picked) { return; }

			if (picked.kind === 'add') {
				const label = await quickInput.input({
					prompt: localize('othcloud.developers.statusLabel', 'Display name for the new status (e.g. "Blocked")'),
				});
				if (!label) { return; }
				const key = await quickInput.input({
					prompt: localize('othcloud.developers.statusKey', 'Internal key (lowercase, a-z 0-9 _ -)'),
					value: label.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
				});
				if (!key) { return; }
				const order = statuses.length;
				try {
					await DevelopersClient.addStatus(jwt, key, label, order);
					notif.notify({ severity: Severity.Info, message: localize('othcloud.developers.statusAdded', 'Status "{0}" added.', label) });
					storage.store('othcloud.developers.tasksRev', String(Date.now()), StorageScope.APPLICATION, StorageTarget.MACHINE);
				} catch (err) {
					notif.notify({ severity: Severity.Error, message: String((err as Error).message ?? err) });
				}
				return;
			}

			const target = picked.status!;
			if (target.key === 'open') {
				notif.notify({ severity: Severity.Warning, message: localize('othcloud.developers.statusOpenLocked', 'The default "Open" status cannot be removed.') });
				return;
			}
			const confirm = await quickInput.pick(
				[{ label: 'Remove', description: 'Tasks using it will move back to "Open"' }, { label: 'Cancel' }],
				{ placeHolder: localize('othcloud.developers.statusRemoveConfirm', 'Remove "{0}"?', target.label) },
			);
			if (!confirm || confirm.label !== 'Remove') { return; }
			try {
				await DevelopersClient.deleteStatus(jwt, target.key);
				notif.notify({ severity: Severity.Info, message: localize('othcloud.developers.statusRemoved', 'Status "{0}" removed.', target.label) });
				storage.store('othcloud.developers.tasksRev', String(Date.now()), StorageScope.APPLICATION, StorageTarget.MACHINE);
			} catch (err) {
				notif.notify({ severity: Severity.Error, message: String((err as Error).message ?? err) });
			}
		};
		await showPicker();
	}
});

registerAction2(class ToggleActivityBarAction extends Action2 {
	constructor() {
		super({
			id: 'othcloud.developers.toggleActivityBar',
			title: localize2('othcloud.developers.toggleActivityBar', 'Show in Activity Bar'),
			category: localize2('othcloud.developers.category', 'Developers'),
			f1: true,
			toggled: {
				condition: OthcloudActivityBarEnabledContext,
				title: localize('othcloud.developers.activityBarOn', 'Show in Activity Bar (on)'),
			},
			menu: [{
				id: MenubarDevelopersMenu,
				group: '2_settings',
				order: 1,
			}],
		});
	}

	async run(accessor: ServicesAccessor, explicit?: boolean): Promise<void> {
		const storage = accessor.get(IStorageService);
		const current = storage.getBoolean(STORAGE_ACTIVITY_BAR_ENABLED, StorageScope.APPLICATION, false);
		const next = typeof explicit === 'boolean' ? explicit : !current;
		storage.store(STORAGE_ACTIVITY_BAR_ENABLED, next, StorageScope.APPLICATION, StorageTarget.MACHINE);
	}
});

registerWorkbenchContribution2(
	DevelopersAccountMenuContribution.ID,
	DevelopersAccountMenuContribution,
	WorkbenchPhase.AfterRestored,
);

registerWorkbenchContribution2(
	DevelopersActivityBarContribution.ID,
	DevelopersActivityBarContribution,
	WorkbenchPhase.BlockStartup,
);

// Marker export to silence isolatedModules.
export const _ = localize('othcloud.developers.placeholder', 'othcloud Developers');
