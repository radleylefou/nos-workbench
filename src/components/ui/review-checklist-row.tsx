"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    <div
      className={cn(
        "flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3",
        className
      )}
      {...props}
    >
      <ReadinessItem label={label} status={statusToReadiness[status]} className="flex-1 min-w-0" />

      {reviewer && (
        <div className="flex items-center gap-2 shrink-0">
          <Avatar className="size-6">
            <AvatarImage src={reviewer.avatarUrl} alt={reviewer.name} />
            <AvatarFallback className="text-[9px]">{reviewer.initials}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground hidden sm:block">{reviewer.name}</span>
        </div>
      )}

      <Select
        value={status}
        onValueChange={(v) => onStatusChange?.(v as ChecklistStatus)}
      >
        <SelectTrigger className="w-32 h-7 text-xs">
          <SelectValue>{statusLabels[status]}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="complete" className="text-xs">Complete</SelectItem>
          <SelectItem value="in-progress" className="text-xs">In Progress</SelectItem>
          <SelectItem value="not-started" className="text-xs">Not Started</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
