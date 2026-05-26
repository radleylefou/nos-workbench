import { cn } from "@/lib/utils"

interface IdChipProps extends React.HTMLAttributes<HTMLElement> {
  id: string
  href?: string
}

export function IdChip({ id, href, className, ...props }: IdChipProps) {
  const base =
    "inline-flex items-center font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground border border-border transition-colors"

  if (href) {
    return (
      <a
        href={href}
        className={cn(base, "hover:bg-muted/80 hover:text-foreground cursor-pointer", className)}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {id}
      </a>
    )
  }

  return (
    <span className={cn(base, className)} {...props}>
      {id}
    </span>
  )
}
