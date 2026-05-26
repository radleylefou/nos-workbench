import { CheckCircle2, Clock, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"

export type TimelineStepStatus = "complete" | "pending" | "rejected"

export interface TimelineStep {
  role: string
  reviewer?: string
  status: TimelineStepStatus
  timestamp?: string
  note?: string
}

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TimelineStep[]
  variant?: "default" | "compact"
}

const statusConfig = {
  complete: {
    Icon: CheckCircle2,
    dotClass: "bg-[var(--success)]",
    iconClass: "text-[var(--success)]",
    label: "Approved",
  },
  pending: {
    Icon: Clock,
    dotClass: "bg-muted-foreground/30",
    iconClass: "text-muted-foreground",
    label: "Pending",
  },
  rejected: {
    Icon: XCircle,
    dotClass: "bg-[var(--error)]",
    iconClass: "text-[var(--error)]",
    label: "Rejected",
  },
}

export function Timeline({ steps, variant = "default", className, ...props }: TimelineProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {steps.map((step, i) => {
        const { Icon, dotClass, iconClass } = statusConfig[step.status]
        const isLast = i === steps.length - 1
        return (
          <div key={i} className="flex gap-3">
            {/* Timeline spine */}
            <div className="flex flex-col items-center">
              <div className={cn("size-2 rounded-full shrink-0 mt-1.5", dotClass)} />
              {!isLast && <div className="w-px flex-1 bg-border my-1" />}
            </div>
            {/* Content */}
            <div className={cn("pb-4", isLast && "pb-0")}>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-foreground">{step.role}</span>
                {step.reviewer && (
                  <span className="text-xs text-muted-foreground">— {step.reviewer}</span>
                )}
                <span className={cn("inline-flex items-center gap-1 text-xs", iconClass)}>
                  <Icon className="size-3" />
                  {statusConfig[step.status].label}
                </span>
              </div>
              {step.timestamp && (
                <p className="mt-0.5 text-xs text-muted-foreground">{step.timestamp}</p>
              )}
              {step.note && variant !== "compact" && (
                <p className="mt-1 text-xs text-muted-foreground italic">{step.note}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
