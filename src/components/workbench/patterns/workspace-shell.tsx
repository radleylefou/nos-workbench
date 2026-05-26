import { Badge } from "@/components/ui/badge"

function ZoneLabel({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="secondary" className="absolute top-2 left-2 text-[10px] font-mono z-10">
      {children}
    </Badge>
  )
}

function ShellDiagram({ rightRailOpen }: { rightRailOpen: boolean }) {
  return (
    <div className="relative flex h-96 overflow-hidden rounded-lg border border-border bg-background text-xs">
      {/* Left rail */}
      <div className="relative flex w-48 shrink-0 flex-col border-r border-border bg-muted/40">
        <ZoneLabel>Left Rail — 240px</ZoneLabel>
        <div className="flex h-12 items-center border-b border-border px-3">
          <div className="h-4 w-24 rounded bg-muted" />
        </div>
        <div className="flex flex-col gap-1 p-2 pt-4">
          {["Components", "Tokens", "Instructions", "Patterns"].map((s) => (
            <div key={s} className="h-6 rounded bg-muted/60 px-2 flex items-center text-[10px] text-muted-foreground">{s}</div>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <div className="relative flex h-12 shrink-0 items-center justify-between border-b border-border bg-background px-4">
          <ZoneLabel>Top Bar — 48px</ZoneLabel>
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="flex gap-2">
            <div className="h-6 w-6 rounded bg-muted" />
            <div className="h-6 w-6 rounded-full bg-muted" />
          </div>
        </div>

        {/* Content + right rail */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main content */}
          <div className="relative flex-1 overflow-auto p-4">
            <ZoneLabel>Main Content — scrollable</ZoneLabel>
            <div className="mt-6 flex flex-col gap-2">
              <div className="h-6 w-48 rounded bg-muted" />
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 rounded-md border border-border bg-muted/30" />
                ))}
              </div>
              <div className="h-32 rounded-md border border-border bg-muted/30" />
            </div>
          </div>

          {/* Right rail */}
          {rightRailOpen && (
            <div className="relative flex w-64 shrink-0 flex-col border-l border-border bg-muted/20">
              <ZoneLabel>Right Rail — 320px</ZoneLabel>
              <div className="flex h-10 items-center border-b border-border px-3 text-[10px] font-medium text-muted-foreground">
                Context panel
              </div>
              <div className="flex flex-col gap-2 p-3 pt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 rounded bg-muted/50" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs text-zinc-200">
      <code>{code}</code>
    </pre>
  )
}

const shellCode = `// src/app/workbench/layout.tsx
export default function WorkbenchLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left rail — 240px fixed */}
      <SidebarNav />

      {/* Right side */}
      <div className="flex flex-1 flex-col overflow-hidden ml-60">
        {/* Top bar — 48px */}
        <TopBar />

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}`

export function WorkspaceShellPattern() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">Shell — Right Rail Expanded</h2>
          <Badge variant="outline" className="text-[10px]">default</Badge>
        </div>
        <ShellDiagram rightRailOpen />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">Shell — Right Rail Collapsed</h2>
          <Badge variant="outline" className="text-[10px]">collapsed</Badge>
        </div>
        <ShellDiagram rightRailOpen={false} />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold">Shell CSS Structure</h2>
        <CodeBlock code={shellCode} />
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <h3 className="mb-2 text-sm font-medium">Composes</h3>
        <div className="flex flex-wrap gap-2">
          {["SidebarNav", "Sheet (right rail mobile)", "ScrollArea (main)"].map((c) => (
            <Badge key={c} variant="secondary" className="font-mono text-xs">{c}</Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
