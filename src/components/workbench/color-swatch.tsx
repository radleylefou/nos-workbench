"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

type ColorSwatchProps = {
  name: string
  value: string
  primary?: boolean
  /** CSS variable name to copy (e.g. "--brand-600"). Falls back to `value`. */
  copyValue?: string
}

export function ColorSwatch({ name, value, primary, copyValue }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false)
  const toCopy = copyValue ?? value

  async function copy() {
    try {
      await navigator.clipboard.writeText(toCopy)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      /* noop */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "group flex flex-col items-stretch overflow-hidden rounded-md border border-border bg-card text-left ring-1 ring-foreground/5 transition-shadow duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
      aria-label={`Copy ${name}`}
    >
      <div className="relative h-14" style={{ backgroundColor: value }}>
        {primary && (
          <span className="absolute top-1 right-1 rounded bg-black/60 px-1 py-0.5 text-[9px] font-medium tracking-wide text-white uppercase">
            Primary
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-2 px-2 py-1.5">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[11px] font-medium">{name}</div>
          <div className="truncate font-mono text-[10px] text-muted-foreground">
            {value}
          </div>
        </div>
        <span
          className={cn(
            "mt-0.5 inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
            copied ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
          aria-hidden
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
        </span>
      </div>
      <span aria-live="polite" className="sr-only">
        {copied ? `${name} copied` : ""}
      </span>
    </button>
  )
}
