'use client';

import { useReveal } from '@/lib/useReveal';
import SectionHeading from '@/components/SectionHeading';
import { useContent } from '@/lib/i18n';
import { img } from '@/lib/asset';

// A gallery of bread families — the same chemistry branching into traditions.
// Large editorial image cards, first one spanning wider as the anchor.
export default function BreadTypes() {
  const ref = useReveal<HTMLElement>();
  const { breadTypes } = useContent();

  return (
    <section id="breads" ref={ref} className="section-pad relative bg-sink/40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={breadTypes.index}
          eyebrow={breadTypes.eyebrow}
          title={
            <>
              {breadTypes.titleA}
              <br />
              <span className="italic text-levain">{breadTypes.titleB}</span>
            </>
          }
        />
        <p className="reveal text-pretty mt-6 max-w-reading leading-relaxed text-ink/80">
          {breadTypes.intro}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {breadTypes.items.map((b, i) => (
            <article
              key={b.key}
              className={`reveal group ${i === 0 ? 'sm:col-span-2 lg:row-span-2' : ''}`}
            >
              <div
                className={`img-frame relative ${i === 0 ? 'aspect-[16/10] lg:h-full' : 'aspect-[4/3]'}`}
              >
                <img
                  src={img(b.img)}
                  alt={b.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3
                      className={`font-display text-paper ${i === 0 ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}
                    >
                      {b.name}
                    </h3>
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-paper/70">
                      {b.origin}
                    </span>
                  </div>
                  <p className="text-pretty mt-2 max-w-md text-sm leading-relaxed text-paper/85">
                    {b.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
