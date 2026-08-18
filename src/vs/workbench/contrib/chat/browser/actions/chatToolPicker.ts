/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { assertNever } from '../../../../../base/common/assert.js';
import { CancellationToken } from '../../../../../base/common/cancellation.js';
import { Codicon } from '../../../../../base/common/codicons.js';
import { Emitter, Event } from '../../../../../base/common/event.js';
import { DisposableStore } from '../../../../../base/common/lifecycle.js';
import { ThemeIcon } from '../../../../../base/common/themables.js';
import { URI } from '../../../../../base/common/uri.js';
import { localize } from '../../../../../nls.js';
import { ICommandService } from '../../../../../platform/commands/common/commands.js';
import { ServicesAccessor } from '../../../../../platform/instantiation/common/instantiation.js';
import { IQuickInputButton, IQuickInputService, IQuickPickItem, IQuickTreeItem } from '../../../../../platform/quickinput/common/quickInput.js';
import { ITelemetryService } from '../../../../../platform/telemetry/common/telemetry.js';
import { IEditorService } from '../../../../services/editor/common/editorService.js';
import { IExtensionsWorkbenchService } from '../../../extensions/common/extensions.js';
import { ILanguageModelChatMetadata } from '../../common/languageModels.js';
import { ILanguageModelToolsService, IToolData, IToolSet, ToolDataSource, ToolSet } from '../../common/tools/languageModelToolsService.js';
import { ConfigureToolSets } from '../tools/toolSetsContribution.js';

const enum BucketOrdinal { User, BuiltIn, Extension }

// Legacy QuickPick types (existing implementation)
type BucketPick = IQuickPickItem & { picked: boolean; ordinal: BucketOrdinal; status?: string; toolset?: ToolSet; children: (ToolPick | ToolSetPick)[] };
type ToolSetPick = IQuickPickItem & { picked: boolean; toolset: ToolSet; parent: BucketPick };
type ToolPick = IQuickPickItem & { picked: boolean; tool: IToolData; parent: BucketPick };
type ActionableButton = IQuickInputButton & { action: () => void };

// New QuickTree types for tree-based implementation

/**
 * Base interface for all tree items in the QuickTree implementation.
 * Extends IQuickTreeItem with common properties for tool picker items.
 */
interface IToolTreeItem extends IQuickTreeItem {
	readonly itemType: 'bucket' | 'toolset' | 'tool' | 'callback';
	readonly ordinal?: BucketOrdinal;
	readonly buttons?: readonly ActionableButton[];
}

/**
 * Bucket tree item - represents a category of tools (User, BuiltIn, MCP Server, Extension).
 * For MCP servers, the bucket directly represents the server and stores the toolset.
 */
interface IBucketTreeItem extends IToolTreeItem {
	readonly itemType: 'bucket';
	readonly ordinal: BucketOrdinal;
	toolset?: IToolSet; // For MCP servers where the bucket represents the ToolSet - mutable
	readonly status?: string;
	readonly children: AnyTreeItem[];
	checked: boolean | 'mixed' | undefined;
	readonly sortOrder: number;
}

/**
 * ToolSet tree item - represents a collection of tools that can be managed together.
 * Used for regular (non-MCP) toolsets that appear as intermediate nodes in the tree.
 */
interface IToolSetTreeItem extends IToolTreeItem {
	readonly itemType: 'toolset';
	readonly toolset: IToolSet;
	children: AnyTreeItem[] | undefined;
	checked: boolean | 'mixed';
}

/**
 * Tool tree item - represents an individual tool that can be selected/deselected.
 * This is a leaf node in the tree structure.
 */
interface IToolTreeItemData extends IToolTreeItem {
	readonly itemType: 'tool';
	readonly tool: IToolData;
	checked: boolean;
}

/**
 * Callback tree item - represents action items like "Add MCP Server" or "Configure Tool Sets".
 * These are non-selectable items that execute actions when clicked. Can return
 * false to keep the picker open.
 */
