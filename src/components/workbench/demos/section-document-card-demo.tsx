"use client"

import { toast } from "sonner"
import { SectionDocumentCard } from "@/components/ui/section-document-card"

export function SectionDocumentCardDemo() {
  return (
    <SectionDocumentCard
      title="Solution Overview"
      status="approved"
      onEdit={() => toast.info("Opening editor")}
      aiActions={[
        { label: "Regenerate", onClick: () => toast("Regenerating section…") },
        { label: "Translate to client language", onClick: () => toast.info("Translating…") },
      ]}
    >
      <p className="text-sm text-muted-foreground">
        This solution automates the clinical intake process using intelligent form routing
        and real-time eligibility verification, reducing manual effort by 60%.
      </p>
    </SectionDocumentCard>
  )
}

export function SectionDocumentCardDraftDemo() {
  return (
    <SectionDocumentCard
      title="Domain Model"
      status="draft"
      aiActions={[
        { label: "Refine structure", onClick: () => toast("Refining…") },
      ]}
    >
      <p className="text-sm text-muted-foreground italic">
        AI-generated first draft. Review and refine before sharing with client.
      </p>
    </SectionDocumentCard>
  )
}
