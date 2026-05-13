/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Emitter, Event } from '../../../../base/common/event.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { localize } from '../../../../nls.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { INotificationService, Severity } from '../../../../platform/notification/common/notification.js';
import { IWorkbenchContribution } from '../../../common/contributions.js';
import {
	AuthenticationSession,
	AuthenticationSessionsChangeEvent,
	IAuthenticationProvider,
	IAuthenticationProviderSessionOptions,
	IAuthenticationService,
} from '../../../services/authentication/common/authentication.js';
import { IOthcloudAccountService } from '../common/othcloudAccountService.js';
import { OTHCLOUD_BASE_URL, OthcloudAccountApiError } from './othcloudAccountClient.js';

// Registered as the canonical `github` provider id (not a custom `othcloud-github`
// one) so every GitHub-using surface in the workbench — Copilot Chat, the GitHub
// Pull Requests extension, the Settings Sync UI, etc. — silently uses the
// OTHCloud-proxied installation token instead of prompting the user to sign in
// to GitHub directly. The built-in `vscode.github-authentication` extension's
// own `contributes.authentication` registrations are cleared in its package.json
// so we own this slot.
export const OTHCLOUD_GITHUB_PROVIDER_ID = 'github';
const OTHCLOUD_GITHUB_PROVIDER_LABEL = 'GitHub';

/** How early (ms) we proactively refresh before the server-reported expiry. */
const REFRESH_BUFFER_MS = 60_000;

interface IGithubTokenResponse {
	token: string;
	expiresAt: string;
	githubId: string;
	appId: number;
	installationId: string;
	appName?: string;
}

/**
 * Authentication provider that fronts the user's GitHub connection on
 * othcloud.xyz. Hits `/api/desktop/github-token` to get a short-lived
 * installation token; cached until shortly before expiry, refreshed
 * transparently.
 *
 * Registered with the workbench's {@link IAuthenticationService} under id
 * `othcloud-github` (not `github`, to avoid stomping the built-in
 * `vscode.github-authentication` extension for now). Phase 2 can flip the id
 * once we're confident the SSO path is solid for every GitHub-using flow.
 */
export class OthcloudGithubAuthProvider extends Disposable implements IAuthenticationProvider, IWorkbenchContribution {

	static readonly ID = 'workbench.contrib.othcloudGithubAuthProvider';

	readonly id = OTHCLOUD_GITHUB_PROVIDER_ID;
	readonly label = OTHCLOUD_GITHUB_PROVIDER_LABEL;
	readonly supportsMultipleAccounts = false;

	private readonly _onDidChangeSessions = this._register(new Emitter<AuthenticationSessionsChangeEvent>());
	readonly onDidChangeSessions: Event<AuthenticationSessionsChangeEvent> = this._onDidChangeSessions.event;

	private cached: { session: AuthenticationSession; expiresAtMs: number; githubId: string } | undefined;
	private inFlight: Promise<AuthenticationSession | undefined> | undefined;

	constructor(
		@IOthcloudAccountService private readonly accountService: IOthcloudAccountService,
		@IAuthenticationService authService: IAuthenticationService,
		@INotificationService private readonly notificationService: INotificationService,
		@ICommandService private readonly commandService: ICommandService,
	) {
		super();

		authService.registerDeclaredAuthenticationProvider({
			id: OTHCLOUD_GITHUB_PROVIDER_ID,
			label: OTHCLOUD_GITHUB_PROVIDER_LABEL,
		});
		authService.registerAuthenticationProvider(OTHCLOUD_GITHUB_PROVIDER_ID, this);
		this._register({
			dispose: () => {
				authService.unregisterAuthenticationProvider(OTHCLOUD_GITHUB_PROVIDER_ID);
				authService.unregisterDeclaredAuthenticationProvider(OTHCLOUD_GITHUB_PROVIDER_ID);
			},
		});

		// Whenever the Othcloud session flips, our GitHub session becomes
		// stale — invalidate so the next call refreshes.
		this._register(this.accountService.onDidChangeAuth(() => {
			const previous = this.cached?.session;
			this.cached = undefined;
			if (previous) {
				this._onDidChangeSessions.fire({ added: undefined, removed: [previous], changed: undefined });
			}
		}));
	}

	async getSessions(scopes: string[] | undefined, _options: IAuthenticationProviderSessionOptions): Promise<readonly AuthenticationSession[]> {
		const session = await this.resolveSession({ allowOpenLink: false });
		if (!session) {
			return [];
		}
		return [this.withScopes(session, scopes)];
	}

