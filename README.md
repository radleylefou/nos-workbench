# NOS Design System v3

The shared component and token library for all Nymbl apps. Drop the `ui/` folder and token variables into any Next.js project and start building with the full NOS visual language.

## Using NOS in a new Nymbl app

1. Copy `src/components/ui/` into your project's `src/components/ui/`
2. Copy the NOS token block from `src/app/globals.css` into your project's `globals.css`
3. Import and use: `import { Button } from "@/components/ui/button"`

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
| `src/components/ui/` | All NOS components — copy this into your app |
| `src/app/globals.css` | Token definitions — copy the NOS blocks into your app |
| `instructions/AGENTS.md` | Rules for AI coders building apps that consume NOS |
| `instructions/rules.md` | NOS design principles |
