import * as React from "react"
import { CheckCircle2, Clock, XCircle, MinusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type BadgeStatus = "completed" | "pending" | "failed" | "disabled"
type BadgeVariant = "stroke" | "light"

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus
  variant?: BadgeVariant
  showDot?: boolean
  showIcon?: boolean
}

const statusConfig: Record<
  BadgeStatus,
  { icon: React.ElementType; colorClass: string; strokeClass: string; lightClass: string; label: string }
> = {
  completed: {
    icon: CheckCircle2,
    colorClass: "text-[var(--success)]",
    strokeClass: "border border-[color-mix(in_oklch,var(--success)_40%,transparent)] text-[var(--success)]",
    lightClass: "bg-[color-mix(in_oklch,var(--success)_12%,transparent)] text-[var(--success)]",
    label: "Completed",
  },
  pending: {
    icon: Clock,
    colorClass: "text-[var(--warning)]",
    strokeClass: "border border-[color-mix(in_oklch,var(--warning)_40%,transparent)] text-[var(--warning)]",
    lightClass: "bg-[color-mix(in_oklch,var(--warning)_12%,transparent)] text-[var(--warning)]",
    label: "Pending",
  },
  failed: {
    icon: XCircle,
    colorClass: "text-[var(--error)]",
    strokeClass: "border border-[color-mix(in_oklch,var(--error)_40%,transparent)] text-[var(--error)]",
    lightClass: "bg-[color-mix(in_oklch,var(--error)_12%,transparent)] text-[var(--error)]",
    label: "Failed",
  },
  disabled: {
    icon: MinusCircle,
    colorClass: "text-muted-foreground",
    strokeClass: "border border-border text-muted-foreground",
    lightClass: "bg-muted text-muted-foreground",
    label: "Disabled",
  },
}

export function StatusBadge({
  className,
  status,
  variant = "light",
  showDot = true,
  showIcon = false,
  children,
  ...props
}: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full px-2 text-xs font-medium",
        variant === "stroke" ? config.strokeClass : config.lightClass,
        className,
      )}
      {...props}
    >
      {showIcon ? (
        <Icon className="size-3.5 shrink-0" />
      ) : showDot ? (
        <span className={cn("size-1.5 shrink-0 rounded-full bg-current")} />
      ) : null}
      {children ?? config.label}
    </span>
  )
}
