"use client"

import { toast } from "sonner"
import { AIActionBar } from "@/components/ui/ai-action-bar"

export function AIActionBarDemo() {
  return (
    <div className="w-full rounded-md border border-border p-4 flex flex-col gap-3">
      <p className="text-sm text-foreground">
        AI generated a first draft of the solution overview based on the intake form.
      </p>
      <AIActionBar
        actions={[
          { label: "Regenerate", onClick: () => toast("Regenerating…") },
          { label: "Expand section", onClick: () => toast("Expanding section…") },
          { label: "Add examples", onClick: () => toast("Adding examples…") },
        ]}
      />
    </div>
  )
}

export function AIActionBarMinimalDemo() {
  return (
    <div className="w-full rounded-md border border-border p-3">
      <p className="text-sm text-muted-foreground mb-3">Section content preview</p>
      <AIActionBar
        label="Suggestions:"
        actions={[
          { label: "Accept all", onClick: () => toast("Accepted all suggestions") },
          { label: "Review one by one", onClick: () => toast.info("Entering review mode") },
        ]}
      />
    </div>
  )
}
