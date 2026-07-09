export const convertPromptTemplate = `Execute CONVERSION_PLAN.md to convert this app to NOS. Rules in {{CONTEXT_FILE}}.

1. Set up the NOS foundation first: copy the NOS token block into globals.css and the NymblAppSidebar app shell exactly as specified in {{CONTEXT_FILE}}. Replace the current theme/token values using the Token mapping. Verify the app still runs.

2. Convert structural drift ONE SURFACE TYPE AT A TIME, in this order:
   shell/navigation -> tables and data surfaces -> metrics and status surfaces -> detail panels -> remaining controls and surfaces.
   For each type: replace custom implementations with the canonical NOS import from the Component mapping, then STOP and show me the result in the browser before the next type.

3. Use the import paths from the manifest. Copy canonical NOS components in; do not recreate them from memory. Valid NOS tokens on custom markup do not count as a NOS component implementation.

4. Do not touch application logic - data fetching, state, and routing stay as they are. NOS components are presentational. If a swap would require moving logic into a component, stop and flag it.

5. Skip anything under "Needs review" unless I have written a decision for it. If no canonical NOS equivalent exists for a custom sidebar, custom table/grid, semantic status tile, local pill/status system, or detail panel, keep it under "Needs review" instead of inventing a local replacement.

6. After each component type, run the visual parity checks from {{CONTEXT_FILE}} against the workbench. State the NOS component provenance for the shell, tables/data surfaces, metrics/status surfaces, and detail panels before moving on.`
