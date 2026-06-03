export type ProjectType = "new" | "existing"
export type LlmTarget = "claude-code" | "replit" | "cursor" | "other"

export type InstructionFragment = {
  id: string
  title: string
  markdown: string
  runNote?: string
}

export type ContextFilename = "CLAUDE.md" | "replit.md" | "AGENTS.md"

export type InstructionContextFile = {
  filename: ContextFilename
  markdown: string
}

export type InstructionStep = {
  kind: "save" | "prompt" | "checkpoint"
  title: string
  body: string
  filename?: ContextFilename
}

export type InstructionKit = {
  contextFile: InstructionContextFile
  runNote: string
  steps: InstructionStep[]
}

export type InstructionOption<TValue extends string> = {
  value: TValue
  label: string
  description: string
}
