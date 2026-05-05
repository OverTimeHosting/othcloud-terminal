/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// TODO: promote the server URL to a user-configurable setting.
// The access token is supplied at runtime by the user (entered in the UI,
// persisted via VSCode storage) — see DevelopersPage.
export const DEVELOPERS_SERVER_URL = 'http://localhost:8787';

let accessToken: string | null = null;

export function setAccessToken(token: string | null): void {
	accessToken = token && token.length > 0 ? token : null;
}

export function getAccessToken(): string | null {
	return accessToken;
}

export class DevelopersAccessTokenMissingError extends Error {
	constructor() {
		super('Access token required');
		this.name = 'DevelopersAccessTokenMissingError';
	}
}

export interface DevUser {
	id: number;
	username: string;
}

export interface AuthResponse {
	token: string;
	user: DevUser;
}

export interface DevTask {
	id: number;
	title: string;
	description: string;
	status: string;
	creatorId: number;
	creatorUsername: string;
	assigneeId?: number;
	assigneeUsername?: string;
	createdAt: string;
	updatedAt: string;
}

export interface DevMessage {
	id: number;
	taskId: number;
	authorId: number;
	authorUsername: string;
	body: string;
	createdAt: string;
	attachmentId?: number;
	attachmentMime?: string;
	attachmentName?: string;
}

export interface DevChecklistItem {
	id: number;
	taskId: number;
	label: string;
	done: boolean;
	createdBy: number;
	createdByName: string;
	createdAt: string;
}

export interface DevActivity {
	id: number;
	taskId: number;
	actorId: number;
	actorName: string;
	kind: string;
	detail: string;
	createdAt: string;
}

export class DevelopersApiError extends Error {
	constructor(public readonly status: number, message: string) {
		super(message);
		this.name = 'DevelopersApiError';
	}
}

async function request<T>(
	path: string,
	init: RequestInit & { jwt?: string } = {}
): Promise<T> {
	if (!accessToken) {
		throw new DevelopersAccessTokenMissingError();
	}
	const headers = new Headers(init.headers ?? {});
	headers.set('Content-Type', 'application/json');
	headers.set('X-Access-Token', accessToken);
	if (init.jwt) {
		headers.set('Authorization', `Bearer ${init.jwt}`);
	}
	const res = await fetch(`${DEVELOPERS_SERVER_URL}${path}`, {
		...init,
		headers,
	});
	const text = await res.text();
	const body = text ? JSON.parse(text) : undefined;
	if (!res.ok) {
		const msg = (body && typeof body.error === 'string') ? body.error : `HTTP ${res.status}`;
		throw new DevelopersApiError(res.status, msg);
	}
	return body as T;
}

export const DevelopersClient = {
	async register(username: string, password: string): Promise<AuthResponse> {
		return request<AuthResponse>('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
		});
	},

	async login(username: string, password: string): Promise<AuthResponse> {
		return request<AuthResponse>('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
		});
	},

	async me(jwt: string): Promise<DevUser> {
		return request<DevUser>('/api/auth/me', { method: 'GET', jwt });
	},

	async listUsers(jwt: string): Promise<DevUser[]> {
		return request<DevUser[]>('/api/users', { method: 'GET', jwt });
	},

	async listTasks(jwt: string): Promise<DevTask[]> {
		return request<DevTask[]>('/api/tasks', { method: 'GET', jwt });
	},

	async createTask(jwt: string, title: string, description: string, assigneeUsername?: string): Promise<DevTask> {
		return request<DevTask>('/api/tasks', {
			method: 'POST', jwt,
			body: JSON.stringify({ title, description, assigneeUsername: assigneeUsername ?? '' }),
		});
	},

	async getTask(jwt: string, id: number): Promise<DevTask> {
		return request<DevTask>(`/api/tasks/${id}`, { method: 'GET', jwt });
	},

	async patchTask(jwt: string, id: number, patch: { title?: string; description?: string; status?: string }): Promise<DevTask> {
		return request<DevTask>(`/api/tasks/${id}`, {
			method: 'PATCH', jwt,
			body: JSON.stringify(patch),
		});
	},

	async listMessages(jwt: string, taskId: number): Promise<DevMessage[]> {
		return request<DevMessage[]>(`/api/tasks/${taskId}/messages`, { method: 'GET', jwt });
	},

	async postMessage(jwt: string, taskId: number, body: string): Promise<DevMessage> {
		return request<DevMessage>(`/api/tasks/${taskId}/messages`, {
			method: 'POST', jwt,
			body: JSON.stringify({ body }),
		});
	},

	async postMessageWithAttachment(jwt: string, taskId: number, file: File, body: string): Promise<DevMessage> {
		if (!accessToken) {
			throw new DevelopersAccessTokenMissingError();
		}
		const fd = new FormData();
		fd.append('file', file);
		if (body) { fd.append('body', body); }
		const res = await fetch(`${DEVELOPERS_SERVER_URL}/api/tasks/${taskId}/messages/upload`, {
			method: 'POST',
			headers: {
				'X-Access-Token': accessToken,
				'Authorization': `Bearer ${jwt}`,
			},
			body: fd,
		});
		const text = await res.text();
		const parsed = text ? JSON.parse(text) : undefined;
		if (!res.ok) {
			const msg = (parsed && typeof parsed.error === 'string') ? parsed.error : `HTTP ${res.status}`;
			throw new DevelopersApiError(res.status, msg);
		}
		return parsed as DevMessage;
	},

	async fetchAttachmentBlobUrl(jwt: string, attachmentId: number): Promise<string> {
		if (!accessToken) {
			throw new DevelopersAccessTokenMissingError();
		}
		const res = await fetch(`${DEVELOPERS_SERVER_URL}/api/attachments/${attachmentId}`, {
			headers: {
				'X-Access-Token': accessToken,
				'Authorization': `Bearer ${jwt}`,
			},
		});
		if (!res.ok) {
			throw new DevelopersApiError(res.status, `failed to load attachment: HTTP ${res.status}`);
		}
		const blob = await res.blob();
		return URL.createObjectURL(blob);
	},

	async listChecklist(jwt: string, taskId: number): Promise<DevChecklistItem[]> {
		return request<DevChecklistItem[]>(`/api/tasks/${taskId}/checklist`, { method: 'GET', jwt });
	},

	async addChecklistItem(jwt: string, taskId: number, label: string): Promise<DevChecklistItem> {
		return request<DevChecklistItem>(`/api/tasks/${taskId}/checklist`, {
			method: 'POST', jwt,
			body: JSON.stringify({ label }),
		});
	},

	async setChecklistDone(jwt: string, taskId: number, itemId: number, done: boolean): Promise<void> {
		await request<void>(`/api/tasks/${taskId}/checklist/${itemId}`, {
			method: 'PATCH', jwt,
			body: JSON.stringify({ done }),
		});
	},

	async listActivity(jwt: string, taskId: number): Promise<DevActivity[]> {
		return request<DevActivity[]>(`/api/tasks/${taskId}/activity`, { method: 'GET', jwt });
	},
};
