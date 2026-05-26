import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Timeline, type TimelineStep } from "@/components/ui/timeline"

interface ApprovalWorkflowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TimelineStep[]
  canApprove?: boolean
  requiredFor?: string
  onApprove?: () => void
  onRequestChanges?: () => void
}

export function ApprovalWorkflowCard({
  steps,
  canApprove = false,
  requiredFor,
  onApprove,
  onRequestChanges,
  className,
  ...props
}: ApprovalWorkflowCardProps) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm font-semibold">Approval Workflow</CardTitle>
          {requiredFor && (
            <Badge variant="secondary" className="text-xs">
              Required for {requiredFor}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <Timeline steps={steps} variant="compact" />
      </CardContent>

      {(onApprove || onRequestChanges) && (
        <CardFooter className="gap-2 pt-0">
          {onApprove && (
            <Button
              size="sm"
              disabled={!canApprove}
              onClick={onApprove}
              className="flex-1"
            >
              Approve
            </Button>
          )}
          {onRequestChanges && (
            <Button
              size="sm"
              variant="outline"
              disabled={!canApprove}
              onClick={onRequestChanges}
              className="flex-1"
            >
              Request Changes
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
