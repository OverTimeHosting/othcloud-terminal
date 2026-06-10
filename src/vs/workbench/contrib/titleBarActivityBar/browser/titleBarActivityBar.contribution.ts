/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/titleBarActivityBar.css';
import { $, addDisposableListener, append, clearNode, EventType } from '../../../../base/browser/dom.js';
import { mainWindow } from '../../../../base/browser/window.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { Disposable, DisposableStore, MutableDisposable } from '../../../../base/common/lifecycle.js';
import { ThemeIcon } from '../../../../base/common/themables.js';
import { URI } from '../../../../base/common/uri.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { IViewDescriptorService, ViewContainer, ViewContainerLocation } from '../../../common/views.js';
import { IWorkbenchContribution, IWorkbenchContributionsRegistry, Extensions as WorkbenchExtensions } from '../../../common/contributions.js';
import { LifecyclePhase } from '../../../services/lifecycle/common/lifecycle.js';
import { IWorkbenchLayoutService, Parts } from '../../../services/layout/browser/layoutService.js';
import { IPaneCompositePartService } from '../../../services/panecomposite/browser/panecomposite.js';

/**
 * Renders the primary side bar's activity bar (its view-container icons) horizontally in the main
 * window's title bar, next to the app logo. Pairs with the `workbench.activityBar.location` default
 * of `hidden` so the icons live only in the title bar instead of at the top of the side bar.
 *
 * The core title bar can't depend on these services, so the widget is injected into the title bar
 * container obtained via the layout service.
 */
class TitleBarActivityBarContribution extends Disposable implements IWorkbenchContribution {

	private _bar: HTMLElement | undefined;
	private readonly _renderDisposables = this._register(new MutableDisposable<DisposableStore>());

	constructor(
		@IViewDescriptorService private readonly _viewDescriptorService: IViewDescriptorService,
		@IPaneCompositePartService private readonly _paneCompositeService: IPaneCompositePartService,
		@IWorkbenchLayoutService private readonly _layoutService: IWorkbenchLayoutService,
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

	private _ensureBar(): HTMLElement | undefined {
		const titlebar = this._layoutService.getContainer(mainWindow, Parts.TITLEBAR_PART);
		const left = titlebar?.querySelector('.titlebar-left') as HTMLElement | null;
		if (!left) {
			return undefined;
		}
		if (!this._bar || this._bar.parentElement !== left) {
			this._bar?.remove();
			this._bar = $('.titlebar-activity-bar');
			left.appendChild(this._bar);
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

	private _render(): void {
		const container = this._ensureBar();
		if (!container) {
			return;
		}

		const store = new DisposableStore();
		this._renderDisposables.value = store;
		clearNode(container);

		const activeId = this._paneCompositeService.getActivePaneComposite(ViewContainerLocation.Sidebar)?.getId();
		for (const viewContainer of this._orderedContainers()) {
			const button = append(container, $('button.titlebar-activity-item'));
			button.title = typeof viewContainer.title === 'string' ? viewContainer.title : viewContainer.title.value;
			if (viewContainer.id === activeId) {
				button.classList.add('active');
			}
			const icon = viewContainer.icon;
			if (ThemeIcon.isThemeIcon(icon)) {
				button.classList.add(...ThemeIcon.asClassName(icon).split(' '));
			} else if (URI.isUri(icon)) {
				button.classList.add('image-icon');
				button.style.backgroundImage = `url('${icon.toString(true)}')`;
			} else {
				button.classList.add(...ThemeIcon.asClassName(Codicon.window).split(' '));
			}
			store.add(addDisposableListener(button, EventType.CLICK, () => {
				void this._paneCompositeService.openPaneComposite(viewContainer.id, ViewContainerLocation.Sidebar, true);
			}));
		}
	}
}

Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench)
	.registerWorkbenchContribution(TitleBarActivityBarContribution, LifecyclePhase.Restored);
