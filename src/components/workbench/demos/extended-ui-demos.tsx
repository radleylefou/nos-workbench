"use client"

import { useState } from "react"
import { Tag } from "@/components/ui/tag"
import { Rating } from "@/components/ui/rating"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
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

const CONTROLLED_STEPS = [
  { step: 1, label: "Intake", content: "Complete the client intake form and initial discovery call." },
  { step: 2, label: "Design", content: "Define the domain model, epics, and solution architecture." },
  { step: 3, label: "Estimate", content: "Run bottom-up story point estimation across all epics." },
  { step: 4, label: "Review", content: "Final review, sign-off, and handoff to the delivery team." },
]

export function StepperControlledDemo() {
  const [active, setActive] = useState(1)

  return (
    <div className="flex w-full flex-col gap-6">
      <Stepper value={active} onValueChange={setActive}>
        <StepperNav>
          {CONTROLLED_STEPS.map(({ step }) => (
            <StepperItem key={step} step={step}>
              <StepperTrigger>
                <StepperIndicator />
              </StepperTrigger>
              {step < CONTROLLED_STEPS.length && <StepperSeparator />}
            </StepperItem>
          ))}
        </StepperNav>
        <StepperPanel className="mt-4">
          {CONTROLLED_STEPS.map(({ step, label, content }) => (
            <StepperContent key={step} value={step}>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-sm font-medium">{label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{content}</p>
              </div>
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setActive((s) => Math.max(1, s - 1))}
          disabled={active === 1}
        >
          Previous
        </Button>
        <Button
          size="sm"
          onClick={() => setActive((s) => Math.min(CONTROLLED_STEPS.length, s + 1))}
          disabled={active === CONTROLLED_STEPS.length}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
