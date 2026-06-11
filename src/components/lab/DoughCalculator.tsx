'use client';

import { useState } from 'react';
import { useContent } from '@/lib/i18n';

// Baker's-percentage dough calculator. Everything is a percentage of flour
// weight — the baker's standard. Sliders rebalance the recipe live; the dough
// ball grows with total weight and looks wetter at higher hydration.
export default function DoughCalculator() {
  const { lab } = useContent();
  const t = lab.calc;

  const [flour, setFlour] = useState(500);
  const [hydration, setHydration] = useState(72);
  const [saltPct, setSaltPct] = useState(2);
  const [starterPct, setStarterPct] = useState(20);

  const water = Math.round((flour * hydration) / 100);
  const salt = Math.round((flour * saltPct) / 100);
  const starter = Math.round((flour * starterPct) / 100);
  const total = flour + water + salt + starter;

  // Dough-ball visuals scale with total weight (200..1600g → ~64..150px) and
  // hydration controls the "slump" (flatter, glossier when wetter).
  const size = Math.max(64, Math.min(150, 60 + total / 14));
  const slump = 1 - (hydration - 50) / 140; // 1 = round, lower = flatter
  const gloss = 0.25 + (hydration - 50) / 110;

  const rows: { label: string; value: number; pct: string; tone: string }[] = [
    { label: t.flour, value: flour, pct: '100%', tone: 'bg-levain' },
    { label: t.water, value: water, pct: `${hydration}%`, tone: 'bg-phosphor' },
    { label: t.salt, value: salt, pct: `${saltPct}%`, tone: 'bg-ember' },
    {
      label: t.starter,
      value: starter,
      pct: `${starterPct}%`,
      tone: 'bg-ink/60',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-[1.05fr_0.95fr]">
      {/* Controls */}
      <div className="bg-surface p-7 sm:p-8">
        <div className="mb-6">
          <p className="lab-readout text-xs">{t.sub}</p>
          <h4 className="font-display text-2xl text-ink">{t.heading}</h4>
        </div>

        {/* Flour weight (the anchor: 100%) */}
        <label className="block">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ash">
              {t.flour} · 100%
            </span>
            <span className="font-mono text-lg text-ink">
              {flour}
              <span className="text-ash"> {t.grams}</span>
            </span>
          </div>
          <input
            type="range"
            min={200}
            max={1500}
            step={10}
            value={flour}
            onChange={(e) => setFlour(Number(e.target.value))}
            className="mm-range mt-2"
            aria-label={t.flour}
          />
        </label>

        <Slider
          label={t.hydration}
          unit="%"
          min={55}
          max={95}
          value={hydration}
          onChange={setHydration}
        />
        <Slider
          label={t.saltPct}
          unit="%"
          min={1}
          max={3}
          step={0.1}
          value={saltPct}
          onChange={setSaltPct}
        />
        <Slider
          label={t.starterPct}
          unit="%"
          min={5}
          max={40}
          value={starterPct}
          onChange={setStarterPct}
        />

        <p className="text-pretty mt-5 text-xs leading-relaxed text-ash">
          {t.note}
        </p>
      </div>

      {/* Readout + dough ball */}
      <div className="flex flex-col bg-sink/60 p-7 sm:p-8">
        <div className="flex flex-1 items-center justify-center py-4">
          <div
            className="relative bg-gradient-to-b from-levain/70 to-ember/60 shadow-[0_16px_30px_-18px_rgba(42,32,24,0.6)] transition-all duration-500 ease-archive"
            style={{
              width: `${size}px`,
              height: `${size * slump}px`,
              borderRadius: '50%',
            }}
          >
            <span
              className="absolute left-[22%] top-[16%] h-1/3 w-1/4 rounded-full bg-white transition-opacity duration-500"
              style={{ opacity: gloss }}
            />
          </div>
        </div>

        {/* Proportion bars */}
        <div className="space-y-2.5">
          {rows.map((r) => (
            <div key={r.label}>
              <div className="flex items-baseline justify-between font-mono text-[0.7rem]">
                <span className="uppercase tracking-[0.1em] text-ash">
                  {r.label} · {r.pct}
                </span>
                <span className="text-ink">
                  {r.value} {t.grams}
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-line">
                <div
                  className={`h-full ${r.tone} transition-all duration-500 ease-archive`}
                  style={{ width: `${(r.value / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ash">
            {t.total}
          </span>
          <span className="font-mono text-2xl text-levain">
            {total} <span className="text-base text-ash">{t.grams}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  unit,
  min,
  max,
  step = 1,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="mt-5 block">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ash">
          {label}
        </span>
        <span className="font-mono text-lg text-ink">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mm-range mt-2"
        aria-label={label}
      />
    </label>
  );
}
