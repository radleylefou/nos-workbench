"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const TabMenuVertical = TabsPrimitive.Root

const TabMenuVerticalList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
))
TabMenuVerticalList.displayName = "TabMenuVerticalList"

interface TabMenuVerticalTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  icon?: React.ReactNode
}

const TabMenuVerticalTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabMenuVerticalTriggerProps
>(({ className, icon, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground",
      "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
      "hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:font-medium",
      className,
    )}
    {...props}
  >
    {icon && <span className="shrink-0 [&>svg]:size-4">{icon}</span>}
    <span className="flex-1 text-left">{children}</span>
    <ChevronRight className="size-4 shrink-0 opacity-0 transition-opacity duration-[var(--duration-fast)] group-data-[state=active]:opacity-100" />
  </TabsPrimitive.Trigger>
))
TabMenuVerticalTrigger.displayName = "TabMenuVerticalTrigger"

const TabMenuVerticalContent = TabsPrimitive.Content

export {
  TabMenuVertical,
  TabMenuVerticalList,
  TabMenuVerticalTrigger,
  TabMenuVerticalContent,
}
