"use client"

import * as React from "react"
import { ArrowDown, ArrowUp, GripVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SortableLayout = "vertical" | "grid"

type SortableRenderState = {
  index: number
  isFirst: boolean
  isLast: boolean
  moveUp: () => void
  moveDown: () => void
}

type SortableProps<T> = React.HTMLAttributes<HTMLDivElement> & {
  value: T[]
  onValueChange: (value: T[]) => void
  getItemValue: (item: T) => string
  renderItem: (item: T, state: SortableRenderState) => React.ReactNode
  layout?: SortableLayout
}

function moveItem<T>(items: T[], from: number, to: number) {
  const next = [...items]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

function Sortable<T>({
  value,
  onValueChange,
  getItemValue,
  renderItem,
  layout = "vertical",
  className,
  ...props
}: SortableProps<T>) {
  const move = React.useCallback(
    (from: number, to: number) => {
      if (to < 0 || to >= value.length) return
      onValueChange(moveItem(value, from, to))
    },
    [onValueChange, value],
  )

  return (
    <div
      data-slot="sortable"
      data-layout={layout}
      className={cn(
        "grid gap-2",
        layout === "grid" && "grid-cols-1 sm:grid-cols-2",
        className,
      )}
      {...props}
    >
      {value.map((item, index) => (
        <SortableItem key={getItemValue(item)}>
          {renderItem(item, {
            index,
            isFirst: index === 0,
            isLast: index === value.length - 1,
            moveUp: () => move(index, index - 1),
            moveDown: () => move(index, index + 1),
          })}
        </SortableItem>
      ))}
    </div>
  )
}

function SortableItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sortable-item"
      className={cn("rounded-md border border-border bg-background shadow-xs", className)}
      {...props}
    />
  )
}

function SortableItemHandle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sortable-item-handle"
      className={cn("flex size-8 shrink-0 items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <GripVertical className="size-4" />
    </div>
  )
}

function SortableItemControls({
  onMoveUp,
  onMoveDown,
  disableMoveUp,
  disableMoveDown,
  className,
}: {
  onMoveUp: () => void
  onMoveDown: () => void
  disableMoveUp?: boolean
  disableMoveDown?: boolean
  className?: string
}) {
  return (
    <div data-slot="sortable-item-controls" className={cn("flex items-center gap-1", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Move item up"
        onClick={onMoveUp}
        disabled={disableMoveUp}
      >
        <ArrowUp className="size-3.5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Move item down"
        onClick={onMoveDown}
        disabled={disableMoveDown}
      >
        <ArrowDown className="size-3.5" />
      </Button>
    </div>
  )
}

export { Sortable, SortableItem, SortableItemControls, SortableItemHandle }
