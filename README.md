# NOS Design System v3

The shared component and token library for all Nymbl apps. Use the workbench to orient your coding agent before building new internal product UI.

## Using NOS in a new Nymbl app

Start with the starter prompt on the Instructions page:

https://nos-workbench.vercel.app/workbench/instructions/agents

Paste it into your coding agent before building. The agent should use the workbench as visual reference and the repo as implementation truth.

See [`instructions/AGENTS.md`](instructions/AGENTS.md) for the full usage rules (also available in the workbench).

## Live workbench

https://nos-workbench.vercel.app

Browse every component, token set, and instruction file in one place.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to the workbench.

## Stack

- Next.js (App Router) · TypeScript · Tailwind CSS v4
- Shadcn/ui (Vega preset `bd1iR93R`, zinc base, Geist, small radius)
- Lucide icons

## Repo layout

| Path | Contents |
|---|---|
| `src/components/ui/` | Canonical NOS component implementations |
| `src/app/globals.css` | Token definitions and CSS variables |
| `instructions/AGENTS.md` | Rules for AI coders building apps that consume NOS |
| `instructions/rules.md` | NOS design principles |
