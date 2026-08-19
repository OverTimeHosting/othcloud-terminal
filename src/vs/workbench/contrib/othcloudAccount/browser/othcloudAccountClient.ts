/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { env } from '../../../../base/common/process.js';
import { IOthcloudUser } from '../common/othcloudAccountService.js';

// Pairing contract is documented in PAIRING.md at the repo root.
// Dev builds (`yarn watch` / running out of sources, where `VSCODE_DEV` is set)
// hit the local Next.js dev server; packaged builds talk to production.
const OTHCLOUD_DEV_BASE_URL = 'http://localhost:3001';
const OTHCLOUD_PROD_BASE_URL = 'https://othcloud.xyz';

/**
 * Where othcloud.xyz is, as far as this window is concerned.
 *
 * A guess, and only a guess, until something better-informed overrides it.
 * `env` is empty in the WEB build (`base/common/process` hardcodes `{}` there),
 * so the `VSCODE_DEV` check can only ever land on production — which is the
 * wrong answer for every panel that is not literally othcloud.xyz, including
 * the localhost one this is developed against.
 *
 * The web build gets the right value from the panel: it is served from the
 * panel's own origin, so it is told to use relative URLs and the browser
 * resolves them to whatever host the customer actually reached. See
 * {@link setOthcloudBaseUrl}.
 */
let othcloudBaseUrl = env['VSCODE_DEV'] ? OTHCLOUD_DEV_BASE_URL : OTHCLOUD_PROD_BASE_URL;

/**
 * Point the client at a different othcloud.xyz.
 *
 * The empty string is meaningful and is what the web editor passes: it makes
 * every request relative, i.e. same-origin with the workbench, which is the
 * panel serving it.
 */
export function setOthcloudBaseUrl(baseUrl: string): void {
	othcloudBaseUrl = baseUrl;
}

export function getOthcloudBaseUrl(): string {
	return othcloudBaseUrl;
}

export interface IPairTokenResponse {
	readonly token: string;
	readonly user: IOthcloudUser;
}

export interface IOthcloudServiceRow {
	readonly id: string;
	readonly name: string;
	readonly status?: string;
	readonly meta?: Readonly<Record<string, string>>;
	/**
	 * Relative path on othcloud.xyz that the desktop sidebar opens when this
	 * row is clicked. The desktop prefixes {@link getOthcloudBaseUrl}. May be
	 * undefined for rows that have no dedicated management page yet.
	 */
	readonly url?: string;
	/** Nested rows shown when this row is expanded in the sidebar. */
	readonly children?: readonly IOthcloudServiceRow[];
}

export interface IOthcloudServices {
	readonly projects: readonly IOthcloudServiceRow[];
}

export class OthcloudAccountApiError extends Error {
	constructor(public readonly status: number, message: string) {
		super(message);
		this.name = 'OthcloudAccountApiError';
	}
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
	const res = await fetch(`${getOthcloudBaseUrl()}${path}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
	const text = await res.text();
	const parsed = text ? safeJson(text) : undefined;
	if (!res.ok) {
		const message = (parsed && typeof (parsed as { error?: unknown }).error === 'string')
			? (parsed as { error: string }).error
			: `HTTP ${res.status}`;
		throw new OthcloudAccountApiError(res.status, message);
	}
	return parsed as T;
}

async function getJson<T>(path: string, token: string): Promise<T> {
	const res = await fetch(`${getOthcloudBaseUrl()}${path}`, {
		headers: { 'Authorization': `Bearer ${token}` },
	});
	const text = await res.text();
	const parsed = text ? safeJson(text) : undefined;
	if (!res.ok) {
		const message = (parsed && typeof (parsed as { error?: unknown }).error === 'string')
			? (parsed as { error: string }).error
			: `HTTP ${res.status}`;
		throw new OthcloudAccountApiError(res.status, message);
	}
	return parsed as T;
}

function safeJson(text: string): unknown {
	try { return JSON.parse(text); } catch { return undefined; }
}

export const OthcloudAccountClient = {
	/**
	 * Exchanges a short-lived pairing code (handed over via the
	 * `othcloud-terminal://auth?code=…` deep link) for a long-lived API token
	 * and the signed-in user profile. The code is single-use server-side.
	 */
	async exchangeCode(code: string): Promise<IPairTokenResponse> {
		return postJson<IPairTokenResponse>('/api/desktop/token', { code });
	},

	/**
	 * Re-validates a stored token; if this 401s the caller should sign the
	 * user out and re-prompt via the deep-link flow.
	 */
	async me(token: string): Promise<IOthcloudUser> {
		return getJson<IOthcloudUser>('/api/desktop/me', token);
	},

	/**
	 * Fetches the four service categories for the current user in a single
	 * round trip. Throws {@link OthcloudAccountApiError} on non-2xx; the
	 * caller treats 401 as "token revoked → sign out".
	 */
	async listServices(token: string): Promise<IOthcloudServices> {
		return getJson<IOthcloudServices>('/api/desktop/services', token);
	},
};
