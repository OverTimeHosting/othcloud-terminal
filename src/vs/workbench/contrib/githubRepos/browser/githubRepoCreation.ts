/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IAuthenticationService } from '../../../services/authentication/common/authentication.js';

// The `github` auth provider is owned by OthcloudGithubAuthProvider, which hands
// out a short-lived GitHub App **installation token** proxied from othcloud.xyz.
// Repo creation therefore goes straight to the GitHub REST API with that token —
// no othcloud.xyz endpoint needed. Note an installation token can create repos
// under an org (`POST /orgs/{org}/repos`, app needs Administration:write) but not
// under a personal user account, so resolving and showing the owner matters.
const GITHUB_API = 'https://api.github.com';
const OTHCLOUD_GITHUB_PROVIDER_ID = 'github';

function githubHeaders(token: string): Record<string, string> {
	return {
		'Authorization': `Bearer ${token}`,
		'Accept': 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
	};
}

export interface IGithubOwner {
	readonly login: string;
	/** `User` or `Organization` (per GitHub's owner.type). */
	readonly type: string;
}

export interface ICreateRepoInput {
	readonly name: string;
	readonly description?: string;
	readonly private: boolean;
	/** Seed with an initial commit (README) so it clones cleanly. Defaults true. */
	readonly autoInit?: boolean;
}

export interface ICreatedRepo {
	readonly name: string;
	readonly fullName: string;
	readonly htmlUrl: string;
	readonly cloneUrl: string;
	readonly sshUrl?: string;
	readonly owner: string;
	readonly private: boolean;
	readonly defaultBranch?: string;
}

export class GithubApiError extends Error {
	constructor(public readonly status: number, message: string) {
		super(message);
		this.name = 'GithubApiError';
	}
}

/**
 * Resolves the GitHub installation token from the `github` auth session
 * (OthcloudGithubAuthProvider). Returns undefined when GitHub isn't linked /
 * the user isn't signed in to OTHCloud.
 */
export async function resolveGithubToken(authService: IAuthenticationService): Promise<string | undefined> {
	const sessions = await authService.getSessions(OTHCLOUD_GITHUB_PROVIDER_ID);
	return sessions[0]?.accessToken;
}

/**
 * Figures out which GitHub account the installation token belongs to (e.g. the
 * `OverTimeHosting` org vs a personal account). Uses the installation's
 * repositories since installation tokens can't hit `/user`. Returns undefined
 * when it can't be determined (e.g. a brand-new installation with no repos).
 */
export async function resolveGithubOwner(token: string): Promise<IGithubOwner | undefined> {
	try {
		const res = await fetch(`${GITHUB_API}/installation/repositories?per_page=1`, { headers: githubHeaders(token) });
		if (!res.ok) {
			return undefined;
		}
		const data = await res.json() as { repositories?: { owner?: { login?: string; type?: string } }[] };
		const owner = data.repositories?.[0]?.owner;
		if (owner?.login) {
			return { login: owner.login, type: owner.type ?? 'User' };
		}
	} catch {
		// network / parse error — fall through
	}
	return undefined;
}

/**
 * Creates a repo on GitHub using the installation token. Org installs go through
 * `/orgs/{org}/repos`; anything else falls back to `/user/repos` (which an
 * installation token usually can't use — GitHub's error is surfaced verbatim).
 */
export async function createGithubRepo(token: string, owner: IGithubOwner, input: ICreateRepoInput): Promise<ICreatedRepo> {
	const path = owner.type === 'Organization' ? `/orgs/${owner.login}/repos` : '/user/repos';
	const res = await fetch(`${GITHUB_API}${path}`, {
		method: 'POST',
		headers: { ...githubHeaders(token), 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: input.name,
			description: input.description,
			private: input.private,
			auto_init: input.autoInit ?? true,
		}),
	});

	const text = await res.text();
	let parsed: any;
	try { parsed = text ? JSON.parse(text) : undefined; } catch { parsed = undefined; }

	if (!res.ok) {
		const detail = parsed?.errors?.[0]?.message;
		const message = detail ?? parsed?.message ?? `HTTP ${res.status}`;
		throw new GithubApiError(res.status, message);
	}

	return {
		name: parsed.name,
		fullName: parsed.full_name,
		htmlUrl: parsed.html_url,
		cloneUrl: parsed.clone_url,
		sshUrl: parsed.ssh_url,
		owner: parsed.owner?.login ?? owner.login,
		private: !!parsed.private,
		defaultBranch: parsed.default_branch,
	};
}
