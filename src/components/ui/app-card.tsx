"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type AppStatus = "live" | "uat" | "poc" | "coming-soon"

export interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  status?: AppStatus
  icon?: React.ReactNode
  variant?: "grid" | "list"
  onClick?: () => void
}

const statusConfig: Record<AppStatus, { label: string; badgeVariant: "outline" | "secondary" }> = {
  live:          { label: "Live",         badgeVariant: "outline" },
  uat:           { label: "UAT",          badgeVariant: "secondary" },
  poc:           { label: "POC",          badgeVariant: "secondary" },
  "coming-soon": { label: "Coming Soon",  badgeVariant: "outline" },
}

function IconPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl bg-muted text-muted-foreground",
        className
      )}
    >
      <div className="size-5 rounded bg-muted-foreground/20" />
    </div>
  )
}

export function AppCard({
  name,
  status = "live",
  icon,
  variant = "grid",
  onClick,
  className,
  ...props
}: AppCardProps) {
  const isComingSoon = status === "coming-soon"
  const { label, badgeVariant } = statusConfig[status]

  if (variant === "list") {
    return (
      <div
        role={onClick ? "button" : undefined}
        tabIndex={onClick && !isComingSoon ? 0 : isComingSoon ? -1 : undefined}
        onClick={!isComingSoon ? onClick : undefined}
        onKeyDown={
          onClick && !isComingSoon
            ? (e) => { if (e.key === "Enter" || e.key === " ") onClick() }
            : undefined
        }
        className={cn(
          "flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3",
          onClick && !isComingSoon && "cursor-pointer transition-colors duration-[var(--duration-fast)] hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isComingSoon && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        <div className="shrink-0">
          {icon
            ? <div className="size-10 overflow-hidden rounded-xl">{icon}</div>
            : <IconPlaceholder className="size-10" />
          }
        </div>
        <span className="min-w-0 flex-1 truncate text-sm font-medium">{name}</span>
        <Badge variant={badgeVariant}>{label}</Badge>
      </div>
    )
  }

  // Grid variant
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !isComingSoon ? 0 : isComingSoon ? -1 : undefined}
      onClick={!isComingSoon ? onClick : undefined}
      onKeyDown={
        onClick && !isComingSoon
          ? (e) => { if (e.key === "Enter" || e.key === " ") onClick() }
          : undefined
      }
      className={cn(
        "relative flex flex-col gap-2.5 rounded-xl border border-border bg-card p-4",
        onClick && !isComingSoon && "cursor-pointer transition-colors duration-[var(--duration-fast)] hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isComingSoon && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <div className="absolute top-3 right-3">
        <Badge variant={badgeVariant}>{label}</Badge>
      </div>
      <div className="mb-1">
        {icon
          ? <div className="size-14 overflow-hidden rounded-xl">{icon}</div>
          : <IconPlaceholder className="size-14" />
        }
      </div>
      <p className="pr-16 text-sm font-medium leading-snug">{name}</p>
    </div>
  )
}
