"use client"

import { type ColumnDef } from "@tanstack/react-table"
import {
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  Columns3,
  GripVertical,
  Layers3,
  MoreHorizontal,
  Pin,
  Save,
  SlidersHorizontal,
  Star,
  UserRound,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataGrid } from "@/components/ui/data-grid"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

type Engagement = {
  id: string
  client: string
  module: string
  stage: string
  health: "healthy" | "watch" | "risk"
  owner: string
  ownerRole: string
  budget: number
  probability: number
  lastUpdated: string
  nextStep: string
}

type FinancialReview = {
  id: string
  account: string
  workstream: string
  budget: number
  burn: number
  variance: number
  margin: number
  approval: "approved" | "review" | "blocked"
  owner: string
}

type Allocation = {
  id: string
  person: string
  initials: string
  role: string
  module: string
  capacity: number
  utilization: number
  availability: "available" | "limited" | "full"
  location: string
}

type Risk = {
  id: string
  risk: string
  severity: "low" | "medium" | "high"
  owner: string
  due: string
  progress: number
  status: "open" | "mitigating" | "closed"
  note: string
}

type PrioritizedEngagement = Engagement & {
  priority: "Pinned" | "Standard"
  group: "Pipeline" | "Delivery" | "Staffing"
  confidence: "High" | "Medium" | "Low"
}

const engagements: Engagement[] = [
  { id: "ENG-1042", client: "Acme Health", module: "Scope", stage: "Estimation", health: "healthy", owner: "Alice Rivera", ownerRole: "Account lead", budget: 180000, probability: 75, lastUpdated: "2h ago", nextStep: "Confirm final scope" },
  { id: "ENG-1043", client: "Northstar HealthTech", module: "Estimate", stage: "Client Review", health: "watch", owner: "Marcus James", ownerRole: "Delivery lead", budget: 240000, probability: 90, lastUpdated: "4h ago", nextStep: "Send revised budget" },
  { id: "ENG-1044", client: "Meridian Medical", module: "Engage", stage: "Solution Definition", health: "risk", owner: "Sam Lee", ownerRole: "Strategist", budget: 120000, probability: 50, lastUpdated: "Yesterday", nextStep: "Resolve owner gap" },
  { id: "ENG-1045", client: "Pacific Coast Clinics", module: "Prospect", stage: "Triage", health: "watch", owner: "Alice Rivera", ownerRole: "Account lead", budget: 80000, probability: 30, lastUpdated: "2d ago", nextStep: "Qualify buying group" },
  { id: "ENG-1046", client: "Summit Care Group", module: "Staff", stage: "Estimation", health: "healthy", owner: "Priya Kapoor", ownerRole: "Resource lead", budget: 160000, probability: 65, lastUpdated: "3d ago", nextStep: "Match delivery team" },
  { id: "ENG-1047", client: "Harbor Health Systems", module: "Manage", stage: "Closed", health: "healthy", owner: "Marcus James", ownerRole: "Delivery lead", budget: 200000, probability: 100, lastUpdated: "1w ago", nextStep: "Prepare kickoff" },
]

const financialReviews: FinancialReview[] = [
  { id: "FIN-2101", account: "Acme Health", workstream: "Clinical portal", budget: 180000, burn: 128000, variance: 8, margin: 34, approval: "approved", owner: "Nora Chen" },
  { id: "FIN-2102", account: "Northstar HealthTech", workstream: "Data platform", budget: 240000, burn: 204000, variance: -12, margin: 21, approval: "review", owner: "Marcus James" },
  { id: "FIN-2103", account: "Meridian Medical", workstream: "Referral workflow", budget: 120000, burn: 98000, variance: -18, margin: 16, approval: "blocked", owner: "Sam Lee" },
  { id: "FIN-2104", account: "Pacific Coast Clinics", workstream: "Patient intake", budget: 80000, burn: 43000, variance: 4, margin: 29, approval: "review", owner: "Alice Rivera" },
  { id: "FIN-2105", account: "Summit Care Group", workstream: "Staffing model", budget: 160000, burn: 91000, variance: 11, margin: 38, approval: "approved", owner: "Priya Kapoor" },
]

