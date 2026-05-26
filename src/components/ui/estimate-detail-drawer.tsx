"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

interface AcceptanceCriteria {
  id: string
  text: string
}

interface EstimateDetailDrawerProps {
  open: boolean
  onClose: () => void
  storyId: string
  storyTitle: string
  acceptanceCriteria: AcceptanceCriteria[]
  baseValue: number
  multiplier: number
  acBonus: number
  totalEstimate: number
  aiSuggestedComplexity?: string
  expertOverride?: string
  rationale?: string
  relatedAssumptions?: string[]
  relatedQuestions?: string[]
  onSaveOverride?: (value: string, rationale: string) => void
}

export function EstimateDetailDrawer({
  open,
  onClose,
  storyId,
  storyTitle,
  acceptanceCriteria,
  baseValue,
  multiplier,
  acBonus,
  totalEstimate,
  aiSuggestedComplexity,
  expertOverride: initialOverride = "",
  rationale: initialRationale = "",
  relatedAssumptions = [],
  relatedQuestions = [],
  onSaveOverride,
}: EstimateDetailDrawerProps) {
  const [overrideValue, setOverrideValue] = useState(initialOverride)
  const [rationale, setRationale] = useState(initialRationale)
  const [acOpen, setAcOpen] = useState(true)

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="w-full max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-base">{storyTitle}</SheetTitle>
          <SheetDescription className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">{storyId}</Badge>
            <span>Estimate breakdown</span>
          </SheetDescription>
        </SheetHeader>

        {/* Calculation breakdown */}
        <div className="rounded-md border border-border bg-muted/30 p-3 mb-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Calculation
          </h3>
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <span className="text-muted-foreground">Base</span>
            <span className="font-medium">{baseValue}</span>
            <span className="text-muted-foreground">×</span>
            <span className="font-medium">{multiplier}</span>
            <span className="text-muted-foreground">+</span>
            <span className="text-muted-foreground">AC bonus</span>
            <span className="font-medium">{acBonus}</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-lg font-semibold text-foreground">{totalEstimate}</span>
          </div>
          {aiSuggestedComplexity && (
            <p className="mt-2 text-xs text-muted-foreground">
              AI suggested: <span className="font-medium">{aiSuggestedComplexity}</span>
            </p>
          )}
        </div>

        {/* Expert override */}
        <div className="mb-4">
          <Label className="text-xs mb-1.5 block">Expert Override</Label>
          <Input
            value={overrideValue}
            onChange={(e) => setOverrideValue(e.target.value)}
            placeholder="Enter override value…"
            className="h-8 text-sm"
          />
        </div>

        <div className="mb-4">
          <Label className="text-xs mb-1.5 block">Rationale</Label>
          <Textarea
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            placeholder="Explain the override…"
            className="text-sm resize-none"
            rows={3}
          />
        </div>

        <Separator className="mb-4" />

        {/* AC list */}
        <Collapsible open={acOpen} onOpenChange={setAcOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium mb-2">
            Acceptance Criteria ({acceptanceCriteria.length})
            <ChevronDown className={cn("size-4 transition-transform", acOpen && "rotate-180")} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="flex flex-col gap-1.5 mb-4">
              {acceptanceCriteria.map((ac) => (
                <li key={ac.id} className="flex gap-2 text-xs text-muted-foreground">
                  <span className="shrink-0 font-mono text-muted-foreground/60">{ac.id}</span>
                  {ac.text}
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        {relatedAssumptions.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium mb-1.5">Related Assumptions</p>
            <div className="flex flex-wrap gap-1">
              {relatedAssumptions.map((a, i) => (
                <Badge key={i} variant="secondary" className="text-[10px]">{a}</Badge>
              ))}
            </div>
          </div>
        )}

        {relatedQuestions.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium mb-1.5">Related Questions</p>
            <div className="flex flex-wrap gap-1">
              {relatedQuestions.map((q, i) => (
                <Badge key={i} variant="outline" className="text-[10px]">{q}</Badge>
              ))}
            </div>
          </div>
        )}

        {onSaveOverride && (
          <Button
            className="w-full"
            size="sm"
            onClick={() => onSaveOverride(overrideValue, rationale)}
          >
            Save Override
          </Button>
        )}
      </SheetContent>
    </Sheet>
  )
}
