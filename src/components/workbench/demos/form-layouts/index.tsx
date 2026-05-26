import type { ComponentType } from "react"

import { Badge } from "@/components/ui/badge"
import { FormLayout01 } from "@/components/workbench/demos/form-layouts/form-layout-01"
import { FormLayout02 } from "@/components/workbench/demos/form-layouts/form-layout-02"
import { FormLayout03 } from "@/components/workbench/demos/form-layouts/form-layout-03"
import { FormLayout04 } from "@/components/workbench/demos/form-layouts/form-layout-04"
import { FormLayout05 } from "@/components/workbench/demos/form-layouts/form-layout-05"

type GalleryBlock = {
  id: string
  title: string
  description: string
  component: ComponentType
}

const formLayoutBlocks: GalleryBlock[] = [
  { id: "form-layout-01", title: "Workspace Registration Form", description: "Basic workspace request form with grouped fields and separators.", component: FormLayout01 },
  { id: "form-layout-02", title: "Side Label Form", description: "Responsive form layout with side labels and supporting descriptions.", component: FormLayout02 },
  { id: "form-layout-03", title: "Preference Settings Form", description: "Settings form with checkbox preferences and standard text fields.", component: FormLayout03 },
  { id: "form-layout-04", title: "Package Selection Form", description: "Lead capture form with radio-card package selection.", component: FormLayout04 },
  { id: "form-layout-05", title: "Plan Selection Form", description: "Plan selection form with card-based package comparison.", component: FormLayout05 },
]

export function FormLayoutsGallery() {
  return (
    <div className="flex flex-col gap-5">
      {formLayoutBlocks.map((block, index) => {
        const BlockComponent = block.component

        return (
          <section
            key={block.id}
            className="overflow-hidden rounded-xl border border-border bg-background shadow-xs ring-1 ring-foreground/5"
          >
            <div className="flex flex-col gap-2 border-b border-border bg-muted/30 px-4 py-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </Badge>
                  <h2 className="text-sm font-semibold tracking-tight">{block.title}</h2>
                </div>
                <p className="mt-1 max-w-3xl text-xs leading-5 text-muted-foreground">
                  {block.description}
                </p>
              </div>
              <code className="w-fit rounded-md bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground ring-1 ring-border">
                {block.id}
              </code>
            </div>
            <div className="overflow-x-auto bg-card">
              <div className="min-w-[760px]">
                <BlockComponent />
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
