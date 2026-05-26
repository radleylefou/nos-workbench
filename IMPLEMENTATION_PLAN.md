# IMPLEMENTATION_PLAN.md — NOS Workbench Component Gap Analysis v2

## Context

The NOS Design System v3 workbench ships 55 Shadcn components across 7 sidebar categories. This plan closes the 44 gaps identified in `NOS_Component_Gap_Analysis_v2.md` — covering missing variant demos (Tier 1), free-equivalent extensions (Tier 2), compound NOS compositions (Tier 3), fully custom NOS atoms (Tier 4), and full-screen product pattern pages (Tier 5).

**Source document:** `NOS_Component_Gap_Analysis_v2.md` (May 2026)
**Target repo:** `/Users/georgestepanov/Documents/CLAUDE/NOS-V3`

---

## Architecture Conventions

- **Component files:** `src/components/ui/[slug].tsx` — Shadcn-style, exports named component(s)
- **Registry entry:** Add slug + category to `src/lib/component-registry.ts`
- **Demo entry:** Add to `src/lib/component-demos.tsx` (importLine, exampleCode, variants)
- **Workbench page:** Auto-served by existing `src/app/workbench/components/[slug]/page.tsx` dynamic route
- **Tier 1 updates:** Edit existing entries in `src/lib/component-demos.tsx` only — no new files
- **Product Patterns (Tier 5):** New route `src/app/workbench/patterns/[slug]/page.tsx`

**New sidebar categories:**
- `"Metrics & Feeds"` — Stat Card, Avatar Group, Activity Feed, Timeline
- `"Planning"` — Stepper, Kanban Board, Data Table (Full), Gantt
- `"Application Primitives"` — ID Chip, Linked Chip, Health Indicator, Readiness Item, Stepper Counter, L1 Distribution Bar
- `"AI Features"` — AI Action Bar, AI Draft State, AI Suggestion Card
- `"Application Components"` — all T3/T4 compound components

---

## Phase Overview

| Phase | Items | Focus |
|---|---|---|
| 1 | T4-02, T4-04, T4-07, T4-08 | Foundation atoms |
| 2 | T4-01, T4-03, T4-06 | NOS display atoms |
| 3 | T2-02, T2-03, T2-08 | Free-equivalent lightweight |
| 4 | T2-01, T2-06, T2-04 | Free-equivalent medium |
| 5 | T2-05, T2-07 | Free-equivalent heavy |
| 6 | T3-05, T4-10, T3-13 | AI & document compounds |
| 7 | T3-06, T4-09, T4-05 | Domain model & planning cards |
| 8 | T3-10, T3-01, T3-03, T3-04 | Governance components |
| 9 | T3-11, T3-02, T3-07, T3-08, T3-09, T3-12, T3-14 | Remaining compounds |
| 10 | T1-01 → T1-06 | Tier 1 workbench demo updates |
| 11 | FS-01 → FS-06 | Product Patterns section |

---

## PHASE 1 — Foundation Atoms (4 items)

### P1-1 · ID Reference Chip `T4-02`
**File:** `src/components/ui/id-chip.tsx`
```typescript
interface IdChipProps extends React.HTMLAttributes<HTMLElement> {
  id: string        // e.g. "EPIC-014"
  href?: string
}
```
`font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground border border-border`
When `href` set, renders as `<a>` with hover state.
**Registry:** `"Application Primitives"` / `"id-chip"`

### P1-2 · Linked Reference Chip `T4-04`
**File:** `src/components/ui/linked-chip.tsx`
```typescript
type LinkedChipType = "epic" | "story" | "risk" | "question" | "assumption" | "component"
interface LinkedChipProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  id: string
  type: LinkedChipType
  href?: string
}
```
Type-to-icon: Link2/epic, FileText/story, AlertTriangle/risk, HelpCircle/question, CheckSquare/assumption, Box/component
**Registry:** `"Application Primitives"` / `"linked-chip"`

### P1-3 · Traceability Health Indicator `T4-07`
**File:** `src/components/ui/health-indicator.tsx`
```typescript
interface HealthIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "healthy" | "warning" | "error"
  message?: string
  showLabel?: boolean   // default true
}
```
healthy→CheckCircle+`var(--success)`, warning→AlertTriangle+`var(--warning)`, error→XCircle+`var(--error)`
Wraps in `<Tooltip>` when `message` set.
**Registry:** `"Application Primitives"` / `"health-indicator"`

