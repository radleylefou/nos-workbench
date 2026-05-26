"use client"

import { useState, useRef } from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface KanbanItem {
  id: string
  content: React.ReactNode
}

interface KanbanColumn {
  id: string
  title: string
  items: KanbanItem[]
  header?: React.ReactNode
  maxItems?: number
}

interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: KanbanColumn[]
  onItemMove?: (
    itemId: string,
    sourceColumnId: string,
    targetColumnId: string,
    newIndex: number
  ) => void
  columnMinWidth?: number
}

export function KanbanBoard({
  columns: initialColumns,
  onItemMove,
  columnMinWidth = 280,
  className,
  ...props
}: KanbanBoardProps) {
  const [columns, setColumns] = useState(initialColumns)
  const dragItem = useRef<{ itemId: string; colId: string } | null>(null)

  const handleDragStart = (itemId: string, colId: string) => {
    dragItem.current = { itemId, colId }
  }

  const handleDrop = (targetColId: string, targetIndex: number) => {
    if (!dragItem.current) return
    const { itemId, colId: sourceColId } = dragItem.current
    if (sourceColId === targetColId) return

    setColumns((prev) => {
      const next = prev.map((col) => ({ ...col, items: [...col.items] }))
      const sourceCol = next.find((c) => c.id === sourceColId)
      const targetCol = next.find((c) => c.id === targetColId)
      if (!sourceCol || !targetCol) return prev

      const itemIdx = sourceCol.items.findIndex((i) => i.id === itemId)
      if (itemIdx === -1) return prev
      const [moved] = sourceCol.items.splice(itemIdx, 1)
      targetCol.items.splice(targetIndex, 0, moved)
      return next
    })

    onItemMove?.(itemId, sourceColId, targetColId, targetIndex)
    dragItem.current = null
  }

  return (
    <div
      className={cn("flex gap-4 overflow-x-auto pb-2", className)}
      {...props}
    >
      {columns.map((col) => (
        <div
          key={col.id}
          className="flex flex-col shrink-0 rounded-md border border-border bg-muted/30"
          style={{ minWidth: columnMinWidth, width: columnMinWidth }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(col.id, col.items.length)}
        >
          {/* Column header */}
          <div className="border-b border-border bg-muted/50 px-3 py-2.5">
            {col.header ?? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{col.title}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {col.items.length}
                  {col.maxItems ? `/${col.maxItems}` : ""}
                </span>
              </div>
            )}
          </div>

          {/* Items */}
          <ScrollArea className="flex-1">
            <div
              className="flex flex-col gap-2 p-3 min-h-24"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.stopPropagation()
                handleDrop(col.id, col.items.length)
              }}
            >
              {col.items.map((item, idx) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item.id, col.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.stopPropagation()
                    handleDrop(col.id, idx)
                  }}
                  className="cursor-grab active:cursor-grabbing active:opacity-50 active:ring-2 active:ring-[var(--primary)] active:ring-offset-1 rounded-md"
                >
                  <Card className="shadow-sm p-3 text-sm">{item.content}</Card>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      ))}
    </div>
  )
}
