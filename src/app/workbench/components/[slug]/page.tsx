import { notFound } from "next/navigation"
import type { ReactNode } from "react"
import { Code2, Component, ExternalLink, PackageCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CodeBlock } from "@/components/workbench/code-block"
import {
  WorkbenchDocsShell,
  WorkbenchHero,
  WorkbenchPanel,
  WorkbenchSection,
} from "@/components/workbench/docs-shell"
import { ShowCode } from "@/components/workbench/show-code"
import { components } from "@/lib/component-registry"
import { demos, docOnlySlugs } from "@/lib/component-demos"

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }))
}

type DemoGroup = {
  label: string
  node: ReactNode
  span?: "full"
  code?: string
  importLine?: string
}

function createDemoCode({
  entryImportLine,
  entryExampleCode,
  item,
}: {
  entryImportLine: string
  entryExampleCode: string
  item: DemoGroup
}) {
  const code =
    item.code ??
    `// Variant-specific code has not been documented yet.\n// Use the canonical example as a starting point.\n${entryExampleCode}`

  return `${item.importLine ?? entryImportLine}\n\n${code}`
}

function DemoGrid({
  entryExampleCode,
  entryImportLine,
  items,
  variantSpan,
}: {
  entryExampleCode: string
  entryImportLine: string
  items: DemoGroup[]
  variantSpan?: "full"
}) {
  return (
    <div className="grid grid-flow-dense grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-4">
      {items.map((item) => {
        const code = createDemoCode({ entryExampleCode, entryImportLine, item })

        return (
          <div
            key={item.label}
            className={`flex min-h-40 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-zinc-950${(item.span === "full" || variantSpan === "full") ? " col-span-full" : ""}`}
          >
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-3 py-2">
              <div className="min-w-0 truncate text-xs font-medium capitalize text-zinc-700">
                {item.label}
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center px-5 py-6">
              {item.node}
            </div>
            <div className="border-t border-zinc-200 px-3 py-2 font-mono text-[11px] text-zinc-400">
              {item.label}
            </div>
            <div className="px-3 pb-3">
              <ShowCode code={code} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function WhenToUseCallout({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
        When to use
      </div>
      <p className="text-sm leading-6 text-zinc-600">{text}</p>
    </div>
  )
}

function DocOnlyPage({ name, description, slug, whenToUse }: { name: string; description: string; slug: string; whenToUse?: string }) {
  const docsUrl = `https://ui.shadcn.com/docs/components/${slug}`
  return (
    <WorkbenchDocsShell toc={[{ href: "#setup", label: "Setup" }]}>
      <WorkbenchHero eyebrow="Component" title={name} description={description}>
        {whenToUse ? <WhenToUseCallout text={whenToUse} /> : null}
      </WorkbenchHero>
      <WorkbenchSection id="setup" title="External setup">
        <WorkbenchPanel className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-base font-semibold tracking-tight text-zinc-950">Use the upstream setup guide</h2>
          <p className="mt-1 text-sm leading-6 text-zinc-600">
            This component needs dedicated project setup, so the workbench links to the canonical Shadcn documentation instead of rendering a partial demo.
          </p>
        </div>
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md bg-zinc-950 px-3 text-sm font-medium text-white transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950/15"
        >
          View docs
          <ExternalLink className="size-3.5" />
        </a>
        </WorkbenchPanel>
      </WorkbenchSection>
    </WorkbenchDocsShell>
  )
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meta = components.find((c) => c.slug === slug)
  if (!meta) notFound()

  if (docOnlySlugs.has(slug)) {
    return <DocOnlyPage name={meta.name} description={meta.description} slug={slug} whenToUse={meta.whenToUse} />
  }

  const entry = demos[slug]
  if (!entry) notFound()

  const codeSnippet = `${entry.importLine}\n\n${entry.exampleCode}`
  const variantCount = entry.variants?.length ?? 0
  const sizeCount = entry.sizes?.length ?? 0

  return (
    <WorkbenchDocsShell
      toc={[
        { href: "#preview", label: "Preview" },
        { href: "#implementation", label: "Implementation" },
      ]}
    >
      <WorkbenchHero
        eyebrow={meta.category}
        title={meta.name}
        description={meta.description}
      >
        {meta.whenToUse ? <WhenToUseCallout text={meta.whenToUse} /> : null}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="gap-1.5 border-zinc-200 text-zinc-600">
            <Component className="size-3" />
            {variantCount} variants
          </Badge>
          {sizeCount ? (
            <Badge variant="outline" className="border-zinc-200 text-zinc-600">
              {sizeCount} sizes
            </Badge>
          ) : null}
        </div>
      </WorkbenchHero>

      <WorkbenchSection id="preview" title="Preview">
        <Tabs defaultValue="variants" className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="variants">Preview</TabsTrigger>
              {entry.sizes ? (
                <TabsTrigger value="sizes">Sizes</TabsTrigger>
              ) : null}
              <TabsTrigger value="code" className="gap-1.5">
                <Code2 className="size-3.5" />
                Code
              </TabsTrigger>
            </TabsList>
            <div className="hidden items-center gap-2 text-xs text-zinc-500 sm:flex">
              <span>{meta.category}</span>
              <span className="text-zinc-300">/</span>
              <span>{meta.name}</span>
            </div>
          </div>

        <TabsContent value="variants" className="m-0">
          {entry.variants ? (
            <DemoGrid
              entryExampleCode={entry.exampleCode}
              entryImportLine={entry.importLine}
              items={entry.variants}
              variantSpan={entry.variantSpan}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              No variants defined.
            </p>
          )}
        </TabsContent>

        {entry.sizes ? (
          <TabsContent value="sizes" className="m-0">
            <DemoGrid
              entryExampleCode={entry.exampleCode}
              entryImportLine={entry.importLine}
              items={entry.sizes}
              variantSpan={entry.variantSpan}
            />
          </TabsContent>
        ) : null}

        <TabsContent value="code" className="m-0">
          <CodeBlock code={codeSnippet} />
        </TabsContent>
      </Tabs>
      </WorkbenchSection>

      <WorkbenchSection id="implementation" title="Implementation">
        <WorkbenchPanel className="p-4">
          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            <PackageCheck className="size-3.5" />
            Import
          </div>
          <code className="block overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs text-zinc-950">
            {entry.importLine}
          </code>
        </WorkbenchPanel>
      </WorkbenchSection>
    </WorkbenchDocsShell>
  )
}
