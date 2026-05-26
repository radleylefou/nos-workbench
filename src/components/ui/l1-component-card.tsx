import { Blocks, MoreHorizontal, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import type { L1Type } from "@/components/ui/l1-distribution-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HealthIndicator } from "@/components/ui/health-indicator"

interface L1ComponentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  description?: string
  type: L1Type
  epicCount: number
  estimate: number
  phases: string[]
  health: "healthy" | "warning" | "error"
  status?: string
  onEdit?: () => void
  onDelete?: () => void
  onAddEpic?: () => void
}

const typeBadgeClass: Record<L1Type, string> = {
  Experience: "bg-[var(--brand-600)]/10 text-[var(--brand-600)] border-[var(--brand-600)]/20",
  Workflow: "bg-[var(--info)]/10 text-[var(--info)] border-[var(--info)]/20",
  Integration: "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20",
  Foundation: "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20",
}

export function L1ComponentCard({
  name,
  description,
  type,
  epicCount,
  estimate,
  phases,
  health,
  status,
  onEdit,
  onDelete,
  onAddEpic,
  className,
  ...props
}: L1ComponentCardProps) {
  return (
    <Card
      className={cn("w-full gap-0 py-0", className)}
      {...props}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={cn("text-xs", typeBadgeClass[type])}
              >
                {type}
              </Badge>
              {status && (
                <Badge variant="secondary" className="text-xs">
                  {status}
                </Badge>
              )}
            </div>
            <div className="mt-5 flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground ring-1 ring-border">
                <Blocks className="size-4" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold leading-snug">{name}</h3>
                {description && (
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {(onEdit || onDelete) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="size-7 shrink-0 p-0">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>}
                {onDelete && (
                  <DropdownMenuItem className="text-destructive" onClick={onDelete}>
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{epicCount} epics</span>
          <span>{estimate} pts</span>
          {phases.length > 0 && (
            <span className="truncate">{phases.join(", ")}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 border-t border-border/60 p-5 pt-3">
        <HealthIndicator status={health} showLabel={false} />
        {onAddEpic && (
          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={onAddEpic}>
            <Plus className="size-3" />
            Add Epic
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
