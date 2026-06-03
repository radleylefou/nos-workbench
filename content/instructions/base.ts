import type { InstructionFragment } from "./types"

export const agentCoreMarkdown = `# NOS Design System - Agent Instructions

## What this is

NOS is the shared component and token library for Nymbl internal apps. It is built on Shadcn/ui (Vega style) with NOS brand tokens applied. Every Nymbl app should import from this system and use the hosted workbench as the visual reference:

https://nos-workbench.vercel.app/

Use the GitHub repo as implementation reference:

https://github.com/radleylefou/nos-workbench

## Stack

- Next.js App Router
- TypeScript and TSX only; do not create \`.jsx\` files
- Tailwind CSS
- Shadcn/ui components
- Lucide icons
- NOS purple, semantic, shadow, radius, spacing, typography, and motion tokens from \`src/app/globals.css\`

## Non-negotiable NOS rules

- Never hardcode colors, spacing, radius, shadow, or motion values. Use Tailwind classes and CSS variables from NOS tokens.
- Copy token variable names verbatim from NOS \`src/app/globals.css\`; do not rename or invent tokens from memory.
- Required token blocks include \`:root\` color tokens, \`--brand-50\` through \`--brand-950\`, semantic ramps and aliases (\`--success-*\`, \`--warning-*\`, \`--error-*\`, \`--info-*\`), shadow tokens (\`--shadow-*\`), motion tokens (\`--duration-*\`, \`--ease-*\`), and sidebar tokens (\`--sidebar-*\`).
- Use existing NOS components before creating new ones.
- Copy canonical NOS components from the workbench before editing behavior. Do not recreate existing NOS components from memory.
- Components are presentational. Do not put API calls, routing, global state, or app-specific data fetching inside NOS components.
- If a needed component does not exist, build it as a Shadcn-compatible component in \`components/ui/\` following the existing file conventions.
- Do not install other component libraries such as MUI, Chakra, or Radix directly. Shadcn already wraps Radix where needed.
- All transitions must use motion tokens (\`--duration-*\`, \`--ease-*\`). Do not hardcode transition values.
- Do not animate layout properties such as width, height, padding, or margin. Use \`transform\` and \`opacity\` for motion.
- Do not move component surfaces on hover. Cards, stat cards, tables, preview cells, pagination items, and larger product components must not use \`hover:-translate-y-*\` or any hover lift effect.
- Non-positional hover feedback is allowed: border, background, text color, row highlight, shadow, focus ring, and icon motion.
- Do not use decorative accent chrome on cards or large components: no colored top borders, side stripes, corner dots, or ornamental accent marks.
- Brand purple is reserved for primary actions, active states, selected states, and real orientation cues.
- Apps are light mode only. Do not install \`next-themes\`, add a ThemeProvider, or add a dark mode toggle. The only dark surface is \`NymblAppSidebar\`.
- Wrap \`children\` in \`TooltipProvider\` in \`app/layout.tsx\`.
- Generated apps must not contain \`--motion-duration-*\`, custom app shells, custom sidebars, or local rewrites of existing NOS components such as \`StatCard\`, \`StatusBadge\`, or \`HealthIndicator\`.

## App shell

Every Nymbl app uses \`NymblAppSidebar\` from \`@/components/ui/app-sidebar\` as the primary left navigation. Never build a custom sidebar or navigation shell.

Copy these from NOS before writing app screens:

- \`src/components/ui/app-sidebar.tsx\`
- \`src/components/ui/tooltip.tsx\`
- Required Shadcn primitives
- Exact token blocks from \`src/app/globals.css\`

Edit the \`mainSections\` array in \`app-sidebar.tsx\` to match the app's navigation items. Keep the dark background, avatar, logo slot, search row, and keyboard shortcut display intact.

The root layout must follow this structure:

\`\`\`tsx
// app/layout.tsx - server component, no "use client"
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
\`\`\`

## Before building any screen

1. Read the project instructions for whether this is a new build or an existing-app conversion.
2. Check the workbench for the component, token, and pattern you need before creating new UI.
3. Components to check early: \`StatCard\`, \`StatusBadge\`, \`HealthIndicator\`, \`Tag\`, \`Empty\`, \`Rating\`, \`Stepper\`, \`Banner\`, \`Notification\`, \`IdChip\`, \`LinkedChip\`, and \`Timeline\`.
4. Build one approved chunk at a time.
5. Verify each chunk in the browser before proceeding.

## Visual parity checks

Before marking any generated app complete, confirm:

- The sidebar matches the App Sidebar component.
- Brand purple appears only in primary actions and selected states.
- No decorative card accents are present.
- No custom shell or custom sidebar exists.
- Token names match NOS exactly.
- No \`next-themes\` or dark mode setup exists.
- Every data surface has empty, loading, and error states.
- Desktop and mobile browser screenshots have been reviewed after each chunk.`

