'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/SectionHeading';
import StarterJar from '@/components/lab/StarterJar';
import { useReveal } from '@/lib/useReveal';
import { useContent } from '@/lib/i18n';

// How to raise a starter from scratch — a seven-day field guide.
//
// One dominant motion idea (per the motion rules): a fermentation spine that
// draws on as you scroll, day by day, so the line literally grows with the
// culture. Headings uncover with the clip-path wipe; the rest fades up in
// staggered groups; and each day carries a live jar whose activity climbs so
// the culture visibly comes alive down the column. The float-test finale bobs
// a piece of dough at the water's surface. All of it stills under
// reduced-motion (the spine shows fully drawn, jars and bob hold).
const ACTIVITY = [0.05, 0.13, 0.32, 0.55, 0.73, 0.88, 0.97];
const RISE = [0.24, 0.3, 0.42, 0.5, 0.58, 0.66, 0.72];

export default function StarterGuide() {
  const ref = useReveal<HTMLElement>();
  const seq = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const blob = useRef<HTMLDivElement>(null);
  const { starter } = useContent();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // The spine grows with the scroll — semantic scroll-progress, not decor.
      if (fill.current) {
        if (reduced) {
          gsap.set(fill.current, { scaleY: 1 });
        } else {
          gsap.fromTo(
            fill.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              transformOrigin: 'top',
              scrollTrigger: {
                trigger: seq.current,
                start: 'top 72%',
                end: 'bottom 72%',
                scrub: 0.6,
              },
            },
          );
        }
      }
      // The dough bobs at the surface — a quiet "it floats" confirmation.
      if (!reduced && blob.current) {
        gsap.to(blob.current, {
          y: -5,
          rotation: 7,
          duration: 2.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [ref]);

  return (
    <section id="starter" ref={ref} className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={starter.index}
          eyebrow={starter.eyebrow}
          title={
            <>
              {starter.titleA}
              <br />
              <span className="italic text-[color:var(--accent)]">{starter.titleB}</span>
            </>
          }
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <p className="reveal text-pretty max-w-reading text-lg leading-relaxed text-ink/85">
            {starter.intro}
          </p>
          <p className="reveal font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.18em] text-[color:var(--accent)]">
            {starter.feed}
          </p>
        </div>

        {/* Seven-day sequence */}
        <div ref={seq} className="relative mt-16">
          {/* spine: faint track + the accent fill that draws on with scroll */}
          <div
            className="pointer-events-none absolute bottom-3 left-[1.75rem] top-3 w-px bg-line"
            aria-hidden="true"
          />
          <div
            ref={fill}
            className="pointer-events-none absolute bottom-3 left-[1.75rem] top-3 w-px origin-top bg-[color:var(--accent)]"
            aria-hidden="true"
          />

          <ol className="space-y-12 sm:space-y-14">
            {starter.days.map((day, i) => (
              <li key={day.d} className="relative grid grid-cols-[3.5rem_1fr] gap-5 sm:gap-8">
                {/* node on the spine + day number */}
                <div className="relative flex flex-col items-center">
                  <span className="reveal relative z-10 mt-1.5 h-3 w-3 rounded-full border-2 border-paper bg-[color:var(--accent)] shadow-[0_0_0_3px_var(--accent-soft)]" />
                  <span className="reveal mt-3 font-mono text-xs tracking-[0.2em] text-ash">
                    {day.d}
                  </span>
                </div>

                {/* the day's instruction + its living jar */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="max-w-reading">
                    <h3 className="reveal-mask display text-2xl sm:text-[1.7rem]">{day.phase}</h3>
                    <p className="reveal text-pretty mt-3 leading-relaxed text-ink/85">
                      {day.action}
                    </p>
                    <p className="reveal mt-3 flex gap-2.5 text-sm leading-relaxed text-ash">
                      <span className="shrink-0 pt-0.5 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[color:var(--accent)]">
                        {starter.signLabel}
                      </span>
                      <span className="text-pretty italic">{day.sign}</span>
                    </p>
                  </div>
                  <div className="reveal w-14 shrink-0 sm:w-[4.5rem]">
                    <StarterJar activity={ACTIVITY[i]} rise={RISE[i]} showLabel={false} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Float-test finale */}
        <div className="reveal relative mt-16 overflow-hidden rounded-[1.4rem] border border-[color:var(--accent-line)] bg-surface/70 p-8 shadow-[0_30px_80px_-40px_rgba(42,32,24,0.5)] backdrop-blur-sm sm:p-12">
          <div className="grid items-center gap-10 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow mb-3" style={{ color: 'var(--accent)' }}>
                {starter.test.tag}
              </p>
              <h3 className="reveal-mask display text-balance text-3xl sm:text-4xl">
                {starter.test.title}
              </h3>
              <p className="text-pretty mt-4 max-w-reading leading-relaxed text-ink/85">
                {starter.test.body}
              </p>
            </div>

            {/* a spoonful that floats at the water line */}
            <div className="relative mx-auto h-32 w-28 shrink-0" aria-hidden="true">
              <div className="absolute inset-x-0 bottom-0 h-24 overflow-hidden rounded-b-2xl rounded-t-md border border-ink/15 bg-gradient-to-b from-phosphor/5 to-phosphor/20">
                {/* glass highlight */}
                <div className="absolute left-[16%] top-0 h-full w-[7%] bg-gradient-to-r from-white/50 to-transparent" />
                {/* water surface */}
                <div className="absolute inset-x-0 top-5 h-px bg-phosphor/40" />
                {/* floating dough */}
                <div
                  ref={blob}
                  className="absolute left-1/2 top-2.5 h-6 w-7 -translate-x-1/2 rounded-[45%_55%_50%_50%/55%_45%_55%_45%] bg-gradient-to-b from-levain/90 to-ember/70 shadow-[0_4px_8px_-2px_rgba(42,32,24,0.4)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
