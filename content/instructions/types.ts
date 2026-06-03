export type ProjectType = "new" | "existing"
export type LlmTarget = "claude-code" | "replit" | "cursor" | "other"

export type InstructionFragment = {
  id: string
  title: string
  markdown: string
}

export type InstructionAssembly = {
  markdown: string
  filename: "CLAUDE.md" | "replit.md" | "AGENTS.md"
}

export type InstructionOption<TValue extends string> = {
  value: TValue
  label: string
  description: string
}
