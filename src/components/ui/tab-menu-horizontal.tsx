"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const TabMenuHorizontal = TabsPrimitive.Root

const TabMenuHorizontalList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex h-12 items-stretch border-b border-border overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      className,
    )}
    {...props}
  />
))
TabMenuHorizontalList.displayName = "TabMenuHorizontalList"

interface TabMenuHorizontalTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  icon?: React.ReactNode
  badge?: React.ReactNode
}

const TabMenuHorizontalTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabMenuHorizontalTriggerProps
>(({ className, icon, badge, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative shrink-0 inline-flex h-full items-center gap-2 px-4 text-sm text-muted-foreground",
      "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
      "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      "disabled:pointer-events-none disabled:opacity-50",
      "after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-[var(--duration-fast)]",
      "data-[state=active]:text-foreground data-[state=active]:after:scale-x-100",
      className,
    )}
    {...props}
  >
    {icon && <span className="shrink-0 [&>svg]:size-4">{icon}</span>}
    {children}
    {badge && <span className="shrink-0">{badge}</span>}
  </TabsPrimitive.Trigger>
))
TabMenuHorizontalTrigger.displayName = "TabMenuHorizontalTrigger"

const TabMenuHorizontalContent = TabsPrimitive.Content

export {
  TabMenuHorizontal,
  TabMenuHorizontalList,
  TabMenuHorizontalTrigger,
  TabMenuHorizontalContent,
}
