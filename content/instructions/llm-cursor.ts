import type { InstructionFragment } from "./types"

export const llmCursorMarkdown = `## Environment: Cursor

- Save everything above as **AGENTS.md** at the repo root. Cursor reads the \`AGENTS.md\` open standard as project context.
- If a specific rule is being ignored, paste the relevant section directly into the chat for that task.
- Use the hosted workbench (https://nos-workbench.vercel.app/) as the visual reference.`

export const llmCursorFragment: InstructionFragment = {
  id: "llm-cursor",
  title: "Cursor",
  markdown: llmCursorMarkdown,
}
