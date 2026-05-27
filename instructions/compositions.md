# NOS Composition Cookbook

Use these recipes to turn a PRD into NOS screens. They are intentionally
prescriptive so generated apps feel recognisably NOS without copying the
workbench page-for-page.

## App Shell

Use `NymblAppSidebar` on every internal app. The sidebar is the only dark
surface; the main app surface is light.

Required components:
- `NymblAppSidebar`
- `TooltipProvider`
- `Toaster` only if toast feedback is needed

Acceptance checks:
- No custom `AppShell`, custom sidebar, or alternate navigation shell exists.
- Sidebar uses the NOS logo, dark sidebar tokens, search row, and user footer.
- Main content starts to the right of the sidebar and uses `bg-background`.

## Dashboard

Use dashboards for overview, monitoring, or triage pages.

Structure:
1. Page header with title, short description, and one primary action.
2. KPI row with 3-4 `StatCard` components.
3. Primary work surface: `DataTable`, card grid, or workflow panel.
4. Optional secondary panel for activity, alerts, or timeline context.

Required components:
- `StatCard`
- `Badge` or `StatusBadge`
- `DataTable` or `Table` when listing records
- `ActivityFeed`, `Timeline`, or `Empty` when relevant

Acceptance checks:
- No more than four top-level KPIs.
- Primary action is the only strong brand-purple button in the header.
- Every data surface has empty, loading, and error states.

## Directory Or List

Use this for people, accounts, projects, requests, or any browsable collection.

Structure:
1. Page header with title, description, and optional create action.
2. Filter row with search input, select filters, and count.
3. Table or card grid.
4. Footer with pagination or "showing X of Y" text.

Required components:
- `Input`
- `Select` or `Combobox`
- `DataTable`, `Table`, or repeated `Card`
- `StatusBadge`, `IdChip`, `Avatar`, and `Tag` when the data shape calls for them

Acceptance checks:
- Search and filters occupy one composed row above the data.
- Status, ID, and person cells use NOS primitives.
- Empty, loading, and error states are implemented.

## Detail Workflow

Use this when users inspect or edit one record while keeping list context.

Structure:
1. List or table in the main column.
2. `Sheet` or fixed 360px detail column for the selected record.
3. Actions grouped in the detail header or footer.

Required components:
- `Sheet` or `Drawer`
- `Button`
- `Badge` or `StatusBadge`
- `Timeline`, `Field`, or `Alert` as needed by the workflow

Acceptance checks:
- The list remains visible while detail is open on desktop.
- Mobile uses a full-width sheet or route-level detail page.
- Destructive actions are visually separated from primary actions.

## Settings Or Admin

Use this for preferences, admin configuration, roles, billing, or integrations.

Structure:
1. Page header.
2. Inner two-column layout: local vertical nav on the left, content on the right.
3. Content sections as `Card` blocks with `CardHeader`, `CardContent`, and
   optional `CardFooter`.

Required components:
- `Card`
- `Field`
- `Input`, `Select`, `Switch`, `Checkbox`, or `Textarea`
- `Alert` for destructive or irreversible settings

Acceptance checks:
- Do not use Tabs for settings navigation.
- Forms use `Field` for label, control, hint, and error grouping.
- Submit and cancel actions live in `CardFooter` with a separating border.
