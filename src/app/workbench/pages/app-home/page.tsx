"use client"

import * as React from "react"
import { LayoutGrid, List } from "lucide-react"

import { AppCard } from "@/components/ui/app-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  APPS,
  CATEGORIES,
  CATEGORY_META,
  PILLARS,
  PILLAR_META,
  type App,
  type AppCategory,
  type AppPillar,
  type AppStatus,
} from "./data"

type StatusFilter = AppStatus | "all"
type GroupBy = "type" | "pillar"
type ViewMode = "grid" | "list"

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all",  label: "All" },
  { value: "live", label: "Live" },
  { value: "uat",  label: "UAT" },
  { value: "poc",  label: "POC" },
]

function filterApps(apps: App[], status: StatusFilter): App[] {
  if (status === "all") return apps
  // coming-soon always passes through; filter everything else
  return apps.filter((a) => a.status === "coming-soon" || a.status === status)
}

function CategorySection({
  title,
  description,
  apps,
  viewMode,
}: {
  title: string
  description: string
  apps: App[]
  viewMode: ViewMode
}) {
  if (apps.length === 0) return null
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {title}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {apps.length}
        </span>
      </div>
      <div
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            : "flex flex-col gap-2"
        )}
      >
        {apps.map((app) => (
          <AppCard
            key={app.id}
            name={app.name}
            status={app.status}
            variant={viewMode}
          />
        ))}
      </div>
    </div>
  )
}

export default function AppHomePage() {
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all")
  const [groupBy, setGroupBy] = React.useState<GroupBy>("type")
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid")

  const filtered = filterApps(APPS, statusFilter)

  return (
    <div className="min-h-screen bg-background px-8 py-10">
      {/* Welcome header */}
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Welcome back, Carol
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Jump into one of our apps below to get started.
        </p>
      </div>

      {/* Controls row */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        {/* Status filter + Group By */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status pills */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
            {STATUS_FILTERS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium transition-colors duration-[var(--duration-fast)]",
                  statusFilter === value
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Group By */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Group by</span>
            <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
              {(["type", "pillar"] as GroupBy[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGroupBy(g)}
                  className={cn(
                    "rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors duration-[var(--duration-fast)]",
                    groupBy === g
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {g === "type" ? "Type" : "Pillar"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
            className={viewMode === "grid" ? "bg-muted text-foreground" : "text-muted-foreground"}
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setViewMode("list")}
            aria-label="List view"
            aria-pressed={viewMode === "list"}
            className={viewMode === "list" ? "bg-muted text-foreground" : "text-muted-foreground"}
          >
            <List className="size-4" />
          </Button>
        </div>
      </div>

      {/* App sections */}
      <div className="flex flex-col gap-4">
        {groupBy === "type"
          ? CATEGORIES.map((cat: AppCategory) => {
              const apps = filtered.filter((a) => a.category === cat)
              const meta = CATEGORY_META[cat]
              return (
                <CategorySection
                  key={cat}
                  title={meta.label}
                  description={meta.description}
                  apps={apps}
                  viewMode={viewMode}
                />
              )
            })
          : PILLARS.map((pillar: AppPillar) => {
              const apps = filtered.filter((a) => a.pillar === pillar)
              const meta = PILLAR_META[pillar]
              return (
                <CategorySection
                  key={pillar}
                  title={meta.label}
                  description=""
                  apps={apps}
                  viewMode={viewMode}
                />
              )
            })
        }
      </div>
    </div>
  )
}
