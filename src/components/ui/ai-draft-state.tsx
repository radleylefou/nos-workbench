import { Check, Clock, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type DraftStatus = "draft" | "reviewed" | "approved"

interface AIDraftStateProps extends React.HTMLAttributes<HTMLDivElement> {
  status: DraftStatus
  draftContent: React.ReactNode
  reviewedBy?: string
  reviewedAt?: string
  approvedBy?: string
  approvedAt?: string
  onMarkReviewed?: () => void
  onApprove?: () => void
}

export function AIDraftState({
  status,
  draftContent,
  reviewedBy,
  reviewedAt,
  approvedBy,
  approvedAt,
  onMarkReviewed,
  onApprove,
  className,
  ...props
}: AIDraftStateProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      {/* Status bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {status === "draft" && (
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="size-3" />
              AI Draft
            </Badge>
          )}
          {status === "reviewed" && (
            <Badge variant="outline" className="gap-1 text-[var(--success)] border-[var(--success)]/40">
              <Check className="size-3" />
              Reviewed
            </Badge>
          )}
          {status === "approved" && (
            <Badge className="gap-1 bg-[var(--success)] text-white hover:bg-[var(--success)]/90">
              <Check className="size-3" />
              Approved
            </Badge>
          )}

          {status === "reviewed" && reviewedBy && (
            <span className="text-xs text-muted-foreground">
              by {reviewedBy}{reviewedAt ? ` · ${reviewedAt}` : ""}
            </span>
          )}
          {status === "approved" && approvedBy && (
            <span className="text-xs text-muted-foreground">
              by {approvedBy}{approvedAt ? ` · ${approvedAt}` : ""}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {status === "draft" && (
            <>
              {onMarkReviewed && (
                <Button size="sm" variant="outline" onClick={onMarkReviewed}>
                  <Clock className="size-3.5 mr-1" />
                  Mark as Reviewed
                </Button>
              )}
              {onApprove && (
                <Button size="sm" onClick={onApprove}>
                  <Check className="size-3.5 mr-1" />
                  Approve
                </Button>
              )}
            </>
          )}
          {status === "reviewed" && onApprove && (
            <Button size="sm" onClick={onApprove}>
              <Check className="size-3.5 mr-1" />
              Approve
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Content */}
      <div className="text-sm text-foreground">{draftContent}</div>
    </div>
  )
}
