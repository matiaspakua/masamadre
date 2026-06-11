'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '@/lib/i18n';

// The timeline is a horizontal "historical instrument": the section pins while
// the eras scroll sideways, tied to vertical scroll progress. Each card lifts
// and its giant era numeral drifts on parallax as it crosses centre; a filling
// progress bar and a travelling marker make the passage of time legible.
export default function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const { timeline } = useContent();

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
          onUpdate: (self) => {
            if (fill.current)
              fill.current.style.width = `${self.progress * 100}%`;
          },
        },
      });

      gsap.utils.toArray<HTMLElement>('.tl-card').forEach((card) => {
        gsap.from(card, {
          y: 70,
          opacity: 0.2,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: 'left 85%',
            end: 'left 45%',
            scrub: true,
          },
        });
        // Parallax on the giant era numeral inside each card.
        const numeral = card.querySelector('.tl-era');
        if (numeral) {
          gsap.fromTo(
            numeral,
            { xPercent: 18 },
            {
              xPercent: -18,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          );
        }
      });
    }, root);

    return () => ctx.revert();
  }, [timeline]);

  return (
    <section id="timeline" className="relative bg-sink">
      <div ref={root} className="relative h-screen overflow-hidden">
        {/* Header pinned over the moving track */}
        <div className="pointer-events-none absolute left-6 top-20 z-20 sm:left-10 lg:left-16">
          <div className="mb-4 flex items-center gap-4">
            <span className="font-mono text-sm text-levain">
              {timeline.index}
            </span>
            <span className="h-px w-10 bg-line" />
            <span className="eyebrow">{timeline.eyebrow}</span>
          </div>
          <h2 className="display text-[clamp(2rem,5vw,4rem)]">
            {timeline.title}
          </h2>
          <p className="mt-2 max-w-xs font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ash">
            {timeline.cue}
          </p>
        </div>

        {/* The moving track */}
        <div
          ref={track}
          className="absolute top-0 flex h-full items-center gap-8 pl-6 pr-[12vw] sm:gap-12 sm:pl-10 lg:pl-16"
          style={{ width: 'max-content' }}
        >
          {timeline.events.map((ev) => (
            <article
              key={ev.era}
              className="tl-card relative flex h-[58vh] w-[78vw] shrink-0 flex-col justify-between overflow-hidden border border-line bg-surface p-8 shadow-[0_20px_50px_-40px_rgba(42,32,24,0.6)] sm:w-[440px] sm:p-10"
            >
              {/* parallax era numeral */}
              <span className="tl-era pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 font-display text-[14rem] leading-none text-levain/[0.07] sm:text-[18rem]">
                {ev.era}
              </span>

              <div className="relative flex items-start justify-between">
                <span className="font-display text-5xl leading-none text-line">
                  {ev.era}
                </span>
                <div className="text-right">
                  <p className="lab-readout text-xs">{ev.year}</p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ash">
                    {ev.region}
                  </p>
                </div>
              </div>

              <div className="relative">
                <h3 className="display text-3xl text-ink sm:text-4xl">
                  {ev.title}
                </h3>
                <p className="text-pretty mt-4 leading-relaxed text-ink/70">
                  {ev.body}
                </p>
              </div>

              <span className="absolute -bottom-px left-10 h-3 w-px bg-levain" />
            </article>
          ))}
        </div>

        {/* Measure rule + filling progress across the foot of the instrument */}
        <div className="pointer-events-none absolute bottom-[16%] left-0 right-0 z-0 h-px bg-line">
          <div ref={fill} className="h-full w-0 bg-levain/60" />
        </div>
      </div>
    </section>
  );
}
