"use client"

import type { ReactNode } from "react"
import {
  AlertTriangle,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  Clock,
  Filter,
  Flag,
  Gauge,
  Search,
  Send,
  Target,
  UserPlus,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KanbanBoard } from "@/components/ui/kanban-board"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { StatCard } from "@/components/ui/stat-card"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Tone = "success" | "warning" | "error" | "info" | "primary" | "neutral"
type ChecklistStatus = "completed" | "pending" | "failed" | "disabled"

const toneClasses: Record<Tone, string> = {
  success:
    "border-[color-mix(in_oklch,var(--success)_28%,transparent)] bg-[color-mix(in_oklch,var(--success)_10%,transparent)] text-[var(--success)]",
  warning:
    "border-[color-mix(in_oklch,var(--warning)_30%,transparent)] bg-[color-mix(in_oklch,var(--warning)_12%,transparent)] text-[var(--warning)]",
  error:
    "border-[color-mix(in_oklch,var(--error)_28%,transparent)] bg-[color-mix(in_oklch,var(--error)_10%,transparent)] text-[var(--error)]",
  info:
    "border-[color-mix(in_oklch,var(--info)_28%,transparent)] bg-[color-mix(in_oklch,var(--info)_10%,transparent)] text-[var(--info)]",
  primary: "border-primary/20 bg-primary/10 text-primary",
  neutral: "border-border bg-muted text-muted-foreground",
}

function PatternToolbar({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  )
}

