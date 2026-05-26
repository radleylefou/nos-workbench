import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface CompactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "stroke" | "ghost" | "white"
  size?: "md" | "sm"
  fullRadius?: boolean
  asChild?: boolean
}

const CompactButton = React.forwardRef<HTMLButtonElement, CompactButtonProps>(
  ({ className, variant = "stroke", size = "md", fullRadius = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50",
          fullRadius ? "rounded-full" : "rounded-lg",
          size === "md" ? "size-9" : "size-7",
          variant === "stroke" && "border border-border bg-background hover:bg-muted shadow-xs text-foreground",
          variant === "ghost" && "hover:bg-muted text-foreground",
          variant === "white" && "bg-white border border-border shadow-xs text-foreground hover:bg-white/90",
          className,
        )}
        {...props}
      />
    )
  },
)
CompactButton.displayName = "CompactButton"

export { CompactButton }
