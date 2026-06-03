import {
  agentCoreMarkdown,
  baseFragment,
  baseMarkdown,
  designPrinciplesMarkdown,
} from "./base"
import { MANIFEST_URL, WORKBENCH_URL } from "./constants"
import { llmClaudeCodeFragment } from "./llm-claude-code"
import { llmCursorFragment } from "./llm-cursor"
import { llmOtherFragment } from "./llm-other"
import { llmReplitFragment } from "./llm-replit"
import { auditPromptTemplate } from "./prompts/audit"
import { convertPromptTemplate } from "./prompts/convert"
import { kickoffNewPromptTemplate } from "./prompts/kickoff-new"
import { projectExistingFragment } from "./project-existing"
import { projectNewFragment } from "./project-new"
import type {
  ContextFilename,
  InstructionFragment,
  InstructionKit,
  InstructionOption,
  LlmTarget,
  ProjectType,
} from "./types"

export type {
  ContextFilename,
  InstructionFragment,
  InstructionContextFile,
  InstructionKit,
  InstructionOption,
  InstructionStep,
  LlmTarget,
  ProjectType,
} from "./types"

export {
  agentCoreMarkdown,
  baseFragment,
  baseMarkdown,
  designPrinciplesMarkdown,
  MANIFEST_URL,
  WORKBENCH_URL,
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

const filenames: Record<LlmTarget, ContextFilename> = {
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

function fillTemplate(template: string, contextFile: ContextFilename) {
  return template
    .replaceAll("{{CONTEXT_FILE}}", contextFile)
    .replaceAll("{{MANIFEST_URL}}", MANIFEST_URL)
}

function createContextMarkdown(projectType: ProjectType, llm: LlmTarget) {
  const fragments = [baseFragment, projectFragments[projectType], llmFragments[llm]]
  return fragments.map((fragment) => fragment.markdown.trim()).join("\n\n---\n\n")
}

export function assemble(projectType: ProjectType, llm: LlmTarget): InstructionKit {
  const filename = filenames[llm]
  const markdown = createContextMarkdown(projectType, llm)
  const llmFragment = llmFragments[llm]
  const contextFile = { filename, markdown }

  const saveStep = {
    kind: "save" as const,
    title: "Save your rules file",
    filename,
    body: markdown,
  }

  const steps =
    projectType === "existing"
      ? [
          saveStep,
          {
            kind: "prompt" as const,
            title: "Run the audit",
            body: fillTemplate(auditPromptTemplate, filename),
          },
          {
            kind: "checkpoint" as const,
            title: "Review the plan",
            body:
              "Open CONVERSION_PLAN.md and review the Component mapping, Token mapping, and Needs review sections before continuing. Add human decisions for anything under Needs review. Do not run the conversion prompt until the plan is approved.",
          },
          {
            kind: "prompt" as const,
            title: "Run the conversion",
            body: fillTemplate(convertPromptTemplate, filename),
          },
        ]
      : [
          saveStep,
          {
            kind: "prompt" as const,
            title: "Run the build",
            body: fillTemplate(kickoffNewPromptTemplate, filename),
          },
        ]

  return {
    contextFile,
    runNote: llmFragment.runNote ?? "",
    steps,
  }
}

export function verifyInstructionAssembly() {
  const existingReplit = assemble("existing", "replit")
  const newClaude = assemble("new", "claude-code")
  const newCursor = assemble("new", "cursor")
  const existingOther = assemble("existing", "other")
  const existingBase = existingReplit.contextFile.markdown.split("\n\n---\n\n")[0]
  const newBase = newClaude.contextFile.markdown.split("\n\n---\n\n")[0]
  const hasNoPlaceholders = [existingReplit, newClaude, newCursor, existingOther].every(
    (kit) =>
      !kit.contextFile.markdown.includes("{{") &&
      !kit.runNote.includes("{{") &&
      kit.steps.every((step) => !step.body.includes("{{")),
  )

  return {
    existingReplit:
      existingReplit.contextFile.filename === "replit.md" &&
      existingReplit.steps.map((step) => step.kind).join(" > ") ===
        "save > prompt > checkpoint > prompt" &&
      existingReplit.steps[1]?.title === "Run the audit" &&
      existingReplit.steps[3]?.title === "Run the conversion" &&
      existingReplit.contextFile.markdown.includes("Environment: Replit"),
    newClaude:
      newClaude.contextFile.filename === "CLAUDE.md" &&
      newClaude.steps.map((step) => step.kind).join(" > ") === "save > prompt" &&
      newClaude.steps[1]?.title === "Run the build" &&
      newClaude.contextFile.markdown.includes("Environment: Claude Code"),
    cursor:
      newCursor.contextFile.filename === "AGENTS.md" &&
      newCursor.runNote.includes("Cursor"),
    other:
      existingOther.contextFile.filename === "AGENTS.md" &&
      existingOther.runNote.includes("download nos-manifest.json"),
    sharedBase: existingBase === newBase,
    placeholdersResolved: hasNoPlaceholders,
  }
}
