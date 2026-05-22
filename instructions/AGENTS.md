# NOS Design System — Agent Instructions

## What this is
NOS is the shared component and token library for Nymbl's internal apps.
It is built on Shadcn/ui (Vega style) with NOS brand tokens applied.
Every app built at Nymbl should import from this system.

## Stack
- Next.js (App Router)
- TypeScript (.tsx files only — no .jsx)
- Tailwind CSS
- Shadcn/ui components
- Lucide icons

## How to use in a new app

1. Copy `components/ui/` into your project's `components/ui/` folder
2. Copy `globals.css` token variables into your project's `globals.css`
3. Import components: `import { Button } from "@/components/ui/button"`
4. Use Tailwind utility classes — do not write custom CSS unless
   Tailwind cannot handle the case

## Rules

- Never hardcode colors, spacing, or radius values.
  Use Tailwind classes that reference the CSS variables in `globals.css`.
- Use existing NOS components before creating new ones.
- If a needed component does not exist, build it as a Shadcn-compatible
  component in `components/ui/` following the existing file conventions.
- Do not install other component libraries (MUI, Chakra, Radix directly, etc.)
  Shadcn already wraps Radix — it is handled.
- TypeScript and TSX only.
- All transitions must use motion tokens (`--duration-*`, `--ease-*`).
  Do not hardcode transition values.
- Do not animate layout properties (width, height, padding, margin).
  Use `transform` and `opacity` instead.

## Before you build any screen
1. Read `SPEC.md` if it exists in the project — it defines the object model,
   all screens, sample data, and component mappings for that specific app.
2. Check the workbench for the component you need before building a new one.
3. Build Phase 1 screens first, verify in the browser, then proceed.

## Visual reference
<!-- Vercel URL — added after deployment -->
