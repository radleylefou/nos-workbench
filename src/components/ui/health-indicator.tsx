import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface HealthIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "healthy" | "warning" | "error"
  message?: string
  showLabel?: boolean
}

const statusConfig = {
  healthy: {
    Icon: CheckCircle,
    label: "Healthy",
    className: "text-success-600",
  },
  warning: {
    Icon: AlertTriangle,
    label: "Warning",
    className: "text-warning-600",
  },
  error: {
    Icon: XCircle,
    label: "Error",
    className: "text-error-600",
  },
}

export function HealthIndicator({
  status,
  message,
  showLabel = true,
  className,
  ...props
}: HealthIndicatorProps) {
  const { Icon, label, className: colorClass } = statusConfig[status]

  const content = (
    <div
      className={cn("inline-flex items-center gap-1.5 text-sm", colorClass, className)}
      {...props}
    >
      <Icon className="size-4 shrink-0" />
      {showLabel && <span>{label}</span>}
    </div>
  )

  if (message) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent>{message}</TooltipContent>
      </Tooltip>
    )
  }

  return content
}
