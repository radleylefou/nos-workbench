"use client"

import { useState } from "react"
import { ArrowLeft, X } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

// T1-03: Breadcrumb workspace nav
export function WorkspaceNavBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="flex items-center gap-1">
            <ArrowLeft className="size-3.5" />
            Engagements
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Acme Health Systems</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Clinical Intake Automation</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Badge variant="secondary" className="ml-1 text-[10px]">In Progress</Badge>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

// T1-04: Dismissible alert
export function DismissibleAlert() {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return (
      <Button size="sm" variant="outline" onClick={() => setVisible(true)}>
        Show Alert
      </Button>
    )
  }

  return (
    <Alert className="w-full relative pr-10">
      <div className="flex items-start gap-2">
        <Badge className="text-[10px] shrink-0">Calibration</Badge>
        <div>
          <AlertTitle className="text-sm">Estimation calibration available</AlertTitle>
          <AlertDescription className="text-xs">
            New benchmarks have been published.{" "}
            <a href="#" className="underline underline-offset-2 font-medium">Learn more</a>
          </AlertDescription>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 size-6 p-0"
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
      >
        <X className="size-3.5" />
      </Button>
    </Alert>
  )
}

// T1-05: Labelled mode toggle
export function LabelledModeToggle() {
  const [active, setActive] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <span className={cn("text-sm", !active ? "text-foreground font-medium" : "text-muted-foreground")}>
        Standard
      </span>
      <Toggle
        pressed={active}
        onPressedChange={setActive}
        aria-label="Toggle what-if mode"
        size="sm"
      />
      <span className={cn("text-sm", active ? "text-primary font-medium" : "text-muted-foreground")}>
        What-if
      </span>
    </div>
  )
}
