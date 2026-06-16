"use client"

import * as React from "react"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// ─── Step bar ────────────────────────────────────────────────────────────────

function StepBar({ labels, current }: { labels: string[]; current: number }) {
  return (
    <div className="flex items-center gap-1.5 pb-4">
      {labels.map((label, i) => (
        <React.Fragment key={label}>
          {i > 0 && (
            <div
              className={cn(
                "h-px flex-1",
                i <= current ? "bg-primary" : "bg-border"
              )}
            />
          )}
          <div className="flex shrink-0 items-center gap-1.5">
            <div
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-[var(--duration-fast)]",
                i <= current
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {i + 1}
            </div>
            <span
              className={cn(
                "text-xs font-medium transition-colors duration-[var(--duration-fast)]",
                i === current ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type FormModalStep = {
  title: string
  description?: string
  content: React.ReactNode
}

export type FormModalProps = {
  /** Uncontrolled: provide a trigger element and FormModal manages its own open state. */
  trigger?: React.ReactNode
  /** Controlled open state. Use with onOpenChange. */
  open?: boolean
  onOpenChange?: (open: boolean) => void

  /** Single-step title. Omit when using `steps`. */
  title?: string
  /** Optional subtitle shown below the title. */
  description?: string
  /** Optional badge shown above the title (single-step only). */
  badge?: string
  /** Single-step body content. */
  children?: React.ReactNode

  /** Multi-step config. When provided, title/description/badge/children are ignored. */
  steps?: FormModalStep[]

  /** Label for the final-step primary button. Defaults to "Save". */
  primaryLabel?: string
  /** Called when the form is submitted on the last step. */
  onSubmit?: () => void

  className?: string
}

// ─── FormModal ────────────────────────────────────────────────────────────────

export function FormModal({
  trigger,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
  title,
  description,
  badge,
  children,
  steps,
  primaryLabel,
  onSubmit,
  className,
}: FormModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(0)

  const isControlled = externalOpen !== undefined
  const open = isControlled ? externalOpen! : internalOpen

  function setOpen(value: boolean) {
    if (!value) setCurrentStep(0)
    if (isControlled) {
      externalOnOpenChange?.(value)
    } else {
      setInternalOpen(value)
    }
  }

  const isMulti = steps != null && steps.length > 0
  const totalSteps = isMulti ? steps.length : 1
  const isLastStep = currentStep === totalSteps - 1

  const resolvedTitle = isMulti ? steps![currentStep].title : (title ?? "")
  const resolvedDescription = isMulti ? steps![currentStep].description : description
  const resolvedBody = isMulti ? steps![currentStep].content : children

  function handlePrimary() {
    if (isLastStep) {
      onSubmit?.()
      setOpen(false)
    } else {
      setCurrentStep((s) => s + 1)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        showCloseButton={false}
        className={cn("gap-0 overflow-hidden p-0 sm:max-w-lg", className)}
      >
        {/* Header */}
        <div className="border-b border-border px-6 py-5">
          {isMulti && (
            <div className="pr-8">
              <StepBar labels={steps!.map((s) => s.title)} current={currentStep} />
            </div>
          )}
          <div className="pr-8">
            {badge && (
              <div className="mb-2">
                <Badge variant="outline">{badge}</Badge>
              </div>
            )}
            <DialogTitle className="text-base font-semibold leading-snug">
              {resolvedTitle}
            </DialogTitle>
            {resolvedDescription ? (
              <DialogDescription className="mt-1">{resolvedDescription}</DialogDescription>
            ) : (
              <DialogDescription className="sr-only">{resolvedTitle}</DialogDescription>
            )}
          </div>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-4 right-4"
              aria-label="Close"
            >
              <X className="size-4" />
            </Button>
          </DialogClose>
        </div>

        {/* Scrollable body */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-5">{resolvedBody}</div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <div className="flex items-center gap-2">
            {isMulti && currentStep > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                Back
              </Button>
            )}
            <Button size="sm" onClick={handlePrimary}>
              {isLastStep ? (primaryLabel ?? "Save") : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
