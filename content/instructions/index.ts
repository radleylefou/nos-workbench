import {
  agentCoreMarkdown,
  baseFragment,
  baseMarkdown,
  designPrinciplesMarkdown,
} from "./base"
import { MANIFEST_URL, WORKBENCH_URL } from "./constants"
import { llmClaudeCodeFragment } from "./llm-claude-code"
import { llmCodexFragment } from "./llm-codex"
import { llmCursorFragment } from "./llm-cursor"
import { llmOtherFragment } from "./llm-other"
import { llmReplitFragment } from "./llm-replit"
import { auditPromptTemplate } from "./prompts/audit"
import { convertPromptTemplate } from "./prompts/convert"
import { kickoffNewPromptTemplate } from "./prompts/kickoff-new"
import { selfAuditPromptTemplate } from "./prompts/self-audit"
import { specTemplateMarkdown } from "./prompts/spec-template"
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
  llmCodexFragment,
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
    logo: {
      src: "/agent-logos/claude.png",
      alt: "Claude logo",
    },
  },
  {
    value: "codex",
    label: "Codex",
    description: "Use AGENTS.md as the open-standard project file.",
    logo: {
      src: "/agent-logos/codex.png",
      alt: "Codex logo",
    },
  },
  {
    value: "replit",
    label: "Replit",
    description: "Generate replit.md for Replit Agent context.",
    logo: {
      src: "/agent-logos/replit.png",
      alt: "Replit logo",
    },
  },
  {
    value: "cursor",
    label: "Cursor",
    description: "Use AGENTS.md as the open-standard project file.",
    logo: {
      src: "/agent-logos/cursor.png",
      alt: "Cursor logo",
    },
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
  codex: llmCodexFragment,
  replit: llmReplitFragment,
  cursor: llmCursorFragment,
  other: llmOtherFragment,
}

const filenames: Record<LlmTarget, ContextFilename> = {
  "claude-code": "CLAUDE.md",
  codex: "AGENTS.md",
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
    title: "Add your context file",
    filename,
    body: markdown,
  }

  const selfAuditStep = {
    kind: "prompt" as const,
    title: "Self-audit before sign-off",
    body: fillTemplate(selfAuditPromptTemplate, filename),
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
          selfAuditStep,
        ]
      : [
          saveStep,
          {
            kind: "save" as const,
            title: "Draft SPEC.md from your PRD",
            filename: "SPEC.md" as const,
            body: specTemplateMarkdown,
          },
          {
            kind: "prompt" as const,
            title: "Run the build",
            body: fillTemplate(kickoffNewPromptTemplate, filename),
          },
          selfAuditStep,
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
  const newCodex = assemble("new", "codex")
  const existingCodex = assemble("existing", "codex")
  const existingBase = existingReplit.contextFile.markdown.split("\n\n---\n\n")[0]
  const newBase = newClaude.contextFile.markdown.split("\n\n---\n\n")[0]
  const hasNoPlaceholders = [existingReplit, newClaude, newCursor, existingOther, newCodex, existingCodex].every(
    (kit) =>
      !kit.contextFile.markdown.includes("{{") &&
      !kit.runNote.includes("{{") &&
      kit.steps.every((step) => !step.body.includes("{{")),
  )

  return {
    existingReplit:
      existingReplit.contextFile.filename === "replit.md" &&
      existingReplit.steps.map((step) => step.kind).join(" > ") ===
        "save > prompt > checkpoint > prompt > prompt" &&
      existingReplit.steps[1]?.title === "Run the audit" &&
      existingReplit.steps[3]?.title === "Run the conversion" &&
      existingReplit.steps[4]?.title === "Self-audit before sign-off" &&
      existingReplit.contextFile.markdown.includes("Environment: Replit"),
    newClaude:
      newClaude.contextFile.filename === "CLAUDE.md" &&
      newClaude.steps.map((step) => step.kind).join(" > ") ===
        "save > save > prompt > prompt" &&
      newClaude.steps[1]?.filename === "SPEC.md" &&
      newClaude.steps[2]?.title === "Run the build" &&
      newClaude.steps[3]?.title === "Self-audit before sign-off" &&
      newClaude.contextFile.markdown.includes("Environment: Claude Code"),
    cursor:
      newCursor.contextFile.filename === "AGENTS.md" &&
      newCursor.runNote.includes("Cursor"),
    codex:
      newCodex.contextFile.filename === "AGENTS.md" &&
      existingCodex.contextFile.filename === "AGENTS.md" &&
      newCodex.contextFile.markdown.includes("Environment: Codex") &&
      existingCodex.contextFile.markdown.includes("Environment: Codex") &&
      newCodex.runNote.includes("Codex"),
    other:
      existingOther.contextFile.filename === "AGENTS.md" &&
      existingOther.runNote.includes("download nos-manifest.json"),
    sharedBase: existingBase === newBase,
    placeholdersResolved: hasNoPlaceholders,
  }
}
