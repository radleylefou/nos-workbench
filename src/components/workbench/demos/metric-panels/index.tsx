import type { ComponentType } from "react"

import { Badge } from "@/components/ui/badge"
import { Stats02 } from "@/components/workbench/demos/metric-panels/stats-02"
import { Stats04 } from "@/components/workbench/demos/metric-panels/stats-04"
import { Stats05 } from "@/components/workbench/demos/metric-panels/stats-05"
import { Stats06 } from "@/components/workbench/demos/metric-panels/stats-06"
import { Stats07 } from "@/components/workbench/demos/metric-panels/stats-07"
import { Stats08 } from "@/components/workbench/demos/metric-panels/stats-08"
import { Stats09 } from "@/components/workbench/demos/metric-panels/stats-09"
import { Stats10 } from "@/components/workbench/demos/metric-panels/stats-10"
import { Stats11 } from "@/components/workbench/demos/metric-panels/stats-11"
import { Stats12 } from "@/components/workbench/demos/metric-panels/stats-12"
import { Stats13 } from "@/components/workbench/demos/metric-panels/stats-13"
import { Stats14 } from "@/components/workbench/demos/metric-panels/stats-14"
import { Stats15 } from "@/components/workbench/demos/metric-panels/stats-15"

type GalleryBlock = {
  id: string
  title: string
  description: string
  component: ComponentType
}

const metricPanelBlocks: GalleryBlock[] = [
  { id: "metric-panel-01", title: "Bordered KPI Row", description: "Bordered KPI cells with trend badges and compact value hierarchy.", component: Stats02 },
  { id: "metric-panel-02", title: "Metric Cards with Badges", description: "Metric cards with status badges and directional trend indicators.", component: Stats04 },
  { id: "metric-panel-03", title: "Linked Metric Cards", description: "Metric cards for drill-down navigation and compact health checks.", component: Stats05 },
  { id: "metric-panel-04", title: "Operational Status Cards", description: "Operational values paired with status icons and progressive disclosure links.", component: Stats06 },
  { id: "metric-panel-05", title: "Circular Progress Metrics", description: "Radial progress KPI cards for plan, usage, or quota reporting.", component: Stats07 },
  { id: "metric-panel-06", title: "Circular Progress Actions", description: "Radial progress cards with linked next actions.", component: Stats08 },
  { id: "metric-panel-07", title: "Progress Metrics", description: "Progress-bar metrics for quota and completion surfaces.", component: Stats09 },
  { id: "metric-panel-08", title: "Area Chart Metrics", description: "Compact area-chart metrics for directional trend context.", component: Stats10 },
  { id: "metric-panel-09", title: "Quota Dashboard", description: "A richer dashboard panel with editable quotas and progress summaries.", component: Stats11 },
  { id: "metric-panel-10", title: "Usage Dashboard", description: "Usage dashboard with pie chart allocation and action controls.", component: Stats12 },
  { id: "metric-panel-11", title: "Segmented Progress Metrics", description: "Segmented progress bars for multi-category distribution.", component: Stats13 },
  { id: "metric-panel-12", title: "Usage Breakdown", description: "Usage breakdown cards with status badges and category rows.", component: Stats14 },
  { id: "metric-panel-13", title: "Value Breakdown", description: "Value breakdown rows for compact financial or operational summaries.", component: Stats15 },
]

function ComponentGallery({ blocks }: { blocks: GalleryBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, index) => {
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

export function MetricPanelsGallery() {
  return <ComponentGallery blocks={metricPanelBlocks} />
}
