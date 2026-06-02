"use client"

import { useLayoutEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface AnimatedNumberProps {
  value: string | number
  className?: string
}

function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const text = String(value)
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const group = ref.current
    if (!group) return

    group.classList.remove("is-animating")
    void group.offsetHeight
    group.classList.add("is-animating")
  }, [text])

  return (
    <span
      ref={ref}
      className={cn("t-digit-group is-animating", className)}
      aria-label={text}
    >
      {Array.from(text).map((char, index, chars) => {
        const stagger =
          index === chars.length - 2 ? 1 : index === chars.length - 1 ? 2 : undefined

        return (
          <span
            key={`${char}-${index}`}
            className="t-digit"
            data-stagger={stagger}
            aria-hidden="true"
          >
            {char === " " ? "\u00a0" : char}
          </span>
        )
      })}
    </span>
  )
}

export { AnimatedNumber }
