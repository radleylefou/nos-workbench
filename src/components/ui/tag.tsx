"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "stroke" | "gray"
  disabled?: boolean
  onDismiss?: () => void
  icon?: React.ReactNode
}

export function Tag({
  className,
  variant = "stroke",
  disabled = false,
  onDismiss,
  icon,
  children,
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-md pl-2 pr-1 text-xs font-medium",
        variant === "stroke" && "border border-border bg-background text-foreground",
        variant === "gray" && "bg-muted text-muted-foreground",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {onDismiss && !disabled && (
        <button
          onClick={onDismiss}
          className="ml-0.5 shrink-0 rounded p-px opacity-60 hover:opacity-100 transition-opacity duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          aria-label="Remove"
        >
          <X className="size-3.5" />
        </button>
      )}
    </span>
  )
}
