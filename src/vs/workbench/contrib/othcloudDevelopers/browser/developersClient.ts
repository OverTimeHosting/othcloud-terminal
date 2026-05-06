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
	id: string;
	email: string;
	name: string;
	role: string;
	orgRole?: string;
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
	creatorId: string;
	creatorEmail: string;
	creatorName: string;
	assigneeId?: string;
	assigneeEmail?: string;
	assigneeName?: string;
	serviceId?: number;
	commits: DevCommit[];
	source?: DevTaskSource;
	createdAt: string;
	updatedAt: string;
}

export interface DevTaskSource {
	filePath: string;
	lineStart: number;
	lineEnd: number;
	snippet?: string;
}

export interface DevCommit {
	id: number;
	sha: string;
	url: string;
	repoFullName?: string;
	message?: string;
	linkedBy: string;
	linkedByName: string;
	linkedAt: string;
}

export interface DevTimeEntry {
	id: number;
	taskId: number;
	userId: string;
	userEmail: string;
	userName: string;
	startAt: string;
	endAt?: string;
	durationSec: number;
	running?: boolean;
}

export interface DevTaskTime {
	totalSec: number;
	running?: DevTimeEntry;
	entries: DevTimeEntry[];
}

export interface DevStatus {
	key: string;
	label: string;
	order: number;
}

export interface DevRepo {
	id: number;
	name: string;
	url: string;
	provider: string;
}

export interface DevServerLink {
	id: number;
	kind: 'server' | 'bareMetal';
	externalId: string;
	name: string;
}

export interface DevService {
	id: number;
	title: string;
	description: string;
	repos: DevRepo[];
	servers: DevServerLink[];
	bareMetals: DevServerLink[];
	creatorId: string;
	creatorEmail: string;
	creatorName: string;
	createdAt: string;
	updatedAt: string;
}

export interface DevMessage {
	id: number;
	taskId: number;
	authorId: string;
	authorEmail: string;
	authorName: string;
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
	createdBy: string;
	createdByName: string;
	createdAt: string;
}