const allocations: Allocation[] = [
  { id: "ALC-401", person: "Priya Kapoor", initials: "PK", role: "Solution architect", module: "Scope", capacity: 72, utilization: 68, availability: "available", location: "Toronto" },
  { id: "ALC-402", person: "Marcus James", initials: "MJ", role: "Delivery lead", module: "Manage", capacity: 88, utilization: 94, availability: "full", location: "New York" },
  { id: "ALC-403", person: "Alice Rivera", initials: "AR", role: "Account lead", module: "Engage", capacity: 64, utilization: 71, availability: "limited", location: "Austin" },
  { id: "ALC-404", person: "Sam Lee", initials: "SL", role: "Product strategist", module: "Guide", capacity: 56, utilization: 48, availability: "available", location: "Remote" },
  { id: "ALC-405", person: "Nora Chen", initials: "NC", role: "Finance partner", module: "Budget", capacity: 80, utilization: 86, availability: "limited", location: "Toronto" },
]

const risks: Risk[] = [
  { id: "RSK-81", risk: "Scope sign-off delayed", severity: "medium", owner: "Alice Rivera", due: "Jun 06", progress: 55, status: "mitigating", note: "Client sponsor is reviewing change impact." },
  { id: "RSK-82", risk: "Integration owner unavailable", severity: "high", owner: "Priya Kapoor", due: "Jun 04", progress: 32, status: "open", note: "Escalated to delivery leadership." },
  { id: "RSK-83", risk: "Budget assumptions need refresh", severity: "medium", owner: "Nora Chen", due: "Jun 10", progress: 68, status: "mitigating", note: "Waiting on final vendor rate card." },
  { id: "RSK-84", risk: "Weekly status drift", severity: "low", owner: "Marcus James", due: "Jun 12", progress: 90, status: "closed", note: "Cadence restored with account team." },
  { id: "RSK-85", risk: "Capacity conflict in sprint two", severity: "high", owner: "Sam Lee", due: "Jun 07", progress: 41, status: "open", note: "Two senior contributors are double-booked." },
]

const prioritizedEngagements: PrioritizedEngagement[] = engagements.map((engagement, index) => ({
  ...engagement,
  priority: index < 2 ? "Pinned" : "Standard",
  group:
    engagement.module === "Staff"
      ? "Staffing"
      : engagement.module === "Manage"
        ? "Delivery"
        : "Pipeline",
  confidence:
    engagement.probability >= 80
      ? "High"
      : engagement.probability >= 60
        ? "Medium"
        : "Low",
}))

const healthTone: Record<Engagement["health"], string> = {
  healthy: "bg-success-50 text-success-700 ring-success-200",
  watch: "bg-warning-50 text-warning-700 ring-warning-200",
  risk: "bg-error-50 text-error-700 ring-error-200",
}

const approvalTone: Record<FinancialReview["approval"], string> = {
  approved: "bg-success-50 text-success-700 ring-success-200",
  review: "bg-warning-50 text-warning-700 ring-warning-200",
  blocked: "bg-error-50 text-error-700 ring-error-200",
}

const availabilityTone: Record<Allocation["availability"], string> = {
  available: "bg-success-50 text-success-700 ring-success-200",
  limited: "bg-warning-50 text-warning-700 ring-warning-200",
  full: "bg-error-50 text-error-700 ring-error-200",
}

const severityTone: Record<Risk["severity"], string> = {
  low: "bg-info-50 text-info-700 ring-info-200",
  medium: "bg-warning-50 text-warning-700 ring-warning-200",
  high: "bg-error-50 text-error-700 ring-error-200",
}

function StatusPill({
  children,
  className,
}: {
  children: string
  className: string
}) {
  return (
    <span className={`inline-flex h-7 items-center rounded-md px-2.5 text-xs font-medium capitalize ring-1 ${className}`}>
      {children}
    </span>
  )
}

function PersonCell({
  name,
  detail,
  initials,
}: {
  name: string
  detail: string
  initials?: string
}) {
  const fallback = initials ?? name.split(" ").map((part) => part[0]).join("")

  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback className="bg-primary/10 text-primary">{fallback}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-foreground">{name}</div>
        <div className="truncate text-xs text-muted-foreground">{detail}</div>
      </div>
    </div>
  )
}

function MoneyCell({ value }: { value: number }) {
  return (
    <span className="font-medium tabular-nums text-foreground">
      ${new Intl.NumberFormat("en-US").format(value)}
    </span>
  )
}

