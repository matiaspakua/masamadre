'use client';

import { useReveal } from '@/lib/useReveal';
import SectionHeading from '@/components/SectionHeading';
import { BENEFITS } from '@/lib/content';

export default function Benefits() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="benefits" ref={ref} className="section-pad relative bg-soot/50">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="VII"
          eyebrow="Benefits & nuance"
          title={
            <>
              Real gains,
              <br />
              <span className="italic text-levain">honestly told</span>
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {BENEFITS.map((b, i) => (
            <article
              key={b.title}
              className="reveal flex gap-6 rounded-sm border border-crumb bg-pumpernickel/70 p-8"
            >
              <span className="font-display text-5xl leading-none text-crumb">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-2xl text-linen">{b.title}</h3>
                <p className="text-pretty mt-3 leading-relaxed text-linen/75">
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
