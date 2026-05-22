"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { navigation } from "@/lib/workbench-data"

type NavGroupProps = {
  label: string
  basePath: string
  items: readonly string[]
}

function NavGroup({ label, basePath, items }: NavGroupProps) {
  const pathname = usePathname()
  return (
    <div className="px-3 py-2">
      <div className="px-2 pb-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
        {label}
      </div>
      <ul className="flex flex-col">
        {items.map((slug) => {
          const href = `${basePath}/${slug}`
          const active = pathname === href
          return (
            <li key={slug}>
              <Link
                href={href}
                className={cn(
                  "flex h-7 items-center rounded px-2 text-sm capitalize transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
                  active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground",
                )}
              >
                {slug}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function SidebarNav() {
  return (
    <aside className="fixed top-0 left-0 z-30 flex h-screen w-60 flex-col border-r border-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <div className="size-6 rounded bg-primary" aria-hidden />
        <div className="flex flex-1 items-center gap-2">
          <span className="text-sm font-semibold">NOS Workbench</span>
          <Badge variant="secondary" className="h-4 px-1.5 text-[10px]">
            v2.0
          </Badge>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        <NavGroup
          label="Components"
          basePath="/workbench/components"
          items={navigation.components}
        />
        <NavGroup
          label="Tokens"
          basePath="/workbench/tokens"
          items={navigation.tokens}
        />
        <NavGroup
          label="Instructions"
          basePath="/workbench/instructions"
          items={navigation.instructions}
        />
      </nav>
      <div className="border-t border-border px-4 py-3 text-[11px] text-muted-foreground">
        NOS Design System — built on Shadcn Vega
      </div>
    </aside>
  )
}
