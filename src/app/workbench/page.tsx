import Link from "next/link"
import { Component, FileText, Layers3, PanelLeft, SwatchBook } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { components } from "@/lib/component-registry"
import { navigation } from "@/lib/workbench-data"

const sections = [
  {
    key: "components",
    label: "Components",
    description: "Reusable building blocks for every screen.",
    href: "/workbench/components/button",
    icon: Component,
    count: components.length,
  },
  {
    key: "tokens",
    label: "Tokens",
    description: "Color, spacing, radius, typography, and motion.",
    href: "/workbench/tokens/color",
    icon: SwatchBook,
    count: navigation.tokens.length,
  },
  {
    key: "instructions",
    label: "Instructions",
    description: "Rules for AI coders building with NOS.",
    href: "/workbench/instructions/agent-rules",
    icon: FileText,
    count: navigation.instructions.length,
  },
  {
    key: "patterns",
    label: "Patterns",
    description: "Composed product screens and layout templates.",
    href: "/workbench/patterns/workspace-shell",
    icon: PanelLeft,
    count: navigation.patterns.length,
  },
]

export default function WorkbenchHome() {
  return (
    <div className="flex flex-col gap-10">
      {/* Hero */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
            <Layers3 className="size-5" />
          </div>
          <Badge variant="secondary" className="h-6 px-2 text-xs">
            v3 · Canonical
          </Badge>
        </div>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">NOS Design System</h1>
          <p className="mt-2 max-w-xl text-base text-muted-foreground">
            The shared component and token library for all Nymbl apps. Copy the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">ui/</code> folder
            and token variables into any Next.js project to start building.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="font-semibold tabular-nums text-foreground">{components.length}</span> components
          <span aria-hidden>·</span>
          <span className="font-semibold tabular-nums text-foreground">{navigation.tokens.length}</span> token sets
          <span aria-hidden>·</span>
          <span className="font-semibold tabular-nums text-foreground">{navigation.patterns.length}</span> patterns
        </div>
      </div>

      <Separator />

      {/* Browse sections */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight">Browse</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Link key={section.key} href={section.href} className="group/card">
                <Card className="h-full transition-shadow duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:shadow-md">
                  <CardContent className="flex flex-col gap-3 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                        <Icon className="size-4" />
                      </div>
                      <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                        {section.count}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-semibold group-hover/card:text-primary transition-colors duration-[var(--duration-fast)]">
                        {section.label}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{section.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Quick start */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight">Using NOS in a new Nymbl app</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Copy the component folder",
              code: "src/components/ui/ → your project",
            },
            {
              step: "2",
              title: "Copy the token variables",
              code: "NOS blocks from globals.css → your globals.css",
            },
            {
              step: "3",
              title: "Import and build",
              code: 'import { Button } from "@/components/ui/button"',
            },
          ].map((item) => (
            <Card key={item.step}>
              <CardContent className="flex flex-col gap-2 p-5">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                  {item.step}
                </div>
                <p className="text-sm font-medium">{item.title}</p>
                <code className="rounded-md bg-muted px-2 py-1.5 text-[11px] font-mono text-muted-foreground leading-relaxed">
                  {item.code}
                </code>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Full rules in{" "}
          <Link
            href="/workbench/instructions/agent-rules"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            Agent Rules
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
