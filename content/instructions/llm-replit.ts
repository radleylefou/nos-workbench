import type { InstructionFragment } from "./types"

export const llmReplitMarkdown = `## Environment: Replit (Agent)

- Save everything above as **replit.md** at the project root. Replit's Agent reads \`replit.md\` for project context and coding style.
- Caveat: Replit's Agent can rewrite \`replit.md\` as the project evolves, so do not rely on the file alone. Keep the hosted workbench URL (https://nos-workbench.vercel.app/) as the durable source of truth and tell the Agent to fetch it for visual reference.
- Replit projects do not cleanly reference an external repo path. Copy the NOS \`components/ui/\` folder and the NOS token block from \`globals.css\` into your Replit project, then import components locally, for example: \`import { Button } from "@/components/ui/button"\`.`

export const llmReplitFragment: InstructionFragment = {
  id: "llm-replit",
  title: "Replit",
  markdown: llmReplitMarkdown,
  runNote:
    "Paste each prompt into the Replit Agent; it will queue the steps. The explicit stop lines keep the Agent from converting everything at once. Replit can web-fetch the manifest URL. Note: the Agent may rewrite replit.md over time, so the manifest URL and the workbench are the durable references.",
}
