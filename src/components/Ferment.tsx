'use client';

import { useEffect, useRef } from 'react';
import { startFerment, subscribeFerment } from '@/lib/ferment';

// The persistent fermentation instrument. A glass column on the page edge whose
// level rises with the gas, beside a live readout of pH, gas and elapsed hours.
// It is the visible proof that the whole page is one living culture maturing as
// you scroll. Lives on the LEFT (the section index owns the right edge); folds
// to a slim base strip on small screens.
export default function Ferment() {
  const fill = useRef<HTMLDivElement>(null);
  const ph = useRef<HTMLSpanElement>(null);
  const gas = useRef<HTMLSpanElement>(null);
  const hours = useRef<HTMLSpanElement>(null);
  const mFill = useRef<HTMLDivElement>(null);
  const mPh = useRef<HTMLSpanElement>(null);
  const mGas = useRef<HTMLSpanElement>(null);
  const mHours = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stop = startFerment();
    const unsub = subscribeFerment((s) => {
      const pct = `${(s.gas * 100).toFixed(0)}%`;
      const phTxt = s.ph.toFixed(1);
      const hTxt = `${s.hours.toFixed(1)} h`;
      if (fill.current) fill.current.style.height = pct;
      if (mFill.current) mFill.current.style.width = pct;
      if (ph.current) ph.current.textContent = phTxt;
      if (mPh.current) mPh.current.textContent = phTxt;
      if (gas.current) gas.current.textContent = pct;
      if (mGas.current) mGas.current.textContent = pct;
      if (hours.current) hours.current.textContent = hTxt;
      if (mHours.current) mHours.current.textContent = hTxt;
    });
    return () => {
      unsub();
      stop();
    };
  }, []);

  return (
    <>
      {/* Desktop: vertical glass instrument on the left edge */}
      <aside
        aria-hidden="true"
        className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 select-none flex-col items-center gap-4 lg:flex"
      >
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.34em] text-ash [writing-mode:vertical-rl] [transform:rotate(180deg)]">
          Cultivo&nbsp;vivo
        </span>

        {/* Glass column */}
        <div className="relative h-[42vh] w-7 overflow-hidden rounded-full border border-line bg-surface/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] backdrop-blur-sm">
          {/* pH scale ticks */}
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="absolute left-0 h-px w-2 bg-line"
              style={{ top: `${10 + i * 20}%` }}
            />
          ))}
          {/* rising ferment */}
          <div
            ref={fill}
            className="ferment-fill absolute inset-x-0 bottom-0 overflow-hidden transition-[height] duration-200 ease-out"
            style={{ height: '0%' }}
          >
            <span className="bubble-accent" style={{ left: '28%', width: 6, height: 6, animationDuration: '3.2s' }} />
            <span className="bubble-accent" style={{ left: '60%', width: 5, height: 5, animationDuration: '2.6s', animationDelay: '0.7s' }} />
            <span className="bubble-accent" style={{ left: '44%', width: 8, height: 8, animationDuration: '4s', animationDelay: '1.4s' }} />
            <span className="absolute inset-x-0 top-0 h-1.5 -translate-y-1/2 bg-[color:var(--accent)] opacity-70 blur-[2px]" />
          </div>
        </div>

        {/* Readout */}
        <div className="flex flex-col items-center gap-1 font-mono text-[0.58rem] uppercase tracking-[0.18em]">
          <span className="flex items-baseline gap-1">
            <span className="text-ash">pH</span>
            <span ref={ph} className="text-sm tracking-normal text-[color:var(--accent)]">6.0</span>
          </span>
          <span className="text-ash">
            gas <span ref={gas} className="text-ink">0%</span>
          </span>
          <span ref={hours} className="text-ash">0.0 h</span>
        </div>
      </aside>

      {/* Mobile: slim base strip */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-line bg-paper/85 px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] backdrop-blur lg:hidden"
      >
        <span className="text-ash">Cultivo</span>
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-line">
          <div
            ref={mFill}
            className="absolute inset-y-0 left-0 bg-[color:var(--accent)] transition-[width] duration-200 ease-out"
            style={{ width: '0%' }}
          />
        </div>
        <span className="flex items-center gap-1">
          <span className="text-ash">pH</span>
          <span ref={mPh} className="text-[color:var(--accent)]">6.0</span>
        </span>
        <span className="hidden items-center gap-1 sm:flex">
          <span className="text-ash">gas</span>
          <span ref={mGas} className="text-ink">0%</span>
        </span>
        <span ref={mHours} className="text-ash">0.0 h</span>
      </div>
    </>
  );
}
