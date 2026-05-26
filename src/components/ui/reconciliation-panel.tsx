"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { StatCard } from "@/components/ui/stat-card"
import { Textarea } from "@/components/ui/textarea"

interface PhaseReconciliation {
  phase: string
  topDownEnvelope: number
  bottomsUpEstimate: number
  variance: number
  variancePercent: number
}

interface ReconciliationPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  phases: PhaseReconciliation[]
  decisionOptions: string[]
  selectedDecision?: string
  rationale?: string
  onDecisionChange?: (decision: string) => void
  onRationaleChange?: (rationale: string) => void
  onSubmit?: () => void
}

function varianceClass(v: number) {
  if (v === 0) return "text-muted-foreground"
  return v > 0 ? "text-[var(--error)]" : "text-[var(--success)]"
}

export function ReconciliationPanel({
  phases,
  decisionOptions,
  selectedDecision,
  rationale = "",
  onDecisionChange,
  onRationaleChange,
  onSubmit,
  className,
  ...props
}: ReconciliationPanelProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Phase comparison */}
      <div className="flex flex-col gap-4">
        {phases.map((phase) => (
          <div key={phase.phase} className="rounded-md border border-border p-4">
            <h3 className="text-sm font-semibold mb-3">{phase.phase}</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <StatCard
                label="Top-Down Envelope"
                value={phase.topDownEnvelope}
                subLabel="pts"
              />
              <StatCard
                label="Bottom-Up Estimate"
                value={phase.bottomsUpEstimate}
                subLabel="pts"
              />
            </div>
            <div className="flex items-center gap-3">
              <Progress
                value={Math.min(100, (phase.bottomsUpEstimate / phase.topDownEnvelope) * 100)}
                className="flex-1 h-2"
              />
              <span className={cn("text-sm font-medium tabular-nums shrink-0", varianceClass(phase.variance))}>
                {phase.variance > 0 ? "+" : ""}{phase.variance} pts
                <span className="text-xs font-normal ml-1">
                  ({phase.variancePercent > 0 ? "+" : ""}{phase.variancePercent}%)
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Decision */}
      {decisionOptions.length > 0 && (
        <div>
          <Label className="text-sm font-medium mb-3 block">Resolution Decision</Label>
          <RadioGroup
            value={selectedDecision}
            onValueChange={onDecisionChange}
            className="flex flex-col gap-2"
          >
            {decisionOptions.map((option) => (
              <div key={option} className="flex items-center gap-2">
                <RadioGroupItem value={option} id={`decision-${option}`} />
                <Label htmlFor={`decision-${option}`} className="text-sm cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {/* Rationale */}
      <div>
        <Label className="text-sm font-medium mb-1.5 block">Rationale</Label>
        <Textarea
          value={rationale}
          onChange={(e) => onRationaleChange?.(e.target.value)}
          placeholder="Explain the reconciliation decision…"
          className="text-sm resize-none"
          rows={3}
        />
      </div>

      {onSubmit && (
        <Button onClick={onSubmit} disabled={!selectedDecision}>
          Submit Decision
        </Button>
      )}
    </div>
  )
}
