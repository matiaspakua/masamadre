'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE } from '@/lib/content';

// The timeline is a horizontal "historical instrument": the section pins while
// the eras scroll sideways, tied to vertical scroll progress. A measure rule
// runs beneath like the scale of a scientific chart.
export default function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced || !root.current || !track.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current!,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Each card lifts slightly as it enters the viewport centre.
      gsap.utils.toArray<HTMLElement>('.tl-card').forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0.25,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: 'left 80%',
            end: 'left 45%',
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="relative bg-soot/60">
      <div ref={root} className="relative h-screen overflow-hidden">
        {/* Header pinned over the moving track */}
        <div className="pointer-events-none absolute left-6 top-16 z-20 sm:left-10 lg:left-16">
          <div className="mb-4 flex items-center gap-4">
            <span className="font-mono text-sm text-levain">II</span>
            <span className="h-px w-10 bg-crumb" />
            <span className="eyebrow">Timeline</span>
          </div>
          <h2 className="display text-[clamp(2rem,5vw,4rem)]">
            Six thousand years
          </h2>
          <p className="mt-2 max-w-xs font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ash">
            Scroll to travel forward in time →
          </p>
        </div>

        {/* The moving track */}
        <div
          ref={track}
          className="absolute top-0 flex h-full items-center gap-8 pl-6 pr-[12vw] sm:gap-12 sm:pl-10 lg:pl-16"
          style={{ width: 'max-content' }}
        >
          {TIMELINE.map((ev) => (
            <article
              key={ev.era}
              className="tl-card relative flex h-[58vh] w-[78vw] shrink-0 flex-col justify-between border border-crumb bg-pumpernickel/80 p-8 backdrop-blur-sm sm:w-[440px] sm:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-6xl leading-none text-crumb">
                  {ev.era}
                </span>
                <div className="text-right">
                  <p className="lab-readout text-xs">{ev.year}</p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ash">
                    {ev.region}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="display text-3xl text-linen sm:text-4xl">
                  {ev.title}
                </h3>
                <p className="text-pretty mt-4 leading-relaxed text-linen/75">
                  {ev.body}
                </p>
              </div>

              {/* tick mark anchoring the card to the rule */}
              <span className="absolute -bottom-px left-10 h-3 w-px bg-levain" />
            </article>
          ))}
        </div>

        {/* Measure rule across the foot of the instrument */}
        <div className="pointer-events-none absolute bottom-[18%] left-0 right-0 z-0 h-px bg-crumb/60" />
      </div>
    </section>
  );
}
