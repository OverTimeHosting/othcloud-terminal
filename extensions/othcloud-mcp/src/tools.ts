/*---------------------------------------------------------------------------------------------
 *  Copyright (c) OverTime Hosting. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as path from 'path';
import * as vscode from 'vscode';
import { getGitApi, pickRepository, resolveRepoPaths, stripAiAttribution, summarizeChanges } from './git';
import { McpToolDefinition } from './server';

export function buildTools(): Map<string, McpToolDefinition> {
	const tools: McpToolDefinition[] = [
		gitStatusTool(),
		gitStageTool(),
		gitUnstageTool(),
		gitSetMessageTool(),
		gitCommitTool(),
		editorOpenFileTool(),
		editorRevealRangeTool(),
		editorSplitTool(),
		browserOpenTool(),
		terminalRunTool(),
	];
	const map = new Map<string, McpToolDefinition>();
	for (const t of tools) { map.set(t.name, t); }
	return map;
}

const repoArg = {
	repository: {
		type: 'string',
		description: 'Optional repository hint: an absolute path, file URI, or repo root path. Defaults to the active editor\'s repo, else the first one.',
	},
} as const;

function gitStatusTool(): McpToolDefinition {
	return {
		name: 'git.status',
		description: 'Summarize the current repository state: branch, ahead/behind counts, and staged / unstaged / untracked / merge changes.',
		inputSchema: {
			type: 'object',
			properties: { ...repoArg },
			additionalProperties: false,
		},
		handler: async args => {
			const api = await getGitApi();
			const repo = pickRepository(api, typeof args.repository === 'string' ? args.repository : undefined);
			return summarizeChanges(repo);
		},
	};
}

function gitStageTool(): McpToolDefinition {
	return {
		name: 'git.stage',
		description: 'Stage one or more files in the source control panel (git add). Paths may be repo-relative or absolute. Pass {"all": true} to stage every change.',
		inputSchema: {
			type: 'object',
			properties: {
				...repoArg,
				paths: {
					type: 'array',
					items: { type: 'string' },
					description: 'Paths to stage. Required unless "all" is true.',
				},
				all: {
					type: 'boolean',
					description: 'Stage every unstaged change (working tree + untracked).',
				},
			},
			additionalProperties: false,
		},
		handler: async args => {
			const api = await getGitApi();
			const repo = pickRepository(api, typeof args.repository === 'string' ? args.repository : undefined);
			let paths: string[];
			if (args.all === true) {
				paths = [
					...repo.state.workingTreeChanges.map(c => c.uri.fsPath),
					...repo.state.untrackedChanges.map(c => c.uri.fsPath),
				];
			} else {
				const raw = Array.isArray(args.paths) ? (args.paths as unknown[]).map(String) : [];
				if (raw.length === 0) {
					throw new Error('Provide "paths" or set "all": true.');
				}
				paths = resolveRepoPaths(repo, raw);
			}
			if (paths.length === 0) {
				return { staged: 0, message: 'Nothing to stage.' };
			}
			await repo.add(paths);
			return { staged: paths.length, paths: paths.map(p => path.relative(repo.rootUri.fsPath, p)) };
		},
	};
}

function gitUnstageTool(): McpToolDefinition {
	return {
		name: 'git.unstage',
		description: 'Unstage one or more files (git reset HEAD -- <paths>). Paths may be repo-relative or absolute. Pass {"all": true} to unstage everything.',
		inputSchema: {
			type: 'object',
			properties: {
				...repoArg,
				paths: { type: 'array', items: { type: 'string' } },
				all: { type: 'boolean' },
			},
			additionalProperties: false,
		},
		handler: async args => {
			const api = await getGitApi();
			const repo = pickRepository(api, typeof args.repository === 'string' ? args.repository : undefined);
			let paths: string[];
			if (args.all === true) {
				paths = repo.state.indexChanges.map(c => c.uri.fsPath);
			} else {
				const raw = Array.isArray(args.paths) ? (args.paths as unknown[]).map(String) : [];
				if (raw.length === 0) {
					throw new Error('Provide "paths" or set "all": true.');
				}
				paths = resolveRepoPaths(repo, raw);
			}
			if (paths.length === 0) {
				return { unstaged: 0, message: 'Nothing to unstage.' };
			}
			await repo.revert(paths);
			return { unstaged: paths.length, paths: paths.map(p => path.relative(repo.rootUri.fsPath, p)) };
		},
	};
}

function gitSetMessageTool(): McpToolDefinition {
	return {
		name: 'git.setMessage',
		description: 'Set the text shown in the source control commit message box. AI attribution lines (Co-Authored-By: Claude, etc.) are stripped before writing.',
		inputSchema: {
			type: 'object',
			properties: {
				...repoArg,
				message: { type: 'string', description: 'The commit message to place in the input box.' },
			},
			required: ['message'],
			additionalProperties: false,
		},
		handler: async args => {
			const api = await getGitApi();
			const repo = pickRepository(api, typeof args.repository === 'string' ? args.repository : undefined);
			const cleaned = stripAiAttribution(String(args.message ?? ''));
			repo.inputBox.value = cleaned;
			return { message: cleaned };
		},
	};
}

function gitCommitTool(): McpToolDefinition {
	return {
		name: 'git.commit',
		description: 'Create a commit using the configured local git user. AI attribution lines (Co-Authored-By: Claude, GitHub Copilot, "Generated with Claude Code", etc.) are stripped from the message before commit. Falls back to the SCM message box if "message" is omitted.',
		inputSchema: {
			type: 'object',
			properties: {
				...repoArg,
				message: { type: 'string', description: 'Commit message. If omitted, uses the current SCM input box value.' },
				stageAll: { type: 'boolean', description: 'Stage tracked changes first (git commit -a). Default false.' },
				amend: { type: 'boolean', description: 'Amend the previous commit. Default false.' },
				signoff: { type: 'boolean' },
			},
			additionalProperties: false,
		},
		handler: async args => {
			const api = await getGitApi();
			const repo = pickRepository(api, typeof args.repository === 'string' ? args.repository : undefined);

			const rawMessage = typeof args.message === 'string' && args.message.trim().length > 0
				? args.message
				: repo.inputBox.value;
			if (!rawMessage || !rawMessage.trim()) {
				throw new Error('No commit message provided and the SCM message box is empty.');
			}
			const cleaned = stripAiAttribution(rawMessage).trim();
			if (!cleaned) {
				throw new Error('Commit message is empty after stripping AI attribution. Provide a real message.');
			}

			await repo.commit(cleaned, {
				all: args.stageAll === true ? 'tracked' : undefined,
				amend: args.amend === true ? true : undefined,
				signoff: args.signoff === true ? true : undefined,
				// Never pass useEditor: we want to forward our cleaned message verbatim.
				useEditor: false,
			});

			// Clear the input box on success so the user sees the empty state they'd expect.
			if (repo.inputBox.value === rawMessage || repo.inputBox.value === cleaned) {
				repo.inputBox.value = '';
			}

			const head = repo.state.HEAD;
			return {
				committed: true,
				message: cleaned,
				branch: head?.name,
				hash: head?.commit,
				note: 'Committed using the local git user (user.name / user.email). No AI attribution was added.',
			};
		},
	};
}

function editorOpenFileTool(): McpToolDefinition {
	return {
		name: 'editor.openFile',
		description: 'Open a file in an editor and optionally reveal a range. Path may be absolute or workspace-relative. Brings the editor to the foreground.',
		inputSchema: {
			type: 'object',
			properties: {
				path: { type: 'string', description: 'Absolute or workspace-relative path.' },
				uri: { type: 'string', description: 'Alternatively, a fully-qualified URI (file://, vscode-remote://...).' },
				startLine: { type: 'number', description: '1-based line to focus.' },
				endLine: { type: 'number', description: '1-based end line for the selection.' },
				preview: { type: 'boolean', description: 'Open in preview mode (single tab reused). Default true.' },
				viewColumn: { type: 'number', description: 'Target editor group (1, 2, 3, ...). Defaults to the active column.' },
			},
			additionalProperties: false,
		},
		handler: async args => {
			const uri = resolveTargetUri(args);
			const doc = await vscode.workspace.openTextDocument(uri);
			const options: vscode.TextDocumentShowOptions = {
				preview: args.preview === undefined ? true : Boolean(args.preview),
				viewColumn: typeof args.viewColumn === 'number' ? args.viewColumn as vscode.ViewColumn : undefined,
			};
			if (typeof args.startLine === 'number') {
				const start = Math.max(0, Math.floor(args.startLine) - 1);
				const end = typeof args.endLine === 'number' ? Math.max(start, Math.floor(args.endLine) - 1) : start;
				options.selection = new vscode.Range(start, 0, end, Number.MAX_SAFE_INTEGER);
			}
			const editor = await vscode.window.showTextDocument(doc, options);
			return { opened: uri.toString(), viewColumn: editor.viewColumn };
		},
	};
}

function editorRevealRangeTool(): McpToolDefinition {
	return {
		name: 'editor.revealRange',
		description: 'Reveal a line range in the active editor (no scrolling if already visible).',
		inputSchema: {
			type: 'object',
			properties: {
				startLine: { type: 'number', description: '1-based line.' },
				endLine: { type: 'number' },
				at: { type: 'string', enum: ['default', 'top', 'center', 'centerIfOutsideViewport'], description: 'Reveal strategy.' },
			},
			required: ['startLine'],
			additionalProperties: false,
		},
		handler: async args => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) { throw new Error('No active editor.'); }
			const start = Math.max(0, Math.floor(Number(args.startLine)) - 1);
			const end = typeof args.endLine === 'number' ? Math.max(start, Math.floor(args.endLine) - 1) : start;
			const range = new vscode.Range(start, 0, end, Number.MAX_SAFE_INTEGER);
			const at = String(args.at ?? 'default');
			const map: Record<string, vscode.TextEditorRevealType> = {
				default: vscode.TextEditorRevealType.Default,
				top: vscode.TextEditorRevealType.AtTop,
				center: vscode.TextEditorRevealType.InCenter,
				centerIfOutsideViewport: vscode.TextEditorRevealType.InCenterIfOutsideViewport,
			};
			editor.revealRange(range, map[at] ?? vscode.TextEditorRevealType.Default);
			editor.selection = new vscode.Selection(start, 0, end, 0);
			return { revealed: true, file: editor.document.uri.toString(), startLine: start + 1, endLine: end + 1 };
		},
	};
}

function editorSplitTool(): McpToolDefinition {
	return {
		name: 'editor.split',
		description: 'Split the active editor (right, down, up, left) or focus a specific editor group.',
		inputSchema: {
			type: 'object',
			properties: {
				direction: { type: 'string', enum: ['right', 'down', 'up', 'left'], description: 'Split direction. Default right.' },
				focusGroup: { type: 'number', description: 'Focus editor group N (1-based) instead of splitting.' },
			},
			additionalProperties: false,
		},
		handler: async args => {
			if (typeof args.focusGroup === 'number') {
				const cmd = `workbench.action.focusGroup-${Math.max(1, Math.floor(args.focusGroup))}`;
				try {
					await vscode.commands.executeCommand(cmd);
				} catch {
					await vscode.commands.executeCommand('workbench.action.focusNextGroup');
				}
				return { focusGroup: args.focusGroup };
			}
			const dir = String(args.direction ?? 'right');
			const splitCommand: Record<string, string> = {
				right: 'workbench.action.splitEditorRight',
				down: 'workbench.action.splitEditorDown',
				up: 'workbench.action.splitEditorUp',
				left: 'workbench.action.splitEditorLeft',
			};
			await vscode.commands.executeCommand(splitCommand[dir] ?? splitCommand.right);
			return { split: dir };
		},
	};
}

function browserOpenTool(): McpToolDefinition {
	return {
		name: 'browser.open',
		description: 'Open a URL in othcloud terminal\'s built-in Simple Browser (default) or in the OS default browser. Use this to show the user a live preview, docs, or a localhost dev server.',
		inputSchema: {
			type: 'object',
			properties: {
				url: { type: 'string', description: 'Absolute URL (http, https, vscode://, etc.).' },
				target: { type: 'string', enum: ['simple', 'external'], description: 'simple = built-in Simple Browser webview, external = OS default browser. Default simple.' },
				viewColumn: { type: 'number', description: 'For target=simple: editor group to open the webview in.' },
			},
			required: ['url'],
			additionalProperties: false,
		},
		handler: async args => {
			const url = String(args.url ?? '').trim();
			if (!url) { throw new Error('A url is required.'); }
			const target = String(args.target ?? 'simple');
			if (target === 'external') {
				const ok = await vscode.env.openExternal(vscode.Uri.parse(url));
				return { opened: url, target, success: ok };
			}
			await vscode.commands.executeCommand('simpleBrowser.api.open', vscode.Uri.parse(url), {
				viewColumn: typeof args.viewColumn === 'number' ? args.viewColumn : vscode.ViewColumn.Beside,
				preserveFocus: false,
			});
			return { opened: url, target: 'simple' };
		},
	};
}

function terminalRunTool(): McpToolDefinition {
	return {
		name: 'terminal.run',
		description: 'Send text to an integrated terminal so the user can see the command run. Creates a named terminal if one doesn\'t exist, or reuses it. This is for user-visible commands - it does NOT return command output.',
		inputSchema: {
			type: 'object',
			properties: {
				command: { type: 'string', description: 'The text to send. A trailing newline is added unless "execute" is false.' },
				name: { type: 'string', description: 'Terminal name. Reused if a terminal with this name already exists. Default "MCP".' },
				cwd: { type: 'string', description: 'Working directory for a newly created terminal. Ignored if the named terminal already exists.' },
				show: { type: 'boolean', description: 'Bring the terminal panel to the foreground. Default true.' },
				execute: { type: 'boolean', description: 'Append a newline so the shell runs the command. Default true.' },
			},
			required: ['command'],
			additionalProperties: false,
		},
		handler: async args => {
			const command = String(args.command ?? '');
			if (!command) { throw new Error('A command is required.'); }
			const name = typeof args.name === 'string' && args.name ? args.name : 'MCP';
			const show = args.show === undefined ? true : Boolean(args.show);
			const execute = args.execute === undefined ? true : Boolean(args.execute);

			let terminal = vscode.window.terminals.find(t => t.name === name);
			if (!terminal) {
				const opts: vscode.TerminalOptions = { name };
				if (typeof args.cwd === 'string' && args.cwd) {
					opts.cwd = args.cwd;
				}
				terminal = vscode.window.createTerminal(opts);
			}
			terminal.sendText(command, execute);
			if (show) { terminal.show(false); }
			return { terminal: name, sent: command, executed: execute };
		},
	};
}

function resolveTargetUri(args: Record<string, unknown>): vscode.Uri {
	const uriStr = typeof args.uri === 'string' ? args.uri : undefined;
	if (uriStr) {
		return vscode.Uri.parse(uriStr);
	}
	const p = typeof args.path === 'string' ? args.path : undefined;
	if (!p) {
		throw new Error('Provide "path" or "uri".');
	}
	if (path.isAbsolute(p)) {
		return vscode.Uri.file(p);
	}
	const folders = vscode.workspace.workspaceFolders;
	if (!folders || folders.length === 0) {
		throw new Error(`Cannot resolve relative path without a workspace: ${p}`);
	}
	return vscode.Uri.joinPath(folders[0].uri, p);
}
