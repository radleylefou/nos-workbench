"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  changelogAreaLabels,
  type ChangelogArea,
  type ChangelogEntry,
} from "@/lib/changelog-data"

const areaOrder = Object.keys(changelogAreaLabels) as ChangelogArea[]

const areaBadgeClasses: Record<ChangelogArea, string> = {
  tokens: "border-info-200 bg-info-100 text-info-700",
  components: "border-success-200 bg-success-100 text-success-700",
  instructions: "border-warning-200 bg-warning-100 text-warning-700",
  patterns: "border-error-200 bg-error-100 text-error-700",
  workbench: "border-zinc-200 bg-zinc-100 text-zinc-600",
}

/**
 * ChangelogList — client-side filterable release feed.
 *
 * Owns `selectedAreas` state and renders a multi-select area filter above
 * the release list. Filtering cascades: an item is visible if no areas are
 * selected or its area is selected; a section is visible if it has at least
 * one visible item; a release is visible if it has at least one visible
 * section.
 */
export function ChangelogList({ entries }: { entries: ChangelogEntry[] }) {
  const [selectedAreas, setSelectedAreas] = React.useState<ChangelogArea[]>([])

  const isAreaVisible = (area: ChangelogArea) =>
    selectedAreas.length === 0 || selectedAreas.includes(area)

  const visibleEntries = entries
    .map((entry) => {
      const sections = entry.sections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) => isAreaVisible(item.area)),
        }))
        .filter((section) => section.items.length > 0)

      return { ...entry, sections }
    })
    .filter((entry) => entry.sections.length > 0)

  return (
    <div className="flex flex-col gap-6">
      <ToggleGroup
        type="multiple"
        variant="outline"
        value={selectedAreas}
        onValueChange={(value) => setSelectedAreas(value as ChangelogArea[])}
        className="flex-wrap"
      >
        {areaOrder.map((area) => (
          <ToggleGroupItem key={area} value={area} aria-label={`Filter by ${changelogAreaLabels[area]}`}>
            {changelogAreaLabels[area]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {visibleEntries.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-200 py-12 text-center text-sm text-zinc-500">
          No changes match the selected filters.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visibleEntries.map((entry) => (
            <Card key={entry.version} className="gap-0 py-0">
              <CardHeader className="flex-row items-center justify-between gap-4 border-b border-zinc-200 p-5">
                <div className="flex items-center gap-2">
                  <CardTitle>{entry.version}</CardTitle>
                  <Badge variant="outline" className="border-zinc-200 text-zinc-500">
                    Release
                  </Badge>
                </div>
                <CardDescription>{entry.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 p-5">
                {entry.sections.map((section) => (
                  <div key={section.label}>
                    <h3 className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                      {section.label}
                    </h3>
                    <ul className="mt-2 flex flex-col gap-1.5 text-sm text-zinc-700">
                      {section.items.map((item) => (
                        <li key={item.text} className="flex items-center gap-2">
                          <span className="text-zinc-300" aria-hidden>
                            –
                          </span>
                          <span>{item.text}</span>
                          <Badge variant="outline" className={areaBadgeClasses[item.area]}>
                            {changelogAreaLabels[item.area]}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
