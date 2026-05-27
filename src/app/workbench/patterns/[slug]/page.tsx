import { notFound } from "next/navigation"
import { WorkspaceShellPattern } from "@/components/workbench/patterns/workspace-shell"
import { PortfolioDashboardPattern } from "@/components/workbench/patterns/portfolio-dashboard"
import { DomainModelBoardPattern } from "@/components/workbench/patterns/domain-model-board"
import { EstimationScreenPattern } from "@/components/workbench/patterns/estimation-screen"
import { ScopeDocumentPattern } from "@/components/workbench/patterns/scope-document"
import { ReportingAdminPattern } from "@/components/workbench/patterns/reporting-admin"
import {
  WorkbenchDocsShell,
  WorkbenchHero,
  WorkbenchPanel,
  WorkbenchSection,
} from "@/components/workbench/docs-shell"

const patterns: Record<string, { title: string; description: string; component: React.ComponentType }> = {
  "workspace-shell": {
    title: "Engagement Workspace Shell",
    description: "The persistent outer shell: left rail, top bar, main content, and collapsible right panel.",
    component: WorkspaceShellPattern,
  },
  "portfolio-dashboard": {
    title: "Portfolio Dashboard",
    description: "Overview page composing StatCard tiles, DataTable, ActivityFeed, and AvatarGroup.",
    component: PortfolioDashboardPattern,
  },
  "domain-model-board": {
    title: "Domain Model Board",
    description: "4-column L1 component board with push-panel drill-down into epic detail.",
    component: DomainModelBoardPattern,
  },
  "estimation-screen": {
    title: "Estimation Screen",
    description: "4-tab estimation view: Overview, L3 Table, Roll-Up tree, and Reconciliation panel.",
    component: EstimationScreenPattern,
  },
  "scope-document": {
    title: "Client-Facing Scope Document",
    description: "Full-page HTML scope document with persistent section navigation.",
    component: ScopeDocumentPattern,
  },
  "reporting-admin": {
    title: "Portfolio Reporting & Admin",
    description: "Leadership reporting dashboard and settings admin with nested navigation.",
    component: ReportingAdminPattern,
  },
}

export function generateStaticParams() {
  return Object.keys(patterns).map((slug) => ({ slug }))
}

export default async function PatternPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pattern = patterns[slug]
  if (!pattern) notFound()

  const PatternComponent = pattern.component

  return (
    <WorkbenchDocsShell
      toc={[
        { href: "#preview", label: "Preview" },
        { href: "#composition", label: "Composition" },
      ]}
    >
      <WorkbenchHero eyebrow="Patterns" title={pattern.title} description={pattern.description} />
      <WorkbenchSection id="preview" title="Preview">
        <WorkbenchPanel className="overflow-hidden p-3">
          <PatternComponent />
        </WorkbenchPanel>
      </WorkbenchSection>
      <WorkbenchSection id="composition" title="Composition">
        <WorkbenchPanel className="p-5">
          <p className="text-sm leading-6 text-zinc-600">
            Use this as a product-level reference for structure, density, and
            flow. Pull primitive behavior from component pages and token values
            from the token pages.
          </p>
        </WorkbenchPanel>
      </WorkbenchSection>
    </WorkbenchDocsShell>
  )
}
