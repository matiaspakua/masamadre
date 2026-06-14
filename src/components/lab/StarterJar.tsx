'use client';

import { useMemo } from 'react';

// The signature element: a living starter in a glass jar. Wild yeast produces
// the CO2 bubbles that rise through the levain; `activity` (0..1) scales how
// many bubbles appear and how fast, so the jar visibly comes alive across the
// fermentation stages in the Laboratory.
export default function StarterJar({
  activity = 0.6,
  rise = 0.62,
  showLabel = true,
  className = '',
}: {
  activity?: number;
  rise?: number;
  showLabel?: boolean;
  className?: string;
}) {
  const count = Math.round(8 + activity * 28);

  // Deterministic, seeded bubbles. Math.random() would diverge between the
  // server render and the client hydration and trip React's hydration check;
  // a seeded PRNG derived from `activity` produces identical values on both.
  const bubbles = useMemo(() => {
    let seed = Math.floor(activity * 997) + count + 1;
    const rng = () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return Array.from({ length: count }).map((_, i) => {
      const size = 3 + rng() * (6 + activity * 10);
      const dur = 2.4 + rng() * 3 - activity * 1.2;
      return {
        id: i,
        left: 8 + rng() * 84,
        size,
        duration: Math.max(1.2, dur),
        delay: rng() * 4,
      };
    });
  }, [count, activity]);

  return (
    <div
      className={`relative aspect-[3/4] w-full ${className}`}
      aria-hidden="true"
    >
      {/* Ambient warmth behind the glass */}
      <div className="glow-levain absolute inset-0 scale-125" />

      {/* Jar body */}
      <div className="absolute inset-0 overflow-hidden rounded-[14%_14%_22%_22%/8%_8%_16%_16%] border border-ink/15 bg-gradient-to-b from-white/70 to-white/30 shadow-[0_18px_40px_-28px_rgba(42,32,24,0.5)] backdrop-blur-[1px]">
        {/* Glass vertical highlight */}
        <div className="absolute left-[14%] top-0 h-full w-[8%] bg-gradient-to-r from-white/80 to-transparent" />

        {/* The levain itself */}
        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-levain/40 bg-gradient-to-b from-levain/55 via-levain/40 to-ember/45"
          style={{ height: `${rise * 100}%` }}
        >
          {/* Bubbled, porous surface texture */}
          <div className="absolute inset-0 opacity-50 [background:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.45)_0,transparent_8%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.3)_0,transparent_7%),radial-gradient(circle_at_45%_80%,rgba(255,255,255,0.35)_0,transparent_6%)]" />

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
      <div className="absolute inset-x-[18%] -top-1 h-3 rounded-full border border-ink/20 bg-white/60" />

      {/* Specimen label */}
      {showLabel && (
        <div className="absolute bottom-[12%] left-1/2 w-[62%] -translate-x-1/2 rotate-[-1.5deg] border border-line bg-surface/90 px-3 py-2 text-center shadow-sm backdrop-blur-sm">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ash">
            Specimen 01
          </p>
          <p className="font-display text-sm italic text-ink">Levain vivant</p>
        </div>
      )}
    </div>
  );
}
