import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface StepperCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number
  total: number
  percent: number
}

export function StepperCounter({ current, total, percent, className, ...props }: StepperCounterProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-2 text-sm text-muted-foreground", className)}
      {...props}
    >
      <span>
        Stage <strong className="text-foreground">{current}</strong> of {total}
      </span>
      <Progress value={percent} className="w-16 h-1.5" />
      <span className="tabular-nums">{percent}%</span>
    </div>
  )
}
