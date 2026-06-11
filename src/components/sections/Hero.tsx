'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { HERO } from '@/lib/content';
import StarterJar from '@/components/lab/StarterJar';

// The hero opens on the most characteristic thing in the subject's world:
// a living starter, breathing in the dark. Title rises word by word.
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced || !root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-eyebrow', { opacity: 0, y: 16, duration: 0.8, delay: 0.2 })
        .from(
          '.hero-word',
          { opacity: 0, yPercent: 110, duration: 1.1, stagger: 0.12 },
          '-=0.3',
        )
        .from('.hero-thesis', { opacity: 0, y: 20, duration: 1 }, '-=0.6')
        .from('.hero-cue', { opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero-jar', { opacity: 0, scale: 0.92, duration: 1.4 }, 0.4);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden px-6 sm:px-10 lg:px-16"
    >
      <div className="glow-levain pointer-events-none absolute inset-0" />

      <div className="relative z-10 grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="hero-eyebrow eyebrow mb-8">{HERO.eyebrow}</p>
          <h1 className="display text-[clamp(3.5rem,13vw,11rem)]">
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">Masa</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block italic text-levain">
                Madre
              </span>
            </span>
          </h1>
          <p className="hero-thesis text-pretty mt-10 max-w-reading text-lg leading-relaxed text-linen/85 sm:text-xl">
            {HERO.thesis}
          </p>
          <div className="hero-cue mt-12 flex items-center gap-4">
            <span className="lab-readout text-xs">{HERO.scrollCue}</span>
            <span className="relative h-10 w-px overflow-hidden bg-crumb">
              <span className="absolute left-0 top-0 h-4 w-full animate-[rise_1.8s_ease-in-out_infinite] bg-levain" />
            </span>
          </div>
        </div>

        <div className="hero-jar flex justify-center lg:justify-end">
          <StarterJar />
        </div>
      </div>
    </section>
  );
}
