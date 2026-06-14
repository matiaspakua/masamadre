'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// The section reveal vocabulary. Two intents, so sections don't all enter the
// same way (a flat fade-up everywhere reads as templated):
//
//   .reveal       — content fades and rises. Batched, so elements that enter
//                   together stagger as a group rather than popping one by one.
//   .reveal-mask  — a clip-path wipe upward, for headings and feature media.
//                   Heavier, editorial; the eye reads it as "uncovering".
//
// Both degrade to fully visible under reduced-motion (see globals.css).
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Grouped fade-up — batched entries stagger together.
      ScrollTrigger.batch('.reveal', {
        start: 'top 86%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.09,
            overwrite: true,
            onComplete: () => batch.forEach((b) => ((b as HTMLElement).style.willChange = 'auto')),
          }),
      });

      // Clip-path wipe for headings / feature media.
      gsap.utils.toArray<HTMLElement>('.reveal-mask').forEach((target) => {
        gsap.fromTo(
          target,
          { clipPath: 'inset(0 0 102% 0)', y: 26, opacity: 0 },
          {
            clipPath: 'inset(0 0 -2% 0)',
            y: 0,
            opacity: 1,
            duration: 1.05,
            ease: 'expo.out',
            scrollTrigger: { trigger: target, start: 'top 88%' },
          },
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
