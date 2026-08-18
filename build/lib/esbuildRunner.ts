/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as cp from 'child_process';
import * as path from 'path';

const root = path.dirname(import.meta.dirname);

export type EsbuildBundleTarget = 'desktop' | 'server' | 'server-web';

function run(args: string[], describe: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const proc = cp.spawn(process.execPath, args, {
			cwd: root,
			stdio: 'inherit'
		});

		proc.on('error', reject);
		proc.on('close', code => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`${describe} failed with exit code ${code}`));
			}
		});
	});
}

/**
 * Transpiles individual source files into `outDir` (used for unit tests and for
 * the non-bundled resources that the packaging tasks copy out of `out-build`).
 */
export function runEsbuildTranspile(outDir: string, excludeTests: boolean): Promise<void> {
	const args = [path.join(root, 'build/next/index.ts'), 'transpile', '--out', outDir];
	if (excludeTests) {
		args.push('--exclude-tests');
	}

	return run(args, `esbuild transpile (outDir: ${outDir})`);
}

/**
 * Bundles the sources for shipping. Bundling also writes the NLS files into
 * `out-build`, so it must run after {@link runEsbuildTranspile}.
 */
export function runEsbuildBundle(outDir: string, minify: boolean, nls: boolean, target: EsbuildBundleTarget = 'desktop', sourceMapBaseUrl?: string): Promise<void> {
	const args = [path.join(root, 'build/next/index.ts'), 'bundle', '--out', outDir, '--target', target];
	if (minify) {
		args.push('--minify');
	}
	if (nls) {
		args.push('--nls');
	}
	if (sourceMapBaseUrl) {
		args.push('--source-map-base-url', sourceMapBaseUrl);
	}

	return run(args, `esbuild bundle (outDir: ${outDir}, minify: ${minify}, nls: ${nls}, target: ${target})`);
}

export function runTsGoTypeCheck(): Promise<void> {
	return new Promise((resolve, reject) => {
		const proc = cp.spawn('tsgo', ['--project', 'src/tsconfig.json', '--noEmit', '--skipLibCheck'], {
			cwd: root,
			stdio: 'inherit',
			shell: true
		});

		proc.on('error', reject);
		proc.on('close', code => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`tsgo typecheck failed with exit code ${code}`));
			}
		});
	});
}
