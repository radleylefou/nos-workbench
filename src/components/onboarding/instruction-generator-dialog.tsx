"use client"

import Image from "next/image"
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
import type { ProjectType } from "@content/instructions"

type InstructionGeneratorDialogProps = {
  initialProjectType?: ProjectType
  triggerCard?: {
    description: string
    image: string
    imageAlt: string
    title: string
  }
  triggerClassName?: string
  triggerLabel?: string
  triggerVariant?: ComponentProps<typeof Button>["variant"]
}

export function InstructionGeneratorDialog({
  initialProjectType,
  triggerCard,
  triggerClassName,
  triggerLabel = "Open instruction generator",
  triggerVariant = "default",
}: InstructionGeneratorDialogProps) {
  const [open, setOpen] = useState(false)
  const [instanceKey, setInstanceKey] = useState(0)

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (nextOpen) {
      setInstanceKey((key) => key + 1)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {triggerCard ? (
          <button
            type="button"
            className="group/start relative flex min-h-36 w-full items-center gap-6 overflow-hidden rounded-[1.25rem] border border-zinc-200 bg-white p-6 pr-12 text-left text-zinc-950 shadow-xs outline-none transition-[border-color,box-shadow] duration-700 ease-out hover:border-zinc-950 hover:shadow-xl focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:min-h-[9.5rem] sm:p-7 sm:pr-14"
          >
            <ArrowRight className="absolute right-6 top-6 size-4 text-zinc-400 transition-transform duration-700 ease-out group-hover/start:translate-x-1 group-hover/start:text-zinc-950 sm:right-7 sm:top-7" />
            <span className="flex size-[6.75rem] shrink-0 items-center justify-center overflow-hidden rounded-xl">
              <Image
                src={triggerCard.image}
                alt={triggerCard.imageAlt}
                width={108}
                height={108}
                className="size-[6.75rem] object-contain"
              />
            </span>
            <span className="flex min-w-0 flex-col gap-2">
              <span className="text-xl font-semibold leading-tight tracking-[-0.025em] sm:text-2xl">
                {triggerCard.title}
              </span>
              <span className="text-sm leading-6 text-zinc-600 sm:text-base">
                {triggerCard.description}
              </span>
            </span>
          </button>
        ) : (
          <Button variant={triggerVariant} className={cn("gap-2", triggerClassName)}>
            {triggerLabel}
            <ArrowRight />
          </Button>
        )}
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
          <OnboardingGenerator
            key={`${initialProjectType ?? "choose"}-${instanceKey}`}
            initialProjectType={initialProjectType}
            onClose={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
