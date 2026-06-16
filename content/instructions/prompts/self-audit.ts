export const selfAuditPromptTemplate = `Before you hand this back, run the NOS self-audit on your own output. Do not present a draft you have not audited.

Go through each item, mark it pass or fail, and fix every fail before declaring the chunk done:

1. Shell: uses NymblAppSidebar; no custom shell or sidebar.
2. Colour: brand purple only on primary actions, active, and selected states; no decorative accent chrome on cards.
3. Tokens: all colours, spacing, radius, shadow, and motion come from NOS tokens in {{CONTEXT_FILE}}; nothing hardcoded.
4. Components: every surface uses the correct NOS component per the "Choosing between similar components" guide; nothing hand-built duplicates an existing NOS component. When unsure, re-check the manifest {{MANIFEST_URL}} whenToUse field.
5. States: every list, table, and data surface has empty, loading, and error states.
6. Motion: transitions use motion tokens and animate transform/opacity only; no hover lift on cards or surfaces.
7. Theme: no next-themes, ThemeProvider, or dark mode.
8. Screenshots: desktop and mobile reviewed for this chunk.

Report the result: state "self-audit passed" or list each item you fixed. Then show me the chunk in the browser.`
