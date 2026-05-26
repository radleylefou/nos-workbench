import Link from "next/link"
import {
  ArrowRight,
  Component,
  FileText,
  Layers3,
  PanelLeft,
  Sparkles,
  SwatchBook,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CopyButton } from "@/components/workbench/copy-button"
import { starterPrompt } from "@/lib/agent-instructions"
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
    href: "/workbench/instructions/agents",
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
            The shared component and token library for all Nymbl apps. Start by
            orienting your coding agent, then use the workbench as the visual
            reference and the repo as implementation truth.
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
        <Card className="py-0">
          <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex max-w-2xl gap-4">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                <Sparkles className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Start with the agent prompt</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Copy the starter prompt from the Instructions page into your
                  coding agent before you build.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <CopyButton value={starterPrompt} label="Copy starter prompt" />
              <Button asChild variant="outline" size="sm" className="gap-1.5">
                <Link href="/workbench/instructions/agents">
                  Go to Instructions
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
