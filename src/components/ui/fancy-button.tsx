import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface FancyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "neutral" | "primary" | "destructive" | "basic"
  size?: "md" | "sm" | "xs"
  asChild?: boolean
}

const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const hasShimmer = variant === "primary" || variant === "destructive"
    return (
      <Comp
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50",
          size === "md" && "h-10 px-4 text-sm",
          size === "sm" && "h-9 px-3 text-sm",
          size === "xs" && "h-8 px-3 text-xs",
          variant === "neutral" && "bg-background border border-border text-foreground hover:bg-muted shadow-xs",
          variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
          variant === "destructive" && "bg-[var(--error)] text-white hover:bg-[var(--error)]/90 shadow-xs",
          variant === "basic" && "text-foreground hover:bg-muted",
          className,
        )}
        {...props}
      >
        {hasShimmer && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 to-transparent"
          />
        )}
        {children}
      </Comp>
    )
  },
)
FancyButton.displayName = "FancyButton"

export { FancyButton }
