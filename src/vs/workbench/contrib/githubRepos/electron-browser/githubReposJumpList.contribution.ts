/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../base/common/lifecycle.js';
import { isWindows } from '../../../../base/common/platform.js';
import { IStorageService, StorageScope } from '../../../../platform/storage/common/storage.js';
import { INativeHostService } from '../../../../platform/native/common/native.js';
import { IWorkbenchContribution, registerWorkbenchContribution2, WorkbenchPhase } from '../../../common/contributions.js';
import { GITHUB_REPOS_STORAGE_KEY, loadGithubRepoEntries } from '../browser/githubRepos.contribution.js';

class GithubReposJumpListContribution extends Disposable implements IWorkbenchContribution {

	static readonly ID = 'workbench.contrib.githubReposJumpList';

	constructor(
		@IStorageService private readonly storageService: IStorageService,
		@INativeHostService private readonly nativeHostService: INativeHostService,
	) {
		super();

		if (!isWindows) {
			return; // jump lists are a Windows concept
		}

		this.push();

		this._register(this.storageService.onDidChangeValue(StorageScope.PROFILE, GITHUB_REPOS_STORAGE_KEY, this._store)(() => this.push()));
	}

	private push(): void {
		const entries = loadGithubRepoEntries(this.storageService).map(e => ({
			name: e.name,
			path: e.path,
			description: e.url || e.path,
		}));
		this.nativeHostService.updateGithubReposJumpList(entries).catch(() => { /* best-effort */ });
	}
}

registerWorkbenchContribution2(
	GithubReposJumpListContribution.ID,
	GithubReposJumpListContribution,
	WorkbenchPhase.AfterRestored,
);
