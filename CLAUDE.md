# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**masamadre** (sourdough starter) is a premium web experience project. The project is built on a carefully selected tech stack optimized for creating visually impressive, high-performance web applications with advanced animations, smooth interactions, and 3D graphics.

### Recommended Tech Stack
- **Framework**: Next.js (SSR, routing, performance optimization)
- **Styling**: Tailwind CSS (utility-first, design system consistency)
- **Animations**: GSAP with ScrollTrigger (advanced timelines, scroll-driven effects)
- **Smooth Scrolling**: Lenis (integrates seamlessly with GSAP)
- **3D Graphics**: Three.js with React Three Fiber (WebGL, 3D scenes)
- **Data Visualization**: D3 or Observable Plot (expressive charts)
- **Icons**: Lucide Icons
- **Typography**: Variable fonts from Fontshare or Google Fonts
- **Visual Effects**: SVG filters, CSS masks, procedural textures

See `docs/front_tech_stack.md` for detailed analysis of library choices and comparisons.

## Project Structure

Once initialized, the project will follow a standard Next.js structure:
```
src/
  app/                 # Next.js app router
  components/          # React components
  lib/                 # Utilities, hooks, helpers
  styles/              # Global styles
  types/               # TypeScript types
public/                # Static assets
```

## Development Commands

### Setup
```bash
rtk pnpm install       # Install dependencies (90% token savings)
```

### Development
```bash
rtk pnpm dev           # Start Next.js dev server
rtk pnpm build         # Build for production
rtk pnpm start         # Run production build
```

### Quality & Testing
```bash
rtk lint               # Run ESLint/Biome (84% savings)
rtk prettier --check   # Check formatting (70% savings)
rtk prettier --write   # Format code
# Once testing setup is added:
rtk test <cmd>         # Run tests with failures only (90-99% savings)
```

### Type Checking
```bash
rtk tsc                # TypeScript compile check (83% savings)
```

## Key Architecture Patterns

### Animation & Motion
- **GSAP + ScrollTrigger**: Used for viewport-triggered animations and complex timelines. Set up ScrollTrigger context within components to avoid conflicts.
- **Lenis + GSAP**: Coordinate smooth scrolling with animations using GSAP's `gsap.ticker` for frame-perfect synchronization.
- **React Three Fiber**: Wrap 3D scenes in `<Canvas>` components; use hooks like `useFrame` for animations and `useLoader` for assets.

### Performance Considerations
- Code-split animations and 3D components; lazy-load heavy libraries (Three.js, D3).
- Optimize variable font loading; use `font-display: swap` for better perceived performance.
- Profile with DevTools before and after adding animations; GSAP is efficient but careless timelines bloat.

### Styling
- Use Tailwind for utility-first styling and consistent spacing/colors.
- Combine with CSS custom properties for theme flexibility and animation values.
- Prefer CSS `mix-blend-mode` and `backdrop-filter` over JavaScript-based effects where possible.

## Development Tips

1. **Avoid Over-Animation**: Motion should enhance, not distract. Awwwards winners combine powerful animations with disciplined visual direction—they don't animate everything.
2. **Test on Low-End Devices**: Animations perform well on powerful machines; use DevTools throttling to catch performance issues early.
3. **Type Safety**: Configure TypeScript strictly; this prevents bugs in animation logic and component props.
4. **Typography as Direction**: Variable fonts and careful font pairing are as important as animation; they set the tone of the entire experience.

## RTK Commands for Development

Use RTK prefixes to reduce token usage. Examples:
```bash
rtk git status         # Compact status (80% savings)
rtk git diff           # Compact diff (80% savings)
rtk pnpm list          # Compact dependency tree (70% savings)
rtk gh pr view <num>   # Compact PR view (87% savings)
rtk npm run <script>   # Compact script output
```

See the full RTK reference by running `rtk --help` or `rtk gain --history` to view token savings.

## Files to Ignore

- `docs/front_tech_stack.md`: Research reference; not part of the application code.
- `.rtk/`: RTK cache; managed automatically.
