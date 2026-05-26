import * as React from "react"
import { CheckCircle2, AlertTriangle, XCircle, Info, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"

type NotificationStatus = "success" | "warning" | "error" | "info" | "feature"
type NotificationVariant = "filled" | "light" | "stroke"

export interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: NotificationStatus
  variant?: NotificationVariant
  title: string
  description?: string
  onClose?: () => void
  action?: { label: string; onClick: () => void }
}

const statusConfig: Record<
  NotificationStatus,
  { icon: React.ElementType; filled: string; light: string; stroke: string }
> = {
  success: {
    icon: CheckCircle2,
    filled: "bg-[var(--success)] text-white border-transparent",
    light: "bg-[color-mix(in_oklch,var(--success)_10%,transparent)] text-[var(--success)] border-transparent",
    stroke: "border border-[color-mix(in_oklch,var(--success)_40%,transparent)] text-[var(--success)]",
  },
  warning: {
    icon: AlertTriangle,
    filled: "bg-[var(--warning)] text-white border-transparent",
    light: "bg-[color-mix(in_oklch,var(--warning)_10%,transparent)] text-[var(--warning)] border-transparent",
    stroke: "border border-[color-mix(in_oklch,var(--warning)_40%,transparent)] text-[var(--warning)]",
  },
  error: {
    icon: XCircle,
    filled: "bg-[var(--error)] text-white border-transparent",
    light: "bg-[color-mix(in_oklch,var(--error)_10%,transparent)] text-[var(--error)] border-transparent",
    stroke: "border border-[color-mix(in_oklch,var(--error)_40%,transparent)] text-[var(--error)]",
  },
  info: {
    icon: Info,
    filled: "bg-[var(--info)] text-white border-transparent",
    light: "bg-[color-mix(in_oklch,var(--info)_10%,transparent)] text-[var(--info)] border-transparent",
    stroke: "border border-[color-mix(in_oklch,var(--info)_40%,transparent)] text-[var(--info)]",
  },
  feature: {
    icon: Sparkles,
    filled: "bg-primary text-primary-foreground border-transparent",
    light: "bg-[color-mix(in_oklch,var(--primary)_10%,transparent)] text-primary border-transparent",
    stroke: "border border-[color-mix(in_oklch,var(--primary)_40%,transparent)] text-primary",
  },
}

export function Notification({
  className,
  status = "info",
  variant = "light",
  title,
  description,
  onClose,
  action,
  ...props
}: NotificationProps) {
  const config = statusConfig[status]
  const Icon = config.icon
  const colorClass = config[variant]

  return (
    <div
      className={cn(
        "flex w-80 gap-3 rounded-xl border border-border bg-card p-4 shadow-md",
        className,
      )}
      role="alert"
      {...props}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg",
          colorClass,
        )}
      >
        <Icon className="size-4" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-1 self-start text-xs font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            {action.label}
          </button>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 self-start rounded p-0.5 text-muted-foreground opacity-70 hover:opacity-100 transition-opacity duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          aria-label="Close"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  )
}
