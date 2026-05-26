import type { ReactNode } from "react"
import { ExternalLink, Layers3 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { SidebarNav } from "@/components/workbench/sidebar-nav"
import { components } from "@/lib/component-registry"
import { navigation } from "@/lib/workbench-data"

export default function WorkbenchLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20 text-foreground">
      <SidebarNav />
      <div className="flex min-h-screen flex-col lg:pl-80">
        <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="hidden size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15 sm:flex"
                aria-hidden
              >
                <Layers3 className="size-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-semibold tracking-tight">
                    NOS Workbench
                  </span>
                  <Badge variant="secondary" className="hidden h-5 px-1.5 text-[10px] sm:inline-flex">
                    Canonical
                  </Badge>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {components.length} components · {navigation.tokens.length} token sets · {navigation.patterns.length} patterns
                </p>
              </div>
            </div>
            <a
              href="https://github.com/radleylefou/nos-design-system-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
            >
              <ExternalLink className="size-3.5" />
              GitHub
            </a>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
