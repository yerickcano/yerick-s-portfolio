# CLAUDE.md — Fuller (Root)

## Behavior
1. Think before acting. Read existing files before writing code.
2. Be concise in output but thorough in reasoning.
3. Prefer editing over rewriting whole files.
4. Do not re-read files you have already read unless the file may have changed.
5. Test your code before declaring done.
6. No sycophantic openers or closing fluff.
7. Keep solutions simple and direct.
8. User instructions always override this file.

## Session Start
9. Read `CURRENT_TASK.md` first if it exists — it replaces full project orientation.
10. If `CURRENT_TASK.md` is recent, skip re-reading `AGENTS.md` and `PROJECT.md` unless the task requires a different area.
11. Only read files relevant to the current task. Do not explore the full codebase to orient yourself.
12. Use `AGENTS.md` §8 quick-reference table to identify which files to read per area.

## Session End
13. Before closing, update `CURRENT_TASK.md` with current state.
14. Never leave `CURRENT_TASK.md` stale — if task changed, reflect that.