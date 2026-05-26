"use client"

import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const sections = [
  { id: "overview", label: "Solution Overview" },
  { id: "domain-model", label: "Domain Model" },
  { id: "phasing", label: "Phasing" },
  { id: "timeline", label: "Timeline" },
  { id: "team", label: "Team" },
  { id: "budget", label: "Budget" },
  { id: "risks", label: "Risks" },
  { id: "questions", label: "Open Questions" },
  { id: "assumptions", label: "Assumptions" },
  { id: "dependencies", label: "Dependencies" },
  { id: "success", label: "Success Criteria" },
  { id: "appendix", label: "Appendix" },
]

function SectionAnchor({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-3 scroll-mt-4">
      <h2 className="text-lg font-semibold">{label}</h2>
      <Separator />
      {children}
    </section>
  )
}

export function ScopeDocumentPattern() {
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) => {
    const el = contentRef.current?.querySelector(`#${id}`)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
        This is a separate application screen — its own Next.js route with independent navigation, not a workbench component page.
      </div>

      <div className="flex gap-0 overflow-hidden rounded-lg border border-border">
        {/* Doc nav */}
        <nav className="flex w-52 shrink-0 flex-col border-r border-border bg-muted/30 py-3">
          <div className="mb-2 px-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Contents
          </div>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="px-4 py-1.5 text-left text-sm text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Document content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto max-h-[600px] flex flex-col gap-8 p-6">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">v1.3</Badge>
              <Badge style={{ backgroundColor: "color-mix(in oklch, var(--success) 15%, transparent)", color: "var(--success)" }}>
                Approved
              </Badge>
            </div>
            <h1 className="text-2xl font-bold">Clinical Intake Automation Platform</h1>
            <p className="text-sm text-muted-foreground">Acme Health Systems · Prepared by Nymbl · May 2026</p>
          </div>

          <SectionAnchor id="overview" label="Solution Overview">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This scope document defines the design and delivery plan for the Clinical Intake Automation Platform — a cloud-native, patient-centric system that digitises and automates the end-to-end clinical intake process at Acme Health Systems.
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="rounded-md border border-border p-3">
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="font-semibold">$480,000</p>
              </div>
              <div className="rounded-md border border-border p-3">
                <p className="text-xs text-muted-foreground">Timeline</p>
                <p className="font-semibold">9 months</p>
              </div>
              <div className="rounded-md border border-border p-3">
                <p className="text-xs text-muted-foreground">Phases</p>
                <p className="font-semibold">3</p>
              </div>
            </div>
          </SectionAnchor>

          <SectionAnchor id="domain-model" label="Domain Model">
            <p className="text-sm text-muted-foreground">Four L1 capability domains identified during discovery:</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { type: "Experience", count: 6 },
                { type: "Workflow", count: 7 },
                { type: "Integration", count: 9 },
                { type: "Foundation", count: 6 },
              ].map((d) => (
                <div key={d.type} className="flex items-center justify-between rounded-md border border-border p-3">
                  <span>{d.type}</span>
                  <Badge variant="secondary">{d.count} epics</Badge>
                </div>
              ))}
            </div>
          </SectionAnchor>

          <SectionAnchor id="phasing" label="Phasing">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phase</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Focus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Phase 1</TableCell>
                  <TableCell>3 months</TableCell>
                  <TableCell>$160,000</TableCell>
                  <TableCell>Core intake + auth</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Phase 2</TableCell>
                  <TableCell>3 months</TableCell>
                  <TableCell>$160,000</TableCell>
                  <TableCell>Workflow automation</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Phase 3</TableCell>
                  <TableCell>3 months</TableCell>
                  <TableCell>$160,000</TableCell>
                  <TableCell>Integration & reporting</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </SectionAnchor>

          <SectionAnchor id="timeline" label="Timeline">
            <p className="text-sm text-muted-foreground">Gantt view placeholder — see Planning › Gantt for the full interactive timeline component.</p>
            <div className="h-24 rounded-md border border-dashed border-border bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">
              Gantt chart — composes &lt;Gantt /&gt; component
            </div>
          </SectionAnchor>

          <SectionAnchor id="team" label="Team">
            <p className="text-sm text-muted-foreground">Full team roster — see Application Components › Team Roster Panel.</p>
            <div className="h-24 rounded-md border border-dashed border-border bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">
              Team roster — composes &lt;TeamRosterPanel /&gt; component
            </div>
          </SectionAnchor>

          <SectionAnchor id="budget" label="Budget">
            <p className="text-sm text-muted-foreground">Budget breakdown placeholder.</p>
          </SectionAnchor>

          <SectionAnchor id="risks" label="Risks">
            <p className="text-sm text-muted-foreground">Risk register — see Application Components › Risk Heatmap.</p>
            <div className="h-16 rounded-md border border-dashed border-border bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">
              Risk heatmap — composes &lt;RiskHeatmap /&gt; component
            </div>
          </SectionAnchor>

          <SectionAnchor id="questions" label="Open Questions">
            <p className="text-sm text-muted-foreground">3 open questions remain. See Application Components › Open Question Row.</p>
          </SectionAnchor>

          <SectionAnchor id="assumptions" label="Assumptions">
            <p className="text-sm text-muted-foreground">Assumptions captured during discovery workshops.</p>
          </SectionAnchor>

          <SectionAnchor id="dependencies" label="Dependencies">
            <p className="text-sm text-muted-foreground">External system dependencies identified.</p>
          </SectionAnchor>

          <SectionAnchor id="success" label="Success Criteria">
            <ul className="flex flex-col gap-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Patient intake time reduced by 40%</li>
              <li>Zero manual data re-entry between systems</li>
              <li>98% EHR sync accuracy at go-live</li>
            </ul>
          </SectionAnchor>

          <SectionAnchor id="appendix" label="Appendix">
            <p className="text-sm text-muted-foreground">Supporting materials and reference documents.</p>
          </SectionAnchor>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" size="sm">Export PDF</Button>
            <Button size="sm">Share with Client</Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <h3 className="mb-2 text-sm font-medium">Composes</h3>
        <div className="flex flex-wrap gap-2">
          {["Typography", "NavigationMenu", "Table", "Badge", "Separator"].map((c) => (
            <Badge key={c} variant="secondary" className="font-mono text-xs">{c}</Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
