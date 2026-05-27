import Link from "next/link"
import {
  ArrowRight,
  Component,
  FileText,
  PanelLeft,
  Sparkles,
  SwatchBook,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/workbench/copy-button"
import {
  WorkbenchHero,
  WorkbenchPanel,
  WorkbenchReferenceCard,
  WorkbenchSection,
} from "@/components/workbench/docs-shell"
import { starterPrompt } from "@/lib/agent-instructions"
import { components } from "@/lib/component-registry"
import { navigation } from "@/lib/workbench-data"

const sections = [
  {
    key: "components",
    label: "Components",
    description: "Reusable building blocks for every Nymbl product surface.",
    href: "/workbench/components/button",
    icon: Component,
    count: components.length,
  },
  {
    key: "tokens",
    label: "Tokens",
    description: "Color, spacing, radius, typography, and motion foundations.",
    href: "/workbench/tokens/color",
    icon: SwatchBook,
    count: navigation.tokens.length,
  },
  {
    key: "instructions",
    label: "Instructions",
    description: "Agent prompts and rules for building with NOS.",
    href: "/workbench/instructions/agents",
    icon: FileText,
    count: navigation.instructions.length,
  },
  {
    key: "patterns",
    label: "Patterns",
    description: "Composed screens and layouts for product teams.",
    href: "/workbench/patterns/workspace-shell",
    icon: PanelLeft,
    count: navigation.patterns.length,
  },
]

const statement =
  "NOS is the canonical reference for internal Nymbl product UI. Use it to orient agents, inspect implementation truth, and assemble interfaces without drifting from the system."

function RevealedStatement() {
  return (
    <p className="max-w-4xl text-2xl leading-tight tracking-[-0.03em] text-zinc-950 sm:text-4xl">
      {statement.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} data-workbench-word className="inline-block">
          {word}
          {index < statement.split(" ").length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </p>
  )
}

export default function WorkbenchHome() {
  return (
    <div className="flex flex-col">
      <WorkbenchHero
        eyebrow="NOS Workbench"
        title="The operating reference for building Nymbl apps."
        description="Browse canonical components, tokens, agent instructions, and composed patterns in one dense documentation surface."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild className="bg-zinc-950 text-white hover:bg-zinc-800">
            <Link href="/workbench/instructions/agents">
              Start with the agent prompt
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-zinc-300 text-zinc-950 hover:border-zinc-950">
            <Link href="/workbench/components/button">Browse components</Link>
          </Button>
        </div>
      </WorkbenchHero>

      <WorkbenchSection
        id="overview"
        title="Reference map"
        description={`${components.length} components, ${navigation.tokens.length} token sets, and ${navigation.patterns.length} product patterns are organized for agent-assisted implementation.`}
        className="py-12"
      >
        <div className="grid grid-flow-dense grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <WorkbenchReferenceCard
                key={section.key}
                href={section.href}
                title={section.label}
                description={section.description}
                meta={section.count}
              >
                <div className="mb-8 flex size-11 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-950 transition-transform duration-700 ease-out group-hover/reference:scale-110">
                  <Icon className="size-5" />
                </div>
              </WorkbenchReferenceCard>
            )
          })}
        </div>
      </WorkbenchSection>

      <WorkbenchSection id="agent-start" title="Using NOS in a new Nymbl app">
        <WorkbenchPanel className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="p-6 sm:p-8">
              <div className="mb-8 flex size-12 items-center justify-center rounded-full bg-zinc-950 text-white">
                <Sparkles className="size-5" />
              </div>
              <RevealedStatement />
            </div>
            <div className="flex flex-col justify-between border-t border-zinc-200 bg-zinc-50 p-6 lg:border-l lg:border-t-0">
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.025em] text-zinc-950">
                  Start with the agent prompt
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Copy the starter prompt into your coding agent before any
                  component or screen work begins.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                <CopyButton value={starterPrompt} label="Copy starter prompt" />
                <Button asChild variant="outline" className="justify-between border-zinc-300">
                  <Link href="/workbench/instructions/agents">
                    Go to Instructions
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </WorkbenchPanel>
      </WorkbenchSection>
    </div>
  )
}