	async createSession(scopes: string[], _options: IAuthenticationProviderSessionOptions): Promise<AuthenticationSession> {
		const session = await this.resolveSession({ allowOpenLink: true });
		if (!session) {
			throw new Error('OTHCloud GitHub session unavailable');
		}
		return this.withScopes(session, scopes);
	}

	/**
	 * Re-wraps the cached session with whatever scopes the caller requested.
	 *
	 * The OTHCloud-proxied installation token has the GitHub App's actual
	 * permissions — whatever scopes the caller asks for (`repo`, `workflow`,
	 * `read:user`, ...) get echoed back so VS Code's scope-matching logic
	 * treats the session as valid for every consumer (Copilot, the PR
	 * extension, Settings Sync, etc.). If the token can't actually perform
	 * an operation, the API call fails downstream — but the user no longer
	 * sees the upstream "Sign in to GitHub" prompt.
	 */
	private withScopes(session: AuthenticationSession, scopes: string[] | undefined): AuthenticationSession {
		if (!scopes || scopes.length === 0) {
			return session;
		}
		return { ...session, scopes };
	}

	async removeSession(_sessionId: string): Promise<void> {
		// Removing the desktop-side session doesn't disconnect GitHub on
		// othcloud.xyz — that's a website action. We just drop the cache here;
		// users disconnect via the website's git settings page.
		const previous = this.cached?.session;
		this.cached = undefined;
		if (previous) {
			this._onDidChangeSessions.fire({ added: undefined, removed: [previous], changed: undefined });
		}
	}

	private async resolveSession(opts: { allowOpenLink: boolean }): Promise<AuthenticationSession | undefined> {
		if (this.cached && this.cached.expiresAtMs - Date.now() > REFRESH_BUFFER_MS) {
			return this.cached.session;
		}
		if (this.inFlight) {
			return this.inFlight;
		}
		this.inFlight = this.fetchSession(opts);
		try {
			return await this.inFlight;
		} finally {
			this.inFlight = undefined;
		}
	}

	private async fetchSession(opts: { allowOpenLink: boolean }): Promise<AuthenticationSession | undefined> {
		const token = await this.accountService.getToken();
		if (!token) {
			// User isn't signed in to Othcloud at all. Nothing we can do.
			return undefined;
		}

		let response: IGithubTokenResponse;
		try {
			const res = await fetch(`${OTHCLOUD_BASE_URL}/api/desktop/github-token`, {
				method: 'GET',
				headers: { 'Authorization': `Bearer ${token}` },
			});
			if (res.status === 404) {
				if (opts.allowOpenLink) {
					this.promptToLinkGithub();
				}
				return undefined;
			}
			if (!res.ok) {
				throw new OthcloudAccountApiError(res.status, `HTTP ${res.status}`);
			}
			response = await res.json() as IGithubTokenResponse;
		} catch (err) {
			if (opts.allowOpenLink) {
				this.notificationService.notify({
					severity: Severity.Error,
					message: localize('othcloud.github.tokenFetchFailed', "Couldn't get a GitHub token from OTHCloud: {0}", String((err as Error).message ?? err)),
				});
			}
			return undefined;
		}

		const user = this.accountService.getUser();
		const previous = this.cached?.session;
		const session: AuthenticationSession = {
			id: `othcloud-github:${response.githubId}`,
			accessToken: response.token,
			account: {
				id: response.githubId,
				label: response.appName ?? user?.email ?? 'OTHCloud GitHub',
			},
			scopes: [],
		};
		const expiresAtMs = new Date(response.expiresAt).getTime();
		this.cached = { session, expiresAtMs: isFinite(expiresAtMs) ? expiresAtMs : Date.now() + 50 * 60_000, githubId: response.githubId };

		if (previous && previous.id !== session.id) {
			this._onDidChangeSessions.fire({ added: [session], removed: [previous], changed: undefined });
		} else if (previous) {
			this._onDidChangeSessions.fire({ added: undefined, removed: undefined, changed: [session] });
		} else {
			this._onDidChangeSessions.fire({ added: [session], removed: undefined, changed: undefined });
		}
		return session;
	}

	private promptToLinkGithub(): void {
		const ANSWER = localize('othcloud.github.linkAction', 'Link GitHub on OTHCloud');
		this.notificationService.prompt(
			Severity.Info,
			localize('othcloud.github.notLinked', 'GitHub isn’t linked to your OTHCloud account yet. Connect it on othcloud.xyz to deploy from this terminal.'),
			[{
				label: ANSWER,
				run: () => void this.commandService.executeCommand('othcloud.github.link'),
			}],
		);
	}
}
