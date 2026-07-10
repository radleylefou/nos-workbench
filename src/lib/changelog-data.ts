export type ChangelogArea =
  | "tokens"
  | "components"
  | "instructions"
  | "patterns"
  | "workbench"

export type ChangelogItem = {
  text: string
  area: ChangelogArea
}

export type ChangelogSection = {
  label: string
  items: ChangelogItem[]
}

export type ChangelogEntry = {
  version: string
  date: string
  sections: ChangelogSection[]
}

export const changelogAreaLabels: Record<ChangelogArea, string> = {
  tokens: "Tokens",
  components: "Components",
  instructions: "Instructions",
  patterns: "Patterns",
  workbench: "Workbench",
}

// Newest first. Add new releases to the top of this array.
export const changelogEntries: ChangelogEntry[] = [
  {
    version: "v0.10.0",
    date: "2026-07-10",
    sections: [
      {
        label: "Removed",
        items: [
          { text: "Data Table component; Data Grid is now the sole tabular component", area: "components" },
        ],
      },
      {
        label: "Changed",
        items: [
          { text: "Swapped Data Table for Data Grid in the Portfolio Dashboard, Estimation Screen, and Reporting Admin patterns", area: "patterns" },
          { text: "Updated table-selection guidance across instruction and prompt content to a two-way Data Grid / Table choice", area: "instructions" },
        ],
      },
    ],
  },
  {
    version: "v0.9.0",
    date: "2026-07-09",
    sections: [
      {
        label: "Changed",
        items: [
          { text: "Refactored project structure and updated related flows", area: "workbench" },
        ],
      },
    ],
  },
  {
    version: "v0.8.0",
    date: "2026-06-17",
    sections: [
      {
        label: "Changed",
        items: [
          { text: "Made the PRD-to-SPEC.md flow explicit in the new-project runbook", area: "instructions" },
          { text: "Added explicit agent role framing to the NOS context file", area: "instructions" },
        ],
      },
      {
        label: "Added",
        items: [{ text: "Agent logos to onboarding flows", area: "patterns" }],
      },
    ],
  },
  {
    version: "v0.7.0",
    date: "2026-06-16",
    sections: [
      {
        label: "Added",
        items: [
          { text: "FormModal component and nested sidebar variant", area: "components" },
          { text: "Form modal product patterns", area: "patterns" },
        ],
      },
      {
        label: "Changed",
        items: [
          { text: "Updated the NOS neutral ramp to a custom purple-tinted zinc scale", area: "tokens" },
        ],
      },
    ],
  },
  {
    version: "v0.6.0",
    date: "2026-06-05",
    sections: [
      {
        label: "Added",
        items: [
          { text: "Variant-specific code snippets to workbench demos", area: "workbench" },
        ],
      },
      {
        label: "Changed",
        items: [
          { text: "Refined homepage instruction generator start cards", area: "workbench" },
        ],
      },
    ],
  },
  {
    version: "v0.5.0",
    date: "2026-06-03",
    sections: [
      {
        label: "Added",
        items: [
          { text: "Workbench instruction runbook generation", area: "instructions" },
          { text: "Five new NOS product patterns", area: "patterns" },
        ],
      },
      {
        label: "Changed",
        items: [
          { text: "Redirected home to the workbench and modalized the instruction generator", area: "workbench" },
        ],
      },
    ],
  },
  {
    version: "v0.4.0",
    date: "2026-06-02",
    sections: [
      {
        label: "Added",
        items: [
          { text: "Second-wave workflow components", area: "components" },
          { text: "NumberField component with expanded tooltip and combobox demos", area: "components" },
          { text: "Chart demos with brand ramp colors", area: "components" },
          { text: "Data grid patterns", area: "patterns" },
        ],
      },
      {
        label: "Changed",
        items: [
          { text: "Expanded workbench demos", area: "workbench" },
          { text: "Aligned Blocks & Patterns surface consistency", area: "patterns" },
          { text: "Replaced the stepper with a reui primitive", area: "components" },
        ],
      },
    ],
  },
  {
    version: "v0.3.0",
    date: "2026-06-01",
    sections: [
      {
        label: "Added",
        items: [{ text: "Semantic color ramps", area: "tokens" }],
      },
      {
        label: "Changed",
        items: [{ text: "Updated NOS guidance", area: "instructions" }],
      },
    ],
  },
  {
    version: "v0.2.0",
    date: "2026-05-27",
    sections: [
      {
        label: "Added",
        items: [
          { text: "NOS compliance and composition rules", area: "instructions" },
          { text: "PRD onboarding and NOS logo to workbench sidebars", area: "workbench" },
        ],
      },
      {
        label: "Removed",
        items: [
          { text: "fancy-button component", area: "components" },
          { text: "The workspace shell pattern", area: "patterns" },
        ],
      },
      {
        label: "Changed",
        items: [{ text: "Refined workbench cards", area: "workbench" }],
      },
    ],
  },
  {
    version: "v0.1.0",
    date: "2026-05-22",
    sections: [
      {
        label: "Added",
        items: [
          { text: "Initial NOS Design System v3 — Next.js + Shadcn Vega + NOS tokens", area: "workbench" },
          { text: "120+ NOS components and Extended UI library", area: "components" },
          { text: "Product patterns workbench", area: "patterns" },
          { text: "Agent instructions flow and Agent Rules", area: "instructions" },
          { text: "Landing page", area: "workbench" },
        ],
      },
    ],
  },
]
