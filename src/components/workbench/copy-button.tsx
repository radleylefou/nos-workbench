"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CopyButtonProps = {
  value: string
  label?: string
  className?: string
  size?: "default" | "sm" | "icon" | "icon-sm"
}

export function CopyButton({
  value,
  label,
  className,
  size = "icon-sm",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // Clipboard API may be unavailable; fail silently.
    }
  }

  const Icon = copied ? Check : Copy

  if (label) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={cn("gap-1.5", className)}
        onClick={handleCopy}
        aria-label={`Copy ${label}`}
      >
        <Icon />
        {copied ? "Copied" : label}
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size={size}
      className={cn(className)}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy"}
    >
      <Icon />
    </Button>
  )
}
