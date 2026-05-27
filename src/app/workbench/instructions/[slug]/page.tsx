import { readFile } from "node:fs/promises"
import path from "node:path"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  GitBranch,
  ListChecks,
  Route,
  Sparkles,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/workbench/copy-button"
import {
  WorkbenchDocsShell,
  WorkbenchHero,
  WorkbenchPanel,
  WorkbenchSection,
} from "@/components/workbench/docs-shell"
import { MarkdownView } from "@/components/workbench/markdown-view"
import {
  agentSourceFiles,
  buildPlanTemplate,
  generatedAppChecklist,
  prdBuildPlanPrompt,
  starterPrompt,
} from "@/lib/agent-instructions"
import { navigation, type InstructionSlug } from "@/lib/workbench-data"

const slugToFile: Record<InstructionSlug, { file: string; title: string }> = {
  agents: { file: "AGENTS.md", title: "Instructions" },
  rules: { file: "rules.md", title: "Design Rules" },
}

const referenceLinks = [
  {
    label: "Components",
    description: "Reusable primitives and application components.",
    href: "/workbench/components/button",
  },
  {
    label: "Tokens",
    description: "Color, spacing, radius, typography, and motion values.",
    href: "/workbench/tokens/color",
  },
  {
    label: "Patterns",
    description: "Composed product screens and layout templates.",
    href: "/workbench/patterns/workspace-shell",
  },
] as const

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

  if (slug === "agents") {
    return <AgentInstructionsPage />
  }

  const meta = slugToFile[slug as InstructionSlug]
  const filePath = path.join(process.cwd(), "instructions", meta.file)
  const source = await readFile(filePath, "utf8")

  return (
    <WorkbenchDocsShell toc={[{ href: "#source", label: "Source" }]}>
      <WorkbenchHero
        eyebrow="Instructions"
        title={meta.title}
        description={`Source: instructions/${meta.file}`}
      >
        <CopyButton value={source} label="Copy all" />
      </WorkbenchHero>
      <WorkbenchSection id="source" title="Source">
        <WorkbenchPanel className="p-6">
          <MarkdownView source={source} className="max-w-none" />
        </WorkbenchPanel>
      </WorkbenchSection>
    </WorkbenchDocsShell>
  )
}

