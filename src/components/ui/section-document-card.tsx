import { Pencil } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AIActionBar } from "@/components/ui/ai-action-bar"

interface SectionDocumentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  icon?: React.ReactNode
  status: "draft" | "reviewed" | "approved"
  onEdit?: () => void
  children: React.ReactNode
  aiActions?: Array<{ label: string; onClick: () => void; disabled?: boolean }>
}

const statusVariants: Record<
  "draft" | "reviewed" | "approved",
  "secondary" | "outline" | "default"
> = {
  draft: "secondary",
  reviewed: "outline",
  approved: "default",
}

const statusLabels: Record<"draft" | "reviewed" | "approved", string> = {
  draft: "AI Draft",
  reviewed: "Reviewed",
  approved: "Approved",
}

export function SectionDocumentCard({
  title,
  icon,
  status,
  onEdit,
  children,
  aiActions,
  className,
  ...props
}: SectionDocumentCardProps) {
  return (
    <Card className={cn("w-full gap-0 py-0", className)} {...props}>
      <CardHeader className="p-5 pb-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            {icon && <span className="text-muted-foreground shrink-0">{icon}</span>}
            <h3 className="truncate text-sm font-semibold leading-tight">{title}</h3>
            <Badge variant={statusVariants[status]} className="shrink-0 text-xs">
              {statusLabels[status]}
            </Badge>
          </div>
          {onEdit && (
            <Button
              size="sm"
              variant="ghost"
              className="size-7 shrink-0 p-0"
              onClick={onEdit}
              aria-label="Edit section"
            >
              <Pencil className="size-3.5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="text-sm leading-6 text-foreground">{children}</div>
        {aiActions && aiActions.length > 0 && (
          <AIActionBar actions={aiActions} className="mt-4" />
        )}
      </CardContent>
    </Card>
  )
}
