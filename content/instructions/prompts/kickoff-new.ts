export const kickoffNewPromptTemplate = `Build this app using the NOS design system. Rules in {{CONTEXT_FILE}}.

1. Fetch the NOS manifest: {{MANIFEST_URL}} - use it to pick existing components before building anything new. Never guess component or token names.
2. If a SPEC.md exists in this project, build from it. If not, ask me for the screen list before building.
3. Set up the NOS foundation: token block plus NymblAppSidebar app shell before building any screens.
4. Build one screen or chunk at a time and show me the browser result before moving on.`

