import {
  assemble,
  baseMarkdown,
  designPrinciplesMarkdown,
  projectNewFragment,
} from "@content/instructions"

export const starterPrompt = assemble("new", "other").contextFile.markdown

export const prdBuildPlanPrompt = `${projectNewFragment.markdown}

Use the app PRD and NOS workbench prompt to create a build plan before coding.

Required workflow:
1. Read the PRD in full.
2. Inspect the existing app or repo if one exists.
3. Review the NOS workbench for components, patterns, and tokens that map to the PRD.
4. Produce SPEC.md or an equivalent build plan with exact NOS component provenance for shell, tables/data surfaces, metrics/status surfaces, forms, overlays, and detail panels.
5. Wait for approval before implementing.`

export const buildPlanTemplate = String.raw`# SPEC.md

## Product Summary
- App name:
- Audience:
- Core job:
- Goals:
- Non-goals:

## Routes and Screens
| Route | Screen | Purpose | Shell pattern | Primary NOS components |
| --- | --- | --- | --- | --- |
| / |  |  |  |  |

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
- Component provenance by surface:
- Components to reuse with import paths:
- Patterns to reuse:
- Tokens to reference:
- Needs review before build:

## Build Chunks
### Chunk 1: NOS compliance setup, app shell, navigation, tokens, and layout foundation
- Scope:
  - Root AGENTS.md or the tool-specific instruction file contains NOS rules.
  - docs/NOS_RULES.md or equivalent contains NOS design principles.
  - Canonical token blocks are copied verbatim from NOS.
  - NymblAppSidebar and TooltipProvider are installed.
- Acceptance checks:
  - No custom shell/sidebar exists.
  - Shell provenance is NymblAppSidebar, NymblEngagementSidebar, or NymblNestedSidebar.
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
  - Tables/data surfaces use DataGrid, DataTable, or Table according to NOS whenToUse guidance.
  - Metrics/status surfaces use StatCard, MetricPanels, StatusBadge, HealthIndicator, Badge, or another named NOS primitive.
  - Detail panels use the approved detail-column, Sheet, or Drawer pattern.
- Browser verification:

### Chunk 5: Polish, responsive pass, accessibility, and browser QA
- Scope:
- Acceptance checks:
  - Sidebar matches the App Sidebar component.
  - Major surfaces can be traced to canonical NOS components, not custom NOS-ish markup.
  - Brand purple is limited to primary actions and selected states.
  - Every data surface has empty/loading/error states.
- Browser verification:
  - Capture desktop and mobile screenshots.
  - Compare against the NOS workbench visual reference.`

export const agentSourceFiles = [
  {
    path: "content/instructions/base.ts",
    label: "Core NOS rules",
    description: "Canonical base fragment used by the workbench instruction generator and Instructions section.",
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
  "Use the workbench instruction generator to produce the right instruction file for the project type and tool.",
  "Run plan mode first and convert the PRD or existing-app inventory into SPEC.md or an equivalent build plan.",
  "Map requirements to routes, screens, data, NOS components, patterns, tokens, and component provenance.",
  "Start with NOS compliance setup: instruction file, NOS rules, canonical tokens, NymblAppSidebar, and TooltipProvider.",
  "Build one approved chunk at a time and verify it in the browser before continuing.",
  "Use canonical NOS components before creating new components; valid NOS tokens on custom markup are not enough.",
  "Use NOS token variables for color, spacing, radius, shadow, and motion decisions.",
  "Keep app logic separate from presentational NOS components.",
  "Confirm no custom shell/sidebar, raw table shell, hand-built metric card, local pill system, or local rewrite of an existing NOS component exists.",
  "List unmatched semantic status tiles, detail panels, or custom data surfaces under Needs review before implementation.",
  "Use the visual parity checklist before completion: sidebar match, component provenance for tables/metrics/detail panels, restrained brand purple, no decorative accents, and desktop/mobile screenshots.",
] as const

export { baseMarkdown, designPrinciplesMarkdown }
