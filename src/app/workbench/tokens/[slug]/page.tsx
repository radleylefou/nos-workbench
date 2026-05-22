import { notFound } from "next/navigation"

import { ColorSwatch } from "@/components/workbench/color-swatch"
import {
  DurationDemo,
  EasingDemo,
} from "@/components/workbench/motion-demos"
import {
  brandScale,
  durationTokens,
  easingTokens,
  navigation,
  neutralScale,
  radiusScale,
  semanticColors,
  spacingScale,
  typographySizes,
  typographyWeights,
  type TokenSlug,
} from "@/lib/workbench-data"

export function generateStaticParams() {
  return navigation.tokens.map((slug) => ({ slug }))
}

const titles: Record<TokenSlug, { title: string; description: string }> = {
  color: {
    title: "Color",
    description:
      "The brand purple anchors NOS. Neutrals carry most of the interface; semantic colors signal state.",
  },
  typography: {
    title: "Typography",
    description: "Geist Sans is the single typeface. Sizes follow a modular scale.",
  },
  spacing: {
    title: "Spacing",
    description: "A 4px base unit drives all spacing, padding, and gaps.",
  },
  radius: {
    title: "Radius",
    description: "Small radius across the system — restrained, enterprise-appropriate.",
  },
  motion: {
    title: "Motion",
    description: "Purposeful motion only. Hover any bar to play its duration or curve.",
  },
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

function ColorPage() {
  return (
    <div className="flex flex-col gap-10">
      <Section title="Brand">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11">
          {brandScale.map((c) => (
            <ColorSwatch
              key={c.name}
              name={c.name}
              value={c.value}
              primary={c.primary}
              copyValue={`var(--${c.name})`}
            />
          ))}
        </div>
      </Section>
      <Section title="Neutral">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11">
          {neutralScale.map((c) => (
            <ColorSwatch
              key={c.name}
              name={c.name}
              value={c.value}
              copyValue={c.name}
            />
          ))}
        </div>
      </Section>
      <Section title="Semantic">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {semanticColors.map((c) => (
            <ColorSwatch
              key={c.name}
              name={c.name}
              value={c.value}
              copyValue={`var(--${c.name})`}
            />
          ))}
        </div>
      </Section>
    </div>
  )
}

function TypographyPage() {
  return (
    <div className="flex flex-col gap-12">
      <Section title="Family">
        <div className="rounded-md border border-border bg-card p-8 ring-1 ring-foreground/5">
          <div className="font-sans text-5xl tracking-tight">
            The quick brown fox
          </div>
          <div className="mt-2 font-mono text-xs text-muted-foreground">
            Geist Sans · var(--font-sans)
          </div>
        </div>
      </Section>

      <Section title="Sizes">
        <div className="flex flex-col gap-3">
          {typographySizes.map((s) => (
            <div
              key={s.name}
              className="flex items-baseline gap-6 border-b border-border py-3 last:border-b-0"
            >
              <div className="w-12 font-mono text-xs text-muted-foreground">
                {s.name}
              </div>
              <div className="w-20 font-mono text-xs text-muted-foreground">
                {s.px}px
              </div>
              <div style={{ fontSize: s.rem }} className="font-medium">
                The quick brown fox
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Weights">
        <div className="flex flex-col gap-3">
          {typographyWeights.map((w) => (
            <div
              key={w.name}
              className="flex items-baseline gap-6 border-b border-border py-3 last:border-b-0"
            >
              <div className="w-24 font-mono text-xs text-muted-foreground">
                {w.name}
              </div>
              <div className="w-12 font-mono text-xs text-muted-foreground">
                {w.weight}
              </div>
              <div style={{ fontWeight: w.weight }} className="text-xl">
                The quick brown fox
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function SpacingPage() {
  return (
    <div className="flex flex-col gap-1">
      {spacingScale.map((s) => (
        <div
          key={s.name}
          className="flex items-center gap-6 border-b border-border py-3 last:border-b-0"
        >
          <div className="w-16 font-mono text-xs">{s.name}</div>
          <div className="w-16 font-mono text-xs text-muted-foreground">
            {s.px}px
          </div>
          <div className="h-3 bg-primary rounded-sm" style={{ width: `${s.px}px` }} />
        </div>
      ))}
    </div>
  )
}

function RadiusPage() {
  return (
    <div className="flex flex-wrap gap-6">
      {radiusScale.map((r) => (
        <div key={r.name} className="flex flex-col items-center gap-2">
          <div
            className="size-20 bg-primary/10 ring-1 ring-primary/30"
            style={{ borderRadius: `var(${r.varName})` }}
          />
          <div className="text-center">
            <div className="font-mono text-xs">{r.name}</div>
            <div className="font-mono text-[10px] text-muted-foreground">
              {r.varName}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function MotionPage() {
  return (
    <div className="flex flex-col gap-12">
      <Section title="Duration">
        <div className="flex flex-col gap-3">
          {durationTokens.map((d) => (
            <DurationDemo key={d.name} name={`--duration-${d.name}`} ms={d.value} />
          ))}
        </div>
      </Section>
      <Section title="Easing">
        <div className="flex flex-col gap-3">
          {easingTokens.map((e) => (
            <EasingDemo key={e.name} name={`--ease-${e.name}`} curve={e.value} />
          ))}
        </div>
      </Section>
    </div>
  )
}

export default async function TokenPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!(navigation.tokens as readonly string[]).includes(slug)) {
    notFound()
  }
  const meta = titles[slug as TokenSlug]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">{meta.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {meta.description}
        </p>
      </div>

      {slug === "color" && <ColorPage />}
      {slug === "typography" && <TypographyPage />}
      {slug === "spacing" && <SpacingPage />}
      {slug === "radius" && <RadiusPage />}
      {slug === "motion" && <MotionPage />}
    </div>
  )
}
