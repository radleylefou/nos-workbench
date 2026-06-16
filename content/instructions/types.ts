export type ProjectType = "new" | "existing"
export type LlmTarget = "claude-code" | "codex" | "replit" | "cursor" | "other"

export type InstructionFragment = {
  id: string
  title: string
  markdown: string
  runNote?: string
}

export type ContextFilename = "CLAUDE.md" | "replit.md" | "AGENTS.md"

export type StepFilename = ContextFilename | "SPEC.md"

export type InstructionContextFile = {
  filename: ContextFilename
  markdown: string
}

export type InstructionStep = {
  kind: "save" | "prompt" | "checkpoint"
  title: string
  body: string
  filename?: StepFilename
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
  logo?: {
    src: string
    alt: string
  }
}
