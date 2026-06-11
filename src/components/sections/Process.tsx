'use client';

import { useReveal } from '@/lib/useReveal';
import SectionHeading from '@/components/SectionHeading';
import { useContent } from '@/lib/i18n';

// Twelve steps, shown as a sequence because the order genuinely carries
// information — you cannot proof before you mix. A numbered ladder.
export default function Process() {
  const ref = useReveal<HTMLElement>();
  const { process } = useContent();

  return (
    <section id="process" ref={ref} className="section-pad relative">
      <SectionHeading
        index={process.index}
        eyebrow={process.eyebrow}
        title={
          <>
            {process.titleA}{' '}
            <span className="italic text-levain">{process.titleB}</span>
          </>
        }
        className="mx-auto max-w-6xl"
      />

      <ol className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {process.steps.map((step) => (
          <li
            key={step.n}
            className="reveal group relative flex flex-col gap-3 bg-surface p-7 transition-colors duration-300 hover:bg-sink/40"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm text-levain">
                {String(step.n).padStart(2, '0')}
              </span>
              <span className="h-px flex-1 bg-line transition-colors group-hover:bg-levain/40" />
            </div>
            <h3 className="font-display text-2xl text-ink">{step.name}</h3>
            <p className="text-pretty text-sm leading-relaxed text-ash">
              {step.detail}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