function ProgressCell({
  value,
  tone = "primary",
}: {
  value: number
  tone?: "primary" | "success" | "warning" | "error"
}) {
  const indicatorClassName = {
    primary: "[&_[data-slot=progress-indicator]]:bg-primary",
    success: "[&_[data-slot=progress-indicator]]:bg-success",
    warning: "[&_[data-slot=progress-indicator]]:bg-warning",
    error: "[&_[data-slot=progress-indicator]]:bg-error",
  }[tone]

  return (
    <div className="flex min-w-32 items-center gap-3">
      <Progress value={value} className={`h-2 ${indicatorClassName}`} />
      <span className="w-9 text-right text-sm tabular-nums text-muted-foreground">
        {value}%
      </span>
    </div>
  )
}

function RowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label="Open row actions">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Open detail</DropdownMenuItem>
        <DropdownMenuItem>Assign owner</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Copy row ID</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ResizeHeader({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span>{label}</span>
      <GripVertical className="size-3 text-muted-foreground/70" />
    </span>
  )
}

const engagementColumns: ColumnDef<Engagement>[] = [
  {
    accessorKey: "client",
    header: "Client",
    meta: {
      headerClassName: "sticky left-0 z-20 min-w-56 bg-muted/40",
      cellClassName: "sticky left-0 z-10 min-w-56 bg-inherit shadow-[1px_0_0_0_var(--border)]",
    },
    cell: ({ row }) => (
      <div className="min-w-0">
        <div className="font-medium text-foreground">{row.original.client}</div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">{row.original.id}</span>
          <span>{row.original.module}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => (
      <Badge variant="secondary" className="rounded-md">
        {row.original.stage}
      </Badge>
    ),
  },
  {
    accessorKey: "health",
    header: "Health",
    cell: ({ row }) => (
      <StatusPill className={healthTone[row.original.health]}>
        {row.original.health}
      </StatusPill>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => (
      <PersonCell name={row.original.owner} detail={row.original.ownerRole} />
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => <MoneyCell value={row.original.budget} />,
  },
  {
    accessorKey: "probability",
    header: "Probability",
    cell: ({ row }) => <ProgressCell value={row.original.probability} />,
  },
  {
    accessorKey: "lastUpdated",
    header: "Updated",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.lastUpdated}</span>
    ),
  },
  {
    id: "actions",
    header: "",
    enableSorting: false,
    enableHiding: false,
    meta: {
      headerClassName: "sticky right-0 z-20 w-12 bg-muted/40",
      cellClassName: "sticky right-0 z-10 w-12 bg-inherit text-center shadow-[-1px_0_0_0_var(--border)]",
    },
    cell: () => <RowActions />,
  },
]

const denseEngagementColumns: ColumnDef<Engagement>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => (
      <span className="font-medium text-foreground">{row.original.client}</span>
    ),
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => (
      <Badge variant="secondary" className="h-6 rounded-md px-2">
        {row.original.stage}
      </Badge>
    ),
  },
  {
    accessorKey: "health",
    header: "Health",
    cell: ({ row }) => (
      <StatusPill className={healthTone[row.original.health]}>
        {row.original.health}
      </StatusPill>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.owner}</span>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <span className="tabular-nums text-foreground">
        ${(row.original.budget / 1000).toFixed(0)}k
      </span>
    ),
  },
  {
    accessorKey: "probability",
    header: "Probability",
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">
        {row.original.probability}%
      </span>
    ),
  },
  {
    accessorKey: "lastUpdated",
    header: "Updated",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.lastUpdated}</span>
    ),
  },
]

