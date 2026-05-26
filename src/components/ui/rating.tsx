"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  max?: number
  onChange?: (value: number) => void
  readOnly?: boolean
  symbol?: "star" | "heart"
  size?: "sm" | "md" | "lg"
}

function StarIcon({ filled, half, className }: { filled: boolean; half?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      {half ? (
        <>
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={filled ? "url(#half-fill)" : "none"}
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        </>
      ) : (
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={filled ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

function HeartIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Rating({
  className,
  value = 0,
  max = 5,
  onChange,
  readOnly = false,
  symbol = "star",
  size = "md",
  ...props
}: RatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null)

  const sizeClass = size === "sm" ? "size-4" : size === "md" ? "size-5" : "size-6"
  const colorClass = symbol === "heart" ? "text-rose-500" : "text-amber-400"
  const emptyColor = "text-muted-foreground/30"

  const displayed = hovered ?? value

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role={readOnly ? "img" : "slider"}
      aria-label={`Rating: ${value} of ${max}`}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1
        const isFilled = displayed >= starValue
        const isHalf = !isFilled && displayed >= starValue - 0.5

        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onMouseEnter={() => !readOnly && setHovered(starValue)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            onClick={() => !readOnly && onChange?.(starValue)}
            className={cn(
              "transition-transform duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
              !readOnly && "cursor-pointer hover:scale-110",
              readOnly && "cursor-default",
              isFilled || isHalf ? colorClass : emptyColor,
            )}
            aria-label={`${starValue} ${symbol}`}
          >
            {symbol === "star" ? (
              <StarIcon filled={isFilled} half={isHalf} className={sizeClass} />
            ) : (
              <HeartIcon filled={isFilled} className={sizeClass} />
            )}
          </button>
        )
      })}
    </div>
  )
}
