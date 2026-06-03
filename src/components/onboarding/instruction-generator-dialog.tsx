"use client"

import { useState, type ComponentProps } from "react"
import { ArrowRight, MonitorCog } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { OnboardingGenerator } from "@/components/onboarding/onboarding-generator"
import { cn } from "@/lib/utils"

type InstructionGeneratorDialogProps = {
  triggerClassName?: string
  triggerLabel?: string
  triggerVariant?: ComponentProps<typeof Button>["variant"]
}

export function InstructionGeneratorDialog({
  triggerClassName,
  triggerLabel = "Open instruction generator",
  triggerVariant = "default",
}: InstructionGeneratorDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} className={cn("gap-2", triggerClassName)}>
          {triggerLabel}
          <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-3rem)] gap-0 overflow-hidden p-0 sm:max-w-5xl">
        <DialogHeader className="border-b border-border p-6 pr-16">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <MonitorCog className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-xl tracking-tight">
                Instruction generator
              </DialogTitle>
              <DialogDescription className="mt-1">
                Generate a tailored NOS instruction file without leaving the workbench.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="max-h-[calc(100vh-11rem)] overflow-y-auto">
          <OnboardingGenerator onClose={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
