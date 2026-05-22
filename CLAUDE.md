# CLAUDE.md — working inside the NOS Design System repo

This file is the entry point for AI coders (Claude, Codex, etc.) editing **this** repo.
If you are building a Nymbl app that **consumes** NOS, read `instructions/AGENTS.md` instead.

## What this repo is

NOS Design System v3 — a Next.js + Shadcn (Vega preset) component library and
workbench. The workbench is the canonical visual reference at the deployed URL.

The full build specification lives in:
`NOS_Design_System_v3_Build_Plan.md` (kept outside the repo; reach out to the owner)

## Stack — do not deviate

- Next.js (App Router) — see `AGENTS.md` (root) for Next.js-version specifics
- TypeScript only (`.tsx`)
- Tailwind CSS (v4)
- Shadcn/ui (Vega preset `bd1iR93R`) — already installed in `src/components/ui/`
- Lucide icons
- Geist font (via `next/font/google`)

**Never install another UI library.** Shadcn wraps Radix already.

## Hard rules

1. **Tokens, not hardcoded values.** Use the CSS variables in `src/app/globals.css`
   (`--primary`, `--brand-*`, `--success`, `--duration-*`, `--ease-*`, etc.) via
   Tailwind utilities. No hex/oklch/px transitions inline.
2. **Reuse before invent.** Check `src/components/ui/` first. If a new component is
   needed, write it Shadcn-style in that folder.
3. **Workbench is dogfooded.** Anything under `src/app/workbench/` must compose
   only from `src/components/ui/`, `src/components/workbench/`, and Tailwind.
4. **Motion uses tokens.** All transitions and animations reference
   `var(--duration-*)` and `var(--ease-*)`. Animate `transform` / `opacity` only —
   never layout properties.
5. **Verify after each phase** when following a multi-phase build plan. Do not
   batch verifications.

## Project layout

```
src/
├── app/
│   ├── globals.css                  ← Shadcn vars + NOS overrides + brand scale + motion
│   ├── layout.tsx                   ← Geist font + TooltipProvider
│   ├── page.tsx                     ← redirect → /workbench/components/button
│   └── workbench/
│       ├── layout.tsx               ← persistent sidebar shell
│       ├── components/[slug]/page.tsx
│       ├── tokens/[slug]/page.tsx
│       └── instructions/[slug]/page.tsx
├── components/
│   ├── ui/                          ← Shadcn components (don't edit logic; JSDoc OK)
│   └── workbench/                   ← sidebar, swatch, code block, copy button
└── lib/
    ├── utils.ts                     ← `cn()` helper from Shadcn
    └── workbench-data.tsx           ← nav, component demos, token lists

instructions/
├── AGENTS.md                        ← rules for AI coders building WITH NOS
└── rules.md                         ← NOS design principles
```

## Before changing a Shadcn UI component

The components in `src/components/ui/` are intentionally close to vanilla Shadcn so
that future `shadcn add` runs do not produce huge diffs. Acceptable edits:
- Adding JSDoc above the exported function
- Adjusting Tailwind classes to use NOS tokens

Not acceptable:
- Changing component logic, props, or exports
- Introducing new dependencies

## Useful commands

```
npm run dev        # local dev server (http://localhost:3000)
npm run build      # production build (Vercel uses this)
npx tsc --noEmit   # type-check
npm run lint       # ESLint
```
