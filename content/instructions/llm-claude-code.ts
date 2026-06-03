import type { InstructionFragment } from "./types"

export const llmClaudeCodeMarkdown = `## Environment: Claude Code

- Save everything above as **CLAUDE.md** at the root of your repo. Claude Code reads \`CLAUDE.md\` automatically on every prompt; you do not need to paste it each time.
- Reference component files by their path. Claude Code can run multi-step plans, so let it work through the phases in order.
- Use the hosted workbench (https://nos-workbench.vercel.app/) as the visual reference for how each component should look.`

export const llmClaudeCodeFragment: InstructionFragment = {
  id: "llm-claude-code",
  title: "Claude Code",
  markdown: llmClaudeCodeMarkdown,
  runNote:
    "Paste each prompt into Claude Code. It reads CLAUDE.md automatically and can work through the steps. It can fetch the manifest URL directly.",
}
