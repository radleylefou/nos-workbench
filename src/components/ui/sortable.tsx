"use client"

import * as React from "react"
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
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

// Passes drag listeners from useSortable down to SortableItemHandle
const SortableDragContext = React.createContext<{
  listeners?: ReturnType<typeof useSortable>["listeners"]
}>({})

function Sortable<T>({
  value,
  onValueChange,
  getItemValue,
  renderItem,
  layout = "vertical",
  className,
  ...props
}: SortableProps<T>) {
  const dndId = React.useId()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const ids = React.useMemo(() => value.map(getItemValue), [value, getItemValue])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = ids.indexOf(String(active.id))
      const newIndex = ids.indexOf(String(over.id))
      onValueChange(arrayMove(value, oldIndex, newIndex))
    }
  }

  const move = React.useCallback(
    (from: number, to: number) => {
      if (to < 0 || to >= value.length) return
      onValueChange(arrayMove(value, from, to))
    },
    [onValueChange, value],
  )

  const containerClass = cn(
    "grid gap-2",
    layout === "grid" && "grid-cols-1 sm:grid-cols-2",
    className,
  )

  if (!mounted) {
    return (
      <div
        data-slot="sortable"
        data-layout={layout}
        className={containerClass}
        {...props}
      >
        {value.map((item, index) => {
          const id = getItemValue(item)
          return (
            <SortableDragContext.Provider key={id} value={{}}>
              <div
                data-slot="sortable-item"
                className="rounded-md border border-border bg-background shadow-xs"
              >
                {renderItem(item, {
                  index,
                  isFirst: index === 0,
                  isLast: index === value.length - 1,
                  moveUp: () => move(index, index - 1),
                  moveDown: () => move(index, index + 1),
                })}
              </div>
            </SortableDragContext.Provider>
          )
        })}
      </div>
    )
  }

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={ids}
        strategy={layout === "grid" ? rectSortingStrategy : verticalListSortingStrategy}
      >
        <div
          data-slot="sortable"
          data-layout={layout}
          className={containerClass}
          {...props}
        >
          {value.map((item, index) => {
            const id = getItemValue(item)
            return (
              <SortableListItem key={id} id={id}>
                {renderItem(item, {
                  index,
                  isFirst: index === 0,
                  isLast: index === value.length - 1,
                  moveUp: () => move(index, index - 1),
                  moveDown: () => move(index, index + 1),
                })}
              </SortableListItem>
            )
          })}
        </div>
      </SortableContext>
    </DndContext>
  )
}

function SortableListItem({
  id,
  children,
  className,
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <SortableDragContext.Provider value={{ listeners }}>
      <div
        ref={setNodeRef}
        style={style}
        data-slot="sortable-item"
        data-dragging={isDragging || undefined}
        className={cn(
          "rounded-md border border-border bg-background shadow-xs",
          "data-[dragging]:z-10 data-[dragging]:opacity-50 data-[dragging]:shadow-md",
          className,
        )}
        {...attributes}
      >
        {children}
      </div>
    </SortableDragContext.Provider>
  )
}

// Alias so existing code that imports SortableItem still works
const SortableItem = SortableListItem

function SortableItemHandle({ className, ...props }: React.ComponentProps<"div">) {
  const { listeners } = React.useContext(SortableDragContext)
  return (
    <div
      data-slot="sortable-item-handle"
      className={cn(
        "flex size-8 shrink-0 cursor-grab items-center justify-center text-muted-foreground active:cursor-grabbing",
        className,
      )}
      {...listeners}
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
