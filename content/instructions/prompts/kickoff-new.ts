export const kickoffNewPromptTemplate = `Build this app using the NOS design system. Rules in {{CONTEXT_FILE}}.

1. Fetch the NOS manifest: {{MANIFEST_URL}} - use it to pick existing components before building anything new. Never guess component or token names.
2. Build from SPEC.md, which defines the object model, screens, data shapes, and per-screen component mapping. If SPEC.md still has unfilled placeholders, draft it from my PRD or product notes first and get my sign-off; if no source material exists, ask me for one before building.
3. Before building screens, confirm SPEC.md declares exact NOS component choices for shell, tables/data surfaces, metrics/status surfaces, forms, overlays, and detail panels. If a surface has no canonical NOS component or approved composition, keep it in "Needs review" and stop for a human decision.
4. Set up the NOS foundation: token block plus NymblAppSidebar app shell before building any screens.
5. Build one screen or chunk at a time and show me the browser result before moving on, including the component provenance for the major surfaces in that chunk.`
