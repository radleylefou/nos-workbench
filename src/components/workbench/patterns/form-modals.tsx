"use client"

import * as React from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FormModal } from "@/components/ui/form-modal"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { StatCard } from "@/components/ui/stat-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// ─── Shared form field helpers ────────────────────────────────────────────────

function FormField({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  )
}

function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>
}

// ─── Dimmed background wrapper ────────────────────────────────────────────────

function PatternShell({
  height = "min-h-[480px]",
  background,
  trigger,
  modal,
}: {
  height?: string
  background: React.ReactNode
  trigger: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-muted/40", height)}>
      {/* Blurred background */}
      <div className="pointer-events-none select-none opacity-30 blur-[1.5px]">
        {background}
      </div>
      {/* Dim overlay */}
      <div className="absolute inset-0 bg-black/10" />
      {/* Trigger centered on top */}
      <div className="absolute inset-0 flex items-center justify-center">
        {trigger}
        {modal}
      </div>
    </div>
  )
}

// ─── Backgrounds ──────────────────────────────────────────────────────────────

function PortfolioBackground() {
  const rows = [
    { client: "Acme Health Systems", stage: "Estimation", owner: "SC", value: "$180k", status: "In Progress" },
    { client: "Northstar HealthTech", stage: "Client Review", owner: "MT", value: "$240k", status: "Active" },
    { client: "Meridian Medical", stage: "Triage", owner: "AJ", value: "$120k", status: "New" },
  ]
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Portfolio</h2>
        <Button size="sm">+ New Engagement</Button>
      </div>
      <div className="mb-5 grid grid-cols-3 gap-4">
        <StatCard label="Active engagements" value="12" />
        <StatCard label="Pipeline value" value="$2.4M" />
        <StatCard label="Avg. probability" value="68%" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.client}>
              <TableCell className="font-medium">{row.client}</TableCell>
              <TableCell>{row.stage}</TableCell>
              <TableCell>
                <Avatar className="size-6">
                  <AvatarFallback className="text-[10px]">{row.owner}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell><Badge variant="outline">{row.status}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function ProspectBackground() {
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Prospects</h2>
        <Button size="sm">+ New Lead</Button>
      </div>
      <div className="rounded-lg border border-border bg-background p-4">
        <div className="flex flex-col gap-2">
          {["Jane Smith · Acme Corp", "Mark Torres · Northstar", "Alice Johnson · Meridian"].map((name) => (
            <div key={name} className="flex items-center gap-3 py-1.5">
              <div className="size-8 rounded-full bg-muted" />
              <span className="text-sm">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TeamBackground() {
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Team</h2>
        <Button size="sm">+ Add Member</Button>
      </div>
      <div className="flex flex-col gap-2">
        {[
          { name: "Maya Chen", role: "Commercial Lead", initials: "MC" },
          { name: "Alex Rivera", role: "Solution Lead", initials: "AR" },
          { name: "Priya Shah", role: "Delivery Manager", initials: "PS" },
        ].map((m) => (
          <div key={m.name} className="flex items-center gap-3 rounded-md border border-border bg-background p-3">
            <Avatar className="size-9">
              <AvatarFallback className="text-xs">{m.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScopeBackground() {
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Scope Items</h2>
        <Button size="sm">+ New Item</Button>
      </div>
      <div className="flex flex-col gap-2">
        {["Patient intake form redesign", "EHR integration layer", "Reporting dashboard v2"].map((item) => (
          <div key={item} className="flex items-center justify-between rounded-md border border-border bg-background px-4 py-2.5">
            <span className="text-sm">{item}</span>
            <Badge variant="outline">Phase 1</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityBackground() {
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Activity</h2>
        <Button size="sm">+ Log Activity</Button>
      </div>
      <div className="flex flex-col gap-2">
        {[
          { type: "Call", note: "Kick-off call with Acme team", time: "2h ago" },
          { type: "Email", note: "Sent revised proposal", time: "Yesterday" },
        ].map((a) => (
          <div key={a.note} className="flex items-start gap-3 rounded-md border border-border bg-background p-3">
            <Badge variant="secondary">{a.type}</Badge>
            <div className="min-w-0 flex-1">
              <p className="text-sm">{a.note}</p>
              <p className="text-xs text-muted-foreground">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── 1. New Lead ──────────────────────────────────────────────────────────────

export function NewLeadPattern() {
  return (
    <PatternShell
      background={<ProspectBackground />}
      trigger={
        <FormModal
          trigger={<Button>+ New Lead</Button>}
          title="New Lead"
          description="Add a new prospect to your pipeline."
          primaryLabel="Add Lead"
        >
          <div className="flex flex-col gap-4">
            <FormRow>
              <FormField label="First name">
                <Input placeholder="Jane" />
              </FormField>
              <FormField label="Last name">
                <Input placeholder="Smith" />
              </FormField>
            </FormRow>
            <FormField label="Email">
              <Input type="email" placeholder="jane@acme.com" />
            </FormField>
            <FormField label="Company">
              <Input placeholder="Acme Corp" />
            </FormField>
          </div>
        </FormModal>
      }
      modal={null}
    />
  )
}

// ─── 2. New Engagement ────────────────────────────────────────────────────────

export function NewEngagementPattern() {
  return (
    <PatternShell
      height="min-h-[520px]"
      background={<PortfolioBackground />}
      trigger={
        <FormModal
          trigger={<Button>+ New Engagement</Button>}
          title="New Engagement"
          description="Start a new client engagement."
          badge="Engage"
          primaryLabel="Create Engagement"
        >
          <div className="flex flex-col gap-4">
            <FormField label="Client">
              <Input placeholder="Acme Health Systems" />
            </FormField>
            <FormRow>
              <FormField label="Type">
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="implementation">Implementation</SelectItem>
                    <SelectItem value="managed">Managed Services</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Stage">
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select stage" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="triage">Triage</SelectItem>
                    <SelectItem value="scoping">Scoping</SelectItem>
                    <SelectItem value="estimation">Estimation</SelectItem>
                    <SelectItem value="review">Client Review</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormRow>
            <FormField label="Owner">
              <Input placeholder="Sarah Chen" />
            </FormField>
            <FormField label="Start date">
              <Input type="date" />
            </FormField>
          </div>
        </FormModal>
      }
      modal={null}
    />
  )
}

// ─── 3. Add Team Member ───────────────────────────────────────────────────────

export function AddTeamMemberPattern() {
  return (
    <PatternShell
      height="min-h-[540px]"
      background={<TeamBackground />}
      trigger={
        <FormModal
          trigger={<Button>+ Add Team Member</Button>}
          title="Add Team Member"
          description="Assign a person to this engagement."
          primaryLabel="Add Member"
        >
          <div className="flex flex-col gap-4">
            <FormField label="Person">
              <Input placeholder="Search by name..." />
            </FormField>
            <FormRow>
              <FormField label="Role">
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Engagement Lead</SelectItem>
                    <SelectItem value="commercial">Commercial Lead</SelectItem>
                    <SelectItem value="solution">Solution Lead</SelectItem>
                    <SelectItem value="delivery">Delivery Manager</SelectItem>
                    <SelectItem value="estimation">Estimation Lead</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Allocation (%)">
                <Input type="number" placeholder="100" min={0} max={100} />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField label="Start date">
                <Input type="date" />
              </FormField>
              <FormField label="End date">
                <Input type="date" />
              </FormField>
            </FormRow>
            <Separator />
            <FormField label="Engagement">
              <Select>
                <SelectTrigger><SelectValue placeholder="Select engagement" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Health Systems</SelectItem>
                  <SelectItem value="northstar">Northstar HealthTech</SelectItem>
                  <SelectItem value="meridian">Meridian Medical</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Notes">
              <Textarea
                placeholder="Any context for this assignment..."
                className="resize-none"
                rows={3}
              />
            </FormField>
          </div>
        </FormModal>
      }
      modal={null}
    />
  )
}

// ─── 4. Create Scope Item (multi-step) ───────────────────────────────────────

export function CreateScopeItemPattern() {
  return (
    <PatternShell
      height="min-h-[520px]"
      background={<ScopeBackground />}
      trigger={
        <FormModal
          trigger={<Button>+ New Scope Item</Button>}
          primaryLabel="Create Item"
          steps={[
            {
              title: "Basics",
              description: "Name the scope item and assign it.",
              content: (
                <div className="flex flex-col gap-4">
                  <FormField label="Title">
                    <Input placeholder="e.g. Patient intake form redesign" />
                  </FormField>
                  <FormRow>
                    <FormField label="Phase">
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phase1">Phase 1</SelectItem>
                          <SelectItem value="phase2">Phase 2</SelectItem>
                          <SelectItem value="phase3">Phase 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="Component">
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frontend">Frontend</SelectItem>
                          <SelectItem value="backend">Backend</SelectItem>
                          <SelectItem value="integration">Integration</SelectItem>
                          <SelectItem value="data">Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                  </FormRow>
                  <FormField label="Owner">
                    <Input placeholder="Assign to..." />
                  </FormField>
                </div>
              ),
            },
            {
              title: "Details",
              description: "Add estimation and context.",
              content: (
                <div className="flex flex-col gap-4">
                  <FormRow>
                    <FormField label="Story points">
                      <Input type="number" placeholder="0" min={0} />
                    </FormField>
                    <FormField label="Priority">
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                  </FormRow>
                  <FormField label="Dependencies">
                    <Input placeholder="Links to blocking items..." />
                  </FormField>
                  <FormField label="Notes">
                    <Textarea
                      placeholder="Additional context..."
                      className="resize-none"
                      rows={3}
                    />
                  </FormField>
                </div>
              ),
            },
          ]}
        />
      }
      modal={null}
    />
  )
}

// ─── 5. Log Activity ──────────────────────────────────────────────────────────

export function LogActivityPattern() {
  return (
    <PatternShell
      height="min-h-[420px]"
      background={<ActivityBackground />}
      trigger={
        <FormModal
          trigger={<Button>+ Log Activity</Button>}
          title="Log Activity"
          description="Record an interaction for this engagement."
          primaryLabel="Log Activity"
        >
          <div className="flex flex-col gap-4">
            <FormField label="Type">
              <Select>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                  <SelectItem value="demo">Demo</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Date">
              <Input type="date" />
            </FormField>
            <FormField label="Notes">
              <Textarea
                placeholder="What happened?"
                className="resize-none"
                rows={4}
              />
            </FormField>
          </div>
        </FormModal>
      }
      modal={null}
    />
  )
}
