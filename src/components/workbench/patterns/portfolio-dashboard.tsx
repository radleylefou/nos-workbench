"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatCard } from "@/components/ui/stat-card"
import { DataGrid } from "@/components/ui/data-grid"
import { ActivityFeed } from "@/components/ui/activity-feed"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { type ColumnDef } from "@tanstack/react-table"
import { Plus, Search } from "lucide-react"
import type { ActivityFeedItem } from "@/components/ui/activity-feed"

type Engagement = {
  id: string
  client: string
  stage: string
  budget: number
  probability: number
  leads: string
}

const engagements: Engagement[] = [
  { id: "1", client: "Acme Health", stage: "Estimation", budget: 180000, probability: 75, leads: "AR+PK" },
  { id: "2", client: "Northstar HealthTech", stage: "Client Review", budget: 240000, probability: 90, leads: "MJ" },
  { id: "3", client: "Meridian Medical", stage: "Solution Definition", budget: 120000, probability: 50, leads: "SL+RT" },
  { id: "4", client: "Pacific Coast Clinics", stage: "Triage", budget: 80000, probability: 30, leads: "AR" },
  { id: "5", client: "Summit Care Group", stage: "Estimation", budget: 160000, probability: 65, leads: "PK" },
]

const columns: ColumnDef<Engagement>[] = [
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => <span className="font-medium text-sm">{row.getValue("client")}</span>,
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => <Badge variant="secondary" className="text-xs">{row.getValue("stage")}</Badge>,
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <span className="tabular-nums text-sm">${((row.getValue("budget") as number) / 1000).toFixed(0)}k</span>
    ),
  },
  {
    accessorKey: "probability",
    header: "Probability",
    cell: ({ row }) => <span className="tabular-nums text-sm">{row.getValue("probability")}%</span>,
  },
  {
    accessorKey: "leads",
    header: "Leads",
    cell: ({ row }) => {
      const leads = (row.getValue("leads") as string).split("+")
      return (
        <AvatarGroup>
          {leads.map((initials) => (
            <Avatar key={initials} className="size-6 text-[10px]">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          ))}
          {leads.length > 2 && <AvatarGroupCount>+{leads.length - 2}</AvatarGroupCount>}
        </AvatarGroup>
      )
    },
  },
]

const feedItems: ActivityFeedItem[] = [
  {
    id: "1",
    actor: { name: "Alice Rivera", initials: "AR" },
    action: "updated",
    subject: "Acme Health — Estimation",
    timestamp: "2h ago",
  },
  {
    id: "2",
    actor: { name: "Priya Kapoor", initials: "PK" },
    action: "approved",
    subject: "Summit Care Group scope",
    timestamp: "4h ago",
  },
  {
    id: "3",
    actor: { name: "Marcus James", initials: "MJ" },
    action: "commented on",
    subject: "Northstar HealthTech proposal",
    timestamp: "Yesterday",
  },
  {
    id: "4",
    actor: { name: "Sam Lee", initials: "SL" },
    action: "created",
    subject: "Meridian Medical engagement",
    timestamp: "2 days ago",
  },
]

export function PortfolioDashboardPattern() {
  return (
    <div className="flex flex-col gap-6">
      {/* Top action bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input placeholder="Search engagements…" className="pl-8" />
        </div>
        <Button size="sm">
          <Plus className="size-4" />
          New Engagement
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Active Engagements" value="12" trend={{ direction: "up", value: "+3", label: "vs last quarter" }} />
        <StatCard label="Pipeline Value" value="$2.4M" trend={{ direction: "up", value: "+12%", label: "vs last quarter" }} />
        <StatCard label="Avg. Win Rate" value="68%" trend={{ direction: "down", value: "-4%", label: "vs last quarter" }} />
        <StatCard label="In Estimation" value="5" trend={{ direction: "neutral", value: "0", label: "vs last quarter" }} />
      </div>

      {/* Main content + right panel */}
      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <h2 className="mb-3 text-sm font-semibold">Engagement Pipeline</h2>
          <DataGrid
            data={engagements}
            columns={columns}
            searchKey="client"
            searchPlaceholder="Filter by client…"
            pageSize={5}
          />
        </div>
        <div className="w-72 shrink-0 flex flex-col gap-4">
          <div>
            <h2 className="mb-3 text-sm font-semibold">Recent Activity</h2>
            <ActivityFeed items={feedItems} />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <h3 className="mb-2 text-sm font-medium">Composes</h3>
        <div className="flex flex-wrap gap-2">
          {["StatCard (T2-03)", "AvatarGroup (T2-02)", "DataGrid (T2-06)", "ActivityFeed (T2-04)"].map((c) => (
            <Badge key={c} variant="secondary" className="font-mono text-xs">{c}</Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
