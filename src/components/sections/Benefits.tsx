'use client';

import { useReveal } from '@/lib/useReveal';
import SectionHeading from '@/components/SectionHeading';
import { useContent } from '@/lib/i18n';

export default function Benefits() {
  const ref = useReveal<HTMLElement>();
  const { benefits } = useContent();

  return (
    <section id="benefits" ref={ref} className="section-pad relative bg-sink/40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={benefits.index}
          eyebrow={benefits.eyebrow}
          title={
            <>
              {benefits.titleA}
              <br />
              <span className="italic text-levain">{benefits.titleB}</span>
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {benefits.items.map((b, i) => (
            <article
              key={b.title}
              className="reveal flex gap-6 rounded-sm border border-line bg-surface p-8"
            >
              <span className="font-display text-5xl leading-none text-levain/25">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-2xl text-ink">{b.title}</h3>
                <p className="text-pretty mt-3 leading-relaxed text-ink/75">
                  {b.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