const financialColumns: ColumnDef<FinancialReview>[] = [
  {
    accessorKey: "account",
    header: "Account",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-foreground">{row.original.account}</div>
        <div className="text-xs text-muted-foreground">{row.original.workstream}</div>
      </div>
    ),
  },
  { accessorKey: "budget", header: "Budget", cell: ({ row }) => <MoneyCell value={row.original.budget} /> },
  { accessorKey: "burn", header: "Burn", cell: ({ row }) => <MoneyCell value={row.original.burn} /> },
  {
    accessorKey: "variance",
    header: "Variance",
    cell: ({ row }) => {
      const value = row.original.variance
      return (
        <span className={value >= 0 ? "text-success tabular-nums" : "text-error tabular-nums"}>
          {value >= 0 ? "+" : ""}
          {value}%
        </span>
      )
    },
  },
  {
    accessorKey: "margin",
    header: "Margin",
    cell: ({ row }) => <ProgressCell value={row.original.margin} tone={row.original.margin > 30 ? "success" : "warning"} />,
  },
  {
    accessorKey: "approval",
    header: "Approval",
    cell: ({ row }) => (
      <StatusPill className={approvalTone[row.original.approval]}>
        {row.original.approval}
      </StatusPill>
    ),
  },
  { accessorKey: "owner", header: "Owner", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.owner}</span> },
]

const allocationColumns: ColumnDef<Allocation>[] = [
  {
    accessorKey: "person",
    header: "Person",
    cell: ({ row }) => (
      <PersonCell
        name={row.original.person}
        detail={row.original.role}
        initials={row.original.initials}
      />
    ),
  },
  {
    accessorKey: "module",
    header: "Module",
    cell: ({ row }) => <Badge variant="secondary" className="rounded-md">{row.original.module}</Badge>,
  },
  { accessorKey: "capacity", header: "Capacity", cell: ({ row }) => <ProgressCell value={row.original.capacity} tone="success" /> },
  { accessorKey: "utilization", header: "Utilization", cell: ({ row }) => <ProgressCell value={row.original.utilization} tone={row.original.utilization > 90 ? "error" : "primary"} /> },
  {
    accessorKey: "availability",
    header: "Availability",
    cell: ({ row }) => (
      <StatusPill className={availabilityTone[row.original.availability]}>
        {row.original.availability}
      </StatusPill>
    ),
  },
  { accessorKey: "location", header: "Location", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.location}</span> },
  { id: "actions", header: "", enableSorting: false, enableHiding: false, cell: () => <RowActions /> },
]

const riskColumns: ColumnDef<Risk>[] = [
  {
    accessorKey: "risk",
    header: "Risk",
    cell: ({ row }) => (
      <div className="max-w-72 whitespace-normal">
        <div className="font-medium text-foreground">{row.original.risk}</div>
        <div className="mt-0.5 text-xs leading-5 text-muted-foreground">{row.original.note}</div>
      </div>
    ),
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => (
      <StatusPill className={severityTone[row.original.severity]}>
        {row.original.severity}
      </StatusPill>
    ),
  },
  { accessorKey: "owner", header: "Owner", cell: ({ row }) => <PersonCell name={row.original.owner} detail={row.original.id} /> },
  {
    accessorKey: "due",
    header: "Due",
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <CalendarClock className="size-3.5" />
        {row.original.due}
      </span>
    ),
  },
  { accessorKey: "progress", header: "Progress", cell: ({ row }) => <ProgressCell value={row.original.progress} tone={row.original.progress < 45 ? "error" : "warning"} /> },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="rounded-md capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  { id: "actions", header: "", enableSorting: false, enableHiding: false, cell: () => <RowActions /> },
]

const pinnedColumns: ColumnDef<PrioritizedEngagement>[] = [
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <Badge
        variant={row.original.priority === "Pinned" ? "default" : "secondary"}
        className="gap-1.5 rounded-md"
      >
        {row.original.priority === "Pinned" ? <Pin className="size-3" /> : null}
        {row.original.priority}
      </Badge>
    ),
  },
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-foreground">{row.original.client}</div>
        <div className="text-xs text-muted-foreground">{row.original.nextStep}</div>
      </div>
    ),
  },
  {
    accessorKey: "health",
    header: "Health",
    cell: ({ row }) => (
      <StatusPill className={healthTone[row.original.health]}>
        {row.original.health}
      </StatusPill>
    ),
  },
  { accessorKey: "owner", header: "Owner", cell: ({ row }) => <PersonCell name={row.original.owner} detail={row.original.ownerRole} /> },
  { accessorKey: "budget", header: "Budget", cell: ({ row }) => <MoneyCell value={row.original.budget} /> },
  { accessorKey: "probability", header: "Probability", cell: ({ row }) => <ProgressCell value={row.original.probability} /> },
  { id: "actions", header: "", enableSorting: false, enableHiding: false, cell: () => <RowActions /> },
]

