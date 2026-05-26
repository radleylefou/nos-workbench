"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { EstimateDetailDrawer } from "@/components/ui/estimate-detail-drawer"

export function EstimateDetailDrawerDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        Open Estimate Drawer
      </Button>
      <EstimateDetailDrawer
        open={open}
        onClose={() => setOpen(false)}
        storyId="STORY-047"
        storyTitle="Patient eligibility verification via API"
        acceptanceCriteria={[
          { id: "AC-1", text: "Real-time eligibility check completes in < 2s" },
          { id: "AC-2", text: "Handles 5 payer types (Medicare, Medicaid, BCBS, Aetna, UHC)" },
          { id: "AC-3", text: "Returns structured error codes for each failure type" },
          { id: "AC-4", text: "Caches results for 15 minutes per patient" },
        ]}
        baseValue={5}
        multiplier={1.5}
        acBonus={4}
        totalEstimate={11}
        aiSuggestedComplexity="Medium-High (8 pts)"
        relatedAssumptions={["A-07", "A-12"]}
        relatedQuestions={["Q-03"]}
        onSaveOverride={(val, rationale) => {
          toast.success(`Override saved: ${val} pts`)
          setOpen(false)
        }}
      />
    </div>
  )
}
