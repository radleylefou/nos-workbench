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

During the first implementation chunk, persist these NOS instructions into the
generated app so future agent turns keep the same constraints. Create or update
the app's root `AGENTS.md` with the NOS app-building rules, and copy
`instructions/rules.md` into `docs/NOS_RULES.md` or an equivalent local docs
path. The build plan must include a "NOS compliance setup" acceptance check.

## Rules

- Never hardcode colors, spacing, radius, or shadow values.
  Use Tailwind classes that reference the CSS variables in `globals.css`.
- Use existing NOS components before creating new ones.
- Copy canonical NOS components from this repo before editing behavior. Do not
  recreate an existing NOS component from memory.
- If a needed component does not exist, build it as a Shadcn-compatible
  component in `components/ui/` following the existing file conventions.
- Do not install other component libraries (MUI, Chakra, Radix directly, etc.)
  Shadcn already wraps Radix — it is handled.
- TypeScript and TSX only.
- All transitions must use motion tokens (`--duration-*`, `--ease-*`).
  Do not hardcode transition values.
- Do not animate layout properties (width, height, padding, margin).
  Use `transform` and `opacity` instead.
- Do not move component surfaces on hover. Cards, stat cards, tables, preview
  cells, pagination items, and larger product components must not use
  `hover:-translate-y-*` or any hover lift effect. Non-positional hover feedback
  such as border, background, text color, row highlight, shadow, and icon motion
  is allowed.
- Do not use decorative accent chrome on cards or large components:
  no colored top borders, side stripes, corner dots, or ornamental accent marks.
  Accent color is reserved for primary actions, active/selected states, and
  real orientation cues.
- Larger compound components should use consistent, sectioned spacing. Prefer
  `gap-0 py-0` on the outer card and `p-5` content regions, with separators
  only between meaningful sections.
- Apps are light mode only. Do not install next-themes, add a ThemeProvider,
  or use `dark:` Tailwind variants on any component outside of app-sidebar.tsx.
  The dark sidebar is handled internally by NymblAppSidebar.
- When copying NOS tokens into a new app's globals.css, copy the token blocks
  verbatim from `src/app/globals.css` in the NOS repo. Do not rename variables
  or invent token names from memory. Required blocks to copy: the :root color
  tokens, brand scale (--brand-50 through --brand-950), semantic tokens and
  ramps (--success-*, --warning-*, --error-*, --info-* plus their aliases and
  foreground pairs), shadow
  tokens (--shadow-2xs/xs/sm/md/lg/xl/2xl), motion
  tokens (--duration-instant/fast/normal/slow/slower and --ease-standard/enter/
  exit/sharp), and the sidebar token block (--sidebar-*).
- Wrap `children` in `<TooltipProvider>` in app/layout.tsx. Shadcn Tooltip
  components require this at the app root. See the App shell section above.
- Generated apps must not contain `--motion-duration-*`, custom app shells, or
  local rewrites of existing NOS components such as StatCard, StatusBadge, or
  HealthIndicator.

## App shell

Every Nymbl app uses `NymblAppSidebar` from `@/components/ui/app-sidebar` as
the primary left navigation. Never build a custom sidebar or navigation shell.

Copy `src/components/ui/app-sidebar.tsx` from the NOS repo into your app's
`src/components/ui/` folder. Edit the `mainSections` array at the top of the
file to match the app's navigation items. Keep the dark background, avatar,
logo slot, search row, and keyboard shortcut display intact.

For shell setup, copy these from NOS before writing app screens: `app-sidebar.tsx`,
`tooltip.tsx`, the required Shadcn primitives, and the exact token blocks from
`src/app/globals.css`. Copy only the primitives needed by the approved screens.

The root layout must follow this structure exactly:

```tsx
// app/layout.tsx — server component (no "use client")
import { GeistSans } from "geist/font/sans"
import { TooltipProvider } from "@/components/ui/tooltip"
import { NymblAppSidebar } from "@/components/ui/app-sidebar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <TooltipProvider>
          <div className="flex min-h-screen bg-background">
            <NymblAppSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              {children}
            </div>
          </div>
        </TooltipProvider>
      </body>
    </html>
  )
}
```

## Before you build any screen
1. If an app PRD exists, read it in full and convert it into `SPEC.md` or an
   equivalent build plan before coding.
2. The build plan should define the product summary, users, goals, non-goals,
   routes, screens, flows, data model, sample states, NOS component mappings,
   ordered chunks, and acceptance checks.
3. Add a "NOS compliance setup" acceptance check to Chunk 1: root `AGENTS.md`
   contains the NOS rules, `docs/NOS_RULES.md` or equivalent exists, canonical
   tokens are copied verbatim, and `NymblAppSidebar` is installed.
4. Read `SPEC.md` if it exists in the project — it defines the object model,
   all screens, sample data, and component mappings for that specific app.
5. Check the workbench for the component you need before building a new one.
   Components to check first: StatCard, StatusBadge, HealthIndicator, Tag, Empty,
   Rating, DotStepper, Banner, Notification, IdChip, LinkedChip, Timeline.
6. Build one approved chunk at a time, verify it in the browser, then proceed.

## Visual parity checks

Before marking any generated app complete, confirm:
- The sidebar matches the App Sidebar component.
- Brand purple appears only in primary actions and selected states.
- No decorative card accents are present.
- No custom shell or custom sidebar exists.
- Token names match NOS exactly.
- No `next-themes` or dark mode setup exists.
- Every data surface has empty, loading, and error states.
- Desktop and mobile browser screenshots have been reviewed after each chunk.

## Deployment parity checks for this workbench

After changing and pushing the workbench, verify GitHub `main`, Vercel
production, and the local workbench render the same component counts and routes.
Check `/workbench/instructions/agents`, `/workbench/components/app-sidebar`,
and `/workbench/patterns/portfolio-dashboard`.

## Visual reference
https://nos-workbench.vercel.app
