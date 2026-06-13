'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useContent } from '@/lib/i18n';
import { prefersReducedMotion, DUR, EASE } from '@/lib/motion';

// Room 0 — the street. Transparent overlay over the live 3D entrance: title,
// thesis and an "enter" cue. Scrolling flies the camera through the doorway.
export default function StreetIntro() {
  const root = useRef<HTMLDivElement>(null);
  const { hero } = useContent();

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE.enter } });
      tl.from('.si-eyebrow', { opacity: 0, y: 14, duration: DUR.block, delay: 0.3 })
        .from('.si-line', { opacity: 0, yPercent: 110, duration: DUR.blockSlow, stagger: 0.12 }, '-=0.4')
        .from('.si-thesis', { opacity: 0, y: 16, duration: DUR.block }, '-=0.5')
        .from('.si-cue', { opacity: 0, duration: DUR.component }, '-=0.3');
      // float the cue
      gsap.to('.si-cue-dot', { y: 8, duration: 1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      data-room="hero"
      ref={root}
      className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
    >
      <p className="si-eyebrow eyebrow mb-6 text-levain/90 [text-shadow:0_2px_18px_rgba(0,0,0,0.9)]">
        {hero.eyebrow}
      </p>
      <h1 className="display text-paper [text-shadow:0_4px_30px_rgba(0,0,0,0.95)] text-[clamp(3.2rem,12vw,9rem)] leading-[0.86]">
        <span className="block overflow-hidden"><span className="si-line inline-block">{hero.titleA}</span></span>
        <span className="block overflow-hidden"><span className="si-line inline-block italic text-levain">{hero.titleB}</span></span>
      </h1>
      <p className="si-thesis mt-7 max-w-md font-mono text-[0.68rem] uppercase tracking-[0.24em] text-paper/75 [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]">
        {hero.thesis}
      </p>
      <div className="si-cue mt-12 flex flex-col items-center gap-2 text-paper/80">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.34em] [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]">
          {hero.scrollCue}
        </span>
        <span className="si-cue-dot text-lg leading-none text-levain">↓</span>
      </div>
    </section>
  );
}
