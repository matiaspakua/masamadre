'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ─────────────────────────────────────────────────────────────────────────
// Centralized motion language for the bakery tour.
// One source of truth for easing curves and duration families so every scene
// shares a consistent rhythm. Per the motion-design rules:
//   micro 120–220ms · component 240–420ms · block 500–900ms · scene → scroll.
// Only transform / opacity / clip-path are ever animated.
// ─────────────────────────────────────────────────────────────────────────

let registered = false;
export function registerMotion() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  // Named cubic-beziers usable as GSAP `ease` strings.
  gsap.registerEase('mm-enter', (p) => 1 - Math.pow(1 - p, 4)); // expo-ish out
  gsap.registerEase('mm-exit', (p) => p * p * p); // cubic in
  registered = true;
}

// Duration tokens (seconds)
export const DUR = {
  micro: 0.18,
  micro2: 0.22,
  component: 0.34,
  componentSlow: 0.42,
  block: 0.7,
  blockSlow: 0.9,
} as const;

// Easing — GSAP ease strings. Curves match the storyboard.
export const EASE = {
  enter: 'power4.out', // entradas
  exit: 'power3.in', // salidas
  move: 'power2.inOut', // desplazamientos espaciales / cámara
  soft: 'power2.out', // micro
  back: 'back.out(1.5)', // acentos con rebote leve
} as const;

// CSS-side equivalents (for Tailwind/style transitions outside GSAP)
export const CSS_EASE = {
  enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
  exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
  move: 'cubic-bezier(0.65, 0, 0.35, 1)',
  soft: 'cubic-bezier(0.33, 1, 0.68, 1)',
} as const;

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ── Motion primitives (reusable) ───────────────────────────────────────────

// Staggered block reveal for `.reveal` elements within `scope`.
export function revealIn(scope: Element, opts?: { stagger?: number }) {
  const targets = gsap.utils.toArray<HTMLElement>(scope.querySelectorAll('.reveal'));
  if (!targets.length) return;
  gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: DUR.block,
    ease: EASE.enter,
    stagger: opts?.stagger ?? 0.08,
    scrollTrigger: { trigger: scope, start: 'top 80%', once: true },
  });
}

// Layered parallax driven by pointer (depth illusion). `depth` 0..1.
export function pointerParallax(
  el: HTMLElement,
  layers: { selector: string; depth: number }[],
) {
  const quick = layers.map((l) => ({
    x: gsap.quickTo(el.querySelectorAll(l.selector), 'xPercent', {
      duration: 0.8,
      ease: EASE.soft,
    }),
    y: gsap.quickTo(el.querySelectorAll(l.selector), 'yPercent', {
      duration: 0.8,
      ease: EASE.soft,
    }),
    depth: l.depth,
  }));
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const dx = (e.clientX / window.innerWidth - 0.5) * 2;
    const dy = (e.clientY / window.innerHeight - 0.5) * 2;
    quick.forEach((q) => {
      q.x(dx * q.depth * -4);
      q.y(dy * q.depth * -4);
    });
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  return () => window.removeEventListener('pointermove', onMove);
}
