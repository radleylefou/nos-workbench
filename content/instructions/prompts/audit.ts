export const auditPromptTemplate = `You are converting this existing app to the NOS design system. Do NOT change any UI in this step. This is audit-and-plan only.

1. Fetch the NOS component manifest: {{MANIFEST_URL}}
   This is the authoritative index of NOS primitives, compositions, docs pages, tokens, and patterns. Respect each entry's kind, importPath, sourcePath, props, and guidance. Never guess a component or token name - if it is not in the manifest, treat it as unavailable in NOS until a human decides otherwise.

2. Inventory this project:
   - Every distinct UI element in use: buttons, inputs, selects, cards, tables, dialogs, tabs, badges, navigation, and other visible interface elements.
   - Where each UI element appears.
   - The component provenance for each visible surface: canonical NOS import, local custom component, raw HTML, inline styles, or third-party UI.
   - How each UI element is currently built: custom CSS, another component library, inline styles, local components, or canonical NOS components.
   - The current theme/token values: colors, spacing, radius, typography, shadow, motion, and where they are defined.

3. Map it:
   - Each inventoried element -> current provenance -> matching NOS component in the manifest -> import path.
   - Each current token -> its matching NOS token variable or scale in the manifest.
   - For tables, choose \`DataGrid\` or \`Table\` based on the manifest's \`whenToUse\` field; do not label all tables generically.
   - For metrics, choose \`StatCard\` or an approved \`MetricPanels\` composition; if the app uses semantic status tiles with no NOS equivalent, list them under "Needs review."

4. Write your findings to a file named CONVERSION_PLAN.md at the project root, with four sections:
   - "Component mapping": table of existing element -> current provenance -> NOS component -> import path -> notes on prop/markup differences.
   - "Token mapping": existing token -> NOS token variable or scale -> value.
   - "Structural drift": sidebars/app shells, tables/data surfaces, metrics/KPI rows, badges/status cells/health indicators, and detail panels that are custom or only NOS-ish.
   - "Needs review": anything with no clean NOS equivalent. Do NOT invent a NOS component to fill these - list them for a human to decide.

5. Stop after writing the file. Do not modify any app code. Tell me the plan is ready and ask me to review CONVERSION_PLAN.md before continuing.`
