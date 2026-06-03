"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type ScrollspySection = {
  id: string
  title: string
  description?: string
}

type ScrollspyProps = React.HTMLAttributes<HTMLElement> & {
  sections: ScrollspySection[]
  activeId?: string
  defaultActiveId?: string
  onActiveChange?: (id: string) => void
  offset?: number
}

function Scrollspy({
  sections,
  activeId,
  defaultActiveId,
  onActiveChange,
  offset = 96,
  className,
  ...props
}: ScrollspyProps) {
  const [internalActiveId, setInternalActiveId] = React.useState(defaultActiveId ?? sections[0]?.id)
  const currentActiveId = activeId ?? internalActiveId

  React.useEffect(() => {
    if (!sections.length || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          if (!activeId) setInternalActiveId(visible.target.id)
          onActiveChange?.(visible.target.id)
        }
      },
      {
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0.1, 0.35, 0.65],
      },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [activeId, offset, onActiveChange, sections])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (!activeId) setInternalActiveId(id)
    onActiveChange?.(id)
    element?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <nav data-slot="scrollspy" className={cn("flex flex-col gap-1 text-sm", className)} {...props}>
      {sections.map((section) => {
        const active = section.id === currentActiveId
        return (
          <button
            key={section.id}
            type="button"
            aria-current={active ? "true" : undefined}
            className={cn(
              "flex min-w-0 flex-col rounded-md px-3 py-2 text-left transition-colors hover:bg-muted/60",
              active && "bg-primary/5 text-primary",
            )}
            onClick={() => handleClick(section.id)}
          >
            <span className="truncate font-medium">{section.title}</span>
            {section.description ? (
              <span className={cn("mt-0.5 truncate text-xs", active ? "text-primary/70" : "text-muted-foreground")}>
                {section.description}
              </span>
            ) : null}
          </button>
        )
      })}
    </nav>
  )
}

export { Scrollspy }
