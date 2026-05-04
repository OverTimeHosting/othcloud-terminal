/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize, localize2 } from '../../../../nls.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { URI } from '../../../../base/common/uri.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { registerIcon } from '../../../../platform/theme/common/iconRegistry.js';
import { IInstantiationService, ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { IStorageService, StorageScope, StorageTarget } from '../../../../platform/storage/common/storage.js';
import { IFileService } from '../../../../platform/files/common/files.js';
import { IFileDialogService } from '../../../../platform/dialogs/common/dialogs.js';
import { IQuickInputService } from '../../../../platform/quickinput/common/quickInput.js';
import { Action2, MenuId, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { ContextKeyExpr, IContextKey, IContextKeyService, RawContextKey } from '../../../../platform/contextkey/common/contextkey.js';
import { IKeybindingService } from '../../../../platform/keybinding/common/keybinding.js';
import { IContextMenuService } from '../../../../platform/contextview/browser/contextView.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IHoverService } from '../../../../platform/hover/browser/hover.js';
import { IViewContainersRegistry, IViewDescriptor, IViewsRegistry, Extensions as ViewExtensions, ViewContainer, ViewContainerLocation, IViewDescriptorService } from '../../../common/views.js';
import { ViewPane, IViewPaneOptions } from '../../../browser/parts/views/viewPane.js';
import { ViewPaneContainer } from '../../../browser/parts/views/viewPaneContainer.js';
import { IHostService } from '../../../services/host/browser/host.js';
import { append, $, addDisposableListener, EventType, clearNode } from '../../../../base/browser/dom.js';
import { ThemeIcon } from '../../../../base/common/themables.js';

interface IRepoEntry {
	id: string;
	name: string;
	path: string;
	url?: string;
	source: 'manual' | 'scan';
}

const STORAGE_KEY = 'githubRepos.entries';
const VIEW_CONTAINER_ID = 'workbench.view.githubRepos';
const VIEW_ID = 'workbench.view.githubRepos.list';

const githubReposIcon = registerIcon('github-repos-icon', Codicon.githubInverted, localize('githubReposIcon', 'Activity bar icon for GitHub Repos.'));

function loadEntries(storage: IStorageService): IRepoEntry[] {
	const raw = storage.get(STORAGE_KEY, StorageScope.PROFILE, '[]');
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function saveEntries(storage: IStorageService, entries: IRepoEntry[]): void {
	storage.store(STORAGE_KEY, JSON.stringify(entries), StorageScope.PROFILE, StorageTarget.USER);
}

const HasReposContext = new RawContextKey<boolean>('githubRepos.hasEntries', false);

class GithubReposViewPane extends ViewPane {

	static readonly ID = VIEW_ID;
	static readonly TITLE = localize2('githubRepos.viewTitle', "Repositories");

	private listContainer!: HTMLElement;
	private readonly hasReposKey: IContextKey<boolean>;

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
		@IHostService private readonly hostService: IHostService,
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, hoverService);

		this.hasReposKey = HasReposContext.bindTo(contextKeyService);
		this.refreshContext();

		this._register(this.storageService.onDidChangeValue(StorageScope.PROFILE, STORAGE_KEY, this._store)(() => {
			this.refreshContext();
			this.renderEntries();
		}));
	}

	private refreshContext(): void {
		this.hasReposKey.set(loadEntries(this.storageService).length > 0);
	}

	protected override renderBody(container: HTMLElement): void {
		super.renderBody(container);
		container.classList.add('github-repos-view');
		this.listContainer = append(container, $('.github-repos-list'));
		this.listContainer.style.padding = '4px 0';
		this.listContainer.style.overflowY = 'auto';
		this.listContainer.style.height = '100%';
		this.renderEntries();
	}

	protected override layoutBody(height: number, width: number): void {
		super.layoutBody(height, width);
		if (this.listContainer) {
			this.listContainer.style.height = `${height}px`;
		}
	}

	private renderEntries(): void {
		if (!this.listContainer) {
			return;
		}
		clearNode(this.listContainer);

		const entries = loadEntries(this.storageService);
		if (entries.length === 0) {
			const empty = append(this.listContainer, $('.github-repos-empty'));
			empty.style.padding = '12px';
			empty.style.opacity = '0.7';
			empty.textContent = localize('githubRepos.empty', "No repositories yet. Use the title bar actions to add one or scan a folder.");
			return;
		}

		for (const entry of entries) {
			const row = append(this.listContainer, $('.github-repos-row'));
			row.style.display = 'flex';
			row.style.alignItems = 'center';
			row.style.padding = '4px 12px';
			row.style.cursor = 'pointer';
			row.style.gap = '8px';
			row.title = `${entry.path}${entry.url ? `\n${entry.url}` : ''}`;

			const icon = append(row, $('span'));
			icon.className = ThemeIcon.asClassName(entry.source === 'scan' ? Codicon.searchFuzzy : Codicon.repo);

			const text = append(row, $('span.github-repos-name'));
			text.textContent = entry.name;
			text.style.flex = '1';
			text.style.whiteSpace = 'nowrap';
			text.style.overflow = 'hidden';
			text.style.textOverflow = 'ellipsis';

			const removeBtn = append(row, $('span.github-repos-remove'));
			removeBtn.className = ThemeIcon.asClassName(Codicon.close);
			removeBtn.style.opacity = '0';
			removeBtn.title = localize('githubRepos.removeAction', "Remove from list");

			this._register(addDisposableListener(row, EventType.MOUSE_ENTER, () => { removeBtn.style.opacity = '0.7'; row.style.background = 'var(--vscode-list-hoverBackground)'; }));
			this._register(addDisposableListener(row, EventType.MOUSE_LEAVE, () => { removeBtn.style.opacity = '0'; row.style.background = ''; }));

			this._register(addDisposableListener(row, EventType.CLICK, e => {
				if ((e.target as HTMLElement) === removeBtn) {
					return;
				}
				this.launch(entry);
			}));

			this._register(addDisposableListener(removeBtn, EventType.CLICK, e => {
				e.stopPropagation();
				this.removeEntry(entry.id);
			}));
		}
	}

	private launch(entry: IRepoEntry): void {
		this.hostService.openWindow([{ folderUri: URI.file(entry.path) }], { forceNewWindow: false });
	}

	private removeEntry(id: string): void {
		const entries = loadEntries(this.storageService).filter(e => e.id !== id);
		saveEntries(this.storageService, entries);
		this.refreshContext();
		this.renderEntries();
	}
}

// View container

const viewContainer: ViewContainer = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).registerViewContainer({
	id: VIEW_CONTAINER_ID,
	title: localize2('githubRepos.containerTitle', "GitHub Repos"),
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [VIEW_CONTAINER_ID, { mergeViewWithContainerWhenSingleView: true }]),
	icon: githubReposIcon,
	order: 6,
	storageId: 'workbench.githubRepos.state',
	hideIfEmpty: false,
}, ViewContainerLocation.Sidebar);

