/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize, localize2 } from '../../../../nls.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { CancellationToken } from '../../../../base/common/cancellation.js';
import { URI } from '../../../../base/common/uri.js';
import { Schemas } from '../../../../base/common/network.js';
import { Action2, MenuId, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { ContextKeyExpr } from '../../../../platform/contextkey/common/contextkey.js';
import { IExternalOpener, IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IWorkbenchContribution, registerWorkbenchContribution2, WorkbenchPhase } from '../../../common/contributions.js';
import { IEditorGroupsService, IEditorGroup } from '../../../services/editor/common/editorGroupsService.js';
import { AUX_WINDOW_GROUP, IEditorService } from '../../../services/editor/common/editorService.js';
import { BrowserViewUri } from '../../../../platform/browserView/common/browserViewUri.js';

const BROWSER_EDITOR_ID = 'workbench.editor.browser';

const BROWSER_OPEN_COMMAND = 'workbench.action.browser.open';

function findExistingBrowserGroup(editorGroupsService: IEditorGroupsService): IEditorGroup | undefined {
	for (const group of editorGroupsService.groups) {
		if (group.editors.some(e => e.resource?.scheme === Schemas.vscodeBrowser)) {
			return group;
		}
	}
	return undefined;
}

async function openBrowserTab(
	editorService: IEditorService,
	editorGroupsService: IEditorGroupsService,
	url: string | undefined,
): Promise<void> {
	const targetGroup = findExistingBrowserGroup(editorGroupsService) ?? editorGroupsService.activeGroup;

	await editorService.openEditor(
		{ resource: BrowserViewUri.forUrl(url), options: { pinned: !!url } },
		targetGroup.id,
	);

	if (!targetGroup.isLocked) {
		targetGroup.lock(true);
	}
}

registerAction2(class OpenBrowserAction extends Action2 {
	constructor() {
		super({
			id: 'othcloud.browser.open',
			title: localize2('othcloud.browser.open', "Browser"),
			icon: Codicon.globe,
			f1: true,
			menu: [{
				id: MenuId.EditorTitle,
				group: 'navigation',
				order: 99999,
			}, {
				id: MenuId.CompactWindowEditorTitle,
				group: 'navigation',
				order: 99999,
			}],
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const editorService = accessor.get(IEditorService);
		const editorGroupsService = accessor.get(IEditorGroupsService);
		await openBrowserTab(editorService, editorGroupsService, undefined);
	}
});

registerAction2(class PopOutBrowserAction extends Action2 {
	constructor() {
		super({
			id: 'othcloud.browser.popOut',
			title: localize2('othcloud.browser.popOut', "Pop Out as Floating Window"),
			icon: Codicon.multipleWindows,
			f1: true,
			precondition: ContextKeyExpr.and(
				ContextKeyExpr.equals('activeEditor', BROWSER_EDITOR_ID),
				ContextKeyExpr.equals('browserHasUrl', true),
			),
			menu: [{
				id: MenuId.BrowserActionsToolbar,
				group: 'actions',
				order: 5,
			}],
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const editorService = accessor.get(IEditorService);
		const activeResource = editorService.activeEditor?.resource;
		if (!activeResource || activeResource.scheme !== Schemas.vscodeBrowser) {
			return;
		}
		const url = BrowserViewUri.getUrl(activeResource);
		if (!url) {
			return;
		}
		await editorService.openEditor({
			resource: BrowserViewUri.forUrl(url),
			options: {
				pinned: true,
				auxiliary: {
					compact: true,
					alwaysOnTop: true,
					bounds: { width: 480, height: 320 },
				},
			},
		}, AUX_WINDOW_GROUP);
	}
});

registerAction2(class OpenGithubQuickLinkAction extends Action2 {
	constructor() {
		super({
			id: 'othcloud.browser.quickLink.github',
			title: localize2('othcloud.browser.quickLink.github', "GitHub"),
			icon: Codicon.github,
			f1: true,
			menu: [{ id: MenuId.BrowserNavigationToolbar, group: 'quicklinks', order: 10 }],
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const editorService = accessor.get(IEditorService);
		const editorGroupsService = accessor.get(IEditorGroupsService);
		await openBrowserTab(editorService, editorGroupsService, 'https://github.com');
	}
});

registerAction2(class OpenOvertimeQuickLinkAction extends Action2 {
	constructor() {
		super({
			id: 'othcloud.browser.quickLink.overtime',
			title: localize2('othcloud.browser.quickLink.overtime', "Overtime Hosting"),
			icon: Codicon.server,
			f1: true,
			menu: [{ id: MenuId.BrowserNavigationToolbar, group: 'quicklinks', order: 11 }],
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const editorService = accessor.get(IEditorService);
		const editorGroupsService = accessor.get(IEditorGroupsService);
		await openBrowserTab(editorService, editorGroupsService, 'https://overtime.hosting');
	}
});

registerAction2(class OpenOthcloudQuickLinkAction extends Action2 {
	constructor() {
		super({
			id: 'othcloud.browser.quickLink.othcloud',
			title: localize2('othcloud.browser.quickLink.othcloud', "Othcloud"),
			icon: Codicon.cloud,
			f1: true,
			menu: [{ id: MenuId.BrowserNavigationToolbar, group: 'quicklinks', order: 12 }],
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const editorService = accessor.get(IEditorService);
		const editorGroupsService = accessor.get(IEditorGroupsService);
		await openBrowserTab(editorService, editorGroupsService, 'https://othcloud.xyz');
	}
});

class OthcloudBrowserExternalOpener extends Disposable implements IWorkbenchContribution {
	static readonly ID = 'workbench.contrib.othcloudBrowserExternalOpener';

	constructor(
		@IOpenerService openerService: IOpenerService,
		@ICommandService private readonly commandService: ICommandService,
		@IEditorGroupsService private readonly editorGroupsService: IEditorGroupsService,
		@IEditorService private readonly editorService: IEditorService,
	) {
		super();
		this._register(openerService.registerExternalOpener(this.makeOpener()));
	}

	private makeOpener(): IExternalOpener {
		return {
			openExternal: async (href: string, _ctx, _token: CancellationToken): Promise<boolean> => {
				try {
					const uri = URI.parse(href);
					if (uri.scheme !== Schemas.http && uri.scheme !== Schemas.https) {
						return false;
					}
				} catch {
					return false;
				}

				try {
					const existing = findExistingBrowserGroup(this.editorGroupsService);
					if (existing) {
						await this.editorService.openEditor({ resource: BrowserViewUri.forUrl(href) }, existing.id);
					} else {
						await this.commandService.executeCommand(BROWSER_OPEN_COMMAND, { url: href, openToSide: true });
					}
					const group = findExistingBrowserGroup(this.editorGroupsService);
					if (group && !group.isLocked) {
						group.lock(true);
					}
					return true;
				} catch {
					return false;
				}
			}
		};
	}
}

registerWorkbenchContribution2(OthcloudBrowserExternalOpener.ID, OthcloudBrowserExternalOpener, WorkbenchPhase.AfterRestored);

// Marker export to silence isolatedModules
export const _ = localize('othcloud.browser.placeholder', "Othcloud browser");
