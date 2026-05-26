import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

interface StepperStep {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[]
  currentStep: number
  orientation?: "horizontal" | "vertical"
  variant?: "dots" | "numbered" | "icons"
  completedSteps?: number[]
  onStepClick?: (index: number) => void
}

export function Stepper({
  steps,
  currentStep,
  orientation = "horizontal",
  variant = "numbered",
  completedSteps,
  onStepClick,
  className,
  ...props
}: StepperProps) {
  const isCompleted = (i: number) =>
    completedSteps ? completedSteps.includes(i) : i < currentStep
  const isActive = (i: number) => i === currentStep

  if (orientation === "vertical") {
    return (
      <div className={cn("flex flex-col gap-0", className)} {...props}>
        {steps.map((step, i) => {
          const completed = isCompleted(i)
          const active = isActive(i)
          const isLast = i === steps.length - 1

          return (
            <div key={step.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <StepDot
                  index={i}
                  variant={variant}
                  completed={completed}
                  active={active}
                  icon={step.icon}
                  onClick={onStepClick ? () => onStepClick(i) : undefined}
                />
                {!isLast && (
                  <div
                    className={cn(
                      "w-px flex-1 my-1 min-h-6",
                      completed ? "bg-[var(--primary)]" : "bg-border"
                    )}
                  />
                )}
              </div>
              <div className="pb-6 pt-0.5">
                <p
                  className={cn(
                    "text-sm",
                    active ? "font-medium text-foreground" : "text-muted-foreground"
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

  return (
    <div className={cn("flex items-center w-full", className)} {...props}>
      {steps.map((step, i) => {
        const completed = isCompleted(i)
        const active = isActive(i)
        const isLast = i === steps.length - 1

        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <StepDot
                index={i}
                variant={variant}
                completed={completed}
                active={active}
                icon={step.icon}
                onClick={onStepClick ? () => onStepClick(i) : undefined}
              />
              <span
                className={cn(
                  "text-xs whitespace-nowrap",
                  active ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "h-px flex-1 mx-2 mb-5",
                  completed ? "bg-[var(--primary)]" : "bg-border"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function StepDot({
  index,
  variant,
  completed,
  active,
  icon,
  onClick,
}: {
  index: number
  variant: "dots" | "numbered" | "icons"
  completed: boolean
  active: boolean
  icon?: React.ReactNode
  onClick?: () => void
}) {
  const baseClass = "flex size-8 shrink-0 items-center justify-center rounded-full transition-all"

  const stateClass = completed
    ? "bg-[var(--primary)] text-primary-foreground"
    : active
    ? "bg-[var(--primary)] text-primary-foreground ring-4 ring-[var(--primary)]/20"
    : "bg-muted border-2 border-border text-muted-foreground"

  const content = completed ? (
    <Check className="size-4" />
  ) : variant === "dots" ? null : variant === "icons" && icon ? (
    icon
  ) : (
    <span className="text-xs font-medium tabular-nums">{index + 1}</span>
  )

  if (onClick) {
    return (
      <button
        type="button"
        className={cn(baseClass, stateClass, "cursor-pointer hover:opacity-80")}
        onClick={onClick}
      >
        {content}
      </button>
    )
  }

  return (
    <div className={cn(baseClass, stateClass, variant === "dots" ? "size-3" : "")}>
      {content}
    </div>
  )
}
