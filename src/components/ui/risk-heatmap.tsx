import { cn } from "@/lib/utils"

type LikelihoodLevel = "low" | "medium" | "high"
type ImpactLevel = "low" | "medium" | "high"

interface RiskEntry {
  likelihood: LikelihoodLevel
  impact: ImpactLevel
  count: number
}

interface RiskHeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  risks: RiskEntry[]
  onCellClick?: (likelihood: LikelihoodLevel, impact: ImpactLevel) => void
}

const levelScore: Record<LikelihoodLevel | ImpactLevel, number> = {
  low: 1,
  medium: 2,
  high: 3,
}

const levels: LikelihoodLevel[] = ["high", "medium", "low"]
const impacts: ImpactLevel[] = ["low", "medium", "high"]

function cellScore(likelihood: LikelihoodLevel, impact: ImpactLevel) {
  return levelScore[likelihood] * levelScore[impact]
}

function cellClass(score: number) {
  if (score >= 6) return "bg-error-100 text-error-700 border-error-200"
  if (score >= 3) return "bg-warning-100 text-warning-700 border-warning-200"
  return "bg-success-50 text-success-700 border-success-200"
}

export function RiskHeatmap({ risks, onCellClick, className, ...props }: RiskHeatmapProps) {
  const getCount = (likelihood: LikelihoodLevel, impact: ImpactLevel) =>
    risks.find((r) => r.likelihood === likelihood && r.impact === impact)?.count ?? 0

  return (
    <div className={cn("inline-block", className)} {...props}>
      <div className="flex items-end gap-1">
        {/* Y-axis label */}
        <div className="flex flex-col items-center gap-1 mr-1">
          <span
            className="text-[10px] text-muted-foreground"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "nowrap" }}
          >
            Likelihood ↑
          </span>
        </div>

        <div>
          {/* Grid */}
          <div className="flex flex-col gap-1">
            {levels.map((likelihood) => (
              <div key={likelihood} className="flex items-center gap-1">
                <span className="w-12 text-right text-[10px] text-muted-foreground capitalize pr-1">
                  {likelihood}
                </span>
                {impacts.map((impact) => {
                  const score = cellScore(likelihood, impact)
                  const count = getCount(likelihood, impact)
                  const Wrapper = onCellClick ? "button" : "div"
                  return (
                    <Wrapper
                      key={impact}
                      type={onCellClick ? "button" : undefined}
                      onClick={onCellClick ? () => onCellClick(likelihood, impact) : undefined}
                      className={cn(
                        "size-12 flex items-center justify-center rounded-md border text-sm font-semibold",
                        cellClass(score),
                        onCellClick && "cursor-pointer hover:opacity-80 transition-opacity"
                      )}
                    >
                      {count > 0 ? count : ""}
                    </Wrapper>
                  )
                })}
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex items-center gap-1 mt-1">
            <div className="w-12" />
            {impacts.map((impact) => (
              <div key={impact} className="w-12 text-center text-[10px] text-muted-foreground capitalize">
                {impact}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="w-12" />
            <div className="w-36 text-center text-[10px] text-muted-foreground">Impact →</div>
          </div>
        </div>
      </div>
    </div>
  )
}
