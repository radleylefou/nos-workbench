export const specTemplateMarkdown = `# SPEC.md - <App name>

This is the build contract for the app. If you have a PRD, product brief, or rough notes, paste them to your agent and have it fill out this template from that source; otherwise complete each section yourself. Either way, a human must review and approve the finished SPEC.md before the build prompt runs - it is the source of truth, not the PRD. The agent reads this file to know the object model, every screen, sample data, and which NOS component each surface uses. Do not leave placeholders.

> **Source material:** If a PRD or brief was provided, populate every section below from it and flag anything the source does not specify rather than inventing it. If no source was provided, ask for one or fill the template in manually before building.

## 1. Overview

- **What this app does:** <one or two sentences>
- **Primary users:** <who uses it and what they are trying to accomplish>
- **Modules / areas:** <top-level sections of the app, e.g. Dashboard, Accounts, Settings>

## 2. Object model

List every domain entity, its fields, and how entities relate. This is the source of truth for data shapes and screens.

| Entity | Fields (name: type) | Relationships |
| --- | --- | --- |
| <Account> | id: string, name: string, status: "active" \\| "churned", mrr: number | has many Contacts |
| <Contact> | id: string, name: string, email: string, accountId: string | belongs to Account |

## 3. Screen list

Every screen the app needs, in build order. Group by phase so the agent builds one approved chunk at a time.

### Phase 1
| Screen | Route | Purpose | Shell pattern |
| --- | --- | --- | --- |
| <Accounts list> | /accounts | Browse and filter accounts | Standard page |
| <Account detail> | /accounts/[id] | View one account with related contacts | Detail panel |

### Phase 2
| Screen | Route | Purpose | Shell pattern |
| --- | --- | --- | --- |
| <Settings> | /settings | Manage workspace preferences | Settings page |

## 4. Data shapes

For each screen, the exact data it renders. Use realistic sample rows so the agent can build true-to-life states.

\`\`\`ts
// Accounts list
type AccountRow = {
  id: string          // shown as IdChip, e.g. ACC-014
  name: string
  status: "active" | "pending" | "churned"  // shown as StatusBadge
  owner: { name: string; avatarUrl?: string } // shown as Avatar
  mrr: number         // shown as a numeric column
}
\`\`\`

## 5. Per-screen component mapping

For each screen, map every surface to a specific NOS component. Pick the precise component using the "Choosing between similar components" guide in the context file and the manifest's \`whenToUse\` field. Never invent a component that is not in the manifest.

| Screen | Surface | NOS component |
| --- | --- | --- |
| Accounts list | Page header + primary action | Page header + \`Button\` |
| Accounts list | KPI row | 3-4 \`StatCard\` |
| Accounts list | Table | \`DataTable\` with \`StatusBadge\`, \`IdChip\`, \`Avatar\` |
| Accounts list | Empty / loading / error | \`Empty\` / \`Skeleton\` / \`Alert\` |
| Account detail | Record panel | \`Sheet\` or detail column |

## 6. Required states

Confirm every data surface defines all three. The agent must build these, not just the happy path.

- **Empty:** <what the user sees with no data, and the call to action>
- **Loading:** <skeleton shape matching the loaded layout>
- **Error:** <error message and retry action>

## 7. Out of scope

List anything explicitly NOT being built so the agent does not invent it.

- <e.g. authentication, billing, real API integration>
`
