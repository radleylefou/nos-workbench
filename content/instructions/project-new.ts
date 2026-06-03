import type { InstructionFragment } from "./types"

export const projectNewMarkdown = `## You are starting a NEW project

1. Read \`SPEC.md\` if it exists. It defines the object model, every screen, sample data, and the component mapping for this specific app. If there is no \`SPEC.md\`, ask for one before building screens.
2. Check the workbench (https://nos-workbench.vercel.app/) for the component you need before building a new one.
3. Build Phase 1 screens first, verify in the browser, then proceed.
4. Import NOS components from the local copied component path, for example: \`import { Button } from "@/components/ui/button"\`.
5. Use Tailwind classes that reference NOS CSS variables. Never hardcode colors, spacing, radius, shadow, or motion values.`

export const projectNewFragment: InstructionFragment = {
  id: "project-new",
  title: "New project",
  markdown: projectNewMarkdown,
}
