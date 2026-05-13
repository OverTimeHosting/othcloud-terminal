/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from '../../instantiation/common/instantiation.js';

export const IOthcloudConsoleService = createDecorator<IOthcloudConsoleService>('othcloudConsoleService');

/**
 * Main-process service that owns the dedicated **Othcloud Console** window:
 * a standalone Electron `BrowserWindow` with the OS-native frame that loads
 * othcloud.xyz directly.
 *
 * One window per workbench session — a second `open()` call focuses the
 * existing window (and optionally navigates it) rather than spawning a
 * duplicate. The window's webContents shares the workbench BrowserView
 * cookie partition so SSO carries over both ways.
 */
export interface IOthcloudConsoleService {
	readonly _serviceBrand: undefined;

	/**
	 * Open the console window. If it's already open, focus it (and navigate
	 * to `url` when supplied). Otherwise create a new window pointed at `url`
	 * — or the configured Othcloud base URL when omitted.
	 */
	open(url?: string): Promise<void>;

	close(): Promise<void>;
}

export const IPC_OTHCLOUD_CONSOLE_CHANNEL = 'othcloudConsole';
