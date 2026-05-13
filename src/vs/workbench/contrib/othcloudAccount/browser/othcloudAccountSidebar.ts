/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize, localize2 } from '../../../../nls.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { ThemeIcon } from '../../../../base/common/themables.js';
import { $, append, clearNode } from '../../../../base/browser/dom.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IContextMenuService } from '../../../../platform/contextview/browser/contextView.js';
import { IHoverService } from '../../../../platform/hover/browser/hover.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IKeybindingService } from '../../../../platform/keybinding/common/keybinding.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { ViewPane, IViewPaneOptions } from '../../../browser/parts/views/viewPane.js';
import { ViewPaneContainer } from '../../../browser/parts/views/viewPaneContainer.js';
import {
	Extensions as ViewExtensions,
	IViewContainersRegistry,
	IViewDescriptor,
	IViewsRegistry,
	IViewDescriptorService,
	ViewContainer,
	ViewContainerLocation,
} from '../../../common/views.js';
import { IOthcloudAccountService, IOthcloudUser } from '../common/othcloudAccountService.js';
import { IOthcloudServiceRow, IOthcloudServices, OTHCLOUD_BASE_URL, OthcloudAccountApiError, OthcloudAccountClient } from './othcloudAccountClient.js';
import { BrowserViewUri } from '../../../../platform/browserView/common/browserViewUri.js';
import { IEditorService } from '../../../services/editor/common/editorService.js';
import { IEditorGroupsService } from '../../../services/editor/common/editorGroupsService.js';

export const OTHCLOUD_ACCOUNT_VIEW_CONTAINER_ID = 'workbench.view.othcloudAccount';
export const OTHCLOUD_ACCOUNT_VIEW_ID = 'workbench.view.othcloudAccount.home';

const SIGN_IN_COMMAND = 'othcloud.account.signIn';
const SIGN_OUT_COMMAND = 'othcloud.account.signOut';

type ServicesState =
	| { kind: 'idle' }
	| { kind: 'loading' }
	| { kind: 'loaded'; services: IOthcloudServices }
	| { kind: 'error'; message: string };

interface SectionDef {
	readonly key: keyof IOthcloudServices;
	readonly label: string;
	readonly icon: ThemeIcon;
	readonly emptyLabel: string;
}

class OthcloudAccountSidebarView extends ViewPane {

	static readonly TITLE = localize2('othcloud.account.sidebarViewTitle', 'OTHCloud');