export const designPrinciplesMarkdown = `# NOS Design Principles

## Aesthetic direction

Modern enterprise SaaS: calm, confident, data-friendly.

Reference feel: Vercel dashboard, Linear, Attio.

Avoid: Notion, Salesforce, consumer apps, decorative dashboards, and marketing-style page composition inside operational tools.

## Color

- Neutrals dominate.
- Brand purple appears on primary actions and active or selected states only.
- Semantic colors are reserved for success, warning, error, and info states.
- Do not use accent color as decorative card treatment.
- Apps are always light mode. The only dark surface is \`NymblAppSidebar\`.

## Typography

- Use strong weight contrast: headings are semibold or bold, body text is regular.
- Use tight line-height on data rows and relaxed line-height on body copy.
- Keep display-scale text for true page heroes, not compact cards, panels, or tool surfaces.

## Motion

- Micro interactions use \`--duration-fast\`.
- Component state changes use \`--duration-normal\`.
- Panels and drawers use \`--duration-slow\`.
- Page-level transitions use \`--duration-slower\`.
- Use \`--ease-enter\`, \`--ease-exit\`, and \`--ease-standard\`.
- No bounce or spring motion in enterprise UI.
- No decorative animation.
- Component surfaces do not move on hover.

## Density

Balanced and enterprise-appropriate: clear hierarchy with moderate whitespace. Larger compound components should use logical sections: outer card \`gap-0 py-0\`, primary content regions with \`p-5\`, and separators only between meaningful regions.

## Components

- Reuse before inventing.
- Components are presentational.
- Every new component needs the \`.tsx\` file, export, and workbench demo.
- L1 component cards communicate type through structured content such as badges and metadata, never through top accent borders.

## Page layout composition

Every app screen uses one of three shell patterns. Never build a full-page layout without \`NymblAppSidebar\`.

1. Standard page: \`NymblAppSidebar\` plus full-width main content.
2. Detail panel: sidebar plus main list plus right detail panel.
3. Settings page: sidebar plus inner two-column layout.

## Dashboard composition

The canonical dashboard layout:

1. Page header with title, short description, and one primary action.
2. KPI stat row with 3-4 \`StatCard\` components.
3. Primary data surface such as \`DataTable\`, \`Table\`, or a card grid.
4. Optional secondary panel for activity, alerts, or timeline context.

## Required states

Every list, table, and data surface must implement:

- Empty state with the NOS \`Empty\` component.
- Loading state with \`Skeleton\` components matching the loaded shape.
- Error state with \`Alert\` and a retry action.

## Table composition

Every \`DataTable\` or \`Table\` instance must have:

- Header row above the table with title, count badge, search input, and primary action.
- Row hover style with \`hover:bg-muted/50\`.
- Status columns using \`StatusBadge\`.
- ID columns using \`IdChip\`.
- Person cells using \`Avatar\`.
- Footer with "Showing X of Y" text and pagination controls.

## Form composition

- Forms live inside a \`Card\`.
- Use \`Field\` for label, control, hint, and error grouping.
- Stack fields with \`gap-4\`.
- Submit and cancel buttons live in \`CardFooter\` with a separating border.
- Never place form inputs directly on a page surface without a Card wrapper.`

export const baseMarkdown = `${agentCoreMarkdown}

---

${designPrinciplesMarkdown}`

export const baseFragment: InstructionFragment = {
  id: "base",
  title: "Core NOS rules",
  markdown: baseMarkdown,
}
