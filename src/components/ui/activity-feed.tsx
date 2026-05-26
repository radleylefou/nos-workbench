import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ActivityActor {
  name: string
  avatarUrl?: string
  initials: string
}

export interface ActivityFeedItem {
  id: string
  actor: ActivityActor
  action: string
  subject: string
  timestamp: string
  href?: string
}

interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ActivityFeedItem[]
  maxItems?: number
}

export function ActivityFeed({ items, maxItems, className, ...props }: ActivityFeedProps) {
  const visible = maxItems ? items.slice(0, maxItems) : items

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {visible.map((item) => (
        <div key={item.id} className="flex items-start gap-3">
          <Avatar className="size-7 shrink-0">
            <AvatarImage src={item.actor.avatarUrl} alt={item.actor.name} />
            <AvatarFallback className="text-[10px]">{item.actor.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm leading-snug">
              <span className="font-medium text-foreground">{item.actor.name}</span>
              {" "}
              <span className="text-muted-foreground">{item.action}</span>
              {" "}
              {item.href ? (
                <a href={item.href} className="font-medium text-foreground hover:underline">
                  {item.subject}
                </a>
              ) : (
                <span className="font-medium text-foreground">{item.subject}</span>
              )}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{item.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
