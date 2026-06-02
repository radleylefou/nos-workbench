import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface IntakeSnapshotCardProps extends React.HTMLAttributes<HTMLDivElement> {
  businessArea?: string
  budget?: string
  timeline?: string
  systems?: string[]
  discoveryExcerpt?: string
  onViewFull?: () => void
}

export function IntakeSnapshotCard({
  businessArea,
  budget,
  timeline,
  systems = [],
  discoveryExcerpt,
  onViewFull,
  className,
  ...props
}: IntakeSnapshotCardProps) {
  const kvRows = [
    { label: "Business Area", value: businessArea },
    { label: "Budget", value: budget },
    { label: "Timeline", value: timeline },
  ].filter((r) => r.value)

  return (
    <Card className={cn("w-full gap-0 py-0", className)} {...props}>
      <CardHeader className="p-5 pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Intake Snapshot</CardTitle>
          {onViewFull && (
            <Button size="sm" variant="ghost" className="h-6 px-2 text-xs" onClick={onViewFull}>
              View Full
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {kvRows.length > 0 && (
          <dl className="mb-3 flex flex-col gap-1.5">
            {kvRows.map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="w-24 shrink-0 text-xs text-muted-foreground">{label}</dt>
                <dd className="text-xs font-medium text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {systems.length > 0 && (
          <>
            <Separator className="mb-3" />
            <div className="mb-3 flex flex-wrap gap-1">
              {systems.map((sys) => (
                <Badge key={sys} variant="secondary" className="text-xs">
                  {sys}
                </Badge>
              ))}
            </div>
          </>
        )}

        {discoveryExcerpt && (
          <>
            <Separator className="mb-3" />
            <blockquote className="border-l-2 border-border pl-3 text-sm italic text-muted-foreground">
              {discoveryExcerpt}
            </blockquote>
          </>
        )}
      </CardContent>
    </Card>
  )
}