function AgentInstructionsPage() {
  return (
    <WorkbenchDocsShell
      toc={[
        { href: "#starter", label: "Starter prompt" },
        { href: "#prd-flow", label: "PRD workflow" },
        { href: "#files", label: "Files" },
        { href: "#checklist", label: "Checklist" },
        { href: "#references", label: "References" },
      ]}
    >
      <WorkbenchHero
        eyebrow="For coding agents"
        title="Instructions"
        description="Copy the starter prompt into your coding agent with the app PRD. The agent should convert the PRD into a build plan before writing code, then use the workbench as visual reference and the repo as implementation truth."
      />

      <section id="starter" data-workbench-reveal className="scroll-mt-28 overflow-hidden rounded-[1.25rem] bg-zinc-950 text-zinc-100 shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
        <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              COPY INTO YOUR AGENT
            </p>
            <div className="mt-1 flex items-center gap-2">
              <Sparkles className="size-4 text-white" />
              <h2 className="text-lg font-semibold tracking-tight text-white">
                Starter prompt
              </h2>
            </div>
            <p className="mt-1 text-xs text-zinc-400">
              Source file: <code>instructions/AGENTS.md</code>
            </p>
          </div>
          <CopyButton
            value={starterPrompt}
            label="Copy all"
            className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          />
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap p-5 font-mono text-xs leading-6 text-zinc-100">
          {starterPrompt}
        </pre>
      </section>

      <WorkbenchSection
        id="prd-flow"
        title="Start from a PRD"
        description="Use this flow when a new app starts from a product brief, PRD, or client scope. It keeps the agent from building everything in one pass."
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <WorkbenchPanel className="flex flex-col gap-4 p-5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-white">
              <FileText className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-950">
                1. Attach the PRD
              </h3>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Paste the starter prompt and include the full app PRD, plus any
                repo, API, data, auth, or deployment constraints.
              </p>
            </div>
          </WorkbenchPanel>
          <WorkbenchPanel className="flex flex-col gap-4 p-5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-white">
              <Route className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-950">
                2. Plan before coding
              </h3>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Ask the agent to enter plan mode and produce SPEC.md or an
                equivalent build plan with chunks and acceptance checks.
              </p>
            </div>
          </WorkbenchPanel>
          <WorkbenchPanel className="flex flex-col gap-4 p-5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-950 text-white">
              <CheckCircle2 className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-950">
                3. Build in chunks
              </h3>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Approve the plan, then have the agent build one chunk at a time
                and verify each chunk in the browser before continuing.
              </p>
            </div>
          </WorkbenchPanel>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <PromptCard
            id="prd-planning-prompt"
            eyebrow="COPY AFTER THE STARTER PROMPT"
            title="PRD-to-build-plan prompt"
            value={prdBuildPlanPrompt}
          />
          <PromptCard
            id="build-plan-template"
            eyebrow="OPTIONAL SPEC TEMPLATE"
            title="Build plan template"
            value={buildPlanTemplate}
          />
        </div>
      </WorkbenchSection>

      <WorkbenchSection
        id="files"
        title="Files agents should inspect"
        description="Give the agent these paths when it needs implementation truth."
      >
        <div className="grid grid-flow-dense grid-cols-1 gap-4 lg:grid-cols-3">
          {agentSourceFiles.map((file) => (
            <WorkbenchPanel key={file.path} className="flex h-full flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white ring-1 ring-zinc-950">
                    <FileText className="size-4" />
                  </div>
                  <Badge variant="outline" className="max-w-full truncate border-zinc-200 font-mono text-zinc-600">
                    {file.path}
                  </Badge>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-zinc-950">{file.label}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">
                    {file.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <CopyButton value={file.path} label="Copy path" />
                  <Button asChild variant="outline" size="sm" className="gap-1.5">
                    <a href={file.githubUrl} target="_blank" rel="noreferrer">
                      GitHub
                      <ExternalLink />
                    </a>
                  </Button>
                </div>
            </WorkbenchPanel>
          ))}
        </div>
      </WorkbenchSection>

      <section className="grid grid-cols-1 gap-4 py-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <WorkbenchPanel className="p-5">
          <div id="checklist" className="scroll-mt-28">
            <div className="flex items-center gap-2">
              <ListChecks className="size-4 text-zinc-950" />
              <h2 className="text-lg font-semibold tracking-tight">
                Checklist for generated apps
              </h2>
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {generatedAppChecklist.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-zinc-950" />
                  <span className="text-zinc-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </WorkbenchPanel>

        <WorkbenchPanel className="p-5">
          <div id="references" className="scroll-mt-28">
            <div className="flex items-center gap-2">
              <GitBranch className="size-4 text-zinc-950" />
              <h2 className="text-lg font-semibold tracking-tight">
                Jump to references
              </h2>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {referenceLinks.map((link) => (
                <Button
                  key={link.href}
                  asChild
                  variant="outline"
                  className="h-auto justify-between gap-4 p-3 text-left"
                >
                  <Link href={link.href}>
                    <span>
                      <span className="block text-sm font-semibold">
                        {link.label}
                      </span>
                      <span className="mt-0.5 block text-xs font-normal text-zinc-500">
                        {link.description}
                      </span>
                    </span>
                    <ArrowRight className="size-4 shrink-0" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </WorkbenchPanel>
      </section>
    </WorkbenchDocsShell>
  )
}

function PromptCard({
  id,
  eyebrow,
  title,
  value,
}: {
  id: string
  eyebrow: string
  title: string
  value: string
}) {
  return (
    <section
      id={id}
      data-workbench-reveal
      className="scroll-mt-28 overflow-hidden rounded-[1.25rem] border border-zinc-200 bg-white"
    >
      <div className="flex flex-col gap-3 border-b border-zinc-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {eyebrow}
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-zinc-950">
            {title}
          </h3>
        </div>
        <CopyButton value={value} label="Copy all" />
      </div>
      <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap bg-zinc-50 p-5 font-mono text-xs leading-6 text-zinc-700">
        {value}
      </pre>
    </section>
  )
}
