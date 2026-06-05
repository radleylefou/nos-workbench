import {
  Component,
  FileText,
  PanelLeft,
  Sparkles,
  SwatchBook,
} from "lucide-react"

import { InstructionGeneratorDialog } from "@/components/onboarding/instruction-generator-dialog"
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
import type { ProjectType } from "@content/instructions"

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
    href: "/workbench/patterns/portfolio-dashboard",
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

function HeroStartCard({
  description,
  image,
  imageAlt,
  title,
  type,
}: {
  description: string
  image: string
  imageAlt: string
  title: string
  type: ProjectType
}) {
  return (
    <InstructionGeneratorDialog
      initialProjectType={type}
      triggerCard={{ description, image, imageAlt, title }}
    />
  )
}

export default function WorkbenchHome() {
  return (
    <div className="flex flex-col">
      <WorkbenchHero
        eyebrow="NOS Workbench"
        title="The operating reference for building Nymbl apps."
        description="Build apps, browse canonical components, tokens, agent instructions, and composed patterns in one documentation surface."
      >
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold tracking-[-0.025em] text-zinc-950">
            Where do you want to start?
          </h2>
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            <HeroStartCard
              type="new"
              image="/nos-new.svg"
              imageAlt="New NOS app illustration"
              title="I'm building a new NOS app"
              description="Start fresh from a spec or PRD."
            />
            <HeroStartCard
              type="existing"
              image="/nos-existing.svg"
              imageAlt="Existing NOS app illustration"
              title="I'm updating an existing NOS app"
              description="Convert an app that already exists."
            />
          </div>
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
                <div className="flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-950">
                  <Icon className="size-5" />
                </div>
              </WorkbenchReferenceCard>
            )
          })}
        </div>
      </WorkbenchSection>

      <WorkbenchSection id="agent-start" title="Generate project instructions">
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
                  Start with the generator
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Generate the right instruction file for a new app or an
                  existing-app conversion before component work begins.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                <CopyButton value={starterPrompt} label="Copy generic starter" />
                <InstructionGeneratorDialog
                  triggerLabel="Open generator"
                  triggerVariant="outline"
                  triggerClassName="justify-between border-zinc-300"
                />
              </div>
            </div>
          </div>
        </WorkbenchPanel>
      </WorkbenchSection>
    </div>
  )
}
