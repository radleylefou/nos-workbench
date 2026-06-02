import { Clock, Link } from "lucide-react"

import { cn } from "@/lib/utils"
import type { L1Type } from "@/components/ui/l1-distribution-bar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { HealthIndicator } from "@/components/ui/health-indicator"
import { IdChip } from "@/components/ui/id-chip"
import { l1TypeBadgeClass } from "@/lib/l1-type-badge"

interface EpicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  epicId: string
  title: string
  l1Type: L1Type
  units: number
  hours: number
  milestone?: string
  depCount?: number
  status: "draft" | "approved" | "estimated"
  hasConflict?: boolean
  conflictMessage?: string
}

const statusVariant: Record<
  "draft" | "approved" | "estimated",
  "secondary" | "default" | "outline"
> = {
  draft: "secondary",
  approved: "default",
  estimated: "outline",
}

export function EpicCard({
  epicId,
  title,
  l1Type,
  units,
  hours,
  milestone,
  depCount,
  status,
  hasConflict = false,
  conflictMessage,
  className,
  ...props
}: EpicCardProps) {
  return (
    <Card
      className={cn(
        "w-full gap-0 py-0",
        hasConflict && "border-error-200 ring-1 ring-error-100",
        className
      )}
      {...props}
    >
      <CardContent className="flex min-h-44 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <IdChip id={epicId} />
          <Badge variant={statusVariant[status]} className="text-xs">
            {status}
          </Badge>
          <Badge
            variant="outline"
            className={cn("text-xs", l1TypeBadgeClass[l1Type])}
          >
            {l1Type}
          </Badge>
        </div>

        <p className="mt-5 text-sm font-medium leading-snug">{title}</p>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {hours}h
          </span>
          <span>{units} pts</span>
          {depCount !== undefined && depCount > 0 && (
            <span className="flex items-center gap-1">
              <Link className="size-3" />
              {depCount} deps
            </span>
          )}
          {milestone && <span className="truncate">{milestone}</span>}
        </div>

        {hasConflict && conflictMessage && (
          <div className="mt-4 border-t border-border/60 pt-3">
            <HealthIndicator status="error" message={conflictMessage} showLabel={false} />
            <p className="mt-1 text-xs leading-5 text-error-600">{conflictMessage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
