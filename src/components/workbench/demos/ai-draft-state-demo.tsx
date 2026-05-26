"use client"

import { useState } from "react"
import { AIDraftState } from "@/components/ui/ai-draft-state"

const SAMPLE_CONTENT = (
  <p className="text-sm">
    This solution automates the clinical intake process using intelligent form routing and
    real-time eligibility verification, reducing manual effort by 60% and improving
    patient experience from first contact to enrollment.
  </p>
)

export function AIDraftStateDemo() {
  const [status, setStatus] = useState<"draft" | "reviewed" | "approved">("draft")

  return (
    <div className="w-full max-w-lg">
      <AIDraftState
        status={status}
        draftContent={SAMPLE_CONTENT}
        reviewedBy={status !== "draft" ? "Sarah Chen" : undefined}
        reviewedAt={status !== "draft" ? "May 23, 2026" : undefined}
        approvedBy={status === "approved" ? "Mark Torres" : undefined}
        approvedAt={status === "approved" ? "May 24, 2026" : undefined}
        onMarkReviewed={() => setStatus("reviewed")}
        onApprove={() => setStatus("approved")}
      />
    </div>
  )
}

export function AIDraftStateStaticDemo() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <AIDraftState
        status="draft"
        draftContent={<p className="text-sm text-muted-foreground">AI-generated draft content appears here.</p>}
      />
      <AIDraftState
        status="reviewed"
        draftContent={<p className="text-sm text-muted-foreground">Reviewed content.</p>}
        reviewedBy="Sarah Chen"
        reviewedAt="May 23"
      />
      <AIDraftState
        status="approved"
        draftContent={<p className="text-sm text-muted-foreground">Approved content.</p>}
        approvedBy="Mark Torres"
        approvedAt="May 24"
      />
    </div>
  )
}
