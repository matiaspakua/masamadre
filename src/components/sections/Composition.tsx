'use client';

import { useReveal } from '@/lib/useReveal';
import SectionHeading from '@/components/SectionHeading';
import { COMPOSITION } from '@/lib/content';

export default function Composition() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="composition" ref={ref} className="section-pad relative bg-soot/50">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="V"
          eyebrow="Composition & chemistry"
          title={
            <>
              What a loaf is
              <br />
              <span className="italic text-levain">made of</span>
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-crumb bg-crumb sm:grid-cols-2">
          {COMPOSITION.map((fact, i) => (
            <article
              key={fact.key}
              className="reveal relative bg-pumpernickel p-8 sm:p-10"
            >
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-phosphor/80">
                {String(i + 1).padStart(2, '0')} / element
              </span>
              <h3 className="display mt-3 text-4xl text-linen">{fact.title}</h3>
              <p className="text-pretty mt-4 leading-relaxed text-linen/75">
                {fact.body}
              </p>
            </article>
          ))}
        </div>

        {/* Fermentation equation — encoded as lab data */}
        <div className="reveal mt-8 overflow-hidden rounded-sm border border-phosphor/25 bg-phosphor/[0.04] p-8">
          <p className="lab-readout mb-4 text-xs">Lactic acid fermentation</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-sm text-linen/90 sm:text-base">
            <span>C₆H₁₂O₆</span>
            <span className="text-ash">(sugar)</span>
            <span className="text-phosphor">→</span>
            <span>lactic acid</span>
            <span className="text-ash">+</span>
            <span>CO₂</span>
            <span className="text-ash">+</span>
            <span>ethanol</span>
          </div>
          <p className="text-pretty mt-4 max-w-2xl text-sm leading-relaxed text-ash">
            Homolactic fermentation yields lactic acid alone; heterolactic
            fermentation — the phosphoketolase pathway — also releases the carbon
            dioxide that lifts the dough and the ethanol that flavours it.
          </p>
        </div>
      </div>
    </section>
  );
}