function Panel({
  title,
  description,
  children,
  action,
  className,
}: {
  title: string
  description?: string
  children: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <section className={cn("overflow-hidden rounded-lg border border-border bg-background", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-border bg-muted/30 px-4 py-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold">{title}</h3>
          {description ? (
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="p-4">{children}</div>
    </section>
  )
}

function ToneBadge({
  tone,
  children,
  className,
}: {
  tone: Tone
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full border px-2 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

function MetricStrip({
  items,
}: {
  items: Array<{ label: string; value: string; meta: string; tone: Tone }>
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">{item.value}</p>
            </div>
            <ToneBadge tone={item.tone}>{item.meta}</ToneBadge>
          </div>
        </div>
      ))}
    </div>
  )
}

function Person({
  initials,
  name,
  detail,
}: {
  initials: string
  name: string
  detail?: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Avatar size="sm">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{name}</p>
        {detail ? <p className="truncate text-xs text-muted-foreground">{detail}</p> : null}
      </div>
    </div>
  )
}

function ProgressLine({
  value,
  label,
}: {
  value: number
  label?: string
}) {
  return (
    <div className="flex min-w-[8rem] items-center gap-2">
      <Progress value={value} className="h-2" />
      <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">
        {label ?? `${value}%`}
      </span>
    </div>
  )
}

const prospectRows = [
  {
    account: "Acme Health",
    signal: "Hiring VP Digital Care",
    fit: 91,
    stage: "Qualified",
    tone: "success" as Tone,
    owner: "AR",
    next: "Send scope teaser",
  },
  {
    account: "Northstar Clinics",
    signal: "Portal RFP viewed",
    fit: 84,
    stage: "Review",
    tone: "info" as Tone,
    owner: "MJ",
    next: "Map stakeholders",
  },
  {
    account: "Meridian Medical",
    signal: "EHR migration news",
    fit: 76,
    stage: "Research",
    tone: "warning" as Tone,
    owner: "SL",
    next: "Validate budget",
  },
  {
    account: "Summit Care Group",
    signal: "Inbound webinar attendee",
    fit: 68,
    stage: "Watch",
    tone: "neutral" as Tone,
    owner: "PK",
    next: "Nurture sequence",
  },
]

export function ProspectCommandCenterPattern() {
  return (
    <div className="flex flex-col gap-4">
      <PatternToolbar
        title="Lead qualification workspace"
        description="Saved searches, enriched account rows, and a persistent intelligence panel keep prospecting work in one surface."
        action={
          <>
            <Button variant="outline" size="sm">
              <Filter className="size-4" />
              Filters
            </Button>
            <Button size="sm">
              <UserPlus className="size-4" />
              Add lead
            </Button>
          </>
        }
      />

      <MetricStrip
        items={[
          { label: "Qualified this week", value: "38", meta: "+12", tone: "success" },
          { label: "Avg. fit score", value: "82%", meta: "healthy", tone: "success" },
          { label: "Needs research", value: "14", meta: "triage", tone: "warning" },
          { label: "Ready for Engage", value: "9", meta: "handoff", tone: "primary" },
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[14rem_minmax(0,1fr)_20rem]">
        <Panel title="Saved searches" description="Common prospecting entry points.">
          <div className="flex flex-col gap-2">
            {[
              ["Healthcare RFP signals", "18"],
              ["Digital intake hiring", "9"],
              ["EHR migration events", "12"],
              ["Warm webinar accounts", "6"],
            ].map(([label, count], index) => (
              <button
                key={label}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors",
                  index === 0 ? "bg-primary/10 text-primary" : "hover:bg-muted",
                )}
              >
                <span>{label}</span>
                <span className="text-xs tabular-nums text-muted-foreground">{count}</span>
              </button>
            ))}
          </div>
        </Panel>

        <Panel
          title="Qualified accounts"
          description="Scan account fit, trigger signal, owner, and next action."
          action={
            <div className="relative w-56">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="h-9 pl-9" placeholder="Search accounts..." />
            </div>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Signal</TableHead>
                <TableHead>Fit</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Next action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prospectRows.map((row) => (
                <TableRow key={row.account}>
                  <TableCell className="font-medium">{row.account}</TableCell>
                  <TableCell className="text-muted-foreground">{row.signal}</TableCell>
                  <TableCell>
                    <ProgressLine value={row.fit} />
                  </TableCell>
                  <TableCell>
                    <ToneBadge tone={row.tone}>{row.stage}</ToneBadge>
                  </TableCell>
                  <TableCell>
                    <Avatar size="sm">
                      <AvatarFallback>{row.owner}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground">{row.next}</span>
                      <Button variant="ghost" size="icon-xs" aria-label={`Open ${row.account}`}>
                        <ArrowUpRight className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>

        <Panel title="Account intelligence" description="Selected account fit summary.">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-muted-foreground" />
                <h4 className="text-sm font-semibold">Acme Health</h4>
              </div>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                4 regional hospitals, active patient portal initiative, recent digital care leadership hire.
              </p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Fit</p>
                <p className="font-semibold">91%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Contacts</p>
                <p className="font-semibold">7</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Signals</p>
                <p className="font-semibold">5</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last touch</p>
                <p className="font-semibold">2d ago</p>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              {["VP Digital Care opened case study", "EHR migration article matched", "No known procurement contact"].map((item) => (
                <div key={item} className="rounded-md border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}

const capacityPeople = [
  { initials: "AR", name: "Alice Rivera", role: "Account lead", weeks: [65, 70, 80, 90], status: "Available", tone: "success" as Tone },
  { initials: "MJ", name: "Marcus James", role: "Delivery lead", weeks: [85, 92, 96, 88], status: "Tight", tone: "warning" as Tone },
  { initials: "SL", name: "Sam Lee", role: "Strategist", weeks: [55, 60, 72, 74], status: "Available", tone: "success" as Tone },
  { initials: "PK", name: "Priya Kapoor", role: "Resource lead", weeks: [94, 98, 102, 96], status: "Over", tone: "error" as Tone },
]

export function StaffingCapacityPlannerPattern() {
  return (
    <div className="flex flex-col gap-4">
      <PatternToolbar
        title="Capacity planning workspace"
        description="Balance role demand, people availability, utilization, and assignment fit before a project starts."
        action={
          <>
            <Button variant="outline" size="sm">
              <CalendarDays className="size-4" />
              Next 4 weeks
            </Button>
            <Button size="sm">
              <Users className="size-4" />
              Create scenario
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <Panel title="Open role demand" description="Required coverage by role.">
            <div className="flex flex-col gap-3">
              {[
                ["Solution architect", "0.8 FTE", 82, "warning" as Tone],
                ["Product designer", "0.5 FTE", 64, "success" as Tone],
                ["Senior engineer", "1.6 FTE", 48, "error" as Tone],
                ["QA analyst", "0.4 FTE", 72, "success" as Tone],
              ].map(([role, demand, coverage, tone]) => (
                <div key={role as string} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{role}</p>
                    <ToneBadge tone={tone as Tone}>{demand}</ToneBadge>
                  </div>
                  <div className="mt-3">
                    <ProgressLine value={coverage as number} label={`${coverage}%`} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Recommended matches" description="Best fit for unfilled demand.">
            <div className="flex flex-col gap-3">
              <Person initials="HL" name="Hannah Liu" detail="React, intake UX, 40% free" />
              <Person initials="TO" name="Theo Ortiz" detail="FHIR, auth, 55% free" />
              <Person initials="IM" name="Ivy Malik" detail="QA automation, 30% free" />
            </div>
          </Panel>
        </div>

        <Panel title="People allocation grid" description="Availability across upcoming staffing windows.">
          <Tabs defaultValue="allocation">
            <TabsList variant="line">
              <TabsTrigger value="allocation">Allocation</TabsTrigger>
              <TabsTrigger value="scenario">Scenario</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
            </TabsList>
            <TabsContent value="allocation" className="pt-4">
              <div className="overflow-x-auto">
                <div className="min-w-[760px]">
                  <div className="grid grid-cols-[14rem_repeat(4,minmax(7rem,1fr))_7rem] border-b border-border pb-2 text-xs font-medium text-muted-foreground">
                    <div>Person</div>
                    <div>Jun 8</div>
                    <div>Jun 15</div>
                    <div>Jun 22</div>
                    <div>Jun 29</div>
                    <div>Status</div>
                  </div>
                  <div className="flex flex-col">
                    {capacityPeople.map((person) => (
                      <div key={person.name} className="grid grid-cols-[14rem_repeat(4,minmax(7rem,1fr))_7rem] items-center border-b border-border py-3 last:border-b-0">
                        <Person initials={person.initials} name={person.name} detail={person.role} />
                        {person.weeks.map((week, index) => (
                          <div key={`${person.name}-${index}`} className="pr-4">
                            <ProgressLine value={Math.min(week, 100)} label={`${week}%`} />
                          </div>
                        ))}
                        <ToneBadge tone={person.tone}>{person.status}</ToneBadge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="scenario" className="pt-4">
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  ["Balanced", "86% coverage", "Lowest overload"],
                  ["Fast start", "92% coverage", "Higher Priya load"],
                  ["Margin-safe", "78% coverage", "Needs contractor"],
                ].map(([name, coverage, note]) => (
                  <div key={name} className="rounded-lg border border-border p-4">
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">{coverage}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{note}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="risk" className="pt-4">
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  ["Priya above capacity in weeks 2-4", "error" as Tone],
                  ["Senior engineer coverage below demand", "warning" as Tone],
                  ["QA available after Jun 22", "success" as Tone],
                  ["No client-facing architect backup", "warning" as Tone],
                ].map(([risk, tone]) => (
                  <div key={risk as string} className="flex items-center justify-between rounded-md border border-border p-3">
                    <span className="text-sm">{risk}</span>
                    <ToneBadge tone={tone as Tone}>{tone}</ToneBadge>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Panel>
      </div>
    </div>
  )
}

const releaseColumns = [
  {
    id: "ready",
    title: "Ready",
    items: [
      {
        id: "story-1",
        content: (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Patient intake form</span>
              <Badge variant="secondary">P1</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Acceptance complete, awaiting release note.</p>
          </div>
        ),
      },
      {
        id: "story-2",
        content: (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Auth redirect audit</span>
              <Badge variant="secondary">P2</Badge>
            </div>
            <p className="text-xs text-muted-foreground">QA passed in staging.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "validation",
    title: "Validation",
    items: [
      {
        id: "story-3",
        content: (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Insurance eligibility sync</span>
              <Badge variant="secondary">P1</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Needs external sandbox confirmation.</p>
          </div>
        ),
      },
    ],
  },
  {
    id: "blocked",
    title: "Blocked",
    items: [
      {
        id: "story-4",
        content: (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Referral routing rules</span>
              <Badge variant="destructive">Blocker</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Client decision needed on fallback queue.</p>
          </div>
        ),
      },
    ],
  },
]

const releaseChecklist: Array<{ label: string; status: ChecklistStatus }> = [
  { label: "Scope approved", status: "completed" },
  { label: "Regression suite passed", status: "completed" },
  { label: "Client UAT signed off", status: "pending" },
  { label: "Fallback queue decision", status: "failed" },
  { label: "Release notes drafted", status: "pending" },
]

export function DeliveryReleaseTrackerPattern() {
  return (
    <div className="flex flex-col gap-4">
      <PatternToolbar
        title="Release readiness tracker"
        description="Tie story progress, validation state, blockers, and launch controls into a single delivery view."
        action={
          <>
            <Button variant="outline" size="sm">
              <ClipboardCheck className="size-4" />
              QA report
            </Button>
            <Button size="sm">
              <Send className="size-4" />
              Ship release
            </Button>
          </>
        }
      />

      <div className="grid gap-3 md:grid-cols-4">
        <StatCard label="Stories ready" value="18" trend={{ direction: "up", value: "+5", label: "this week" }} />
        <StatCard label="Validation pass" value="82%" trend={{ direction: "up", value: "+9%", label: "vs last release" }} />
        <StatCard label="Open blockers" value="3" trend={{ direction: "down", value: "-2", label: "since yesterday" }} />
        <StatCard label="Release confidence" value="74%" subLabel="target is 85%" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <Panel title="Execution board" description="Stories grouped by current delivery state.">
          <KanbanBoard columns={releaseColumns} columnMinWidth={250} />
        </Panel>

        <Panel title="Release checklist" description="Controls that determine ship readiness.">
          <div className="flex flex-col gap-3">
            {releaseChecklist.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 rounded-md border border-border p-3">
                <span className="text-sm">{item.label}</span>
                <StatusBadge status={item.status} showIcon variant="light" />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Blocker queue" description="Issues that need leadership, client, or technical decisions.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blocker</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Due</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              ["Fallback routing decision", "Alice Rivera", "Release hold", "Today", "Escalate"],
              ["Sandbox credentials", "Marcus James", "QA blocked", "Tomorrow", "Request"],
              ["Analytics event naming", "Sam Lee", "Reporting risk", "Jun 6", "Resolve"],
            ].map(([blocker, owner, impact, due, action]) => (
              <TableRow key={blocker}>
                <TableCell className="font-medium">{blocker}</TableCell>
                <TableCell>{owner}</TableCell>
                <TableCell>
                  <ToneBadge tone={impact === "Release hold" ? "error" : "warning"}>{impact}</ToneBadge>
                </TableCell>
                <TableCell className="text-muted-foreground">{due}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">{action}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  )
}

const skillRows = [
  { initials: "AR", name: "Alice Rivera", role: "Account lead", discovery: 4, delivery: 3, ai: 2, platform: 3, readiness: 78 },
  { initials: "MJ", name: "Marcus James", role: "Delivery lead", discovery: 3, delivery: 5, ai: 3, platform: 4, readiness: 91 },
  { initials: "SL", name: "Sam Lee", role: "Strategist", discovery: 5, delivery: 3, ai: 4, platform: 2, readiness: 86 },
  { initials: "PK", name: "Priya Kapoor", role: "Resource lead", discovery: 3, delivery: 4, ai: 3, platform: 5, readiness: 84 },
]

function SkillPill({ level }: { level: number }) {
  const tone: Tone = level >= 5 ? "success" : level >= 4 ? "primary" : level >= 3 ? "info" : "warning"
  return <ToneBadge tone={tone} className="justify-center tabular-nums">{level}</ToneBadge>
}

export function EnablementSkillsMatrixPattern() {
  return (
    <div className="flex flex-col gap-4">
      <PatternToolbar
        title="Skills and readiness matrix"
        description="Map competency depth, growth actions, and staffing readiness before assignment decisions are made."
        action={
          <>
            <Button variant="outline" size="sm">
              <Filter className="size-4" />
              Team
            </Button>
            <Button size="sm">
              <Target className="size-4" />
              Add growth plan
            </Button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <Panel title="Capability matrix" description="Levels use a 1-5 competency scale.">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Person</TableHead>
                <TableHead>Discovery</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>AI</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Readiness</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skillRows.map((person) => (
                <TableRow key={person.name}>
                  <TableCell>
                    <Person initials={person.initials} name={person.name} detail={person.role} />
                  </TableCell>
                  <TableCell><SkillPill level={person.discovery} /></TableCell>
                  <TableCell><SkillPill level={person.delivery} /></TableCell>
                  <TableCell><SkillPill level={person.ai} /></TableCell>
                  <TableCell><SkillPill level={person.platform} /></TableCell>
                  <TableCell>
                    <ProgressLine value={person.readiness} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel title="Coverage gaps" description="Capabilities that need attention.">
            <div className="flex flex-col gap-3">
              {[
                ["AI solution design", 58, "warning" as Tone],
                ["FHIR integration", 42, "error" as Tone],
                ["Client facilitation", 88, "success" as Tone],
              ].map(([label, value, tone]) => (
                <div key={label as string} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{label}</p>
                    <ToneBadge tone={tone as Tone}>{value}%</ToneBadge>
                  </div>
                  <div className="mt-3">
                    <ProgressLine value={value as number} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Learning queue" description="Recommended next steps.">
            <div className="flex flex-col gap-2">
              {[
                "Run FHIR workshop for Marcus and Priya",
                "Pair Alice with Sam on AI discovery",
                "Assign Hannah to platform mentoring",
              ].map((item) => (
                <div key={item} className="rounded-md bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

export function BudgetControlCenterPattern() {
  return (
    <div className="flex flex-col gap-4">
      <PatternToolbar
        title="Budget and billing control center"
        description="Connect time, money, roles, project buckets, and billing milestones in one operational finance view."
        action={
          <>
            <Button variant="outline" size="sm">
              <Clock className="size-4" />
              This month
            </Button>
            <Button size="sm">
              <CircleDollarSign className="size-4" />
              Prepare invoice
            </Button>
          </>
        }
      />

      <div className="grid gap-3 md:grid-cols-4">
        <StatCard label="Budget used" value="$312k" trend={{ direction: "up", value: "65%", label: "of total" }} />
        <StatCard label="Billable hours" value="1,842" trend={{ direction: "up", value: "+18%", label: "MoM" }} />
        <StatCard label="Gross margin" value="38%" trend={{ direction: "down", value: "-4pp", label: "vs target" }} />
        <StatCard label="Milestones ready" value="3/5" subLabel="two need approval" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <Panel title="Role spend and utilization" description="Budget consumed by role and project bucket.">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Bucket</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Spend</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Solution architect", "Discovery", "164", "$41k", 82, "Watch", "warning" as Tone],
                ["Senior engineer", "Build", "520", "$156k", 68, "Healthy", "success" as Tone],
                ["Product designer", "Experience", "248", "$62k", 74, "Healthy", "success" as Tone],
                ["QA analyst", "Validation", "112", "$22k", 46, "Under plan", "info" as Tone],
              ].map(([role, bucket, hours, spend, budget, status, tone]) => (
                <TableRow key={role as string}>
                  <TableCell className="font-medium">{role}</TableCell>
                  <TableCell className="text-muted-foreground">{bucket}</TableCell>
                  <TableCell className="tabular-nums">{hours}</TableCell>
                  <TableCell className="tabular-nums">{spend}</TableCell>
                  <TableCell>
                    <ProgressLine value={budget as number} />
                  </TableCell>
                  <TableCell>
                    <ToneBadge tone={tone as Tone}>{status}</ToneBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel title="Billing milestones" description="Readiness for upcoming invoices.">
            <div className="flex flex-col gap-3">
              {[
                ["Discovery complete", "$80k", "Ready", "success" as Tone],
                ["Phase 1 kickoff", "$120k", "Missing approval", "warning" as Tone],
                ["Integration demo", "$95k", "Blocked", "error" as Tone],
              ].map(([label, amount, status, tone]) => (
                <div key={label as string} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{label}</p>
                    <span className="text-sm font-semibold tabular-nums">{amount}</span>
                  </div>
                  <div className="mt-2">
                    <ToneBadge tone={tone as Tone}>{status}</ToneBadge>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Exceptions" description="Needs finance or delivery action.">
            <div className="flex flex-col gap-2">
              {[
                ["18h unsubmitted time", "warning" as Tone],
                ["Expense missing project bucket", "error" as Tone],
                ["Milestone owner not assigned", "warning" as Tone],
              ].map(([label, tone]) => (
                <div key={label as string} className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-sm">
                  <span>{label}</span>
                  <ToneBadge tone={tone as Tone}>{tone}</ToneBadge>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

const guideAlignmentWarnings = [
  { label: "2 high-effort items lack strategic owner", tone: "error" as Tone, Icon: AlertTriangle },
  { label: "Delivery risk is not reflected in weekly focus", tone: "warning" as Tone, Icon: Clock },
  { label: "Case-study generator supports pipeline goal", tone: "success" as Tone, Icon: CheckCircle2 },
]

export function GuidePriorityCommandPattern() {
  return (
    <div className="flex flex-col gap-4">
      <PatternToolbar
        title="Strategic priority command"
        description="Surface focus areas, OKR progress, alignment warnings, and weekly direction in a leadership-ready view."
        action={
          <>
            <Button variant="outline" size="sm">
              <Gauge className="size-4" />
              Score model
            </Button>
            <Button size="sm">
              <Flag className="size-4" />
              Set focus
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          ["Commercial momentum", "72%", "Pipeline quality improving", "success" as Tone],
          ["Delivery confidence", "61%", "Release validation at risk", "warning" as Tone],
          ["Platform leverage", "48%", "Needs stronger ownership", "error" as Tone],
        ].map(([label, value, note, tone]) => (
          <div key={label as string} className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{label}</p>
              <ToneBadge tone={tone as Tone}>{value}</ToneBadge>
            </div>
            <div className="mt-4">
              <ProgressLine value={Number(String(value).replace("%", ""))} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <Panel title="Priority queue" description="Scored initiatives that need a move, pause, or escalation decision.">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Initiative</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Strategic fit</TableHead>
                <TableHead>Effort</TableHead>
                <TableHead>Decision</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Scope case-study generator", "Sam Lee", 94, "M", "Move", "92"],
                ["Delivery QA automation", "Marcus James", 88, "L", "Escalate", "86"],
                ["Prospect signal enrichment", "Alice Rivera", 78, "S", "Move", "81"],
                ["Manual report builder", "Priya Kapoor", 46, "M", "Pause", "52"],
              ].map(([initiative, owner, fit, effort, decision, score]) => (
                <TableRow key={initiative as string}>
                  <TableCell className="font-medium">{initiative}</TableCell>
                  <TableCell>{owner}</TableCell>
                  <TableCell><ProgressLine value={fit as number} /></TableCell>
                  <TableCell><Badge variant="secondary">{effort}</Badge></TableCell>
                  <TableCell>
                    <ToneBadge tone={decision === "Pause" ? "warning" : decision === "Escalate" ? "error" : "success"}>
                      {decision}
                    </ToneBadge>
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums">{score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel title="Alignment warnings" description="Signals that attention is drifting.">
            <div className="flex flex-col gap-3">
              {guideAlignmentWarnings.map((warning) => (
                <div key={warning.label} className="flex items-start gap-3 rounded-md border border-border p-3">
                  <warning.Icon className="mt-0.5 size-4 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-sm">{warning.label}</p>
                    <ToneBadge tone={warning.tone} className="mt-2">{warning.tone}</ToneBadge>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Weekly direction" description="Recommended leadership focus.">
            <div className="flex flex-col gap-2">
              {[
                "Move case-study generator into Scope build plan.",
                "Escalate QA automation dependency before release review.",
                "Pause manual reporting work until portfolio dashboard gaps are known.",
              ].map((item) => (
                <div key={item} className="rounded-md bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
