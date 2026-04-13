---
alwaysApply: false
---
# Agent Startup Flow

## Session Start

1. Read `CURRENT_TASK.md` if it exists — skips full project orientation.
2. If no `CURRENT_TASK.md`, read `AGENTS.md` fully, then the relevant `PROJECT.md` section per area (see `AGENTS.md` §8).
3. If delivery/orders → also read `TECHNICAL_DEBT.md`.
4. Bump semver **minor** once per session: `package.json` → minor+1, patch=0 (e.g. `0.10.1` → `0.11.0`).
5. Add entry in `CHANGELOG.md` under `[Unreleased]` with working version.
6. Open or update **draft PR** targeting `develop` with title format: `type(scope): description — vX.Y.Z`.
7. Run `yarn build` and fix until success. Commit only after a passing build.

## PR Title Format

```
<type>(<scope>): <short description> — v<semver>
```
- **type:** `feat` | `fix` | `docs` | `chore` | `refactor` | `perf` | `test` | `ci`
- **scope:** kebab-case area (e.g. `delivery`, `orders`, `auth`, `ui`). No clear scope → `core`.
- **semver:** current `package.json` version at PR time.

Examples:
- `feat(delivery): push alerts on opportunities — v1.4.2`
- `fix(api): cache headers on businesses — v0.10.3`

## Closing / Preparing PR

Apply `pr-readiness.mdc`. Then:
1. Update `CHANGELOG.md`, `Realease Notes.md` (non-technical language), `PROJECT.md` if architecture changed.
2. Ask the user: **minor, patch, or major?** Adjust `package.json` and release section accordingly.
3. Update PR title with final version, commit, push.

## Session End
Update `CURRENT_TASK.md` before closing.