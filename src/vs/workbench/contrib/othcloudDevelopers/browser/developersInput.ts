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

export type DevelopersView = 'home' | 'tasks' | 'task' | 'services' | 'service';

export interface DevelopersEditorOptions extends IEditorOptions {
	view?: DevelopersView;
	taskId?: number;
	serviceId?: number;
}

/**
 * Build a stable URI for a given view. Each view gets a distinct URI so that
 * EditorInput.matches() (which falls back to URI equality) treats different
 * views as different editors. Without this, opening a task tab after the
 * tasks-list tab would clobber the tasks-list input state — switching back
 * to that tab would then render whatever default the page falls through to.
 */
function resourceFor(view: DevelopersView | undefined, taskId?: number, serviceId?: number): URI {
	if (taskId !== undefined) {
		return URI.from({ scheme: DEVELOPERS_RESOURCE_SCHEME, authority: 'task', path: '/' + taskId });
	}
	if (serviceId !== undefined) {
		return URI.from({ scheme: DEVELOPERS_RESOURCE_SCHEME, authority: 'service', path: '/' + serviceId });
	}
	return URI.from({ scheme: DEVELOPERS_RESOURCE_SCHEME, authority: view ?? 'home' });
}

export class DevelopersInput extends EditorInput {

	static readonly ID = DEVELOPERS_INPUT_ID;

	private _initialView: DevelopersView | undefined;
	private _initialTaskId: number | undefined;
	private _initialServiceId: number | undefined;
	private readonly _resource: URI;

	constructor(opts: DevelopersEditorOptions = {}) {
		super();
		this._initialView = opts.view;
		this._initialTaskId = opts.taskId;
		this._initialServiceId = opts.serviceId;
		this._resource = resourceFor(opts.view, opts.taskId, opts.serviceId);
	}

	override get typeId(): string {
		return DevelopersInput.ID;
	}

	override get editorId(): string | undefined {
		return DevelopersInput.ID;
	}

	override get resource(): URI | undefined {
		return this._resource;
	}

	get initialView(): DevelopersView | undefined {
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
			resource: this._resource,
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
		// Belt-and-suspenders against URI clashes — a task tab and a tasks-list
		// tab must always be treated as distinct editors.
		return (this._initialView ?? 'home') === (other.initialView ?? 'home')
			&& this._initialTaskId === other.initialTaskId
			&& this._initialServiceId === other.initialServiceId;
	}
}
