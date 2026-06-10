/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { isNumber, isObject } from '../../../../base/common/types.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IEditorSerializer } from '../../../common/editor.js';
import { EditorInput } from '../../../common/editor/editorInput.js';
import { ISerializedTerminalEditorInput, ITerminalEditorService, ITerminalInstance, type IDeserializedTerminalEditorInput } from './terminal.js';
import { TerminalEditorInput } from './terminalEditorInput.js';

export class TerminalInputSerializer implements IEditorSerializer {
	constructor(
		@ITerminalEditorService private readonly _terminalEditorService: ITerminalEditorService
	) { }

	public canSerialize(editorInput: TerminalEditorInput): editorInput is TerminalEditorInput & { readonly terminalInstance: ITerminalInstance } {
		return isNumber(editorInput.terminalInstance?.persistentProcessId) && editorInput.terminalInstance.shouldPersist;
	}

	public serialize(editorInput: TerminalEditorInput): string | undefined {
		if (!this.canSerialize(editorInput)) {
			return;
		}
		return JSON.stringify(this._toJson(editorInput.terminalInstance));
	}

	public deserialize(instantiationService: IInstantiationService, serializedEditorInput: string): EditorInput | undefined {
		const editorInput = JSON.parse(serializedEditorInput) as unknown;
		if (!isDeserializedTerminalEditorInput(editorInput)) {
			throw new Error(`Could not revive terminal editor input, ${editorInput}`);
		}
		return this._terminalEditorService.reviveInput(editorInput);
	}

	private _toJson(instance: ITerminalInstance): ISerializedTerminalEditorInput {
		const slc = instance.shellLaunchConfig;
		return {
			id: instance.persistentProcessId!,
			pid: instance.processId || 0,
			title: instance.title,
			titleSource: instance.titleSource,
			cwd: typeof slc.cwd === 'string' ? slc.cwd : slc.cwd?.toString() ?? '',
			icon: instance.icon,
			color: instance.color,
			hasChildProcesses: instance.hasChildProcesses,
			isFeatureTerminal: slc.isFeatureTerminal,
			hideFromUser: slc.hideFromUser,
			reconnectionProperties: slc.reconnectionProperties,
			shellIntegrationNonce: instance.shellIntegrationNonce,
			// Remember the profile so it can be relaunched if the process is gone on restore.
			executable: slc.executable,
			args: slc.args,
			profileName: slc.profileName
		};
	}
}

function isDeserializedTerminalEditorInput(obj: unknown): obj is IDeserializedTerminalEditorInput {
	return isObject(obj) && 'id' in obj && 'pid' in obj;
}
