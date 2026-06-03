"use client"

import * as React from "react"
import { Check, ListFilter, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export type FilterFieldType = "text" | "select" | "multiselect" | "date" | "number" | "separator"

export type FilterOperator =
  | "is"
  | "is_not"
  | "contains"
  | "is_any_of"
  | "between"
  | "before"
  | "after"
  | "greater_than"
  | "less_than"

export type FilterOption = {
  value: string
  label: string
  icon?: React.ReactNode
}

export type FilterFieldConfig = {
  key: string
  label: string
  type: FilterFieldType
  options?: FilterOption[]
  operators?: FilterOperator[]
  defaultOperator?: FilterOperator
  placeholder?: string
  group?: string
}

export type Filter = {
  id: string
  field: string
  operator: FilterOperator
  values: string[]
}

type FiltersProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
  filters: Filter[]
  fields: FilterFieldConfig[]
  onChange: (filters: Filter[]) => void
  size?: "sm" | "default" | "lg"
  allowMultiple?: boolean
  showClear?: boolean
  addLabel?: string
}

const operatorsByType: Record<Exclude<FilterFieldType, "separator">, FilterOperator[]> = {
  text: ["contains", "is", "is_not"],
  select: ["is", "is_not"],
  multiselect: ["is_any_of"],
  date: ["is", "before", "after", "between"],
  number: ["is", "greater_than", "less_than", "between"],
}

const operatorLabels: Record<FilterOperator, string> = {
  is: "is",
  is_not: "is not",
  contains: "contains",
  is_any_of: "is any of",
  between: "between",
  before: "before",
  after: "after",
  greater_than: "greater than",
  less_than: "less than",
}

