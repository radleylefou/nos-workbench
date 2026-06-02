"use client"

import * as React from "react"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { cn } from "@/lib/utils"

export type DateSelectorPeriodType = "day" | "month" | "quarter" | "half-year" | "year"
export type DateSelectorOperator = "is" | "before" | "after" | "between"

export type DateSelectorPeriodValue = {
  year: number
  value: number
}

export type DateSelectorValue = {
  period: DateSelectorPeriodType
  operator: DateSelectorOperator
  startDate?: string
  endDate?: string
  year?: number
  month?: number
  quarter?: number
  halfYear?: number
  rangeStart?: DateSelectorPeriodValue
  rangeEnd?: DateSelectorPeriodValue
}

type DateSelectorProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
  value?: DateSelectorValue
  onChange?: (value: DateSelectorValue) => void
  label?: string
  allowRange?: boolean
  periodTypes?: DateSelectorPeriodType[]
  placeholder?: string
}

const periodLabels: Record<DateSelectorPeriodType, string> = {
  day: "Day",
  month: "Month",
  quarter: "Quarter",
  "half-year": "Half-year",
  year: "Year",
}

const operatorLabels: Record<DateSelectorOperator, string> = {
  is: "is",
  before: "before",
  after: "after",
  between: "between",
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function defaultValue(): DateSelectorValue {
  const today = new Date()
  return {
    period: "day",
    operator: "is",
    startDate: today.toISOString().slice(0, 10),
    year: today.getFullYear(),
    month: today.getMonth(),
    quarter: Math.floor(today.getMonth() / 3),
    halfYear: today.getMonth() < 6 ? 0 : 1,
  }
}

function formatDateSelectorValue(value?: DateSelectorValue, placeholder = "Select period") {
  if (!value) return placeholder
  if (value.period === "day") {
    if (value.operator === "between") {
      return `${value.startDate ?? "Start"} to ${value.endDate ?? "End"}`
    }
    return `${operatorLabels[value.operator]} ${value.startDate ?? placeholder}`
  }
  const single = formatPeriodValue(value.period, {
    year: value.year ?? new Date().getFullYear(),
    value:
      value.period === "month"
        ? value.month ?? 0
        : value.period === "quarter"
          ? value.quarter ?? 0
          : value.period === "half-year"
            ? value.halfYear ?? 0
            : 0,
  })
  if (value.operator === "between") {
    return `${formatPeriodValue(value.period, value.rangeStart)} to ${formatPeriodValue(value.period, value.rangeEnd)}`
  }
  return `${operatorLabels[value.operator]} ${single}`
}

function formatPeriodValue(period: DateSelectorPeriodType, value?: DateSelectorPeriodValue) {
  if (!value) return "Any"
  if (period === "month") return `${monthNames[value.value]} ${value.year}`
  if (period === "quarter") return `Q${value.value + 1} ${value.year}`
  if (period === "half-year") return `H${value.value + 1} ${value.year}`
  if (period === "year") return `${value.year}`
  return `${value.year}`
}

function DateSelector({
  value,
  onChange,
  label,
  allowRange = true,
  periodTypes = ["day", "month", "quarter", "half-year", "year"],
  placeholder,
  className,
  ...props
}: DateSelectorProps) {
  const [internalValue, setInternalValue] = React.useState<DateSelectorValue>(() => value ?? defaultValue())
  const activeValue = value ?? internalValue
  const [open, setOpen] = React.useState(false)

  const update = (next: DateSelectorValue) => {
    if (!value) setInternalValue(next)
    onChange?.(next)
  }

  const activeYear =
    activeValue.year ??
    activeValue.rangeStart?.year ??
    new Date().getFullYear()

  return (
    <div data-slot="date-selector" className={cn("flex flex-col gap-1.5", className)} {...props}>
      {label ? <div className="text-xs font-medium text-muted-foreground">{label}</div> : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" className="justify-start gap-2">
            <CalendarIcon className="size-4 text-muted-foreground" />
            <span className="truncate">{formatDateSelectorValue(activeValue, placeholder)}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[24rem] gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Select
              value={activeValue.operator}
              onValueChange={(operator) =>
                update({
                  ...activeValue,
                  operator: operator as DateSelectorOperator,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["is", "before", "after", ...(allowRange ? ["between"] : [])] as DateSelectorOperator[]).map((operator) => (
                  <SelectItem key={operator} value={operator}>
                    {operatorLabels[operator]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={activeValue.period}
              onValueChange={(period) =>
                update({
                  ...defaultValue(),
                  ...activeValue,
                  period: period as DateSelectorPeriodType,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periodTypes.map((period) => (
                  <SelectItem key={period} value={period}>
                    {periodLabels[period]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {activeValue.period === "day" ? (
            <DayEditor value={activeValue} onChange={update} />
          ) : (
            <PeriodEditor
              value={activeValue}
              year={activeYear}
              onYearChange={(year) => update({ ...activeValue, year })}
              onChange={update}
            />
          )}

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              {formatDateSelectorValue(activeValue, placeholder)}
            </p>
            <Button type="button" size="sm" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

function DayEditor({
  value,
  onChange,
}: {
  value: DateSelectorValue
  onChange: (value: DateSelectorValue) => void
}) {
  if (value.operator === "between") {
    return (
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="date"
          value={value.startDate ?? ""}
          onChange={(event) => onChange({ ...value, startDate: event.target.value })}
        />
        <Input
          type="date"
          value={value.endDate ?? ""}
          onChange={(event) => onChange({ ...value, endDate: event.target.value })}
        />
      </div>
    )
  }
  return (
    <Input
      type="date"
      value={value.startDate ?? ""}
      onChange={(event) => onChange({ ...value, startDate: event.target.value })}
    />
  )
}

function PeriodEditor({
  value,
  year,
  onYearChange,
  onChange,
}: {
  value: DateSelectorValue
  year: number
  onYearChange: (year: number) => void
  onChange: (value: DateSelectorValue) => void
}) {
  const periodOptions =
    value.period === "month"
      ? monthNames.map((label, index) => ({ label, value: index }))
      : value.period === "quarter"
        ? ["Q1", "Q2", "Q3", "Q4"].map((label, index) => ({ label, value: index }))
        : value.period === "half-year"
          ? ["H1", "H2"].map((label, index) => ({ label, value: index }))
          : [{ label: `${year}`, value: 0 }]

  const setSingleValue = (selected: number) => {
    onChange({
      ...value,
      year,
      month: value.period === "month" ? selected : value.month,
      quarter: value.period === "quarter" ? selected : value.quarter,
      halfYear: value.period === "half-year" ? selected : value.halfYear,
    })
  }

  const setRangeValue = (key: "rangeStart" | "rangeEnd", selected: number) => {
    onChange({
      ...value,
      [key]: { year, value: selected },
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" size="icon-sm" onClick={() => onYearChange(year - 1)}>
          <ChevronLeft className="size-4" />
        </Button>
        <div className="text-sm font-medium">{year}</div>
        <Button type="button" variant="outline" size="icon-sm" onClick={() => onYearChange(year + 1)}>
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {value.operator === "between" ? (
        <div className="grid grid-cols-2 gap-3">
          <PeriodButtonGrid
            label="Start"
            options={periodOptions}
            selected={value.rangeStart?.year === year ? value.rangeStart.value : undefined}
            onSelect={(selected) => setRangeValue("rangeStart", selected)}
          />
          <PeriodButtonGrid
            label="End"
            options={periodOptions}
            selected={value.rangeEnd?.year === year ? value.rangeEnd.value : undefined}
            onSelect={(selected) => setRangeValue("rangeEnd", selected)}
          />
        </div>
      ) : (
        <PeriodButtonGrid
          options={periodOptions}
          selected={
            value.period === "month"
              ? value.month
              : value.period === "quarter"
                ? value.quarter
                : value.period === "half-year"
                  ? value.halfYear
                  : 0
          }
          onSelect={setSingleValue}
        />
      )}
    </div>
  )
}

function PeriodButtonGrid({
  label,
  options,
  selected,
  onSelect,
}: {
  label?: string
  options: Array<{ label: string; value: number }>
  selected?: number
  onSelect: (value: number) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      {label ? <div className="text-xs font-medium text-muted-foreground">{label}</div> : null}
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <Button
            key={option.label}
            type="button"
            variant={selected === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export { DateSelector, formatDateSelectorValue }
