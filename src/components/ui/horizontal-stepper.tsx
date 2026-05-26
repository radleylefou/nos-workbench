import * as React from "react"
import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface HorizontalStepperStep {
  label: string
  state: "default" | "active" | "completed"
}

export interface HorizontalStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: HorizontalStepperStep[]
}

export function HorizontalStepper({ className, steps, ...props }: HorizontalStepperProps) {
  return (
    <div className={cn("flex flex-wrap items-start gap-1", className)} {...props}>
      {steps.map((step, index) => (
        <React.Fragment key={step.label}>
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "flex size-7 items-center justify-center rounded-full text-xs font-medium",
                step.state === "default" && "bg-muted text-muted-foreground ring-1 ring-border",
                step.state === "active" && "bg-primary text-primary-foreground",
                step.state === "completed" && "bg-[var(--success)] text-white",
              )}
            >
              {step.state === "completed" ? (
                <Check className="size-3.5" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                "max-w-[80px] text-center text-xs",
                step.state === "active" ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <ChevronRight className="mt-1.5 size-4 shrink-0 text-muted-foreground" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
