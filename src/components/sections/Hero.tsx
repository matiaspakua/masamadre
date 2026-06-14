'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useContent } from '@/lib/i18n';
import { img } from '@/lib/asset';
import StarterJar from '@/components/lab/StarterJar';

// The hero opens on the most characteristic thing in the subject's world:
// a real loaf and a living starter. Title rises word by word; the loaf image
// drifts on a slow parallax.
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { hero } = useContent();

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced || !root.current) return;

    let cleanup: (() => void) | undefined;
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
        .from(
          '.hero-visual',
          { opacity: 0, scale: 0.92, duration: 1.4 },
          0.35,
        )
        .from('.hero-spec', { opacity: 0, duration: 0.8 }, '-=0.5');

      gsap.to('.hero-loaf', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current!,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // pointer parallax — the jar (nearer) drifts more than the loaf frame
      const frameX = gsap.quickTo('.hero-visual', 'x', { duration: 0.7, ease: 'power3' });
      const frameY = gsap.quickTo('.hero-visual', 'y', { duration: 0.7, ease: 'power3' });
      const jarX = gsap.quickTo('.hero-jar-wrap', 'x', { duration: 0.9, ease: 'power3' });
      const jarY = gsap.quickTo('.hero-jar-wrap', 'y', { duration: 0.9, ease: 'power3' });

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        frameX(dx * 14);
        frameY(dy * 14);
        jarX(dx * 34);
        jarY(dy * 34);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      cleanup = () => window.removeEventListener('pointermove', onMove);
    }, root);

    return () => {
      cleanup?.();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 sm:px-10 lg:px-16"
    >
      <div className="glow-levain pointer-events-none absolute inset-0" />

      <div className="relative z-10 grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="hero-eyebrow eyebrow mb-8">{hero.eyebrow}</p>
          <h1 className="display text-[clamp(3.5rem,13vw,11rem)]">
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">{hero.titleA}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block italic text-[color:var(--accent)]">
                {hero.titleB}
              </span>
            </span>
          </h1>
          <p className="hero-thesis text-pretty mt-10 max-w-reading text-lg leading-relaxed text-ink/80 sm:text-xl">
            {hero.thesis}
          </p>
          <div className="hero-cue mt-12 flex items-center gap-4">
            <span className="lab-readout text-xs">{hero.scrollCue}</span>
            <span className="relative h-10 w-px overflow-hidden bg-line">
              <span className="absolute left-0 top-0 h-4 w-full animate-[rise_1.8s_ease-in-out_infinite] bg-[color:var(--accent)]" />
            </span>
          </div>
        </div>

        {/* Loaf image with the living jar layered over it — framed like a
            specimen under glass, with a data caption that rhymes with the
            fermentation instrument. */}
        <div className="hero-visual relative mx-auto w-full max-w-md lg:mr-0">
          <div className="img-frame relative aspect-[4/5]">
            <img
              src={img('hero-sourdough')}
              alt={hero.imageAlt}
              className="hero-loaf h-[112%] w-full -translate-y-[6%] object-cover"
              loading="eager"
            />
            {/* corner registration ticks */}
            {[
              'left-2 top-2 border-l border-t',
              'right-2 top-2 border-r border-t',
              'left-2 bottom-2 border-l border-b',
              'right-2 bottom-2 border-r border-b',
            ].map((pos) => (
              <span
                key={pos}
                className={`pointer-events-none absolute h-4 w-4 border-paper/70 ${pos}`}
              />
            ))}
          </div>
          <div className="hero-jar-wrap absolute -bottom-8 -left-6 w-32 sm:-left-10 sm:w-40">
            <StarterJar activity={0.7} rise={0.6} showLabel={false} />
          </div>
          <p className="hero-spec absolute -bottom-7 right-0 font-mono text-[0.56rem] uppercase tracking-[0.2em] text-ash">
            Specimen&nbsp;N°01 · <span className="text-[color:var(--accent)]">pH 6.0</span> · 0&nbsp;h
          </p>
        </div>
      </div>
    </section>
  );
}
