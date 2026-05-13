/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/othcloudAccount.css';
import { localize, localize2 } from '../../../../nls.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { Action2, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';
import { ConfigurationTarget, IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IEditorService } from '../../../services/editor/common/editorService.js';
import { IEditorGroupsService } from '../../../services/editor/common/editorGroupsService.js';
import { BrowserViewUri } from '../../../../platform/browserView/common/browserViewUri.js';
import { IWorkbenchContribution, registerWorkbenchContribution2, WorkbenchPhase } from '../../../common/contributions.js';
import { IOthcloudAccountService, OthcloudAccountService } from '../common/othcloudAccountService.js';
import { OthcloudAccountUrlHandler } from './othcloudAccountUrlHandler.js';
import { OthcloudAccountMenuContribution } from './othcloudAccountMenu.js';
import { OthcloudGithubAuthProvider } from './othcloudGithubAuthProvider.js';
import { registerOthcloudAccountSidebar } from './othcloudAccountSidebar.js';
import { OTHCLOUD_BASE_URL } from './othcloudAccountClient.js';

const SIGN_IN_COMMAND = 'othcloud.account.signIn';
const SIGN_OUT_COMMAND = 'othcloud.account.signOut';

registerSingleton(IOthcloudAccountService, OthcloudAccountService, InstantiationType.Delayed);

registerOthcloudAccountSidebar();

registerWorkbenchContribution2(
	OthcloudAccountUrlHandler.ID,
	OthcloudAccountUrlHandler,
	WorkbenchPhase.AfterRestored,
);

registerWorkbenchContribution2(
	OthcloudAccountMenuContribution.ID,
	OthcloudAccountMenuContribution,
	WorkbenchPhase.AfterRestored,
);

// Reverted to `AfterRestored` while we debug a blank-workbench issue with
// earlier phases. PR extension may briefly time out on `github` auth provider
// — re-tackle the phase change after isolating what's breaking startup.
registerWorkbenchContribution2(
	OthcloudGithubAuthProvider.ID,
	OthcloudGithubAuthProvider,
	WorkbenchPhase.AfterRestored,
);

/**
 * Pins `workbench.activityBar.location` to `top` on workbench start. The
 * default is already `top` (`workbench.contribution.ts:616`); this catches
 * the case where the user previously changed it and wants the Othcloud look
 * back without rummaging in settings.
 */
class ForceActivityBarTopContribution extends Disposable implements IWorkbenchContribution {
	static readonly ID = 'workbench.contrib.othcloudForceActivityBarTop';

	constructor(
		@IConfigurationService configurationService: IConfigurationService,
	) {
		super();
		const current = configurationService.getValue('workbench.activityBar.location');
		if (current !== 'top') {
			void configurationService.updateValue('workbench.activityBar.location', 'top', ConfigurationTarget.USER);
		}
	}
}

registerWorkbenchContribution2(
	ForceActivityBarTopContribution.ID,
	ForceActivityBarTopContribution,
	WorkbenchPhase.AfterRestored,
);

registerAction2(class SignInAction extends Action2 {
	constructor() {
		super({
			id: SIGN_IN_COMMAND,
			title: localize2('othcloud.account.signInAction', 'Sign in to OTHCloud'),
			category: localize2('othcloud.account.category', 'OTHCloud'),
			icon: Codicon.cloud,
			f1: true,
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		// Opens the website's /desktop-pair auto-trigger page. If the user is
		// already signed in there, that page mints a code and fires the
		// `othcloud-terminal://auth` deep link automatically; if not, it
		// bounces to the login page with a sessionStorage flag the dashboard
		// picks up after login. Either way: no manual button click required.
		const editorService = accessor.get(IEditorService);
		const editorGroupsService = accessor.get(IEditorGroupsService);
		const targetGroup = editorGroupsService.activeGroup;
		await editorService.openEditor(
			{ resource: BrowserViewUri.forUrl(OTHCLOUD_BASE_URL + '/desktop-pair'), options: { pinned: true } },
			targetGroup.id,
		);
		if (!targetGroup.isLocked) {
			targetGroup.lock(true);
		}
	}
});

registerAction2(class LinkGithubAction extends Action2 {
	constructor() {
		super({
			id: 'othcloud.github.link',
			title: localize2('othcloud.github.linkAction', 'Link GitHub on OTHCloud'),
			category: localize2('othcloud.account.category', 'OTHCloud'),
			icon: Codicon.github,
			f1: true,
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		// Opens the website's git settings page in the embedded browser tab.
		// The user finishes connecting GitHub there; the desktop auth
		// provider picks up the new connection on next refresh.
		const editorService = accessor.get(IEditorService);
		const editorGroupsService = accessor.get(IEditorGroupsService);
		const targetGroup = editorGroupsService.activeGroup;
		await editorService.openEditor(
			{ resource: BrowserViewUri.forUrl(OTHCLOUD_BASE_URL + '/dashboard/settings/git/github'), options: { pinned: true } },
			targetGroup.id,
		);
		if (!targetGroup.isLocked) {
			targetGroup.lock(true);
		}
	}
});

registerAction2(class SignOutAction extends Action2 {
	constructor() {
		super({
			id: SIGN_OUT_COMMAND,
			title: localize2('othcloud.account.signOutAction', 'Sign out of OTHCloud'),
			category: localize2('othcloud.account.category', 'OTHCloud'),
			f1: true,
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const accountService = accessor.get(IOthcloudAccountService);
		await accountService.signOut();
	}
});

// Marker export to silence isolatedModules.
export const _ = localize('othcloud.account.placeholder', 'OTHCloud account');
