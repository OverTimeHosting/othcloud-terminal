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
	view?: 'home' | 'tasks';
	taskId?: number;
}

export class DevelopersInput extends EditorInput {

	static readonly ID = DEVELOPERS_INPUT_ID;
	static readonly RESOURCE = URI.from({ scheme: DEVELOPERS_RESOURCE_SCHEME, authority: 'home' });

	private _initialView: 'home' | 'tasks' | undefined;
	private _initialTaskId: number | undefined;

	constructor(opts: DevelopersEditorOptions = {}) {
		super();
		this._initialView = opts.view;
		this._initialTaskId = opts.taskId;
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

	get initialView(): 'home' | 'tasks' | undefined {
		return this._initialView;
	}

	get initialTaskId(): number | undefined {
		return this._initialTaskId;
	}

	override getName(): string {
		return this._initialView === 'tasks'
			? localize('othcloud.developers.tasksTitle', 'Tasks')
			: localize('othcloud.developers.title', 'Developers');
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
		// Treat the 'home' panel and the popped-out 'tasks' window as
		// distinct editors so opening one doesn't just focus the other.
		return (this._initialView ?? 'home') === (other.initialView ?? 'home');
	}
}
