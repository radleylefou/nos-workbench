"use client"

import * as React from "react"
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Columns3,
  FileCheck2,
  FileText,
  Folder,
  FolderOpen,
  ListChecks,
  Milestone,
  PanelTop,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DateSelector, formatDateSelectorValue, type DateSelectorValue } from "@/components/ui/date-selector"
import { Filters, type Filter, type FilterFieldConfig } from "@/components/ui/filters"
import {
  Frame,
  FrameContent,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Sortable,
  SortableItemControls,
  SortableItemHandle,
} from "@/components/ui/sortable"
import { Tree, type TreeNode } from "@/components/ui/tree"

const pipelineFields: FilterFieldConfig[] = [
  {
    key: "stage",
    label: "Stage",
    type: "multiselect",
    group: "Pipeline",
    options: [
      { value: "triage", label: "Triage" },
      { value: "solution", label: "Solution definition" },
      { value: "estimation", label: "Estimation" },
      { value: "review", label: "Client review" },
    ],
  },
  {
    key: "health",
    label: "Health",
    type: "select",
    group: "Status",
    options: [
      { value: "healthy", label: "Healthy" },
      { value: "watch", label: "Watch" },
      { value: "risk", label: "Risk" },
    ],
  },
  {
    key: "owner",
    label: "Owner",
    type: "select",
    group: "Team",
    options: [
      { value: "alice", label: "Alice Rivera" },
      { value: "marcus", label: "Marcus James" },
      { value: "priya", label: "Priya Kapoor" },
    ],
  },
  { key: "probability", label: "Probability", type: "number", group: "Forecast", defaultOperator: "greater_than" },
  { key: "close", label: "Close date", type: "date", group: "Forecast" },
]

const staffingFields: FilterFieldConfig[] = [
  {
    key: "role",
    label: "Role",
    type: "multiselect",
    group: "People",
    options: [
      { value: "architect", label: "Solution architect" },
      { value: "lead", label: "Delivery lead" },
      { value: "finance", label: "Finance partner" },
      { value: "strategist", label: "Product strategist" },
    ],
  },
  {
    key: "availability",
    label: "Availability",
    type: "select",
    group: "Capacity",
    options: [
      { value: "available", label: "Available" },
      { value: "limited", label: "Limited" },
      { value: "full", label: "Fully allocated" },
    ],
  },
  { key: "utilization", label: "Utilization", type: "number", group: "Capacity", defaultOperator: "less_than" },
  { key: "module", label: "Module", type: "select", group: "NOS", options: [
    { value: "scope", label: "Scope" },
    { value: "staff", label: "Staff" },
    { value: "budget", label: "Budget" },
    { value: "manage", label: "Manage" },
  ] },
]

const budgetFields: FilterFieldConfig[] = [
  {
    key: "approval",
    label: "Approval",
    type: "select",
    group: "Review",
    options: [
      { value: "approved", label: "Approved" },
      { value: "review", label: "Needs review" },
      { value: "blocked", label: "Blocked" },
    ],
  },
  { key: "variance", label: "Variance", type: "number", group: "Financials", defaultOperator: "less_than" },
  { key: "margin", label: "Margin", type: "number", group: "Financials", defaultOperator: "greater_than" },
  { key: "period", label: "Billing period", type: "date", group: "Timeline" },
]

const scopeTree: TreeNode[] = [
  {
    id: "scope",
    label: "Clinical portal scope",
    icon: <FolderOpen className="size-4" />,
    meta: <Badge variant="secondary">4 L1</Badge>,
    children: [
      {
        id: "experience",
        label: "Experience",
        icon: <Folder className="size-4" />,
        meta: <span className="text-xs text-muted-foreground">8 stories</span>,
        children: [
          { id: "intake", label: "Patient intake", icon: <FileText className="size-4" />, meta: <Badge variant="outline">Ready</Badge> },
          { id: "triage", label: "Referral triage", icon: <FileText className="size-4" />, meta: <Badge variant="secondary">Draft</Badge> },
        ],
      },
      {
        id: "workflow",
        label: "Workflow",
        icon: <Folder className="size-4" />,
        meta: <span className="text-xs text-muted-foreground">6 stories</span>,
        children: [
          { id: "routing", label: "Care team routing", icon: <FileText className="size-4" />, meta: <Badge variant="outline">Review</Badge> },
          { id: "handoff", label: "Specialist handoff", icon: <FileText className="size-4" />, meta: <Badge variant="secondary">Draft</Badge> },
        ],
      },
      {
        id: "integration",
        label: "Integration",
        icon: <Folder className="size-4" />,
        meta: <span className="text-xs text-muted-foreground">5 stories</span>,
        children: [
          { id: "ehr", label: "EHR sync", icon: <FileText className="size-4" />, meta: <Badge variant="outline">Ready</Badge> },
          { id: "identity", label: "Identity handoff", icon: <FileText className="size-4" />, meta: <Badge variant="secondary">Blocked</Badge> },
        ],
      },
    ],
  },
]

