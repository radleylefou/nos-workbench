import { TrendingDown, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { L1DistributionBar } from "@/components/ui/l1-distribution-bar"
import type { L1Segment } from "@/components/ui/l1-distribution-bar"

interface PhaseColumnHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  dateRange?: string
  epicCount: number
  units: number
  hours: number
  envelope?: number
  distributionSegments: L1Segment[]
  variance?: number
}

export function PhaseColumnHeader({
  name,
  dateRange,
  epicCount,
  units,
  hours,
  envelope,
  distributionSegments,
  variance,
  className,
  ...props
}: PhaseColumnHeaderProps) {
  const varianceClass =
    variance === undefined || variance === 0
      ? "text-muted-foreground"
      : variance > 0
      ? "text-[var(--error)]"
      : "text-[var(--success)]"

  const VarianceIcon = variance && variance > 0 ? TrendingUp : TrendingDown

  return (
    <div className={cn("flex flex-col gap-2 p-3", className)} {...props}>
      <div>
        <h3 className="text-sm font-semibold leading-tight">{name}</h3>
        {dateRange && (
          <p className="mt-0.5 text-xs text-muted-foreground">{dateRange}</p>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
        <span>{epicCount} epics</span>
        <span>{units} pts</span>
        <span>{hours}h</span>
        {envelope !== undefined && (
          <span>envelope: {envelope}pts</span>
        )}
        {variance !== undefined && variance !== 0 && (
          <span className={cn("flex items-center gap-0.5 font-medium", varianceClass)}>
            <VarianceIcon className="size-3" />
            {variance > 0 ? "+" : ""}{variance} pts
          </span>
        )}
      </div>

      <L1DistributionBar segments={distributionSegments} height="sm" />
    </div>
  )
}