const viewDescriptor: IViewDescriptor = {
	id: VIEW_ID,
	name: GithubReposViewPane.TITLE,
	containerIcon: githubReposIcon,
	ctorDescriptor: new SyncDescriptor(GithubReposViewPane),
	canToggleVisibility: false,
	canMoveView: true,
	order: 1,
};

Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).registerViews([viewDescriptor], viewContainer);

// Helpers

function uuid(): string {
	return `r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

async function pickFolder(accessor: ServicesAccessor, message: string): Promise<URI | undefined> {
	const dialog = accessor.get(IFileDialogService);
	const picked = await dialog.showOpenDialog({
		canSelectFolders: true,
		canSelectFiles: false,
		canSelectMany: false,
		title: message,
	});
	return picked?.[0];
}

async function isGitRepo(fileService: IFileService, folder: URI): Promise<boolean> {
	try {
		const gitDir = URI.joinPath(folder, '.git');
		const stat = await fileService.stat(gitDir);
		return !!stat;
	} catch {
		return false;
	}
}

// Actions

registerAction2(class AddRepoAction extends Action2 {
	constructor() {
		super({
			id: 'githubRepos.addRepo',
			title: localize2('githubRepos.addRepo', "Add Repository..."),
			icon: Codicon.add,
			f1: true,
			menu: [{
				id: MenuId.ViewTitle,
				when: ContextKeyExpr.equals('view', VIEW_ID),
				group: 'navigation',
				order: 1,
			}],
		});
	}
	async run(accessor: ServicesAccessor): Promise<void> {
		const storage = accessor.get(IStorageService);
		const quickInput = accessor.get(IQuickInputService);
		const folder = await pickFolder(accessor, localize('githubRepos.pickRepoFolder', "Select a repository folder"));
		if (!folder) {
			return;
		}
		const name = await quickInput.input({
			prompt: localize('githubRepos.repoName', "Display name for this repository"),
			value: basename(folder.fsPath),
		});
		if (!name) {
			return;
		}
		const url = await quickInput.input({
			prompt: localize('githubRepos.repoUrl', "GitHub URL (optional)"),
			placeHolder: 'https://github.com/owner/repo',
		});
		const entries = loadEntries(storage);
		entries.push({ id: uuid(), name, path: folder.fsPath, url: url || undefined, source: 'manual' });
		saveEntries(storage, entries);
	}
});

registerAction2(class ScanFolderAction extends Action2 {
	constructor() {
		super({
			id: 'githubRepos.scanFolder',
			title: localize2('githubRepos.scanFolder', "Scan Folder for Repositories..."),
			icon: Codicon.searchFuzzy,
			f1: true,
			menu: [{
				id: MenuId.ViewTitle,
				when: ContextKeyExpr.equals('view', VIEW_ID),
				group: 'navigation',
				order: 2,
			}],
		});
	}
	async run(accessor: ServicesAccessor): Promise<void> {
		const storage = accessor.get(IStorageService);
		const fileService = accessor.get(IFileService);
		const root = await pickFolder(accessor, localize('githubRepos.pickScanFolder', "Select a folder to scan for git repositories"));
		if (!root) {
			return;
		}
		const found: IRepoEntry[] = [];
		try {
			const stat = await fileService.resolve(root, { resolveSingleChildDescendants: false });
			const children = stat.children ?? [];
			for (const child of children) {
				if (!child.isDirectory) {
					continue;
				}
				if (await isGitRepo(fileService, child.resource)) {
					found.push({ id: uuid(), name: basename(child.resource.fsPath), path: child.resource.fsPath, source: 'scan' });
				}
			}
		} catch {
			// ignore
		}
		if (found.length === 0) {
			return;
		}
		const entries = loadEntries(storage);
		const existing = new Set(entries.map(e => e.path));
		for (const f of found) {
			if (!existing.has(f.path)) {
				entries.push(f);
			}
		}
		saveEntries(storage, entries);
	}
});

registerAction2(class ClearReposAction extends Action2 {
	constructor() {
		super({
			id: 'githubRepos.clearAll',
			title: localize2('githubRepos.clearAll', "Clear All Repositories"),
			icon: Codicon.clearAll,
			f1: true,
			menu: [{
				id: MenuId.ViewTitle,
				when: ContextKeyExpr.and(ContextKeyExpr.equals('view', VIEW_ID), HasReposContext),
				group: 'navigation',
				order: 3,
			}],
		});
	}
	async run(accessor: ServicesAccessor): Promise<void> {
		const storage = accessor.get(IStorageService);
		saveEntries(storage, []);
	}
});

// Welcome content for empty state
Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).registerViewWelcomeContent(VIEW_ID, {
	content: localize('githubRepos.welcome', "No repositories saved.\n[Add a Repository](command:githubRepos.addRepo)\n[Scan a Folder](command:githubRepos.scanFolder)"),
	when: HasReposContext.toNegated(),
});

function basename(p: string): string {
	const idx = Math.max(p.lastIndexOf('/'), p.lastIndexOf('\\'));
	return idx >= 0 ? p.slice(idx + 1) : p;
}