const deliveryTree: TreeNode[] = [
  {
    id: "release",
    label: "Release 1",
    icon: <Milestone className="size-4" />,
    meta: <span className="text-xs text-muted-foreground">72%</span>,
    children: [
      {
        id: "sprint-1",
        label: "Sprint 1",
        icon: <ListChecks className="size-4" />,
        meta: <Badge variant="outline">Complete</Badge>,
        children: [
          { id: "api", label: "API contract validation", icon: <FileCheck2 className="size-4" /> },
          { id: "ui", label: "Scope workspace shell", icon: <FileCheck2 className="size-4" /> },
        ],
      },
      {
        id: "sprint-2",
        label: "Sprint 2",
        icon: <ListChecks className="size-4" />,
        meta: <Badge variant="secondary">In motion</Badge>,
        children: [
          { id: "grid", label: "Estimate roll-up grid", icon: <FileText className="size-4" /> },
          { id: "status", label: "Weekly status automation", icon: <FileText className="size-4" /> },
        ],
      },
    ],
  },
]

const skillsTree: TreeNode[] = [
  {
    id: "skills",
    label: "Delivery capabilities",
    icon: <Users className="size-4" />,
    children: [
      {
        id: "strategy",
        label: "Product strategy",
        icon: <Folder className="size-4" />,
        children: [
          { id: "discovery", label: "Discovery facilitation", meta: <Badge variant="outline">6 people</Badge> },
          { id: "roadmap", label: "Roadmap planning", meta: <Badge variant="outline">4 people</Badge> },
        ],
      },
      {
        id: "delivery",
        label: "Delivery operations",
        icon: <Folder className="size-4" />,
        children: [
          { id: "release-mgmt", label: "Release management", meta: <Badge variant="outline">5 people</Badge> },
          { id: "risk-mgmt", label: "Risk management", meta: <Badge variant="outline">7 people</Badge> },
        ],
      },
    ],
  },
]

type PriorityItem = {
  id: string
  title: string
  detail: string
  owner: string
  tone: "primary" | "warning" | "error" | "success"
}

const initialPriorities: PriorityItem[] = [
  { id: "p1", title: "Resolve integration owner gap", detail: "Guide priority for Northstar HealthTech", owner: "Priya", tone: "error" },
  { id: "p2", title: "Confirm final Scope assumptions", detail: "Blocks estimate approval for Acme Health", owner: "Alice", tone: "warning" },
  { id: "p3", title: "Approve Budget variance narrative", detail: "Client review pack due Friday", owner: "Nora", tone: "primary" },
  { id: "p4", title: "Staff delivery lead for release two", detail: "Capacity forecast needs owner", owner: "Marcus", tone: "success" },
]

const initialDocuments = [
  { id: "doc-1", title: "Executive summary", state: "Ready", icon: <PanelTop className="size-4" /> },
  { id: "doc-2", title: "Solution hierarchy", state: "Review", icon: <Columns3 className="size-4" /> },
  { id: "doc-3", title: "Budget model", state: "Draft", icon: <FileText className="size-4" /> },
  { id: "doc-4", title: "Risk register", state: "Needs input", icon: <AlertTriangle className="size-4" /> },
]

function FiltersSummary({ filters }: { filters: Filter[] }) {
  return (
    <div className="rounded-md border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
      {filters.length} active filter{filters.length === 1 ? "" : "s"} shaping the current view.
    </div>
  )
}

export function FiltersPipelineDemo() {
  const [filters, setFilters] = React.useState<Filter[]>([
    { id: "stage-estimation", field: "stage", operator: "is_any_of", values: ["estimation", "review"] },
    { id: "health-watch", field: "health", operator: "is", values: ["watch"] },
    { id: "probability", field: "probability", operator: "greater_than", values: ["60"] },
  ])

  return (
    <div className="flex w-full flex-col gap-3">
      <Filters filters={filters} fields={pipelineFields} onChange={setFilters} addLabel="Filter pipeline" />
      <FiltersSummary filters={filters} />
    </div>
  )
}

