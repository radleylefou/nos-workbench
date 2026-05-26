import {
  AlertTriangle,
  Box,
  CheckSquare,
  FileText,
  HelpCircle,
  Link2,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type LinkedChipType =
  | "epic"
  | "story"
  | "risk"
  | "question"
  | "assumption"
  | "component"

interface LinkedChipProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  id: string
  type: LinkedChipType
  href?: string
}

const typeIcons: Record<LinkedChipType, React.ElementType> = {
  epic: Link2,
  story: FileText,
  risk: AlertTriangle,
  question: HelpCircle,
  assumption: CheckSquare,
  component: Box,
}

export function LinkedChip({ id, type, href, className, ...props }: LinkedChipProps) {
  const Icon = typeIcons[type]
  const base =
    "inline-flex items-center gap-1 text-xs font-mono border border-border rounded px-1.5 py-0.5 hover:bg-muted transition-colors cursor-pointer text-foreground"

  if (href) {
    return (
      <a href={href} className={cn(base, className)} {...props}>
        <Icon className="size-3 shrink-0" />
        {id}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={cn(base, "bg-transparent", className)}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <Icon className="size-3 shrink-0" />
      {id}
    </button>
  )
}
