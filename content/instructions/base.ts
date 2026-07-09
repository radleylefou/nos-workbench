import type { InstructionFragment } from "./types"

export const agentCoreMarkdown = `# NOS Design System - Agent Instructions

You are building or updating a Nymbl internal app using the NOS design system. Your job is to produce an app that looks and behaves like a native part of NOS: it consumes NOS components, tokens, and patterns rather than inventing its own UI. Whether you are scaffolding a new app or extending an existing one, the same rule holds - reuse the system first, and match it exactly where you must extend it.

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
- Valid NOS tokens are necessary but not sufficient. Visible product surfaces must come from canonical NOS components or approved NOS compositions, not custom markup that merely uses NOS colors.
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
- Generated apps must not contain \`--motion-duration-*\`, custom app shells, custom sidebars, raw table shells, custom data grids, hand-built metric cards, local status badge systems, or local rewrites of existing NOS components such as \`NymblAppSidebar\`, \`DataGrid\`, \`DataTable\`, \`Table\`, \`StatCard\`, \`StatusBadge\`, or \`HealthIndicator\`.

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
3. Build one approved chunk at a time.
4. Verify each chunk in the browser before proceeding.

## Component provenance

Every visible product surface must have a clear NOS origin. Before implementing a screen, identify the canonical NOS component or approved composition powering each shell, table, metric row, badge/status cell, form, overlay, and detail panel.

- If the surface maps to an existing NOS component, import and use that component. Do not recreate it locally with raw HTML, \`Card\` wrappers, or copied Tailwind classes.
- If the surface has no clean NOS equivalent, list it under "Needs review" and ask for a human decision. Do not silently invent a new local component or semantic tile pattern.
- For sidebars, use \`NymblAppSidebar\`, \`NymblEngagementSidebar\`, or \`NymblNestedSidebar\`; never create a custom \`aside\`, navigation shell, or dark rail that only approximates the sidebar.
- For tables, use \`DataGrid\` for dense operational workspaces with toolbar controls, column visibility, selection, expandable rows, or high-density scanning; use \`DataTable\` for sortable/filterable/paginated datasets; use \`Table\` only for simple static or lightly interactive rows.
- For metrics, use \`StatCard\` for individual KPIs and \`MetricPanels\` for grouped KPI rows. Custom semantic status tiles belong in "Needs review" unless NOS already provides an approved component or composition for that exact pattern.
- For status cells and health indicators, use \`StatusBadge\`, \`HealthIndicator\`, \`Badge\`, or the matching NOS primitive. Do not build local colored pill systems.
- For record details, use the approved shell pattern: a right detail column, \`Sheet\`, or \`Drawer\` depending on context. Do not invent a separate modal/panel language.

## Choosing between similar components

Many NOS components overlap. Pick the right one at the decision point - do not default to the most generic option. Each rule below names the sibling to use instead.

- Buttons: \`Button\` for labelled primary and secondary actions; \`CompactButton\` for icon-only actions in dense toolbars and table rows; \`LinkButton\` for low-emphasis inline actions inside or beside text; \`ButtonGroup\` to join related buttons; \`ToggleGroup\` for a set of two-state buttons such as alignment.
- Badges and chips: \`Badge\` for generic counts, labels, and categorisation; \`StatusBadge\` for semantic lifecycle states (completed, pending, failed, disabled) where colour and icon follow the status; \`Tag\` for dismissible, user-applied labels such as filters; \`IdChip\` for non-interactive monospace reference IDs (EPIC-014); \`LinkedChip\` for a clickable chip that links to a domain object with a type icon.
- Overlays: \`Dialog\` for focused modal tasks; \`AlertDialog\` for destructive or irreversible confirmations; \`Sheet\` for an edge-anchored side panel of supporting content or forms (record detail, secondary form); \`Drawer\` for bottom or mobile-friendly edge panels; \`Popover\` for lightweight content anchored to a trigger; \`HoverCard\` for non-interactive hover previews.
- Messages: \`Alert\` for an inline, persistent message tied to a region; \`Banner\` for a full-width announcement across the top of a page or app; \`Notification\` for a positioned status card with title, description, and optional action; toast (\`sonner\`) for brief, auto-dismissing confirmations.
- Tabs and switchers: \`Tabs\` to switch between equal-weight content panels in place; \`SegmentedControl\` for a compact 2-4 option toggle such as a view switch; \`TabMenuHorizontal\` for page-level section navigation with an underline indicator; \`TabMenuVertical\` for a stacked left-rail menu.
- Selection inputs: \`Checkbox\` for independent boolean or multi-select choices; \`RadioGroup\` to pick exactly one from a small visible set; \`Switch\` for an instant on/off setting that applies immediately; \`Toggle\` for a single button-style on/off control; \`Select\` for one option from a medium-to-long list; \`Combobox\` for searchable single-select with free-text filtering; \`NativeSelect\` only when OS-native behaviour is required.
- Progress and loading: \`Progress\` for a linear determinate bar; \`ProgressCircle\` for compact circular progress, often with a centered value; \`Spinner\` for short indeterminate waits on a control; \`Skeleton\` to placeholder content layout while data loads.
- Metrics: \`StatCard\` for a single KPI with trend and optional icon; \`MetricPanels\` for a composed row of several KPIs; \`Chart\` for plotted data such as lines, bars, and areas; \`AnimatedNumber\` for large KPI values that should pop in on render. Never hand-build a metric out of a \`Card\` plus a number when \`StatCard\` fits.
- Tables and lists: \`DataGrid\` for high-density operational workspaces with toolbar controls, column visibility, row selection, expandable rows, or dense scanning; \`DataTable\` for rich tabular data needing sort, filter, selection, and pagination; \`Table\` only for static or lightly interactive tabular data; \`Item\` for a generic list or menu row.
- Menus: \`DropdownMenu\` for a menu of actions opened from a button; \`ContextMenu\` for right-click actions; \`Menubar\` for desktop-app-style menu bars; \`NavigationMenu\` for top-level site navigation; \`Command\` for a searchable command palette.
- Date inputs: \`Calendar\` for an always-visible month grid; \`DatePicker\` for date or range selection from a compact input with presets; \`DateSelector\` for operational periods (days, months, quarters, halves, years) with an operator.
- Hierarchy: \`Accordion\` for multiple independently collapsible sections; \`Collapsible\` for a single show/hide region; \`Tree\` for nested structures where hierarchy is the primary thing users scan.

The NOS manifest carries a \`whenToUse\` field with the full comparative rule for every component - fetch it and respect it before building or substituting any component.

## Self-audit before presenting work

This checklist is yours to run, not the user's. Before you present any chunk or declare work done, audit your own output against every item below and fix anything that fails. Do not show the user a first draft you have not self-audited. Run it after every chunk, not just at the end.

- The sidebar matches the App Sidebar component; no custom shell or custom sidebar exists.
- The implementation can name the NOS component or approved composition behind every shell, table/data surface, metric row, status cell, and detail panel.
- Brand purple appears only in primary actions, active states, and selected states - never as decorative card chrome.
- No decorative card accents are present (no colored top borders, side stripes, or corner dots).
- Token names match NOS exactly; no hardcoded colors, spacing, radius, shadow, or motion values.
- No \`next-themes\`, ThemeProvider, or dark mode setup exists.
- Each chosen component is the correct one per "Choosing between similar components"; no hand-built component duplicates an existing NOS one.
- Custom semantic tiles, local table shells, local pill systems, and detail panels with no NOS equivalent are listed under "Needs review" rather than shipped as invented components.
- Every data surface has empty, loading, and error states.
- Transitions use motion tokens only and animate \`transform\`/\`opacity\`; no hover lift on cards or surfaces.
- Desktop and mobile browser screenshots have been reviewed for this chunk.

State the result of this self-audit (pass, or the items you fixed) when you hand the chunk back.`

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
- Component provenance matters: using NOS tokens on custom markup does not make a surface NOS-compliant.
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
2. KPI stat row with 3-4 \`StatCard\` components or an approved \`MetricPanels\` composition.
3. Primary data surface such as \`DataGrid\`, \`DataTable\`, \`Table\`, or a card grid.
4. Optional secondary panel for activity, alerts, or timeline context.

## Required states

Every list, table, and data surface must implement:

- Empty state with the NOS \`Empty\` component.
- Loading state with \`Skeleton\` components matching the loaded shape.
- Error state with \`Alert\` and a retry action.

## Table composition

Every \`DataGrid\`, \`DataTable\`, or \`Table\` instance must have:

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