export function FiltersStaffingDemo() {
  const [filters, setFilters] = React.useState<Filter[]>([
    { id: "availability", field: "availability", operator: "is", values: ["limited"] },
    { id: "utilization", field: "utilization", operator: "less_than", values: ["90"] },
  ])

  return (
    <div className="flex w-full flex-col gap-3">
      <Filters filters={filters} fields={staffingFields} onChange={setFilters} addLabel="Filter capacity" />
      <FiltersSummary filters={filters} />
    </div>
  )
}

export function FiltersBudgetDemo() {
  const [filters, setFilters] = React.useState<Filter[]>([
    { id: "approval-review", field: "approval", operator: "is", values: ["review"] },
    { id: "variance", field: "variance", operator: "less_than", values: ["0"] },
  ])

  return (
    <div className="flex w-full flex-col gap-3">
      <Filters filters={filters} fields={budgetFields} onChange={setFilters} addLabel="Filter budget" />
      <FiltersSummary filters={filters} />
    </div>
  )
}

export function FiltersHealthDemo() {
  const [filters, setFilters] = React.useState<Filter[]>([
    { id: "health-risk", field: "health", operator: "is", values: ["risk"] },
    { id: "close", field: "close", operator: "before", values: ["2026-06-15"] },
  ])

  return (
    <div className="flex w-full flex-col gap-3">
      <Filters filters={filters} fields={pipelineFields} onChange={setFilters} addLabel="Filter health" />
      <FiltersSummary filters={filters} />
    </div>
  )
}

function FrameMetric({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-md border border-border bg-background px-3 py-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={tone ?? "mt-1 text-lg font-semibold tabular-nums text-foreground"}>{value}</div>
    </div>
  )
}

export function FrameDefaultDemo() {
  return (
    <Frame className="w-full">
      <FramePanel>
        <FrameHeader>
          <div>
            <FrameTitle>Pipeline review</FrameTitle>
            <FrameDescription>Shared operating frame for the weekly commercial review.</FrameDescription>
          </div>
          <Badge variant="secondary">Live</Badge>
        </FrameHeader>
        <FrameContent className="grid gap-3 sm:grid-cols-3">
          <FrameMetric label="Qualified pipeline" value="$1.24M" />
          <FrameMetric label="At-risk accounts" value="4" />
          <FrameMetric label="Next decisions" value="12" />
        </FrameContent>
        <FrameFooter>
          <span>Last updated 12 min ago</span>
          <Button variant="outline" size="sm">Open review</Button>
        </FrameFooter>
      </FramePanel>
    </Frame>
  )
}

export function FrameDenseDemo() {
  return (
    <Frame size="dense" className="w-full">
      <FramePanel>
        <FrameHeader>
          <div>
            <FrameTitle>Status snapshot</FrameTitle>
            <FrameDescription>Compact frame for a narrow dashboard column.</FrameDescription>
          </div>
          <CheckCircle2 className="size-4 text-success" />
        </FrameHeader>
        <FrameContent className="space-y-3">
          {["Timeline", "Scope", "Delivery"].map((item, index) => (
            <div key={item} className="flex items-center justify-between gap-3">
              <span className="text-sm">{item}</span>
              <Progress value={[84, 72, 68][index]} className="h-2 max-w-32" />
            </div>
          ))}
        </FrameContent>
      </FramePanel>
    </Frame>
  )
}

export function FrameSeparatedDemo() {
  return (
    <Frame variant="separated" className="w-full">
      <FramePanel>
        <FrameHeader>
          <div>
            <FrameTitle>Scope readiness</FrameTitle>
            <FrameDescription>Separate panels keep the summary and decision trail distinct.</FrameDescription>
          </div>
        </FrameHeader>
        <FrameContent className="grid gap-3 sm:grid-cols-2">
          <FrameMetric label="Ready sections" value="8 of 12" />
          <FrameMetric label="Open questions" value="5" />
        </FrameContent>
      </FramePanel>
      <FramePanel>
        <FrameContent className="flex flex-wrap gap-2">
          <Badge variant="outline">Legal review</Badge>
          <Badge variant="outline">Integration assumption</Badge>
          <Badge variant="outline">Capacity note</Badge>
        </FrameContent>
      </FramePanel>
    </Frame>
  )
}

