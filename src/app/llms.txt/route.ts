import { MANIFEST_URL, WORKBENCH_URL } from "@content/instructions"

export const dynamic = "force-static"

export function GET() {
  const body = [
    "NOS Workbench",
    "",
    "NOS is the canonical design-system reference for Nymbl internal product UI.",
    "Use the machine-readable manifest as the source of truth for available primitives, compositions, docs pages, tokens, patterns, import paths, source paths, and prop surfaces.",
    "Check each manifest entry's kind before importing: primitive entries are direct UI components, while composition and docs entries are implementation references.",
    "Use the hosted workbench as the visual reference for implementation parity.",
    "",
    `Manifest: ${MANIFEST_URL}`,
    `Workbench: ${WORKBENCH_URL}/workbench`,
    "",
    "Recommended workflow:",
    "1. Fetch the manifest before choosing or naming NOS components.",
    "2. Save the generated rules file from the workbench Instruction Generator.",
    "3. Run the generated prompts in order for new builds or existing-app conversions.",
  ].join("\n")

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  })
}
