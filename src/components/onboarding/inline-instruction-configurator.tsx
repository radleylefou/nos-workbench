"use client"

import { useMemo, useState } from "react"
import { Download, FileText } from "lucide-react"

import {
  assemble,
  getLlmLabel,
  getProjectTypeLabel,
  llmOptions,
  projectTypeOptions,
  type LlmTarget,
  type ProjectType,
} from "@content/instructions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/workbench/copy-button"
import {
  downloadMarkdown,
  InstructionStepCard,
} from "@/components/onboarding/configurator-shared"
import { cn } from "@/lib/utils"

type InlineInstructionConfiguratorProps = {
  initialProjectType?: ProjectType
  initialLlm?: LlmTarget
}

function PillGroup<TValue extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { value: TValue; label: string }[]
  value: TValue
  onChange: (v: TValue) => void
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = opt.value === value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={selected}
              className={cn(
                "inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium outline-none transition-colors",
                "focus-visible:ring-3 focus-visible:ring-ring/50",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground/70 hover:border-foreground/25 hover:text-foreground",
              )}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function InlineInstructionConfigurator({
  initialProjectType = "new",
  initialLlm = "claude-code",
}: InlineInstructionConfiguratorProps) {
  const [projectType, setProjectType] = useState<ProjectType>(initialProjectType)
  const [llm, setLlm] = useState<LlmTarget>(initialLlm)

  const result = useMemo(() => assemble(projectType, llm), [projectType, llm])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
        <PillGroup
          label="Project type"
          options={projectTypeOptions}
          value={projectType}
          onChange={setProjectType}
        />
        <PillGroup
          label="Agent"
          options={llmOptions}
          value={llm}
          onChange={setLlm}
        />
      </div>

      <div className="flex flex-col gap-8 border-t border-border pt-8">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{getProjectTypeLabel(projectType)}</Badge>
              <Badge variant="outline">{getLlmLabel(llm)}</Badge>
              <Badge variant="default">{result.contextFile.filename}</Badge>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Your NOS runbook
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              Follow the steps in order. Copy the context file and paste it into your agent first, then run each prompt.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <CopyButton value={result.contextFile.markdown} label="Copy context file" />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                downloadMarkdown(
                  result.contextFile.markdown,
                  result.contextFile.filename,
                )
              }
            >
              <Download />
              Download {result.contextFile.filename}
            </Button>
          </div>
        </div>

        {/* Run note */}
        <div className="rounded-lg border border-border bg-muted/20 p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background text-muted-foreground ring-1 ring-border">
              <FileText className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium">How to run this in {getLlmLabel(llm)}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {result.runNote}
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="divide-y divide-border">
          {result.steps.map((runbookStep, index) => (
            <InstructionStepCard
              key={`${runbookStep.kind}-${runbookStep.title}`}
              index={index}
              step={runbookStep}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
