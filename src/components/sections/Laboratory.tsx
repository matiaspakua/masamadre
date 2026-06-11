'use client';

import { useState } from 'react';
import { LAB_STAGES, MICROBES } from '@/lib/content';
import StarterJar from '@/components/lab/StarterJar';
import PhMeter from '@/components/lab/PhMeter';
import { useReveal } from '@/lib/useReveal';

// The required centrepiece: a fermentation workstation. The user advances the
// culture through its stages and watches the jar, pH, temperature, and gas
// activity respond together — and can inspect the two microbe populations
// doing the work. This is where the page spends its boldness.
export default function Laboratory() {
  const ref = useReveal<HTMLElement>();
  const [stageIdx, setStageIdx] = useState(2);
  const [microbe, setMicrobe] = useState<string | null>(null);

  const stage = LAB_STAGES[stageIdx];
  const rise = 0.42 + stage.activity * 0.32;

  return (
    <section
      id="laboratory"
      ref={ref}
      className="section-pad relative bg-gradient-to-b from-char via-soot to-char"
    >
      <div className="glow-levain pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-6xl">
        <div className="reveal mb-4 flex items-center gap-4">
          <span className="font-mono text-sm text-levain">III</span>
          <span className="h-px w-10 bg-crumb" />
          <span className="eyebrow">The Laboratory</span>
        </div>
        <h2 className="reveal display text-balance text-[clamp(2.4rem,6vw,5rem)]">
          A culture, <span className="italic text-levain">observed</span>
        </h2>
        <p className="reveal text-pretty mt-6 max-w-reading leading-relaxed text-linen/80">
          Masa madre is a symbiosis: wild yeast and lactic acid bacteria living
          in flour and water. Advance the ferment and watch the workstation
          respond — gas rising, pH falling, the loaf learning to protect itself.
        </p>

        {/* The workstation */}
        <div className="reveal mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-crumb bg-crumb lg:grid-cols-[1fr_1.1fr]">
          {/* Left: the live jar + instruments */}
          <div className="relative flex flex-col items-center gap-8 bg-pumpernickel/90 p-8 sm:p-12">
            <div className="flex w-full items-stretch justify-between gap-6">
              <div className="h-44">
                <PhMeter ph={stage.ph} />
              </div>
              <StarterJar activity={stage.activity} rise={rise} />
              <div className="flex flex-col justify-center gap-6 text-right">
                <Readout label="Temp" value={stage.temp} />
                <Readout label="Elapsed" value={stage.hours} />
                <Readout
                  label="Gas"
                  value={`${Math.round(stage.activity * 100)}%`}
                />
              </div>
            </div>

            {/* Stage scrubber */}
            <div className="w-full">
              <div className="flex items-center justify-between">
                {LAB_STAGES.map((s, i) => (
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
                          : 'border-ash/50 bg-transparent group-hover:border-linen'
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
              <div className="relative mt-3 h-px w-full bg-crumb">
                <div
                  className="absolute top-0 h-full bg-levain transition-all duration-500 ease-archive"
                  style={{
                    width: `${(stageIdx / (LAB_STAGES.length - 1)) * 100}%`,
                  }}
                />
              </div>
              <p className="text-pretty mt-5 min-h-[3.5rem] text-sm leading-relaxed text-linen/80">
                {stage.note}
              </p>
            </div>
          </div>

          {/* Right: microbe inspector */}
          <div className="flex flex-col bg-soot/80 p-8 sm:p-12">
            <p className="lab-readout mb-6 text-xs">Inhabitants · tap to inspect</p>
            <div className="flex flex-col gap-4">
              {MICROBES.map((m) => {
                const open = microbe === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => setMicrobe(open ? null : m.key)}
                    className={`text-left transition-colors duration-300 ${
                      open
                        ? 'border-phosphor/60 bg-phosphor/[0.06]'
                        : 'border-crumb hover:border-linen/30'
                    } rounded-sm border p-5`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl text-linen">
                        {m.name}
                      </h3>
                      <span
                        className={`font-mono text-lg leading-none ${open ? 'text-phosphor' : 'text-ash'}`}
                      >
                        {open ? '−' : '+'}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[0.62rem] italic tracking-[0.04em] text-phosphor/80">
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
                        <p className="text-pretty mt-2 text-sm leading-relaxed text-linen/80">
                          {m.makes}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto pt-8">
              <p className="text-pretty border-l border-levain/50 pl-4 font-display text-lg italic leading-snug text-linen/70">
                “Yeast makes the gas. Bacteria make the sour. Together they make
                the bread — and keep it safe.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="lab-readout text-[0.58rem]">{label}</p>
      <p className="font-mono text-xl text-linen">{value}</p>
    </div>
  );
}
