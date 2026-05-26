# NOS Design Principles

## Aesthetic direction
Modern enterprise SaaS — calm, confident, data-friendly.
References: Vercel dashboard, Linear, Attio.
Not: Notion, Salesforce, consumer apps.

## Color
- Neutrals dominate. Brand purple appears on primary actions and
  active/selected states only.
- Semantic colors (success, warning, error, info) are reserved for
  their intended purpose — not for decoration.
- Do not use accent color as a decorative card treatment. Avoid colored
  top borders, side stripes, corner dots, and other ornamental status marks.
  Use badges, full-border state changes, iconography, or subtle background
  tints when status needs to be communicated.

## Typography
- Strong weight contrast: headings are semibold/bold,
  body text is regular.
- Tight line-height on data rows, relaxed on body copy.

## Motion
- Duration hierarchy:
  - Micro (hover, focus, press): `--duration-fast` (100ms)
  - Component state change: `--duration-normal` (200ms)
  - Panel/drawer: `--duration-slow` (350ms)
  - Page-level: `--duration-slower` (500ms)
- Easing:
  - `--ease-enter`: things arriving on screen
  - `--ease-exit`: things leaving (faster than enter)
  - `--ease-standard`: in-place state changes
- No bounce or spring on enterprise UI
- Scale press feedback stays between 0.97–0.99
- No decorative animation — every motion serves a purpose

## Density
Balanced — clear hierarchy with moderate whitespace.
Not spacious. Not cramped. Enterprise-appropriate.
- Larger cards and compound components use logical internal sections:
  outer card `gap-0 py-0`, primary content padding of `p-5`, and separators
  only between meaningful regions. Do not mix arbitrary `p-3`, `pb-3`, and
  `pt-0` adjustments unless the component is intentionally compact.
- Workbench previews for larger components should top-align content and avoid
  adding decorative accents that are not part of the component itself.

## Components
- Reuse before inventing
- Components are presentational — no API calls, no global state
- Every new component needs: the `.tsx` file, an export, a workbench demo
- L1 component cards must communicate type through structured content
  such as badges and metadata, never through a top accent border.
