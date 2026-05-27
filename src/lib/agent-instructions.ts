export const starterPrompt = `You are building a new Nymbl internal app with the NOS Design System.

Use the hosted workbench as the visual reference: https://nos-workbench.vercel.app
Use the GitHub repo as the implementation reference: https://github.com/radleylefou/nos-workbench

Inputs to include:
1. This starter prompt.
2. The app PRD, pasted or attached in full.
3. Any existing repo, API, data, auth, or deployment constraints.

First response:
- Enter plan mode before coding.
- Read the app PRD and convert it into SPEC.md or an equivalent app build plan.
- Ask only for blocking clarification that cannot be resolved from the PRD or repo.
- Do not write implementation code until the build plan is approved.

The build plan must include:
- Product summary, users, goals, and non-goals.
- Routes, screens, and primary user flows.
- Data model, sample states, empty/loading/error states, and permissions if relevant.
- NOS component, pattern, and token mapping for each screen.
- Ordered build chunks with acceptance checks.
- Browser verification steps after each chunk.

Before coding:
1. Get the build plan approved.
2. Browse the workbench Components area and reuse existing NOS components before building new ones.
3. Browse Tokens before choosing colors, spacing, radius, or motion values.
4. Read instructions/AGENTS.md for composition rules and repo constraints.
5. Read instructions/rules.md for design principles.

Rules:
- Never hardcode colors, spacing, or radius values. Reference CSS variables from globals.css.
- Use existing NOS components before creating new ones.
- TypeScript and TSX only. No .jsx files.
- All transitions must use motion tokens (--duration-*, --ease-*).
- Do not install other component libraries (MUI, Chakra, Radix directly). Shadcn already wraps Radix.
- Do not use decorative chrome: no colored top borders, side stripes, corner ornaments, or decorative accent marks.

If a needed component does not exist in the workbench, build it as a Shadcn-compatible component following the existing file conventions in src/components/ui/.`

export const prdBuildPlanPrompt = `Use the app PRD and NOS workbench prompt to create a build plan before coding.

Required workflow:
1. Read the PRD in full.
2. Inspect the existing app/repo if one exists.
3. Review the NOS workbench for components, patterns, and tokens that map to the PRD.
4. Produce SPEC.md or an equivalent build plan.
5. Wait for approval before implementing.

The build plan must include:
- Product summary.
- Primary users and jobs to be done.
- Goals, non-goals, and success criteria.
- Routes, screens, and user flows.
- Data model, sample data, permissions, and integration assumptions.
- Empty, loading, error, and success states.
- NOS component and token mapping by screen.
- Ordered implementation chunks with acceptance checks.
- Browser verification steps after each chunk.

Default chunks:
1. App shell, navigation, tokens, and layout foundation.
2. Core data model and mocked/sample states.
3. Primary workflow screens.
4. Secondary screens, tables, forms, and overlays.
5. Polish, responsive pass, accessibility, and browser QA.`

export const buildPlanTemplate = `# SPEC.md

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
### Chunk 1: App shell, navigation, tokens, layout foundation
- Scope:
- Acceptance checks:
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
- Browser verification:`

export const agentSourceFiles = [
  {
    path: "instructions/AGENTS.md",
    label: "Agent rules",
    description: "How coding agents should consume NOS and structure new Nymbl apps.",
    githubUrl:
      "https://github.com/radleylefou/nos-workbench/blob/main/instructions/AGENTS.md",
  },
  {
    path: "instructions/rules.md",
    label: "Composition rules",
    description: "Design principles for layout, color, spacing, components, and polish.",
    githubUrl:
      "https://github.com/radleylefou/nos-workbench/blob/main/instructions/rules.md",
  },
  {
    path: "src/app/globals.css",
    label: "Token source",
    description: "Canonical CSS variables for colors, typography, radius, spacing, and motion.",
    githubUrl:
      "https://github.com/radleylefou/nos-workbench/blob/main/src/app/globals.css",
  },
] as const

export const generatedAppChecklist = [
  "Include the app PRD with the starter prompt so the agent has product intent and scope.",
  "Run plan mode first and convert the PRD into SPEC.md or an equivalent build plan.",
  "Map PRD requirements to routes, screens, data, NOS components, patterns, and tokens.",
  "Break implementation into approved chunks with acceptance checks.",
  "Build one chunk at a time and verify it in the browser before continuing.",
  "Check the workbench for an existing component before building a new one.",
  "Use NOS token variables for color, spacing, radius, and motion decisions.",
  "Keep new primitives Shadcn-compatible and place them in src/components/ui/.",
  "Use TSX only and avoid bringing in another component library.",
] as const