	private state: ServicesState = { kind: 'idle' };
	/** Bumped on every fetch so out-of-order responses can be ignored. */
	private fetchSeq = 0;
	private wrap: HTMLElement | undefined;
	/** IDs of rows currently expanded in the sidebar (parent rows only). */
	private readonly expandedRows = new Set<string>();
	/** Cache of avatar source URL → resolved blob URL, so we don't re-fetch on every rerender. */
	private avatarBlobCache: { source: string; blobUrl: string } | undefined;

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
		@IOthcloudAccountService private readonly accountService: IOthcloudAccountService,
		@ICommandService private readonly commandService: ICommandService,
		@IEditorService private readonly editorService: IEditorService,
		@IEditorGroupsService private readonly editorGroupsService: IEditorGroupsService,
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, hoverService);
	}

	protected override renderBody(container: HTMLElement): void {
		super.renderBody(container);
		container.classList.add('othcloud-account-sidebar');

		this.wrap = append(container, $('div.othcloud-account-wrap'));

		const render = () => {
			if (!this.wrap) { return; }
			clearNode(this.wrap);
			const user = this.accountService.getUser();
			if (user) {
				this.renderSignedIn(this.wrap, user);
			} else {
				// Drop any in-flight result if the user signs out mid-fetch.
				this.state = { kind: 'idle' };
				this.renderSignedOut(this.wrap);
			}
		};

		render();
		this._register(this.accountService.onDidChangeAuth(() => {
			if (this.accountService.isSignedIn()) {
				// Fresh sign-in: kick off the first load before painting.
				void this.refresh();
			}
			render();
		}));

		// First paint after construction: if already signed in, fetch.
		if (this.accountService.isSignedIn()) {
			void this.refresh();
		}
	}

	private renderSignedOut(parent: HTMLElement): void {
		const card = append(parent, $('.othcloud-account-card.signed-out'));
		append(card, $('.othcloud-account-icon', {}, '☁'));
		append(card, $('.othcloud-account-title', {}, localize('othcloud.account.signInTitle', 'Sign in to OTHCloud')));
		append(card, $('.othcloud-account-subtitle', {},
			localize('othcloud.account.signInBlurb', 'Link this terminal to your othcloud.xyz account to see and manage your services.'),
		));

		const cta = append(card, $('button.othcloud-account-cta')) as HTMLButtonElement;
		cta.textContent = localize('othcloud.account.signInCta', 'Sign in at othcloud.xyz');
		cta.onclick = () => this.commandService.executeCommand(SIGN_IN_COMMAND);
	}

	private renderSignedIn(parent: HTMLElement, user: IOthcloudUser): void {
		const header = append(parent, $('.othcloud-account-header'));
		this.renderAvatar(header, user);
		const nameWrap = append(header, $('.othcloud-account-name-wrap'));
		append(nameWrap, $('.othcloud-account-name', {}, user.name || user.email));
		append(nameWrap, $('.othcloud-account-email', {}, user.email));

		const consoleBtn = append(header, $('button.othcloud-account-iconbtn')) as HTMLButtonElement;
		append(consoleBtn, $('span' + ThemeIcon.asCSSSelector(Codicon.window)));
		consoleBtn.title = localize('othcloud.account.openConsoleTooltip', 'Open Othcloud Console');
		consoleBtn.onclick = () => void this.commandService.executeCommand('othcloud.console.open');

		const refreshBtn = append(header, $('button.othcloud-account-iconbtn')) as HTMLButtonElement;
		append(refreshBtn, $('span' + ThemeIcon.asCSSSelector(Codicon.refresh)));
		refreshBtn.title = localize('othcloud.account.refreshTooltip', 'Refresh services');
		refreshBtn.onclick = () => void this.refresh();

		const signOut = append(header, $('button.othcloud-account-signout')) as HTMLButtonElement;
		signOut.textContent = localize('othcloud.account.signOut', 'Sign out');
		signOut.title = localize('othcloud.account.signOutTooltip', 'Sign out of OTHCloud');
		signOut.onclick = () => this.commandService.executeCommand(SIGN_OUT_COMMAND);

		const sections: readonly SectionDef[] = [
			{ key: 'projects', label: localize('othcloud.account.projects', 'Projects'), icon: Codicon.folder, emptyLabel: localize('othcloud.account.noProjects', 'No projects yet.') },
		];

		for (const def of sections) {
			this.renderSection(parent, def);
		}
	}

	/**
	 * Avatar in the signed-in header. Always uses {@link Codicon.account} as
	 * the fallback (both when no `avatarUrl` is set and when the configured
	 * URL fails to load) so we never end up with a broken-image glyph or
	 * out-of-place initials in the VS Code chrome.
	 *
	 * The workbench CSP only permits `https:` / `data:` / `blob:` for `img-src`,
	 * which blocks `http://localhost:3001` avatars in dev. We work around that
	 * by fetching the avatar bytes and showing it as a `blob:` URL — which
	 * also future-proofs us against private/authed avatar endpoints.
	 */
	private renderAvatar(parent: HTMLElement, user: IOthcloudUser): void {
		const renderFallback = () => {
			const fallback = $('span.othcloud-account-avatar.placeholder' + ThemeIcon.asCSSSelector(Codicon.account));
			parent.insertBefore(fallback, parent.firstChild);
		};
		if (!user.avatarUrl) {
			renderFallback();
			return;
		}

		const img = $('img.othcloud-account-avatar') as HTMLImageElement;
		img.alt = '';
		img.onerror = () => {
			img.remove();
			renderFallback();
		};
		parent.insertBefore(img, parent.firstChild);

		// HTTPS images (prod) are allowed directly by the CSP; HTTP (dev
		// localhost) is not, so we always proxy through a blob URL.
		const sourceUrl = user.avatarUrl;
		if (this.avatarBlobCache?.source === sourceUrl) {
			img.src = this.avatarBlobCache.blobUrl;
			return;
		}

		void (async () => {
			try {
				const res = await fetch(sourceUrl);
				if (!res.ok) {
					throw new Error(`HTTP ${res.status}`);
				}
				const blob = await res.blob();
				const blobUrl = URL.createObjectURL(blob);
				// Revoke the previous one before we replace it.
				if (this.avatarBlobCache) {
					URL.revokeObjectURL(this.avatarBlobCache.blobUrl);
				}
				this.avatarBlobCache = { source: sourceUrl, blobUrl };
				if (img.isConnected) {
					img.src = blobUrl;
				}
			} catch {
				if (img.isConnected) {
					img.onerror?.(new Event('error'));
				}
			}
		})();
	}

	private renderSection(parent: HTMLElement, def: SectionDef): void {
		const section = append(parent, $('.othcloud-account-section'));
		const header = append(section, $('.othcloud-account-section-header'));
		append(header, $('span.othcloud-account-section-icon' + ThemeIcon.asCSSSelector(def.icon)));
		append(header, $('span.othcloud-account-section-label', {}, def.label));

		const body = append(section, $('.othcloud-account-section-body'));

		switch (this.state.kind) {
			case 'idle':
			case 'loading':
				append(body, $('.othcloud-account-section-empty', {},
					localize('othcloud.account.loading', 'Loading…'),
				));
				return;
			case 'error':
				append(body, $('.othcloud-account-section-error', {}, this.state.message));
				return;
			case 'loaded': {
				const rows = this.state.services[def.key];
				if (!rows || rows.length === 0) {
					append(body, $('.othcloud-account-section-empty', {}, def.emptyLabel));
					return;
				}
				// Header gets a count badge when we actually have items.
				append(header, $('span.othcloud-account-section-count', {}, String(rows.length)));
				for (const row of rows) {
					this.renderServiceRow(body, row);
				}
				return;
			}
		}
	}

	private renderServiceRow(parent: HTMLElement, row: IOthcloudServiceRow, depth = 0): void {
		const hasChildren = !!(row.children && row.children.length > 0);
		const hasUrl = !!row.url;
		const isClickable = hasChildren || hasUrl;
		const expanded = hasChildren && this.expandedRows.has(row.id);

		const el = append(parent, $(isClickable ? 'button.othcloud-account-item.clickable' : '.othcloud-account-item')) as HTMLElement;
		if (depth > 0) {
			el.classList.add('child');
			el.style.paddingLeft = `${6 + depth * 14}px`;
		}
		el.title = hasChildren
			? (expanded
				? localize('othcloud.account.collapseRow', '{0}  —  collapse', row.name)
				: localize('othcloud.account.expandRow', '{0}  —  expand', row.name))
			: hasUrl
				? localize('othcloud.account.openInBrowserTip', '{0}  —  open in browser', row.name)
				: row.name;

		if (hasChildren) {
			append(el, $('span.othcloud-account-item-chevron' + ThemeIcon.asCSSSelector(expanded ? Codicon.chevronDown : Codicon.chevronRight)));
		}
		append(el, $('.othcloud-account-item-name', {}, row.name));

		if (row.status) {
			append(el, $('span.othcloud-account-item-status.s-' + row.status.toLowerCase().replace(/[^a-z0-9]+/g, '-'), {}, row.status));
		} else if (hasUrl && !hasChildren) {
			append(el, $('span.othcloud-account-item-open' + ThemeIcon.asCSSSelector(Codicon.linkExternal)));
		}

		const metaLine = row.meta ? Object.values(row.meta).filter(Boolean).join(' · ') : '';
		if (metaLine) {
			append(el, $('.othcloud-account-item-meta', {}, metaLine));
		}

		if (hasChildren) {
			(el as HTMLButtonElement).onclick = () => {
				if (this.expandedRows.has(row.id)) {
					this.expandedRows.delete(row.id);
				} else {
					this.expandedRows.add(row.id);
				}
				this.rerender();
			};
		} else if (hasUrl) {
			(el as HTMLButtonElement).onclick = () => this.openInBrowserView(row.url!);
		}

		if (expanded && row.children) {
			for (const child of row.children) {
				this.renderServiceRow(parent, child, depth + 1);
			}
		}
	}

	/**
	 * Opens an othcloud.xyz path as a new in-editor tab — without the
	 * BrowserView's URL bar / quick-links toolbar (`chrome=hidden` query
	 * flag, stripped in `BrowserEditor.setInput`). Each click adds another
	 * tab; the group locks so subsequent navigations don't pollute the user's
	 * code editor tabs.
	 *
	 * The "Open Othcloud Console" button in the header is still available for
	 * folks who want the standalone window instead.
	 */
	private async openInBrowserView(path: string): Promise<void> {
		const absolute = path.startsWith('http://') || path.startsWith('https://')
			? path
			: OTHCLOUD_BASE_URL + (path.startsWith('/') ? path : '/' + path);
		const targetGroup = this.editorGroupsService.activeGroup;
		await this.editorService.openEditor(
			{
				resource: BrowserViewUri.forUrl(absolute, undefined, { hideChrome: true }),
				options: { pinned: true },
			},
			targetGroup.id,
		);
		if (!targetGroup.isLocked) {
			targetGroup.lock(true);
		}
	}

	private async refresh(): Promise<void> {
		const token = await this.accountService.getToken();
		if (!token) {
			return;
		}
		const seq = ++this.fetchSeq;
		this.state = { kind: 'loading' };
		this.rerender();
		try {
			// Refresh user + services in parallel. `/me` carries roles + avatar,
			// so this also picks up any role changes the website made since
			// pairing (otherwise the cached IOthcloudUser is permanently stale).
			const [services, me] = await Promise.all([
				OthcloudAccountClient.listServices(token),
				OthcloudAccountClient.me(token).catch(() => undefined),
			]);
			if (seq !== this.fetchSeq) {
				return; // a newer refresh started; discard.
			}
			if (me) {
				this.accountService.updateUser(me);
			}
			this.state = { kind: 'loaded', services };
		} catch (err) {
			if (seq !== this.fetchSeq) {
				return;
			}
			// 401: the stored token is no longer valid — sign out so the CTA
			// shows up again and the user re-pairs. We swallow the error here
			// since signOut() will trigger a re-render of the signed-out card.
			if (err instanceof OthcloudAccountApiError && err.status === 401) {
				void this.accountService.signOut();
				return;
			}
			this.state = { kind: 'error', message: String((err as Error).message ?? err) };
		}
		this.rerender();
	}

	private rerender(): void {
		if (!this.wrap) { return; }
		clearNode(this.wrap);
		const user = this.accountService.getUser();
		if (user) {
			this.renderSignedIn(this.wrap, user);
		} else {
			this.renderSignedOut(this.wrap);
		}
	}
}

