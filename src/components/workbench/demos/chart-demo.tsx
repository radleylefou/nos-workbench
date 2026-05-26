"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const barData = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
  { month: "Apr", value: 273 },
  { month: "May", value: 209 },
  { month: "Jun", value: 314 },
]

const barConfig = {
  value: { label: "Revenue", color: "var(--primary)" },
} satisfies ChartConfig

export function ChartBarDemo() {
  return (
    <ChartContainer config={barConfig} className="h-48 w-full">
      <BarChart data={barData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

const lineData = [
  { month: "Jan", a: 186, b: 80 },
  { month: "Feb", a: 305, b: 200 },
  { month: "Mar", a: 237, b: 120 },
  { month: "Apr", a: 273, b: 190 },
  { month: "May", a: 209, b: 130 },
  { month: "Jun", a: 314, b: 240 },
]

const lineConfig = {
  a: { label: "Series A", color: "var(--primary)" },
  b: { label: "Series B", color: "var(--muted-foreground)" },
} satisfies ChartConfig

export function ChartLineDemo() {
  return (
    <ChartContainer config={lineConfig} className="h-48 w-full">
      <LineChart data={lineData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey="a" stroke="var(--color-a)" strokeWidth={2} dot={false} />
        <Line dataKey="b" stroke="var(--color-b)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  )
}
