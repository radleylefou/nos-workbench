import type { ComponentProps, ComponentType } from "react"
import Image from "next/image"
import {
  ArrowLeft,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChevronsUpDown,
  ChevronRight,
  Circle,
  Clock3,
  CreditCard,
  Folder,
  Home,
  LayoutDashboard,
  Phone,
  Search,
  Sun,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"

type SidebarIcon = ComponentType<{ className?: string }>

type SidebarItem = {
  label: string
  icon: SidebarIcon
  active?: boolean
}

type WorkflowItem = {
  label: string
  active?: boolean
}

type TeamMember = {
  initials: string
  name: string
  role: string
  tone: string
}

type AppSidebarProps = ComponentProps<"aside"> & {
  appName?: string
}

const mainSections: { label: string; items: SidebarItem[] }[] = [
  {
    label: "Main",
    items: [
      { label: "Home", icon: Home, active: true },
      { label: "Guidance", icon: CalendarDays },
      { label: "Time Entry", icon: Clock3 },
      { label: "PTO", icon: Sun },
      { label: "Expenses", icon: CreditCard },
      { label: "Meetings", icon: Phone },
    ],
  },
  {
    label: "Platform",
    items: [
      { label: "CRM", icon: Users },
      { label: "Demand Planning", icon: BarChart3 },
      { label: "Project Management", icon: BriefcaseBusiness },
    ],
  },
]

const workflowItems: WorkflowItem[] = [
  { label: "Intake" },
  { label: "Triage" },
  { label: "Solution Definition", active: true },
  { label: "Artifacts" },
  { label: "Domain Model" },
  { label: "Estimation" },
  { label: "Plan" },
  { label: "Risks, Questions, Assets" },
  { label: "Review" },
  { label: "Outputs" },
]

const team: TeamMember[] = [
  { initials: "MC", name: "Maya Chen", role: "Commercial Lead", tone: "bg-purple-500" },
  { initials: "AR", name: "Alex Rivera", role: "Solution Lead", tone: "bg-amber-400" },
  { initials: "PS", name: "Priya Shah", role: "Delivery Manager", tone: "bg-blue-500" },
  { initials: "MC", name: "Jordan Lee", role: "Estimation Lead", tone: "bg-emerald-500" },
]

function NosLogo() {
  return (
    <Image
      src="/nos-logo.svg"
      alt="NOS"
      width={48}
      height={24}
      className="h-6 w-12"
      priority
    />
  )
}

function SidebarShell({ className, children, ...props }: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-[48rem] w-[16.25rem] flex-col overflow-hidden bg-[var(--brand-950)] text-white shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

function SidebarTop({ appName }: { appName?: string }) {
  return (
    <div className="flex items-center justify-between px-5 pt-7">
      <div className="flex min-w-0 items-center gap-3">
        <NosLogo />
        {appName ? (
          <span className="min-w-0 truncate text-sm font-semibold tracking-tight text-white">
            {appName}
          </span>
        ) : null}
      </div>
      <button
        type="button"
        className="relative inline-flex size-8 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
        <span className="absolute right-2 top-1.5 size-1.5 rounded-full bg-amber-300" />
      </button>
    </div>
  )
}

function SidebarSearch() {
  return (
    <div className="px-2.5 pt-7">
      <label className="flex h-9 items-center gap-2 rounded-md bg-white/13 px-3 text-sm text-white/45 ring-1 ring-white/5">
        <Search className="size-4 shrink-0" />
        <span className="min-w-0 flex-1">Search</span>
        <Kbd className="h-5 min-w-8 border border-white/10 bg-white/10 px-1.5 text-[11px] text-white/55">
          ⌘ K
        </Kbd>
      </label>
    </div>
  )
}

function NavSection({ label, items }: { label: string; items: SidebarItem[] }) {
  return (
    <section className="flex flex-col gap-2 px-2.5">
      <h2 className="px-2.5 text-sm font-medium text-white/45">{label}</h2>
      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <a
              key={item.label}
              href="#"
              className={cn(
                "flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm text-white/88 transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
                item.active && "bg-primary/32 text-white"
              )}
            >
              <Icon className="size-4 shrink-0 text-white/55" />
              <span className="truncate">{item.label}</span>
            </a>
          )
        })}
      </div>
    </section>
  )
}

function UserFooter() {
  return (
    <div className="mt-auto px-4 pb-4">
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-md p-1.5 text-left transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
      >
        <Avatar className="size-9">
          <AvatarFallback className="bg-white text-[11px] font-semibold text-[var(--brand-950)]">
            JS
          </AvatarFallback>
        </Avatar>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-white">John Smith</span>
          <span className="block truncate text-xs text-white/45">john@nymbl.app</span>
        </span>
        <ChevronsUpDown className="size-4 text-white/80" />
      </button>
    </div>
  )
}

export function NymblAppSidebar({ className, appName, ...props }: AppSidebarProps) {
  return (
    <SidebarShell className={className} {...props}>
      <SidebarTop appName={appName} />
      <SidebarSearch />
      <nav className="flex flex-col gap-7 pt-5" aria-label="Main navigation">
        {mainSections.map((section) => (
          <NavSection key={section.label} label={section.label} items={section.items} />
        ))}
      </nav>
      <UserFooter />
    </SidebarShell>
  )
}

