"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ReadinessItem } from "@/components/ui/readiness-item"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ChecklistStatus = "complete" | "in-progress" | "not-started"

interface ChecklistReviewer {
  name: string
  avatarUrl?: string
  initials: string
}

interface ReviewChecklistRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  status: ChecklistStatus
  reviewer?: ChecklistReviewer
  onStatusChange?: (status: ChecklistStatus) => void
}

const statusToReadiness: Record<ChecklistStatus, "pass" | "warning" | "fail"> = {
  complete: "pass",
  "in-progress": "warning",
  "not-started": "fail",
}

const statusLabels: Record<ChecklistStatus, string> = {
  complete: "Complete",
  "in-progress": "In Progress",
  "not-started": "Not Started",
}

export function ReviewChecklistRow({
  label,
  status,
  reviewer,
  onStatusChange,
  className,
  ...props
}: ReviewChecklistRowProps) {
  return (
    <Card className={cn("w-full gap-0 py-0", className)} {...props}>
      <CardContent className="flex items-center gap-3 p-4">
        <ReadinessItem label={label} status={statusToReadiness[status]} className="min-w-0 flex-1" />

        {reviewer && (
          <div className="flex shrink-0 items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={reviewer.avatarUrl} alt={reviewer.name} />
              <AvatarFallback className="text-[9px]">{reviewer.initials}</AvatarFallback>
            </Avatar>
            <span className="hidden text-xs text-muted-foreground sm:block">{reviewer.name}</span>
          </div>
        )}

        <Select
          value={status}
          onValueChange={(v) => onStatusChange?.(v as ChecklistStatus)}
        >
          <SelectTrigger className="h-7 w-32 text-xs">
            <SelectValue>{statusLabels[status]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="complete" className="text-xs">Complete</SelectItem>
            <SelectItem value="in-progress" className="text-xs">In Progress</SelectItem>
            <SelectItem value="not-started" className="text-xs">Not Started</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
}
