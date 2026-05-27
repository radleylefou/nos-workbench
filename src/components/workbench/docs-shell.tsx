import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export type TocItem = {
  href: string
  label: string
}

export function WorkbenchDocsShell({
  children,
  toc,
}: {
  children: ReactNode
  toc?: TocItem[]
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_14rem]">
      <div className="min-w-0">{children}</div>
      {toc?.length ? <WorkbenchToc items={toc} /> : null}
    </div>
  )
}

export function WorkbenchToc({ items }: { items: TocItem[] }) {
  return (
    <aside className="sticky top-24 hidden h-fit border-l border-zinc-200 pl-6 text-sm xl:block">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
        On this page
      </p>
      <nav className="flex flex-col gap-3">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-zinc-500 transition-colors duration-[var(--duration-fast)] hover:text-zinc-950"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}

export function WorkbenchHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string
  title: string
  description: string
  children?: ReactNode
  className?: string
}) {
  return (
    <section
      data-workbench-reveal
      className={cn("border-b border-zinc-200 pb-10", className)}
    >
      {eyebrow ? (
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {eyebrow}
        </p>
      ) : null}
      <div className="max-w-5xl">
        <h1 className="text-[clamp(2.75rem,5vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-zinc-950">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 sm:text-lg">
          {description}
        </p>
      </div>
      {children ? <div className="mt-7">{children}</div> : null}
    </section>
  )
}

export function WorkbenchSection({
  id,
  title,
  description,
  children,
  className,
}: {
  id?: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      data-workbench-reveal
      className={cn("scroll-mt-28 py-10", className)}
    >
      <div className="mb-6 flex flex-col gap-2 border-b border-zinc-200 pb-5">
        <h2 className="text-2xl font-semibold tracking-[-0.025em] text-zinc-950">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-zinc-600">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export function WorkbenchPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      data-workbench-reveal
      className={cn(
        "rounded-[1.25rem] border border-zinc-200 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function WorkbenchReferenceCard({
  href,
  title,
  description,
  meta,
  children,
}: {
  href: string
  title: string
  description: string
  meta?: string | number
  children?: ReactNode
}) {
  return (
    <Link
      href={href}
      className="group/reference flex min-h-56 flex-col justify-between overflow-hidden rounded-[1.25rem] border border-zinc-200 bg-white p-5 text-zinc-950 transition-[border-color,box-shadow,transform] duration-700 ease-out hover:-translate-y-1 hover:border-zinc-950 hover:shadow-[0_28px_80px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="overflow-hidden rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
          {meta ?? "Reference"}
        </div>
        <ArrowRight className="size-4 text-zinc-400 transition-transform duration-700 ease-out group-hover/reference:translate-x-1 group-hover/reference:text-zinc-950" />
      </div>
      <div>
        {children}
        <h3 className="text-2xl font-semibold tracking-[-0.035em]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
      </div>
    </Link>
  )
}
