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
  Sparkles,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CopyButton } from "@/components/workbench/copy-button"
import { MarkdownView } from "@/components/workbench/markdown-view"
import {
  agentSourceFiles,
  generatedAppChecklist,
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
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">{meta.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Source: <code className="font-mono">instructions/{meta.file}</code>
          </p>
        </div>
        <CopyButton value={source} label="Copy all" />
      </div>
      <MarkdownView source={source} />
    </div>
  )
}

function AgentInstructionsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          FOR CODING AGENTS
        </Badge>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight">Instructions</h1>
          <p className="mt-2 text-base leading-7 text-muted-foreground">
            Copy the starter prompt into your coding agent before building a new
            Nymbl app. The agent will use the workbench as visual reference and
            the repo as implementation truth.
          </p>
        </div>
      </header>

      <section className="overflow-hidden rounded-lg bg-zinc-950 text-zinc-100 shadow-xs ring-1 ring-foreground/10">
        <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
              COPY INTO YOUR AGENT
            </p>
            <div className="mt-1 flex items-center gap-2">
              <Sparkles className="size-4 text-brand-300" />
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

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Files agents should inspect
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Give the agent these paths when it needs implementation truth.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {agentSourceFiles.map((file) => (
            <Card key={file.path} className="py-0">
              <CardContent className="flex h-full flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                    <FileText className="size-4" />
                  </div>
                  <Badge variant="outline" className="max-w-full truncate font-mono">
                    {file.path}
                  </Badge>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{file.label}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card className="py-0">
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <ListChecks className="size-4 text-primary" />
              <h2 className="text-lg font-semibold tracking-tight">
                Checklist for generated apps
              </h2>
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {generatedAppChecklist.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <GitBranch className="size-4 text-primary" />
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
                      <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                        {link.description}
                      </span>
                    </span>
                    <ArrowRight className="size-4 shrink-0" />
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
