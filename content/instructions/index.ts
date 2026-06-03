import {
  agentCoreMarkdown,
  baseFragment,
  baseMarkdown,
  designPrinciplesMarkdown,
} from "./base"
import { llmClaudeCodeFragment } from "./llm-claude-code"
import { llmCursorFragment } from "./llm-cursor"
import { llmOtherFragment } from "./llm-other"
import { llmReplitFragment } from "./llm-replit"
import { projectExistingFragment } from "./project-existing"
import { projectNewFragment } from "./project-new"
import type {
  InstructionAssembly,
  InstructionFragment,
  InstructionOption,
  LlmTarget,
  ProjectType,
} from "./types"

export type {
  InstructionAssembly,
  InstructionFragment,
  InstructionOption,
  LlmTarget,
  ProjectType,
} from "./types"

export {
  agentCoreMarkdown,
  baseFragment,
  baseMarkdown,
  designPrinciplesMarkdown,
  llmClaudeCodeFragment,
  llmCursorFragment,
  llmOtherFragment,
  llmReplitFragment,
  projectExistingFragment,
  projectNewFragment,
}

export const projectTypeOptions = [
  {
    value: "new",
    label: "New project",
    description: "Starting fresh from a spec or PRD.",
  },
  {
    value: "existing",
    label: "Existing project",
    description: "Convert an app that already exists to NOS.",
  },
] satisfies InstructionOption<ProjectType>[]

export const llmOptions = [
  {
    value: "claude-code",
    label: "Claude Code",
    description: "Use CLAUDE.md as persistent project context.",
  },
  {
    value: "replit",
    label: "Replit",
    description: "Generate replit.md for Replit Agent context.",
  },
  {
    value: "cursor",
    label: "Cursor",
    description: "Use AGENTS.md as the open-standard project file.",
  },
  {
    value: "other",
    label: "Other",
    description: "Use AGENTS.md or paste the instructions inline.",
  },
] satisfies InstructionOption<LlmTarget>[]

const projectFragments: Record<ProjectType, InstructionFragment> = {
  new: projectNewFragment,
  existing: projectExistingFragment,
}

const llmFragments: Record<LlmTarget, InstructionFragment> = {
  "claude-code": llmClaudeCodeFragment,
  replit: llmReplitFragment,
  cursor: llmCursorFragment,
  other: llmOtherFragment,
}

const filenames: Record<LlmTarget, InstructionAssembly["filename"]> = {
  "claude-code": "CLAUDE.md",
  replit: "replit.md",
  cursor: "AGENTS.md",
  other: "AGENTS.md",
}

export function getProjectTypeLabel(projectType: ProjectType) {
  return projectTypeOptions.find((option) => option.value === projectType)?.label ?? projectType
}

export function getLlmLabel(llm: LlmTarget) {
  return llmOptions.find((option) => option.value === llm)?.label ?? llm
}

export function assemble(projectType: ProjectType, llm: LlmTarget): InstructionAssembly {
  const fragments = [baseFragment, projectFragments[projectType], llmFragments[llm]]
  const markdown = fragments.map((fragment) => fragment.markdown.trim()).join("\n\n---\n\n")

  return {
    markdown,
    filename: filenames[llm],
  }
}

export function verifyInstructionAssembly() {
  const existingReplit = assemble("existing", "replit")
  const newClaude = assemble("new", "claude-code")
  const newCursor = assemble("new", "cursor")
  const existingOther = assemble("existing", "other")
  const existingBase = existingReplit.markdown.split("\n\n---\n\n")[0]
  const newBase = newClaude.markdown.split("\n\n---\n\n")[0]

  return {
    existingReplit:
      existingReplit.filename === "replit.md" &&
      existingReplit.markdown.includes("Step 7 - Verify visually against the workbench") &&
      existingReplit.markdown.includes("Environment: Replit"),
    newClaude:
      newClaude.filename === "CLAUDE.md" &&
      newClaude.markdown.includes("SPEC.md") &&
      newClaude.markdown.includes("Environment: Claude Code"),
    cursor:
      newCursor.filename === "AGENTS.md" &&
      newCursor.markdown.includes("Environment: Cursor"),
    other:
      existingOther.filename === "AGENTS.md" &&
      existingOther.markdown.includes("Environment: Other / generic"),
    sharedBase: existingBase === newBase,
  }
}
