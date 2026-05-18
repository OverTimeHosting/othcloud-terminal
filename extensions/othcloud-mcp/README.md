# OTHCloud MCP

Built-in [Model Context Protocol](https://modelcontextprotocol.io/) server that lets Claude
Code (and any other MCP client) drive othcloud terminal:

- Stage / unstage / commit through the source control panel
- Set the commit message box
- Open URLs in the built-in Simple Browser
- Open files and reveal ranges in code windows
- Run commands in an integrated terminal so the user can watch them

## What this does about commit attribution

Every commit message routed through `git.commit` (and every message written via
`git.setMessage`) is run through `stripAiAttribution()` before reaching git. That removes:

- `Co-Authored-By: Claude …`
- `Co-Authored-By: … <noreply@anthropic.com>`
- `Co-Authored-By: GitHub Copilot …`
- `Co-Authored-By: … <noreply@openai.com>`
- `Generated with Claude Code` / `🤖 Generated with …`

The commit is then created with `repository.commit(...)`, which uses the local
`user.name` / `user.email` git config. The author shown in `git log` is **you**, not
the assistant — even if the assistant tried to add itself.

## Connect Claude Code

1. Open the command palette → **OTHCloud MCP: Copy Claude Code MCP Config to
   Clipboard**.
2. Paste the snippet into your Claude Code MCP config (per-project
   `.claude/mcp.json` or your user config). It looks like:

```json
{
  "mcpServers": {
    "othcloud-terminal": {
      "type": "sse",
      "url": "http://127.0.0.1:<port>/sse",
      "headers": { "Authorization": "Bearer <token>" }
    }
  }
}
```

3. Restart Claude Code so it picks up the new server. The available tools will be
   prefixed with `othcloud-terminal__`.

The port and token persist across restarts; the token lives in VS Code's secret
storage. Use **OTHCloud MCP: Revoke Token and Restart** to rotate it.

## Settings

| Key | Default | Description |
|---|---|---|
| `othcloud.mcp.enabled` | `true` | Start the server on activation. |
| `othcloud.mcp.host` | `127.0.0.1` | Loopback bind address. |
| `othcloud.mcp.port` | `0` | TCP port. `0` = pick a free one. |
| `othcloud.mcp.allowedOrigins` | `[]` | Extra HTTP `Origin` values allowed on `/sse`. Loopback origins are always allowed. |

## Security

- Binds to `127.0.0.1` only.
- Validates the `Host` header is a loopback address (defends against DNS rebinding).
- Requires `Authorization: Bearer <token>` on `/sse` and `/messages`.
- Token is stored in `vscode.ExtensionContext.secrets`.
- Disabled in untrusted workspaces.

## Tools

| Tool | Purpose |
|---|---|
| `git.status` | Branch, ahead/behind, staged / unstaged / untracked / merge changes. |
| `git.stage` | Stage paths or everything (`{"all": true}`). |
| `git.unstage` | Unstage paths or everything. |
| `git.setMessage` | Write the SCM commit message box (strips AI attribution). |
| `git.commit` | Commit using the local git user (strips AI attribution, never adds it). |
| `editor.openFile` | Open a file, optionally focusing a line range. |
| `editor.revealRange` | Scroll the active editor to a range. |
| `editor.split` | Split the active editor or focus a group. |
| `browser.open` | Open a URL in Simple Browser or the OS browser. |
| `terminal.run` | Send text to a (re)named integrated terminal. |
