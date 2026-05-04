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
import { IExternalOpener, IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IWorkbenchContribution, registerWorkbenchContribution2, WorkbenchPhase } from '../../../common/contributions.js';
import { IEditorGroupsService, IEditorGroup } from '../../../services/editor/common/editorGroupsService.js';
import { IEditorService } from '../../../services/editor/common/editorService.js';
import { BrowserViewUri } from '../../../../platform/browserView/common/browserViewUri.js';

const BROWSER_OPEN_COMMAND = 'workbench.action.browser.open';

const QUICK_LINKS: ReadonlyArray<{ id: string; title: string; icon: { id: string }; url: string; order: number }> = [
	{ id: 'othcloud.browser.quickLink.github', title: 'GitHub', icon: Codicon.github, url: 'https://github.com', order: 10 },
	{ id: 'othcloud.browser.quickLink.overtime', title: 'Overtime Hosting', icon: Codicon.server, url: 'https://overtime.hosting', order: 11 },
	{ id: 'othcloud.browser.quickLink.othcloud', title: 'Othcloud', icon: Codicon.cloud, url: 'https://othcloud.xyz', order: 12 },
];

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

for (const link of QUICK_LINKS) {
	registerAction2(class extends Action2 {
		constructor() {
			super({
				id: link.id,
				title: localize2(link.id, link.title),
				icon: link.icon,
				f1: true,
				menu: [{
					id: MenuId.BrowserNavigationToolbar,
					group: 'quicklinks',
					order: link.order,
				}],
			});
		}

		async run(accessor: ServicesAccessor): Promise<void> {
			const editorService = accessor.get(IEditorService);
			const editorGroupsService = accessor.get(IEditorGroupsService);
			await openBrowserTab(editorService, editorGroupsService, link.url);
		}
	});
}

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
