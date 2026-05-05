/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize } from '../../../../nls.js';
import { Disposable, DisposableStore } from '../../../../base/common/lifecycle.js';
import { IStorageService, StorageScope } from '../../../../platform/storage/common/storage.js';
import { IMenuItem, MenuId, MenuRegistry } from '../../../../platform/actions/common/actions.js';
import { IWorkbenchContribution } from '../../../common/contributions.js';

const STORAGE_USER = 'othcloud.developers.user';
const OPEN_DEVELOPERS_COMMAND = 'othcloud.developers.open';
const SIGN_OUT_COMMAND = 'othcloud.developers.signOut';

interface CachedUser {
	id: number;
	username: string;
}

/**
 * Owns the entries shown in VSCode's Accounts dropdown (top-right when the
 * activity bar is on top, bottom-left otherwise) for the othcloud Developer
 * account. Re-creates the entries whenever the cached user changes so the
 * username appears directly in the menu label.
 */
export class DevelopersAccountMenuContribution extends Disposable implements IWorkbenchContribution {

	static readonly ID = 'workbench.contrib.othcloudDevelopersAccountMenu';

	private readonly menuDisposables = this._register(new DisposableStore());

	constructor(
		@IStorageService private readonly storageService: IStorageService,
	) {
		super();
		this.refresh();

		const filterStore = this._register(new DisposableStore());
		this._register(
			this.storageService.onDidChangeValue(StorageScope.APPLICATION, STORAGE_USER, filterStore)(
				() => this.refresh(),
			),
		);
	}

	private readUser(): CachedUser | null {
		const raw = this.storageService.get(STORAGE_USER, StorageScope.APPLICATION);
		if (!raw) { return null; }
		try {
			return JSON.parse(raw) as CachedUser;
		} catch {
			return null;
		}
	}

	private refresh(): void {
		this.menuDisposables.clear();
		const user = this.readUser();
		const items: IMenuItem[] = [];
		if (user) {
			items.push({
				group: '5_othcloud',
				order: 1,
				command: {
					id: OPEN_DEVELOPERS_COMMAND,
					title: localize('othcloud.dev.menuSignedInAs', 'othcloud Developer: {0}', user.username),
				},
			});
			items.push({
				group: '5_othcloud',
				order: 2,
				command: {
					id: SIGN_OUT_COMMAND,
					title: localize('othcloud.dev.menuSignOut', 'Sign out of othcloud Developer'),
				},
			});
		} else {
			items.push({
				group: '5_othcloud',
				order: 1,
				command: {
					id: OPEN_DEVELOPERS_COMMAND,
					title: localize('othcloud.dev.menuSignIn', 'Sign in to othcloud Developer'),
				},
			});
		}
		for (const item of items) {
			this.menuDisposables.add(MenuRegistry.appendMenuItem(MenuId.AccountsContext, item));
		}
	}
}