interface ICallbackTreeItem extends IToolTreeItem {
	readonly itemType: 'callback';
	readonly run: () => boolean | void;
	readonly pickable: false;
}

type AnyTreeItem = IBucketTreeItem | IToolSetTreeItem | IToolTreeItemData | ICallbackTreeItem;

// Type guards for new QuickTree types
function isBucketTreeItem(item: AnyTreeItem): item is IBucketTreeItem {
	return item.itemType === 'bucket';
}
function isToolSetTreeItem(item: AnyTreeItem): item is IToolSetTreeItem {
	return item.itemType === 'toolset';
}
function isToolTreeItem(item: AnyTreeItem): item is IToolTreeItemData {
	return item.itemType === 'tool';
}
function isCallbackTreeItem(item: AnyTreeItem): item is ICallbackTreeItem {
	return item.itemType === 'callback';
}

/**
 * Maps different icon types (ThemeIcon or URI-based) to QuickTreeItem icon properties.
 * Handles the conversion between ToolSet/IToolData icon formats and tree item requirements.
 * Provides a default tool icon when no icon is specified.
 *
 * @param icon - Icon to map (ThemeIcon, URI object, or undefined)
 * @param useDefaultToolIcon - Whether to use a default tool icon when none is provided
 * @returns Object with iconClass (for ThemeIcon) or iconPath (for URIs) properties
 */
function mapIconToTreeItem(icon: ThemeIcon | { dark: URI; light?: URI } | undefined, useDefaultToolIcon: boolean = false): Pick<IQuickTreeItem, 'iconClass' | 'iconPath'> {
	if (!icon) {
		if (useDefaultToolIcon) {
			return { iconClass: ThemeIcon.asClassName(Codicon.tools) };
		}
		return {};
	}

	if (ThemeIcon.isThemeIcon(icon)) {
		return { iconClass: ThemeIcon.asClassName(icon) };
	} else {
		return { iconPath: icon };
	}
}

function createToolTreeItemFromData(tool: IToolData, checked: boolean): IToolTreeItemData {
	const iconProps = mapIconToTreeItem(tool.icon, true); // Use default tool icon if none provided

	return {
		itemType: 'tool',
		tool,
		id: tool.id,
		label: tool.toolReferenceName ?? tool.displayName,
		description: tool.userDescription ?? tool.modelDescription,
		checked,
		...iconProps
	};
}

function createToolSetTreeItem(toolset: IToolSet, checked: boolean, editorService: IEditorService): IToolSetTreeItem {
	const iconProps = mapIconToTreeItem(toolset.icon);
	const buttons = [];
	if (toolset.source.type === 'user') {
		const resource = toolset.source.file;
		buttons.push({
			iconClass: ThemeIcon.asClassName(Codicon.edit),
			tooltip: localize('editUserBucket', "Edit Tool Set"),
			action: () => editorService.openEditor({ resource })
		});
	}
	return {
		itemType: 'toolset',
		toolset,
		buttons,
		id: toolset.id,
		label: toolset.referenceName,
		description: toolset.description,
		checked,
		children: undefined,
		collapsed: true,
		...iconProps
	};
}

/**
 * New QuickTree implementation of the tools picker.
 * Uses IQuickTree to provide a true hierarchical tree structure with:
 * - Collapsible nodes for buckets and toolsets
 * - Checkbox state management with parent-child relationships
 * - Special handling for MCP servers (server as bucket, tools as direct children)
 * - Built-in filtering and search capabilities
 *
 * @param accessor - Service accessor for dependency injection
 * @param placeHolder - Placeholder text shown in the picker
 * @param description - Optional description text shown in the picker
 * @param toolsEntries - Optional initial selection state for tools and toolsets
 * @param modelId - Optional model ID to filter tools by supported models
 * @param onUpdate - Optional callback fired when the selection changes
 * @param token - Optional cancellation token to close the picker when cancelled
 * @returns Promise resolving to the final selection map, or undefined if cancelled
 */
