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
import { ShowCode } from "@/components/workbench/show-code"
import { components } from "@/lib/component-registry"
import { demos, docOnlySlugs } from "@/lib/component-demos"

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }))
}

type DemoGroup = { label: string; node: ReactNode }

function DemoGrid({ items }: { items: DemoGroup[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="group/demo flex min-h-36 flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-xs ring-1 ring-foreground/5 transition-[border-color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-sm"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/35 px-3 py-2">
            <div className="min-w-0 truncate text-xs font-medium capitalize text-foreground">
              {item.label}
            </div>
          </div>
          <div className="flex flex-1 items-start justify-center px-4 py-4">
            {item.node}
          </div>
          <div className="border-t border-border px-3 py-2 font-mono text-[11px] text-muted-foreground">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}

function DocOnlyPage({ name, description, slug }: { name: string; description: string; slug: string }) {
  const docsUrl = `https://ui.shadcn.com/docs/components/${slug}`
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-border bg-background p-6 shadow-xs ring-1 ring-foreground/5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Documentation</Badge>
          <Badge variant="outline">External setup</Badge>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight">{name}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-xs ring-1 ring-foreground/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-base font-semibold tracking-tight">Use the upstream setup guide</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            This component needs dedicated project setup, so the workbench links to the canonical Shadcn documentation instead of rendering a partial demo.
          </p>
        </div>
        <a
          href={docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-primary/85 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          View docs
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </div>
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
    return <DocOnlyPage name={meta.name} description={meta.description} slug={slug} />
  }

  const entry = demos[slug]
  if (!entry) notFound()

  const codeSnippet = `${entry.importLine}\n\n${entry.exampleCode}`
  const variantCount = entry.variants?.length ?? 0
  const sizeCount = entry.sizes?.length ?? 0

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-border bg-background p-6 shadow-xs ring-1 ring-foreground/5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1.5">
                <Component className="size-3" />
                {meta.category}
              </Badge>
              <Badge variant="outline">{variantCount} variants</Badge>
              {sizeCount ? <Badge variant="outline">{sizeCount} sizes</Badge> : null}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">{meta.name}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {meta.description}
            </p>
          </div>
          <div className="min-w-0 rounded-lg bg-muted/45 p-3 ring-1 ring-border lg:w-[26rem]">
            <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              <PackageCheck className="size-3.5" />
              Import
            </div>
            <code className="block truncate font-mono text-xs text-foreground">
              {entry.importLine}
            </code>
          </div>
        </div>
      </div>

      <Tabs defaultValue="variants" className="rounded-xl border border-border bg-background p-4 shadow-xs ring-1 ring-foreground/5 sm:p-6">
        <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold tracking-tight">Preview matrix</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Stable enterprise examples for visual QA and implementation reference.
            </p>
          </div>
          <TabsList>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          {entry.sizes ? (
            <TabsTrigger value="sizes">Sizes</TabsTrigger>
          ) : null}
            <TabsTrigger value="code" className="gap-1.5">
              <Code2 className="size-3.5" />
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="variants" className="mt-6">
          {entry.variants ? (
            <>
              <DemoGrid items={entry.variants} />
              <ShowCode code={codeSnippet} />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              No variants defined.
            </p>
          )}
        </TabsContent>

        {entry.sizes ? (
          <TabsContent value="sizes" className="mt-6">
            <DemoGrid items={entry.sizes} />
            <ShowCode code={codeSnippet} />
          </TabsContent>
        ) : null}

        <TabsContent value="code" className="mt-6">
          <CodeBlock code={codeSnippet} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
