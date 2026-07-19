# IDCA — Indonesia Dive-tourism Company Association

Astro + Tailwind CSS v4 + shadcn/ui rebuild of the IDCA marketing site, based on the
`tstslzy4.scispace.co` mockup.

## Stack

- **Astro 5** (static output) with the **React** integration for interactive islands
- **Tailwind CSS v4** — design tokens (colors, fonts, radii) live in `src/styles/global.css`
  under `@theme`, mapped to shadcn's semantic variable names so `bg-primary`,
  `text-muted-foreground`, etc. all work out of the box
- **shadcn/ui** primitives, hand-added under `src/components/ui/*` (Button, Input, Textarea,
  Select, Label, Card, Badge, Dialog, Sheet, Separator) — these were written to match what
  `npx shadcn add ...` would generate, since the shadcn registry wasn't reachable from the
  build sandbox. Once you have network access, `npx shadcn@latest add <component>` will work
  normally and slot into the existing `components.json` config.

## Getting started

```sh
npm install
npm run dev        # http://localhost:4321
npm run build       # outputs to ./dist
npm run preview     # preview the production build
```

## Project structure

```
src/
├── components/
│   ├── site/         # Page sections: Navbar, Hero, About, News, Members,
│   │                  # Destinations, Footer, plus the React islands
│   │                  # (LangToggle, MobileNav, RegisterForm)
│   └── ui/            # shadcn/ui primitives
├── layouts/
│   └── Layout.astro   # <html> shell, fonts, meta tags
├── pages/
│   └── index.astro    # Assembles all sections
└── styles/
    └── global.css     # Design tokens + bilingual CSS + signature motif utilities
```

## Notes & things to swap in before shipping

- **Logo**: `src/components/site/Logo.astro` is a placeholder SVG wordmark (wave + circle).
  Drop the real IDCA logo file into `public/` and swap the `<svg>` for an `<img>` there and
  in `Footer.astro`.
- **Bilingual toggle (ID/EN)**: implemented with `lang="id"` / `lang="en"` spans throughout
  the markup, shown/hidden via `html[data-lang]` CSS rules in `global.css`. The toggle button
  itself is `src/components/site/LangToggle.tsx`, persisted to `localStorage`. If content
  grows, consider moving copy into a `src/data/content.ts` dictionary instead of inline spans.
- **Registration form** (`src/components/site/RegisterForm.tsx`) sends submissions as a
  pre-filled WhatsApp message to the number in `WHATSAPP_NUMBER` at the top of that file —
  update it to IDCA's real secretariat number.
- **Images**: destination/member/news photos are hot-linked from Unsplash (as in the
  original mockup) — replace with real IDCA photography for production, and consider adding
  `images.unsplash.com` to your image CDN allowlist if you switch to Astro's `<Image />`
  for optimization.
- **Region filter** (Destinations section) is done with a small vanilla `<script>` rather
  than a React island, since it's simple show/hide — no build step needed for it to work.

## Design tokens

| Token | Hex | Use |
|---|---|---|
| `abyss` | `#0a2540` | Deep navy — dark sections, nav text |
| `reef` | `#0d7377` | Primary teal — links, primary buttons |
| `coral` | `#ff6f4e` | Warm accent — CTAs, highlights |
| `sand` | `#f5f0e6` | Light background |
| `ink` | `#10202e` | Body text on light backgrounds |

Fonts: **Bricolage Grotesque** (display/headlines) + **Inter** (body) + **JetBrains Mono**
(depth-gauge labels, eyebrows) — loaded via Google Fonts in `global.css`.
