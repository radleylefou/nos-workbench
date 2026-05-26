import { cn } from "@/lib/utils"

interface GanttTask {
  id: string
  label: string
  start: number   // column index (0-based)
  duration: number // number of columns to span
  type?: "task" | "milestone"
  group?: string
}

interface GanttColumn {
  id: string
  label: string
}

interface GanttProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: GanttColumn[]
  tasks: GanttTask[]
  todayColumn?: number  // column index of today
  rowHeight?: number
}

export function Gantt({
  columns,
  tasks,
  todayColumn,
  rowHeight = 40,
  className,
  ...props
}: GanttProps) {
  const colWidth = 80
  const labelWidth = 180

  return (
    <div className={cn("w-full overflow-x-auto rounded-md border border-border", className)} {...props}>
      <div style={{ minWidth: labelWidth + columns.length * colWidth }}>
        {/* Header row */}
        <div className="flex border-b border-border bg-muted/50">
          <div
            className="shrink-0 border-r border-border px-3 py-2 text-xs font-medium text-muted-foreground"
            style={{ width: labelWidth }}
          >
            Task
          </div>
          {columns.map((col, i) => (
            <div
              key={col.id}
              className={cn(
                "shrink-0 border-r border-border px-2 py-2 text-center text-xs font-medium text-muted-foreground",
                todayColumn === i && "bg-[var(--error)]/5"
              )}
              style={{ width: colWidth }}
            >
              {col.label}
            </div>
          ))}
        </div>

        {/* Today indicator line */}
        {todayColumn !== undefined && (
          <div className="relative h-0 pointer-events-none">
            <div
              className="absolute top-0 bottom-0 border-l-2 border-[var(--error)]/60 border-dashed z-10"
              style={{
                left: labelWidth + todayColumn * colWidth + colWidth / 2,
                height: (tasks.length + 1) * rowHeight,
              }}
            />
          </div>
        )}

        {/* Task rows */}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex border-b border-border last:border-b-0 hover:bg-muted/20 group"
            style={{ height: rowHeight }}
          >
            {/* Label cell */}
            <div
              className="flex shrink-0 items-center border-r border-border px-3 text-sm text-foreground"
              style={{ width: labelWidth }}
            >
              <span className="truncate">{task.label}</span>
            </div>

            {/* Grid cells */}
            {columns.map((col, i) => {
              const isTaskStart = i === task.start
              const isInTask = i >= task.start && i < task.start + task.duration
              const isToday = i === todayColumn

              return (
                <div
                  key={col.id}
                  className={cn(
                    "relative shrink-0 border-r border-border last:border-r-0 flex items-center",
                    isToday && "bg-[var(--error)]/5"
                  )}
                  style={{ width: colWidth, height: rowHeight }}
                >
                  {/* Task bar — only render at start position, spans width */}
                  {isTaskStart && (
                    <div
                      className={cn(
                        "absolute inset-y-2 rounded",
                        task.type === "milestone"
                          ? "w-4 h-4 rotate-45 bg-[var(--warning)] inset-y-auto my-auto rounded-sm"
                          : "bg-[var(--primary)] opacity-90 group-hover:opacity-100 transition-opacity"
                      )}
                      style={
                        task.type !== "milestone"
                          ? {
                              left: 4,
                              right: -(task.duration - 1) * colWidth - 4,
                              width: task.duration * colWidth - 8,
                            }
                          : undefined
                      }
                    />
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
