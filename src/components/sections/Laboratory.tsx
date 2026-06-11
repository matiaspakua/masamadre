'use client';

import { useState } from 'react';
import StarterJar from '@/components/lab/StarterJar';
import PhMeter from '@/components/lab/PhMeter';
import DoughCalculator from '@/components/lab/DoughCalculator';
import BreadMicroscope from '@/components/lab/BreadMicroscope';
import { useReveal } from '@/lib/useReveal';
import { useContent } from '@/lib/i18n';

// The required centrepiece: a fermentation workstation. Advance the culture
// through its stages and watch the jar, pH, temperature, and gas activity
// respond together; inspect the two microbe populations; then size a real
// recipe with the dough calculator. This is where the page spends its boldness.
export default function Laboratory() {
  const ref = useReveal<HTMLElement>();
  const { lab } = useContent();
  const [stageIdx, setStageIdx] = useState(2);
  const [microbe, setMicrobe] = useState<string | null>(null);

  const stage = lab.stages[stageIdx];
  const rise = 0.42 + stage.activity * 0.32;

  return (
    <section
      id="laboratory"
      ref={ref}
      className="section-pad relative bg-gradient-to-b from-paper via-sink/50 to-paper"
    >
      <div className="glow-levain pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-6xl">
        <div className="reveal mb-4 flex items-center gap-4">
          <span className="font-mono text-sm text-levain">{lab.index}</span>
          <span className="h-px w-10 bg-line" />
          <span className="eyebrow">{lab.eyebrow}</span>
        </div>
        <h2 className="reveal display text-balance text-[clamp(2.4rem,6vw,5rem)]">
          {lab.titleA} <span className="italic text-levain">{lab.titleB}</span>
        </h2>
        <p className="reveal text-pretty mt-6 max-w-reading leading-relaxed text-ink/80">
          {lab.intro}
        </p>

        {/* The workstation */}
        <div className="reveal mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-[1fr_1.1fr]">
          {/* Left: the live jar + instruments */}
          <div className="relative flex flex-col items-center gap-8 bg-surface p-8 sm:p-12">
            <div className="flex w-full items-stretch justify-between gap-6">
              <div className="h-44">
                <PhMeter ph={stage.ph} />
              </div>
              <div className="w-28 shrink-0 sm:w-32">
                <StarterJar activity={stage.activity} rise={rise} />
              </div>
              <div className="flex flex-col justify-center gap-6 text-right">
                <Readout label={lab.readout.temp} value={stage.temp} />
                <Readout label={lab.readout.elapsed} value={stage.hours} />
                <Readout
                  label={lab.readout.gas}
                  value={`${Math.round(stage.activity * 100)}%`}
                />
              </div>
            </div>

            {/* Stage scrubber */}
            <div className="w-full">
              <div className="flex items-center justify-between">
                {lab.stages.map((s, i) => (
                  <button
                    key={s.key}
                    onClick={() => setStageIdx(i)}
                    className="group flex flex-1 flex-col items-center gap-2"
                    aria-pressed={i === stageIdx}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full border transition-all ${
                        i === stageIdx
                          ? 'scale-125 border-levain bg-levain'
                          : 'border-ash/50 bg-transparent group-hover:border-ink'
                      }`}
                    />
                    <span
                      className={`font-mono text-[0.58rem] uppercase tracking-[0.1em] transition-colors ${
                        i === stageIdx ? 'text-levain' : 'text-ash'
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="relative mt-3 h-px w-full bg-line">
                <div
                  className="absolute top-0 h-full bg-levain transition-all duration-500 ease-archive"
                  style={{
                    width: `${(stageIdx / (lab.stages.length - 1)) * 100}%`,
                  }}
                />
              </div>
              <p className="text-pretty mt-5 min-h-[3.5rem] text-sm leading-relaxed text-ink/80">
                {stage.note}
              </p>
            </div>
          </div>

          {/* Right: microbe inspector */}
          <div className="flex flex-col bg-sink/50 p-8 sm:p-12">
            <p className="lab-readout mb-6 text-xs">{lab.inhabitants}</p>
            <div className="flex flex-col gap-4">
              {lab.microbes.map((m) => {
                const open = microbe === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => setMicrobe(open ? null : m.key)}
                    className={`text-left transition-colors duration-300 ${
                      open
                        ? 'border-phosphor/60 bg-phosphor/[0.06]'
                        : 'border-line bg-surface/60 hover:border-ink/30'
                    } rounded-sm border p-5`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl text-ink">
                        {m.name}
                      </h3>
                      <span
                        className={`font-mono text-lg leading-none ${open ? 'text-phosphor' : 'text-ash'}`}
                      >
                        {open ? '−' : '+'}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[0.62rem] italic tracking-[0.04em] text-phosphor">
                      {m.latin}
                    </p>
                    <div
                      className={`grid transition-all duration-500 ease-archive ${
                        open
                          ? 'mt-4 grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                          {m.role}
                        </p>
                        <p className="text-pretty mt-2 text-sm leading-relaxed text-ink/80">
                          {m.makes}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-8">
              <p className="text-pretty border-l-2 border-levain/50 pl-4 font-display text-lg italic leading-snug text-ink/70">
                {lab.quote}
              </p>
            </div>
          </div>
        </div>

        {/* Bread microscope — macro to micro */}
        <div className="reveal mt-8">
          <div className="mb-5 flex items-baseline gap-4">
            <span className="h-px w-10 bg-line" />
            <h3 className="font-display text-2xl text-ink">
              {lab.micro.heading}
            </h3>
          </div>
          <BreadMicroscope />
        </div>

        {/* Dough calculator */}
        <div className="reveal mt-8">
          <DoughCalculator />
        </div>
      </div>
    </section>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="lab-readout text-[0.58rem]">{label}</p>
      <p className="font-mono text-xl text-ink">{value}</p>
    </div>
  );
}
