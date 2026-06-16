import { readFile } from "node:fs/promises"
import path from "node:path"
import { notFound, redirect } from "next/navigation"
import { FileText } from "lucide-react"

import { designPrinciplesMarkdown } from "@content/instructions"
import { InlineInstructionConfigurator } from "@/components/onboarding/inline-instruction-configurator"
import { InstructionGeneratorDialog } from "@/components/onboarding/instruction-generator-dialog"
import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/components/workbench/copy-button"
import {
  WorkbenchDocsShell,
  WorkbenchHero,
  WorkbenchPanel,
  WorkbenchSection,
} from "@/components/workbench/docs-shell"
import { MarkdownView } from "@/components/workbench/markdown-view"
import { navigation, type InstructionSlug } from "@/lib/workbench-data"

const fragmentPages: Partial<
  Record<
    InstructionSlug,
    {
      title: string
      description: string
      sourceLabel: string
      source: string
      note?: string
    }
  >
> = {
  rules: {
    title: "Design Rules",
    description:
      "Design-principle slice from the canonical NOS instruction fragments.",
    sourceLabel: "content/instructions/base.ts",
    source: designPrinciplesMarkdown,
  },
}

const filePages: Partial<Record<InstructionSlug, { file: string; title: string; description: string }>> = {
  compositions: {
    file: "compositions.md",
    title: "Compositions",
    description: "Screen recipes for app shells, dashboards, directories, detail workflows, and settings.",
  },
}

export function generateStaticParams() {
  return navigation.instructions.map((slug) => ({ slug }))
}

export default async function InstructionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (slug === "agent-rules") {
    redirect("/workbench/instructions/agents")
  }

  if (!(navigation.instructions as readonly string[]).includes(slug)) {
    notFound()
  }

  const instructionSlug = slug as InstructionSlug

  if (instructionSlug === "agents") {
    return <AgentsConfiguratorPage />
  }

  const fragmentPage = fragmentPages[instructionSlug]

  if (fragmentPage) {
    return (
      <InstructionSourcePage
        title={fragmentPage.title}
        description={fragmentPage.description}
        sourceLabel={fragmentPage.sourceLabel}
        source={fragmentPage.source}
        note={fragmentPage.note}
      />
    )
  }

  const filePage = filePages[instructionSlug]

  if (!filePage) {
    notFound()
  }

  const filePath = path.join(process.cwd(), "instructions", filePage.file)
  const source = await readFile(filePath, "utf8")

  return (
    <InstructionSourcePage
      title={filePage.title}
      description={filePage.description}
      sourceLabel={`instructions/${filePage.file}`}
      source={source}
    />
  )
}

function AgentsConfiguratorPage() {
  return (
    <WorkbenchDocsShell toc={[{ href: "#configurator", label: "Configurator" }]}>
      <WorkbenchHero
        eyebrow="Instructions"
        title="Agent Instructions"
        description="Pick your project type and agent to generate a tailored NOS context file and runbook. The assembled file always includes the shared NOS core."
      />

      <WorkbenchSection id="configurator" title="Configurator">
        <InlineInstructionConfigurator />
      </WorkbenchSection>
    </WorkbenchDocsShell>
  )
}

function InstructionSourcePage({
  title,
  description,
  sourceLabel,
  source,
  note,
}: {
  title: string
  description: string
  sourceLabel: string
  source: string
  note?: string
}) {
  return (
    <WorkbenchDocsShell toc={[{ href: "#source", label: "Source" }]}>
      <WorkbenchHero
        eyebrow="Instructions"
        title={title}
        description={description}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">{sourceLabel}</Badge>
          <CopyButton value={source} label="Copy all" />
          <InstructionGeneratorDialog
            triggerLabel="Open generator"
            triggerVariant="outline"
            triggerClassName="h-8 px-3 text-xs"
          />
        </div>
      </WorkbenchHero>

      {note ? (
        <WorkbenchPanel className="mb-6 flex items-start gap-3 p-5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <FileText className="size-4" />
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{note}</p>
        </WorkbenchPanel>
      ) : null}

      <WorkbenchSection id="source" title="Source">
        <WorkbenchPanel className="p-6">
          <MarkdownView source={source} className="max-w-none" />
        </WorkbenchPanel>
      </WorkbenchSection>
    </WorkbenchDocsShell>
  )
}
