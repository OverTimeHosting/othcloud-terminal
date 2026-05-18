/*---------------------------------------------------------------------------------------------
 *  Copyright (c) OverTime Hosting. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *
 *  Minimal local mirror of the vscode.git extension API surface used by this extension.
 *  Keep in sync with extensions/git/src/api/git.d.ts.
 *--------------------------------------------------------------------------------------------*/

import type { Uri, Event } from 'vscode';

export type RefType = 0 | 1 | 2;

export interface Ref {
	readonly type: RefType;
	readonly name?: string;
	readonly commit?: string;
	readonly remote?: string;
}

export interface UpstreamRef {
	readonly remote: string;
	readonly name: string;
	readonly commit?: string;
}

export interface Branch extends Ref {
	readonly upstream?: UpstreamRef;
	readonly ahead?: number;
	readonly behind?: number;
}

export type Status =
	| 0 | 1 | 2 | 3 | 4
	| 5 | 6 | 7 | 8 | 9 | 10 | 11
	| 12 | 13 | 14 | 15 | 16 | 17 | 18;

export interface Change {
	readonly uri: Uri;
	readonly originalUri: Uri;
	readonly renameUri: Uri | undefined;
	readonly status: Status;
}

export interface InputBox {
	value: string;
}

export interface RepositoryState {
	readonly HEAD: Branch | undefined;
	readonly mergeChanges: Change[];
	readonly indexChanges: Change[];
	readonly workingTreeChanges: Change[];
	readonly untrackedChanges: Change[];
	readonly onDidChange: Event<void>;
}

export interface CommitOptions {
	all?: boolean | 'tracked';
	amend?: boolean;
	signoff?: boolean;
	signCommit?: boolean;
	empty?: boolean;
	noVerify?: boolean;
	requireUserConfig?: boolean;
	useEditor?: boolean;
	verbose?: boolean;
	postCommitCommand?: string | null;
}

export interface Repository {
	readonly rootUri: Uri;
	readonly inputBox: InputBox;
	readonly state: RepositoryState;
	add(paths: string[]): Promise<void>;
	revert(paths: string[]): Promise<void>;
	commit(message: string, opts?: CommitOptions): Promise<void>;
}

export type APIState = 'uninitialized' | 'initialized';

export interface API {
	readonly state: APIState;
	readonly repositories: Repository[];
	getRepository(uri: Uri): Repository | null;
}

export interface GitExtension {
	readonly enabled: boolean;
	readonly onDidChangeEnablement: Event<boolean>;
	getAPI(version: 1): API;
}
