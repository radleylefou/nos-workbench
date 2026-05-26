import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "gray" | "primary" | "error"
  size?: "md" | "sm"
  underline?: boolean
  asChild?: boolean
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = "gray", size = "md", underline = true, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          size === "md" && "text-sm",
          size === "sm" && "text-xs",
          underline && "underline underline-offset-2",
          variant === "gray" && "text-muted-foreground hover:text-foreground",
          variant === "primary" && "text-primary hover:text-primary/80",
          variant === "error" && "text-[var(--error)] hover:text-[var(--error)]/80",
          className,
        )}
        {...props}
      />
    )
  },
)
LinkButton.displayName = "LinkButton"

export { LinkButton }
