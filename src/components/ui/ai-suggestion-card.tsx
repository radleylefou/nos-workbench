import { AlertTriangle, GitMerge, Lightbulb, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type SuggestionType = "suggestion" | "hint" | "match" | "warning"

interface AISuggestionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  type: SuggestionType
  title: string
  description: string
  onApply?: () => void
  onDismiss?: () => void
}

const typeConfig: Record<SuggestionType, { Icon: React.ElementType; label: string }> = {
  suggestion: { Icon: Sparkles, label: "Suggestion" },
  hint: { Icon: Lightbulb, label: "Hint" },
  match: { Icon: GitMerge, label: "Match" },
  warning: { Icon: AlertTriangle, label: "Warning" },
}

export function AISuggestionCard({
  type,
  title,
  description,
  onApply,
  onDismiss,
  className,
  ...props
}: AISuggestionCardProps) {
  const { Icon, label } = typeConfig[type]

  return (
    <Card className={cn("w-full max-w-sm gap-0 py-0", className)} {...props}>
      <CardContent className="relative p-5">
        <Icon className="absolute right-5 top-5 size-4 text-muted-foreground" aria-hidden="true" />
        <div className="min-w-0 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{label}</Badge>
          </div>
          <h3 className="mt-2 text-sm font-semibold leading-snug text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
        {(onApply || onDismiss) && (
          <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-3">
            {onApply && (
              <Button size="sm" className="h-7 px-2 text-xs" onClick={onApply}>
                Apply
              </Button>
            )}
            {onDismiss && (
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={onDismiss}>
                Dismiss
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
