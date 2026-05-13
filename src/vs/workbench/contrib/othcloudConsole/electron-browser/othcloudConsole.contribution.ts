/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize, localize2 } from '../../../../nls.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { Action2, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';
import { IMainProcessService } from '../../../../platform/ipc/common/mainProcessService.js';
import { ProxyChannel } from '../../../../base/parts/ipc/common/ipc.js';
import { IOthcloudConsoleService, IPC_OTHCLOUD_CONSOLE_CHANNEL } from '../../../../platform/othcloudConsole/common/othcloudConsole.js';

class OthcloudConsoleRendererService implements IOthcloudConsoleService {
	declare readonly _serviceBrand: undefined;

	private readonly proxy: IOthcloudConsoleService;

	constructor(
		@IMainProcessService mainProcessService: IMainProcessService,
	) {
		const channel = mainProcessService.getChannel(IPC_OTHCLOUD_CONSOLE_CHANNEL);
		this.proxy = ProxyChannel.toService<IOthcloudConsoleService>(channel);
	}

	open(url?: string): Promise<void> { return this.proxy.open(url); }
	close(): Promise<void> { return this.proxy.close(); }
}

registerSingleton(IOthcloudConsoleService, OthcloudConsoleRendererService, InstantiationType.Delayed);

export const OPEN_OTHCLOUD_CONSOLE_COMMAND = 'othcloud.console.open';

registerAction2(class OpenOthcloudConsoleAction extends Action2 {
	constructor() {
		super({
			id: OPEN_OTHCLOUD_CONSOLE_COMMAND,
			title: localize2('othcloud.console.openAction', 'Open OTHCloud Console'),
			category: localize2('othcloud.console.category', 'OTHCloud'),
			icon: Codicon.window,
			f1: true,
		});
	}

	async run(accessor: ServicesAccessor, url?: string): Promise<void> {
		const consoleService = accessor.get(IOthcloudConsoleService);
		await consoleService.open(typeof url === 'string' ? url : undefined);
	}
});

// Marker export so isolatedModules is happy.
export const _ = localize('othcloud.console.placeholder', 'OTHCloud Console');
