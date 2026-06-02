import * as React from "react"

import { cn } from "@/lib/utils"

type FrameSize = "default" | "dense"

function Frame({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "separated" | "stacked" | "borderless"
  size?: FrameSize
}) {
  return (
    <div
      data-slot="frame"
      data-variant={variant}
      data-size={size}
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-border bg-background text-sm shadow-xs",
        "data-[size=dense]:gap-2",
        "data-[variant=borderless]:border-transparent data-[variant=borderless]:shadow-none",
        "data-[variant=separated]:gap-4 data-[variant=separated]:border-0 data-[variant=separated]:bg-transparent data-[variant=separated]:shadow-none",
        "data-[variant=stacked]:gap-0 data-[variant=stacked]:overflow-hidden",
        className,
      )}
      {...props}
    />
  )
}

function FramePanel({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="frame-panel"
      className={cn(
        "flex min-w-0 flex-col overflow-hidden bg-background",
        "in-data-[variant=default]:first:rounded-t-lg in-data-[variant=default]:last:rounded-b-lg",
        "in-data-[variant=separated]:rounded-lg in-data-[variant=separated]:border in-data-[variant=separated]:border-border in-data-[variant=separated]:shadow-xs",
        "in-data-[variant=stacked]:border-b in-data-[variant=stacked]:border-border in-data-[variant=stacked]:last:border-b-0",
        "in-data-[variant=borderless]:rounded-lg",
        className,
      )}
      {...props}
    />
  )
}

function FrameHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="frame-header"
      className={cn(
        "flex min-w-0 items-start justify-between gap-4 border-b border-border bg-muted/30 px-5 py-4",
        "in-data-[size=dense]:px-4 in-data-[size=dense]:py-3",
        "in-data-[variant=borderless]:rounded-t-lg in-data-[variant=borderless]:border",
        className,
      )}
      {...props}
    />
  )
}

function FrameTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="frame-title"
      className={cn("text-sm font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function FrameDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="frame-description"
      className={cn("mt-1 text-sm leading-6 text-muted-foreground", className)}
      {...props}
    />
  )
}

function FrameContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="frame-content"
      className={cn("min-w-0 p-5 in-data-[size=dense]:p-4", className)}
      {...props}
    />
  )
}

function FrameFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="frame-footer"
      className={cn(
        "flex items-center justify-between gap-3 border-t border-border bg-muted/20 px-5 py-3 text-xs text-muted-foreground",
        "in-data-[size=dense]:px-4 in-data-[size=dense]:py-2.5",
        className,
      )}
      {...props}
    />
  )
}

export {
  Frame,
  FrameContent,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
}
