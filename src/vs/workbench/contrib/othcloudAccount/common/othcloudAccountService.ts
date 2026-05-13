/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Emitter, Event } from '../../../../base/common/event.js';
import { Disposable, DisposableStore } from '../../../../base/common/lifecycle.js';
import { IContextKey, IContextKeyService, RawContextKey } from '../../../../platform/contextkey/common/contextkey.js';
import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';
import { ISecretStorageService } from '../../../../platform/secrets/common/secrets.js';
import { IStorageService, StorageScope, StorageTarget } from '../../../../platform/storage/common/storage.js';

export const IOthcloudAccountService = createDecorator<IOthcloudAccountService>('othcloudAccountService');

export interface IOthcloudUser {
	readonly id: string;
	readonly email: string;
	readonly name: string;
	readonly avatarUrl?: string;
	/** Raw `users_temp.role` — e.g. "user", "admin", "owner", "developer". */
	readonly role?: string;
	/** Best org-level role for this user — owner | admin | member. */
	readonly orgRole?: string;
	readonly isOwner?: boolean;
	readonly isAdmin?: boolean;
	readonly isPlatformAdmin?: boolean;
	readonly isDeveloper?: boolean;
}

/**
 * Context keys gated on the signed-in user's roles. Other contributions
 * reference these in `when` / `precondition` clauses to show or hide UI for
 * admins / owners / developers.
 */
export const OthcloudIsSignedInContext = new RawContextKey<boolean>('othcloud.account.isSignedIn', false);
export const OthcloudIsDeveloperContext = new RawContextKey<boolean>('othcloud.account.isDeveloper', false);
export const OthcloudIsAdminContext = new RawContextKey<boolean>('othcloud.account.isAdmin', false);
export const OthcloudIsOwnerContext = new RawContextKey<boolean>('othcloud.account.isOwner', false);
export const OthcloudIsPlatformAdminContext = new RawContextKey<boolean>('othcloud.account.isPlatformAdmin', false);

export interface IOthcloudAccountService {
	readonly _serviceBrand: undefined;

	/** Fires whenever the user signs in, signs out, or their profile changes. */
	readonly onDidChangeAuth: Event<void>;

	/** True iff we have both a stored token and a cached user. */
	isSignedIn(): boolean;

	getUser(): IOthcloudUser | undefined;

	/** Resolves the bearer token from secret storage, or undefined when signed out. */
	getToken(): Promise<string | undefined>;

	/** Persists token + user and fires {@link onDidChangeAuth}. */
	signIn(token: string, user: IOthcloudUser): Promise<void>;

	/** Updates the cached user (e.g. after a `/me` refresh) without touching the token. */
	updateUser(user: IOthcloudUser): void;

	signOut(): Promise<void>;
}

const SECRET_TOKEN_KEY = 'othcloud.account.token';
const STORAGE_USER_KEY = 'othcloud.account.user';

export class OthcloudAccountService extends Disposable implements IOthcloudAccountService {

	declare readonly _serviceBrand: undefined;

	private readonly _onDidChangeAuth = this._register(new Emitter<void>());
	readonly onDidChangeAuth: Event<void> = this._onDidChangeAuth.event;

	private _user: IOthcloudUser | undefined;

	private readonly _isSignedInKey: IContextKey<boolean>;
	private readonly _isDeveloperKey: IContextKey<boolean>;
	private readonly _isAdminKey: IContextKey<boolean>;
	private readonly _isOwnerKey: IContextKey<boolean>;
	private readonly _isPlatformAdminKey: IContextKey<boolean>;

	constructor(
		@ISecretStorageService private readonly secretStorageService: ISecretStorageService,
		@IStorageService private readonly storageService: IStorageService,
		@IContextKeyService contextKeyService: IContextKeyService,
	) {
		super();
		this._user = this.readCachedUser();

		this._isSignedInKey = OthcloudIsSignedInContext.bindTo(contextKeyService);
		this._isDeveloperKey = OthcloudIsDeveloperContext.bindTo(contextKeyService);
		this._isAdminKey = OthcloudIsAdminContext.bindTo(contextKeyService);
		this._isOwnerKey = OthcloudIsOwnerContext.bindTo(contextKeyService);
		this._isPlatformAdminKey = OthcloudIsPlatformAdminContext.bindTo(contextKeyService);
		this.syncContextKeys();

		// Another window may sign in/out; mirror that here.
		const userKeyFilter = this._register(new DisposableStore());
		this._register(this.storageService.onDidChangeValue(StorageScope.APPLICATION, STORAGE_USER_KEY, userKeyFilter)(() => {
			const next = this.readCachedUser();
			const changed = JSON.stringify(next) !== JSON.stringify(this._user);
			this._user = next;
			if (changed) {
				this.syncContextKeys();
				this._onDidChangeAuth.fire();
			}
		}));
	}

	private syncContextKeys(): void {
		const u = this._user;
		this._isSignedInKey.set(!!u);
		this._isDeveloperKey.set(!!u?.isDeveloper);
		this._isAdminKey.set(!!u?.isAdmin);
		this._isOwnerKey.set(!!u?.isOwner);
		this._isPlatformAdminKey.set(!!u?.isPlatformAdmin);
	}

	isSignedIn(): boolean {
		return !!this._user;
	}

	getUser(): IOthcloudUser | undefined {
		return this._user;
	}

	async getToken(): Promise<string | undefined> {
		return this.secretStorageService.get(SECRET_TOKEN_KEY);
	}

	async signIn(token: string, user: IOthcloudUser): Promise<void> {
		await this.secretStorageService.set(SECRET_TOKEN_KEY, token);
		this.storageService.store(STORAGE_USER_KEY, JSON.stringify(user), StorageScope.APPLICATION, StorageTarget.MACHINE);
		this._user = user;
		this.syncContextKeys();
		this._onDidChangeAuth.fire();
	}

	updateUser(user: IOthcloudUser): void {
		const changed = JSON.stringify(this._user) !== JSON.stringify(user);
		this.storageService.store(STORAGE_USER_KEY, JSON.stringify(user), StorageScope.APPLICATION, StorageTarget.MACHINE);
		this._user = user;
		this.syncContextKeys();
		if (changed) {
			this._onDidChangeAuth.fire();
		}
	}

	async signOut(): Promise<void> {
		await this.secretStorageService.delete(SECRET_TOKEN_KEY);
		this.storageService.remove(STORAGE_USER_KEY, StorageScope.APPLICATION);
		this._user = undefined;
		this.syncContextKeys();
		this._onDidChangeAuth.fire();
	}

	private readCachedUser(): IOthcloudUser | undefined {
		const raw = this.storageService.get(STORAGE_USER_KEY, StorageScope.APPLICATION);
		if (!raw) {
			return undefined;
		}
		try {
			const parsed = JSON.parse(raw) as IOthcloudUser;
			if (parsed && typeof parsed.id === 'string' && typeof parsed.email === 'string') {
				return parsed;
			}
		} catch {
			// fall through
		}
		return undefined;
	}
}