export async function showToolsPicker(
	accessor: ServicesAccessor,
	placeHolder: string,
	source: string,
	description?: string,
	getToolsEntries?: () => ReadonlyMap<IToolSet | IToolData, boolean>,
	model?: ILanguageModelChatMetadata | undefined,
	token?: CancellationToken
): Promise<ReadonlyMap<IToolSet | IToolData, boolean> | undefined> {

	const quickPickService = accessor.get(IQuickInputService);
	const commandService = accessor.get(ICommandService);
	const extensionsWorkbenchService = accessor.get(IExtensionsWorkbenchService);
	const editorService = accessor.get(IEditorService);
	const toolsService = accessor.get(ILanguageModelToolsService);
	const telemetryService = accessor.get(ITelemetryService);

	function computeItems(previousToolsEntries?: ReadonlyMap<IToolData | IToolSet, boolean>) {
		// Create default entries if none provided
		let toolsEntries = getToolsEntries ? new Map([...getToolsEntries()].map(([k, enabled]) => [k.id, enabled])) : undefined;
		if (!toolsEntries) {
			const defaultEntries = new Map();
			for (const tool of toolsService.getTools(model)) {
				if (tool.canBeReferencedInPrompt) {
					defaultEntries.set(tool, false);
				}
			}
			for (const toolSet of toolsService.getToolSetsForModel(model)) {
				defaultEntries.set(toolSet, false);
			}
			toolsEntries = defaultEntries;
		}
		previousToolsEntries?.forEach((value, key) => {
			toolsEntries.set(key.id, value);
		});

		// Build tree structure
		const treeItems: AnyTreeItem[] = [];
		const bucketMap = new Map<string, IBucketTreeItem>();

		const getKey = (source: ToolDataSource): string => {
			switch (source.type) {
				case 'extension':
					return ToolDataSource.toKey(source);
				case 'internal':
					return BucketOrdinal.BuiltIn.toString();
				case 'user':
					return BucketOrdinal.User.toString();
				case 'external':
					throw new Error('should not be reachable');
				default:
					assertNever(source);
			}
		};

		const createBucket = (source: ToolDataSource, key: string): IBucketTreeItem | undefined => {
			if (source.type === 'extension') {
				return {
					itemType: 'bucket',
					ordinal: BucketOrdinal.Extension,
					id: key,
					label: source.label,
					checked: undefined,
					children: [],
					buttons: [],
					collapsed: true,
					iconClass: ThemeIcon.asClassName(Codicon.extensions),
					sortOrder: 3,
				};
			} else if (source.type === 'internal') {
				return {
					itemType: 'bucket',
					ordinal: BucketOrdinal.BuiltIn,
					id: key,
					label: localize('defaultBucketLabel', "Built-In"),
					checked: undefined,
					children: [],
					buttons: [],
					collapsed: false,
					sortOrder: 1,
				};
			} else {
				return {
					itemType: 'bucket',
					ordinal: BucketOrdinal.User,
					id: key,
					label: localize('userBucket', "User Defined Tool Sets"),
					checked: undefined,
					children: [],
					buttons: [],
					collapsed: true,
					sortOrder: 4,
				};
			}
		};

		const getBucket = (source: ToolDataSource): IBucketTreeItem | undefined => {
			const key = getKey(source);
			let bucket = bucketMap.get(key);
			if (!bucket) {
				bucket = createBucket(source, key);
				if (bucket) {
					bucketMap.set(key, bucket);
				}
			}
			return bucket;
		};

		for (const toolSet of toolsService.getToolSetsForModel(model)) {
			if (!toolsEntries.has(toolSet.id)) {
				continue;
			}
			const bucket = getBucket(toolSet.source);
			if (!bucket) {
				continue;
			}
			const toolSetChecked = toolsEntries.get(toolSet.id) === true;
			const treeItem = createToolSetTreeItem(toolSet, toolSetChecked, editorService);
			bucket.children.push(treeItem);
			const children = [];
			for (const tool of toolSet.getTools()) {
				const toolChecked = toolSetChecked || toolsEntries.get(tool.id) === true;
				const toolTreeItem = createToolTreeItemFromData(tool, toolChecked);
				children.push(toolTreeItem);
			}
			if (children.length > 0) {
				treeItem.children = children;
			}
		}
		// getting potentially disabled tools is fine here because we filter `toolsEntries.has`
		for (const tool of toolsService.getAllToolsIncludingDisabled()) {
			if (!tool.canBeReferencedInPrompt || !toolsEntries.has(tool.id)) {
				continue;
			}
			const bucket = getBucket(tool.source);
			if (!bucket) {
				continue;
			}
			const toolChecked = bucket.checked === true || toolsEntries.get(tool.id) === true;
			const toolTreeItem = createToolTreeItemFromData(tool, toolChecked);
			bucket.children.push(toolTreeItem);
		}

		// Convert bucket map to sorted tree items
		const sortedBuckets = Array.from(bucketMap.values()).sort((a, b) => {
			if (a.sortOrder !== b.sortOrder) {
				return a.sortOrder - b.sortOrder;
			}
			return a.label.localeCompare(b.label);
		});
		for (const bucket of sortedBuckets) {
			treeItems.push(bucket);
			// Sort children alphabetically
			bucket.children.sort((a, b) => a.label.localeCompare(b.label));
			for (const child of bucket.children) {
				if (isToolSetTreeItem(child) && child.children) {
					child.children.sort((a, b) => a.label.localeCompare(b.label));
				}
			}
		}
		if (treeItems.length === 0) {
			treePicker.placeholder = localize('noTools', "Add tools to chat");
		} else {
			treePicker.placeholder = placeHolder;
		}
		treePicker.setItemTree(treeItems);
	}

	// Create and configure the tree picker
	const store = new DisposableStore();
	const treePicker = store.add(quickPickService.createQuickTree<AnyTreeItem>());

	treePicker.placeholder = placeHolder;
	treePicker.description = description;
	treePicker.matchOnDescription = true;
	treePicker.matchOnLabel = true;
	treePicker.sortByLabel = false;

	computeItems();

	// Handle button triggers
	store.add(treePicker.onDidTriggerItemButton(e => {
		if (e.button && typeof (e.button as ActionableButton).action === 'function') {
			(e.button as ActionableButton).action();
			store.dispose();
		}
	}));

	const collectResults = () => {

		const result = new Map<IToolData | IToolSet, boolean>();
		const traverse = (items: readonly AnyTreeItem[]) => {
			for (const item of items) {
				if (isBucketTreeItem(item)) {
					if (item.toolset) { // MCP server
						// MCP toolset is enabled only if all tools are enabled
						const allChecked = item.checked === true;
						result.set(item.toolset, allChecked);
					}
					traverse(item.children);
				} else if (isToolSetTreeItem(item)) {
					result.set(item.toolset, item.checked === true);
					if (item.children) {
						traverse(item.children);
					}
				} else if (isToolTreeItem(item)) {
					result.set(item.tool, item.checked || result.get(item.tool) === true); // tools can be in user tool sets and other buckets
				}
			}
		};

		traverse(treePicker.itemTree);
		return result;
	};

	// Handle acceptance
	let didAccept = false;
	const didAcceptFinalItem = store.add(new Emitter<void>());
	store.add(treePicker.onDidAccept(() => {
		// Check if a callback item was activated
		const activeItems = treePicker.activeItems;
		const callbackItem = activeItems.find(isCallbackTreeItem);
		if (!callbackItem) {
			didAccept = true;
			treePicker.hide();
			return;
		}

		const ret = callbackItem.run();
		if (ret !== false) {
			didAcceptFinalItem.fire();
		}
	}));

	const installExtension = {
		iconClass: ThemeIcon.asClassName(Codicon.extensions),
		tooltip: localize('addExtensionButton', 'Install Extension...')
	};
	const configureToolSets = {
		iconClass: ThemeIcon.asClassName(Codicon.gear),
		tooltip: localize('configToolSets', 'Configure Tool Sets...')
	};
	treePicker.title = localize('configureTools', "Configure Tools");
	treePicker.buttons = [installExtension, configureToolSets];
	store.add(treePicker.onDidTriggerButton(button => {
		if (button === installExtension) {
			extensionsWorkbenchService.openSearch('@tag:language-model-tools');
		} else if (button === configureToolSets) {
			commandService.executeCommand(ConfigureToolSets.ID);
		}
		treePicker.hide();
	}));

	// Close picker when cancelled (e.g., when mode changes)
	if (token) {
		store.add(token.onCancellationRequested(() => {
			treePicker.hide();
		}));
	}

	// Capture initial state for telemetry comparison
	const initialState = collectResults();

	treePicker.show();

	await Promise.race([Event.toPromise(Event.any(treePicker.onDidHide, didAcceptFinalItem.event), store)]);

	// Send telemetry about tool selection changes
	sendDidChangeEvent(source, telemetryService, initialState, collectResults());

	store.dispose();

	return didAccept ? collectResults() : undefined;
}

