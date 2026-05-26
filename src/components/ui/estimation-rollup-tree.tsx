"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type NodeType = "phase" | "l1" | "l2" | "l3"

export interface RollUpNode {
  id: string
  name: string
  type: NodeType
  units: number
  hours: number
  variance?: number
  envelope?: number
  confidence?: "low" | "medium" | "high"
  status?: string
  children?: RollUpNode[]
}

interface EstimationRollUpTreeProps extends React.HTMLAttributes<HTMLDivElement> {
  data: RollUpNode[]
}

function varianceClass(v: number | undefined) {
  if (v === undefined || v === 0) return "text-muted-foreground"
  return v > 0 ? "text-[var(--error)]" : "text-[var(--success)]"
}

function NodeRow({
  node,
  depth,
  expandedIds,
  onToggle,
}: {
  node: RollUpNode
  depth: number
  expandedIds: Set<string>
  onToggle: (id: string) => void
}) {
  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expandedIds.has(node.id)

  const typeStyles: Record<NodeType, string> = {
    phase: "font-semibold text-foreground",
    l1: "font-medium text-foreground",
    l2: "text-foreground",
    l3: "text-muted-foreground",
  }

  return (
    <>
      <TableRow className="hover:bg-muted/30">
        <TableCell>
          <div
            className="flex items-center gap-1"
            style={{ paddingLeft: depth * 16 }}
          >
            {hasChildren ? (
              <button
                type="button"
                className="size-4 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
                onClick={() => onToggle(node.id)}
              >
                <ChevronRight
                  className={cn("size-3.5 transition-transform", isExpanded && "rotate-90")}
                />
              </button>
            ) : (
              <div className="size-4 shrink-0" />
            )}
            <span className={cn("text-sm", typeStyles[node.type])}>{node.name}</span>
            {node.status && (
              <Badge variant="secondary" className="text-[10px] ml-1 hidden sm:flex">
                {node.status}
              </Badge>
            )}
          </div>
        </TableCell>
        <TableCell className="tabular-nums text-sm text-right">{node.units}</TableCell>
        <TableCell className="tabular-nums text-sm text-right">{node.hours}h</TableCell>
        <TableCell className="tabular-nums text-sm text-right">
          {node.envelope ?? "—"}
        </TableCell>
        <TableCell
          className={cn("tabular-nums text-sm text-right font-medium", varianceClass(node.variance))}
        >
          {node.variance !== undefined && node.variance !== 0
            ? `${node.variance > 0 ? "+" : ""}${node.variance}`
            : "—"}
        </TableCell>
      </TableRow>
      {isExpanded &&
        hasChildren &&
        node.children!.map((child) => (
          <NodeRow
            key={child.id}
            node={child}
            depth={depth + 1}
            expandedIds={expandedIds}
            onToggle={onToggle}
          />
        ))}
    </>
  )
}

export function EstimationRollUpTree({ data, className, ...props }: EstimationRollUpTreeProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(data.map((n) => n.id))
  )

  const toggle = (id: string) =>
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className={cn("rounded-md border border-border overflow-hidden", className)} {...props}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Component</TableHead>
            <TableHead className="text-right w-20">Units</TableHead>
            <TableHead className="text-right w-20">Hours</TableHead>
            <TableHead className="text-right w-24">Envelope</TableHead>
            <TableHead className="text-right w-24">Variance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((node) => (
            <NodeRow
              key={node.id}
              node={node}
              depth={0}
              expandedIds={expandedIds}
              onToggle={toggle}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
