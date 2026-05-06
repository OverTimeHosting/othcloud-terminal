/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as crypto from 'crypto';
import * as net from 'net';
import * as path from 'path';
import * as vscode from 'vscode';

const enum OpCode {
	Handshake = 0,
	Frame = 1,
	Close = 2,
	Ping = 3,
	Pong = 4,
}

interface Activity {
	details?: string;
	state?: string;
	timestamps?: { start?: number; end?: number };
	assets?: {
		large_image?: string;
		large_text?: string;
		small_image?: string;
		small_text?: string;
	};
}

class DiscordRpc {
	private socket: net.Socket | undefined;
	private buffer = Buffer.alloc(0);
	private connected = false;

	constructor(private readonly clientId: string) { }

	async connect(): Promise<boolean> {
		for (let id = 0; id < 10; id++) {
			const pipe = this.pipePath(id);
			try {
				await this.tryConnect(pipe);
				return true;
			} catch {
				// try next pipe id
			}
		}
		return false;
	}

	private pipePath(id: number): string {
		if (process.platform === 'win32') {
			return `\\\\?\\pipe\\discord-ipc-${id}`;
		}
		const tmp = process.env['XDG_RUNTIME_DIR']
			|| process.env['TMPDIR']
			|| process.env['TMP']
			|| process.env['TEMP']
			|| '/tmp';
		return path.join(tmp, `discord-ipc-${id}`);
	}

	private tryConnect(pipe: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const socket = net.createConnection(pipe);
			const onError = (err: Error) => {
				socket.removeAllListeners();
				socket.destroy();
				reject(err);
			};
			socket.once('error', onError);
			socket.once('connect', () => {
				socket.removeListener('error', onError);
				this.socket = socket;
				this.connected = true;
				socket.on('data', chunk => this.onData(chunk));
				socket.on('close', () => this.onClose());
				socket.on('error', () => this.onClose());
				this.send(OpCode.Handshake, { v: 1, client_id: this.clientId });
				resolve();
			});
		});
	}

	private onData(chunk: Buffer): void {
		this.buffer = Buffer.concat([this.buffer, chunk]);
		while (this.buffer.length >= 8) {
			const op = this.buffer.readInt32LE(0);
			const len = this.buffer.readInt32LE(4);
			if (this.buffer.length < 8 + len) {
				break;
			}
			const payload = this.buffer.subarray(8, 8 + len).toString('utf8');
			this.buffer = this.buffer.subarray(8 + len);
			if (op === OpCode.Ping) {
				try {
					this.send(OpCode.Pong, JSON.parse(payload));
				} catch {
					// ignore malformed ping
				}
			}
		}
	}

	private onClose(): void {
		if (this.socket) {
			this.socket.destroy();
			this.socket = undefined;
		}
		this.connected = false;
	}

	private send(op: OpCode, payload: object): void {
		if (!this.socket) {
			return;
		}
		const data = Buffer.from(JSON.stringify(payload));
		const header = Buffer.alloc(8);
		header.writeInt32LE(op, 0);
		header.writeInt32LE(data.length, 4);
		this.socket.write(Buffer.concat([header, data]));
	}

	setActivity(activity: Activity | null): void {
		if (!this.connected) {
			return;
		}
		this.send(OpCode.Frame, {
			cmd: 'SET_ACTIVITY',
			args: {
				pid: process.pid,
				activity: activity ?? undefined,
			},
			nonce: crypto.randomUUID(),
		});
	}

	dispose(): void {
		if (this.connected && this.socket) {
			try {
				this.send(OpCode.Frame, {
					cmd: 'SET_ACTIVITY',
					args: { pid: process.pid },
					nonce: crypto.randomUUID(),
				});
			} catch {
				// best effort clear
			}
		}
		this.onClose();
	}
}

const RECONNECT_DELAY_MS = 20000;
const DEFAULT_APPLICATION_ID = '1348861044604534835';

let rpc: DiscordRpc | undefined;
let reconnectTimer: NodeJS.Timeout | undefined;
let sessionStart = Math.floor(Date.now() / 1000);
let outputChannel: vscode.OutputChannel | undefined;

function log(message: string): void {
	outputChannel?.appendLine(`[${new Date().toISOString()}] ${message}`);
}

function getConfig(): vscode.WorkspaceConfiguration {
	return vscode.workspace.getConfiguration('othcloud.discord');
}

function buildActivity(): Activity | null {
	const config = getConfig();
	const appName = config.get<string>('applicationName', 'Othcloud Terminal');
	const largeImage = config.get<string>('largeImage', 'othcloud-logo');
	const idleText = config.get<string>('idleText', 'Idle');
	const showFileName = config.get<boolean>('showFileName', true);
	const showWorkspace = config.get<boolean>('showWorkspace', true);

	let details = `Using ${appName}`;
	let state: string | undefined;

	const editor = vscode.window.activeTextEditor;
	if (editor && showFileName) {
		const fileName = path.basename(editor.document.fileName) || editor.document.uri.path;
		const language = editor.document.languageId;
		details = `Editing ${fileName}`;
		if (language) {
			state = `Language: ${language}`;
		}
	} else if (!editor) {
		details = `${appName} — ${idleText}`;
	}

	if (showWorkspace) {
		const folders = vscode.workspace.workspaceFolders;
		if (folders && folders.length > 0) {
			const wsLine = `Workspace: ${folders[0].name}`;
			state = state ? `${state} • ${wsLine}` : wsLine;
		}
	}

	return {
		details,
		state,
		timestamps: { start: sessionStart },
		assets: {
			large_image: largeImage,
			large_text: appName,
		},
	};
}

function pushPresence(): void {
	if (!rpc) {
		return;
	}
	try {
		rpc.setActivity(buildActivity());
	} catch (err) {
		log(`setActivity failed: ${err instanceof Error ? err.message : String(err)}`);
	}
}

function scheduleReconnect(): void {
	if (reconnectTimer) {
		return;
	}
	reconnectTimer = setTimeout(() => {
		reconnectTimer = undefined;
		void connect();
	}, RECONNECT_DELAY_MS);
}

async function connect(): Promise<void> {
	disconnect();

	const config = getConfig();
	if (!config.get<boolean>('enabled', true)) {
		log('Disabled via setting; not connecting.');
		return;
	}

	const clientId = DEFAULT_APPLICATION_ID;

	const client = new DiscordRpc(clientId);
	rpc = client;
	log(`Connecting to Discord with application id ${clientId}...`);
	const ok = await client.connect();
	if (!ok || rpc !== client) {
		log('Discord client not available. Will retry.');
		if (rpc === client) {
			rpc = undefined;
		}
		scheduleReconnect();
		return;
	}
	sessionStart = Math.floor(Date.now() / 1000);
	log('Connected to Discord. Pushing initial presence.');
	pushPresence();
}

function disconnect(): void {
	if (reconnectTimer) {
		clearTimeout(reconnectTimer);
		reconnectTimer = undefined;
	}
	if (rpc) {
		rpc.dispose();
		rpc = undefined;
	}
}

export function activate(context: vscode.ExtensionContext): void {
	outputChannel = vscode.window.createOutputChannel('Othcloud Discord Presence');
	context.subscriptions.push(outputChannel);

	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(() => pushPresence()));
	context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(() => pushPresence()));
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration('othcloud.discord')) {
			void connect();
		}
	}));

	context.subscriptions.push({ dispose: () => disconnect() });

	void connect();
}

export function deactivate(): void {
	disconnect();
	outputChannel?.dispose();
	outputChannel = undefined;
}
