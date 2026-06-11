'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '@/lib/i18n';
import { useReveal } from '@/lib/useReveal';

// The oven: three simultaneous transformations at rising temperatures. A heat
// gradient intensifies behind the section as you scroll through it, so the
// page itself appears to bake.
export default function Baking() {
  const ref = useReveal<HTMLElement>();
  const heat = useRef<HTMLDivElement>(null);
  const { oven } = useContent();

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced || !heat.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heat.current,
        { opacity: 0.12 },
        {
          opacity: 0.8,
          scrollTrigger: {
            trigger: ref.current!,
            start: 'top 70%',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, [ref]);

  return (
    <section id="baking" ref={ref} className="section-pad relative overflow-hidden">
      {/* Rising heat */}
      <div
        ref={heat}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(168,67,30,0.28), rgba(192,116,26,0.12) 45%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="reveal mb-6 flex items-center gap-4">
          <span className="font-mono text-sm text-levain">{oven.index}</span>
          <span className="h-px w-10 bg-line" />
          <span className="eyebrow">{oven.eyebrow}</span>
        </div>
        <h2 className="reveal display text-balance text-[clamp(2.4rem,6vw,5rem)]">
          {oven.titleA} <span className="italic text-ember">{oven.titleB}</span>
        </h2>
        <p className="reveal text-pretty mt-6 max-w-reading leading-relaxed text-ink/80">
          {oven.intro}
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {oven.changes.map((c, i) => (
            <article
              key={c.title}
              className="reveal relative flex flex-col justify-between overflow-hidden rounded-sm border border-ember/30 bg-surface p-8 shadow-[0_18px_40px_-32px_rgba(168,67,30,0.7)]"
              style={{ minHeight: '15rem' }}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-3xl text-ember">{c.temp}</span>
                <span className="font-mono text-sm text-ash">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl text-ink">{c.title}</h3>
                <p className="text-pretty mt-3 text-sm leading-relaxed text-ink/75">
                  {c.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="reveal mt-10 max-w-reading text-pretty leading-relaxed text-ash">
          {oven.cooling}
        </p>
      </div>
    </section>
  );
}
