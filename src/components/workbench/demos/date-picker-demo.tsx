"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function fmt(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-52 justify-start gap-2 font-normal">
          <CalendarIcon className="size-4 text-muted-foreground" />
          {date ? fmt(date) : <span className="text-muted-foreground">Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}

export function DateRangeDemo() {
  const [range, setRange] = useState<{ from?: Date; to?: Date }>({})
  const label = range.from && range.to
    ? `${fmt(range.from)} – ${fmt(range.to)}`
    : range.from
    ? `${fmt(range.from)} – …`
    : "Pick a range"

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-64 justify-start gap-2 font-normal">
          <CalendarIcon className="size-4 text-muted-foreground" />
          <span className={range.from ? "" : "text-muted-foreground"}>{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{ from: range.from, to: range.to }}
          onSelect={(r) => setRange(r ?? {})}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
