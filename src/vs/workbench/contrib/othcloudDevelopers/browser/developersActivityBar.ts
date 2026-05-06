/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize, localize2 } from '../../../../nls.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { $, append, clearNode } from '../../../../base/browser/dom.js';
import { Disposable, DisposableStore } from '../../../../base/common/lifecycle.js';
import { DevelopersClient, setAccessToken, DevTask } from './developersClient.js';
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
export const STORAGE_TASKS_REV = 'othcloud.developers.tasksRev';
const STORAGE_JWT = 'othcloud.developers.jwt';
const STORAGE_ACCESS_TOKEN = 'othcloud.developers.accessToken';

const VIEW_CONTAINER_ID = 'workbench.view.othcloudDevelopers';
const VIEW_ID = 'workbench.view.othcloudDevelopers.home';
const OPEN_TASK_IN_WINDOW_COMMAND = 'othcloud.developers.openTaskInWindow';

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

		const wrap = append(container, $('div.dev-sidebar-wrap'));

		const tasksHeader = append(wrap, $('.dev-sidebar-section-header'));
		append(tasksHeader, $('span', {}, localize('othcloud.dev.recentTasks', 'Tasks')));

		const tasksList = append(wrap, $('.dev-sidebar-task-list'));

		const renderTaskRow = (parent: HTMLElement, t: DevTask) => {
			const row = append(parent, $('button.dev-sidebar-task'));
			row.title = `#${t.id} · ${t.status}` + (t.assigneeEmail ? ` · ${t.assigneeEmail}` : '');
			append(row, $('.dev-sidebar-task-title', {}, t.title));
			append(row, $('.dev-sidebar-task-meta', {},
				`#${t.id} · ${t.status}` + (t.assigneeEmail ? ` · ${t.assigneeEmail}` : ''),
			));
			row.onclick = () => this.commandService.executeCommand(OPEN_TASK_IN_WINDOW_COMMAND, t.id);
		};

		const loadTasks = async () => {
			clearNode(tasksList);
			const tok = this.storageService.get(STORAGE_ACCESS_TOKEN, StorageScope.APPLICATION);
			const jwt = this.storageService.get(STORAGE_JWT, StorageScope.APPLICATION);
			if (!tok || !jwt) {
				append(tasksList, $('.dev-sidebar-hint', {}, localize('othcloud.dev.signInPrompt', 'Sign in to see tasks.')));
				return;
			}
			setAccessToken(tok);
			append(tasksList, $('.dev-sidebar-hint', {}, localize('othcloud.dev.loading', 'Loading…')));
			try {
				const [globalTasks, services] = await Promise.all([
					DevelopersClient.listTasks(jwt),
					DevelopersClient.listServices(jwt).catch(() => []),
				]);
				clearNode(tasksList);

				if (globalTasks.length === 0 && services.length === 0) {
					append(tasksList, $('.dev-sidebar-hint', {}, localize('othcloud.dev.noTasks', 'No tasks yet.')));
					return;
				}

				// Global (service-less) tasks at the top.
				if (globalTasks.length > 0) {
					const globalGroup = append(tasksList, $('.dev-sidebar-group'));
					for (const t of globalTasks) { renderTaskRow(globalGroup, t); }
				}

				// Per-service collapsible sections.
				for (const s of services) {
					const group = append(tasksList, $('.dev-sidebar-group.dev-sidebar-service'));
					const header = append(group, $('button.dev-sidebar-service-header')) as HTMLButtonElement;
					const chev = append(header, $('span.chev', {}, '▸'));
					append(header, $('span.label', {}, s.title));
					const list = append(group, $('.dev-sidebar-service-tasks'));
					list.style.display = 'none';

					let expanded = false;
					let loaded = false;
					header.onclick = async () => {
						expanded = !expanded;
						chev.textContent = expanded ? '▾' : '▸';
						list.style.display = expanded ? '' : 'none';
						if (expanded && !loaded) {
							loaded = true;
							append(list, $('.dev-sidebar-hint', {}, localize('othcloud.dev.loading', 'Loading…')));
							try {
								const serviceTasks = await DevelopersClient.listTasks(jwt, { serviceId: s.id });
								clearNode(list);
								if (serviceTasks.length === 0) {
									append(list, $('.dev-sidebar-hint', {}, localize('othcloud.dev.noTasks', 'No tasks yet.')));
								} else {
									for (const t of serviceTasks) { renderTaskRow(list, t); }
								}
							} catch (err) {
								clearNode(list);
								append(list, $('.dev-sidebar-hint', {}, String((err as Error).message ?? err)));
							}
						}
					};
				}
			} catch (err) {
				clearNode(tasksList);
				append(tasksList, $('.dev-sidebar-hint', {}, String((err as Error).message ?? err)));
			}
		};
		void loadTasks();

		// Reload when sign-in changes or when any task mutation bumps the
		// revision counter (set by DevelopersPage on create / patch / message).
		const userFilter = this._register(new DisposableStore());
		this._register(
			this.storageService.onDidChangeValue(StorageScope.APPLICATION, STORAGE_USER, userFilter)(
				() => void loadTasks(),
			),
		);
		const revFilter = this._register(new DisposableStore());
		this._register(
			this.storageService.onDidChangeValue(StorageScope.APPLICATION, STORAGE_TASKS_REV, revFilter)(
				() => void loadTasks(),
			),
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