export interface DevActivity {
	id: number;
	taskId: number;
	actorId: string;
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
	async login(email: string, password: string): Promise<AuthResponse> {
		return request<AuthResponse>('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
		});
	},

	async me(jwt: string): Promise<DevUser> {
		return request<DevUser>('/api/auth/me', { method: 'GET', jwt });
	},

	async listUsers(jwt: string): Promise<DevUser[]> {
		return request<DevUser[]>('/api/users', { method: 'GET', jwt });
	},

	async listTasks(jwt: string, opts?: { serviceId?: number }): Promise<DevTask[]> {
		const qs = opts?.serviceId !== undefined ? `?serviceId=${opts.serviceId}` : '';
		return request<DevTask[]>(`/api/tasks${qs}`, { method: 'GET', jwt });
	},

	async createTask(
		jwt: string,
		title: string,
		description: string,
		assigneeEmail?: string,
		serviceId?: number,
		source?: DevTaskSource,
	): Promise<DevTask> {
		return request<DevTask>('/api/tasks', {
			method: 'POST', jwt,
			body: JSON.stringify({ title, description, assigneeEmail: assigneeEmail ?? '', serviceId, source }),
		});
	},

	async listServices(jwt: string): Promise<DevService[]> {
		return request<DevService[]>('/api/services', { method: 'GET', jwt });
	},

	async getService(jwt: string, id: number): Promise<DevService> {
		return request<DevService>(`/api/services/${id}`, { method: 'GET', jwt });
	},

	async createService(jwt: string, title: string, description: string): Promise<DevService> {
		return request<DevService>('/api/services', {
			method: 'POST', jwt,
			body: JSON.stringify({ title, description }),
		});
	},

	async patchService(jwt: string, id: number, patch: { title?: string; description?: string }): Promise<DevService> {
		return request<DevService>(`/api/services/${id}`, {
			method: 'PATCH', jwt,
			body: JSON.stringify(patch),
		});
	},

	async addServiceRepo(jwt: string, serviceId: number, repo: { name: string; url: string; provider?: string }): Promise<DevRepo> {
		return request<DevRepo>(`/api/services/${serviceId}/repos`, {
			method: 'POST', jwt,
			body: JSON.stringify(repo),
		});
	},

	async removeServiceRepo(jwt: string, serviceId: number, repoId: number): Promise<void> {
		await request<void>(`/api/services/${serviceId}/repos/${repoId}`, {
			method: 'DELETE', jwt,
		});
	},

	async addServiceServer(jwt: string, serviceId: number, body: { externalId: string; name: string }): Promise<DevServerLink> {
		return request<DevServerLink>(`/api/services/${serviceId}/servers`, {
			method: 'POST', jwt,
			body: JSON.stringify(body),
		});
	},

	async removeServiceServer(jwt: string, serviceId: number, linkId: number): Promise<void> {
		await request<void>(`/api/services/${serviceId}/servers/${linkId}`, {
			method: 'DELETE', jwt,
		});
	},

	async addServiceBareMetal(jwt: string, serviceId: number, body: { externalId: string; name: string }): Promise<DevServerLink> {
		return request<DevServerLink>(`/api/services/${serviceId}/bare-metal`, {
			method: 'POST', jwt,
			body: JSON.stringify(body),
		});
	},

	async removeServiceBareMetal(jwt: string, serviceId: number, linkId: number): Promise<void> {
		await request<void>(`/api/services/${serviceId}/bare-metal/${linkId}`, {
			method: 'DELETE', jwt,
		});
	},

	async listStatuses(jwt: string): Promise<DevStatus[]> {
		return request<DevStatus[]>('/api/statuses', { method: 'GET', jwt });
	},

	async addStatus(jwt: string, key: string, label: string, order: number): Promise<DevStatus> {
		return request<DevStatus>('/api/statuses', {
			method: 'POST', jwt,
			body: JSON.stringify({ key, label, order }),
		});
	},

	async deleteStatus(jwt: string, key: string): Promise<void> {
		await request<void>(`/api/statuses/${encodeURIComponent(key)}`, { method: 'DELETE', jwt });
	},

	async getTask(jwt: string, id: number): Promise<DevTask> {
		return request<DevTask>(`/api/tasks/${id}`, { method: 'GET', jwt });
	},

	async patchTask(
		jwt: string,
		id: number,
		// assigneeEmail: '' to unassign, an email to reassign, undefined to leave unchanged.
		patch: { title?: string; description?: string; status?: string; assigneeEmail?: string },
	): Promise<DevTask> {
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

	async getTaskTime(jwt: string, taskId: number): Promise<DevTaskTime> {
		return request<DevTaskTime>(`/api/tasks/${taskId}/time`, { method: 'GET', jwt });
	},

	async startTimer(jwt: string, taskId: number): Promise<DevTimeEntry> {
		return request<DevTimeEntry>(`/api/tasks/${taskId}/time/start`, { method: 'POST', jwt, body: '{}' });
	},

	async stopTimer(jwt: string, taskId: number): Promise<DevTimeEntry> {
		return request<DevTimeEntry>(`/api/tasks/${taskId}/time/stop`, { method: 'POST', jwt, body: '{}' });
	},

	async addCommit(jwt: string, taskId: number, c: { url: string; sha: string; repoFullName?: string; message?: string }): Promise<DevCommit> {
		return request<DevCommit>(`/api/tasks/${taskId}/commits`, {
			method: 'POST', jwt,
			body: JSON.stringify(c),
		});
	},

	async removeCommit(jwt: string, taskId: number, commitId: number): Promise<void> {
		await request<void>(`/api/tasks/${taskId}/commits/${commitId}`, { method: 'DELETE', jwt });
	},
};