### P1-4 · Readiness Checklist Item `T4-08`
**File:** `src/components/ui/readiness-item.tsx`
```typescript
interface ReadinessItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  status: "pass" | "warning" | "fail"
}
```
pass→CheckCircle2 green, warning→AlertTriangle amber, fail→XCircle red. Display-only.
**Registry:** `"Application Primitives"` / `"readiness-item"`

---

## PHASE 2 — NOS Display Atoms (3 items)

### P2-1 · Stepper Progress Counter `T4-01`
**File:** `src/components/ui/stepper-counter.tsx`
```typescript
interface StepperCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number; total: number; percent: number
}
```
`Stage {current} of {total}` + mini `<Progress value={percent} className="w-16 h-1.5" />` + `{percent}%`
**Registry:** `"Application Primitives"` / `"stepper-counter"`

### P2-2 · L1 Distribution Bar `T4-03`
**File:** `src/components/ui/l1-distribution-bar.tsx`
```typescript
type L1Type = "Experience" | "Workflow" | "Integration" | "Foundation"
interface L1Segment { type: L1Type; value: number; label?: string }
interface L1DistributionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  segments: L1Segment[]
  showLegend?: boolean
  height?: "sm" | "md"
}
```
Experience=`var(--brand-600)`, Workflow=`var(--info)`, Integration=`var(--success)`, Foundation=`var(--warning)`
**Registry:** `"Application Primitives"` / `"l1-distribution-bar"`

### P2-3 · AI Action Bar `T4-06`
**File:** `src/components/ui/ai-action-bar.tsx`
```typescript
interface AIAction { label: string; onClick: () => void; disabled?: boolean }
interface AIActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: AIAction[]
  label?: string
}
```
Sparkles icon + muted label + underline action buttons
**Registry:** `"AI Features"` / `"ai-action-bar"`

---

## PHASE 3 — Free Equivalents: Lightweight (3 items)

### P3-1 · Avatar Group `T2-02`
Already in `src/components/ui/avatar.tsx` as `AvatarGroup` + `AvatarGroupCount`.
Action: add registry entry (`"Metrics & Feeds"` / `"avatar-group"`) + demo entry only.

### P3-2 · Stat Card `T2-03`
**File:** `src/components/ui/stat-card.tsx`
```typescript
interface StatCardTrend { direction: "up" | "down" | "neutral"; value: string; label?: string }
interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string; value: string | number; subLabel?: string
  trend?: StatCardTrend; icon?: React.ReactNode
}
```
Composes: `Card`, `CardContent`. Trend colours: up=`var(--success)`, down=`var(--error)`, neutral=muted
**Registry:** `"Metrics & Feeds"` / `"stat-card"`

### P3-3 · Approval Timeline `T2-08`
**File:** `src/components/ui/timeline.tsx`
```typescript
type TimelineStepStatus = "complete" | "pending" | "rejected"
interface TimelineStep { role: string; reviewer?: string; status: TimelineStepStatus; timestamp?: string; note?: string }
interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TimelineStep[]
  variant?: "default" | "compact"
}
```
Status colours via semantic vars. CheckCircle2/Clock/XCircle icons.
**Registry:** `"Metrics & Feeds"` / `"timeline"`

---

## PHASE 4 — Free Equivalents: Medium (3 items)

### P4-1 · Stepper `T2-01`
**Install:** `npm install @stepperize/react`
**File:** `src/components/ui/stepper.tsx`
```typescript
interface StepperStep { id: string; label: string; description?: string; icon?: React.ReactNode }
interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[]; currentStep: number
  orientation?: "horizontal" | "vertical"
  variant?: "dots" | "numbered" | "icons"
  completedSteps?: number[]
  onStepClick?: (index: number) => void
}
```
**Registry:** `"Planning"` / `"stepper"`

### P4-2 · Data Table `T2-06`
**Install:** `npm install @tanstack/react-table`
**File:** `src/components/ui/data-table.tsx`
Remove `"data-table"` from `docOnlySlugs`.
Composes: existing Table, Input, Button, Checkbox, DropdownMenu
**Registry:** update existing `"data-table"` in `"Data Display"`

