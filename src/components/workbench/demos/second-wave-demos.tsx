"use client"

import * as React from "react"
import {
  AlertTriangle,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileArchive,
  FileCheck2,
  FileImage,
  FileText,
  History,
  ReceiptText,
  ShieldCheck,
  UploadCloud,
  UserRound,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { EntityPicker, type EntityPickerOption } from "@/components/ui/entity-picker"
import { FileUpload } from "@/components/ui/file-upload"
import { KanbanBoard } from "@/components/ui/kanban-board"
import { PhoneInput } from "@/components/ui/phone-input"
import { Progress } from "@/components/ui/progress"
import { Scrollspy, type ScrollspySection } from "@/components/ui/scrollspy"
import { Timeline } from "@/components/ui/timeline"

const accountEntities: EntityPickerOption[] = [
  { id: "acme", label: "Acme Health", description: "Enterprise care network", type: "Account", meta: "$180k pipeline", avatar: "AH", status: "active" },
  { id: "northstar", label: "Northstar HealthTech", description: "Data platform opportunity", type: "Account", meta: "$240k pipeline", avatar: "NH", status: "watch" },
  { id: "meridian", label: "Meridian Medical", description: "Referral workflow account", type: "Account", meta: "$120k pipeline", avatar: "MM", status: "watch" },
  { id: "summit", label: "Summit Care Group", description: "Staffing model expansion", type: "Account", meta: "$160k pipeline", avatar: "SC", status: "active" },
]

const contactEntities: EntityPickerOption[] = [
  { id: "sofia", label: "Sofia Chen", description: "VP Operations · Acme Health", type: "Contact", meta: "Decision maker", avatar: "SC", status: "active" },
  { id: "ben", label: "Ben Carter", description: "Procurement · Northstar", type: "Contact", meta: "Commercial", avatar: "BC", status: "watch" },
  { id: "maya", label: "Maya Patel", description: "Clinical sponsor · Meridian", type: "Contact", meta: "Sponsor", avatar: "MP", status: "active" },
]

const projectEntities: EntityPickerOption[] = [
  { id: "portal", label: "Clinical portal", description: "Scope and estimate in review", type: "Project", meta: "Scope", avatar: "CP", status: "active" },
  { id: "data", label: "Data platform", description: "Release validation needed", type: "Project", meta: "Deliver", avatar: "DP", status: "watch" },
  { id: "staffing", label: "Staffing model", description: "Capacity planning", type: "Project", meta: "Staff", avatar: "SM", status: "active" },
]

const peopleEntities: EntityPickerOption[] = [
  { id: "alice", label: "Alice Rivera", description: "Account lead", type: "Person", meta: "Engage", avatar: "AR", status: "active" },
  { id: "marcus", label: "Marcus James", description: "Delivery lead", type: "Person", meta: "Manage", avatar: "MJ", status: "watch" },
  { id: "priya", label: "Priya Kapoor", description: "Solution architect", type: "Person", meta: "Scope", avatar: "PK", status: "active" },
  { id: "nora", label: "Nora Chen", description: "Finance partner", type: "Person", meta: "Budget", avatar: "NC", status: "active" },
]

const skillEntities: EntityPickerOption[] = [
  { id: "discovery", label: "Discovery facilitation", description: "Runs stakeholder and workflow discovery", type: "Skill", meta: "Enable", avatar: "DF", status: "active" },
  { id: "estimation", label: "Estimation modelling", description: "Builds phase, role, and cost models", type: "Skill", meta: "Estimate", avatar: "EM", status: "active" },
  { id: "release", label: "Release validation", description: "Validates epic and story completion", type: "Skill", meta: "Delyver", avatar: "RV", status: "watch" },
]

const roleEntities: EntityPickerOption[] = [
  { id: "sponsor", label: "Client sponsor", description: "Approves commercial and delivery direction", type: "Role", meta: "Client", avatar: "CS", status: "active" },
  { id: "architect", label: "Solution architect", description: "Owns scope structure and assumptions", type: "Role", meta: "Nymbl", avatar: "SA", status: "active" },
  { id: "finance", label: "Finance partner", description: "Owns budget and billing confidence", type: "Role", meta: "Nymbl", avatar: "FP", status: "active" },
]

const scopeSections: ScrollspySection[] = [
  { id: "scope-context", title: "Context", description: "Client and operating frame" },
  { id: "scope-requirements", title: "Requirements", description: "L1-L3 scope structure" },
  { id: "scope-assumptions", title: "Assumptions", description: "Known constraints" },
  { id: "scope-outputs", title: "Outputs", description: "Generated deliverables" },
]

const proposalSections: ScrollspySection[] = [
  { id: "proposal-summary", title: "Summary", description: "Client-facing story" },
  { id: "proposal-solution", title: "Solution", description: "What Nymbl will build" },
  { id: "proposal-commercials", title: "Commercials", description: "Budget and milestones" },
  { id: "proposal-approval", title: "Approval", description: "Sign-off trail" },
]

const adminSections: ScrollspySection[] = [
  { id: "admin-profile", title: "Profile", description: "Workspace identity" },
  { id: "admin-permissions", title: "Permissions", description: "Roles and access" },
  { id: "admin-integrations", title: "Integrations", description: "Connected systems" },
  { id: "admin-billing", title: "Billing", description: "Plan and invoices" },
]

const patternSections: ScrollspySection[] = [
  { id: "pattern-intent", title: "Intent", description: "When to use" },
  { id: "pattern-layout", title: "Layout", description: "Structure and regions" },
  { id: "pattern-states", title: "States", description: "Empty, loading, error" },
  { id: "pattern-agent", title: "Agent Guidance", description: "LLM instructions" },
]

function EntityPickerDemo({
  options,
  defaultValue,
  placeholder,
  multiple,
}: {
  options: EntityPickerOption[]
  defaultValue: string[]
  placeholder: string
  multiple?: boolean
}) {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <div className="w-full max-w-xl">
      <EntityPicker
        options={options}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        multiple={multiple}
      />
    </div>
  )
}

