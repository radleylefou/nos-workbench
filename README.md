# NOS Design System v3

The shared component and token library for Nymbl's internal apps. Built on
Next.js (App Router) + Shadcn/ui (Vega preset) with NOS brand tokens applied.

The repo ships with a **workbench** — a browsable reference for every component,
token, and instruction file. The workbench is the single source of truth.

## Stack

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- Shadcn/ui (Vega preset `bd1iR93R`, zinc base, Geist, small radius)
- Lucide icons

## Quickstart

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the root redirects to
`/workbench/components/button`.

## Workbench

| Section | Path |
|---|---|
| Components | `/workbench/components/[button \| input \| card \| …]` |
| Tokens | `/workbench/tokens/[color \| typography \| spacing \| radius \| motion]` |
| Instructions | `/workbench/instructions/[agents \| rules]` |

## Brand

- Primary purple: `#7C3AED` (`--brand-600`)
- Full scale: `--brand-50` … `--brand-950`
- Semantic: `--success`, `--warning`, `--error`, `--info`
- Motion: `--duration-{instant,fast,normal,slow,slower}`, `--ease-{standard,enter,exit,sharp}`

All tokens live in `src/app/globals.css`.

## Using NOS in another Nymbl app

1. Copy `src/components/ui/` into the consumer project.
2. Copy the NOS token + motion blocks from `src/app/globals.css`.
3. Import: `import { Button } from "@/components/ui/button"`.
4. See `instructions/AGENTS.md` for the full rules.

## Live workbench

<!-- Vercel URL — added after deployment -->

## Repo conventions

- `CLAUDE.md` — instructions for AI coders editing **this** repo.
- `instructions/AGENTS.md` — instructions for AI coders **consuming** NOS in other apps.
- `instructions/rules.md` — design principles.
