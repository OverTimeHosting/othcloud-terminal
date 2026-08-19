/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../base/common/lifecycle.js';
import { isWeb } from '../../../../base/common/platform.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { IWorkbenchContribution } from '../../../common/contributions.js';
import { IBrowserWorkbenchEnvironmentService } from '../../../services/environment/browser/environmentService.js';
import { IOthcloudAccountService, IOthcloudUser } from '../common/othcloudAccountService.js';
import { setOthcloudBaseUrl } from './othcloudAccountClient.js';

/**
 * Signs the user in when the workbench is being served BY othcloud.xyz.
 *
 * The desktop app pairs over an `othcloud-terminal://auth?code=…` deep link:
 * the website mints a one-shot code, the OS routes the URL to the running
 * app, the app exchanges it for a token. Every step of that needs a protocol
 * handler and a native window, and the web build has neither — so the Othcloud
 * sidebar could only show "Sign in at othcloud.xyz" and a button with nowhere
 * to go. Which is an odd thing to show someone who is already signed in: they
 * are looking at this editor *through* their othcloud.xyz session.
 *
 * So the panel hands the session over instead. The workbench is served from
 * `<panel>/_editor/<siteId>/`, behind a proxy that authenticates every request
 * against that panel session — so a request to `<base>/__othcloud/session`
 * arrives already identified, and comes back with a token minted for whoever
 * is actually looking. Same-origin, so nothing is exposed to another site, and
 * nothing is written to the customer's server: this is per-viewer, not
 * per-container, and two people with access to the same website each get
 * themselves.
 *
 * Everything here is best-effort. The editor's job is editing files, which
 * works signed out; a panel that doesn't serve this endpoint (an older one, or
 * some other host embedding the build) simply gets the signed-out sidebar it
 * had before.
 */
export class OthcloudEmbeddedSession extends Disposable implements IWorkbenchContribution {

	static readonly ID = 'workbench.contrib.othcloudEmbeddedSession';

	constructor(
		@IOthcloudAccountService private readonly accountService: IOthcloudAccountService,
		@IBrowserWorkbenchEnvironmentService private readonly environmentService: IBrowserWorkbenchEnvironmentService,
		@ILogService private readonly logService: ILogService,
	) {
		super();

		// Desktop pairs properly and has a real token in OS secret storage.
		// Asking a local path for a session there would be meaningless at best.
		if (!isWeb) {
			return;
		}

		void this.seed();
	}

	private async seed(): Promise<void> {
		const url = this.sessionUrl();
		if (!url) {
			return;
		}

		let payload: ISeededSession | undefined;
		try {
			const res = await fetch(url, {
				// The panel session cookie is the whole basis of this request.
				credentials: 'same-origin',
				headers: { 'Accept': 'application/json' },
			});
			// 204 is the panel saying "not signed in / not yours / couldn't".
			// It is a normal answer, not a failure — carry on signed out.
			if (res.status === 204 || !res.ok) {
				return;
			}
			payload = await res.json() as ISeededSession;
		} catch (error) {
			this.logService.trace('[othcloud] no embedded session available', error);
			return;
		}

		if (!payload?.token || !payload.user?.id || !payload.user?.email) {
			return;
		}

		// Point the API client at the host that served this workbench. Done
		// even when the sign-in below is skipped: the build's compiled-in
		// default is othcloud.xyz, which is wrong for any other panel, and the
		// already-signed-in user's sidebar would otherwise talk to the wrong
		// one.
		if (typeof payload.baseUrl === 'string') {
			setOthcloudBaseUrl(payload.baseUrl);
		}

		const current = this.accountService.getUser();
		if (current && current.id === payload.user.id) {
			// Already this person. Refresh the profile (roles and avatar may
			// have moved on) but keep the token they have — swapping it would
			// invalidate nothing and gain nothing.
			this.accountService.updateUser(payload.user);
			return;
		}

		await this.accountService.signIn(payload.token, payload.user);
		this.logService.info('[othcloud] signed in from the embedding panel');
	}

	/**
	 * `<server base path>/__othcloud/session`.
	 *
	 * Built from `serverBasePath` rather than `window.location`, which drifts:
	 * the workbench rewrites the address as folders and editors open, so by the
	 * time this runs the path may be several segments deeper than the mount.
	 * `serverBasePath` is what the server was actually started with
	 * (`--server-base-path`), handed to the client in its bootstrap config.
	 *
	 * Undefined when the workbench is served from the root — nobody is
	 * embedding it, so there is no panel to ask.
	 */
	private sessionUrl(): string | undefined {
		const base = this.environmentService.options?.serverBasePath;
		if (!base || base === '/') {
			return undefined;
		}
		return `${base.replace(/\/$/, '')}/__othcloud/session`;
	}
}

interface ISeededSession {
	readonly token: string;
	readonly user: IOthcloudUser;
	/** Empty string means "same origin as this workbench". */
	readonly baseUrl?: string;
}
