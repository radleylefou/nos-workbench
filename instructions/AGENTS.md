# NOS Agent Instructions

This file is retained as a compatibility pointer only.

The canonical instruction content now lives in:

- `content/instructions/base.ts`
- `content/instructions/project-new.ts`
- `content/instructions/project-existing.ts`
- `content/instructions/llm-*.ts`

Use the instruction generator on `/workbench` to assemble the correct
project-specific instruction file (`CLAUDE.md`, `replit.md`, or `AGENTS.md`).

The workbench reference page at `/workbench/instructions/agents` renders from
the same canonical fragments.
