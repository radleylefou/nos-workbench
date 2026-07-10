import { ChangelogList } from "@/components/workbench/changelog-list"
import { changelogEntries } from "@/lib/changelog-data"

export default function ChangelogPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">Changelog</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Release history and notable changes to the NOS Design System.
        </p>
      </div>

      <ChangelogList entries={changelogEntries} />
    </div>
  )
}
