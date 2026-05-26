import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IdChip } from "@/components/ui/id-chip"
import { LinkedChip, type LinkedChipType } from "@/components/ui/linked-chip"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface QuestionActor {
  name: string
  avatarUrl?: string
  initials: string
  role?: string
}

interface OpenQuestionRowProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  impactArea: string
  status: "open" | "answered" | "deferred"
  question: string
  askedBy: QuestionActor
  timestamp: string
  linkedItems?: Array<{ id: string; type: LinkedChipType; href?: string }>
  onDefer?: () => void
  onAnswer?: () => void
}

const statusVariant: Record<
  "open" | "answered" | "deferred",
  "default" | "secondary" | "outline"
> = {
  open: "default",
  answered: "secondary",
  deferred: "outline",
}

export function OpenQuestionRow({
  id,
  impactArea,
  status,
  question,
  askedBy,
  timestamp,
  linkedItems,
  onDefer,
  onAnswer,
  className,
  ...props
}: OpenQuestionRowProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-md border border-border p-4 bg-card",
        className
      )}
      {...props}
    >
      <div className="flex-1 min-w-0">
        {/* Header row */}
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <IdChip id={id} />
          <Badge variant="secondary" className="text-xs">{impactArea}</Badge>
          <Badge variant={statusVariant[status]} className="text-xs capitalize">{status}</Badge>
        </div>

        {/* Question */}
        <p className="text-sm text-foreground mb-2">{question}</p>

        {/* Meta */}
        <div className="flex items-center gap-3 flex-wrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1.5">
                <Avatar className="size-5">
                  <AvatarImage src={askedBy.avatarUrl} alt={askedBy.name} />
                  <AvatarFallback className="text-[9px]">{askedBy.initials}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{askedBy.name}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {askedBy.role ? `${askedBy.name} · ${askedBy.role}` : askedBy.name}
            </TooltipContent>
          </Tooltip>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
          {linkedItems?.map((item, i) => (
            <LinkedChip key={i} id={item.id} type={item.type} href={item.href} />
          ))}
        </div>
      </div>

      {/* Actions */}
      {(onDefer || onAnswer) && (
        <div className="flex items-center gap-2 shrink-0">
          {onDefer && (
            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={onDefer}>
              Defer
            </Button>
          )}
          {onAnswer && (
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={onAnswer}>
              Answer
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
