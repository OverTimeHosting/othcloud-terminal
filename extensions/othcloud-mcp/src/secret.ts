/*---------------------------------------------------------------------------------------------
 *  Copyright (c) OverTime Hosting. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as crypto from 'crypto';
import * as vscode from 'vscode';

const SECRET_KEY = 'othcloud.mcp.token';

export async function getOrCreateToken(context: vscode.ExtensionContext): Promise<string> {
	const existing = await context.secrets.get(SECRET_KEY);
	if (existing && existing.length >= 32) {
		return existing;
	}
	const token = crypto.randomBytes(24).toString('base64url');
	await context.secrets.store(SECRET_KEY, token);
	return token;
}

export async function rotateToken(context: vscode.ExtensionContext): Promise<string> {
	await context.secrets.delete(SECRET_KEY);
	return getOrCreateToken(context);
}

/**
 * Constant-time string compare. Prevents timing-based token guessing.
 */
export function safeEquals(a: string, b: string): boolean {
	const ab = Buffer.from(a);
	const bb = Buffer.from(b);
	if (ab.length !== bb.length) {
		return false;
	}
	return crypto.timingSafeEqual(ab, bb);
}
