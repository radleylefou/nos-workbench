import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
    <Card className={cn("w-full gap-0 py-0", className)} {...props}>
      <CardContent className="flex items-start gap-4 p-4">
        <div className="min-w-0 flex-1">
          {/* Header row */}
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <IdChip id={id} />
            <Badge variant="secondary" className="text-xs">{impactArea}</Badge>
            <Badge variant={statusVariant[status]} className="text-xs capitalize">{status}</Badge>
          </div>

          {/* Question */}
          <p className="mb-2 text-sm text-foreground">{question}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3">
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
          <div className="flex shrink-0 items-center gap-2">
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
      </CardContent>
    </Card>
  )
}
