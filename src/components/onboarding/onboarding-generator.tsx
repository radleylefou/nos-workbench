"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Download,
  FileText,
  RotateCcw,
} from "lucide-react"

import {
  assemble,
  getLlmLabel,
  getProjectTypeLabel,
  llmOptions,
  projectTypeOptions,
  type LlmTarget,
  type ProjectType,
} from "@content/instructions"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/workbench/copy-button"
import {
  downloadMarkdown,
  InstructionStepCard,
  SelectionCard,
} from "@/components/onboarding/configurator-shared"
import { cn } from "@/lib/utils"

type Step = "project" | "environment" | "result"
type AgentLogo = {
  src: string
  alt: string
}

type OnboardingGeneratorProps = {
  className?: string
  initialProjectType?: ProjectType
  onClose?: () => void
  onHeaderChange?: (title: string, description: string, logo?: AgentLogo) => void
}

export function OnboardingGenerator({
  className,
  initialProjectType,
  onClose,
  onHeaderChange,
}: OnboardingGeneratorProps) {
  const [step, setStep] = useState<Step>(initialProjectType ? "environment" : "project")
  const [projectType, setProjectTypeState] = useState<ProjectType | null>(
    initialProjectType ?? null,
  )
  const [llm, setLlmState] = useState<LlmTarget | null>(null)

  const result = useMemo(
    () => (projectType && llm ? assemble(projectType, llm) : null),
    [projectType, llm],
  )
  const selectedLlmOption = llmOptions.find((option) => option.value === llm)

  const headerTitle =
    step === "result" && projectType && llm
      ? `${getProjectTypeLabel(projectType)}: ${getLlmLabel(llm)}`
      : projectType
        ? getProjectTypeLabel(projectType)
        : "Set up NOS"

  useEffect(() => {
    onHeaderChange?.(
      headerTitle,
      "Generate a tailored NOS instruction file for your project.",
      step === "result" ? selectedLlmOption?.logo : undefined,
    )
  }, [headerTitle, onHeaderChange, selectedLlmOption?.logo, step])

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
    setProjectTypeState(initialProjectType ?? null)
    setLlmState(null)
    setStep(initialProjectType ? "environment" : "project")
  }

  return (
    <div className={cn("bg-background p-6 text-foreground sm:p-8", className)}>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="flex flex-col gap-6">
          {step !== "project" ? (
            <div>
              <Button type="button" variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft />
                Back
              </Button>
            </div>
          ) : null}

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
                  Choose your build environment
                </h2>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  Choose the environment that should receive the generated instruction file
                  {projectType ? ` for this ${getProjectTypeLabel(projectType).toLowerCase()} flow.` : "."}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {llmOptions.map((option) => (
                  <SelectionCard
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    description={option.description}
                    logo={option.logo}
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
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Your NOS runbook is ready
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
