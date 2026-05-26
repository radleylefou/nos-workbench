import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"

interface ReadinessItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  status: "pass" | "warning" | "fail"
}

const statusConfig = {
  pass: {
    Icon: CheckCircle2,
    className: "text-[var(--success)]",
  },
  warning: {
    Icon: AlertTriangle,
    className: "text-[var(--warning)]",
  },
  fail: {
    Icon: XCircle,
    className: "text-[var(--error)]",
  },
}

export function ReadinessItem({ label, status, className, ...props }: ReadinessItemProps) {
  const { Icon, className: colorClass } = statusConfig[status]

  return (
    <div
      className={cn("flex items-center gap-2 text-sm cursor-default", className)}
      {...props}
    >
      <Icon className={cn("size-4 shrink-0", colorClass)} />
      <span className="text-foreground">{label}</span>
    </div>
  )
}
