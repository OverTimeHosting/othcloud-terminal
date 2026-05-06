/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize } from '../../../../nls.js';
import { EditorInput } from '../../../common/editor/editorInput.js';
import { URI } from '../../../../base/common/uri.js';
import { IUntypedEditorInput } from '../../../common/editor.js';
import { IEditorOptions } from '../../../../platform/editor/common/editor.js';

export const DEVELOPERS_RESOURCE_SCHEME = 'othcloud-developers';
export const DEVELOPERS_INPUT_ID = 'workbench.editors.othcloudDevelopersInput';

export interface DevelopersEditorOptions extends IEditorOptions {
	view?: 'home' | 'tasks' | 'task' | 'services' | 'service';
	taskId?: number;
	serviceId?: number;
}

export class DevelopersInput extends EditorInput {

	static readonly ID = DEVELOPERS_INPUT_ID;
	static readonly RESOURCE = URI.from({ scheme: DEVELOPERS_RESOURCE_SCHEME, authority: 'home' });

	private _initialView: 'home' | 'tasks' | 'task' | 'services' | 'service' | undefined;
	private _initialTaskId: number | undefined;
	private _initialServiceId: number | undefined;

	constructor(opts: DevelopersEditorOptions = {}) {
		super();
		this._initialView = opts.view;
		this._initialTaskId = opts.taskId;
		this._initialServiceId = opts.serviceId;
	}

	override get typeId(): string {
		return DevelopersInput.ID;
	}

	override get editorId(): string | undefined {
		return DevelopersInput.ID;
	}

	override get resource(): URI | undefined {
		return DevelopersInput.RESOURCE;
	}

	get initialView(): 'home' | 'tasks' | 'task' | 'services' | 'service' | undefined {
		return this._initialView;
	}

	get initialTaskId(): number | undefined {
		return this._initialTaskId;
	}

	get initialServiceId(): number | undefined {
		return this._initialServiceId;
	}

	override getName(): string {
		if (this._initialTaskId !== undefined) {
			return localize('othcloud.developers.taskTitle', 'Task #{0}', this._initialTaskId);
		}
		if (this._initialServiceId !== undefined) {
			return localize('othcloud.developers.serviceTitle', 'Service #{0}', this._initialServiceId);
		}
		switch (this._initialView) {
			case 'tasks':
				return localize('othcloud.developers.tasksTitle', 'Tasks');
			case 'services':
				return localize('othcloud.developers.servicesTitle', 'Services');
			default:
				return localize('othcloud.developers.title', 'Developers');
		}
	}

	override toUntyped(): IUntypedEditorInput {
		return {
			resource: DevelopersInput.RESOURCE,
			options: { override: DevelopersInput.ID, pinned: true }
		};
	}

	override matches(other: EditorInput | IUntypedEditorInput): boolean {
		if (super.matches(other)) {
			return true;
		}
		if (!(other instanceof DevelopersInput)) {
			return false;
		}
		// Each task / service / view kind opens as its own distinct editor so
		// "open task #5 in window" doesn't just focus an existing tasks list.
		return (this._initialView ?? 'home') === (other.initialView ?? 'home')
			&& this._initialTaskId === other.initialTaskId
			&& this._initialServiceId === other.initialServiceId;
	}
}