### P4-3 · Activity Feed `T2-04`
**File:** `src/components/ui/activity-feed.tsx`
```typescript
interface ActivityFeedItem { id: string; actor: ActivityActor; action: string; subject: string; timestamp: string; href?: string }
interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ActivityFeedItem[]
  maxItems?: number
}
```
Composes: `Avatar`, `AvatarFallback`, `AvatarImage`
**Registry:** `"Metrics & Feeds"` / `"activity-feed"`

---

## PHASE 5 — Free Equivalents: Heavy (2 items)

### P5-1 · Kanban Board `T2-05`
**File:** `src/components/ui/kanban-board.tsx`
No extra drag-drop library — plain React DnD via HTML5 API.
```typescript
interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: KanbanColumn[]
  onItemMove?: (itemId: string, sourceColumnId: string, targetColumnId: string, newIndex: number) => void
  columnMinWidth?: number
}
```
Composes: `Card`, `ScrollArea`
**Registry:** `"Planning"` / `"kanban-board"`

### P5-2 · Gantt Timeline `T2-07`
**Install:** `npx kibo-ui add gantt`
NOS token overrides: task bars=`var(--primary)`, today line=`var(--error)/60`
**Registry:** `"Planning"` / `"gantt"`

---

## PHASE 6 — AI & Document Pattern Compounds (3 items)

### P6-1 · Section Document Card `T3-05`
**File:** `src/components/ui/section-document-card.tsx`
Composes: `Card`, `CardHeader`, `CardContent` + `Badge` + `Button` + `AIActionBar`
**Registry:** `"Application Components"` / `"section-document-card"`

### P6-2 · AI Draft State `T4-10`
**File:** `src/components/ui/ai-draft-state.tsx`
3 states: draft (AI Draft badge + 2 buttons) → reviewed (Reviewed badge + 1 button) → approved (Approved badge, no buttons)
**Registry:** `"AI Features"` / `"ai-draft-state"`

### P6-3 · AI Suggestion Card `T3-13`
**File:** `src/components/ui/ai-suggestion-card.tsx`
Types: suggestion/hint/match/warning → icons: Sparkles/Lightbulb/GitMerge/AlertTriangle
Composes: `Card`, `CardContent`, `Badge`, `Button`
**Registry:** `"AI Features"` / `"ai-suggestion-card"`

---

## PHASE 7 — Domain Model & Planning Cards (3 items)

### P7-1 · L1 Component Card `T3-06`
**File:** `src/components/ui/l1-component-card.tsx`
Depends: HealthIndicator, L1DistributionBar
Composes: `Card`, `Badge`, `Button`, `DropdownMenu`, `HealthIndicator`
**Registry:** `"Application Components"` / `"l1-component-card"`

### P7-2 · Epic Card `T4-09`
**File:** `src/components/ui/epic-card.tsx`
Depends: IdChip, HealthIndicator
Composes: `Card`, `Badge`, `IdChip`, `HealthIndicator`
**Registry:** `"Application Components"` / `"epic-card"`

### P7-3 · Phase Column Header `T4-05`
**File:** `src/components/ui/phase-column-header.tsx`
Depends: L1DistributionBar
variance: positive=`var(--error)`, negative=`var(--success)`, zero=muted
**Registry:** `"Application Components"` / `"phase-column-header"`

---

## PHASE 8 — Governance Components (4 items)

### P8-1 · Risk Heatmap `T3-10`
**File:** `src/components/ui/risk-heatmap.tsx`
CSS grid 3×3, score ≥6=error, 3-5=warning, <3=success. No library.
**Registry:** `"Application Components"` / `"risk-heatmap"`

### P8-2 · Open Question Row `T3-01`
**File:** `src/components/ui/open-question-row.tsx`
Depends: IdChip, LinkedChip
**Registry:** `"Application Components"` / `"open-question-row"`

### P8-3 · Approval Workflow Card `T3-03`
**File:** `src/components/ui/approval-workflow-card.tsx`
Depends: Timeline
**Registry:** `"Application Components"` / `"approval-workflow-card"`