function createFilter(
  field: string,
  operator: FilterOperator = "is",
  values: string[] = [],
): Filter {
  return {
    id: `${field}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    field,
    operator,
    values,
  }
}

function getOperators(field: FilterFieldConfig) {
  if (field.operators?.length) return field.operators
  if (field.type === "separator") return []
  return operatorsByType[field.type]
}

function getFieldValueLabel(field: FilterFieldConfig, values: string[]) {
  if (!values.length) return "Any"
  if (field.type === "select" || field.type === "multiselect") {
    const labels = values.map(
      (value) => field.options?.find((option) => option.value === value)?.label ?? value,
    )
    return labels.length > 2 ? `${labels.length} selected` : labels.join(", ")
  }
  if (values.length === 2) return `${values[0]} to ${values[1]}`
  return values[0]
}

function Filters({
  filters,
  fields,
  onChange,
  size = "default",
  allowMultiple = true,
  showClear = true,
  addLabel = "Add filter",
  className,
  ...props
}: FiltersProps) {
  const availableFields = fields.filter((field) => {
    if (field.type === "separator") return true
    return allowMultiple || !filters.some((filter) => filter.field === field.key)
  })

  const upsertFilter = (nextFilter: Filter) => {
    onChange(filters.map((filter) => (filter.id === nextFilter.id ? nextFilter : filter)))
  }

  const removeFilter = (id: string) => {
    onChange(filters.filter((filter) => filter.id !== id))
  }

  return (
    <div
      data-slot="filters"
      data-size={size}
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      {filters.map((filter) => {
        const field = fields.find((item) => item.key === filter.field)
        if (!field || field.type === "separator") return null
        return (
          <FilterChip
            key={filter.id}
            filter={filter}
            field={field}
            size={size}
            onChange={upsertFilter}
            onRemove={() => removeFilter(filter.id)}
          />
        )
      })}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size={size === "sm" ? "sm" : "default"}
            className={cn(size === "sm" && "h-8", size === "lg" && "h-10")}
          >
            <Plus className="size-4" />
            {addLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-64 gap-2 p-2">
          <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            Filter by
          </div>
          <div className="flex flex-col gap-1">
            {availableFields.map((field) => {
              if (field.type === "separator") {
                return <Separator key={field.key} className="my-1" />
              }
              const operator = field.defaultOperator ?? getOperators(field)[0] ?? "is"
              return (
                <button
                  type="button"
                  key={field.key}
                  className="flex items-center justify-between rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                  onClick={() => onChange([...filters, createFilter(field.key, operator)])}
                >
                  <span>{field.label}</span>
                  {field.group ? (
                    <span className="text-xs text-muted-foreground">{field.group}</span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>

      {showClear && filters.length ? (
        <Button type="button" variant="ghost" size="sm" onClick={() => onChange([])}>
          Clear
        </Button>
      ) : null}
    </div>
  )
}

function FilterChip({
  filter,
  field,
  size,
  onChange,
  onRemove,
}: {
  filter: Filter
  field: FilterFieldConfig
  size: FiltersProps["size"]
  onChange: (filter: Filter) => void
  onRemove: () => void
}) {
  const operators = getOperators(field)
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState(filter)

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (nextOpen) setDraft(filter)
  }

  const commit = () => {
    onChange(draft)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <div
        data-slot="filter-chip"
        className={cn(
          "inline-flex h-9 items-center overflow-hidden rounded-md border border-border bg-background text-sm shadow-xs",
          size === "sm" && "h-8 text-xs",
          size === "lg" && "h-10",
        )}
      >
        <PopoverTrigger asChild>
          <button type="button" className="flex h-full items-center gap-1.5 px-2.5 hover:bg-muted/60">
            <ListFilter className="size-3.5 text-muted-foreground" />
            <span className="font-medium">{field.label}</span>
            <span className="text-muted-foreground">{operatorLabels[filter.operator]}</span>
            <span className="inline-flex h-6 items-center rounded-md bg-muted px-2 text-sm font-semibold text-foreground">
              {getFieldValueLabel(field, filter.values)}
            </span>
          </button>
        </PopoverTrigger>
        <button
          type="button"
          aria-label={`Remove ${field.label} filter`}
          onClick={onRemove}
          className="flex h-full w-8 items-center justify-center border-l border-border text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      </div>
      <PopoverContent align="start" className="w-80 gap-3">
        <div>
          <div className="text-sm font-medium">{field.label}</div>
          <p className="text-xs text-muted-foreground">Choose an operator and value.</p>
        </div>
        <Select
          value={draft.operator}
          onValueChange={(value) => setDraft({ ...draft, operator: value as FilterOperator, values: [] })}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {operators.map((operator) => (
              <SelectItem key={operator} value={operator}>
                {operatorLabels[operator]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FilterValueEditor field={field} filter={draft} onChange={setDraft} />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onRemove}>
            Remove
          </Button>
          <Button type="button" size="sm" onClick={commit}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function FilterValueEditor({
  field,
  filter,
  onChange,
}: {
  field: FilterFieldConfig
  filter: Filter
  onChange: (filter: Filter) => void
}) {
  const inputType = field.type === "date" ? "date" : field.type === "number" ? "number" : "text"

  if (field.type === "select") {
    return (
      <Select
        value={filter.values[0] ?? ""}
        onValueChange={(value) => onChange({ ...filter, values: [value] })}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={field.placeholder ?? "Select value"} />
        </SelectTrigger>
        <SelectContent>
          {field.options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  if (field.type === "multiselect") {
    return (
      <div className="flex max-h-56 flex-col gap-1 overflow-y-auto rounded-md border border-border p-1">
        {field.options?.map((option) => {
          const checked = filter.values.includes(option.value)
          return (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
            >
              <Checkbox
                checked={checked}
                onCheckedChange={(value) => {
                  onChange({
                    ...filter,
                    values: value
                      ? [...filter.values, option.value]
                      : filter.values.filter((item) => item !== option.value),
                  })
                }}
              />
              <span className="flex-1">{option.label}</span>
              {checked ? <Check className="size-3.5 text-primary" /> : null}
            </label>
          )
        })}
      </div>
    )
  }

  if (filter.operator === "between") {
    return (
      <div className="grid grid-cols-2 gap-2">
        <Input
          type={inputType}
          value={filter.values[0] ?? ""}
          placeholder="From"
          onChange={(event) => onChange({ ...filter, values: [event.target.value, filter.values[1] ?? ""] })}
        />
        <Input
          type={inputType}
          value={filter.values[1] ?? ""}
          placeholder="To"
          onChange={(event) => onChange({ ...filter, values: [filter.values[0] ?? "", event.target.value] })}
        />
      </div>
    )
  }

  return (
    <Input
      type={inputType}
      value={filter.values[0] ?? ""}
      placeholder={field.placeholder ?? "Enter value"}
      onChange={(event) => onChange({ ...filter, values: [event.target.value] })}
    />
  )
}

export { Filters, createFilter }
