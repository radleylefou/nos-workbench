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
        "relative overflow-hidden rounded-lg bg-zinc-950 text-zinc-100 shadow-xs ring-1 ring-foreground/10",
        className,
      )}
    >
      <div className="flex h-9 items-center border-b border-zinc-800 px-4 text-[11px] font-medium text-zinc-400">
        TSX
      </div>
      <pre className="overflow-x-auto p-4 pr-12 text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
      <div className="absolute top-1.5 right-2">
        <CopyButton
          value={code}
          className="text-zinc-200 hover:bg-zinc-800 hover:text-zinc-50"
        />
      </div>
    </div>
  )
}
