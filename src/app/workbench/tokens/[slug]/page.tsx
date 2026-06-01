import { notFound } from "next/navigation"

import { ColorSwatch } from "@/components/workbench/color-swatch"
import {
  DurationDemo,
  EasingDemo,
} from "@/components/workbench/motion-demos"
import {
  WorkbenchDocsShell,
  WorkbenchHero,
  WorkbenchPanel,
  WorkbenchSection,
} from "@/components/workbench/docs-shell"
import {
  brandScale,
  durationTokens,
  easingTokens,
  navigation,
  neutralScale,
  radiusScale,
  semanticColorScales,
  shadowScale,
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
  shadow: {
    title: "Shadow",
    description: "A restrained elevation scale based on shadcn defaults.",
  },
  motion: {
    title: "Motion",
    description: "Purposeful motion only. Hover any bar to play its duration or curve.",
  },
}

function TokenSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3" data-workbench-reveal>
      <h2 className="text-lg font-semibold tracking-tight text-zinc-950">{title}</h2>
      {children}
    </section>
  )
}

function ColorPage() {
  return (
    <div className="flex flex-col gap-10">
      <TokenSection title="Brand">
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
      </TokenSection>
      <TokenSection title="Neutral">
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
      </TokenSection>
      <TokenSection title="Semantic">
        <div className="flex flex-col gap-8">
          {semanticColorScales.map((scale) => (
            <div key={scale.label} className="flex flex-col gap-3">
              <h3 className="text-sm font-medium text-zinc-700">
                {scale.label}
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11">
                {scale.colors.map((c) => (
                  <ColorSwatch
                    key={c.name}
                    name={c.name}
                    value={c.value}
                    primary={c.primary}
                    copyValue={`var(--${c.name})`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </TokenSection>
    </div>
  )
}

function TypographyPage() {
  return (
    <div className="flex flex-col gap-12">
      <TokenSection title="Family">
        <WorkbenchPanel className="p-8">
          <div className="font-sans text-5xl tracking-tight">
            The quick brown fox
          </div>
          <div className="mt-2 font-mono text-xs text-zinc-500">
            Geist Sans · var(--font-sans)
          </div>
        </WorkbenchPanel>
      </TokenSection>

      <TokenSection title="Sizes">
        <div className="flex flex-col gap-3">
          {typographySizes.map((s) => (
            <div
              key={s.name}
              className="flex items-baseline gap-6 border-b border-zinc-200 py-3 last:border-b-0"
            >
              <div className="w-12 font-mono text-xs text-zinc-500">
                {s.name}
              </div>
              <div className="w-20 font-mono text-xs text-zinc-500">
                {s.px}px
              </div>
              <div style={{ fontSize: s.rem }} className="font-medium">
                The quick brown fox
              </div>
            </div>
          ))}
        </div>
      </TokenSection>

      <TokenSection title="Weights">
        <div className="flex flex-col gap-3">
          {typographyWeights.map((w) => (
            <div
              key={w.name}
              className="flex items-baseline gap-6 border-b border-zinc-200 py-3 last:border-b-0"
            >
              <div className="w-24 font-mono text-xs text-zinc-500">
                {w.name}
              </div>
              <div className="w-12 font-mono text-xs text-zinc-500">
                {w.weight}
              </div>
              <div style={{ fontWeight: w.weight }} className="text-xl">
                The quick brown fox
              </div>
            </div>
          ))}
        </div>
      </TokenSection>
    </div>
  )
}

function SpacingPage() {
  return (
    <div className="flex flex-col gap-1">
      {spacingScale.map((s) => (
        <div
          key={s.name}
          className="flex items-center gap-6 border-b border-zinc-200 py-3 last:border-b-0"
        >
          <div className="w-16 font-mono text-xs">{s.name}</div>
          <div className="w-16 font-mono text-xs text-zinc-500">
            {s.px}px
          </div>
          <div className="h-3 rounded-sm bg-zinc-950" style={{ width: `${s.px}px` }} />
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
            className="size-20 bg-zinc-50 ring-1 ring-zinc-300"
            style={{ borderRadius: `var(${r.varName})` }}
          />
          <div className="text-center">
            <div className="font-mono text-xs">{r.name}</div>
            <div className="font-mono text-[10px] text-zinc-500">
              {r.varName}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ShadowPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {shadowScale.map((shadow) => (
        <WorkbenchPanel key={shadow.name} className="flex min-h-32 flex-col justify-between p-5">
          <div className={`h-14 rounded-lg border border-zinc-200 bg-white ${shadow.className}`} />
          <div className="mt-4">
            <div className="font-mono text-xs">{shadow.name}</div>
            <div className="font-mono text-[10px] text-zinc-500">
              {shadow.varName}
            </div>
          </div>
        </WorkbenchPanel>
      ))}
    </div>
  )
}

function MotionPage() {
  return (
    <div className="flex flex-col gap-12">
      <TokenSection title="Duration">
        <div className="flex flex-col gap-3">
          {durationTokens.map((d) => (
            <DurationDemo key={d.name} name={`--duration-${d.name}`} ms={d.value} />
          ))}
        </div>
      </TokenSection>
      <TokenSection title="Easing">
        <div className="flex flex-col gap-3">
          {easingTokens.map((e) => (
            <EasingDemo key={e.name} name={`--ease-${e.name}`} curve={e.value} />
          ))}
        </div>
      </TokenSection>
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
    <WorkbenchDocsShell
      toc={[
        { href: "#tokens", label: meta.title },
        { href: "#source", label: "Source" },
      ]}
    >
      <WorkbenchHero eyebrow="Tokens" title={meta.title} description={meta.description} />
      <WorkbenchSection id="tokens" title={`${meta.title} scale`}>
        {slug === "color" && <ColorPage />}
        {slug === "typography" && <TypographyPage />}
        {slug === "spacing" && <SpacingPage />}
        {slug === "radius" && <RadiusPage />}
        {slug === "shadow" && <ShadowPage />}
        {slug === "motion" && <MotionPage />}
      </WorkbenchSection>
      <WorkbenchSection id="source" title="Source">
        <WorkbenchPanel className="p-4">
          <code className="font-mono text-xs text-zinc-600">src/app/globals.css</code>
        </WorkbenchPanel>
      </WorkbenchSection>
    </WorkbenchDocsShell>
  )
}
