export const starterPrompt = `You are building a new Nymbl internal app with the NOS Design System.

Use the hosted workbench as the visual reference: https://nos-workbench.vercel.app
Use the GitHub repo as the implementation reference: https://github.com/radleylefou/nos-workbench

Before coding:
1. Browse the workbench Components area and reuse existing NOS components before building new ones.
2. Browse Tokens before choosing colors, spacing, radius, or motion values.
3. Read instructions/AGENTS.md for composition rules and repo constraints.
4. Read instructions/rules.md for design principles.

Rules:
- Never hardcode colors, spacing, or radius values. Reference CSS variables from globals.css.
- Use existing NOS components before creating new ones.
- TypeScript and TSX only. No .jsx files.
- All transitions must use motion tokens (--duration-*, --ease-*).
- Do not install other component libraries (MUI, Chakra, Radix directly). Shadcn already wraps Radix.
- Do not use decorative chrome: no colored top borders, side stripes, corner ornaments, or decorative accent marks.

If a needed component does not exist in the workbench, build it as a Shadcn-compatible component following the existing file conventions in src/components/ui/.`

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
  "Check the workbench for an existing component before building a new one.",
  "Use NOS token variables for color, spacing, radius, and motion decisions.",
  "Keep new primitives Shadcn-compatible and place them in src/components/ui/.",
  "Use TSX only and avoid bringing in another component library.",
  "Build the first screen, verify it in browser, then continue iterating.",
] as const