/**
 * Categorizes a tool or toolset source for privacy-safe telemetry.
 * Returns identifying info only for built-in/extension tools where names are public.
 * For user-defined tool sets, only the category is returned.
 *
 * @param item - The tool or toolset to categorize
 */
function categorizeTool(item: IToolData | IToolSet): { category: 'builtin' | 'extension' | 'user-toolset'; name?: string; extensionId?: string } {
	const source = item.source;
	switch (source.type) {
		case 'internal':
			// Built-in tools are safe to identify by name
			return { category: 'builtin', name: item.id };
		case 'extension':
			// Extension tools are public, safe to include name and extension ID
			return { category: 'extension', name: item.id, extensionId: source.extensionId.value };
		case 'user':
			// User-defined tool sets: don't include names for privacy
			return { category: 'user-toolset' };
		case 'external':
			// External tools shouldn't appear in the picker, treat as user-defined for safety
			return { category: 'user-toolset' };
		default:
			assertNever(source);
	}
}

interface IToolToggleSummary {
	/** Number of built-in tools enabled */
	builtinEnabled: number;
	/** Number of built-in tools disabled */
	builtinDisabled: number;
	/** Number of extension tools enabled */
	extensionEnabled: number;
	/** Number of extension tools disabled */
	extensionDisabled: number;
	/** Number of user tool sets enabled */
	userToolsetEnabled: number;
	/** Number of user tool sets disabled */
	userToolsetDisabled: number;
	/** Detailed list of toggled items (only safe-to-log items include names) */
	details: string;
}

