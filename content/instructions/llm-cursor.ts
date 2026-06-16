import type { InstructionFragment } from "./types"

export const llmCursorMarkdown = `## Environment: Cursor

- Copy everything above and paste it at the start of your first Cursor Composer session, or save it as **AGENTS.md** at the repo root — Cursor reads that file automatically as project context.
- If a specific rule is being ignored, paste the relevant section directly into the chat for that task.
- Use the hosted workbench (https://nos-workbench.vercel.app/) as the visual reference.`

export const llmCursorFragment: InstructionFragment = {
  id: "llm-cursor",
  title: "Cursor",
  markdown: llmCursorMarkdown,
  runNote:
    "Copy the context file and paste it into your first Cursor Composer message. Then paste each build prompt in order. Tip: save the context as AGENTS.md at the repo root and Cursor will load it automatically.",
}
