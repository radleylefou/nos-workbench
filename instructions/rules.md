# NOS Design Principles

## Aesthetic direction
Modern enterprise SaaS — calm, confident, data-friendly.
References: Vercel dashboard, Linear, Attio.
Not: Notion, Salesforce, consumer apps.

## Color
- Neutrals dominate. Brand purple appears on primary actions and
  active/selected states only.
- Semantic colors (success, warning, error, info) are reserved for
  their intended purpose — not for decoration.
- Do not use accent color as a decorative card treatment. Avoid colored
  top borders, side stripes, corner dots, and other ornamental status marks.
  Use badges, full-border state changes, iconography, or subtle background
  tints when status needs to be communicated.
- Apps are always light mode. The only dark surface is the app sidebar
  (`NymblAppSidebar`), which uses `--sidebar-*` tokens internally.
  No dark mode toggle, ThemeProvider, or `dark:` variants on content surfaces.

## Typography
- Strong weight contrast: headings are semibold/bold,
  body text is regular.
- Tight line-height on data rows, relaxed on body copy.

## Motion
- Duration hierarchy:
  - Micro (hover, focus, press): `--duration-fast` (100ms)
  - Component state change: `--duration-normal` (200ms)
  - Panel/drawer: `--duration-slow` (350ms)
  - Page-level: `--duration-slower` (500ms)
- Easing:
  - `--ease-enter`: things arriving on screen
  - `--ease-exit`: things leaving (faster than enter)
  - `--ease-standard`: in-place state changes
- No bounce or spring on enterprise UI
- Scale press feedback stays between 0.97–0.99
- No decorative animation — every motion serves a purpose

## Density
Balanced — clear hierarchy with moderate whitespace.
Not spacious. Not cramped. Enterprise-appropriate.
- Larger cards and compound components use logical internal sections:
  outer card `gap-0 py-0`, primary content padding of `p-5`, and separators
  only between meaningful regions. Do not mix arbitrary `p-3`, `pb-3`, and
  `pt-0` adjustments unless the component is intentionally compact.
- Workbench previews for larger components should top-align content and avoid
  adding decorative accents that are not part of the component itself.

## Components
- Reuse before inventing
- Components are presentational — no API calls, no global state
- Every new component needs: the `.tsx` file, an export, a workbench demo
- L1 component cards must communicate type through structured content
  such as badges and metadata, never through a top accent border.

## Page layout composition

Every app screen uses one of three shell patterns. Never build a full-page
layout without `NymblAppSidebar`.

Use `instructions/compositions.md` as the implementation cookbook when mapping
a PRD to app screens. It defines the required NOS components and acceptance
checks for app shells, dashboards, directories, detail workflows, and settings.

1. **Standard page** — `NymblAppSidebar` + full-width main content.
   Main content: `<div className="flex flex-col gap-6 p-6 lg:p-8">`.

2. **Detail panel** — Sidebar + main list + right detail panel (Sheet or
   fixed 360px column). Use for record detail, inspection, and edit flows.

3. **Settings page** — Sidebar + inner two-column layout
   (`lg:grid lg:grid-cols-[200px_1fr] gap-8`). Left column: vertical `<nav>`
   list of `<button>` items with active indicator. Right column: content Cards.
   Do not use a Tabs component for settings navigation.

## Dashboard composition

The canonical dashboard layout, top to bottom:

1. **Page header** — `<h1>` (text-2xl font-semibold tracking-tight) + optional
   `<p>` description (text-sm text-muted-foreground) + right-aligned primary
   action button. Sticky, min-h-16, border-b, backdrop-blur.

2. **KPI stat row** — 3–4 `StatCard` components in a responsive grid:
   `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`. No more than 4 KPIs.

3. **Primary data surface** — `DataTable` or card grid
   (`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4`).

4. **Secondary panel** (optional) — Activity feed, timeline, or supplemental
   data in `lg:grid lg:grid-cols-[1fr_320px] gap-6`. Right column is narrower.

## Required states

Every list, table, and data surface must implement all three states:

- **Empty** — Use the NOS `Empty` component: icon + heading + description +
  optional primary action CTA. Never show a blank white surface.
- **Loading** — Use `Skeleton` components matching the loaded content shape.
  Minimum 3 skeleton rows for tables; skeleton cards for card grids.
- **Error** — Use `Alert` (destructive variant) with a retry button.

## Source-of-truth copying

- Copy canonical NOS components before editing them. Do not rebuild existing
  NOS components from memory.
- For shell setup, copy `app-sidebar.tsx`, `tooltip.tsx`, required primitives,
  and token blocks from `src/app/globals.css` before implementing screens.
- If a component exists in the workbench, use it or copy it verbatim before
  making app-specific changes.
- Generated apps must not contain custom rewrites of existing NOS components
  such as `StatCard`, `StatusBadge`, or `HealthIndicator`.

## Visual parity checklist

Before a generated app is considered complete:

- Sidebar matches the `App Sidebar` component.
- Brand purple appears only in primary actions and selected states.
- No decorative card accents, top borders, side stripes, or corner ornaments.
- No custom shell or custom sidebar.
- Token names match NOS exactly; no `--motion-duration-*` aliases.
- No `next-themes`, dark mode toggle, or app-wide dark mode setup.
- Every data surface has empty, loading, and error states.
- Desktop and mobile screenshots have been reviewed after each build chunk.

## Table composition

Every `DataTable` or `Table` instance must have:

- **Header row** (above the `<table>` element) — title + count `Badge`
  (secondary variant) + search `Input` (w-64) + primary action button, in a
  `flex items-center justify-between` row.
- **Row styles** — `hover:bg-muted/50` on each row. Status columns use
  `StatusBadge`. ID columns use `IdChip`. User columns use `Avatar` with
  initials fallback.
- **Footer** — "Showing X of Y" text left, pagination buttons right.

## Form composition

- Forms live inside a `Card` with `CardHeader` (title + description) and
  `CardContent` (fields). Use the `Field` NOS component for label + input +
  hint/error grouping. Stack fields with `gap-4`.
- Two-column grids (`grid grid-cols-2 gap-4`) are acceptable for short paired
  fields (e.g. first name + last name).
- Submit/Cancel buttons in `CardFooter` with `border-t`: primary action
  right-aligned, cancel or destructive action left-aligned.
- Never place form inputs directly on a page surface without a Card wrapper.
