"use client"

import Image from "next/image"
import { Check, Download } from "lucide-react"

import type { InstructionStep } from "@content/instructions"
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

type SelectionCardProps<TValue extends string> = {
  label: string
  description: string
  logo?: {
    src: string
    alt: string
  }
  selected: boolean
  value: TValue
  onSelect: (value: TValue) => void
}

export function SelectionCard<TValue extends string>({
  label,
  description,
  logo,
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
            <div className="flex min-w-0 items-start gap-4">
              {logo ? (
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background"
                  aria-hidden="true"
                >
                  <Image
                    src={logo.src}
                    alt=""
                    width={28}
                    height={28}
                    className="size-7 object-contain"
                  />
                </span>
              ) : null}
              <div className="min-w-0">
                <CardTitle className="text-base font-semibold">{label}</CardTitle>
                <CardDescription className="mt-2 text-sm leading-6">
                  {description}
                </CardDescription>
              </div>
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

export function downloadMarkdown(markdown: string, filename: string) {
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
  save: "File",
  prompt: "Prompt",
  checkpoint: "Review",
}

export function InstructionStepCard({
  index,
  step,
}: {
  index: number
  step: InstructionStep
}) {
  const saveFilename = step.kind === "save" ? step.filename : undefined
  const copyLabel = step.kind === "save" ? "Copy" : "Copy prompt"

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
