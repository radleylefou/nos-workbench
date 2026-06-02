import { Minus, TrendingDown, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardTrend {
  direction: "up" | "down" | "neutral"
  value: string
  label?: string
}

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  subLabel?: string
  trend?: StatCardTrend
  icon?: React.ReactNode
}

const trendConfig = {
  up: {
    Icon: TrendingUp,
    className: "bg-[var(--success)]/10 text-[var(--success)]",
  },
  down: {
    Icon: TrendingDown,
    className: "bg-[var(--error)]/10 text-[var(--error)]",
  },
  neutral: {
    Icon: Minus,
    className: "bg-muted text-muted-foreground",
  },
}

export function StatCard({ label, value, subLabel, trend, icon, className, ...props }: StatCardProps) {
  return (
    <Card className={cn("w-full gap-0 py-0", className)} {...props}>
      <CardContent className="px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-sm text-muted-foreground truncate">{label}</p>
            <p className="text-3xl font-semibold leading-none tracking-tight">
              <AnimatedNumber value={value} />
            </p>
            {subLabel && (
              <p className="text-xs text-muted-foreground mt-0.5">{subLabel}</p>
            )}
          </div>
          {icon && (
            <div className="shrink-0 text-muted-foreground">{icon}</div>
          )}
        </div>
        {trend && (() => {
          const { Icon, className: trendClass } = trendConfig[trend.direction]
          return (
            <div className="mt-2 flex items-center gap-1.5">
              <span className={cn("inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium", trendClass)}>
                <Icon className="size-3" />
                {trend.value}
              </span>
              {trend.label && (
                <span className="text-xs text-muted-foreground">{trend.label}</span>
              )}
            </div>
          )
        })()}
      </CardContent>
    </Card>
  )
}
