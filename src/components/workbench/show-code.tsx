"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/workbench/code-block"

type ShowCodeProps = {
  code: string
}

export function ShowCode({ code }: ShowCodeProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-4">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        className="gap-1.5"
      >
        <ChevronDown
          className={
            "transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] " +
            (open ? "rotate-180" : "")
          }
        />
        {open ? "Hide code" : "Show code"}
      </Button>
      {open && (
        <div className="mt-3">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  )
}
