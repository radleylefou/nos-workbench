import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface VerticalStepperStep {
  label: string
  description?: string
  state: "default" | "active" | "completed"
}

export interface VerticalStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: VerticalStepperStep[]
}

export function VerticalStepper({ className, steps, ...props }: VerticalStepperProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        return (
          <div key={step.label} className="flex gap-3">
            {/* Indicator column */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium",
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
              {!isLast && (
                <div className="mx-auto mt-1 w-px flex-1 bg-border" style={{ minHeight: 24 }} />
              )}
            </div>
            {/* Text column */}
            <div className={cn("pb-5", isLast && "pb-0")}>
              <p
                className={cn(
                  "text-sm",
                  step.state === "active" ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
