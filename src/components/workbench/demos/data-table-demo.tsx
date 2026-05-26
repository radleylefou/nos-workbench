"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

type Engagement = {
  id: string
  client: string
  stage: string
  budget: number
  probability: number
}

const data: Engagement[] = [
  { id: "1", client: "Acme Health", stage: "Estimation", budget: 180000, probability: 75 },
  { id: "2", client: "Northstar HealthTech", stage: "Client Review", budget: 240000, probability: 90 },
  { id: "3", client: "Meridian Medical", stage: "Solution Definition", budget: 120000, probability: 50 },
  { id: "4", client: "Pacific Coast Clinics", stage: "Triage", budget: 80000, probability: 30 },
  { id: "5", client: "Summit Care Group", stage: "Estimation", budget: 160000, probability: 65 },
  { id: "6", client: "Harbor Health Systems", stage: "Closed", budget: 200000, probability: 100 },
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
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-xs">{row.getValue("stage")}</Badge>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <span className="tabular-nums text-sm">
        ${((row.getValue("budget") as number) / 1000).toFixed(0)}k
      </span>
    ),
  },
  {
    accessorKey: "probability",
    header: "Probability",
    cell: ({ row }) => (
      <span className="tabular-nums text-sm">{row.getValue("probability")}%</span>
    ),
  },
]

export function DataTableDemo() {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchKey="client"
      searchPlaceholder="Filter by client…"
      pageSize={4}
      rowSelection
    />
  )
}
