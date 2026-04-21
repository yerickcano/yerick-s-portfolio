# CLAUDE.md — bot-whatsapp/

Rules for the WhatsApp bot sub-project.

## Scope
This is an isolated Node.js project (Baileys, Docker). It has its own `yarn.lock` and `package.json`.

## Critical Rules
- **Do not redeploy the bot container** unless the HTTP contract or bot code changes.
- New notification types = Next.js deploy only (compose `message` in `whatsapp-notification-service.ts` in the main app). No bot changes needed.
- The bot is generic — it receives `{ number, message }` via HTTP and sends it. Logic lives in the main app.

## HTTP Contract
- `POST { number, message }` to configured provider endpoint (default: `/v1/messages`).
- Env in main app: `WHATSAPP_PROVIDER_BASE_URL`, `WHATSAPP_PROVIDER_MESSAGE_PATH`, `WHATSAPP_PROVIDER_API_KEY`, `WHATSAPP_PROVIDER_TIMEOUT_MS`.

## Docker Notes
- Base image: `node:20-slim`. Requires `git` + `ca-certificates` before `yarn install` (Baileys deps use Git).
- `sharp` pinned in `package.json` with `@img/sharp-linux-x64` for prebuilt binaries on Railway.
- `.yarnrc` has `ignore-engines true` — do not remove.
- On startup: resolves WA Web version via `fetchLatestWaWebVersion()`. Override with `BOT_WA_WEB_VERSION`. Skip with `BOT_FETCH_WA_WEB_VERSION=false`.

## Package Manager
Yarn Classic (v1). Use `yarn install`, `yarn add` inside `bot-whatsapp/`. Never npm.
