import { CopyButton } from "@/components/workbench/copy-button"
import { cn } from "@/lib/utils"

type CodeBlockProps = {
  code: string
  className?: string
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-zinc-950 text-zinc-100 ring-1 ring-foreground/10",
        className,
      )}
    >
      <pre className="overflow-x-auto p-4 pr-12 text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
      <div className="absolute top-2 right-2">
        <CopyButton
          value={code}
          className="text-zinc-200 hover:bg-zinc-800 hover:text-zinc-50"
        />
      </div>
    </div>
  )
}
