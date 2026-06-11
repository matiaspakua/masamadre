'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OVEN_CHANGES } from '@/lib/content';
import { useReveal } from '@/lib/useReveal';

// The oven: three simultaneous transformations at rising temperatures. A heat
// gradient intensifies behind the section as you scroll through it, so the
// page itself appears to bake.
export default function Baking() {
  const ref = useReveal<HTMLElement>();
  const heat = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced || !heat.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heat.current,
        { opacity: 0.15 },
        {
          opacity: 0.85,
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
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(181,86,42,0.5), rgba(232,163,61,0.18) 45%, transparent 75%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="reveal mb-6 flex items-center gap-4">
          <span className="font-mono text-sm text-levain">VI</span>
          <span className="h-px w-10 bg-crumb" />
          <span className="eyebrow">The Oven</span>
        </div>
        <h2 className="reveal display text-balance text-[clamp(2.4rem,6vw,5rem)]">
          Three changes, <span className="italic text-ember">at once</span>
        </h2>
        <p className="reveal text-pretty mt-6 max-w-reading leading-relaxed text-linen/80">
          Heat ends the fermentation and begins the bread. In a few hundred
          degrees, a slack, living dough is fixed forever into crust and crumb.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {OVEN_CHANGES.map((c, i) => (
            <article
              key={c.title}
              className="reveal relative flex flex-col justify-between overflow-hidden rounded-sm border border-ember/30 bg-pumpernickel/80 p-8 backdrop-blur-sm"
              style={{ minHeight: '15rem' }}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-3xl text-ember">{c.temp}</span>
                <span className="font-mono text-sm text-ash">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl text-linen">{c.title}</h3>
                <p className="text-pretty mt-3 text-sm leading-relaxed text-linen/75">
                  {c.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="reveal mt-10 max-w-reading text-pretty leading-relaxed text-ash">
          Then comes cooling — the quiet final step. Proteins settle, the crumb
          stabilises, and the crust sings as it contracts. The loaf is still
          becoming itself long after it leaves the heat.
        </p>
      </div>
    </section>
  );
}
