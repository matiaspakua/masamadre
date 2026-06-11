'use client';

import { useMemo } from 'react';

// The signature element: a living starter in a glass jar. Wild yeast produces
// the CO2 bubbles that rise through the levain; `activity` (0..1) scales how
// many bubbles appear and how fast, so the jar visibly comes alive across the
// fermentation stages in the Laboratory.
export default function StarterJar({
  activity = 0.6,
  rise = 0.62,
  className = '',
}: {
  activity?: number;
  rise?: number; // how high the levain fills the jar (0..1)
  className?: string;
}) {
  const count = Math.round(8 + activity * 28);

  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 3 + Math.random() * (6 + activity * 10);
        const dur = 2.4 + Math.random() * 3 - activity * 1.2;
        return {
          id: i,
          left: 8 + Math.random() * 84,
          size,
          duration: Math.max(1.2, dur),
          delay: Math.random() * 4,
        };
      }),
    [count, activity],
  );

  return (
    <div
      className={`relative aspect-[3/4] w-[min(78vw,360px)] ${className}`}
      aria-hidden="true"
    >
      {/* Ambient warmth behind the glass */}
      <div className="glow-levain absolute inset-0 scale-125" />

      {/* Jar body */}
      <div className="absolute inset-0 overflow-hidden rounded-[14%_14%_22%_22%/8%_8%_16%_16%] border border-linen/15 bg-gradient-to-b from-linen/[0.06] to-linen/[0.02] backdrop-blur-[1px]">
        {/* Glass vertical highlight */}
        <div className="absolute left-[14%] top-0 h-full w-[8%] bg-gradient-to-r from-linen/15 to-transparent" />

        {/* The levain itself */}
        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-levain/30 bg-gradient-to-b from-levain/45 via-ember/30 to-ember/40"
          style={{ height: `${rise * 100}%` }}
        >
          {/* Bubbled, porous surface texture */}
          <div className="absolute inset-0 opacity-50 [background:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25)_0,transparent_8%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.18)_0,transparent_7%),radial-gradient(circle_at_45%_80%,rgba(255,255,255,0.2)_0,transparent_6%)]" />

          {/* Rising CO2 */}
          {bubbles.map((b) => (
            <span
              key={b.id}
              className="bubble"
              style={{
                left: `${b.left}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
                animationDuration: `${b.duration}s`,
                animationDelay: `${b.delay}s`,
              }}
            />
          ))}

          {/* Frothy active crown */}
          <div className="absolute inset-x-0 top-0 h-3 -translate-y-1/2 bg-levain/60 blur-[2px]" />
        </div>
      </div>

      {/* Jar rim / lid ring */}
      <div className="absolute inset-x-[18%] -top-1 h-3 rounded-full border border-linen/25 bg-linen/10" />

      {/* Specimen label */}
      <div className="absolute bottom-[12%] left-1/2 w-[58%] -translate-x-1/2 rotate-[-1.5deg] border border-crumb bg-soot/70 px-3 py-2 text-center backdrop-blur-sm">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ash">
          Specimen 01
        </p>
        <p className="font-display text-sm italic text-linen">Levain vivant</p>
      </div>
    </div>
  );
}
