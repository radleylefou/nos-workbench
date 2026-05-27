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

Start by giving your coding agent the NOS starter prompt from:

https://nos-workbench.vercel.app/workbench/instructions/agents

Then have the agent use the workbench as the visual reference and this repo as
the implementation reference. The agent should inspect existing components,
tokens, and rules before creating new UI.

For new apps, include the app PRD with the starter prompt. The first agent
response should be a plan, not implementation code. The agent should convert
the PRD into `SPEC.md` or an equivalent build plan, get the plan approved, and
then build the app in chunks.

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
- Do not use decorative accent chrome on cards or large components:
  no colored top borders, side stripes, corner dots, or ornamental accent marks.
  Accent color is reserved for primary actions, active/selected states, and
  real orientation cues.
- Larger compound components should use consistent, sectioned spacing. Prefer
  `gap-0 py-0` on the outer card and `p-5` content regions, with separators
  only between meaningful sections.

## Before you build any screen
1. If an app PRD exists, read it in full and convert it into `SPEC.md` or an
   equivalent build plan before coding.
2. The build plan should define the product summary, users, goals, non-goals,
   routes, screens, flows, data model, sample states, NOS component mappings,
   ordered chunks, and acceptance checks.
3. Read `SPEC.md` if it exists in the project — it defines the object model,
   all screens, sample data, and component mappings for that specific app.
4. Check the workbench for the component you need before building a new one.
5. Build one approved chunk at a time, verify it in the browser, then proceed.

## Visual reference
https://nos-workbench.vercel.app
