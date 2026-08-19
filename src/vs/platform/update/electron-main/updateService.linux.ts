/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { spawn } from 'child_process';
import { mkdir, open, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { localize } from '../../../nls.js';
import { Delayer } from '../../../base/common/async.js';
import { VSBuffer } from '../../../base/common/buffer.js';
import { CancellationToken } from '../../../base/common/cancellation.js';
import { memoize } from '../../../base/common/decorators.js';
import * as path from '../../../base/common/path.js';
import { transform } from '../../../base/common/stream.js';
import { URI } from '../../../base/common/uri.js';
import * as pfs from '../../../base/node/pfs.js';
import { IConfigurationService } from '../../configuration/common/configuration.js';
import { IEnvironmentMainService } from '../../environment/electron-main/environmentMainService.js';
import { IFileService } from '../../files/common/files.js';
import { ILifecycleMainService } from '../../lifecycle/electron-main/lifecycleMainService.js';
import { ILogService } from '../../log/common/log.js';
import { IMeteredConnectionService } from '../../meteredConnection/common/meteredConnection.js';
import { INativeHostMainService } from '../../native/electron-main/nativeHostMainService.js';
import { IProductService } from '../../product/common/productService.js';
import { asJson, IRequestService } from '../../request/common/request.js';
import { AvailableForDownload, IUpdate, State, StateType, UpdateType } from '../common/update.js';
import { AbstractUpdateService, createUpdateURL, IUpdateURLOptions } from './abstractUpdateService.js';
import { fetchLatestGitHubRelease, parseGitHubRepoFromUpdateUrl } from './githubReleaseProvider.js';

/**
 * How a downloaded package gets installed: an elevation helper (polkit's
 * `pkexec`, which shows the desktop's own password prompt) plus the package
 * tool it runs.
 */
interface IPackageInstaller {
	readonly elevator: string;
	readonly program: string;
	readonly args: readonly string[];
}

/** `!<arch>` — the magic every .deb (an `ar` archive) starts with. */
const DEB_MAGIC = '!<arch>';

export class LinuxUpdateService extends AbstractUpdateService {

	/** Path of the .deb that has been downloaded and is waiting to be installed. */
	private availableUpdatePath: string | undefined;

	@memoize
	private get cachePath(): Promise<string> {
		const result = path.join(tmpdir(), `${this.productService.applicationName}-update-${process.arch}`);
		return mkdir(result, { recursive: true }).then(() => result);
	}

	constructor(
		@ILifecycleMainService lifecycleMainService: ILifecycleMainService,
		@IConfigurationService configurationService: IConfigurationService,
		@IEnvironmentMainService environmentMainService: IEnvironmentMainService,
		@IRequestService requestService: IRequestService,
		@ILogService logService: ILogService,
		@IFileService private readonly fileService: IFileService,
		@INativeHostMainService private readonly nativeHostMainService: INativeHostMainService,
		@IProductService productService: IProductService,
		@IMeteredConnectionService meteredConnectionService: IMeteredConnectionService,
	) {
		super(lifecycleMainService, configurationService, environmentMainService, requestService, logService, productService, meteredConnectionService, false);
	}

	protected buildUpdateFeedUrl(quality: string, commit: string, options?: IUpdateURLOptions): string {
		return createUpdateURL(this.productService.updateUrl!, `linux-${process.arch}`, quality, commit, options);
	}

	protected doCheckForUpdates(explicit: boolean, _pendingCommit?: string): void {
		if (!this.quality) {
			return;
		}

		this.setState(State.CheckingForUpdates(explicit));

		// If updateUrl points at a GitHub repo, talk to GitHub's Releases API
		// directly and look for the .deb built for this architecture.
		const githubRepo = parseGitHubRepoFromUpdateUrl(this.productService.updateUrl ?? '');
		const updatePromise: Promise<IUpdate | null> = githubRepo
			? fetchLatestGitHubRelease(
				githubRepo,
				this.productService.version,
				name => /\.deb$/i.test(name) && /amd64|x86_64|x64/i.test(name),
				this.requestService,
				this.logService,
				CancellationToken.None,
			)
			: (() => {
				const background = !explicit && !this.shouldDisableProgressiveReleases();
				const url = this.buildUpdateFeedUrl(this.quality!, this.productService.commit!, { background });
				return this.requestService.request({ url }, CancellationToken.None).then<IUpdate | null>(asJson);
			})();

		updatePromise
			.then(update => {
				if (!update || !update.url || !update.version || !update.productVersion) {
					this.setState(State.Idle(UpdateType.Archive));
				} else {
					this.setState(State.AvailableForDownload(update));
				}
			})
			.then(undefined, err => {
				this.logService.error(err);
				// only show message when explicitly checking for updates
				const message: string | undefined = explicit ? (err.message || err) : undefined;
				this.setState(State.Idle(UpdateType.Archive, message));
			});
	}

	/**
	 * Downloads the .deb for the available update. Installation is deliberately
	 * left to `applyUpdate()` (the "Install Update" notification) so that the
	 * password prompt only ever appears in response to something the user asked
	 * for.
	 *
	 * Installs we cannot manage ourselves — a tarball unpacked by hand, or a
	 * distro without dpkg — keep the old behaviour of handing the download to
	 * the browser.
	 */
	protected override async doDownloadUpdate(state: AvailableForDownload): Promise<void> {
		const update = state.update;

		if (!update.url) {
			this.setState(State.Idle(UpdateType.Archive));
			return;
		}

		if (!await this.resolvePackageInstaller()) {
			this.logService.info('update#doDownloadUpdate - no in-app installer for this install, opening the download instead');
			this.openInBrowser(update);
			this.setState(State.Idle(UpdateType.Archive));
			return;
		}

		// The Linux download only ever starts from a user action, so it is
		// always an explicit one as far as the notifications are concerned.
		const explicit = true;
		const startTime = Date.now();

		this.setState(State.Downloading(update, explicit, false, 0, undefined, startTime));

		try {
			const packagePath = await this.downloadPackage(update, explicit, startTime);

			this.availableUpdatePath = packagePath;
			this.setState(State.Downloaded(update, explicit, false));
		} catch (err) {
			this.logService.error('update#doDownloadUpdate', err);
			this.setState(State.Idle(UpdateType.Archive, err.message || String(err)));
		}
	}

	private async downloadPackage(update: IUpdate, explicit: boolean, startTime: number): Promise<string> {
		await this.cleanup(update.version);

		const cachePath = await this.cachePath;
		const packagePath = path.join(cachePath, `${this.productService.applicationName}-${update.version}-${process.arch}.deb`);

		if (await pfs.Promises.exists(packagePath)) {
			return packagePath; // already downloaded on an earlier run
		}

		const downloadPath = `${packagePath}.tmp`;
		const context = await this.requestService.request({ url: update.url }, CancellationToken.None);

		if (context.res.statusCode !== 200) {
			throw new Error(localize('updateDownloadFailed', "Downloading the update failed (HTTP {0}).", context.res.statusCode ?? 'unknown'));
		}

		const contentLengthHeader = context.res.headers['content-length'];
		const contentLength = typeof contentLengthHeader === 'string' ? contentLengthHeader : undefined;
		const totalBytes = contentLength ? parseInt(contentLength, 10) : undefined;

		let downloadedBytes = 0;
		const progressDelayer = new Delayer<void>(500);
		const progressStream = transform<VSBuffer, VSBuffer>(
			context.stream,
			{
				data: data => {
					downloadedBytes += data.byteLength;
					progressDelayer.trigger(() => {
						this.setState(State.Downloading(update, explicit, false, downloadedBytes, totalBytes, startTime));
					});
					return data;
				}
			},
			chunks => VSBuffer.concat(chunks)
		);

		try {
			await this.fileService.writeFile(URI.file(downloadPath), progressStream);
		} finally {
			progressDelayer.dispose();
		}

		// A download that redirected to an error page would otherwise be handed
		// to dpkg as if it were a package.
		await this.assertDebianPackage(downloadPath);
		await pfs.Promises.rename(downloadPath, packagePath, false /* no retry */);

		return packagePath;
	}

	/**
	 * Installs the downloaded package. This is where the desktop's password
	 * prompt appears — while the window is still up, so it has somewhere to
	 * show itself and the restart afterwards is instant.
	 */
	protected override async doApplyUpdate(): Promise<void> {
		if (this.state.type !== StateType.Downloaded) {
			return;
		}

		const { update, explicit } = this.state;
		const packagePath = this.availableUpdatePath;

		if (!packagePath) {
			this.setState(State.Idle(UpdateType.Archive));
			return;
		}

		this.setState(State.Updating(update));

		try {
			await this.installPackage(packagePath);
		} catch (err) {
			this.logService.error('update#doApplyUpdate', err);
			this.setState(State.Idle(UpdateType.Archive, err.message || String(err)));
			return;
		}

		this.setState(State.Ready(update, explicit, false));
	}

	private async installPackage(packagePath: string): Promise<void> {
		const installer = await this.resolvePackageInstaller();
		if (!installer) {
			throw new Error(localize('updateNoInstaller', "This installation cannot be updated in place. Download the new version manually."));
		}

		await this.spawnAndWait(installer.elevator, [installer.program, ...installer.args, packagePath]);
	}

	/**
	 * The new version is on disk by the time we get here, so restarting is all
	 * that is left. The old process keeps running from the inodes it already
	 * opened until it exits, which is why the install itself is safe to do
	 * while the app is up.
	 */
	protected override doQuitAndInstall(): void {
		this.logService.trace('update#quitAndInstall(): running raw#quitAndInstall()');

		// Give the current instance a moment to exit, otherwise the new one
		// finds the running instance and simply hands focus back to it.
		spawn('/bin/sh', ['-c', `sleep 2 && exec "$0"`, process.execPath], {
			detached: true,
			stdio: 'ignore',
		}).unref();
	}

	/**
	 * Works out how this install can be updated in place, or `undefined` when it
	 * cannot be. Requires all three of: a dpkg-managed install (so replacing the
	 * package is actually the right thing to do), a package tool to do it with,
	 * and an elevation helper to ask for the password.
	 */
	@memoize
	private async resolvePackageInstaller(): Promise<IPackageInstaller | undefined> {
		const dpkg = await this.lookupExecutable('dpkg');
		if (!dpkg) {
			return undefined;
		}

		// `dpkg -S` fails for anything dpkg did not put there — a tarball
		// unpacked by hand, or a build running out of a source tree.
		try {
			await this.spawnAndWait(dpkg, ['-S', process.execPath]);
		} catch {
			this.logService.info('update#resolvePackageInstaller - not a dpkg-managed install, in-app updates unavailable');
			return undefined;
		}

		const elevator = await this.lookupExecutable('pkexec');
		if (!elevator) {
			this.logService.info('update#resolvePackageInstaller - pkexec not available, in-app updates unavailable');
			return undefined;
		}

		// apt resolves any new dependencies the package picked up; dpkg alone
		// only works when they are all satisfied already, which is the normal
		// case for an upgrade of a package that is already installed.
		const apt = await this.lookupExecutable('apt-get');
		if (apt) {
			return {
				elevator,
				program: apt,
				args: [
					'install', '-y', '--allow-downgrades',
					// Never stop on a config-file prompt: there is no terminal
					// to answer it on, and the app ships no conffiles of its own.
					'-o', 'Dpkg::Options::=--force-confdef',
					'-o', 'Dpkg::Options::=--force-confold',
				]
			};
		}

		return { elevator, program: dpkg, args: ['-i'] };
	}

	private async lookupExecutable(name: string): Promise<string | undefined> {
		const searchPath = process.env['PATH'] ?? '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin';

		for (const dir of searchPath.split(path.delimiter)) {
			if (!dir) {
				continue;
			}

			const candidate = path.join(dir, name);
			if (await pfs.Promises.exists(candidate)) {
				return candidate;
			}
		}

		return undefined;
	}

	private spawnAndWait(command: string, args: string[]): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			const child = spawn(command, args, { stdio: ['ignore', 'ignore', 'pipe'] });

			let stderr = '';
			child.stderr?.on('data', data => stderr += String(data));

			child.on('error', err => reject(err));
			child.on('close', code => {
				if (code === 0) {
					resolve();
				} else if (code === 126) {
					// pkexec's exit code for "dismissed or not authorized".
					reject(new Error(localize('updateNotAuthorized', "The update was not installed because the password prompt was dismissed.")));
				} else {
					reject(new Error(localize('updateInstallFailed', "{0} exited with code {1}. {2}", path.basename(command), code ?? -1, stderr.trim())));
				}
			});
		});
	}

	private async assertDebianPackage(packagePath: string): Promise<void> {
		const handle = await open(packagePath, 'r');
		try {
			const { buffer, bytesRead } = await handle.read(Buffer.alloc(DEB_MAGIC.length), 0, DEB_MAGIC.length, 0);
			if (bytesRead !== DEB_MAGIC.length || buffer.toString('ascii') !== DEB_MAGIC) {
				throw new Error(localize('updateNotAPackage', "The downloaded update is not a valid package."));
			}
		} finally {
			await handle.close();
		}
	}

	private async cleanup(exceptVersion: string): Promise<void> {
		const cachePath = await this.cachePath;

		let entries: string[];
		try {
			entries = await pfs.Promises.readdir(cachePath);
		} catch {
			return;
		}

		await Promise.all(entries
			.filter(entry => !entry.includes(`-${exceptVersion}-`))
			.map(async entry => {
				try {
					await unlink(path.join(cachePath, entry));
				} catch {
					// ignore
				}
			}));
	}

	private openInBrowser(update: IUpdate): void {
		// The website download page is more useful than a raw asset when we
		// cannot install it ourselves.
		if (this.productService.downloadUrl && this.productService.downloadUrl.length > 0) {
			this.nativeHostMainService.openExternal(undefined, this.productService.downloadUrl);
		} else if (update.url) {
			this.nativeHostMainService.openExternal(undefined, update.url);
		}
	}
}
