"use client"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/ui/stat-card"
import { DataGrid } from "@/components/ui/data-grid"
import { EstimationRollUpTree } from "@/components/ui/estimation-rollup-tree"
import { ReconciliationPanel } from "@/components/ui/reconciliation-panel"
import { type ColumnDef } from "@tanstack/react-table"
import type { RollUpNode } from "@/components/ui/estimation-rollup-tree"

type L3Row = {
  id: string
  name: string
  type: string
  phase: string
  units: number
  hours: number
  confidence: string
}

const l3Data: L3Row[] = [
  { id: "1", name: "Patient registration — form", type: "Experience", phase: "Phase 1", units: 5, hours: 40, confidence: "high" },
  { id: "2", name: "Appointment booking — step 1", type: "Experience", phase: "Phase 1", units: 8, hours: 64, confidence: "high" },
  { id: "3", name: "EHR read — patient demographics", type: "Integration", phase: "Phase 1", units: 13, hours: 104, confidence: "medium" },
  { id: "4", name: "Insurance verification — realtime", type: "Integration", phase: "Phase 2", units: 20, hours: 160, confidence: "low" },
  { id: "5", name: "Auth — SSO setup", type: "Foundation", phase: "Phase 1", units: 8, hours: 64, confidence: "high" },
  { id: "6", name: "Audit log — write events", type: "Foundation", phase: "Phase 2", units: 5, hours: 40, confidence: "high" },
]

const l3Columns: ColumnDef<L3Row>[] = [
  { accessorKey: "name", header: "Story", cell: ({ row }) => <span className="text-sm font-medium">{row.getValue("name")}</span> },
  { accessorKey: "type", header: "L1 Type", cell: ({ row }) => <Badge variant="secondary" className="text-xs">{row.getValue("type")}</Badge> },
  { accessorKey: "phase", header: "Phase", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.getValue("phase")}</span> },
  { accessorKey: "units", header: "Units", cell: ({ row }) => <span className="tabular-nums text-sm">{row.getValue("units")}</span> },
  { accessorKey: "hours", header: "Hours", cell: ({ row }) => <span className="tabular-nums text-sm">{row.getValue("hours")}</span> },
  {
    accessorKey: "confidence",
    header: "Confidence",
    cell: ({ row }) => {
      const val = row.getValue("confidence") as string
      return (
        <Badge
          variant="secondary"
          className="text-xs"
          style={{
            backgroundColor: val === "high" ? "color-mix(in oklch, var(--success) 15%, transparent)" : val === "medium" ? "color-mix(in oklch, var(--warning) 15%, transparent)" : "color-mix(in oklch, var(--error) 15%, transparent)",
            color: val === "high" ? "var(--success)" : val === "medium" ? "var(--warning)" : "var(--error)",
          }}
        >
          {val}
        </Badge>
      )
    },
  },
]

const rollupData: RollUpNode[] = [
  {
    id: "p1",
    name: "Phase 1",
    type: "phase",
    units: 280,
    hours: 2240,
    envelope: 300,
    variance: -20,
    children: [
      {
        id: "p1-exp",
        name: "Experience",
        type: "l1",
        units: 95,
        hours: 760,
        children: [
          { id: "p1-exp-1", name: "Patient Portal", type: "l2", units: 60, hours: 480 },
          { id: "p1-exp-2", name: "Clinical Intake", type: "l2", units: 35, hours: 280 },
        ],
      },
      {
        id: "p1-int",
        name: "Integration",
        type: "l1",
        units: 120,
        hours: 960,
        variance: 5,
        children: [
          { id: "p1-int-1", name: "EHR Connector", type: "l2", units: 80, hours: 640 },
          { id: "p1-int-2", name: "Insurance API", type: "l2", units: 40, hours: 320 },
        ],
      },
      {
        id: "p1-fnd",
        name: "Foundation",
        type: "l1",
        units: 65,
        hours: 520,
        children: [
          { id: "p1-fnd-1", name: "Auth & SSO", type: "l2", units: 45, hours: 360 },
          { id: "p1-fnd-2", name: "Audit Logging", type: "l2", units: 20, hours: 160 },
        ],
      },
    ],
  },
  {
    id: "p2",
    name: "Phase 2",
    type: "phase",
    units: 340,
    hours: 2720,
    envelope: 300,
    variance: 40,
    children: [
      {
        id: "p2-wf",
        name: "Workflow",
        type: "l1",
        units: 180,
        hours: 1440,
        variance: 20,
        children: [
          { id: "p2-wf-1", name: "Appointment Routing", type: "l2", units: 120, hours: 960 },
          { id: "p2-wf-2", name: "Referral Mgmt", type: "l2", units: 60, hours: 480 },
        ],
      },
    ],
  },
]

export function EstimationScreenPattern() {
  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="l3">L3 Table</TabsTrigger>
          <TabsTrigger value="rollup">Roll-Up</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard label="Total Units" value="620" trend={{ direction: "up", value: "+40", label: "vs envelope" }} />
            <StatCard label="Total Hours" value="4,960" subLabel="est. at 8h/unit" />
            <StatCard label="Phase 1 Variance" value="-20 units" trend={{ direction: "down", value: "6.7% under", label: "vs envelope" }} />
            <StatCard label="Phase 2 Variance" value="+40 units" trend={{ direction: "up", value: "13% over", label: "vs envelope" }} />
          </div>
        </TabsContent>

        <TabsContent value="l3" className="pt-4">
          <DataGrid
            data={l3Data}
            columns={l3Columns}
            searchKey="name"
            searchPlaceholder="Filter stories…"
            pageSize={6}
          />
        </TabsContent>

        <TabsContent value="rollup" className="pt-4">
          <EstimationRollUpTree data={rollupData} />
        </TabsContent>

        <TabsContent value="reconciliation" className="pt-4">
          <ReconciliationPanel
            phases={[
              { phase: "Phase 1", topDownEnvelope: 300, bottomsUpEstimate: 280, variance: -20, variancePercent: -6.7 },
              { phase: "Phase 2", topDownEnvelope: 300, bottomsUpEstimate: 340, variance: 40, variancePercent: 13.3 },
            ]}
            decisionOptions={["Accept estimate", "Reduce scope", "Increase envelope", "Defer to Phase 3"]}
            selectedDecision="Accept estimate"
            rationale="Phase 1 is within tolerance. Phase 2 overage is driven by Workflow epics and requires scope review."
          />
        </TabsContent>
      </Tabs>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <h3 className="mb-2 text-sm font-medium">Composes</h3>
        <div className="flex flex-wrap gap-2">
          {["StatCard (T2-03)", "DataGrid (T2-06)", "EstimationRollUpTree (T3-07)", "ReconciliationPanel (T3-09)", "Tabs (underline variant)"].map((c) => (
            <Badge key={c} variant="secondary" className="font-mono text-xs">{c}</Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
