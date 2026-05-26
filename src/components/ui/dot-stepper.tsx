"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface DotStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: number
  currentStep: number
  size?: "sm" | "xs"
  onStepClick?: (index: number) => void
}

export function DotStepper({
  className,
  steps,
  currentStep,
  size = "sm",
  onStepClick,
  ...props
}: DotStepperProps) {
  return (
    <div
      className={cn(
        "flex items-center",
        size === "sm" ? "gap-2.5" : "gap-1.5",
        className,
      )}
      role="tablist"
      aria-label="Steps"
      {...props}
    >
      {Array.from({ length: steps }, (_, i) => {
        const isActive = i === currentStep
        return (
          <button
            key={i}
            role="tab"
            aria-selected={isActive}
            aria-label={`Step ${i + 1}`}
            onClick={() => onStepClick?.(i)}
            className={cn(
              "rounded-full transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
              size === "sm" ? "size-2" : "size-1.5",
              isActive ? "bg-primary" : "bg-muted-foreground/30",
              onStepClick ? "cursor-pointer hover:bg-muted-foreground/60" : "cursor-default",
            )}
          />
        )
      })}
    </div>
  )
}