export function EntityPickerAccountsDemo() {
  return <EntityPickerDemo options={accountEntities} defaultValue={["acme"]} placeholder="Select account" />
}

export function EntityPickerContactsDemo() {
  return <EntityPickerDemo options={contactEntities} defaultValue={["sofia", "maya"]} placeholder="Select contacts" multiple />
}

export function EntityPickerProjectsDemo() {
  return <EntityPickerDemo options={projectEntities} defaultValue={["portal"]} placeholder="Select project" />
}

export function EntityPickerPeopleDemo() {
  return <EntityPickerDemo options={peopleEntities} defaultValue={["alice", "priya"]} placeholder="Assign people" multiple />
}

export function EntityPickerSkillsDemo() {
  return <EntityPickerDemo options={skillEntities} defaultValue={["discovery", "estimation"]} placeholder="Select skills" multiple />
}

export function EntityPickerRolesDemo() {
  return <EntityPickerDemo options={roleEntities} defaultValue={["architect", "finance"]} placeholder="Select roles" multiple />
}

function ScrollspyDemo({ sections, title }: { sections: ScrollspySection[]; title: string }) {
  return (
    <div className="grid max-h-[30rem] w-full grid-cols-1 gap-4 overflow-y-auto rounded-lg border border-border bg-background p-4 md:grid-cols-[14rem_1fr]">
      <div className="md:sticky md:top-4 md:self-start">
        <Scrollspy sections={sections} />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">A long operational surface with stable in-page navigation.</p>
        </div>
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 rounded-lg border border-border bg-muted/20 p-4">
            <div className="flex items-center justify-between gap-3">
              <h4 className="font-medium text-foreground">{section.title}</h4>
              <Badge variant="secondary">{String(index + 1).padStart(2, "0")}</Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {section.description}. This region stands in for realistic NOS documentation,
              forms, tables, decisions, and generated content that benefit from persistent section navigation.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <div className="rounded-md bg-background p-3 text-xs text-muted-foreground">Owner: {["Alice", "Marcus", "Priya", "Nora"][index] ?? "Team"}</div>
              <div className="rounded-md bg-background p-3 text-xs text-muted-foreground">Status: {["Ready", "Review", "Draft", "Approved"][index] ?? "Ready"}</div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export function ScrollspyScopeDemo() {
  return <ScrollspyDemo sections={scopeSections} title="Scope document" />
}

export function ScrollspyProposalDemo() {
  return <ScrollspyDemo sections={proposalSections} title="Proposal builder" />
}

export function ScrollspyAdminDemo() {
  return <ScrollspyDemo sections={adminSections} title="Admin settings" />
}

export function ScrollspyPatternDemo() {
  return <ScrollspyDemo sections={patternSections} title="Pattern documentation" />
}

export function PhoneInputProspectDemo() {
  return (
    <div className="w-full max-w-md space-y-2">
      <PhoneInput defaultValue={{ country: "US", number: "(415) 555-0138" }} />
      <p className="text-xs text-muted-foreground">Primary phone for a new Prospect contact.</p>
    </div>
  )
}

export function PhoneInputEngageDemo() {
  return (
    <div className="w-full max-w-md space-y-2">
      <PhoneInput defaultValue={{ country: "CA", number: "647 555 0182" }} />
      <p className="text-xs text-muted-foreground">Relationship owner contact captured during Engage.</p>
    </div>
  )
}

export function PhoneInputDisabledDemo() {
  return (
    <div className="w-full max-w-md space-y-2">
      <PhoneInput disabled defaultValue={{ country: "GB", number: "020 7946 0428" }} />
      <p className="text-xs text-muted-foreground">Read-only contact record from a connected CRM.</p>
    </div>
  )
}

function UploadVariant({
  icon,
  title,
  description,
  accept,
  multiple,
}: {
  icon: React.ReactNode
  title: string
  description: string
  accept?: string
  multiple?: boolean
}) {
  return (
    <div className="w-full rounded-lg border border-border bg-background p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-muted text-muted-foreground">{icon}</div>
        <div>
          <div className="text-sm font-medium text-foreground">{title}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </div>
      <FileUpload accept={accept} multiple={multiple} description={description} className="rounded-lg p-6" />
    </div>
  )
}

export function FileUploadScopeEvidenceDemo() {
  return <UploadVariant icon={<FileCheck2 className="size-5" />} title="Scope evidence" description="Attach discovery notes, diagrams, or client source material." accept=".pdf,.doc,.docx,.png,.jpg" multiple />
}

export function FileUploadProposalAssetsDemo() {
  return <UploadVariant icon={<FileImage className="size-5" />} title="Proposal assets" description="Upload client logos, diagrams, and supporting proposal imagery." accept="image/*,.pdf" multiple />
}

export function FileUploadCaseStudyDemo() {
  return <UploadVariant icon={<FileArchive className="size-5" />} title="Case study source pack" description="Collect source documents for reusable commercial stories." accept=".pdf,.doc,.docx,.ppt,.pptx" multiple />
}

export function FileUploadReceiptsDemo() {
  return <UploadVariant icon={<ReceiptText className="size-5" />} title="Receipts and expenses" description="Capture Budget receipts for reimbursement or client billing." accept="image/*,.pdf" multiple />
}

export function FileUploadQAEvidenceDemo() {
  return <UploadVariant icon={<UploadCloud className="size-5" />} title="QA evidence" description="Upload screenshots, recordings, and validation artifacts." accept="image/*,.mp4,.webm,.pdf" multiple />
}

function KanbanCard({
  title,
  meta,
  owner,
  tone = "default",
}: {
  title: string
  meta: string
  owner: string
  tone?: "default" | "warning" | "error"
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-3">
        <div className="font-medium text-foreground">{title}</div>
        {tone !== "default" ? (
          <AlertTriangle className={tone === "error" ? "size-4 text-error" : "size-4 text-warning"} />
        ) : null}
      </div>
      <div className="text-xs text-muted-foreground">{meta}</div>
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback>{owner.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground">{owner}</span>
      </div>
    </div>
  )
}

const baseKanbanColumns = [
  {
    id: "triage",
    title: "Triage",
    maxItems: 3,
    items: [
      { id: "k1", content: <KanbanCard title="Qualify buying group" meta="Prospect · Acme Health" owner="AR" /> },
      { id: "k2", content: <KanbanCard title="Review vendor constraints" meta="Scope · Meridian" owner="PK" tone="warning" /> },
    ],
  },
  {
    id: "in-motion",
    title: "In Motion",
    maxItems: 4,
    items: [
      { id: "k3", content: <KanbanCard title="Validate release evidence" meta="Delyver · Northstar" owner="MJ" /> },
      { id: "k4", content: <KanbanCard title="Refresh budget model" meta="Budget · Summit" owner="NC" /> },
    ],
  },
  {
    id: "review",
    title: "Review",
    maxItems: 2,
    items: [
      { id: "k5", content: <KanbanCard title="Approve solution narrative" meta="Scope · Acme Health" owner="SC" /> },
    ],
  },
  {
    id: "done",
    title: "Done",
    items: [
      { id: "k6", content: <KanbanCard title="Publish weekly status" meta="Manage · Harbor" owner="MJ" /> },
    ],
  },
]

export function KanbanSwimlanesDemo() {
  return (
    <div className="w-full space-y-4">
      {["Enterprise accounts", "Growth accounts"].map((lane, index) => (
        <div key={lane} className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Building2 className="size-4 text-muted-foreground" />
            {lane}
          </div>
          <KanbanBoard columns={baseKanbanColumns.slice(index, index + 3)} columnMinWidth={240} />
        </div>
      ))}
    </div>
  )
}

export function KanbanWipLimitsDemo() {
  return (
    <KanbanBoard
      columns={baseKanbanColumns.map((column) => ({
        ...column,
        header: (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{column.title}</span>
              <Badge variant={(column.maxItems && column.items.length >= column.maxItems) ? "destructive" : "secondary"}>
                {column.items.length}{column.maxItems ? `/${column.maxItems}` : ""}
              </Badge>
            </div>
            {column.maxItems ? <Progress value={(column.items.length / column.maxItems) * 100} className="h-1.5" /> : null}
          </div>
        ),
      }))}
      columnMinWidth={260}
    />
  )
}

export function KanbanReleaseValidationDemo() {
  return (
    <KanbanBoard
      columns={[
        { id: "ready", title: "Ready to validate", items: [{ id: "r1", content: <KanbanCard title="Story acceptance pass" meta="Release 1 · Sprint 2" owner="MJ" /> }] },
        { id: "evidence", title: "Evidence needed", items: [{ id: "r2", content: <KanbanCard title="Screenshot coverage" meta="QA evidence missing" owner="PK" tone="warning" /> }] },
        { id: "blocked", title: "Blocked", items: [{ id: "r3", content: <KanbanCard title="Integration test account" meta="External credential needed" owner="SL" tone="error" /> }] },
        { id: "validated", title: "Validated", items: [{ id: "r4", content: <KanbanCard title="Release notes approved" meta="Client-ready" owner="AR" /> }] },
      ]}
      columnMinWidth={260}
    />
  )
}

export function KanbanOwnerGroupedDemo() {
  return (
    <KanbanBoard
      columns={[
        { id: "alice", title: "Alice Rivera", items: [{ id: "o1", content: <KanbanCard title="Pipeline review" meta="Engage" owner="AR" /> }, { id: "o2", content: <KanbanCard title="Sponsor map" meta="Prospect" owner="AR" /> }] },
        { id: "marcus", title: "Marcus James", items: [{ id: "o3", content: <KanbanCard title="Delivery status" meta="Manage" owner="MJ" /> }] },
        { id: "priya", title: "Priya Kapoor", items: [{ id: "o4", content: <KanbanCard title="Scope assumptions" meta="Scope" owner="PK" /> }] },
        { id: "nora", title: "Nora Chen", items: [{ id: "o5", content: <KanbanCard title="Budget variance" meta="Budget" owner="NC" tone="warning" /> }] },
      ]}
      columnMinWidth={240}
    />
  )
}

export function TimelineAccountActivityDemo() {
  return (
    <Timeline
      steps={[
        { role: "Lead imported", reviewer: "Clay enrichment", status: "complete", label: "Captured", timestamp: "Jun 02, 09:12", note: "New health system account matched target segment." },
        { role: "Discovery email sent", reviewer: "Alice Rivera", status: "complete", label: "Sent", timestamp: "Jun 02, 10:04" },
        { role: "Sponsor reply pending", reviewer: "Sofia Chen", status: "pending", label: "Waiting", timestamp: "Today" },
      ]}
    />
  )
}

export function TimelineProjectHistoryDemo() {
  return (
    <Timeline
      steps={[
        { role: "Scope approved", reviewer: "Client sponsor", status: "complete", label: "Approved", timestamp: "May 28" },
        { role: "Estimate refreshed", reviewer: "Nora Chen", status: "complete", label: "Updated", timestamp: "May 30" },
        { role: "Release validation", reviewer: "Marcus James", status: "pending", label: "In progress", timestamp: "Jun 04" },
      ]}
    />
  )
}

export function TimelineAuditTrailDemo() {
  return (
    <Timeline
      steps={[
        { role: "Budget milestone edited", reviewer: "Nora Chen", status: "complete", label: "Changed", timestamp: "09:42", meta: "v4" },
        { role: "Approval rule rejected", reviewer: "System", status: "rejected", label: "Blocked", timestamp: "09:44", note: "Missing sponsor approval for variance over 10%." },
        { role: "Rule exception requested", reviewer: "Marcus James", status: "pending", label: "Review", timestamp: "09:51" },
      ]}
    />
  )
}

export function TimelineStatusUpdatesDemo() {
  return (
    <Timeline
      steps={[
        { role: "Timeline moved to watch", reviewer: "Manage", status: "rejected", label: "Watch", timestamp: "Last week", note: "Dependency slipped by two days." },
        { role: "Scope confidence restored", reviewer: "Scope", status: "complete", label: "Healthy", timestamp: "Yesterday" },
        { role: "Client status due", reviewer: "Alice Rivera", status: "pending", label: "Due", timestamp: "Tomorrow" },
      ]}
    />
  )
}

export function SecondWaveOverviewDemo() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-3">
      {[
        { icon: <Users className="size-4" />, label: "Entity search", value: "6 types" },
        { icon: <History className="size-4" />, label: "History surfaces", value: "4 timelines" },
        { icon: <ClipboardCheck className="size-4" />, label: "Workflow boards", value: "4 variants" },
      ].map((item) => (
        <Card key={item.label} className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">{item.icon}<span className="text-xs">{item.label}</span></div>
          <div className="mt-2 text-xl font-semibold text-foreground">{item.value}</div>
        </Card>
      ))}
    </div>
  )
}

void BriefcaseBusiness
void CheckCircle2
void Clock3
void FileText
void ShieldCheck
void UserRound
