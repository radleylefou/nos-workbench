"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  FileText,
  RotateCcw,
} from "lucide-react"

import {
  assemble,
  getLlmLabel,
  getProjectTypeLabel,
  type InstructionStep,
  llmOptions,
  projectTypeOptions,
  type LlmTarget,
  type ProjectType,
} from "@content/instructions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CopyButton } from "@/components/workbench/copy-button"
import { MarkdownView } from "@/components/workbench/markdown-view"
import { cn } from "@/lib/utils"

type Step = "project" | "environment" | "result"

type OnboardingGeneratorProps = {
  className?: string
  onClose?: () => void
}

type SelectionCardProps<TValue extends string> = {
  label: string
  description: string
  selected: boolean
  value: TValue
  onSelect: (value: TValue) => void
}

function SelectionCard<TValue extends string>({
  label,
  description,
  selected,
  value,
  onSelect,
}: SelectionCardProps<TValue>) {
  return (
    <button
      type="button"
      className="h-full rounded-lg text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      onClick={() => onSelect(value)}
      aria-pressed={selected}
    >
      <Card
        className={cn(
          "h-full gap-0 py-0 transition-[background-color,border-color,box-shadow]",
          selected
            ? "border-primary bg-primary/5 ring-2 ring-primary/25"
            : "border-border bg-card hover:border-foreground/20 hover:bg-muted/30",
        )}
      >
        <CardHeader className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-base font-semibold">{label}</CardTitle>
              <CardDescription className="mt-2 text-sm leading-6">
                {description}
              </CardDescription>
            </div>
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border text-primary",
                selected ? "border-primary bg-primary text-primary-foreground" : "border-border",
              )}
              aria-hidden="true"
            >
              {selected ? <Check className="size-3.5" /> : null}
            </span>
          </div>
        </CardHeader>
      </Card>
    </button>
  )
}

function downloadMarkdown(markdown: string, filename: string) {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

const stepKindLabel: Record<InstructionStep["kind"], string> = {
  save: "Save",
  prompt: "Prompt",
  checkpoint: "Review",
}

function InstructionStepCard({
  index,
  step,
}: {
  index: number
  step: InstructionStep
}) {
  const saveFilename = step.kind === "save" ? step.filename : undefined
  const copyLabel = step.kind === "save" ? "Copy file" : "Copy prompt"

  return (
    <div className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-[240px_1fr] lg:gap-12">
      {/* Left: step label + title */}
      <div className="lg:pt-1">
        <p className="mb-2 text-sm text-muted-foreground">Step {index + 1}</p>
        <h3 className="text-2xl font-semibold tracking-tight">{step.title}</h3>
      </div>

      {/* Right: content card */}
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-xs">
        <div className="flex flex-col gap-3 border-b border-border bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={step.kind === "checkpoint" ? "outline" : "default"}>
              {stepKindLabel[step.kind]}
            </Badge>
            {step.filename ? <Badge variant="outline">{step.filename}</Badge> : null}
          </div>
          {step.kind !== "checkpoint" ? (
            <div className="flex shrink-0 flex-wrap gap-2">
              <CopyButton value={step.body} label={copyLabel} />
              {saveFilename ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => downloadMarkdown(step.body, saveFilename)}
                >
                  <Download />
                  Download
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="max-h-[26rem] overflow-auto p-5 sm:p-6">
          <MarkdownView source={step.body} className="max-w-none" />
        </div>
      </div>
    </div>
  )
}

export function OnboardingGenerator({ className, onClose }: OnboardingGeneratorProps) {
  const [step, setStep] = useState<Step>("project")
  const [projectType, setProjectTypeState] = useState<ProjectType | null>(null)
  const [llm, setLlmState] = useState<LlmTarget | null>(null)

  const result = useMemo(
    () => (projectType && llm ? assemble(projectType, llm) : null),
    [projectType, llm],
  )
  const displayStep = step === "project" ? "Step 1 of 2" : step === "environment" ? "Step 2 of 2" : "Ready"

  function setProjectType(value: ProjectType) {
    setProjectTypeState(value)
    setStep("environment")
  }

  function setLlm(value: LlmTarget) {
    setLlmState(value)
    setStep("result")
  }

  function handleBack() {
    if (step === "result") {
      setStep("environment")
      return
    }

    if (step === "environment") {
      setStep("project")
    }
  }

  function handleStartOver() {
    setProjectTypeState(null)
    setLlmState(null)
    setStep("project")
  }

  return (
    <div className={cn("bg-background p-6 text-foreground sm:p-8", className)}>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <Badge variant="secondary" className="h-7 px-2.5 text-xs">
              {displayStep}
            </Badge>
            {step !== "project" ? (
              <Button type="button" variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft />
                Back
              </Button>
            ) : null}
          </div>

          {step === "project" ? (
            <div className="flex flex-col gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Set up NOS in your project
                </h2>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  Answer two questions and we&apos;ll generate tailored instructions.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {projectTypeOptions.map((option) => (
                  <SelectionCard
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    description={option.description}
                    selected={projectType === option.value}
                    onSelect={setProjectType}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {step === "environment" ? (
            <div className="flex flex-col gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  What are you building with?
                </h2>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  Choose the environment that should receive the generated instruction file.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {llmOptions.map((option) => (
                  <SelectionCard
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    description={option.description}
                    selected={llm === option.value}
                    onSelect={setLlm}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {step === "result" && result && projectType && llm ? (
            <div className="flex flex-col gap-8">
              {/* Header */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{getProjectTypeLabel(projectType)}</Badge>
                    <Badge variant="outline">{getLlmLabel(llm)}</Badge>
                    <Badge variant="default">{result.contextFile.filename}</Badge>
                    <span className="text-muted-foreground/40" aria-hidden="true">·</span>
                    <button
                      type="button"
                      className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                      onClick={() => setStep("project")}
                    >
                      Change type
                    </button>
                    <button
                      type="button"
                      className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                      onClick={() => setStep("environment")}
                    >
                      Change environment
                    </button>
                  </div>
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Your NOS runbook is ready
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                    Follow the steps in order. Save the rules file first, then run each prompt in {getLlmLabel(llm)}.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <CopyButton value={result.contextFile.markdown} label="Copy rules file" />
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

              {/* Footer */}
              <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Button type="button" variant="outline" onClick={handleStartOver}>
                  <RotateCcw />
                  Start over
                </Button>
                {onClose ? (
                  <Button type="button" onClick={onClose}>
                    Back to workbench
                    <ArrowRight />
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href="/workbench/components/button">
                      Continue to workbench
                      <ArrowRight />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  )
}