const groupedColumns: ColumnDef<PrioritizedEngagement>[] = [
  {
    accessorKey: "group",
    header: "Group",
    meta: {
      headerClassName: "sticky left-0 z-20 min-w-36 bg-muted/40",
      cellClassName: "sticky left-0 z-10 min-w-36 bg-inherit shadow-[1px_0_0_0_var(--border)]",
    },
    cell: ({ row }) => (
      <Badge variant="outline" className="gap-1.5 rounded-md">
        <Layers3 className="size-3" />
        {row.original.group}
      </Badge>
    ),
  },
  {
    accessorKey: "client",
    header: "Engagement",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-foreground">{row.original.client}</div>
        <div className="text-xs text-muted-foreground">{row.original.module} / {row.original.stage}</div>
      </div>
    ),
  },
  { accessorKey: "owner", header: "Owner", cell: ({ row }) => <PersonCell name={row.original.owner} detail={row.original.ownerRole} /> },
  {
    accessorKey: "confidence",
    header: "Confidence",
    cell: ({ row }) => (
      <Badge variant="secondary" className="rounded-md">
        {row.original.confidence}
      </Badge>
    ),
  },
  { accessorKey: "probability", header: "Probability", cell: ({ row }) => <ProgressCell value={row.original.probability} /> },
  { accessorKey: "lastUpdated", header: "Updated", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.lastUpdated}</span> },
]

const resizableLookingColumns: ColumnDef<PrioritizedEngagement>[] = [
  {
    accessorKey: "client",
    header: () => <ResizeHeader label="Client" />,
    meta: {
      headerClassName: "min-w-64",
      cellClassName: "min-w-64",
    },
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-foreground">{row.original.client}</div>
        <div className="text-xs text-muted-foreground">{row.original.id}</div>
      </div>
    ),
  },
  {
    accessorKey: "stage",
    header: () => <ResizeHeader label="Stage" />,
    meta: {
      headerClassName: "min-w-44",
      cellClassName: "min-w-44",
    },
    cell: ({ row }) => <Badge variant="secondary" className="rounded-md">{row.original.stage}</Badge>,
  },
  {
    accessorKey: "owner",
    header: () => <ResizeHeader label="Owner" />,
    meta: {
      headerClassName: "min-w-56",
      cellClassName: "min-w-56",
    },
    cell: ({ row }) => <PersonCell name={row.original.owner} detail={row.original.ownerRole} />,
  },
  {
    accessorKey: "budget",
    header: () => <ResizeHeader label="Budget" />,
    meta: {
      headerClassName: "min-w-40",
      cellClassName: "min-w-40",
    },
    cell: ({ row }) => <MoneyCell value={row.original.budget} />,
  },
  {
    accessorKey: "probability",
    header: () => <ResizeHeader label="Probability" />,
    meta: {
      headerClassName: "min-w-52",
      cellClassName: "min-w-52",
    },
    cell: ({ row }) => <ProgressCell value={row.original.probability} />,
  },
]

function GridToolbar() {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" className="h-8 gap-1.5">
        <SlidersHorizontal className="size-3.5" />
        Filters
      </Button>
      <Button variant="outline" size="sm" className="h-8 gap-1.5">
        <UserRound className="size-3.5" />
        Owners
      </Button>
      <Button variant="outline" size="sm" className="h-8 gap-1.5">
        <CheckCircle2 className="size-3.5" />
        Health
      </Button>
      <Button variant="outline" size="sm" className="h-8 gap-1.5">
        <CircleDollarSign className="size-3.5" />
        Budget
      </Button>
    </div>
  )
}

export function DataGridDemo() {
  return (
    <div>
      <GridToolbar />
      <DataGrid
        data={engagements}
        columns={engagementColumns}
        searchKey="client"
        searchPlaceholder="Filter clients..."
        rowSelection
        pageSize={5}
      />
    </div>
  )
}

export function DataGridDenseDemo() {
  return (
    <DataGrid
      data={engagements}
      columns={denseEngagementColumns}
      searchKey="client"
      searchPlaceholder="Search dense grid..."
      density="compact"
      striped
      stickyHeader
      pageSize={6}
    />
  )
}

