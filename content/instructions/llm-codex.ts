import type { InstructionFragment } from "./types"

export const llmCodexMarkdown = `## Environment: Codex (CLI)

- Copy everything above and paste it into your first Codex message as project context. You can also save it as **AGENTS.md** at the repo root — Codex reads that open-standard file automatically as project context.
- If a specific rule is being ignored, paste the relevant section directly into the chat for that task.
- Use the hosted workbench (https://nos-workbench.vercel.app/) as the durable visual reference — it is the source of truth even if AGENTS.md drifts as the project evolves.`

export const llmCodexFragment: InstructionFragment = {
  id: "llm-codex",
  title: "Codex",
  markdown: llmCodexMarkdown,
  runNote:
    "Copy the context file and paste it into your first Codex message. Then paste each build prompt in order. Tip: save the context as AGENTS.md at the repo root and Codex will load it automatically as project context.",
}
