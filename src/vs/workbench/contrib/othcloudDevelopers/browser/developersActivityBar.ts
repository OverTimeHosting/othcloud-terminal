/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize, localize2 } from '../../../../nls.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { $, append } from '../../../../base/browser/dom.js';
import { Disposable, DisposableStore } from '../../../../base/common/lifecycle.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { IContextKey, IContextKeyService, RawContextKey } from '../../../../platform/contextkey/common/contextkey.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { IKeybindingService } from '../../../../platform/keybinding/common/keybinding.js';
import { IContextMenuService } from '../../../../platform/contextview/browser/contextView.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IHoverService } from '../../../../platform/hover/browser/hover.js';
import { IStorageService, StorageScope } from '../../../../platform/storage/common/storage.js';
import { ViewPane } from '../../../browser/parts/views/viewPane.js';
import { IViewPaneOptions } from '../../../browser/parts/views/viewPane.js';
import { ViewPaneContainer } from '../../../browser/parts/views/viewPaneContainer.js';
import { Extensions as ViewExtensions, IViewContainersRegistry, IViewDescriptor, IViewsRegistry, ViewContainer, ViewContainerLocation } from '../../../common/views.js';
import { IViewDescriptorService } from '../../../common/views.js';
import { IWorkbenchContribution } from '../../../common/contributions.js';

export const STORAGE_ACTIVITY_BAR_ENABLED = 'othcloud.developers.activityBarEnabled';
export const STORAGE_USER = 'othcloud.developers.user';

const VIEW_CONTAINER_ID = 'workbench.view.othcloudDevelopers';
const VIEW_ID = 'workbench.view.othcloudDevelopers.home';
const OPEN_DEVELOPERS_COMMAND = 'othcloud.developers.open';
const TOGGLE_ACTIVITY_BAR_COMMAND = 'othcloud.developers.toggleActivityBar';

export const OthcloudActivityBarEnabledContext = new RawContextKey<boolean>(
	'othcloud.developers.activityBarEnabled', false,
);

class DevelopersSidebarView extends ViewPane {

	static readonly TITLE = localize2('othcloud.developers.sidebarViewTitle', 'Developers');

	constructor(
		options: IViewPaneOptions,
		@IKeybindingService keybindingService: IKeybindingService,
		@IContextMenuService contextMenuService: IContextMenuService,
		@IConfigurationService configurationService: IConfigurationService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IInstantiationService instantiationService: IInstantiationService,
		@IOpenerService openerService: IOpenerService,
		@IThemeService themeService: IThemeService,
		@IHoverService hoverService: IHoverService,
		@IStorageService private readonly storageService: IStorageService,
		@ICommandService private readonly commandService: ICommandService,
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, hoverService);
	}

	protected override renderBody(container: HTMLElement): void {
		super.renderBody(container);
		container.classList.add('othcloud-dev-sidebar');

		const wrap = append(container, $('div'));
		wrap.style.padding = '10px 12px';
		wrap.style.display = 'flex';
		wrap.style.flexDirection = 'column';
		wrap.style.gap = '8px';

		const account = append(wrap, $('div'));
		account.style.fontSize = '12px';
		account.style.color = 'var(--vscode-descriptionForeground)';
		const refreshAccount = () => {
			const raw = this.storageService.get(STORAGE_USER, StorageScope.APPLICATION);
			if (raw) {
				try {
					const u = JSON.parse(raw) as { username: string };
					account.textContent = localize('othcloud.dev.signedInAs', 'Signed in as {0}', u.username);
					return;
				} catch { /* fall through */ }
			}
			account.textContent = localize('othcloud.dev.notSignedIn', 'Not signed in');
		};
		refreshAccount();

		const open = append(wrap, $('button')) as HTMLButtonElement;
		open.textContent = localize('othcloud.dev.openPanel', 'Open Developers Panel');
		open.style.background = 'var(--vscode-button-background)';
		open.style.color = 'var(--vscode-button-foreground)';
		open.style.border = 'none';
		open.style.padding = '6px 10px';
		open.style.borderRadius = '2px';
		open.style.cursor = 'pointer';
		open.style.font = 'inherit';
		open.onclick = () => this.commandService.executeCommand(OPEN_DEVELOPERS_COMMAND);

		const hide = append(wrap, $('button')) as HTMLButtonElement;
		hide.textContent = localize('othcloud.dev.hideFromActivityBar', 'Hide from activity bar');
		hide.style.background = 'transparent';
		hide.style.color = 'var(--vscode-textLink-foreground)';
		hide.style.border = 'none';
		hide.style.padding = '0';
		hide.style.cursor = 'pointer';
		hide.style.font = 'inherit';
		hide.style.fontSize = '11px';
		hide.style.alignSelf = 'flex-start';
		hide.onclick = () => this.commandService.executeCommand(TOGGLE_ACTIVITY_BAR_COMMAND, false);

		// Re-render account label when storage changes (sign in / sign out).
		const filter = this._register(new DisposableStore());
		this._register(
			this.storageService.onDidChangeValue(StorageScope.APPLICATION, STORAGE_USER, filter)(() => refreshAccount()),
		);
	}
}

const viewContainer: ViewContainer = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).registerViewContainer({
	id: VIEW_CONTAINER_ID,
	title: localize2('othcloud.developers.activityBarTitle', 'Developers'),
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [VIEW_CONTAINER_ID, { mergeViewWithContainerWhenSingleView: true }]),
	icon: Codicon.tools,
	order: 7,
	storageId: VIEW_CONTAINER_ID + '.state',
	hideIfEmpty: true,
}, ViewContainerLocation.Sidebar);

const viewDescriptor: IViewDescriptor = {
	id: VIEW_ID,
	name: DevelopersSidebarView.TITLE,
	containerIcon: Codicon.tools,
	ctorDescriptor: new SyncDescriptor(DevelopersSidebarView),
	canToggleVisibility: false,
	canMoveView: false,
	when: OthcloudActivityBarEnabledContext,
	order: 1,
};

Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).registerViews([viewDescriptor], viewContainer);

/**
 * Reads the persisted activity-bar opt-in flag and keeps the context key
 * (`OthcloudActivityBarEnabledContext`) in sync. Toggling the flag elsewhere
 * (the panel checkbox or the command) updates storage; this contribution
 * propagates the change to the context key, which controls view visibility.
 */
export class DevelopersActivityBarContribution extends Disposable implements IWorkbenchContribution {

	static readonly ID = 'workbench.contrib.othcloudDevelopersActivityBar';

	private readonly enabledKey: IContextKey<boolean>;

	constructor(
		@IStorageService private readonly storageService: IStorageService,
		@IContextKeyService contextKeyService: IContextKeyService,
	) {
		super();
		this.enabledKey = OthcloudActivityBarEnabledContext.bindTo(contextKeyService);
		this.refresh();

		const filter = this._register(new DisposableStore());
		this._register(
			this.storageService.onDidChangeValue(StorageScope.APPLICATION, STORAGE_ACTIVITY_BAR_ENABLED, filter)(
				() => this.refresh(),
			),
		);
	}

	private refresh(): void {
		const enabled = this.storageService.getBoolean(STORAGE_ACTIVITY_BAR_ENABLED, StorageScope.APPLICATION, false);
		this.enabledKey.set(enabled);
	}
}
