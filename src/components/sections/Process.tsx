'use client';

import { useReveal } from '@/lib/useReveal';
import SectionHeading from '@/components/SectionHeading';
import { PROCESS } from '@/lib/content';

// Twelve steps, shown as a sequence because the order genuinely carries
// information — you cannot proof before you mix. A numbered ladder.
export default function Process() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="process" ref={ref} className="section-pad relative">
      <SectionHeading
        index="IV"
        eyebrow="Starter to oven"
        title={
          <>
            Twelve steps, <span className="italic text-levain">one rise</span>
          </>
        }
        className="mx-auto max-w-6xl"
      />

      <ol className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-sm border border-crumb bg-crumb md:grid-cols-2 lg:grid-cols-3">
        {PROCESS.map((step) => (
          <li
            key={step.n}
            className="reveal group relative flex flex-col gap-3 bg-pumpernickel p-7 transition-colors duration-300 hover:bg-pumpernickel/60"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm text-levain">
                {String(step.n).padStart(2, '0')}
              </span>
              <span className="h-px flex-1 bg-crumb transition-colors group-hover:bg-levain/40" />
            </div>
            <h3 className="font-display text-2xl text-linen">{step.name}</h3>
            <p className="text-pretty text-sm leading-relaxed text-ash">
              {step.detail}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
