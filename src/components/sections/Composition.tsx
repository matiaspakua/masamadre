'use client';

import { useReveal } from '@/lib/useReveal';
import SectionHeading from '@/components/SectionHeading';
import { useContent } from '@/lib/i18n';
import { img } from '@/lib/asset';

export default function Composition() {
  const ref = useReveal<HTMLElement>();
  const { composition } = useContent();

  return (
    <section id="composition" ref={ref} className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={composition.index}
          eyebrow={composition.eyebrow}
          title={
            <>
              {composition.titleA}
              <br />
              <span className="italic text-levain">{composition.titleB}</span>
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2">
            {composition.facts.map((fact, i) => (
              <article key={fact.key} className="reveal relative bg-surface p-8">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-phosphor">
                  {String(i + 1).padStart(2, '0')} / {fact.title}
                </span>
                <h3 className="display mt-3 text-3xl text-ink">{fact.title}</h3>
                <p className="text-pretty mt-3 text-sm leading-relaxed text-ink/75">
                  {fact.body}
                </p>
              </article>
            ))}
          </div>

          {/* A crumb specimen photograph */}
          <figure className="reveal">
            <div className="img-frame relative h-full min-h-[18rem]">
              <img
                src={img('baguette')}
                alt={composition.titleA}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-paper/80">
                {composition.facts[0].title} · {composition.facts[1].title}
              </figcaption>
            </div>
          </figure>
        </div>

        {/* Fermentation equation — encoded as lab data */}
        <div className="reveal mt-8 overflow-hidden rounded-sm border border-phosphor/25 bg-phosphor/[0.05] p-8">
          <p className="lab-readout mb-4 text-xs">{composition.equationLabel}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-sm text-ink sm:text-base">
            <span>C₆H₁₂O₆</span>
            <span className="text-ash">{composition.sugar}</span>
            <span className="text-phosphor">→</span>
            <span>{composition.facts[3].title.toLowerCase()}</span>
            <span className="text-ash">+</span>
            <span>CO₂</span>
            <span className="text-ash">+</span>
            <span>ethanol</span>
          </div>
          <p className="text-pretty mt-4 max-w-2xl text-sm leading-relaxed text-ash">
            {composition.equationNote}
          </p>
        </div>
      </div>
    </section>
  );
}
