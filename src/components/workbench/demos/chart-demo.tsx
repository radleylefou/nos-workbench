"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

// ─── Shared data ──────────────────────────────────────────────────────────────

const monthData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const varianceData = [
  { month: "Jan", variance: -12 },
  { month: "Feb", variance: 18 },
  { month: "Mar", variance: 24 },
  { month: "Apr", variance: -8 },
  { month: "May", variance: 16 },
  { month: "Jun", variance: -5 },
]

const pieData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const statusData = [
  { status: "healthy", value: 42, fill: "var(--color-healthy)" },
  { status: "watch", value: 28, fill: "var(--color-watch)" },
  { status: "risk", value: 18, fill: "var(--color-risk)" },
  { status: "blocked", value: 12, fill: "var(--color-blocked)" },
]

const statusOuterData = [
  { status: "healthy", value: 36, fill: "var(--color-healthy)" },
  { status: "watch", value: 34, fill: "var(--color-watch)" },
  { status: "risk", value: 20, fill: "var(--color-risk)" },
  { status: "blocked", value: 10, fill: "var(--color-blocked)" },
]

const pieConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig

const statusConfig = {
  value: { label: "Share" },
  healthy: { label: "Healthy", color: "var(--chart-1)" },
  watch: { label: "Watch", color: "var(--chart-2)" },
  risk: { label: "Risk", color: "var(--chart-4)" },
  blocked: { label: "Blocked", color: "var(--chart-5)" },
} satisfies ChartConfig

// ─── Existing demos ───────────────────────────────────────────────────────────

const barConfig = {
  value: { label: "Revenue", color: "var(--primary)" },
} satisfies ChartConfig

