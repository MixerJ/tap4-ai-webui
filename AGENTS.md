# AGENTS.md

This file provides guidance to AI agents (Codex, Sisyphus, etc.) when working with code in this repository.

## Agent Discovery Mechanism

AI agents discover and merge AGENTS.md files in this precedence order:

1. **Global scope**: Reads `~/.codex/AGENTS.override.md` if exists, otherwise `~/.codex/AGENTS.md` (Codex) or equivalent
   global config
2. **Project scope**: Starting from project root (Git root), walks down to current working directory. In each directory,
   checks for `AGENTS.override.md` first, then `AGENTS.md`
3. **Merge order**: Files closer to current directory override earlier guidance (appear later in combined prompt)

Reference: [Project instructions discovery](https://codex.dev/codex/config-advanced#project-instructions-discovery)

## Project Architecture

See [PROJECT.md](./PROJECT.md) for detailed project architecture, code conventions, and verification steps.

---

## Agent-Specific Features

### Worktrees

Use worktrees for isolated feature work:

```bash
codex worktree create <branch-name>    # Create new worktree
codex worktree list                     # List all worktrees
codex worktree remove <branch-name>    # Remove worktree
```

### Skills

AI agent skills are loaded based on task domain. Available skills in this project:

- `seo-audit` — SEO diagnostics
- `vue` / `vue-best-practices` — Vue.js development
- `web-design-guidelines` — UI/UX compliance
- `vercel-*` — Vercel deployment patterns

### Subagents

Use subagents for parallel independent tasks:

- `explore` — Contextual code search within this repository
- `librarian` — External documentation and reference search
- `oracle` — High-level architecture consultation
- `metis` — Pre-planning and ambiguity analysis
- `momus` — Plan review and quality assurance

---

## Sisyphus-Specific Guidelines

When working with Sisyphus (OhMyOpenCode), follow these rules:

### Category + Skills Delegation

| Task Domain                                     | Must Use Category    |
| ----------------------------------------------- | -------------------- |
| UI, styling, animations, layout, design         | `visual-engineering` |
| Hard logic, architecture decisions, algorithms  | `ultrabrain`         |
| Autonomous research + end-to-end implementation | `deep`               |
| Single-file typo, trivial config change         | `quick`              |

**Visual work = ALWAYS `visual-engineering`. NO EXCEPTIONS.**

### Todo Management (MANDATORY)

- Multi-step task (2+ steps) → ALWAYS create todos first
- Before starting each step: mark `in_progress`
- After completing each step: mark `completed` IMMEDIATELY
- If scope changes: update todos before proceeding

### Anti-Patterns (NEVER do)

- **Type Safety**: `as any`, `@ts-ignore`, `@ts-expect-error`
- **Error Handling**: Empty catch blocks `catch(e) {}`
- **Testing**: Deleting failing tests to "pass"
- **Debugging**: Shotgun debugging, random changes hoping something works

### Verification Before Completion

Before claiming work is complete, you MUST:

1. Run `pnpm lint` — must pass
2. Run `pnpm build` — must pass
3. Verify all changed files have clean diagnostics

### Background Task Policy

- Use `run_in_background=true` for parallel exploration
- DO NOT poll `background_output` — wait for notification
- Cancel disposable tasks via `background_cancel(taskId="...")`
