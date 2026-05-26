"use client"

import { useState, type ElementType } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  Component,
  FileText,
  Layers3,
  PanelLeft,
  Sparkles,
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
        "group/nav flex h-8 items-center justify-between gap-2 rounded-md px-2 text-sm transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/35",
        active
          ? "bg-primary/10 font-medium text-primary ring-1 ring-primary/15"
          : "text-foreground/75 hover:bg-muted hover:text-foreground",
      )}
    >
      <span className="truncate">{label}</span>
      {meta ? (
        <span className="rounded bg-background/70 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground ring-1 ring-border group-hover/nav:text-foreground">
          {meta}
        </span>
      ) : null}
    </Link>
  )
}

type CategoryGroupProps = {
  category: string
  open: boolean
  onOpenChange: (category: string | null) => void
}

function CategoryGroup({ category, open, onOpenChange }: CategoryGroupProps) {
  const pathname = usePathname()
  const items = components.filter((c) => c.category === category)
  const hasActive = items.some((c) => pathname === `/workbench/components/${c.slug}`)

  return (
    <div className="px-3">
      <button
        onClick={() => onOpenChange(open ? null : category)}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[10px] font-semibold tracking-wider uppercase transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/35",
          hasActive || open ? "text-foreground" : "text-muted-foreground",
        )}
        aria-expanded={open}
      >
        <span className="truncate">{category}</span>
        <span className="flex items-center gap-1.5">
          <span className="text-[10px] font-medium tracking-normal text-muted-foreground/80">
            {items.length}
          </span>
          <ChevronDown
            className={cn(
              "size-3 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              open ? "rotate-0" : "-rotate-90",
            )}
          />
        </span>
      </button>
      {open && (
        <ul className="flex flex-col gap-0.5 pb-1">
          {items.map((c) => (
            <li key={c.slug}>
              <NavItem href={`/workbench/components/${c.slug}`} label={c.name} />
            </li>
          ))}
        </ul>
      )}
    </div>
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

type SectionKey = "tokens" | "components" | "instructions" | "patterns"

type TopLevelItem = {
  key: SectionKey
  label: string
  href: string
  icon: ElementType
  count: number
}

const topLevelItems: TopLevelItem[] = [
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
    href: "/workbench/instructions/agent-rules",
    icon: FileText,
    count: navigation.instructions.length,
  },
  {
    key: "patterns",
    label: "Patterns",
    href: "/workbench/patterns/workspace-shell",
    icon: PanelLeft,
    count: navigation.patterns.length,
  },
]

function getActiveSection(pathname: string): SectionKey {
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
        "group/rail flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/35",
        active && "bg-primary/10 text-primary ring-1 ring-primary/15",
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
    <div className="border-b border-sidebar-border p-4">
      <div className="flex items-center gap-3">
        <div
          className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15"
          aria-hidden
        >
          <Icon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-semibold tracking-tight">
              {item.label}
            </span>
            <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
              {item.count}
            </Badge>
          </div>
          <p className="truncate text-[11px] text-muted-foreground">
            {item.key === "components"
              ? "Reusable interface building blocks"
              : item.key === "tokens"
                ? "Canonical visual foundations"
                : item.key === "instructions"
                  ? "Agent and implementation rules"
                  : "Composed product patterns"}
          </p>
        </div>
      </div>
    </div>
  )
}

export function SidebarNav() {
  const pathname = usePathname()
  const activeSection = getActiveSection(pathname)
  const activeTopLevelItem =
    topLevelItems.find((item) => item.key === activeSection) ?? topLevelItems[0]
  const activeCategory = categories.find((category) =>
    components.some(
      (component) =>
        component.category === category &&
        pathname === `/workbench/components/${component.slug}`,
    ),
  )
  const [openCategory, setOpenCategory] = useState<string | null>(
    activeCategory ?? "Forms & Inputs",
  )

  return (
    <aside className="fixed top-0 left-0 z-30 hidden h-screen w-80 border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      <div className="flex w-16 shrink-0 flex-col items-center border-r border-sidebar-border bg-background/70 py-4">
        <Link
          href="/workbench"
          className="mb-5 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/35"
          aria-label="NOS Workbench home"
        >
          <Sparkles className="size-4" />
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
        <div className="mt-auto flex size-8 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground ring-1 ring-border">
          <Layers3 className="size-3.5" />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <SecondaryHeader item={activeTopLevelItem} />
        <nav className="flex-1 overflow-y-auto py-3" aria-label={`${activeTopLevelItem.label} navigation`}>
          {activeSection === "tokens" ? (
            <FlatNavGroup basePath="/workbench/tokens" items={navigation.tokens} />
          ) : null}

          {activeSection === "components" ? (
            <>
              {categories.map((cat) => (
                <CategoryGroup
                  key={cat}
                  category={cat}
                  open={openCategory === cat}
                  onOpenChange={setOpenCategory}
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
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-background/70 p-3 text-[11px] leading-relaxed text-muted-foreground ring-1 ring-border">
            <span className="font-medium text-foreground">Source of truth</span>
            <br />
            NOS tokens, components, instructions, and product patterns.
          </div>
        </div>
      </div>
    </aside>
  )
}