export function ChartBarDemo() {
  return (
    <ChartContainer config={barConfig} className="h-48 w-full">
      <BarChart data={monthData.map((d) => ({ month: d.month, value: d.desktop }))}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

const lineConfig = {
  a: { label: "Series A", color: "var(--primary)" },
  b: { label: "Series B", color: "var(--chart-3)" },
} satisfies ChartConfig

export function ChartLineDemo() {
  return (
    <ChartContainer config={lineConfig} className="h-48 w-full">
      <LineChart data={monthData.map((d) => ({ month: d.month, a: d.desktop, b: d.mobile }))}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey="a" stroke="var(--color-a)" strokeWidth={2} dot={false} />
        <Line dataKey="b" stroke="var(--color-b)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  )
}

// ─── Area charts ──────────────────────────────────────────────────────────────

const areaConfig = {
  desktop: { label: "Desktop", color: "var(--primary)" },
} satisfies ChartConfig

const areaStackedConfig = {
  desktop: { label: "Desktop", color: "var(--primary)" },
  mobile: { label: "Mobile", color: "var(--chart-3)" },
} satisfies ChartConfig

export function ChartAreaDefaultDemo() {
  return (
    <ChartContainer config={areaConfig} className="h-48 w-full">
      <AreaChart data={monthData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="desktop"
          type="natural"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  )
}

export function ChartAreaLinearDemo() {
  return (
    <ChartContainer config={areaConfig} className="h-48 w-full">
      <AreaChart data={monthData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" hideLabel />} />
        <Area
          dataKey="desktop"
          type="linear"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  )
}

export function ChartAreaStackedDemo() {
  return (
    <ChartContainer config={areaStackedConfig} className="h-48 w-full">
      <AreaChart data={monthData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <Area
          dataKey="mobile"
          type="natural"
          fill="var(--color-mobile)"
          fillOpacity={0.4}
          stroke="var(--color-mobile)"
          stackId="a"
        />
        <Area
          dataKey="desktop"
          type="natural"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}

export function ChartAreaGradientDemo() {
  const gradientId = React.useId().replace(/:/g, "")

  return (
    <ChartContainer config={areaConfig} className="h-48 w-full">
      <AreaChart data={monthData} margin={{ left: 12, right: 12 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="desktop"
          type="monotone"
          fill={`url(#${gradientId})`}
          fillOpacity={1}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  )
}

export function ChartAreaStepDemo() {
  return (
    <ChartContainer config={areaStackedConfig} className="h-48 w-full">
      <AreaChart data={monthData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <Area
          dataKey="desktop"
          type="step"
          fill="var(--color-desktop)"
          fillOpacity={0.22}
          stroke="var(--color-desktop)"
        />
        <Area
          dataKey="mobile"
          type="step"
          fill="var(--color-mobile)"
          fillOpacity={0.14}
          stroke="var(--color-mobile)"
        />
      </AreaChart>
    </ChartContainer>
  )
}

// ─── Bar charts ───────────────────────────────────────────────────────────────

const barSingleConfig = {
  desktop: { label: "Desktop", color: "var(--primary)" },
} satisfies ChartConfig

const barDualConfig = {
  desktop: { label: "Desktop", color: "var(--primary)" },
  mobile: { label: "Mobile", color: "var(--chart-3)" },
} satisfies ChartConfig

export function ChartBarHorizontalDemo() {
  return (
    <ChartContainer config={barSingleConfig} className="h-48 w-full">
      <BarChart data={monthData} layout="vertical" margin={{ left: -20 }}>
        <XAxis type="number" dataKey="desktop" hide />
        <YAxis
          dataKey="month"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
      </BarChart>
    </ChartContainer>
  )
}

export function ChartBarMultipleDemo() {
  return (
    <ChartContainer config={barDualConfig} className="h-48 w-full">
      <BarChart data={monthData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export function ChartBarStackedDemo() {
  return (
    <ChartContainer config={barDualConfig} className="h-48 w-full">
      <BarChart data={monthData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 4, 4]} />
        <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}

export function ChartBarLabelDemo() {
  return (
    <ChartContainer config={barSingleConfig} className="h-48 w-full">
      <BarChart data={monthData} margin={{ top: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}>
          <LabelList
            dataKey="desktop"
            position="top"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

const barVarianceConfig = {
  variance: { label: "Variance", color: "var(--chart-1)" },
} satisfies ChartConfig

export function ChartBarNegativeDemo() {
  return (
    <ChartContainer config={barVarianceConfig} className="h-48 w-full">
      <BarChart data={varianceData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis hide />
        <ReferenceLine y={0} stroke="var(--border)" />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="variance" radius={4}>
          {varianceData.map((entry) => (
            <Cell
              key={entry.month}
              fill={entry.variance >= 0 ? "var(--chart-1)" : "var(--chart-5)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

// ─── Line charts ──────────────────────────────────────────────────────────────

const lineSingleConfig = {
  desktop: { label: "Desktop", color: "var(--primary)" },
} satisfies ChartConfig

const lineDualConfig = {
  desktop: { label: "Desktop", color: "var(--primary)" },
  mobile: { label: "Mobile", color: "var(--chart-3)" },
} satisfies ChartConfig

export function ChartLineDotsDemo() {
  return (
    <ChartContainer config={lineSingleConfig} className="h-48 w-full">
      <LineChart data={monthData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line
          dataKey="desktop"
          type="natural"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={{ fill: "var(--color-desktop)" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  )
}

export function ChartLineMultipleDemo() {
  return (
    <ChartContainer config={lineDualConfig} className="h-48 w-full">
      <LineChart data={monthData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  )
}

export function ChartLineStepDemo() {
  return (
    <ChartContainer config={lineSingleConfig} className="h-48 w-full">
      <LineChart data={monthData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" hideLabel />} />
        <Line
          dataKey="desktop"
          type="step"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

export function ChartLineLabelDemo() {
  return (
    <ChartContainer config={lineSingleConfig} className="h-48 w-full">
      <LineChart data={monthData} margin={{ top: 20, left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line
          dataKey="desktop"
          type="natural"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={{ fill: "var(--color-desktop)" }}
          activeDot={{ r: 6 }}
        >
          <LabelList
            dataKey="desktop"
            position="top"
            offset={10}
            className="fill-foreground"
            fontSize={12}
          />
        </Line>
      </LineChart>
    </ChartContainer>
  )
}

export function ChartLineThresholdDemo() {
  return (
    <ChartContainer config={lineDualConfig} className="h-48 w-full">
      <LineChart data={monthData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis hide domain={[0, 340]} />
        <ReferenceLine
          y={220}
          stroke="var(--chart-4)"
          strokeDasharray="4 4"
          label={{ value: "Target", position: "insideTopRight", fill: "var(--muted-foreground)", fontSize: 12 }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  )
}

// ─── Pie charts ───────────────────────────────────────────────────────────────

export function ChartPieSimpleDemo() {
  return (
    <ChartContainer config={pieConfig} className="h-[220px] w-full">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={pieData} dataKey="visitors" nameKey="browser" />
      </PieChart>
    </ChartContainer>
  )
}

export function ChartPieDonutDemo() {
  return (
    <ChartContainer config={pieConfig} className="h-[220px] w-full">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={pieData} dataKey="visitors" nameKey="browser" innerRadius={60} />
      </PieChart>
    </ChartContainer>
  )
}

export function ChartPieDonutTextDemo() {
  const totalVisitors = React.useMemo(
    () => pieData.reduce((acc, curr) => acc + curr.visitors, 0),
    []
  )

  return (
    <ChartContainer config={pieConfig} className="h-[220px] w-full">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={pieData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                      Visitors
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}

export function ChartPieLabelDemo() {
  return (
    <ChartContainer
      config={pieConfig}
      className="h-[220px] w-full pb-0 [&_.recharts-pie-label-text]:fill-foreground"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={pieData} dataKey="visitors" label nameKey="browser" />
      </PieChart>
    </ChartContainer>
  )
}

export function ChartPieLegendDemo() {
  return (
    <ChartContainer config={statusConfig} className="h-[220px] w-full">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="status" />} />
        <Pie
          data={statusData}
          dataKey="value"
          nameKey="status"
          innerRadius={58}
          outerRadius={84}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="status" />}
          className="flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}

export function ChartPieStackedDemo() {
  const total = React.useMemo(
    () => statusData.reduce((acc, curr) => acc + curr.value, 0),
    []
  )

  return (
    <ChartContainer config={statusConfig} className="h-[220px] w-full">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="status" />} />
        <Pie
          data={statusOuterData}
          dataKey="value"
          nameKey="status"
          innerRadius={74}
          outerRadius={92}
          strokeWidth={3}
        />
        <Pie
          data={statusData}
          dataKey="value"
          nameKey="status"
          innerRadius={48}
          outerRadius={68}
          strokeWidth={3}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-semibold">
                      {total}
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 20} className="fill-muted-foreground text-xs">
                      Total
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
