/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize, localize2 } from '../../../../nls.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { Action2, MenuId, MenuRegistry, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { IInstantiationService, ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { EditorExtensions, IEditorFactoryRegistry, IEditorSerializer } from '../../../common/editor.js';
import { EditorPaneDescriptor, IEditorPaneRegistry } from '../../../browser/editor.js';
import { AUX_WINDOW_GROUP, IEditorService } from '../../../services/editor/common/editorService.js';
import { DevelopersInput } from './developersInput.js';
import { DevelopersPage } from './developersPage.js';

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
	serialize(_input: DevelopersInput): string { return JSON.stringify({}); }
	deserialize(_instantiationService: IInstantiationService, _serialized: string): DevelopersInput {
		return new DevelopersInput({});
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
		await editorService.openEditor(input, {
			pinned: true,
			auxiliary: {
				compact: false,
				alwaysOnTop: false,
				bounds: { width: 980, height: 680 },
			},
		}, AUX_WINDOW_GROUP);
	}
});

// Marker export to silence isolatedModules.
export const _ = localize('othcloud.developers.placeholder', 'othcloud Developers');
