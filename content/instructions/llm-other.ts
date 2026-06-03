import type { InstructionFragment } from "./types"

export const llmOtherMarkdown = `## Environment: Other / generic

- Save everything above as **AGENTS.md** at the repo root. This is the cross-tool open standard.
- If your tool does not read \`AGENTS.md\` automatically, paste the full contents into your first prompt.
- Use the hosted workbench (https://nos-workbench.vercel.app/) as the visual reference.`

export const llmOtherFragment: InstructionFragment = {
  id: "llm-other",
  title: "Other / generic",
  markdown: llmOtherMarkdown,
}
