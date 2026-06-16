import type { InstructionFragment } from "./types"

export const llmClaudeCodeMarkdown = `## Environment: Claude Code

- Copy everything above and paste it into your first Claude Code message as project context. You can also save it as **CLAUDE.md** at the repo root — Claude Code reads that file automatically on every prompt so you won't need to paste it again.
- Reference component files by their path. Claude Code can run multi-step plans, so let it work through the phases in order.
- Use the hosted workbench (https://nos-workbench.vercel.app/) as the visual reference for how each component should look.`

export const llmClaudeCodeFragment: InstructionFragment = {
  id: "llm-claude-code",
  title: "Claude Code",
  markdown: llmClaudeCodeMarkdown,
  runNote:
    "Copy the context file and paste it into your first Claude Code message. Then paste each build prompt in order. Tip: save the context as CLAUDE.md at the repo root and Claude Code will load it automatically on every session — no need to paste it again.",
}
