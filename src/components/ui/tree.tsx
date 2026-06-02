"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export type TreeNode = {
  id: string
  label: React.ReactNode
  children?: TreeNode[]
  icon?: React.ReactNode
  meta?: React.ReactNode
  disabled?: boolean
}

type TreeProps = React.HTMLAttributes<HTMLDivElement> & {
  data: TreeNode[]
  defaultExpandedIds?: string[]
  expandedIds?: string[]
  onExpandedIdsChange?: (ids: string[]) => void
  selectedId?: string
  onSelectedIdChange?: (id: string) => void
  showLines?: boolean
}

function Tree({
  data,
  defaultExpandedIds = [],
  expandedIds,
  onExpandedIdsChange,
  selectedId,
  onSelectedIdChange,
  showLines = false,
  className,
  ...props
}: TreeProps) {
  const [internalExpandedIds, setInternalExpandedIds] = React.useState(defaultExpandedIds)
  const activeExpandedIds = expandedIds ?? internalExpandedIds

  const setExpandedIds = React.useCallback(
    (next: string[]) => {
      onExpandedIdsChange?.(next)
      if (!expandedIds) setInternalExpandedIds(next)
    },
    [expandedIds, onExpandedIdsChange],
  )

  const toggleNode = React.useCallback(
    (id: string) => {
      setExpandedIds(
        activeExpandedIds.includes(id)
          ? activeExpandedIds.filter((expandedId) => expandedId !== id)
          : [...activeExpandedIds, id],
      )
    },
    [activeExpandedIds, setExpandedIds],
  )

  return (
    <div
      data-slot="tree"
      data-lines={showLines ? "true" : undefined}
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      role="tree"
      {...props}
    >
      {data.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          level={0}
          expandedIds={activeExpandedIds}
          selectedId={selectedId}
          showLines={showLines}
          onToggle={toggleNode}
          onSelect={onSelectedIdChange}
        />
      ))}
    </div>
  )
}

function TreeItem({
  node,
  level,
  expandedIds,
  selectedId,
  showLines,
  onToggle,
  onSelect,
}: {
  node: TreeNode
  level: number
  expandedIds: string[]
  selectedId?: string
  showLines: boolean
  onToggle: (id: string) => void
  onSelect?: (id: string) => void
}) {
  const hasChildren = Boolean(node.children?.length)
  const expanded = expandedIds.includes(node.id)
  const selected = selectedId === node.id

  return (
    <div role="none">
      <div
        className={cn(
          "relative flex min-w-0 items-center gap-1 rounded-md px-2 py-1.5 text-foreground transition-colors",
          showLines && level > 0 && "before:absolute before:bottom-1/2 before:left-[calc(var(--tree-indent)-0.75rem)] before:h-px before:w-3 before:bg-border",
          selected && "bg-primary/10 text-primary",
          node.disabled ? "opacity-50" : "hover:bg-muted/60",
        )}
        style={{ "--tree-indent": `${level * 1.25 + 0.5}rem`, paddingLeft: `${level * 1.25 + 0.5}rem` } as React.CSSProperties}
        role="treeitem"
        aria-expanded={hasChildren ? expanded : undefined}
        aria-selected={selected}
      >
        {hasChildren ? (
          <button
            type="button"
            aria-label={expanded ? "Collapse" : "Expand"}
            className="flex size-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-background hover:text-foreground"
            onClick={() => onToggle(node.id)}
            disabled={node.disabled}
          >
            <ChevronRight className={cn("size-3.5 transition-transform", expanded && "rotate-90")} />
          </button>
        ) : (
          <span className="size-5 shrink-0" />
        )}
        <button
          type="button"
          disabled={node.disabled}
          onClick={() => onSelect?.(node.id)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left disabled:cursor-not-allowed"
        >
          {node.icon ? <span className="shrink-0 text-muted-foreground">{node.icon}</span> : null}
          <span className="truncate">{node.label}</span>
        </button>
        {node.meta ? <span className="ml-auto shrink-0">{node.meta}</span> : null}
      </div>
      {hasChildren && expanded ? (
        <div className={cn(showLines && "relative ml-3 border-l border-border pl-0")} role="group">
          {node.children?.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              showLines={showLines}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { Tree }
