/*---------------------------------------------------------------------------------------------
 *  Copyright (c) OverTime Hosting. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { RunningServer, startServer } from './server';
import { getOrCreateToken, rotateToken } from './secret';
import { buildTools } from './tools';

const EXT_NAME = 'othcloud-mcp';
const EXT_VERSION = '1.0.0';
const CONFIG_SECTION = 'othcloud.mcp';

interface ServerState {
	running?: RunningServer;
	token: string;
}

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	const output = vscode.window.createOutputChannel('OTHCloud MCP');
	context.subscriptions.push(output);

	const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 50);
	statusBar.command = 'othcloud.mcp.showStatus';
	statusBar.text = '$(plug) MCP';
	statusBar.tooltip = 'OTHCloud MCP server';
	statusBar.show();
	context.subscriptions.push(statusBar);

	const state: ServerState = { token: await getOrCreateToken(context) };

	const start = async (): Promise<void> => {
		await stop();
		const cfg = vscode.workspace.getConfiguration(CONFIG_SECTION);
		if (cfg.get<boolean>('enabled', true) === false) {
			output.appendLine('[mcp] disabled by configuration');
			statusBar.text = '$(circle-slash) MCP off';
			statusBar.tooltip = 'OTHCloud MCP server is disabled (othcloud.mcp.enabled).';
			return;
		}
		const host = cfg.get<string>('host', '127.0.0.1') || '127.0.0.1';
		const port = cfg.get<number>('port', 0) ?? 0;
		const allowedOrigins = new Set<string>(cfg.get<string[]>('allowedOrigins', []) ?? []);
		try {
			state.running = await startServer({
				host,
				port,
				token: state.token,
				allowedOrigins,
				tools: buildTools(),
				serverName: EXT_NAME,
				serverVersion: EXT_VERSION,
				output,
			});
			statusBar.text = `$(plug) MCP :${state.running.port}`;
			statusBar.tooltip = `OTHCloud MCP server listening on ${state.running.address}/sse`;
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			output.appendLine(`[mcp] failed to start: ${msg}`);
			statusBar.text = '$(error) MCP';
			statusBar.tooltip = `OTHCloud MCP server failed to start: ${msg}`;
			void vscode.window.showErrorMessage(`OTHCloud MCP failed to start: ${msg}`);
		}
	};

	const stop = async (): Promise<void> => {
		if (state.running) {
			await state.running.close();
			state.running = undefined;
		}
	};

	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration(CONFIG_SECTION)) {
			void start();
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('othcloud.mcp.showStatus', async () => {
		if (!state.running) {
			const pick = await vscode.window.showInformationMessage('OTHCloud MCP is not running.', 'Start', 'Open Logs');
			if (pick === 'Start') { await start(); }
			if (pick === 'Open Logs') { output.show(); }
			return;
		}
		const pick = await vscode.window.showInformationMessage(
			`OTHCloud MCP listening on ${state.running.address}/sse`,
			'Copy Config', 'Open Logs', 'Restart', 'Revoke Token',
		);
		if (pick === 'Copy Config') { await vscode.commands.executeCommand('othcloud.mcp.copyConfig'); }
		if (pick === 'Open Logs') { output.show(); }
		if (pick === 'Restart') { await start(); }
		if (pick === 'Revoke Token') { await vscode.commands.executeCommand('othcloud.mcp.revokeToken'); }
	}));

	context.subscriptions.push(vscode.commands.registerCommand('othcloud.mcp.copyConfig', async () => {
		if (!state.running) {
			void vscode.window.showWarningMessage('OTHCloud MCP is not running.');
			return;
		}
		const config = {
			mcpServers: {
				'othcloud-terminal': {
					type: 'sse',
					url: `${state.running.address}/sse`,
					headers: { Authorization: `Bearer ${state.token}` },
				},
			},
		};
		await vscode.env.clipboard.writeText(JSON.stringify(config, null, 2));
		void vscode.window.showInformationMessage('Claude Code MCP config copied to clipboard.');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('othcloud.mcp.restart', async () => {
		await start();
	}));

	context.subscriptions.push(vscode.commands.registerCommand('othcloud.mcp.revokeToken', async () => {
		const confirm = await vscode.window.showWarningMessage(
			'Revoke the current MCP token? Any connected clients will need a new token.',
			{ modal: true }, 'Revoke',
		);
		if (confirm !== 'Revoke') { return; }
		state.token = await rotateToken(context);
		await start();
		void vscode.window.showInformationMessage('OTHCloud MCP token rotated. Use "Copy Config" to share the new token.');
	}));

	context.subscriptions.push({ dispose: () => { void stop(); } });

	await start();
}

export function deactivate(): Thenable<void> | undefined {
	return undefined;
}
