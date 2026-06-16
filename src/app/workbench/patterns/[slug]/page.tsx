import { notFound } from "next/navigation"
import type { ComponentType } from "react"

import { Badge } from "@/components/ui/badge"
import { PortfolioDashboardPattern } from "@/components/workbench/patterns/portfolio-dashboard"
import { DomainModelBoardPattern } from "@/components/workbench/patterns/domain-model-board"
import { EstimationScreenPattern } from "@/components/workbench/patterns/estimation-screen"
import { ScopeDocumentPattern } from "@/components/workbench/patterns/scope-document"
import { ReportingAdminPattern } from "@/components/workbench/patterns/reporting-admin"
import {
  AccountWorkspacePattern,
  BudgetControlCenterPattern,
  DeliveryReleaseTrackerPattern,
  EnablementSkillsMatrixPattern,
  EpicHierarchyViewPattern,
  GuidePriorityCommandPattern,
  ProposalBuilderPattern,
  ProspectCommandCenterPattern,
  ReadinessProfilePattern,
  SpendApprovalQueuePattern,
  StaffingCapacityPlannerPattern,
} from "@/components/workbench/patterns/research-backed"
import {
  NewLeadPattern,
  NewEngagementPattern,
  AddTeamMemberPattern,
  CreateScopeItemPattern,
  LogActivityPattern,
} from "@/components/workbench/patterns/form-modals"
import {
  WorkbenchDocsShell,
  WorkbenchHero,
  WorkbenchPanel,
  WorkbenchSection,
} from "@/components/workbench/docs-shell"
import {
  getModuleReferences,
  getProductPattern,
  productPatterns,
} from "@/lib/nos-product-patterns"

const patternComponents: Record<string, ComponentType> = {
  "portfolio-dashboard": PortfolioDashboardPattern,
  "domain-model-board": DomainModelBoardPattern,
  "estimation-screen": EstimationScreenPattern,
  "scope-document": ScopeDocumentPattern,
  "proposal-builder": ProposalBuilderPattern,
  "reporting-admin": ReportingAdminPattern,
  "prospect-command-center": ProspectCommandCenterPattern,
  "account-workspace": AccountWorkspacePattern,
  "staffing-capacity-planner": StaffingCapacityPlannerPattern,
  "delivery-release-tracker": DeliveryReleaseTrackerPattern,
  "epic-hierarchy-view": EpicHierarchyViewPattern,
  "enablement-skills-matrix": EnablementSkillsMatrixPattern,
  "readiness-profile": ReadinessProfilePattern,
  "budget-control-center": BudgetControlCenterPattern,
  "spend-approval-queue": SpendApprovalQueuePattern,
  "guide-priority-command": GuidePriorityCommandPattern,
  "form-modal-new-lead": NewLeadPattern,
  "form-modal-new-engagement": NewEngagementPattern,
  "form-modal-add-team-member": AddTeamMemberPattern,
  "form-modal-create-scope-item": CreateScopeItemPattern,
  "form-modal-log-activity": LogActivityPattern,
}

export function generateStaticParams() {
  return productPatterns.map((pattern) => ({ slug: pattern.slug }))
}

export default async function PatternPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pattern = getProductPattern(slug)
  const PatternComponent = patternComponents[slug]
  if (!pattern || !PatternComponent) notFound()

  const moduleReferences = getModuleReferences(pattern.moduleIds)

  return (
    <WorkbenchDocsShell
      toc={[
        { href: "#preview", label: "Preview" },
        { href: "#research", label: "Research Trace" },
        { href: "#composition", label: "Composition" },
      ]}
    >
      <WorkbenchHero eyebrow="Patterns" title={pattern.title} description={pattern.description} />
      <WorkbenchSection id="preview" title="Preview">
        <WorkbenchPanel className="overflow-hidden p-3">
          <PatternComponent />
        </WorkbenchPanel>
      </WorkbenchSection>
      <WorkbenchSection
        id="research"
        title="Research Trace"
        description="Every Product Pattern maps back to a NOS module, comparable product bucket, and reusable workflow layout."
      >
        <WorkbenchPanel className="p-5">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs font-medium text-zinc-500">NOS module</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {moduleReferences.map((module) => (
                    <Badge key={module.id} variant="secondary">
                      {module.module}: {module.tagline}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500">Workflow</p>
                <p className="mt-1 text-sm text-zinc-950">{pattern.workflow}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500">Layout variation</p>
                <p className="mt-1 text-sm text-zinc-950">{pattern.layoutVariation}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500">Comparable product buckets</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {pattern.referenceBuckets.map((reference) => (
                    <Badge key={reference} variant="outline">
                      {reference}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-medium text-zinc-500">Acceptance check</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{pattern.acceptanceCheck}</p>
              <div className="mt-4">
                <p className="text-xs font-medium text-zinc-500">Composed NOS components</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {pattern.composedComponents.map((component) => (
                    <Badge key={component} variant="secondary">
                      {component}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </WorkbenchPanel>
      </WorkbenchSection>
      <WorkbenchSection id="composition" title="Composition">
        <WorkbenchPanel className="p-5">
          <div className="flex flex-col gap-5">
            <p className="text-sm leading-6 text-zinc-600">
              Use this as a product-level reference for structure, density, and
              flow. Pull primitive behavior from component pages and token values
              from the token pages.
            </p>
            <div className="grid gap-4 lg:grid-cols-2">
              {moduleReferences.map((module) => (
                <div key={module.id} className="rounded-lg border border-zinc-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-950">
                        {module.module} variations
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        Common layout directions for future NOS screens.
                      </p>
                    </div>
                    <Badge variant="outline">{module.layoutVariations.length}</Badge>
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    {module.layoutVariations.map((variation) => (
                      <div key={variation.name} className="rounded-md bg-zinc-50 p-3">
                        <p className="text-sm font-medium text-zinc-950">{variation.name}</p>
                        <p className="mt-1 text-xs leading-5 text-zinc-600">
                          {variation.structure}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WorkbenchPanel>
      </WorkbenchSection>
    </WorkbenchDocsShell>
  )
}
