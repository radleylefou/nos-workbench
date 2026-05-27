import type { ReactNode } from "react"
import { ExternalLink, Search } from "lucide-react"

import { SidebarNav } from "@/components/workbench/sidebar-nav"
import { WorkbenchMotion } from "@/components/workbench/workbench-motion"
import { components } from "@/lib/component-registry"
import { navigation } from "@/lib/workbench-data"

export default function WorkbenchLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <SidebarNav />
      <div className="flex min-h-screen flex-col lg:pl-80">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
          <div className="flex min-h-20 items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-12">
            <div className="hidden min-w-0 items-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-500 shadow-[0_12px_40px_rgba(0,0,0,0.04)] md:flex md:w-[28rem]">
              <Search className="mr-2 size-4 text-zinc-400" />
              <span className="truncate">Quick search...</span>
              <kbd className="ml-auto rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-500">
                /
              </kbd>
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-between gap-4 md:flex-none">
              <p className="truncate text-xs text-zinc-500">
                <span className="font-medium text-zinc-950">NOS Workbench</span>
                <span className="mx-2 text-zinc-300">/</span>
                {components.length} components · {navigation.tokens.length} token sets · {navigation.patterns.length} patterns
              </p>
              <a
                href="https://github.com/radleylefou/nos-workbench"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-600 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-zinc-950 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950/15"
              >
                <ExternalLink className="size-3.5" />
                GitHub
              </a>
            </div>
          </div>
        </header>
        <main className="w-full max-w-full flex-1 overflow-x-hidden px-4 py-10 sm:px-6 lg:px-12 lg:py-12">
          <WorkbenchMotion>
            <div className="mx-auto w-full max-w-[90rem]">{children}</div>
          </WorkbenchMotion>
        </main>
      </div>
    </div>
  )
}
