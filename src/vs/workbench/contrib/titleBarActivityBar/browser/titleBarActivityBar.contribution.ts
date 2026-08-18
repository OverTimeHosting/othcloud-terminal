/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/titleBarActivityBar.css';
import { $, addDisposableListener, append, clearNode, EventType } from '../../../../base/browser/dom.js';
import { StandardKeyboardEvent } from '../../../../base/browser/keyboardEvent.js';
import { mainWindow } from '../../../../base/browser/window.js';
import { IAction, toAction } from '../../../../base/common/actions.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { KeyCode } from '../../../../base/common/keyCodes.js';
import { Disposable, DisposableStore, MutableDisposable } from '../../../../base/common/lifecycle.js';
import { ThemeIcon } from '../../../../base/common/themables.js';
import { URI } from '../../../../base/common/uri.js';
import { localize } from '../../../../nls.js';
import { IContextMenuService } from '../../../../platform/contextview/browser/contextView.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { IViewDescriptorService, ViewContainer, ViewContainerLocation } from '../../../common/views.js';
import { IWorkbenchContribution, IWorkbenchContributionsRegistry, Extensions as WorkbenchExtensions } from '../../../common/contributions.js';
import { LifecyclePhase } from '../../../services/lifecycle/common/lifecycle.js';
import { IWorkbenchLayoutService, Parts } from '../../../services/layout/browser/layoutService.js';
import { IPaneCompositePartService } from '../../../services/panecomposite/browser/panecomposite.js';

/**
 * Presents the primary side bar's view containers as a single drop-down button in
 * the right-hand side of the title bar, sitting alongside the other global actions
 * (accounts, settings) rather than as a strip of individual icons.
 *
 * Pairs with the `workbench.activityBar.location` default of `hidden` so the
 * containers are reachable from exactly one place.
 *
 * The core title bar can't depend on these services, so the widget is injected into
 * the title bar container obtained via the layout service.
 */
class TitleBarActivityBarContribution extends Disposable implements IWorkbenchContribution {

	private _bar: HTMLElement | undefined;
	private readonly _renderDisposables = this._register(new MutableDisposable<DisposableStore>());

	constructor(
		@IViewDescriptorService private readonly _viewDescriptorService: IViewDescriptorService,
		@IPaneCompositePartService private readonly _paneCompositeService: IPaneCompositePartService,
		@IWorkbenchLayoutService private readonly _layoutService: IWorkbenchLayoutService,
		@IContextMenuService private readonly _contextMenuService: IContextMenuService,
	) {
		super();

		const rerender = () => this._render();
		this._register(this._viewDescriptorService.onDidChangeViewContainers(rerender));
		this._register(this._viewDescriptorService.onDidChangeContainerLocation(rerender));
		this._register(this._paneCompositeService.onDidPaneCompositeOpen(e => { if (e.viewContainerLocation === ViewContainerLocation.Sidebar) { this._render(); } }));
		this._register(this._paneCompositeService.onDidPaneCompositeClose(e => { if (e.viewContainerLocation === ViewContainerLocation.Sidebar) { this._render(); } }));
		this._register(this._layoutService.onDidChangePartVisibility(() => this._render()));

		this._render();
	}

	/**
	 * Hosts the button in `.titlebar-right`, immediately before the global action
	 * tool bar so it reads as part of that group (…, views, accounts, settings).
	 */
	private _ensureBar(): HTMLElement | undefined {
		const titlebar = this._layoutService.getContainer(mainWindow, Parts.TITLEBAR_PART);
		// The title bar part owns this DOM; we are a separate contribution injecting
		// into it, so there is no h()-built handle to reach for.
		// eslint-disable-next-line no-restricted-syntax
		const right = titlebar?.querySelector('.titlebar-right') as HTMLElement | null;
		if (!right) {
			return undefined;
		}
		if (!this._bar || this._bar.parentElement !== right) {
			this._bar?.remove();
			this._bar = $('.titlebar-activity-bar');
			// eslint-disable-next-line no-restricted-syntax
			const actionToolBar = right.querySelector('.action-toolbar-container');
			if (actionToolBar) {
				right.insertBefore(this._bar, actionToolBar);
			} else {
				right.appendChild(this._bar);
			}
		}
		return this._bar;
	}

	private _orderedContainers(): ViewContainer[] {
		return this._viewDescriptorService.getViewContainersByLocation(ViewContainerLocation.Sidebar)
			.filter(container => {
				// Skip empty containers that opt to hide themselves when they have nothing to show.
				if (!container.hideIfEmpty) {
					return true;
				}
				return this._viewDescriptorService.getViewContainerModel(container).visibleViewDescriptors.length > 0;
			})
			.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
	}

	private _titleOf(viewContainer: ViewContainer): string {
		return typeof viewContainer.title === 'string' ? viewContainer.title : viewContainer.title.value;
	}

	private _applyIcon(button: HTMLElement, viewContainer: ViewContainer | undefined): void {
		const icon = viewContainer?.icon;
		if (ThemeIcon.isThemeIcon(icon)) {
			button.classList.add(...ThemeIcon.asClassName(icon).split(' '));
		} else if (URI.isUri(icon)) {
			button.classList.add('image-icon');
			button.style.backgroundImage = `url('${icon.toString(true)}')`;
		} else {
			button.classList.add(...ThemeIcon.asClassName(Codicon.layoutSidebarLeft).split(' '));
		}
	}

	private _render(): void {
		const container = this._ensureBar();
		if (!container) {
			return;
		}

		const store = new DisposableStore();
		this._renderDisposables.value = store;
		clearNode(container);

		const viewContainers = this._orderedContainers();
		if (!viewContainers.length) {
			return;
		}

		const activeId = this._paneCompositeService.getActivePaneComposite(ViewContainerLocation.Sidebar)?.getId();
		const active = viewContainers.find(c => c.id === activeId);

		// Reflect whichever container is open so the button doubles as an indicator.
		const button = append(container, $('button.titlebar-activity-menu'));
		this._applyIcon(button, active);
		button.setAttribute('aria-haspopup', 'true');
		button.title = active
			? localize('othcloud.titlebar.viewsActive', "Views: {0}", this._titleOf(active))
			: localize('othcloud.titlebar.views', "Views");
		if (active) {
			button.classList.add('active');
		}

		const show = () => {
			const actions: IAction[] = viewContainers.map(viewContainer => toAction({
				id: `othcloud.titlebar.view.${viewContainer.id}`,
				label: this._titleOf(viewContainer),
				checked: viewContainer.id === activeId,
				run: () => {
					void this._paneCompositeService.openPaneComposite(viewContainer.id, ViewContainerLocation.Sidebar, true);
				},
			}));
			this._contextMenuService.showContextMenu({
				getAnchor: () => button,
				getActions: () => actions,
				onHide: () => button.classList.remove('expanded'),
			});
			button.classList.add('expanded');
		};

		store.add(addDisposableListener(button, EventType.CLICK, e => {
			e.preventDefault();
			e.stopPropagation();
			show();
		}));
		store.add(addDisposableListener(button, EventType.KEY_DOWN, e => {
			const event = new StandardKeyboardEvent(e);
			if (event.equals(KeyCode.Enter) || event.equals(KeyCode.Space) || event.equals(KeyCode.DownArrow)) {
				event.preventDefault();
				event.stopPropagation();
				show();
			}
		}));
	}
}

Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench)
	.registerWorkbenchContribution(TitleBarActivityBarContribution, LifecyclePhase.Restored);
