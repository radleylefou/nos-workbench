import { AlertCircle, CheckCircle2, FileText } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ReadinessItem } from "@/components/ui/readiness-item"
import { Separator } from "@/components/ui/separator"

type OutputFormat = "html" | "pdf" | "markdown" | "package"
type OutputStatus = "up-to-date" | "stale" | "never-generated"

interface OutputCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  format: OutputFormat
  audience: string
  version?: string
  lastGenerated?: string
  status: OutputStatus
  isBlocked?: boolean
  blockReason?: string
  readinessItems: Array<{ label: string; status: "pass" | "warning" | "fail" }>
  onRegenerate?: () => void
  onPreview?: () => void
  onExport?: () => void
}

const statusConfig: Record<OutputStatus, { label: string; variant: "default" | "secondary" | "outline" }> = {
  "up-to-date": { label: "Up to date", variant: "default" },
  "stale": { label: "Stale", variant: "outline" },
  "never-generated": { label: "Never generated", variant: "secondary" },
}

const formatLabels: Record<OutputFormat, string> = {
  html: "HTML",
  pdf: "PDF",
  markdown: "Markdown",
  package: "Package",
}

export function OutputCard({
  title,
  format,
  audience,
  version,
  lastGenerated,
  status,
  isBlocked = false,
  blockReason,
  readinessItems,
  onRegenerate,
  onPreview,
  onExport,
  className,
  ...props
}: OutputCardProps) {
  const { label, variant } = statusConfig[status]

  return (
    <Card
      className={cn(
        "w-full gap-0 py-0",
        isBlocked && "border-[var(--error)]/50",
        status === "never-generated" && "opacity-75",
        className
      )}
      {...props}
    >
      <CardHeader className="p-5 pb-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <FileText className="size-4 shrink-0 text-muted-foreground" />
            <h3 className="truncate text-sm font-semibold">{title}</h3>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
            <Badge variant="secondary" className="text-xs">{formatLabels[format]}</Badge>
            <Badge variant="secondary" className="text-xs">{audience}</Badge>
            <Badge variant={variant} className="text-xs">{label}</Badge>
          </div>
        </div>

        {(version || lastGenerated) && (
          <p className="mt-2 text-xs text-muted-foreground">
            {version && `v${version}`}
            {version && lastGenerated && " · "}
            {lastGenerated && `Generated ${lastGenerated}`}
          </p>
        )}

        {isBlocked && blockReason && (
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--error)]">
            <AlertCircle className="size-3.5 shrink-0" />
            {blockReason}
          </div>
        )}
      </CardHeader>

      {readinessItems.length > 0 && (
        <CardContent className="p-5">
          <Separator className="mb-4" />
          <div className="flex flex-col gap-2">
            {readinessItems.map((item, i) => (
              <ReadinessItem key={i} label={item.label} status={item.status} />
            ))}
          </div>
        </CardContent>
      )}

      {(onRegenerate || onPreview || onExport) && (
        <CardFooter className="flex-wrap gap-2 p-5 pt-0">
          {onRegenerate && (
            <Button
              size="sm"
              disabled={isBlocked}
              onClick={onRegenerate}
              className="gap-1"
            >
              <CheckCircle2 className="size-3.5" />
              Regenerate
            </Button>
          )}
          {onPreview && (
            <Button size="sm" variant="outline" disabled={status === "never-generated"} onClick={onPreview}>
              Preview
            </Button>
          )}
          {onExport && (
            <Button size="sm" variant="outline" disabled={status === "never-generated"} onClick={onExport}>
              Export
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
