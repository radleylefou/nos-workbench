import type { L1Type } from "@/components/ui/l1-distribution-bar"

/** Tailwind badge color classes keyed by L1 component type. */
export const l1TypeBadgeClass: Record<L1Type, string> = {
  Experience: "bg-[var(--brand-600)]/10 text-[var(--brand-600)] border-[var(--brand-600)]/20",
  Workflow: "bg-info-50 text-info-700 border-info-200",
  Integration: "bg-success-50 text-success-700 border-success-200",
  Foundation: "bg-warning-50 text-warning-700 border-warning-200",
}
