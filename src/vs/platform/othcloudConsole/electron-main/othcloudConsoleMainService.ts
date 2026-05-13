/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { BrowserWindow, shell } from 'electron';
import { Disposable } from '../../../base/common/lifecycle.js';
import { IOthcloudConsoleService } from '../common/othcloudConsole.js';

/**
 * Cookie/storage partition shared with the workbench's embedded BrowserView
 * tabs. Reusing it here means the user's existing othcloud.xyz session
 * carries over: if they're signed in inside the editor's browser tab, they're
 * signed in inside the Othcloud Console window — no re-login needed.
 *
 * Must match {@link BrowserSession.getOrCreateGlobal}'s partition.
 */
const SHARED_PARTITION = 'persist:vscode-browser';

const DEFAULT_BOUNDS = { width: 1280, height: 800 };

export class OthcloudConsoleMainService extends Disposable implements IOthcloudConsoleService {
	declare readonly _serviceBrand: undefined;

	private window: BrowserWindow | undefined;
	private targetUrl = 'https://othcloud.xyz';

	async open(url?: string): Promise<void> {
		if (url) {
			this.targetUrl = url;
		}

		if (this.window && !this.window.isDestroyed()) {
			this.window.show();
			this.window.focus();
			if (url && !this.window.webContents.isDestroyed()) {
				await this.window.webContents.loadURL(url);
			}
			return;
		}

		this.window = new BrowserWindow({
			...DEFAULT_BOUNDS,
			backgroundColor: '#0d1117',
			title: 'OTHCloud',
			autoHideMenuBar: true,
			webPreferences: {
				partition: SHARED_PARTITION,
				contextIsolation: true,
				nodeIntegration: false,
				sandbox: true,
			},
			show: false,
		});

		this.window.setMenuBarVisibility(false);

		// Keep the OS title in sync with the active page.
		this.window.webContents.on('page-title-updated', (event, pageTitle) => {
			event.preventDefault();
			if (this.window && !this.window.isDestroyed()) {
				this.window.setTitle(pageTitle ? `OTHCloud — ${pageTitle}` : 'OTHCloud');
			}
		});

		// Same logic as the embedded BrowserView: hand non-web schemes
		// (`othcloud-terminal://`, mailto:, etc.) to the OS protocol handler
		// so they round-trip back into the app correctly.
		this.window.webContents.on('will-navigate', (event, navUrl) => {
			const colon = navUrl.indexOf(':');
			if (colon <= 0) {
				return;
			}
			const scheme = navUrl.substring(0, colon).toLowerCase();
			if (scheme === 'http' || scheme === 'https' || scheme === 'about'
				|| scheme === 'file' || scheme === 'data' || scheme === 'blob'
				|| scheme === 'javascript' || scheme === 'devtools') {
				return;
			}
			event.preventDefault();
			void shell.openExternal(navUrl).catch(() => { /* nothing useful to do */ });
		});

		this.window.on('closed', () => {
			this.window = undefined;
		});

		await this.window.loadURL(this.targetUrl);
		this.window.show();
		this.window.focus();
	}

	async close(): Promise<void> {
		if (this.window && !this.window.isDestroyed()) {
			this.window.close();
		}
	}
}
