# NOS Gap Analysis — Generated App Audit

**Date:** 2026-05-27
**Audited app:** `nos-staff-mvp` (`/Users/georgestepanov/Documents/CLAUDE/Scope-V3/nos-staff-mvp/`)
**Reference:** NOS Design System v3 (`nos-workbench.vercel.app`)

---

## Executive Summary

The `nos-staff-mvp` app is functionally solid and uses NOS tokens correctly in most places. However, six categories of drift were found — all caused by gaps in `AGENTS.md` and `rules.md` rather than agent error. Adding explicit compositional rules for app shell, light mode, token setup, and page layout patterns should close these gaps for the next generated app.

---

## Stack Audit

| Item | Expected | Found | Status |
|---|---|---|---|
| Framework | Next.js 16 App Router | Next.js 16.2.6 App Router | ✅ |
| Language | TypeScript (.tsx only) | TypeScript (.tsx) | ✅ |
| Styling | Tailwind CSS v4 | Tailwind CSS v4 | ✅ |
| Components | Shadcn/ui (Radix-based) | Radix UI packages (hand-added) | ✅ |
| Icons | Lucide | Lucide | ✅ |
| Motion tokens | `--duration-*`, `--ease-*` | `--motion-duration-*`, `--motion-ease-*` | ❌ Renamed |
| Sidebar token block | `--sidebar-*` | `--sidebar-*` | ✅ |
| Dark mode | None (light only) | `next-themes` imported | ❌ Enabled |
| `TooltipProvider` | In `app/layout.tsx` | Missing | ❌ |
| No custom sidebar | Use `NymblAppSidebar` | Custom `app-shell.tsx` built | ❌ |
| `"use client"` discipline | Server components by default | Mixed, acceptable | ⚠️ |

---

## Component Gaps

### Used correctly from NOS (or Shadcn base)

| Component | Source |
|---|---|
| `Button` | Shadcn base |
| `Card`, `CardContent` | Shadcn base |
| `Input`, `Select` | Shadcn base |
| `Avatar`, `AvatarFallback`, `AvatarImage` | Shadcn base |
| `Progress` | Shadcn base |
| `Separator` | Shadcn base |
| `Tooltip`, `TooltipContent`, `TooltipTrigger` | Shadcn base |
| `Skeleton` | Shadcn base |
| `DropdownMenu` | Shadcn base |
| `Badge` | Shadcn base |
| Sonner toaster | Third-party (acceptable) |

### Rebuilt from scratch when NOS already has them

| Component built in app | NOS equivalent | Notes |
|---|---|---|
| `components/ui/stat-card.tsx` | `src/components/ui/stat-card.tsx` | Identical purpose |
| `components/ui/status-badge.tsx` | `src/components/ui/status-badge.tsx` | Identical purpose |
| `components/ui/health-indicator.tsx` | `src/components/ui/health-indicator.tsx` | Identical purpose |
| `components/ui/tag.tsx` | `src/components/ui/tag.tsx` | Identical purpose |
| `components/ui/empty.tsx` | `src/components/ui/empty.tsx` | Identical purpose |
| `components/layout/app-shell.tsx` | `src/components/ui/app-sidebar.tsx` (`NymblAppSidebar`) | Core shell violation |

**Root cause:** The starter prompt and AGENTS.md don't list specific NOS components to check before building. Agents build from memory.

---

## Shell & Layout Gaps

### 1. Custom sidebar (critical)

The app built a bespoke `AppShell` component with its own `SidebarNav` instead of using `NymblAppSidebar`. The custom sidebar works visually but:
- Doesn't use the NOS dark sidebar token system (`--sidebar-*` variables)
- Duplicates scroll/collapse behavior already solved in NOS
- Won't stay in sync as NOS evolves

**Fix:** AGENTS.md must explicitly mandate `NymblAppSidebar` with a layout.tsx template.

### 2. Dark mode enabled

`next-themes` was installed and a `ThemeProvider` was added. NOS apps are always light mode — the only dark surface is the app sidebar (handled internally by `NymblAppSidebar`).

**Fix:** AGENTS.md must state "apps are light mode only" and "do not install next-themes."

### 3. Token variable name drift

The app's `globals.css` uses `--motion-duration-fast` and `--motion-ease-standard` while NOS uses `--duration-fast` and `--ease-standard`. This means motion token classes generated from the app won't match NOS.

**Fix:** AGENTS.md must say to copy token blocks **verbatim** from the NOS `src/app/globals.css`, not from memory.

### 4. No TooltipProvider

Shadcn's Tooltip components require `<TooltipProvider>` at the app root. It was missing from `app/layout.tsx`.

**Fix:** Add to AGENTS.md layout.tsx setup requirements.

---

## New Rules for AGENTS.md

Add the following sections to `instructions/AGENTS.md`:

```markdown
## App shell

Every Nymbl app uses `NymblAppSidebar` from `@/components/ui/app-sidebar` as
the primary left navigation. Never build a custom sidebar or navigation shell.

Copy `src/components/ui/app-sidebar.tsx` from the NOS repo into your app's
`src/components/ui/` folder. Edit the `mainSections` array at the top of the
file to match the app's navigation items. Keep the dark background, avatar,
logo slot, search row, and keyboard shortcut display intact.

The root layout must follow this structure:

\`\`\`tsx
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
\`\`\`
```

