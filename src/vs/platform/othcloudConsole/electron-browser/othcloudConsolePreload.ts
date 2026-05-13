/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable no-restricted-globals */

/**
 * Preload script for the Othcloud Console window's chrome page.
 *
 * The chrome page is a small `data:` HTML document loaded as the
 * BrowserWindow's main webContents (see {@link OthcloudConsoleMainService}).
 * This preload exposes a tiny `window.othcloudConsole` API the page uses to
 * drive its window controls + back/forward/reload buttons — everything else
 * goes through ipcRenderer directly inside this isolated world.
 */
(function () {
	const { contextBridge, ipcRenderer } = require('electron');

	const titleListeners: Array<(title: string) => void> = [];
	const navStateListeners: Array<(state: { canGoBack: boolean; canGoForward: boolean }) => void> = [];

	ipcRenderer.on('othcloud.console.title', (_event: unknown, title: string) => {
		for (const fn of titleListeners) {
			try { fn(title); } catch { /* swallow listener errors */ }
		}
	});

	ipcRenderer.on('othcloud.console.navState', (_event: unknown, state: { canGoBack: boolean; canGoForward: boolean }) => {
		for (const fn of navStateListeners) {
			try { fn(state); } catch { /* swallow */ }
		}
	});

	contextBridge.exposeInMainWorld('othcloudConsole', {
		minimize: () => ipcRenderer.invoke('othcloud.console.minimize'),
		maximizeToggle: () => ipcRenderer.invoke('othcloud.console.maximizeToggle'),
		close: () => ipcRenderer.invoke('othcloud.console.close'),
		back: () => ipcRenderer.invoke('othcloud.console.back'),
		forward: () => ipcRenderer.invoke('othcloud.console.forward'),
		reload: () => ipcRenderer.invoke('othcloud.console.reload'),
		onTitle: (fn: (title: string) => void) => { titleListeners.push(fn); },
		onNavState: (fn: (state: { canGoBack: boolean; canGoForward: boolean }) => void) => { navStateListeners.push(fn); },
	});
})();
