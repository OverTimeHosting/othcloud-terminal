/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CancellationToken } from '../../../base/common/cancellation.js';
import { ILogService } from '../../log/common/log.js';
import { IRequestService, asJson } from '../../request/common/request.js';
import { IUpdate } from '../common/update.js';

interface GitHubAsset {
	name: string;
	browser_download_url: string;
	size: number;
}

interface GitHubRelease {
	tag_name: string;          // e.g. "v1.110.5"
	name: string;
	prerelease: boolean;
	draft: boolean;
	published_at: string;      // ISO 8601
	assets: GitHubAsset[];
}

/**
 * Parse "https://github.com/<owner>/<repo>/releases" (or any URL containing
 * "github.com/<owner>/<repo>") into the {owner, repo} pair we need for the
 * GitHub Releases API. Returns undefined if the URL is not a GitHub repo.
 */
export function parseGitHubRepoFromUpdateUrl(updateUrl: string): { owner: string; repo: string } | undefined {
	try {
		const u = new URL(updateUrl);
		if (u.hostname !== 'github.com' && u.hostname !== 'www.github.com') {
			return undefined;
		}
		const parts = u.pathname.split('/').filter(Boolean);
		if (parts.length < 2) {
			return undefined;
		}
		return { owner: parts[0], repo: parts[1] };
	} catch {
		return undefined;
	}
}

/**
 * Compare two semver-style "1.2.3" version strings. Returns:
 *  -  positive if `a` is newer than `b`
 *  -  zero    if equal
 *  -  negative if `a` is older than `b`
 *
 * Non-numeric segments are treated as zero. Pre-release suffixes (e.g.
 * "1.2.3-beta") are ignored — we only ship release tags.
 */
export function compareVersions(a: string, b: string): number {
	const parse = (v: string) => v.replace(/^v/, '').split(/[.-]/).slice(0, 3).map(p => parseInt(p, 10) || 0);
	const av = parse(a);
	const bv = parse(b);
	for (let i = 0; i < 3; i++) {
		if ((av[i] ?? 0) !== (bv[i] ?? 0)) {
			return (av[i] ?? 0) - (bv[i] ?? 0);
		}
	}
	return 0;
}

/**
 * Fetches the latest GitHub Release for the given repo and returns an
 * `IUpdate` if a matching asset exists AND the release is newer than
 * `currentVersion`. Returns `null` otherwise (already up-to-date, no asset
 * matches the predicate, or the request failed).
 *
 * @param assetMatcher predicate over asset filenames — pick the right artifact
 *                     for the current platform/arch (e.g. ends with `-user-setup.exe`)
 */
export async function fetchLatestGitHubRelease(
	repo: { owner: string; repo: string },
	currentVersion: string,
	assetMatcher: (assetName: string) => boolean,
	requestService: IRequestService,
	logService: ILogService,
	token: CancellationToken,
): Promise<IUpdate | null> {
	const url = `https://api.github.com/repos/${repo.owner}/${repo.repo}/releases/latest`;
	logService.info(`update#github - fetching ${url}`);

	let release: GitHubRelease | null;
	try {
		const ctx = await requestService.request({
			url,
			headers: {
				'Accept': 'application/vnd.github+json',
				'X-GitHub-Api-Version': '2022-11-28',
				'User-Agent': 'OthcloudTerminal-Updater',
			},
		}, token);
		release = await asJson<GitHubRelease>(ctx);
	} catch (err) {
		logService.error('update#github - failed to fetch latest release', err);
		return null;
	}

	if (!release || release.draft || release.prerelease) {
		return null;
	}

	const releaseVersion = release.tag_name.replace(/^v/, '');
	if (compareVersions(releaseVersion, currentVersion) <= 0) {
		logService.info(`update#github - already on latest (current=${currentVersion}, latest=${releaseVersion})`);
		return null;
	}

	const asset = release.assets.find(a => assetMatcher(a.name));
	if (!asset) {
		logService.warn(`update#github - release ${release.tag_name} has no asset matching the platform predicate`);
		return null;
	}

	return {
		// We use the version string as the cache key (e.g. "1.110.5"). The
		// existing Win32 service treats this opaquely so any unique string works.
		version: releaseVersion,
		productVersion: releaseVersion,
		url: asset.browser_download_url,
		timestamp: Date.parse(release.published_at) || undefined,
	};
}