export function FrameStackedDemo() {
  return (
    <Frame variant="stacked" className="w-full">
      {["Discovery", "Solution design", "Estimate"].map((phase, index) => (
        <FramePanel key={phase}>
          <FrameContent className="flex items-center justify-between gap-4">
            <div>
              <div className="font-medium">{phase}</div>
              <div className="text-xs text-muted-foreground">{[6, 9, 4][index]} linked work items</div>
            </div>
            <Progress value={[100, 76, 42][index]} className="h-2 max-w-40" />
          </FrameContent>
        </FramePanel>
      ))}
    </Frame>
  )
}

export function FrameBorderlessDemo() {
  return (
    <Frame variant="borderless" className="w-full">
      <FramePanel>
        <FrameHeader>
          <div>
            <FrameTitle>Guide focus</FrameTitle>
            <FrameDescription>Borderless frames can sit inside larger app surfaces.</FrameDescription>
          </div>
          <Sparkles className="size-4 text-primary" />
        </FrameHeader>
        <FrameContent className="grid gap-3 sm:grid-cols-3">
          <FrameMetric label="Priority drift" value="Low" />
          <FrameMetric label="Focus score" value="86%" />
          <FrameMetric label="Blocked work" value="3" />
        </FrameContent>
      </FramePanel>
    </Frame>
  )
}

export function DateSelectorStatusDemo() {
  const [value, setValue] = React.useState<DateSelectorValue>({
    period: "day",
    operator: "is",
    startDate: "2026-06-05",
    year: 2026,
    month: 5,
    quarter: 1,
    halfYear: 0,
  })

  return (
    <div className="flex w-full flex-col gap-3 sm:max-w-md">
      <DateSelector label="Status date" value={value} onChange={setValue} />
      <p className="text-sm text-muted-foreground">{formatDateSelectorValue(value)}</p>
    </div>
  )
}

export function DateSelectorBillingDemo() {
  const [value, setValue] = React.useState<DateSelectorValue>({
    period: "month",
    operator: "between",
    year: 2026,
    month: 5,
    rangeStart: { year: 2026, value: 4 },
    rangeEnd: { year: 2026, value: 6 },
  })

  return (
    <div className="flex w-full flex-col gap-3 sm:max-w-md">
      <DateSelector label="Billing period" value={value} onChange={setValue} periodTypes={["month", "quarter", "year"]} />
      <p className="text-sm text-muted-foreground">{formatDateSelectorValue(value)}</p>
    </div>
  )
}

export function DateSelectorStaffingDemo() {
  const [value, setValue] = React.useState<DateSelectorValue>({
    period: "quarter",
    operator: "is",
    year: 2026,
    quarter: 2,
  })

  return (
    <div className="flex w-full flex-col gap-3 sm:max-w-md">
      <DateSelector label="Capacity window" value={value} onChange={setValue} periodTypes={["quarter", "half-year", "year"]} />
      <p className="text-sm text-muted-foreground">{formatDateSelectorValue(value)}</p>
    </div>
  )
}

export function DateSelectorPlanningDemo() {
  const [value, setValue] = React.useState<DateSelectorValue>({
    period: "half-year",
    operator: "after",
    year: 2026,
    halfYear: 0,
  })

  return (
    <div className="flex w-full flex-col gap-3 sm:max-w-md">
      <DateSelector label="Planning horizon" value={value} onChange={setValue} periodTypes={["half-year", "year"]} allowRange={false} />
      <p className="text-sm text-muted-foreground">{formatDateSelectorValue(value)}</p>
    </div>
  )
}

export function TreeScopeDemo() {
  const [selectedId, setSelectedId] = React.useState("intake")

  return (
    <div className="w-full rounded-lg border border-border bg-background p-3">
      <Tree data={scopeTree} defaultExpandedIds={["scope", "experience", "workflow", "integration"]} selectedId={selectedId} onSelectedIdChange={setSelectedId} showLines />
    </div>
  )
}

export function TreeDeliveryDemo() {
  const [selectedId, setSelectedId] = React.useState("grid")

  return (
    <div className="w-full rounded-lg border border-border bg-background p-3">
      <Tree data={deliveryTree} defaultExpandedIds={["release", "sprint-1", "sprint-2"]} selectedId={selectedId} onSelectedIdChange={setSelectedId} showLines />
    </div>
  )
}

