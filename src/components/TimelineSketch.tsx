'use client';

// Hand-drawn-style line illustrations, one per timeline era. Strokes carry the
// `sketch-stroke` class and pathLength=1 so the Timeline can "draw them on" via
// stroke-dashoffset as each card scrolls in. A feTurbulence displacement filter
// gives the lines a gentle, pencil-on-paper wobble.
const ICONS: Record<number, React.ReactElement> = {
  // 0 — Wheat ear
  0: (
    <>
      <path className="sketch-stroke" pathLength={1} d="M32 60 L32 10" />
      <path className="sketch-stroke" pathLength={1} d="M32 30 Q22 28 22 20" />
      <path className="sketch-stroke" pathLength={1} d="M32 30 Q42 28 42 20" />
      <path className="sketch-stroke" pathLength={1} d="M32 24 Q24 22 24 14" />
      <path className="sketch-stroke" pathLength={1} d="M32 24 Q40 22 40 14" />
      <path className="sketch-stroke" pathLength={1} d="M32 18 Q26 16 26 9" />
      <path className="sketch-stroke" pathLength={1} d="M32 18 Q38 16 38 9" />
      <path className="sketch-stroke" pathLength={1} d="M32 46 Q22 44 18 50" />
      <path className="sketch-stroke" pathLength={1} d="M32 46 Q42 44 46 50" />
    </>
  ),
  // 1 — Round loaf with scoring
  1: (
    <>
      <path className="sketch-stroke" pathLength={1} d="M14 38 Q14 22 32 22 Q50 22 50 38 Q50 47 32 47 Q14 47 14 38 Z" />
      <path className="sketch-stroke" pathLength={1} d="M22 31 Q32 27 42 31" />
      <path className="sketch-stroke" pathLength={1} d="M22 38 Q32 34 42 38" />
    </>
  ),
  // 2 — Domed clay oven with smoke
  2: (
    <>
      <path className="sketch-stroke" pathLength={1} d="M14 47 Q14 22 32 22 Q50 22 50 47" />
      <path className="sketch-stroke" pathLength={1} d="M10 47 H54" />
      <path className="sketch-stroke" pathLength={1} d="M26 47 L26 36 Q32 31 38 36 L38 47" />
      <path className="sketch-stroke" pathLength={1} d="M42 18 Q47 14 42 9 Q38 6 42 2" />
    </>
  ),
  // 3 — Scroll (Pliny writes it down)
  3: (
    <>
      <path className="sketch-stroke" pathLength={1} d="M22 22 H42 V50 H22 Z" />
      <path className="sketch-stroke" pathLength={1} d="M22 22 Q17 26 22 30" />
      <path className="sketch-stroke" pathLength={1} d="M42 42 Q47 46 42 50" />
      <path className="sketch-stroke" pathLength={1} d="M27 31 H37" />
      <path className="sketch-stroke" pathLength={1} d="M27 37 H37" />
      <path className="sketch-stroke" pathLength={1} d="M27 43 H33" />
    </>
  ),
  // 4 — Beer tankard (barm)
  4: (
    <>
      <path className="sketch-stroke" pathLength={1} d="M22 28 H40 V50 Q31 53 22 50 Z" />
      <path className="sketch-stroke" pathLength={1} d="M40 32 Q49 32 49 39 Q49 45 40 45" />
      <path className="sketch-stroke" pathLength={1} d="M22 28 Q26 22 30 28 Q34 22 38 28 Q42 24 40 28" />
    </>
  ),
  // 5 — Microscope (Pasteur)
  5: (
    <>
      <path className="sketch-stroke" pathLength={1} d="M22 52 Q32 56 42 52" />
      <path className="sketch-stroke" pathLength={1} d="M29 52 V34" />
      <path className="sketch-stroke" pathLength={1} d="M29 34 Q29 22 41 18" />
      <path className="sketch-stroke" pathLength={1} d="M38 14 L45 22" />
      <path className="sketch-stroke" pathLength={1} d="M25 41 H39" />
    </>
  ),
  // 6 — Western landscape, mountains & sun (Gold Rush)
  6: (
    <>
      <path className="sketch-stroke" pathLength={1} d="M10 46 L24 26 L34 39 L44 22 L54 46" />
      <path className="sketch-stroke" pathLength={1} d="M10 46 H54" />
      <circle className="sketch-stroke" pathLength={1} cx="40" cy="16" r="6" />
    </>
  ),
  // 7 — Campfire pot (Klondike)
  7: (
    <>
      <path className="sketch-stroke" pathLength={1} d="M24 36 H40 Q40 48 32 48 Q24 48 24 36 Z" />
      <path className="sketch-stroke" pathLength={1} d="M20 22 H44" />
      <path className="sketch-stroke" pathLength={1} d="M32 22 V30" />
      <path className="sketch-stroke" pathLength={1} d="M27 50 Q29 45 31 50 Q33 45 35 50" />
    </>
  ),
  // 8 — Factory with smoke (industrial eclipse)
  8: (
    <>
      <path className="sketch-stroke" pathLength={1} d="M14 50 V36 H26 V44 H38 V32 H46 V50" />
      <path className="sketch-stroke" pathLength={1} d="M12 50 H50" />
      <path className="sketch-stroke" pathLength={1} d="M42 32 Q47 28 42 22 Q38 18 42 14" />
    </>
  ),
  // 9 — Starter jar (kitchen revival)
  9: (
    <>
      <path className="sketch-stroke" pathLength={1} d="M22 26 H42 V48 Q32 52 22 48 Z" />
      <path className="sketch-stroke" pathLength={1} d="M20 26 H44" />
      <path className="sketch-stroke" pathLength={1} d="M25 22 H39 V26" />
      <circle className="sketch-stroke" pathLength={1} cx="29" cy="40" r="2.5" />
      <circle className="sketch-stroke" pathLength={1} cx="36" cy="36" r="2" />
      <circle className="sketch-stroke" pathLength={1} cx="33" cy="44" r="1.6" />
    </>
  ),
};

export default function TimelineSketch({
  eraIndex,
  className = '',
}: {
  eraIndex: number;
  className?: string;
}) {
  const id = `rough-${eraIndex}`;
  return (
    <svg
      viewBox="0 0 64 64"
      className={`text-levain ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      aria-hidden="true"
    >
      <defs>
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves={2}
            seed={eraIndex * 7}
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>{ICONS[eraIndex] ?? null}</g>
    </svg>
  );
}
