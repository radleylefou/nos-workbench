"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"

type DurationDemoProps = {
  name: string
  ms: number
}

export function DurationDemo({ name, ms }: DurationDemoProps) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="flex items-center gap-4">
      <div className="w-24 font-mono text-xs">{name}</div>
      <div className="w-16 font-mono text-xs text-muted-foreground">{ms}ms</div>
      <button
        type="button"
        onMouseEnter={() => setPlaying(true)}
        onAnimationEnd={() => setPlaying(false)}
        className="relative h-2 w-40 overflow-hidden rounded-full bg-muted"
        aria-label={`Play ${name}`}
      >
        <span
          key={playing ? "on" : "off"}
          className={cn(
            "absolute inset-y-0 left-0 block w-0 bg-primary",
            playing && "animate-[wb-duration_var(--wb-d)_var(--ease-standard)_forwards]",
          )}
          style={{ ["--wb-d" as string]: `${ms}ms` }}
        />
      </button>
      <style>{`
        @keyframes wb-duration {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}

type EasingDemoProps = {
  name: string
  curve: string
}

export function EasingDemo({ name, curve }: EasingDemoProps) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="flex items-center gap-4">
      <div className="w-24 font-mono text-xs">{name}</div>
      <div className="hidden font-mono text-[10px] text-muted-foreground sm:block">
        {curve}
      </div>
      <button
        type="button"
        onMouseEnter={() => setPlaying(true)}
        onAnimationEnd={() => setPlaying(false)}
        className="relative ml-auto h-2 w-40 overflow-hidden rounded-full bg-muted"
        aria-label={`Play ${name}`}
      >
        <span
          key={playing ? "on" : "off"}
          className={cn(
            "absolute top-1/2 left-0 -mt-1.5 block size-3 rounded-full bg-primary",
            playing && "animate-[wb-easing_700ms_var(--wb-c)_forwards]",
          )}
          style={{ ["--wb-c" as string]: curve }}
        />
      </button>
      <style>{`
        @keyframes wb-easing {
          from { transform: translateX(0); }
          to { transform: translateX(148px); }
        }
      `}</style>
    </div>
  )
}
