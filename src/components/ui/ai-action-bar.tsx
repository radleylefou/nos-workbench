import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

interface AIAction {
  label: string
  onClick: () => void
  disabled?: boolean
}

interface AIActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: AIAction[]
  label?: string
}

export function AIActionBar({
  actions,
  label = "AI Actions:",
  className,
  ...props
}: AIActionBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 text-sm text-muted-foreground border-t border-border/50 pt-3",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-1 shrink-0">
        <Sparkles className="size-3.5" />
        {label}
      </span>
      <div className="flex flex-wrap gap-3">
        {actions.map((action, i) => (
          <button
            key={i}
            type="button"
            onClick={action.onClick}
            disabled={action.disabled}
            className="text-primary hover:underline underline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}
