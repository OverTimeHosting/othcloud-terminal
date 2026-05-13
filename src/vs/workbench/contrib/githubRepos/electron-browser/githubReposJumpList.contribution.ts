/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../base/common/lifecycle.js';
import { isWindows } from '../../../../base/common/platform.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { IStorageService, StorageScope } from '../../../../platform/storage/common/storage.js';
import { INativeHostService } from '../../../../platform/native/common/native.js';
import { IWorkbenchContribution, registerWorkbenchContribution2, WorkbenchPhase } from '../../../common/contributions.js';
import { GITHUB_REPOS_STORAGE_KEY, loadGithubRepoEntries } from '../browser/githubRepos.contribution.js';

class GithubReposJumpListContribution extends Disposable implements IWorkbenchContribution {

	static readonly ID = 'workbench.contrib.githubReposJumpList';

	constructor(
		@IStorageService private readonly storageService: IStorageService,
		@INativeHostService private readonly nativeHostService: INativeHostService,
		@ILogService private readonly logService: ILogService,
	) {
		super();

		if (!isWindows) {
			return; // jump lists are a Windows concept
		}

		this.push();

		this._register(this.storageService.onDidChangeValue(StorageScope.PROFILE, GITHUB_REPOS_STORAGE_KEY, this._store)(() => this.push()));
	}

	private push(): void {
		const entries = loadGithubRepoEntries(this.storageService)
			.filter(e => e && typeof e.path === 'string' && e.path.length > 0)
			.map(e => ({
				name: e.name,
				path: e.path,
				description: e.url || e.path,
			}));
		this.nativeHostService.updateGithubReposJumpList(entries).catch(err => {
			this.logService.warn('githubReposJumpList: failed to push entries to native host', err);
		});
	}
}

registerWorkbenchContribution2(
	GithubReposJumpListContribution.ID,
	GithubReposJumpListContribution,
	WorkbenchPhase.AfterRestored,
);