function computeToolToggleSummary(
	initialState: ReadonlyMap<IToolData | IToolSet, boolean>,
	finalState: ReadonlyMap<IToolData | IToolSet, boolean>,
): IToolToggleSummary {
	const summary: IToolToggleSummary = {
		builtinEnabled: 0,
		builtinDisabled: 0,
		extensionEnabled: 0,
		extensionDisabled: 0,
		userToolsetEnabled: 0,
		userToolsetDisabled: 0,
		details: ''
	};

	const detailItems: { category: string; name?: string; extensionId?: string; enabled: boolean }[] = [];

	// Compare states and record changes
	for (const [item, finalEnabled] of finalState) {
		const initialEnabled = initialState.get(item) ?? false;
		if (initialEnabled === finalEnabled) {
			continue; // No change
		}

		const categorized = categorizeTool(item);
		const enabled = finalEnabled;

		switch (categorized.category) {
			case 'builtin':
				if (enabled) { summary.builtinEnabled++; } else { summary.builtinDisabled++; }
				detailItems.push({ category: 'builtin', name: categorized.name, enabled });
				break;
			case 'extension':
				if (enabled) { summary.extensionEnabled++; } else { summary.extensionDisabled++; }
				detailItems.push({ category: 'extension', name: categorized.name, extensionId: categorized.extensionId, enabled });
				break;
			case 'user-toolset':
				if (enabled) { summary.userToolsetEnabled++; } else { summary.userToolsetDisabled++; }
				// Don't include name for privacy
				detailItems.push({ category: 'user-toolset', enabled });
				break;
		}
	}

	// Serialize details as JSON
	summary.details = JSON.stringify(detailItems);
	return summary;
}