### P8-4 · Review Checklist Row `T3-04`
**File:** `src/components/ui/review-checklist-row.tsx`
Depends: ReadinessItem
**Registry:** `"Application Components"` / `"review-checklist-row"`

---

## PHASE 9 — Remaining Compounds (7 items)

| Slug | Gap | Depends on |
|---|---|---|
| `output-card` | T3-11 | ReadinessItem |
| `intake-snapshot-card` | T3-02 | Card, Badge |
| `estimation-rollup-tree` | T3-07 | Collapsible, Table |
| `estimate-detail-drawer` | T3-08 | Sheet, Collapsible |
| `reconciliation-panel` | T3-09 | StatCard |
| `team-roster-panel` | T3-12 | Tabs, Table, Avatar |
| `portfolio-pipeline-view` | T3-14 | DataTable, KanbanBoard |

All: Category `"Application Components"`

---

## PHASE 10 — Tier 1 Demo Updates (6 items)

Updates to `src/lib/component-demos.tsx` only — no new files:

| Gap | Component | Update |
|---|---|---|
| T1-01 | Badge | Add 9 stage/status colour variants |
| T1-02 | Progress | Add budget allocation (3 colour-coded bars) + labelled % |
| T1-03 | Breadcrumb | Add workspace nav variant (back-arrow + status badge) |
| T1-04 | Alert | Add dismissible banner with badge pill + × button |
| T1-05 | Toggle | Add labelled mode switch (Standard ↔ What-if) |
| T1-06 | Tabs | Edit `tabs.tsx` to add `variant="underline"` + update demo |

---

## PHASE 11 — Product Patterns Section (6 items)

New route: `src/app/workbench/patterns/[slug]/page.tsx`
Add `patterns` group to sidebar nav.

| Slug | Gap | Content |
|---|---|---|
| `workspace-shell` | FS-01 | Annotated shell diagram with zone labels |
| `portfolio-dashboard` | FS-02 | StatCards + DataTable + ActivityFeed |
| `domain-model-board` | FS-03 | 4-column L1ComponentCard board + Sheet drill-down |
| `estimation-screen` | FS-04 | 4-tab: Overview/L3 Table/Roll-Up/Reconciliation |
| `scope-document` | FS-05 | Full-page doc layout with 14-section left nav |
| `reporting-admin` | FS-06 | Reporting Dashboard + Admin Settings wireframes |

---

## External Dependencies

| Package | Used by | Install |
|---|---|---|
| `@stepperize/react` | Stepper (T2-01) | `npm install @stepperize/react` |
| `@tanstack/react-table` | DataTable (T2-06) | `npm install @tanstack/react-table` |
| kibo-ui Gantt | Gantt (T2-07) | `npx kibo-ui add gantt` |

---

## Dependency Graph

```
PHASE 1 (no deps): IdChip, LinkedChip, HealthIndicator, ReadinessItem
PHASE 2 (no deps): StepperCounter→Progress✅, L1DistributionBar, AIActionBar
PHASE 3: AvatarGroup(exists), StatCard→Card✅, Timeline
PHASE 4: Stepper→@stepperize, DataTable→@tanstack, ActivityFeed→Avatar✅
PHASE 5: KanbanBoard, Gantt→kibo-ui
PHASE 6: SectionDocumentCard→AIActionBar✅, AIDraftState, AISuggestionCard
PHASE 7: L1ComponentCard→HealthIndicator✅+L1Bar✅, EpicCard→IdChip✅+Health✅, PhaseColumnHeader→L1Bar✅
PHASE 8: RiskHeatmap, OpenQuestionRow→IdChip✅+LinkedChip✅, ApprovalWorkflowCard→Timeline✅, ReviewChecklistRow→ReadinessItem✅
PHASE 9: OutputCard→ReadinessItem✅, IntakeSnapshotCard, EstimationRollupTree, EstimateDetailDrawer, ReconciliationPanel→StatCard✅, TeamRosterPanel, PortfolioPipelineView→DataTable✅+Kanban✅
PHASE 10: Badge/Progress/Breadcrumb/Alert/Toggle demos; Tabs underline variant
PHASE 11: All pattern pages (depend on phases 3-9)
```

---

*Plan version: 1.0 — May 2026 | Based on: NOS_Component_Gap_Analysis_v2.md*
