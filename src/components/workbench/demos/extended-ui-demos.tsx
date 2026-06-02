"use client"

import { useState } from "react"
import { Tag } from "@/components/ui/tag"
import { Rating } from "@/components/ui/rating"
import { Activity, ArrowLeft, FileText, Shield, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { cn } from "@/lib/utils"
import {
  Stepper,
  StepperNav,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperPanel,
  StepperContent,
} from "@/components/ui/stepper"

const SEGMENTS = [
  { id: "market", label: "Market", icon: TrendingUp },
  { id: "limit", label: "Limit", icon: Target },
  { id: "stop", label: "Stop", icon: Shield },
  { id: "stop-limit", label: "Stop-Limit", icon: Activity },
]

export function ButtonGroupSegmentedDemo() {
  const [active, setActive] = useState<string>("market")

  return (
    <ButtonGroup>
      {SEGMENTS.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant="outline"
          className={cn(active === id && "bg-muted")}
          onClick={() => setActive(id)}
        >
          <Icon className="size-4" />
          {label}
        </Button>
      ))}
    </ButtonGroup>
  )
}

export function TagDismissibleDemo() {
  const [visible, setVisible] = useState(true)
  if (!visible) {
    return (
      <button
        className="text-xs text-muted-foreground underline underline-offset-2"
        onClick={() => setVisible(true)}
      >
        Restore
      </button>
    )
  }
  return <Tag variant="stroke" onDismiss={() => setVisible(false)}>Dismissible</Tag>
}

export function RatingInteractiveDemo() {
  const [value, setValue] = useState(3)
  return (
    <div className="flex flex-col items-center gap-2">
      <Rating value={value} onChange={setValue} />
      <span className="text-xs text-muted-foreground">{value} / 5</span>
    </div>
  )
}

export function TagWithIconDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag variant="stroke" icon={<FileText className="size-3" />}>Scope Doc</Tag>
      <Tag variant="gray" icon={<FileText className="size-3" />}>Integration</Tag>
    </div>
  )
}

const STEPPER_STEPS = [1, 2, 3, 4]

export function StepperControlledDemo() {
  const [currentStep, setCurrentStep] = useState(2)

  return (
    <Stepper
      value={currentStep}
      onValueChange={setCurrentStep}
      className="w-full max-w-md space-y-8"
    >
      <StepperNav>
        {STEPPER_STEPS.map((step) => (
          <StepperItem key={step} step={step}>
            <StepperTrigger asChild>
              <StepperIndicator className="data-[state=completed]:bg-success data-[state=completed]:text-white">
                {step}
              </StepperIndicator>
            </StepperTrigger>
            {STEPPER_STEPS.length > step && (
              <StepperSeparator className="group-data-[state=completed]/step:bg-success" />
            )}
          </StepperItem>
        ))}
      </StepperNav>

      <StepperPanel className="text-sm">
        {STEPPER_STEPS.map((step) => (
          <StepperContent
            key={step}
            value={step}
            className="flex w-full items-center justify-center"
          >
            Step {step} content
          </StepperContent>
        ))}
      </StepperPanel>

      <div className="flex items-center justify-between gap-2.5">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep === STEPPER_STEPS.length}
        >
          Next
        </Button>
      </div>
    </Stepper>
  )
}

export function StepperSegmentedDemo() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="w-full max-w-md">
      <Stepper value={currentStep} onValueChange={setCurrentStep}>
        <StepperNav>
          {STEPPER_STEPS.map((step) => (
            <StepperItem
              key={step}
              step={step}
              className="flex-1 overflow-hidden transition-all duration-[var(--duration-normal)] first:rounded-s-none last:rounded-e-none"
            >
              <StepperTrigger className="w-full flex-col items-start gap-2" asChild>
                <StepperIndicator className="h-2 w-full rounded-none! bg-border">
                  <span className="sr-only">{step}</span>
                </StepperIndicator>
              </StepperTrigger>
            </StepperItem>
          ))}
        </StepperNav>

        <div className="flex items-center justify-between gap-2.5 py-1">
          <Button
            variant="link"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className={cn("px-0", currentStep === 1 && "pointer-events-none opacity-0")}
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          <div className="text-sm font-medium">
            <span className="text-foreground">{currentStep}</span>{" "}
            <span className="text-muted-foreground/60">/ {STEPPER_STEPS.length}</span>
          </div>
        </div>

        <StepperPanel className="py-6 text-sm">
          {STEPPER_STEPS.map((step) => (
            <StepperContent
              key={step}
              value={step}
              className="flex w-full items-center justify-center"
            >
              Step {step} content
            </StepperContent>
          ))}
        </StepperPanel>

        <div className="flex items-center justify-end gap-2.5">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            disabled={currentStep === STEPPER_STEPS.length}
          >
            Next
          </Button>
        </div>
      </Stepper>
    </div>
  )
}
