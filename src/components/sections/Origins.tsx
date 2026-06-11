'use client';

import SectionHeading from '@/components/SectionHeading';
import { useReveal } from '@/lib/useReveal';

export default function Origins() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="origins" ref={ref} className="section-pad relative">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          index="I"
          eyebrow="Origins"
          title={
            <>
              Ground grain,
              <br />
              <span className="italic text-levain">wild air</span>
            </>
          }
        />

        <div className="space-y-8">
          <p className="reveal text-pretty text-lg leading-relaxed text-linen/85">
            The first leaven was an accident of patience. Flour and water, left
            long enough, are never truly alone — the grain itself carries wild
            yeast, and the air carries lactic acid bacteria. Wait, and the
            mixture begins to breathe.
          </p>
          <p className="reveal text-pretty leading-relaxed text-ash">
            Any flour can ferment, but a porous, lifted loaf needs strength: a
            flour able to absorb water and build gluten from its proteins. Salt
            tunes the work, slowing enzymes and tightening the dough’s
            structure. From those four things — flour, water, salt, and time —
            every bread in this archive descends.
          </p>

          <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-crumb bg-crumb sm:grid-cols-4">
            {[
              ['Flour', 'Structure & fuel'],
              ['Water', 'The medium of life'],
              ['Salt', 'Control & flavour'],
              ['Time', 'The living variable'],
            ].map(([k, v]) => (
              <div key={k} className="bg-pumpernickel p-5">
                <p className="font-display text-xl text-linen">{k}</p>
                <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ash">
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
