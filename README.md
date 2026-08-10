# Masa Madre

A digital museum and living laboratory of sourdough bread — an immersive, scroll-driven journey through 6,000 years of bread history paired with an interactive look at the fermentation science behind *masa madre*.

**Live site:** https://matiaspakua.github.io/masamadre/

## What it is

A long-form, single-page, **bilingual** experience (Spanish default · English toggle) built around two missions:

1. **A window through time** — an animated, horizontally-scrolling historical timeline from the first domesticated grain (c. 8000 BCE) to the 2020 lockdown sourdough revival.
2. **A living laboratory** — an interactive fermentation workstation where you advance a starter through its stages and watch pH, CO₂, temperature, and the two microbe populations respond — plus a baker's-percentage dough calculator and a virtual oven simulator.

**Sections:** Hero · Origins · Timeline · Laboratory · Starter Guide (7 days) · Bread families · Process (12 steps) · Composition & chemistry · The Oven · Benefits & nuance · References · Closing.

Curated, freely-licensed photography (Wikimedia Commons) runs through the ingredients, bread-family gallery, and hero.

## The experience

### A page that ferments
- **Intro curtain** — a once-per-session opening: the wordmark rises like proofing dough, flour motes settle, a "fermenting" line fills, then the curtain lifts.
- **Ambient bakery field** — a living Canvas 2-D backdrop behind the whole page: ears of wheat and grains drifting, flour dust, and CO₂ bubbles. Its accent tint lerps with the scroll (amber → ferment teal → oven ember).
- **Ferment instrument** — a glass column fixed on the page edge whose level rises with the gas, beside a live pH / gas / elapsed-hours readout. The whole page is one culture maturing as you scroll.
- **Reading instrument (nav)** — a side index that doubles as a reading aid: progress bar, active-section highlight, and the language toggle.

### Sections
- **Hero** — a kinetic split title over a glass-framed photograph.
- **Origins** — the four materials (flour, water, salt, grain) with archival images.
- **Timeline** — a horizontal "historical instrument": the section pins while ten eras scroll sideways, with parallax era numerals, a filling progress bar, and a hand-drawn sketch that draws on as you scroll.
- **Laboratory** — four fermentation stages with a live pH meter, CO₂ activity and temperature readouts, a starter jar whose bubbles scale with activity, a baker's-percentage dough calculator, and a **bread microscope** that zooms from loaf → crumb → gluten → microbes → molecule.
- **Starter guide** — a 7-day field guide to raising your own starter: a fermentation spine draws on day by day, live jars climb, and a float-test finale bobs.
- **Bread families** — five breads, from sourdough to whole wheat.
- **Process** — the 12 steps from mise en place to cooling.
- **Composition & chemistry** — gluten, starch, enzymes, and acids, with the fermentation equation encoded as lab data.
- **The oven** — the three transformations at rising temperatures, then the cooling step.
- **Benefits & nuance** — honest, evidence-backed benefits.
- **References** — a CSS 3-D flipbook whose leaves turn to reveal the bibliography: books, peer-reviewed papers, institutions, and open sources.

## Design system — "The Living Archive"

A warm-white museum/lab daylight with printed-page surfaces and ink text.

| Token | Value | Purpose |
|---|---|---|
| `paper` | `#F6F1E7` | page background (warm white) |
| `surface` | `#FFFDF8` | raised cards / panels |
| `sink` | `#EDE5D6` | deeper bands for contrast |
| `ink` | `#2A2018` | primary text |
| `ash` | `#8A7C68` | muted secondary text |
| `line` | `#E1D6C2` | hairlines, borders, dividers |
| `levain` | `#C0741A` | living-starter amber (history & craft) |
| `ember` | `#A8431E` | oven heat / crust |
| `phosphor` | `#0E7A6B` | **lab data only** — colour encodes meaning |

**Typography:** **Fraunces** (display), **Spline Sans** (body), **Space Mono** (lab readouts) — all loaded as variable fonts via `next/font`.

**Motion & accessibility:** every animation respects `prefers-reduced-motion` and falls back to a static, fully-readable state; GSAP contexts are scoped and cleaned up; content stays in the DOM for SEO and assistive tech.

## Tech stack

| Package | Version | Role |
|---|---|---|
| [Next.js](https://nextjs.org/) | 15.1.6 | App Router · static export (`output: 'export'`) |
| [React](https://react.dev/) | 19.0.0 | UI runtime |
| [TypeScript](https://www.typescriptlang.org/) | ^5.7 | strict, end-to-end type safety |
| [Tailwind CSS](https://tailwindcss.com/) | ^3.4 | utility-first design system |
| [GSAP](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/) | ^3.12 | timelines, pinned & scrub scroll, reveals |
| [Lenis](https://lenis.darkroom.engineering/) | ^1.1 | smooth scrolling, synced to GSAP's ticker |
| `next/font` | — | zero-layout-shift variable fonts |
| Canvas 2-D (custom) | — | ambient bakery field, particle loops |
| CSS | — | SVG noise grain, blend modes, clip-path wipes, CSS 3-D book flip |

> Note: `three`, `@react-three/fiber`, and `@react-three/drei` remain in `package.json` from an earlier prototype but are **not used** by the current experience — the ambient field is a custom Canvas 2-D loop.

## Project structure

```
masamadre/
├── src/
│   ├── app/               # App Router: layout, page, 404, global styles
│   ├── components/        # sections/ + lab/ widgets + ambient instruments
│   └── lib/
│       ├── content.ts     # bilingual copy (ES + EN) — single source of truth
│       └── i18n.tsx       # LangProvider + useContent() hook
├── public/                # static images (Wikimedia Commons)
├── .github/workflows/     # deploy.yml → GitHub Pages
├── next.config.mjs        # basePath, static export config
├── tailwind.config.ts     # design tokens, fonts
├── CLAUDE.md              # agent coding guidelines
└── STORYBOARD.md          # narrative & interaction design
```

## Architecture notes

### Bilingual content
All copy lives in `src/lib/content.ts` as two typed objects (`es`, `en`) implementing the `SiteContent` interface — TypeScript guarantees the languages can never drift apart. Components consume copy only through the `useContent()` hook and never import a language object directly.

### Static export
`output: 'export'` produces a fully static `./out` directory. GitHub Pages serves it directly from `/masamadre/` (configured via `basePath` and `assetPrefix` in `next.config.mjs`).

### Scroll choreography
GSAP contexts are created inside `useEffect` and reverted on unmount. Lenis hands its frame loop to `gsap.ticker` so scroll-linked animations stay frame-perfect. The motion principles are documented in `motion-design-rules.md`.

### Reduced motion
Every animated surface stills into a readable static state under `prefers-reduced-motion: reduce` — no-JS safe and assistive-tech friendly.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
npm run lint     # ESLint
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`: `npm ci` → `npm run build` → publish `./out` to GitHub Pages via `actions/deploy-pages`.

## Sources

Historical and scientific content is drawn from the [Sourdough](https://en.wikipedia.org/wiki/Sourdough) Wikipedia article, [sourdough.co.uk](https://www.sourdough.co.uk/), and the peer-reviewed and reference works catalogued in the site's own bibliography section. Full photo credits live in `public/images/CREDITS.txt`.
