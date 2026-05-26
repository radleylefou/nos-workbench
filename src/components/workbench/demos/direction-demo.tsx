"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { DirectionProvider, useDirection } from "@/components/ui/direction"
import { Input } from "@/components/ui/input"

function DirectionContent() {
  const dir = useDirection()
  return (
    <div className="flex w-full flex-col gap-3 rounded-md border border-border p-4">
      <p className="font-mono text-xs text-muted-foreground">
        Current direction: <strong className="text-foreground">{dir}</strong>
      </p>
      <Input placeholder={dir === "rtl" ? "اكتب هنا..." : "Type here..."} />
      <p className="text-sm" dir={dir}>
        {dir === "rtl"
          ? "هذا النص يُعرض من اليمين إلى اليسار."
          : "This text is rendered left to right."}
      </p>
    </div>
  )
}

export function DirectionDemo() {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")
  return (
    <DirectionProvider dir={dir}>
      <div className="flex flex-col gap-4">
        <DirectionContent />
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={dir === "ltr" ? "default" : "outline"}
            onClick={() => setDir("ltr")}
          >
            LTR
          </Button>
          <Button
            size="sm"
            variant={dir === "rtl" ? "default" : "outline"}
            onClick={() => setDir("rtl")}
          >
            RTL
          </Button>
        </div>
      </div>
    </DirectionProvider>
  )
}
