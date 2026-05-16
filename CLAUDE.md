# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

See [PROJECT.md](./PROJECT.md) for detailed project architecture, code conventions, and verification steps.

## Repository Skills

The canonical blog writing skill lives in `claude-skills/blog-writing/SKILL.md` and should be used for writing, polishing, localizing, or integrating blog posts.

If the `blog-writing` skill is unavailable in a new checkout, create or restore the project symlink:

```bash
mkdir -p .claude/skills
ln -s ../../claude-skills/blog-writing .claude/skills/blog-writing
```

If the harness still has not loaded the skill in the current session, read `claude-skills/blog-writing/SKILL.md` directly and follow it.
