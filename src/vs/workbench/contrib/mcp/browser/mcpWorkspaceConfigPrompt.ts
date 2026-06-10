/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { VSBuffer } from '../../../../base/common/buffer.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { URI } from '../../../../base/common/uri.js';
import { localize } from '../../../../nls.js';
import { IFileService } from '../../../../platform/files/common/files.js';
import { INotificationService, Severity } from '../../../../platform/notification/common/notification.js';
import { IStorageService, StorageScope, StorageTarget } from '../../../../platform/storage/common/storage.js';
import { IWorkspaceContextService, IWorkspaceFolder } from '../../../../platform/workspace/common/workspace.js';
import { IWorkbenchContribution } from '../../../common/contributions.js';
import { IEditorService } from '../../../services/editor/common/editorService.js';
import { MCP_CONFIGURATION_KEY, WORKSPACE_STANDALONE_CONFIGURATIONS } from '../../../services/configuration/common/configuration.js';

/**
 * Storage key holding the list of workspace folder paths the user chose to never be prompted
 * about again ("Don't ask again"). Persisted at the profile level so the choice sticks across
 * windows and relaunches.
 */
const DISMISSED_FOLDERS_KEY = 'mcp.workspaceConfigPrompt.dismissedFolders';

/** Starter content written when the user opts to create the config. */
const MCP_CONFIG_TEMPLATE = [
	'{',
	'\t// Model Context Protocol servers available to this project.',
	'\t// Add entries under "servers", e.g. { "my-server": { "command": "npx", "args": ["-y", "my-mcp-server"] } }.',
	'\t// Docs: https://modelcontextprotocol.io',
	'\t"servers": {},',
	'\t"inputs": []',
	'}',
	'',
].join('\n');

/**
 * Watches the open workspace folders and, for any git repository that has no MCP configuration
 * yet, shows a one-time notification offering to scaffold a `.vscode/mcp.json` for that project.
 * Nothing is written unless the user clicks "Create"; "Don't ask again" suppresses the prompt
 * for that folder permanently.
 */
export class McpWorkspaceConfigPromptContribution extends Disposable implements IWorkbenchContribution {

	static readonly ID = 'workbench.contrib.mcpWorkspaceConfigPrompt';

	/** Folders already handled this session, so we don't re-prompt on every folder-change event. */
	private readonly _promptedThisSession = new Set<string>();

	constructor(
		@IWorkspaceContextService private readonly _workspaceContextService: IWorkspaceContextService,
		@IFileService private readonly _fileService: IFileService,
		@INotificationService private readonly _notificationService: INotificationService,
		@IStorageService private readonly _storageService: IStorageService,
		@IEditorService private readonly _editorService: IEditorService,
	) {
		super();

		this._register(this._workspaceContextService.onDidChangeWorkspaceFolders(() => this._checkAllFolders()));
		this._checkAllFolders();
	}

	private _checkAllFolders(): void {
		for (const folder of this._workspaceContextService.getWorkspace().folders) {
			void this._checkFolder(folder);
		}
	}

	private async _checkFolder(folder: IWorkspaceFolder): Promise<void> {
		// Only consider local folders we haven't already looked at this session.
		if (folder.uri.scheme !== 'file') {
			return;
		}
		const key = folder.uri.toString();
		if (this._promptedThisSession.has(key) || this._loadDismissed().includes(key)) {
			return;
		}
		this._promptedThisSession.add(key);

		// Only nudge for actual repositories — that's where MCP config belongs.
		if (!(await this._fileService.exists(URI.joinPath(folder.uri, '.git')))) {
			return;
		}

		const configResource = folder.toResource(WORKSPACE_STANDALONE_CONFIGURATIONS[MCP_CONFIGURATION_KEY]);
		if (await this._fileService.exists(configResource)) {
			return; // already configured
		}

		this._notificationService.prompt(
			Severity.Info,
			localize('mcp.workspaceConfigPrompt.message', "\"{0}\" has no MCP configuration. Create one for this project?", folder.name),
			[
				{
					label: localize('mcp.workspaceConfigPrompt.create', "Create mcp.json"),
					run: () => void this._createConfig(configResource),
				},
				{
					label: localize('mcp.workspaceConfigPrompt.dismiss', "Don't ask again"),
					isSecondary: true,
					run: () => this._dismiss(key),
				},
			],
		);
	}

	private async _createConfig(resource: URI): Promise<void> {
		try {
			if (!(await this._fileService.exists(resource))) {
				await this._fileService.createFile(resource, VSBuffer.fromString(MCP_CONFIG_TEMPLATE));
			}
		} catch (err) {
			this._notificationService.error(localize('mcp.workspaceConfigPrompt.createFailed', "Couldn't create the MCP configuration: {0}", String((err as Error)?.message ?? err)));
			return;
		}
		await this._editorService.openEditor({ resource });
	}

	private _loadDismissed(): string[] {
		try {
			const parsed = JSON.parse(this._storageService.get(DISMISSED_FOLDERS_KEY, StorageScope.PROFILE, '[]'));
			return Array.isArray(parsed) ? parsed.filter((p): p is string => typeof p === 'string') : [];
		} catch {
			return [];
		}
	}

	private _dismiss(folderKey: string): void {
		const dismissed = this._loadDismissed();
		if (!dismissed.includes(folderKey)) {
			dismissed.push(folderKey);
			this._storageService.store(DISMISSED_FOLDERS_KEY, JSON.stringify(dismissed), StorageScope.PROFILE, StorageTarget.USER);
		}
	}
}
