/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Codicon } from '../../../../base/common/codicons.js';
import { ThemeIcon } from '../../../../base/common/themables.js';
import { URI } from '../../../../base/common/uri.js';
import { localize } from '../../../../nls.js';
import { EditorInputCapabilities, IUntypedEditorInput } from '../../../common/editor.js';
import { EditorInput } from '../../../common/editor/editorInput.js';

export class ExtensionsMarketplaceEditorInput extends EditorInput {

	static readonly ID = 'workbench.editor.extensionsMarketplace';

	static readonly RESOURCE = URI.from({
		scheme: 'extensions-marketplace',
		path: 'default'
	});

	private static _instance: ExtensionsMarketplaceEditorInput | undefined;
	static get instance(): ExtensionsMarketplaceEditorInput {
		if (!ExtensionsMarketplaceEditorInput._instance || ExtensionsMarketplaceEditorInput._instance.isDisposed()) {
			ExtensionsMarketplaceEditorInput._instance = new ExtensionsMarketplaceEditorInput();
		}
		return ExtensionsMarketplaceEditorInput._instance;
	}

	override get typeId(): string { return ExtensionsMarketplaceEditorInput.ID; }
	override get editorId(): string | undefined { return ExtensionsMarketplaceEditorInput.ID; }
	override get capabilities(): EditorInputCapabilities { return EditorInputCapabilities.Readonly | EditorInputCapabilities.Singleton; }

	readonly resource = ExtensionsMarketplaceEditorInput.RESOURCE;

	override getName(): string {
		return localize('extensionsMarketplaceInputName', "Extensions");
	}

	override getIcon(): ThemeIcon {
		return Codicon.extensions;
	}

	override matches(other: EditorInput | IUntypedEditorInput): boolean {
		return super.matches(other) || other instanceof ExtensionsMarketplaceEditorInput;
	}
}