/**
 * Registers the activity-bar entry (cloud icon) and the single view inside it.
 * The container shows up as soon as this module is imported — sign-in state is
 * read live in {@link OthcloudAccountSidebarView}.
 */
export function registerOthcloudAccountSidebar(): void {
	const viewContainer: ViewContainer = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).registerViewContainer({
		id: OTHCLOUD_ACCOUNT_VIEW_CONTAINER_ID,
		title: localize2('othcloud.account.activityBarTitle', 'OTHCloud'),
		ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [OTHCLOUD_ACCOUNT_VIEW_CONTAINER_ID, { mergeViewWithContainerWhenSingleView: true }]),
		icon: Codicon.cloud,
		order: 6,
		storageId: OTHCLOUD_ACCOUNT_VIEW_CONTAINER_ID + '.state',
		hideIfEmpty: false,
	}, ViewContainerLocation.Sidebar);

	const viewDescriptor: IViewDescriptor = {
		id: OTHCLOUD_ACCOUNT_VIEW_ID,
		name: OthcloudAccountSidebarView.TITLE,
		containerIcon: Codicon.cloud,
		ctorDescriptor: new SyncDescriptor(OthcloudAccountSidebarView),
		canToggleVisibility: false,
		canMoveView: true,
		order: 1,
	};

	Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).registerViews([viewDescriptor], viewContainer);
}