function sendDidChangeEvent(
	source: string,
	telemetryService: ITelemetryService,
	initialState: ReadonlyMap<IToolData | IToolSet, boolean>,
	finalState: ReadonlyMap<IToolData | IToolSet, boolean>,
): void {
	const summary = computeToolToggleSummary(initialState, finalState);
	const changed = summary.builtinEnabled > 0 || summary.builtinDisabled > 0 ||
		summary.extensionEnabled > 0 || summary.extensionDisabled > 0 ||
		summary.userToolsetEnabled > 0 || summary.userToolsetDisabled > 0;

	type ToolPickerClosedEvent = {
		changed: boolean;
		source: string;
		builtinEnabled: number;
		builtinDisabled: number;
		extensionEnabled: number;
		extensionDisabled: number;
		userToolsetEnabled: number;
		userToolsetDisabled: number;
		details: string;
	};

	type ToolPickerClosedClassification = {
		changed: { classification: 'SystemMetaData'; purpose: 'FeatureInsight'; comment: 'Whether the user changed the tool selection from the initial state.' };
		source: { classification: 'SystemMetaData'; purpose: 'FeatureInsight'; comment: 'The source of the tool picker event.' };
		builtinEnabled: { classification: 'SystemMetaData'; purpose: 'FeatureInsight'; comment: 'Number of built-in tools that were enabled.' };
		builtinDisabled: { classification: 'SystemMetaData'; purpose: 'FeatureInsight'; comment: 'Number of built-in tools that were disabled.' };
		extensionEnabled: { classification: 'SystemMetaData'; purpose: 'FeatureInsight'; comment: 'Number of extension tools that were enabled.' };
		extensionDisabled: { classification: 'SystemMetaData'; purpose: 'FeatureInsight'; comment: 'Number of extension tools that were disabled.' };
		userToolsetEnabled: { classification: 'SystemMetaData'; purpose: 'FeatureInsight'; comment: 'Number of user tool sets that were enabled.' };
		userToolsetDisabled: { classification: 'SystemMetaData'; purpose: 'FeatureInsight'; comment: 'Number of user tool sets that were disabled.' };
		details: { classification: 'SystemMetaData'; purpose: 'FeatureInsight'; comment: 'JSON array of toggled items. Built-in and extension tools include names; user-defined items only include category.' };
		owner: 'benibenj';
		comment: 'Tracks which tools users toggle in the tool picker, with privacy-safe categorization.';
	};

	telemetryService.publicLog2<ToolPickerClosedEvent, ToolPickerClosedClassification>('chatToolPickerClosed', {
		source,
		changed,
		builtinEnabled: summary.builtinEnabled,
		builtinDisabled: summary.builtinDisabled,
		extensionEnabled: summary.extensionEnabled,
		extensionDisabled: summary.extensionDisabled,
		userToolsetEnabled: summary.userToolsetEnabled,
		userToolsetDisabled: summary.userToolsetDisabled,
		details: summary.details,
	});
}
