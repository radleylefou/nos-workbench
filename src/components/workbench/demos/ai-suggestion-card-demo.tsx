"use client"

import { toast } from "sonner"
import { AISuggestionCard } from "@/components/ui/ai-suggestion-card"

export function AISuggestionSuggestionDemo() {
  return (
    <AISuggestionCard
      type="suggestion"
      title="Reuse Clinical Assessment epic"
      description="EPIC-031 from Acme Health has 90% overlap with your current scope. Importing it could save 8 story points."
      onApply={() => toast.success("Epic imported")}
      onDismiss={() => toast("Suggestion dismissed")}
    />
  )
}

export function AISuggestionHintDemo() {
  return (
    <AISuggestionCard
      type="hint"
      title="Estimation confidence is low"
      description="3 epics in Phase 2 have fewer than 2 acceptance criteria. Adding criteria improves estimate accuracy."
      onApply={() => toast.info("Opening AC editor")}
      onDismiss={() => toast("Hint dismissed")}
    />
  )
}

export function AISuggestionMatchDemo() {
  return (
    <AISuggestionCard
      type="match"
      title="Similar scope found: Northstar HealthTech"
      description="This engagement matches 7 of 9 solution components with Northstar's Phase 1. View comparison?"
      onApply={() => toast("Opening comparison view")}
      onDismiss={() => toast("Match dismissed")}
    />
  )
}

export function AISuggestionWarningDemo() {
  return (
    <AISuggestionCard
      type="warning"
      title="Open question blocks approval"
      description="Q-03 (Data migration scope) is marked as blocking and unresolved. Approval requires resolution."
      onDismiss={() => toast("Warning acknowledged")}
    />
  )
}
