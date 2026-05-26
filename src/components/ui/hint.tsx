import * as React from "react"
import { cn } from "@/lib/utils"

export interface HintProps extends React.HTMLAttributes<HTMLParagraphElement> {
  hasError?: boolean
  disabled?: boolean
  icon?: React.ReactNode
}

export function Hint({
  className,
  hasError = false,
  disabled = false,
  icon,
  children,
  ...props
}: HintProps) {
  return (
    <p
      className={cn(
        "flex items-start gap-1.5 text-xs",
        hasError ? "text-[var(--error)]" : "text-muted-foreground",
        disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="mt-0.5 shrink-0 [&>svg]:size-3.5">{icon}</span>
      )}
      {children}
    </p>
  )
}
