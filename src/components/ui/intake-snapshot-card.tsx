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
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Intake Snapshot</CardTitle>
          {onViewFull && (
            <Button size="sm" variant="ghost" className="h-6 text-xs px-2" onClick={onViewFull}>
              View Full
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {kvRows.length > 0 && (
          <dl className="flex flex-col gap-1.5 mb-3">
            {kvRows.map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="text-xs text-muted-foreground w-24 shrink-0">{label}</dt>
                <dd className="text-xs text-foreground font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {systems.length > 0 && (
          <>
            <Separator className="mb-2" />
            <div className="flex flex-wrap gap-1 mb-3">
              {systems.map((sys) => (
                <Badge key={sys} variant="secondary" className="text-[10px] px-1.5">
                  {sys}
                </Badge>
              ))}
            </div>
          </>
        )}

        {discoveryExcerpt && (
          <>
            <Separator className="mb-2" />
            <blockquote className="border-l-2 border-border pl-3 text-sm italic text-muted-foreground">
              {discoveryExcerpt}
            </blockquote>
          </>
        )}
      </CardContent>
    </Card>
  )
}
