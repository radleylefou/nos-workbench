export const auditPromptTemplate = `You are converting this existing app to the NOS design system. Do NOT change any UI in this step. This is audit-and-plan only.

1. Fetch the NOS component manifest: {{MANIFEST_URL}}
   This is the complete, authoritative list of NOS components, tokens, and patterns. Treat it as the source of truth for what exists. Never guess a component or token name - if it is not in the manifest, it does not exist in NOS.

2. Inventory this project:
   - Every distinct UI element in use: buttons, inputs, selects, cards, tables, dialogs, tabs, badges, navigation, and other visible interface elements.
   - Where each UI element appears.
   - How each UI element is currently built: custom CSS, another component library, inline styles, or local components.
   - The current theme/token values: colors, spacing, radius, typography, shadow, motion, and where they are defined.

3. Map it:
   - Each inventoried element -> its matching NOS component in the manifest.
   - Each current token -> its matching NOS token variable or scale in the manifest.

4. Write your findings to a file named CONVERSION_PLAN.md at the project root, with three sections:
   - "Component mapping": table of existing element -> NOS component -> import path -> notes on prop/markup differences.
   - "Token mapping": existing token -> NOS token variable or scale -> value.
   - "Needs review": anything with no clean NOS equivalent. Do NOT invent a NOS component to fill these - list them for a human to decide.

5. Stop after writing the file. Do not modify any app code. Tell me the plan is ready and ask me to review CONVERSION_PLAN.md before continuing.`

