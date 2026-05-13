/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize } from '../../../../nls.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { URI } from '../../../../base/common/uri.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { INotificationService, Severity } from '../../../../platform/notification/common/notification.js';
import { IURLHandler, IURLService } from '../../../../platform/url/common/url.js';
import { IWorkbenchContribution } from '../../../common/contributions.js';
import { IOthcloudAccountService } from '../common/othcloudAccountService.js';
import { OthcloudAccountClient } from './othcloudAccountClient.js';

/**
 * Handles the desktop side of the othcloud.xyz pairing flow.
 *
 * The website redirects the logged-in user to `othcloud-terminal://auth?code=<code>`.
 * The OS routes that URL to this running instance; we receive the code,
 * exchange it for a real bearer token, and hand both the token and the
 * resolved user profile to {@link IOthcloudAccountService}.
 *
 * The contract for `/api/desktop/token` is documented in `PAIRING.md`.
 */
export class OthcloudAccountUrlHandler extends Disposable implements IWorkbenchContribution, IURLHandler {

	static readonly ID = 'workbench.contrib.othcloudAccountUrlHandler';

	constructor(
		@IURLService urlService: IURLService,
		@IOthcloudAccountService private readonly accountService: IOthcloudAccountService,
		@INotificationService private readonly notificationService: INotificationService,
		@ILogService private readonly logService: ILogService,
	) {
		super();
		this._register(urlService.registerHandler(this));
	}

	async handleURL(uri: URI): Promise<boolean> {
		// Match `othcloud-terminal://auth?code=…`. The URL service routes by
		// scheme, so we only need to confirm the path/authority here.
		if (uri.authority !== 'auth' && uri.path !== '/auth' && uri.path !== 'auth') {
			return false;
		}

		const code = readQueryParam(uri.query, 'code');
		if (!code) {
			this.notificationService.notify({
				severity: Severity.Warning,
				message: localize('othcloud.account.urlMissingCode', 'OTHCloud sign-in link was missing a pairing code.'),
			});
			return true;
		}

		try {
			const { token, user } = await OthcloudAccountClient.exchangeCode(code);
			await this.accountService.signIn(token, user);
			this.notificationService.notify({
				severity: Severity.Info,
				message: localize('othcloud.account.signedInAs', "Signed in to OTHCloud as {0}.", user.name || user.email),
			});
		} catch (err) {
			this.logService.error('[othcloud-account] pairing failed', err);
			this.notificationService.notify({
				severity: Severity.Error,
				message: localize('othcloud.account.pairFailed', "Could not sign in to OTHCloud: {0}", String((err as Error).message ?? err)),
			});
		}

		return true;
	}
}

/**
 * Reads `key` out of a URI query string. We avoid `URLSearchParams` because
 * `uri.query` is already URL-decoded once by `URI.parse`, and double-decoding
 * mangles legitimate `+` and `%` characters inside an opaque code.
 */
function readQueryParam(query: string, key: string): string | undefined {
	if (!query) {
		return undefined;
	}
	for (const part of query.split('&')) {
		const eq = part.indexOf('=');
		if (eq < 0) {
			continue;
		}
		const k = part.slice(0, eq);
		if (k === key) {
			return part.slice(eq + 1);
		}
	}
	return undefined;
}
