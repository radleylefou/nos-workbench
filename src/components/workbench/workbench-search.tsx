"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Component, FileText, Home, PanelLeft, Search, SwatchBook } from "lucide-react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { components } from "@/lib/component-registry"
import { navigation } from "@/lib/workbench-data"

type SearchItem = {
  href: string
  label: string
  description: string
  group: string
  keywords: string
  icon: typeof Home
}

function formatLabel(label: string) {
  return label
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function buildSearchItems(): SearchItem[] {
  return [
    {
      href: "/workbench",
      label: "Home",
      description: "The operating reference for building Nymbl apps.",
      group: "Workbench",
      keywords: "home overview reference map",
      icon: Home,
    },
    ...components.map((component) => ({
      href: `/workbench/components/${component.slug}`,
      label: component.name,
      description: component.description,
      group: "Components",
      keywords: `${component.category} ${component.variants?.join(" ") ?? ""}`,
      icon: Component,
    })),
    ...navigation.tokens.map((token) => ({
      href: `/workbench/tokens/${token}`,
      label: formatLabel(token),
      description: "Token foundation.",
      group: "Tokens",
      keywords: token,
      icon: SwatchBook,
    })),
    ...navigation.instructions.map((instruction) => ({
      href: `/workbench/instructions/${instruction}`,
      label: formatLabel(instruction),
      description: "Agent and implementation guidance.",
      group: "Instructions",
      keywords: instruction,
      icon: FileText,
    })),
    ...navigation.patterns.map((pattern) => ({
      href: `/workbench/patterns/${pattern}`,
      label: formatLabel(pattern),
      description: "Product composition pattern.",
      group: "Patterns",
      keywords: pattern,
      icon: PanelLeft,
    })),
  ]
}

export function WorkbenchSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const items = useMemo(() => buildSearchItems(), [])
  const groupedItems = useMemo(
    () =>
      ["Workbench", "Components", "Tokens", "Instructions", "Patterns"].map(
        (group) => ({
          group,
          items: items.filter((item) => item.group === group),
        }),
      ),
    [items],
  )

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable

      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || (!isTyping && event.key === "/")) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  function selectItem(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden min-w-0 items-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-left text-sm text-zinc-500 shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-colors duration-[var(--duration-fast)] hover:border-zinc-300 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-zinc-950/15 md:flex md:w-[28rem]"
        aria-label="Search workbench"
      >
        <Search className="mr-2 size-4 text-zinc-400" />
        <span className="truncate">Quick search...</span>
        <kbd className="ml-auto rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-500">
          /
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search Workbench"
        description="Search components, tokens, instructions, and patterns."
        className="max-w-2xl"
      >
        <Command>
          <CommandInput placeholder="Search components, tokens, patterns..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {groupedItems.map(({ group, items: groupItems }, index) => (
              <div key={group}>
                {index > 0 ? <CommandSeparator /> : null}
                <CommandGroup heading={group}>
                  {groupItems.map((item) => {
                    const Icon = item.icon

                    return (
                      <CommandItem
                        key={item.href}
                        value={`${item.label} ${item.description} ${item.keywords}`}
                        onSelect={() => selectItem(item.href)}
                      >
                        <Icon className="size-4 text-zinc-500" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate">{item.label}</span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </span>
                        <CommandShortcut>{item.group}</CommandShortcut>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </div>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
