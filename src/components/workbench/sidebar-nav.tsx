"use client"

import { useEffect, useRef, type ElementType } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Component,
  FileText,
  Home,
  Layers3,
  PanelLeft,
  SwatchBook,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { navigation } from "@/lib/workbench-data"
import { components, categories } from "@/lib/component-registry"

type NavItemProps = {
  href: string
  label: string
  meta?: string | number
}

function formatLabel(label: string) {
  return label
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function NavItem({ href, label, meta }: NavItemProps) {
  const pathname = usePathname()
  const active = pathname === href
  return (
    <Link
      href={href}
      className={cn(
        "group/nav flex h-8 items-center justify-between gap-2 border-l border-transparent px-3 text-sm transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950/15",
        active
          ? "border-zinc-950 bg-zinc-50 font-medium text-zinc-950"
          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950",
      )}
      data-active={active ? "true" : undefined}
    >
      <span className="truncate">{label}</span>
      {meta ? (
        <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 ring-1 ring-zinc-200 group-hover/nav:text-zinc-950">
          {meta}
        </span>
      ) : null}
    </Link>
  )
}

type CategoryGroupProps = {
  category: string
}

function CategoryGroup({ category }: CategoryGroupProps) {
  const pathname = usePathname()
  const items = components.filter((c) => c.category === category)
  const hasActive = items.some((c) => pathname === `/workbench/components/${c.slug}`)

  return (
    <section className="px-3 py-1.5">
      <div
        className={cn(
          "flex w-full items-center justify-between gap-3 px-2 py-1.5 text-xs font-medium",
          hasActive ? "text-zinc-950" : "text-zinc-500",
        )}
      >
        <span className="truncate">{category}</span>
        <span className="text-[11px] font-medium text-zinc-400">
          {items.length}
        </span>
      </div>
      <ul className="flex flex-col gap-0.5 pb-1">
        {items.map((c) => (
          <li key={c.slug}>
            <NavItem href={`/workbench/components/${c.slug}`} label={c.name} />
          </li>
        ))}
      </ul>
    </section>
  )
}

type FlatNavGroupProps = {
  basePath: string
  items: readonly string[]
}

function FlatNavGroup({ basePath, items }: FlatNavGroupProps) {
  return (
    <div className="px-3 py-1.5">
      <ul className="flex flex-col gap-0.5">
        {items.map((slug) => (
          <li key={slug}>
            <NavItem href={`${basePath}/${slug}`} label={formatLabel(slug)} />
          </li>
        ))}
      </ul>
    </div>
  )
}

type SectionKey = "home" | "tokens" | "components" | "instructions" | "patterns"

type TopLevelItem = {
  key: SectionKey
  label: string
  href: string
  icon: ElementType
  count?: number
}

const topLevelItems: TopLevelItem[] = [
  {
    key: "home",
    label: "Home",
    href: "/workbench",
    icon: Home,
  },
  {
    key: "tokens",
    label: "Tokens",
    href: "/workbench/tokens/color",
    icon: SwatchBook,
    count: navigation.tokens.length,
  },
  {
    key: "components",
    label: "Components",
    href: "/workbench/components/button",
    icon: Component,
    count: components.length,
  },
  {
    key: "instructions",
    label: "Instructions",
    href: "/workbench/instructions/agents",
    icon: FileText,
    count: navigation.instructions.length,
  },
  {
    key: "patterns",
    label: "Patterns",
    href: "/workbench/patterns/portfolio-dashboard",
    icon: PanelLeft,
    count: navigation.patterns.length,
  },
]

function getActiveSection(pathname: string): SectionKey {
  if (pathname === "/workbench") return "home"
  if (pathname.startsWith("/workbench/tokens")) return "tokens"
  if (pathname.startsWith("/workbench/instructions")) return "instructions"
  if (pathname.startsWith("/workbench/patterns")) return "patterns"
  return "components"
}

function SectionRailItem({
  item,
  active,
}: {
  item: TopLevelItem
  active: boolean
}) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={cn(
        "group/rail flex size-10 items-center justify-center rounded-lg transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-3",
        active
          ? "bg-zinc-100 text-zinc-950 ring-1 ring-zinc-200 focus-visible:ring-zinc-950/15"
          : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:ring-zinc-950/15",
      )}
      aria-label={item.label}
      title={item.label}
    >
      <Icon className="size-4" />
    </Link>
  )
}

