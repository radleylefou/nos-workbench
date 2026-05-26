"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type BannerStatus = "error" | "warning" | "success" | "info" | "feature"
type BannerVariant = "filled" | "light" | "stroke"

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BannerVariant
  status?: BannerStatus
  onClose?: () => void
  icon?: React.ReactNode
}

const statusStyles: Record<BannerStatus, Record<BannerVariant, string>> = {
  error: {
    filled: "bg-[var(--error)] text-white border-transparent",
    light: "bg-[color-mix(in_oklch,var(--error)_12%,transparent)] text-[var(--error)] border-transparent",
    stroke: "border border-[color-mix(in_oklch,var(--error)_40%,transparent)] text-[var(--error)] bg-transparent",
  },
  warning: {
    filled: "bg-[var(--warning)] text-white border-transparent",
    light: "bg-[color-mix(in_oklch,var(--warning)_12%,transparent)] text-[var(--warning)] border-transparent",
    stroke: "border border-[color-mix(in_oklch,var(--warning)_40%,transparent)] text-[var(--warning)] bg-transparent",
  },
  success: {
    filled: "bg-[var(--success)] text-white border-transparent",
    light: "bg-[color-mix(in_oklch,var(--success)_12%,transparent)] text-[var(--success)] border-transparent",
    stroke: "border border-[color-mix(in_oklch,var(--success)_40%,transparent)] text-[var(--success)] bg-transparent",
  },
  info: {
    filled: "bg-[var(--info)] text-white border-transparent",
    light: "bg-[color-mix(in_oklch,var(--info)_12%,transparent)] text-[var(--info)] border-transparent",
    stroke: "border border-[color-mix(in_oklch,var(--info)_40%,transparent)] text-[var(--info)] bg-transparent",
  },
  feature: {
    filled: "bg-primary text-primary-foreground border-transparent",
    light: "bg-[color-mix(in_oklch,var(--primary)_12%,transparent)] text-primary border-transparent",
    stroke: "border border-[color-mix(in_oklch,var(--primary)_40%,transparent)] text-primary bg-transparent",
  },
}

export function Banner({
  className,
  variant = "light",
  status = "info",
  onClose,
  icon,
  children,
  ...props
}: BannerProps) {
  return (
    <div
      className={cn(
        "flex h-11 items-center gap-3 px-4 py-2.5",
        statusStyles[status][variant],
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <div className="flex-1 text-sm font-medium">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 rounded p-0.5 opacity-70 hover:opacity-100 transition-opacity duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