**Under the existing Rules section, add:**

```markdown
- Apps are light mode only. Do not install next-themes, add a ThemeProvider,
  or use `dark:` Tailwind variants on any component outside of app-sidebar.tsx.
  The dark sidebar is handled internally by NymblAppSidebar.
- When copying NOS tokens into a new app's globals.css, copy the token blocks
  verbatim from `src/app/globals.css` in the NOS repo. Do not rename variables
  or invent token names from memory. Required blocks: color tokens, brand scale
  (--brand-50 through --brand-950), semantic tokens (--success, --warning,
  --error, --info), motion tokens (--duration-*, --ease-*), sidebar tokens
  (--sidebar-*).
- Wrap `children` in `<TooltipProvider>` in app/layout.tsx. Shadcn Tooltip
  components require this at the app root.
```

---

## New Rules for rules.md

Add the following sections to `instructions/rules.md`:

```markdown
## Page layout composition

Every app screen uses one of three shell patterns:

1. **Standard page**: NymblAppSidebar + full-width main content.
   Main content area: `<div className="flex flex-col gap-6 p-6 lg:p-8">`.

2. **Detail panel**: Sidebar + main list + right detail panel (Sheet or a
   fixed 360px column). Use for record detail, inspection, and edit flows.

3. **Settings page**: Sidebar + inner two-column layout (settings nav ~200px +
   content). Settings nav is a vertical list of `<button>` items with an
   active indicator, not a Tabs component.

Never build a full-page layout without the sidebar.

## Dashboard composition

The canonical dashboard layout, top to bottom:

1. **Page header**: `<h1>` (text-2xl font-semibold tracking-tight) + optional
   description (text-sm text-muted-foreground) + right-aligned primary action.
   Sticky, min-h-16, border-b, backdrop-blur.

2. **KPI stat row**: 3–4 `StatCard` components in a responsive grid:
   `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`.

3. **Primary data surface**: `DataTable` or card grid
   (`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4`).

4. **Secondary panel** (optional): Activity feed, timeline, or supplemental
   data in `lg:grid lg:grid-cols-[1fr_320px] gap-6`.

## Required states

Every list, table, and data surface must implement all three states:

- **Empty**: Use the `Empty` NOS component with icon, heading, description,
  and an optional primary action CTA. Never show a blank white surface.
- **Loading**: Use `Skeleton` components matching the loaded content shape.
  Minimum 3 skeleton rows for tables; skeleton cards for card grids.
- **Error**: Use `Alert` (destructive variant) with a retry button.

## Table composition

Every table must include:

- **Header row** (above the `<table>` element): title + count `Badge`
  (secondary variant) + search `Input` (w-64) + primary action button,
  in a `flex items-center justify-between` container.
- **Row styles**: `hover:bg-muted/50` on each row. Status columns use
  `StatusBadge`. ID columns use `IdChip`. User columns use `Avatar` with
  initials fallback.
- **Footer**: "Showing X of Y" text on the left, pagination buttons on the right.

## Form composition

- Forms live inside a `Card` with `CardHeader` (title + description) and
  `CardContent` (fields). Use the `Field` NOS component for label + input +
  hint/error grouping. Stack fields with `gap-4`.
- Two-column grids (`grid grid-cols-2 gap-4`) are acceptable for short paired
  fields (e.g. first name + last name).
- Submit/Cancel buttons go in `CardFooter` with `border-t`: primary action
  right-aligned, cancel or destructive action left-aligned.
- Never place form inputs directly on a page surface without a Card wrapper.
```

---

## Re-Run Checklist

Use this checklist when generating the next Nymbl app to verify NOS compliance:

- [ ] `NymblAppSidebar` used for left navigation (not a custom sidebar)
- [ ] `app/layout.tsx` has `<TooltipProvider>` wrapping children
- [ ] `globals.css` token names match NOS exactly (copy verbatim, not from memory)
- [ ] No `next-themes`, no `ThemeProvider`, no `dark:` variants outside sidebar
- [ ] NOS components used before building custom ones: `StatCard`, `StatusBadge`, `HealthIndicator`, `Tag`, `Empty`, `Rating`, `DotStepper`, `Banner`, `Notification`
- [ ] Every list/table has empty, loading, and error states
- [ ] Every table has header row (title + count + search + action) and footer (pagination)
- [ ] Dashboard has KPI stat row at top
- [ ] Settings pages use two-column layout with vertical nav list
- [ ] Forms are wrapped in `Card` with `CardHeader` + `CardContent` + `CardFooter`
- [ ] Motion transitions use `--duration-*` and `--ease-*` token variables
- [ ] No hardcoded hex colors anywhere

---

## References

- NOS Workbench: https://nos-workbench.vercel.app
- GitHub: https://github.com/radleylefou/nos-workbench
- AGENTS.md: `instructions/AGENTS.md`
- rules.md: `instructions/rules.md`
- Untitled UI reference: https://www.untitledui.com/react/components/dashboards
