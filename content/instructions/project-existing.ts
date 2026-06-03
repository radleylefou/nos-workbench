import type { InstructionFragment } from "./types"

export const projectExistingMarkdown = `## You are working in an EXISTING project - convert it to NOS

Do NOT start from a PRD. This app already exists. Your job is to bring its UI in line with the NOS design system without rewriting its functionality. Reference the live workbench at https://nos-workbench.vercel.app/ throughout.

### Step 1 - Inventory before changing anything

Scan the existing app and produce a component inventory: list every distinct UI element in use (buttons, inputs, selects, cards, tables, modals/dialogs, tabs, badges, navigation, etc.), where each appears, and how it is currently built (custom CSS, another component library, inline styles). Output this as a table. Do not change any code in this step.

### Step 2 - Map each element to a NOS equivalent

For every item in the inventory, find the matching NOS component in the workbench. Produce a mapping table: existing element -> NOS component -> notes on prop or markup differences. Reference the workbench, not your assumptions, for what NOS components exist.

### Step 3 - Flag gaps, do not invent

Where an existing element has no NOS equivalent, list it under "Needs review." Do NOT silently create a new component to fill the gap. Surface it so a designer can decide whether to add it to NOS or replace it with an existing pattern.

### Step 4 - Migrate the token layer first

Before swapping components, replace hardcoded colors, spacing, and radius values with the NOS CSS variables from \`globals.css\` (copy the NOS token block in if it is not already present). This alone reskins the app toward NOS and surfaces conflicts early.

### Step 5 - Swap one component type at a time

Replace all instances of a single element type (for example, every button -> NOS \`Button\`), verify in the browser, then commit, before moving to the next type. Never bulk-replace the whole app in one pass.

Suggested order: buttons -> inputs/selects -> cards/surfaces -> tables -> dialogs/overlays -> navigation.

### Step 6 - Preserve application logic

NOS components are presentational. Only swap the presentational layer. Leave data fetching, state management, and routing intact. If a swap would require moving logic into a component, stop and flag it instead.

### Step 7 - Verify visually against the workbench

After each component type is swapped, compare the result against that component's page in the workbench. Colors, radius, spacing, and motion should match.`

export const projectExistingFragment: InstructionFragment = {
  id: "project-existing",
  title: "Existing project",
  markdown: projectExistingMarkdown,
}
