/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../base/common/lifecycle.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { IStorageService, StorageScope, StorageTarget } from '../../../../platform/storage/common/storage.js';
import { IViewDescriptorService, ViewContainerLocation } from '../../../common/views.js';
import { IWorkbenchContribution, IWorkbenchContributionsRegistry, Extensions as WorkbenchExtensions } from '../../../common/contributions.js';
import { LifecyclePhase } from '../../../services/lifecycle/common/lifecycle.js';

/** VS Code's built-in Source Control Graph (`SCMHistoryViewPane`). */
const SCM_GRAPH_VIEW_ID = 'workbench.scm.history';
const DID_MOVE_KEY = 'othcloud.layout.scmGraphMovedToPanel';

/**
 * Puts the built-in Source Control Graph in the bottom panel (the "pull up"
 * section) the first time a profile starts.
 *
 * OTHCloud ships GitLens, whose own Commit Graph is a webview behind a GitKraken
 * account/Pro gate. The graph that ships with VS Code needs no account at all -
 * it only requires a source control history provider (the git extension) - so it
 * is the one we surface by default.
 *
 * Only ever applied once per profile, and recorded even when the move cannot be
 * performed, so a user who later drags the view elsewhere keeps their choice.
 */
class ScmGraphInPanelContribution extends Disposable implements IWorkbenchContribution {

	static readonly ID = 'workbench.contrib.othcloudScmGraphInPanel';

	constructor(
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IStorageService storageService: IStorageService,
	) {
		super();

		if (storageService.getBoolean(DID_MOVE_KEY, StorageScope.PROFILE, false)) {
			return;
		}

		const apply = () => {
			const view = viewDescriptorService.getViewDescriptorById(SCM_GRAPH_VIEW_ID);
			if (!view) {
				// The view registers with the SCM contribution; if it is not there yet
				// we simply try again on the next container change.
				return false;
			}
			if (viewDescriptorService.getViewLocationById(SCM_GRAPH_VIEW_ID) !== ViewContainerLocation.Panel) {
				viewDescriptorService.moveViewToLocation(view, ViewContainerLocation.Panel, 'othcloud default layout');
			}
			storageService.store(DID_MOVE_KEY, true, StorageScope.PROFILE, StorageTarget.USER);
			return true;
		};

		if (!apply()) {
			const listener = this._register(viewDescriptorService.onDidChangeViewContainers(() => {
				if (apply()) {
					listener.dispose();
				}
			}));
		}
	}
}

Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench)
	.registerWorkbenchContribution(ScmGraphInPanelContribution, LifecyclePhase.Restored);
