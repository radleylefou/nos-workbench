import type { InstructionFragment } from "./types"

export const projectNewMarkdown = `## You are starting a NEW project

1. Read \`SPEC.md\`. It is required and defines the object model, every screen, sample data, and the per-screen component mapping for this app. A scaffolded \`SPEC.md\` template is provided with these instructions - if it is still unfilled or missing, ask for a completed one before building any screens.
2. Check the workbench (https://nos-workbench.vercel.app/) for the component you need before building a new one.
3. Build Phase 1 screens first, verify in the browser, then proceed.
4. Import NOS components from the local copied component path, for example: \`import { Button } from "@/components/ui/button"\`.
5. Use Tailwind classes that reference NOS CSS variables. Never hardcode colors, spacing, radius, shadow, or motion values.`

export const projectNewFragment: InstructionFragment = {
  id: "project-new",
  title: "New project",
  markdown: projectNewMarkdown,
}
