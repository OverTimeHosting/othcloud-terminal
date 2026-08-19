/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize } from '../../../../nls.js';
import { Color } from '../../../../base/common/color.js';

/**
 * othcloud: auxiliary windows (a terminal or editor pulled out of the main window) are hard to
 * tell apart once more than one is open: their titles are computed from the active editor alone,
 * so two shells look identical, and a window that has been split into multiple groups only ever
 * shows the group that happens to be focused.
 *
 * Every auxiliary window therefore gets a stable number plus a matching accent color which its
 * title bar renders as a badge. The main window is implicitly window 1, so auxiliary windows
 * start at 2. Numbers are released when a window closes and the lowest free number is handed out
 * next, so the open windows are always numbered without gaps.
 */

const FIRST_AUXILIARY_WINDOW_INDEX = 2;

/**
 * Accent colors, ordered so that windows opened after one another are as distinct as possible.
 * Chosen to stay readable against both light and dark title bar backgrounds.
 */
const AUXILIARY_WINDOW_ACCENTS = [
	'#3794FF', // blue
	'#E8A33D', // amber
	'#3FB950', // green
	'#B180D7', // purple
	'#2FB6C0', // teal
	'#EC72B7', // pink
	'#E5534B', // red
	'#7A7AF0'  // indigo
];

export interface IAuxiliaryWindowIdentity {

	/** Stable, gap free window number (2, 3, 4, ...). */
	readonly index: number;

	/** Accent color for this window, cycles through the palette. */
	readonly accentColor: string;

	/** Color to render on top of `accentColor`. */
	readonly accentForegroundColor: string;

	/** Human readable label, e.g. `Window 2`. */
	readonly label: string;
}

const identities = new Map<number /* window id */, IAuxiliaryWindowIdentity>();

/**
 * Picks whichever of black or white reads better on the accent, by WCAG contrast ratio.
 */
function accentForegroundColor(accent: Color): string {
	const luminance = accent.getRelativeLuminance();

	const contrastWithBlack = (luminance + 0.05) / 0.05;
	const contrastWithWhite = 1.05 / (luminance + 0.05);

	return contrastWithBlack >= contrastWithWhite ? '#000000' : '#FFFFFF';
}

export function acquireAuxiliaryWindowIdentity(windowId: number): IAuxiliaryWindowIdentity {
	const existing = identities.get(windowId);
	if (existing) {
		return existing;
	}

	const taken = new Set<number>();
	for (const identity of identities.values()) {
		taken.add(identity.index);
	}

	let index = FIRST_AUXILIARY_WINDOW_INDEX;
	while (taken.has(index)) {
		index++;
	}

	const accentColor = AUXILIARY_WINDOW_ACCENTS[(index - FIRST_AUXILIARY_WINDOW_INDEX) % AUXILIARY_WINDOW_ACCENTS.length];

	const identity: IAuxiliaryWindowIdentity = {
		index,
		accentColor,
		accentForegroundColor: accentForegroundColor(Color.fromHex(accentColor)),
		label: localize('auxiliaryWindowIdentityLabel', "Window {0}", index)
	};

	identities.set(windowId, identity);

	return identity;
}

export function releaseAuxiliaryWindowIdentity(windowId: number): void {
	identities.delete(windowId);
}
