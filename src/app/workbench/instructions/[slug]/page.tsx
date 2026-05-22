import { readFile } from "node:fs/promises"
import path from "node:path"
import { notFound } from "next/navigation"

import { CopyButton } from "@/components/workbench/copy-button"
import { MarkdownView } from "@/components/workbench/markdown-view"
import { navigation, type InstructionSlug } from "@/lib/workbench-data"

const slugToFile: Record<InstructionSlug, { file: string; title: string }> = {
  agents: { file: "AGENTS.md", title: "Agents" },
  rules: { file: "rules.md", title: "Rules" },
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
  if (!(navigation.instructions as readonly string[]).includes(slug)) {
    notFound()
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
