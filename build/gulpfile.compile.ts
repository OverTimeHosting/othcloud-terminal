/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import gulp from 'gulp';
import * as util from './lib/util.ts';
import * as date from './lib/date.ts';
import * as task from './lib/task.ts';
import * as compilation from './lib/compilation.ts';

function makeCompileBuildTask(disableMangle: boolean) {
	return task.series(
		util.rimraf('out-build'),
		date.writeISODate('out-build'),
		compilation.compileApiProposalNamesTask,
		compilation.compileTask('src', 'out-build', true, { disableMangle })
	);
}

// Local/PR compile, including nls and inline sources in sourcemaps, minification, no mangling
export const compileBuildWithoutManglingTask = task.define('compile-build-without-mangling', task.series(compilation.copyCodiconsTask, makeCompileBuildTask(true)));
gulp.task(compileBuildWithoutManglingTask);

// CI compile, including nls and inline sources in sourcemaps, mangling, minification, for build
// Set VSCODE_NO_MANGLE=1 to skip the TS->TS mangler (much faster locally; the mangler step
// runs a worker pool of TypeScript language services and can take 20+ minutes on Windows/OneDrive).
const skipMangleEnv = !!process.env['VSCODE_NO_MANGLE'];
export const compileBuildWithManglingTask = task.define('compile-build-with-mangling', task.series(compilation.copyCodiconsTask, makeCompileBuildTask(skipMangleEnv)));
gulp.task(compileBuildWithManglingTask);
