import type { ReactNode } from "react"

import { SidebarNav } from "@/components/workbench/sidebar-nav"

export default function WorkbenchLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />
      <div className="ml-60 flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background/85 px-8 backdrop-blur">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-semibold tracking-tight">
              Workbench
            </span>
            <span className="text-xs text-muted-foreground">
              Components · Tokens · Instructions
            </span>
          </div>
          <a
            href="https://github.com/radleylefou/nos-design-system-v2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </header>
        <main className="flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  )
}
