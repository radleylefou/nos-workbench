"use client"

import { useState } from "react"
import { Tag } from "@/components/ui/tag"
import { DotStepper } from "@/components/ui/dot-stepper"
import { Rating } from "@/components/ui/rating"
import { FileText } from "lucide-react"

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

export function DotStepperInteractiveDemo() {
  const [step, setStep] = useState(1)
  return (
    <div className="flex flex-col items-center gap-3">
      <DotStepper steps={5} currentStep={step} size="sm" onStepClick={setStep} />
      <span className="text-xs text-muted-foreground">Step {step + 1} of 5</span>
    </div>
  )
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
