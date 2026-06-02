"use client"

import * as React from "react"
import { Check, Search, Users, X } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type EntityPickerOption = {
  id: string
  label: string
  description?: string
  type?: string
  meta?: string
  avatar?: string
  status?: "active" | "watch" | "inactive"
}

type EntityPickerProps = Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange" | "value"> & {
  options: EntityPickerOption[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  multiple?: boolean
  maxVisible?: number
}

const statusClassName: Record<NonNullable<EntityPickerOption["status"]>, string> = {
  active: "bg-success-50 text-success-700 ring-success-200",
  watch: "bg-warning-50 text-warning-700 ring-warning-200",
  inactive: "bg-muted text-muted-foreground ring-border",
}

function EntityPicker({
  options,
  value,
  defaultValue = [],
  onChange,
  placeholder = "Select entities",
  searchPlaceholder = "Search entities...",
  emptyText = "No entities found.",
  multiple = false,
  maxVisible = 2,
  className,
  ...props
}: EntityPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const selectedIds = value ?? internalValue

  const selected = options.filter((option) => selectedIds.includes(option.id))
  const filtered = options.filter((option) => {
    const haystack = [option.label, option.description, option.type, option.meta].join(" ").toLowerCase()
    return haystack.includes(query.toLowerCase())
  })

  const commit = (next: string[]) => {
    if (!value) setInternalValue(next)
    onChange?.(next)
  }

  const toggleOption = (id: string) => {
    if (multiple) {
      commit(selectedIds.includes(id) ? selectedIds.filter((item) => item !== id) : [...selectedIds, id])
      return
    }
    commit([id])
    setOpen(false)
  }

  const removeOption = (id: string) => {
    commit(selectedIds.filter((item) => item !== id))
  }

  return (
    <div data-slot="entity-picker" className={cn("flex min-w-0 flex-col gap-2", className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "h-auto min-h-10 w-full justify-start gap-2 px-3 py-2 text-left",
              !selected.length && "text-muted-foreground",
            )}
          >
            <Users className="size-4 shrink-0 text-muted-foreground" />
            {selected.length ? (
              <span className="flex min-w-0 flex-wrap gap-1.5">
                {selected.slice(0, maxVisible).map((option) => (
                  <span key={option.id} className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-xs text-foreground">
                    {option.avatar ?? option.label.slice(0, 2).toUpperCase()}
                    <span className="max-w-32 truncate">{option.label}</span>
                  </span>
                ))}
                {selected.length > maxVisible ? (
                  <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    +{selected.length - maxVisible}
                  </span>
                ) : null}
              </span>
            ) : (
              <span className="truncate">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[24rem] gap-2 p-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-9 pl-9"
            />
          </div>
          <div className="max-h-72 overflow-y-auto">
            {filtered.length ? (
              <div className="flex flex-col gap-1">
                {filtered.map((option) => {
                  const checked = selectedIds.includes(option.id)
                  return (
                    <button
                      type="button"
                      key={option.id}
                      className="flex min-w-0 items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-muted"
                      onClick={() => toggleOption(option.id)}
                    >
                      <Avatar size="sm">
                        <AvatarFallback>{option.avatar ?? option.label.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium text-foreground">{option.label}</span>
                          {option.type ? <Badge variant="secondary" className="h-5 rounded px-1.5 text-[11px]">{option.type}</Badge> : null}
                        </span>
                        {option.description ? (
                          <span className="mt-0.5 block truncate text-xs text-muted-foreground">{option.description}</span>
                        ) : null}
                      </span>
                      {option.status ? (
                        <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-medium capitalize ring-1", statusClassName[option.status])}>
                          {option.status}
                        </span>
                      ) : null}
                      {checked ? <Check className="size-4 text-primary" /> : null}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">{emptyText}</div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {multiple && selected.length ? (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((option) => (
            <span key={option.id} className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-background px-2 text-xs">
              {option.label}
              <button
                type="button"
                aria-label={`Remove ${option.label}`}
                className="text-muted-foreground hover:text-foreground"
                onClick={() => removeOption(option.id)}
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { EntityPicker }
