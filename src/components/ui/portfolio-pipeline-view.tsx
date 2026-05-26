"use client"

import { useState } from "react"
import { LayoutGrid, Table2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { KanbanBoard } from "@/components/ui/kanban-board"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface EngagementSummary {
  id: string
  client: string
  solution: string
  stage: string
  leads: Array<{ name: string; initials: string; avatarUrl?: string }>
  budget?: number
  probability?: number
  nextAction?: string
  status: string
}

interface PortfolioPipelineViewProps extends React.HTMLAttributes<HTMLDivElement> {
  engagements: EngagementSummary[]
  defaultView?: "table" | "kanban"
}

const stages = ["Triage", "Solution Definition", "Estimation", "Client Review", "Closed"]

export function PortfolioPipelineView({
  engagements,
  defaultView = "table",
  className,
  ...props
}: PortfolioPipelineViewProps) {
  const [view, setView] = useState<"table" | "kanban">(defaultView)

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      {/* View toggle */}
      <div className="flex items-center justify-end gap-1">
        <Button
          size="sm"
          variant={view === "table" ? "default" : "outline"}
          className="size-8 p-0"
          onClick={() => setView("table")}
          aria-label="Table view"
        >
          <Table2 className="size-4" />
        </Button>
        <Button
          size="sm"
          variant={view === "kanban" ? "default" : "outline"}
          className="size-8 p-0"
          onClick={() => setView("kanban")}
          aria-label="Kanban view"
        >
          <LayoutGrid className="size-4" />
        </Button>
      </div>

      {view === "table" ? (
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Solution</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Prob.</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {engagements.map((eng) => (
                <TableRow key={eng.id}>
                  <TableCell className="font-medium text-sm">{eng.client}</TableCell>
                  <TableCell className="text-sm">{eng.solution}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{eng.stage}</Badge>
                  </TableCell>
                  <TableCell>
                    <AvatarGroup>
                      {eng.leads.slice(0, 3).map((lead, i) => (
                        <Avatar key={i} className="size-6">
                          <AvatarImage src={lead.avatarUrl} alt={lead.name} />
                          <AvatarFallback className="text-[9px]">{lead.initials}</AvatarFallback>
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums">
                    {eng.budget ? `$${(eng.budget / 1000).toFixed(0)}k` : "—"}
                  </TableCell>
                  <TableCell className="text-right text-sm tabular-nums">
                    {eng.probability ? `${eng.probability}%` : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{eng.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <KanbanBoard
          columns={stages.map((stage) => ({
            id: stage,
            title: stage,
            items: engagements
              .filter((e) => e.stage === stage)
              .map((e) => ({
                id: e.id,
                content: (
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium">{e.client}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{e.solution}</p>
                    {e.budget && (
                      <p className="text-xs text-muted-foreground">
                        ${(e.budget / 1000).toFixed(0)}k
                      </p>
                    )}
                  </div>
                ),
              })),
          }))}
          columnMinWidth={220}
        />
      )}
    </div>
  )
}
