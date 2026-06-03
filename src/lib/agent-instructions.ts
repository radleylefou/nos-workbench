import {
  assemble,
  baseMarkdown,
  designPrinciplesMarkdown,
  projectNewFragment,
} from "@content/instructions"

export const starterPrompt = assemble("new", "other").markdown

export const prdBuildPlanPrompt = `${projectNewFragment.markdown}

Use the app PRD and NOS workbench prompt to create a build plan before coding.

Required workflow:
1. Read the PRD in full.
2. Inspect the existing app or repo if one exists.
3. Review the NOS workbench for components, patterns, and tokens that map to the PRD.
4. Produce SPEC.md or an equivalent build plan.
5. Wait for approval before implementing.`

export const buildPlanTemplate = String.raw`# SPEC.md

## Product Summary
- App name:
- Audience:
- Core job:
- Goals:
- Non-goals:

## Routes and Screens
| Route | Screen | Purpose | Primary NOS components |
| --- | --- | --- | --- |
| / |  |  |  |

## Core Flows
1.
2.
3.

## Data Model and States
- Entities:
- Sample data:
- Permissions:
- Empty states:
- Loading states:
- Error states:
- Success states:

## NOS Mapping
- Components to reuse:
- Patterns to reuse:
- Tokens to reference:
- Components that may need to be created:

## Build Chunks
### Chunk 1: NOS compliance setup, app shell, navigation, tokens, and layout foundation
- Scope:
  - Root AGENTS.md or the tool-specific instruction file contains NOS rules.
  - docs/NOS_RULES.md or equivalent contains NOS design principles.
  - Canonical token blocks are copied verbatim from NOS.
  - NymblAppSidebar and TooltipProvider are installed.
- Acceptance checks:
  - No custom shell/sidebar exists.
  - No next-themes or dark mode setup exists.
  - No --motion-duration-* token aliases exist.
- Browser verification:

### Chunk 2: Core data model and mocked/sample states
- Scope:
- Acceptance checks:
- Browser verification:

### Chunk 3: Primary workflow screens
- Scope:
- Acceptance checks:
- Browser verification:

### Chunk 4: Secondary screens, tables, forms, and overlays
- Scope:
- Acceptance checks:
- Browser verification:

### Chunk 5: Polish, responsive pass, accessibility, and browser QA
- Scope:
- Acceptance checks:
  - Sidebar matches the App Sidebar component.
  - Brand purple is limited to primary actions and selected states.
  - Every data surface has empty/loading/error states.
- Browser verification:
  - Capture desktop and mobile screenshots.
  - Compare against the NOS workbench visual reference.`

export const agentSourceFiles = [
  {
    path: "content/instructions/base.ts",
    label: "Core NOS rules",
    description: "Canonical base fragment used by the homepage generator and Instructions section.",
    githubUrl:
      "https://github.com/radleylefou/nos-workbench/blob/main/content/instructions/base.ts",
  },
  {
    path: "content/instructions/project-new.ts",
    label: "New project flow",
    description: "SPEC-first workflow fragment for new Nymbl apps.",
    githubUrl:
      "https://github.com/radleylefou/nos-workbench/blob/main/content/instructions/project-new.ts",
  },
  {
    path: "content/instructions/project-existing.ts",
    label: "Existing project conversion",
    description: "Inventory, mapping, gap-review, token, component-swap, and visual QA workflow.",
    githubUrl:
      "https://github.com/radleylefou/nos-workbench/blob/main/content/instructions/project-existing.ts",
  },
  {
    path: "src/app/globals.css",
    label: "Token source",
    description: "Canonical CSS variables for colors, typography, radius, spacing, shadow, and motion.",
    githubUrl:
      "https://github.com/radleylefou/nos-workbench/blob/main/src/app/globals.css",
  },
] as const

export const generatedAppChecklist = [
  "Use the homepage generator to produce the right instruction file for the project type and tool.",
  "Run plan mode first and convert the PRD or existing-app inventory into SPEC.md or an equivalent build plan.",
  "Map requirements to routes, screens, data, NOS components, patterns, and tokens.",
  "Start with NOS compliance setup: instruction file, NOS rules, canonical tokens, NymblAppSidebar, and TooltipProvider.",
  "Build one approved chunk at a time and verify it in the browser before continuing.",
  "Use NOS components before creating new components.",
  "Use NOS token variables for color, spacing, radius, shadow, and motion decisions.",
  "Keep app logic separate from presentational NOS components.",
  "Confirm no custom shell/sidebar or local rewrite of an existing NOS component exists.",
  "Use the visual parity checklist before completion: sidebar match, restrained brand purple, no decorative accents, and desktop/mobile screenshots.",
] as const

export { baseMarkdown, designPrinciplesMarkdown }
