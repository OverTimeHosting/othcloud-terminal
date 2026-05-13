# Othcloud Desktop Pairing Contract

This document describes the handshake between **othcloud.xyz** (the Next.js +
tRPC monorepo) and **othcloud-terminal** (this desktop client) for linking a
logged-in browser session to the desktop app.

It is the source of truth for what each side must implement. Once both sides
match this contract, the desktop sidebar (`Othcloud` in the activity bar)
lights up automatically.

## High-level flow

```
┌──────────────┐         ┌──────────────────┐         ┌────────────────────┐
│ othcloud.xyz │  (1)    │   User's browser │   (2)   │  othcloud-terminal │
│ (Next.js)    │ ──────▶ │  (or in-editor   │ ──────▶ │   (Electron app)   │
│              │ pair    │   BrowserView)   │ deep    │                    │
│              │ code    │                  │ link    │                    │
└──────┬───────┘         └──────────────────┘         └─────────┬──────────┘
       │                                                        │
       │ (3) POST /api/desktop/token { code }                   │
       │ ◀──────────────────────────────────────────────────────│
       │                                                        │
       │     200 { token, user }                                │
       │ ──────────────────────────────────────────────────────▶│
       │                                                        │
       │ (4) Sidebar uses token for all subsequent calls         │
```

1. **User clicks "Open in Othcloud Terminal"** on othcloud.xyz (while
   logged in via the regular session cookie).
2. **Website redirects the browser to `othcloud-terminal://auth?code=<code>`**.
   The OS routes this URL to the running desktop app via the
   `othcloud-terminal://` protocol handler.
3. **Desktop exchanges the code** for a real token by `POST`ing to
   `/api/desktop/token`. Codes are single-use and short-lived.
4. **Desktop stores the token** in OS-level secret storage and uses it as a
   `Bearer` token for all subsequent requests.

## Endpoints to implement on othcloud.xyz

All endpoints accept and return JSON. Errors should respond with
`{ "error": "<human-readable message>" }` and a non-2xx status.

### `POST /api/desktop/pair`

**Auth:** session cookie (the user must already be logged in via the website).

**Body:** empty (`{}`).

**Response:** `200 OK`
```json
{
  "code": "ya29-aBcD...EfGh",
  "expiresAt": "2026-05-12T12:35:00.000Z"
}
```

**Behavior:**
- Generate a cryptographically random opaque code (≥128 bits of entropy).
- Store it server-side keyed to the current user, with an expiry of
  **≤2 minutes** from issuance.
- The code is single-use: once `/api/desktop/token` succeeds, delete it.

The website's "Open in Othcloud Terminal" button calls this, then sets
`window.location.href = "othcloud-terminal://auth?code=" + encodeURIComponent(code)`.

### `POST /api/desktop/token`

**Auth:** none (the code itself is the credential).

**Body:**
```json
{ "code": "ya29-aBcD...EfGh" }
```

**Response:** `200 OK`
```json
{
  "token": "<long-lived bearer token>",
  "user": {
    "id": "usr_01HF...",
    "email": "florian.nemeti11@gmail.com",
    "name": "Florian Nemeti",
    "avatarUrl": "https://..."   // optional
  }
}
```

**Behavior:**
- Look up the code; reject with `400` if it is unknown, already used, or
  expired.
- Delete the code (single-use).
- Mint a long-lived API token tied to this user. The token must also be
  accepted by:
  - `GET /api/desktop/me`
  - any `/api/desktop/services/*` endpoints (Phase 2)
  - the SSH terminal WebSocket and game-console WebSocket
    (`apps/othcloud/server/server.ts`) — so the desktop client can open a
    real terminal pty against the user's VPS / game server without a session
    cookie.

**Token format:** the desktop side treats it as an opaque string. A JWT or
`Authorization: Bearer <token>` against a tokens table both work. Recommended:
store a SHA-256 hash on the server, hand the user the raw value once, and
include token metadata (name="Othcloud Terminal", createdAt, lastUsedAt).

### `GET /api/desktop/me`

**Auth:** `Authorization: Bearer <token>`.

**Response:** `200 OK`
```json
{
  "id": "usr_01HF...",
  "email": "florian.nemeti11@gmail.com",
  "name": "Florian Nemeti",
  "avatarUrl": "https://..."
}
```

**Behavior:**
- Validates the token. On `401`, the desktop signs the user out and re-prompts.
- Used on app start to confirm the cached token is still good.

## Deep-link format

The desktop registers a system-level handler for the `othcloud-terminal://`
scheme (declared in `product.json`, `urlProtocol`). The website should emit:

```
othcloud-terminal://auth?code=<urlencoded pair code>
```

Any other path / authority is ignored by the desktop URL handler
(`OthcloudAccountUrlHandler`). The query is parsed manually (not via
`URLSearchParams`) to avoid double-decoding opaque codes that contain `+`.

## Security notes

- **Codes must be one-shot and short-lived.** A long-lived code is
  effectively a sharable login link.
- **The code endpoint requires an authenticated session.** Otherwise anyone
  can mint a code → exchange → token without ever logging in.
- **Use HTTPS-only on the website.** The `othcloud-terminal://` URL itself
  is local IPC so doesn't need TLS, but the `/api/desktop/*` endpoints do.
- **Token revocation:** Phase 4 polish will add a `DELETE /api/desktop/token`
  endpoint that the desktop calls on sign-out and a "Devices" page on the
  website that lists active desktop tokens.

## Phase 1 acceptance test

1. Run the desktop client. The activity bar shows a cloud icon labeled
   *Othcloud*. The sidebar reads "Sign in to othcloud" with a CTA button.
2. Click the CTA. The embedded browser opens `https://othcloud.xyz`.
3. Log in on the website (or already logged in).
4. Click "Open in Othcloud Terminal" on the website dashboard.
5. The website hits `/api/desktop/pair`, gets a code, and redirects to
   `othcloud-terminal://auth?code=...`.
6. The desktop catches the URL, exchanges the code at `/api/desktop/token`,
   stores the token, and the sidebar swaps to the signed-in header with the
   user's name + email and four "Coming soon" sections.
7. Quit and relaunch the desktop. The sidebar remains signed-in (the token is
   persisted in OS secret storage; the user profile in workspace storage).
8. Run command **"Othcloud: Sign out of Othcloud"** from the command palette.
   The sidebar reverts to the signed-out state.
