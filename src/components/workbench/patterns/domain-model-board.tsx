"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { L1ComponentCard } from "@/components/ui/l1-component-card"
import { EpicCard } from "@/components/ui/epic-card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import type { L1Type } from "@/components/ui/l1-distribution-bar"

type L1Card = {
  name: string
  type: L1Type
  epicCount: number
  estimate: number
  phases: string[]
  health: "healthy" | "warning" | "error"
  description?: string
}

const COLUMNS: { type: L1Type; label: string; cards: L1Card[] }[] = [
  {
    type: "Experience",
    label: "Experience",
    cards: [
      { name: "Patient Portal", type: "Experience", epicCount: 4, estimate: 140, phases: ["Phase 1", "Phase 2"], health: "healthy", description: "Patient-facing scheduling and records portal" },
      { name: "Clinical Intake", type: "Experience", epicCount: 3, estimate: 95, phases: ["Phase 1"], health: "warning" },
    ],
  },
  {
    type: "Workflow",
    label: "Workflow",
    cards: [
      { name: "Appointment Routing", type: "Workflow", epicCount: 5, estimate: 180, phases: ["Phase 1", "Phase 2", "Phase 3"], health: "healthy" },
      { name: "Referral Management", type: "Workflow", epicCount: 2, estimate: 60, phases: ["Phase 2"], health: "healthy" },
    ],
  },
  {
    type: "Integration",
    label: "Integration",
    cards: [
      { name: "EHR Connector", type: "Integration", epicCount: 6, estimate: 220, phases: ["Phase 1", "Phase 2"], health: "error", description: "HL7 FHIR integration with existing EHR" },
      { name: "Insurance API", type: "Integration", epicCount: 3, estimate: 85, phases: ["Phase 2"], health: "warning" },
    ],
  },
  {
    type: "Foundation",
    label: "Foundation",
    cards: [
      { name: "Auth & SSO", type: "Foundation", epicCount: 4, estimate: 120, phases: ["Phase 1"], health: "healthy" },
      { name: "Audit Logging", type: "Foundation", epicCount: 2, estimate: 45, phases: ["Phase 2"], health: "healthy" },
    ],
  },
]

type EpicData = {
  epicId: string
  title: string
  l1Type: L1Type
  units: number
  hours: number
  status: "draft" | "approved" | "estimated"
  hasConflict?: boolean
  conflictMessage?: string
}

const SAMPLE_EPICS: EpicData[] = [
  { epicId: "EPIC-001", title: "Patient registration flow", l1Type: "Experience", units: 12, hours: 96, status: "estimated" },
  { epicId: "EPIC-002", title: "Appointment booking UI", l1Type: "Experience", units: 18, hours: 144, status: "approved" },
  { epicId: "EPIC-003", title: "Medical history review", l1Type: "Experience", units: 8, hours: 64, status: "draft", hasConflict: true, conflictMessage: "Dependency on EHR Connector EPIC-012 not yet estimated" },
]

export function DomainModelBoardPattern() {
  const [selectedCard, setSelectedCard] = useState<L1Card | null>(null)
  const [selectedEpic, setSelectedEpic] = useState<EpicData | null>(null)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 overflow-x-auto pb-2">
        {COLUMNS.map((col) => (
          <div key={col.type} className="flex min-w-[240px] flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{col.label}</span>
              <Badge variant="secondary" className="text-[10px]">{col.cards.length}</Badge>
            </div>
            {col.cards.map((card) => (
              <L1ComponentCard
                key={card.name}
                name={card.name}
                type={card.type}
                epicCount={card.epicCount}
                estimate={card.estimate}
                phases={card.phases}
                health={card.health}
                description={card.description}
                onEdit={() => setSelectedCard(card)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* L1 detail sheet */}
      <Sheet open={!!selectedCard} onOpenChange={(o) => !o && setSelectedCard(null)}>
        <SheetContent className="w-96">
          <SheetHeader>
            <SheetTitle>{selectedCard?.name}</SheetTitle>
            <SheetDescription>
              <Badge variant="secondary">{selectedCard?.type}</Badge>
            </SheetDescription>
          </SheetHeader>
          {selectedCard && (
            <div className="flex flex-col gap-4 pt-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Epics</p>
                  <p className="font-medium">{selectedCard.epicCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Estimate</p>
                  <p className="font-medium">{selectedCard.estimate} units</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Phases</p>
                  <p className="font-medium">{selectedCard.phases.join(", ")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Health</p>
                  <p className="font-medium capitalize">{selectedCard.health}</p>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Epics</p>
                <div className="flex flex-col gap-2">
                  {SAMPLE_EPICS.map((epic) => (
                    <button
                      key={epic.epicId}
                      onClick={() => setSelectedEpic(epic)}
                      className="text-left"
                    >
                      <EpicCard
                        epicId={epic.epicId}
                        title={epic.title}
                        l1Type={epic.l1Type}
                        units={epic.units}
                        hours={epic.hours}
                        status={epic.status}
                        hasConflict={epic.hasConflict}
                        conflictMessage={epic.conflictMessage}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Epic detail sheet (2nd level) */}
      <Sheet open={!!selectedEpic} onOpenChange={(o) => !o && setSelectedEpic(null)}>
        <SheetContent className="w-80">
          <SheetHeader>
            <SheetTitle>{selectedEpic?.title}</SheetTitle>
            <SheetDescription>Epic detail — {selectedEpic?.epicId}</SheetDescription>
          </SheetHeader>
          {selectedEpic && (
            <div className="flex flex-col gap-3 pt-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-muted-foreground text-xs">Units</p>
                  <p className="font-medium">{selectedEpic.units}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Hours</p>
                  <p className="font-medium">{selectedEpic.hours}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-xs">
                Click a component card to open its detail panel, then click an epic to see this second-level navigation — all without routing.
              </p>
              <Button size="sm" variant="outline" onClick={() => setSelectedEpic(null)}>Close</Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <h3 className="mb-2 text-sm font-medium">Composes</h3>
        <div className="flex flex-wrap gap-2">
          {["L1ComponentCard (T3-06)", "EpicCard (T4-09)", "Sheet (existing)"].map((c) => (
            <Badge key={c} variant="secondary" className="font-mono text-xs">{c}</Badge>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          3-level navigation (board → L1 → Epic) without routing. Click any L1 card above to open its panel.
        </p>
      </div>
    </div>
  )
}
