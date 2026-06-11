# Masa Madre

A digital museum and living laboratory of sourdough bread — an immersive journey through 6,000 years of bread history paired with an interactive look at the fermentation science behind masa madre.

**Live site:** https://matiaspakua.github.io/masamadre/

## What it is

A long-form, scroll-driven landing experience, **bilingual (Spanish default, English toggle)**, built around two missions:

1. **A window through time** — an animated, horizontally-scrolling historical timeline (parallax era numerals, a filling progress measure) from the first domesticated grain to the lockdown sourdough revival.
2. **A living laboratory** — an interactive fermentation workstation where you advance a starter through its stages and watch a live pH meter, CO₂ activity, temperature, and the two microbe populations respond — plus a **baker's-percentage dough calculator** that rebalances water, salt, and starter from a flour weight and hydration slider.

Sections: Hero · Origins · Timeline · Laboratory · Bread families · Process (12 steps) · Composition & chemistry · The Oven · Benefits & nuance · Closing. Curated, freely-licensed photography (Wikimedia Commons) runs through the ingredients, bread-family gallery, and hero.

## Design

"The Living Archive" (light edition) — a warm-white museum/lab daylight with printed-page surfaces and ink text. Amber *levain* and *ember* carry warmth and craft; a single deep-teal *phosphor* is reserved exclusively for laboratory data, so colour itself encodes meaning. Typography pairs **Fraunces** (display), **Spline Sans** (body), and **Space Mono** (lab readouts).

## Tech stack

- **Next.js 15** (App Router, static export)
- **Tailwind CSS** for the design system
- **GSAP + ScrollTrigger** for cinematic, scroll-linked motion
- **Lenis** for smooth scrolling
- Variable fonts via `next/font`, SVG/CSS noise & blend textures

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages. The site is served from `/masamadre/`, configured via `basePath` in `next.config.mjs`.

## Sources

Historical and scientific content is drawn from the [Sourdough](https://en.wikipedia.org/wiki/Sourdough) Wikipedia article, sourdough.co.uk, and the project's reference archive (`docs/`).
