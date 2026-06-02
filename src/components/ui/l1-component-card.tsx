import { MoreHorizontal, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import type { L1Type } from "@/components/ui/l1-distribution-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HealthIndicator } from "@/components/ui/health-indicator"
import { l1TypeBadgeClass } from "@/lib/l1-type-badge"

interface L1ComponentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  description?: string
  type: L1Type
  epicCount: number
  estimate: number
  phases: string[]
  health: "healthy" | "warning" | "error"
  status?: string
  onEdit?: () => void
  onDelete?: () => void
  onAddEpic?: () => void
}

export function L1ComponentCard({
  name,
  description,
  type,
  epicCount,
  estimate,
  phases,
  health,
  status,
  onEdit,
  onDelete,
  onAddEpic,
  className,
  ...props
}: L1ComponentCardProps) {
  const hasMenu = Boolean(onEdit || onDelete)

  return (
    <Card className={cn("w-full gap-0 py-0", className)} {...props}>
      <CardHeader className="p-5">
        <CardTitle className="text-sm leading-snug">{name}</CardTitle>
        {description && (
          <CardDescription className="line-clamp-2 text-xs leading-5">
            {description}
          </CardDescription>
        )}
        <CardAction className="flex items-center gap-2">
          <Badge variant="outline" className={cn("text-xs", l1TypeBadgeClass[type])}>
            {type}
          </Badge>
          {status && (
            <Badge variant="secondary" className="text-xs">
              {status}
            </Badge>
          )}
          {hasMenu && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="size-7 shrink-0 p-0">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>}
                {onDelete && (
                  <DropdownMenuItem className="text-destructive" onClick={onDelete}>
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardAction>
      </CardHeader>

      <CardContent className="border-t border-border/60 p-5">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{epicCount} epics</span>
          <span>{estimate} pts</span>
          {phases.length > 0 && <span className="truncate">{phases.join(", ")}</span>}
        </div>
      </CardContent>

      <CardFooter
        className={cn(
          "border-t border-border/60 p-5",
          onAddEpic ? "justify-between" : "justify-start"
        )}
      >
        <HealthIndicator status={health} />
        {onAddEpic && (
          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={onAddEpic}>
            <Plus className="size-3" />
            Add Epic
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