export function DataGridFinancialDemo() {
  return (
    <DataGrid
      data={financialReviews}
      columns={financialColumns}
      searchKey="account"
      searchPlaceholder="Search accounts..."
      rowSelection
      striped
      pageSize={5}
    />
  )
}

export function DataGridPeopleDemo() {
  return (
    <DataGrid
      data={allocations}
      columns={allocationColumns}
      searchKey="person"
      searchPlaceholder="Search people..."
      pageSize={5}
    />
  )
}

export function DataGridRiskDemo() {
  return (
    <DataGrid
      data={risks}
      columns={riskColumns}
      searchKey="risk"
      searchPlaceholder="Search risks..."
      pageSize={5}
    />
  )
}

export function DataGridExpandableDemo() {
  return (
    <DataGrid
      data={engagements}
      columns={engagementColumns}
      searchKey="client"
      searchPlaceholder="Find engagement..."
      pageSize={4}
      renderExpandedRow={(row) => (
        <div className="grid gap-4 text-sm sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="font-medium text-foreground">
              {row.original.client} next step
            </div>
            <p className="mt-1 max-w-2xl leading-6 text-muted-foreground">
              {row.original.nextStep}. Review scope readiness, confirm the delivery
              owner, and update probability before the Friday pipeline review.
            </p>
          </div>
          <Button size="sm" variant="outline">
            Open engagement
          </Button>
        </div>
      )}
    />
  )
}

export function DataGridLoadingDemo() {
  return (
    <DataGrid
      data={engagements}
      columns={engagementColumns}
      searchKey="client"
      searchPlaceholder="Loading clients..."
      loading
      pageSize={5}
    />
  )
}

export function DataGridEmptyDemo() {
  return (
    <DataGrid
      data={[]}
      columns={engagementColumns}
      searchKey="client"
      searchPlaceholder="Search clients..."
      emptyTitle="No engagements match this view"
      emptyDescription="Clear filters or create a new engagement to populate the grid."
      pageSize={5}
    />
  )
}

export function DataGridPinnedRowsDemo() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 px-3 py-2">
        <div>
          <div className="text-sm font-medium text-foreground">Pinned priorities</div>
          <div className="text-xs text-muted-foreground">Keep the highest-attention engagements at the top of the review.</div>
        </div>
        <Badge variant="secondary" className="gap-1.5 rounded-md">
          <Star className="size-3.5" />
          2 pinned
        </Badge>
      </div>
      <DataGrid
        data={prioritizedEngagements}
        columns={pinnedColumns}
        searchKey="client"
        searchPlaceholder="Search pinned view..."
        rowSelection
        pageSize={6}
      />
    </div>
  )
}

export function DataGridGroupedRowsDemo() {
  return (
    <DataGrid
      data={[...prioritizedEngagements].sort((a, b) => a.group.localeCompare(b.group))}
      columns={groupedColumns}
      searchKey="client"
      searchPlaceholder="Search grouped engagements..."
      stickyHeader
      pageSize={6}
      renderExpandedRow={(row) => (
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <div>
            <div className="font-medium text-foreground">{row.original.group} operating note</div>
            <p className="mt-1 text-muted-foreground">
              {row.original.nextStep}. Use grouped views when users compare related rows inside a single operating lane.
            </p>
          </div>
          <Button variant="outline" size="sm">Open group</Button>
        </div>
      )}
    />
  )
}

export function DataGridResizableColumnsDemo() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1.5">
          <Columns3 className="size-3.5" />
          Fit columns
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5">
          <GripVertical className="size-3.5" />
          Column sizing
        </Button>
      </div>
      <DataGrid
        data={prioritizedEngagements}
        columns={resizableLookingColumns}
        searchKey="client"
        searchPlaceholder="Search wide grid..."
        pageSize={5}
      />
    </div>
  )
}

export function DataGridSavedViewsDemo() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {["Leadership", "Delivery", "Budget", "Risks"].map((view, index) => (
            <Button key={view} variant={index === 0 ? "default" : "outline"} size="sm">
              {view}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Save className="size-3.5" />
          Save view
        </Button>
      </div>
      <DataGrid
        data={engagements}
        columns={engagementColumns}
        searchKey="client"
        searchPlaceholder="Search saved view..."
        rowSelection
        columnVisibility
        pageSize={5}
      />
    </div>
  )
}