function EngagementHeader() {
  return (
    <div className="px-4 pt-4">
      <div className="flex items-center gap-3">
        <div
          className="size-10 shrink-0 rounded-md bg-[linear-gradient(135deg,var(--brand-100),var(--primary)_55%,var(--brand-900))]"
          aria-hidden
        />
        <div className="min-w-0">
          <h2 className="truncate text-sm font-medium text-white">Acme Health Systems</h2>
          <p className="truncate text-xs text-white/45">Clinical Intake Automation...</p>
        </div>
      </div>
    </div>
  )
}

function WorkflowNav() {
  return (
    <nav className="mt-4 border-t border-white/10 px-2.5 pt-4" aria-label="Engagement workflow">
      <a
        href="#"
        className="mb-4 flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm text-white/45 transition-colors hover:bg-white/8 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
      >
        <ArrowLeft className="size-4" />
        <span>All Engagements</span>
      </a>
      <div className="flex flex-col gap-1.5">
        {workflowItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm text-white/88 transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
              item.active && "bg-primary/32 text-white"
            )}
          >
            <Circle
              className={cn(
                "size-3.5 shrink-0 text-white/50",
                item.active && "text-primary fill-primary/20"
              )}
            />
            <span className="truncate">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}

function TeamFooter() {
  return (
    <section className="mt-auto border-t border-white/10 px-4 py-4">
      <h2 className="mb-3 text-[10px] font-semibold tracking-wider text-white/45 uppercase">
        Team
      </h2>
      <div className="flex flex-col gap-3">
        {team.map((member) => (
          <div key={`${member.name}-${member.role}`} className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarFallback className={cn("text-xs font-medium text-white", member.tone)}>
                {member.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-white">{member.name}</div>
              <div className="truncate text-xs text-white/45">{member.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function NymblEngagementSidebar({ className, appName, ...props }: AppSidebarProps) {
  return (
    <SidebarShell className={className} {...props}>
      <SidebarTop appName={appName} />
      <SidebarSearch />
      <EngagementHeader />
      <WorkflowNav />
      <TeamFooter />
    </SidebarShell>
  )
}

// ─── Nested nav sidebar ───────────────────────────────────────────────────────

const nestedMainSections: { label: string; items: SidebarItem[] }[] = [
  {
    label: "Main",
    items: [
      { label: "Home", icon: Home, active: true },
      { label: "Dashboard", icon: LayoutDashboard },
    ],
  },
]

type NestedChild = {
  label: string
  active?: boolean
}

type NestedGroup = {
  label: string
  defaultOpen?: boolean
  children: NestedChild[]
}

type NestedNavSection = {
  label: string
  groups: NestedGroup[]
}

const nestedSections: NestedNavSection[] = [
  {
    label: "Projects",
    groups: [
      {
        label: "Active Projects",
        defaultOpen: true,
        children: [
          { label: "Project Alpha" },
          { label: "Project Beta", active: true },
          { label: "Project Gamma" },
        ],
      },
      {
        label: "Archived",
        defaultOpen: false,
        children: [
          { label: "2024 Archive" },
          { label: "2023 Archive" },
        ],
      },
    ],
  },
]

function NestedNavGroup({ group }: { group: NestedGroup }) {
  return (
    <Collapsible defaultOpen={group.defaultOpen} className="group/collapsible">
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex h-9 w-full items-center gap-2.5 rounded-md px-2.5 text-sm text-white/88 transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
        >
          <Folder className="size-4 shrink-0 text-white/55" />
          <span className="min-w-0 flex-1 truncate text-left">{group.label}</span>
          <ChevronRight className="size-3.5 shrink-0 text-white/45 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-data-[state=open]/collapsible:rotate-90" />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-0.5 flex flex-col gap-0.5 pl-9">
          {group.children.map((child) => (
            <a
              key={child.label}
              href="#"
              className={cn(
                "flex h-8 items-center rounded-md px-2.5 text-sm text-white/70 transition-colors hover:bg-white/8 hover:text-white/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
                child.active && "bg-primary/32 text-white"
              )}
            >
              <span className="truncate">{child.label}</span>
            </a>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function NestedSection({ section }: { section: NestedNavSection }) {
  return (
    <section className="flex flex-col gap-1 px-2.5">
      <h2 className="px-2.5 pb-0.5 text-sm font-medium text-white/45">{section.label}</h2>
      {section.groups.map((group) => (
        <NestedNavGroup key={group.label} group={group} />
      ))}
    </section>
  )
}

export function NymblNestedSidebar({ className, appName, ...props }: AppSidebarProps) {
  return (
    <SidebarShell className={className} {...props}>
      <SidebarTop appName={appName} />
      <SidebarSearch />
      <nav className="flex flex-col gap-7 overflow-y-auto pt-5" aria-label="Main navigation">
        {nestedMainSections.map((section) => (
          <NavSection key={section.label} label={section.label} items={section.items} />
        ))}
        {nestedSections.map((section) => (
          <NestedSection key={section.label} section={section} />
        ))}
      </nav>
      <UserFooter />
    </SidebarShell>
  )
}