function SecondaryHeader({ item }: { item: TopLevelItem }) {
  const Icon = item.icon

  return (
    <div className="flex h-[81px] items-center border-b border-zinc-200 px-5">
      <div className="flex items-center gap-3">
        <div
          className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-950 ring-1 ring-zinc-200"
          aria-hidden
        >
          <Icon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold tracking-tight">
              {item.label}
            </span>
            {item.count ? (
              <Badge variant="outline" className="h-5 border-zinc-200 px-1.5 text-[10px] text-zinc-500">
                {item.count}
              </Badge>
            ) : null}
          </div>
          <p className="truncate text-[11px] text-zinc-500">
            {item.key === "components"
              ? "Reusable interface building blocks"
              : item.key === "tokens"
                ? "Canonical visual foundations"
                : item.key === "instructions"
                  ? "Agent and implementation rules"
                  : item.key === "patterns"
                    ? "Composed product patterns"
                    : "Operating reference overview"}
          </p>
        </div>
      </div>
    </div>
  )
}

export function SidebarNav() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const activeSection = getActiveSection(pathname)
  const activeTopLevelItem =
    topLevelItems.find((item) => item.key === activeSection) ?? topLevelItems[0]

  useEffect(() => {
    const activeLink = navRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    activeLink?.scrollIntoView({ block: "nearest" })
  }, [pathname])

  return (
    <aside className="fixed top-0 left-0 z-30 hidden h-screen w-80 border-r border-zinc-200 bg-white text-zinc-950 lg:flex">
      <div className="flex w-16 shrink-0 flex-col items-center border-r border-zinc-200 bg-zinc-50/80 py-4">
        <Link
          href="/workbench"
          className="mb-5 flex h-10 w-12 items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950/15"
          aria-label="NOS Workbench home"
        >
          <Image src="/nos-logo.svg" alt="" width={48} height={24} className="h-5 w-10" />
        </Link>
        <nav className="flex flex-col gap-2" aria-label="Workbench sections">
          {topLevelItems.map((item) => (
            <SectionRailItem
              key={item.key}
              item={item}
              active={activeSection === item.key}
            />
          ))}
        </nav>
        <div className="mt-auto flex size-8 items-center justify-center rounded-lg bg-white text-zinc-400 ring-1 ring-zinc-200">
          <Layers3 className="size-3.5" />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <SecondaryHeader item={activeTopLevelItem} />
        <nav ref={navRef} className="flex-1 overflow-y-auto py-4" aria-label={`${activeTopLevelItem.label} navigation`}>
          {activeSection === "home" ? (
            <div className="px-5 text-sm leading-6 text-zinc-500">
              The operating reference for building Nymbl apps.
            </div>
          ) : null}

          {activeSection === "tokens" ? (
            <FlatNavGroup basePath="/workbench/tokens" items={navigation.tokens} />
          ) : null}

          {activeSection === "components" ? (
            <>
              {categories.map((cat) => (
                <CategoryGroup
                  key={cat}
                  category={cat}
                />
              ))}
            </>
          ) : null}

          {activeSection === "instructions" ? (
            <FlatNavGroup basePath="/workbench/instructions" items={navigation.instructions} />
          ) : null}

          {activeSection === "patterns" ? (
            <FlatNavGroup basePath="/workbench/patterns" items={navigation.patterns} />
          ) : null}
        </nav>
        <div className="border-t border-zinc-200 p-4">
          <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-3 text-[11px] leading-relaxed text-zinc-500">
            <span className="font-medium text-zinc-950">Source of truth</span>
            <br />
            NOS tokens, components, instructions, and product patterns.
          </div>
        </div>
      </div>
    </aside>
  )
}