export function TreeSkillsDemo() {
  const [selectedId, setSelectedId] = React.useState("risk-mgmt")

  return (
    <div className="w-full rounded-lg border border-border bg-background p-3">
      <Tree data={skillsTree} defaultExpandedIds={["skills", "strategy", "delivery"]} selectedId={selectedId} onSelectedIdChange={setSelectedId} />
    </div>
  )
}

export function SortablePriorityDemo() {
  const [items, setItems] = React.useState(initialPriorities)

  return (
    <Sortable
      value={items}
      onValueChange={setItems}
      getItemValue={(item) => item.id}
      renderItem={(item, state) => (
        <div className="flex items-center gap-3 p-3">
          <SortableItemHandle />
          <div className="min-w-0 flex-1">
            <div className="font-medium text-foreground">{item.title}</div>
            <div className="text-xs text-muted-foreground">{item.detail}</div>
          </div>
          <Avatar size="sm">
            <AvatarFallback>{item.owner.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <Badge variant={item.tone === "error" ? "destructive" : "secondary"}>{item.owner}</Badge>
          <SortableItemControls
            onMoveUp={state.moveUp}
            onMoveDown={state.moveDown}
            disableMoveUp={state.isFirst}
            disableMoveDown={state.isLast}
          />
        </div>
      )}
    />
  )
}

export function SortableDocumentDemo() {
  const [items, setItems] = React.useState(initialDocuments)

  return (
    <Sortable
      value={items}
      onValueChange={setItems}
      getItemValue={(item) => item.id}
      layout="grid"
      renderItem={(item, state) => (
        <div className="flex items-center gap-3 p-3">
          <SortableItemHandle />
          <span className="text-muted-foreground">{item.icon}</span>
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium text-foreground">{item.title}</div>
            <div className="text-xs text-muted-foreground">{item.state}</div>
          </div>
          <SortableItemControls
            onMoveUp={state.moveUp}
            onMoveDown={state.moveDown}
            disableMoveUp={state.isFirst}
            disableMoveDown={state.isLast}
          />
        </div>
      )}
    />
  )
}

export function SortableNestedChecklistDemo() {
  const [items, setItems] = React.useState([
    { id: "1", title: "Discovery readout", detail: "Parent section", level: 0 },
    { id: "2", title: "Stakeholder map", detail: "Nested requirement", level: 1 },
    { id: "3", title: "Workflow inventory", detail: "Nested requirement", level: 1 },
    { id: "4", title: "Estimate approval", detail: "Parent section", level: 0 },
  ])

  return (
    <Sortable
      value={items}
      onValueChange={setItems}
      getItemValue={(item) => item.id}
      renderItem={(item, state) => (
        <div className="flex items-center gap-3 p-3" style={{ paddingLeft: `${item.level * 28 + 12}px` }}>
          <SortableItemHandle />
          <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
            {item.level ? <FileText className="size-4" /> : <Folder className="size-4" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-foreground">{item.title}</div>
            <div className="text-xs text-muted-foreground">{item.detail}</div>
          </div>
          <SortableItemControls
            onMoveUp={state.moveUp}
            onMoveDown={state.moveDown}
            disableMoveUp={state.isFirst}
            disableMoveDown={state.isLast}
          />
        </div>
      )}
    />
  )
}

export function FilteredFrameDemo() {
  return (
    <Frame variant="separated" className="w-full">
      <FramePanel>
        <FrameHeader>
          <div>
            <FrameTitle>Operational search frame</FrameTitle>
            <FrameDescription>Combines a compact search header with a filterable result surface.</FrameDescription>
          </div>
        </FrameHeader>
        <FrameContent className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search engagements..." />
          </div>
          <Separator />
          <div className="grid gap-2 sm:grid-cols-3">
            <Badge variant="secondary" className="justify-center gap-1.5 py-1.5">
              <Target className="size-3.5" />
              8 qualified
            </Badge>
            <Badge variant="secondary" className="justify-center gap-1.5 py-1.5">
              <Clock3 className="size-3.5" />
              3 due this week
            </Badge>
            <Badge variant="secondary" className="justify-center gap-1.5 py-1.5">
              <ShieldCheck className="size-3.5" />
              5 healthy
            </Badge>
          </div>
        </FrameContent>
      </FramePanel>
    </Frame>
  )
}
