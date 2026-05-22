import { notFound } from "next/navigation"
import type { ReactNode } from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CodeBlock } from "@/components/workbench/code-block"
import { ShowCode } from "@/components/workbench/show-code"
import {
  componentEntries,
  navigation,
  type ComponentSlug,
} from "@/lib/workbench-data"

export function generateStaticParams() {
  return navigation.components.map((slug) => ({ slug }))
}

type DemoGroup = { label: string; node: ReactNode }

function DemoGrid({ items }: { items: DemoGroup[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-3 rounded-md border border-border bg-card p-4 ring-1 ring-foreground/5"
        >
          <div className="flex min-h-24 items-center justify-center">
            {item.node}
          </div>
          <div className="text-center font-mono text-[11px] text-muted-foreground">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!(navigation.components as readonly string[]).includes(slug)) {
    notFound()
  }
  const entry = componentEntries[slug as ComponentSlug]

  const codeSnippet = `${entry.importLine}\n\n${entry.exampleCode}`

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">{entry.name}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {entry.description}
        </p>
      </div>

      <Tabs defaultValue="variants">
        <TabsList>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          {entry.sizes ? (
            <TabsTrigger value="sizes">Sizes</TabsTrigger>
          ) : null}
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

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
