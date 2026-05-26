import { cn } from "@/lib/utils"

export type L1Type = "Experience" | "Workflow" | "Integration" | "Foundation"

export interface L1Segment {
  type: L1Type
  value: number
  label?: string
}

interface L1DistributionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  segments: L1Segment[]
  showLegend?: boolean
  height?: "sm" | "md"
}

const typeColors: Record<L1Type, string> = {
  Experience: "bg-[var(--brand-600)]",
  Workflow: "bg-[var(--info)]",
  Integration: "bg-[var(--success)]",
  Foundation: "bg-[var(--warning)]",
}

const typeDotColors: Record<L1Type, string> = {
  Experience: "bg-[var(--brand-600)]",
  Workflow: "bg-[var(--info)]",
  Integration: "bg-[var(--success)]",
  Foundation: "bg-[var(--warning)]",
}

export function L1DistributionBar({
  segments,
  showLegend = false,
  height = "sm",
  className,
  ...props
}: L1DistributionBarProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0)

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)} {...props}>
      <div
        className={cn(
          "flex w-full overflow-hidden rounded-full",
          height === "sm" ? "h-1.5" : "h-2.5"
        )}
      >
        {segments.map((seg, i) => (
          <div
            key={i}
            className={typeColors[seg.type]}
            style={{ flex: total > 0 ? seg.value / total : 1 / segments.length }}
          />
        ))}
      </div>
      {showLegend && (
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
              <div className={cn("size-2 rounded-full shrink-0", typeDotColors[seg.type])} />
              <span>{seg.label ?? seg.type}</span>
              <span className="text-muted-foreground/60">({seg.value})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
