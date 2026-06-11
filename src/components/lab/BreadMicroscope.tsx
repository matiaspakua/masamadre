'use client';

import { useState } from 'react';
import { useContent } from '@/lib/i18n';

// A macro→micro zoom explorer. The user steps the magnification from a whole
// loaf down to the molecular level; each level is an animated SVG "specimen"
// under a lens, paired with notes on composition, biology, and properties.
// Stepping deeper dives into the current scene (it scales up and fades) while
// the next scene rises from small — a continuous zoom illusion.
export default function BreadMicroscope() {
  const { lab } = useContent();
  const m = lab.micro;
  const [level, setLevel] = useState(0);
  const last = m.levels.length - 1;
  const active = m.levels[level];

  const scenes = [Loaf, Crumb, Gluten, Microbes, Molecular];

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-2">
      {/* The lens */}
      <div className="relative flex flex-col items-center justify-center bg-sink/50 p-7 sm:p-10">
        <div className="relative aspect-square w-full max-w-[22rem]">
          {/* stacked scenes */}
          <div className="absolute inset-0 overflow-hidden rounded-full border border-ink/15 bg-[#f3e7d2] shadow-[inset_0_0_40px_rgba(42,32,24,0.25)]">
            {scenes.map((Scene, i) => {
              const state =
                i === level ? 'on' : i < level ? 'past' : 'next';
              const scale =
                state === 'on' ? 1 : state === 'past' ? 2.3 : 0.45;
              return (
                <div
                  key={i}
                  className="absolute inset-0 transition-all duration-700 ease-archive"
                  style={{
                    opacity: state === 'on' ? 1 : 0,
                    transform: `scale(${scale})`,
                  }}
                  aria-hidden={state !== 'on'}
                >
                  <Scene />
                </div>
              );
            })}
            {/* crosshair + vignette */}
            <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(42,32,24,0.35)]" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/10" />
            <div className="pointer-events-none absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-ink/10" />
          </div>

          {/* magnification chip */}
          <div className="absolute right-1 top-1 rounded-full border border-line bg-surface/90 px-3 py-1 font-mono text-xs text-phosphor shadow-sm backdrop-blur">
            {active.mag}
          </div>
        </div>

        {/* zoom controls */}
        <div className="mt-7 flex w-full max-w-[22rem] items-center gap-3">
          <button
            onClick={() => setLevel((v) => Math.max(0, v - 1))}
            disabled={level === 0}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono text-lg text-ink transition-colors hover:border-levain hover:text-levain disabled:opacity-30"
            aria-label="Zoom out"
          >
            −
          </button>
          <div className="flex flex-1 items-center justify-between">
            {m.levels.map((lv, i) => (
              <button
                key={lv.key}
                onClick={() => setLevel(i)}
                className="group flex flex-col items-center gap-1.5"
                aria-pressed={i === level}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full border transition-all ${
                    i === level
                      ? 'scale-125 border-levain bg-levain'
                      : 'border-ash/50 group-hover:border-ink'
                  }`}
                />
                <span
                  className={`font-mono text-[0.56rem] ${i === level ? 'text-levain' : 'text-ash'}`}
                >
                  {lv.mag}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setLevel((v) => Math.min(last, v + 1))}
            disabled={level === last}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono text-lg text-ink transition-colors hover:border-levain hover:text-levain disabled:opacity-30"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>

      {/* The notes panel */}
      <div className="flex flex-col bg-surface p-8 sm:p-10">
        <div className="mb-5 flex items-center justify-between">
          <p className="lab-readout text-xs">{m.sub}</p>
          <div className="text-right">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ash">
              {m.scaleLabel}
            </p>
            <p className="font-mono text-sm text-ink">{active.scale}</p>
          </div>
        </div>

        {/* scale bar */}
        <div className="mb-6 flex items-center gap-2">
          <span className="h-2 w-2 border-l border-ink/40" />
          <span className="h-px flex-1 bg-ink/30" />
          <span className="h-2 w-2 border-r border-ink/40" />
        </div>

        <h4 className="display text-3xl text-ink">{active.title}</h4>
        <p className="text-pretty mt-3 leading-relaxed text-ink/80">
          {active.body}
        </p>

        <ul className="mt-6 space-y-2.5">
          {active.notes.map((note, i) => (
            <li
              key={note}
              className="flex items-start gap-3 border-l-2 border-phosphor/40 bg-phosphor/[0.05] py-2 pl-3"
              style={{ animation: `mm-pulse 0s` }}
            >
              <span className="mt-0.5 font-mono text-[0.62rem] text-phosphor">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-pretty text-sm leading-snug text-ink/85">
                {note}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-auto pt-6 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ash">
          {m.magLabel}: {active.mag}
        </p>
      </div>
    </div>
  );
}

/* ---- Specimen scenes (viewBox 0 0 100 100) ---- */

function Loaf() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <rect width="100" height="100" fill="#f1e3cc" />
      <g className="mm-anim mm-wobble">
        <ellipse cx="50" cy="56" rx="36" ry="24" fill="#b9772a" />
        <ellipse cx="50" cy="56" rx="36" ry="24" fill="url(#loafShade)" />
        <ellipse cx="44" cy="48" rx="22" ry="11" fill="#d79a4a" opacity="0.5" />
        {/* scoring */}
        <path d="M30 50 Q50 44 70 52" stroke="#7c4a18" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M34 58 Q50 53 66 60" stroke="#7c4a18" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
      </g>
      {/* flour dust */}
      <g fill="#f6ecd8" opacity="0.7">
        <circle cx="38" cy="42" r="0.8" />
        <circle cx="58" cy="45" r="0.7" />
        <circle cx="49" cy="40" r="0.6" />
      </g>
      <defs>
        <radialGradient id="loafShade" cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#e0a85a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8a4f1a" stopOpacity="0.2" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function Crumb() {
  // Irregular alveoli of the crumb.
  const holes = [
    [28, 30, 9], [55, 26, 6], [74, 38, 8], [38, 52, 11], [62, 56, 7],
    [22, 64, 6], [80, 64, 5], [48, 72, 9], [68, 78, 6], [32, 82, 7],
    [50, 44, 5], [16, 44, 4],
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <rect width="100" height="100" fill="#e7d3b1" />
      <g>
        {holes.map(([x, y, r], i) => (
          <g key={i} className="mm-anim mm-pulse" style={{ animationDelay: `${i * 0.3}s`, transformOrigin: `${x}px ${y}px` }}>
            <circle cx={x} cy={y} r={r} fill="#c9ab7e" />
            <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.55} fill="#b5946a" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function Gluten() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <rect width="100" height="100" fill="#eaddc2" />
      {/* starch granules */}
      <g>
        {[[30, 36, 9, 6], [64, 32, 7, 5], [44, 60, 10, 7], [72, 64, 8, 6], [22, 66, 6, 5], [54, 80, 7, 5]].map(
          ([x, y, rx, ry], i) => (
            <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#f3ead6" stroke="#d8c39c" strokeWidth="0.6" className="mm-anim mm-drift" style={{ animationDelay: `${i * 0.5}s`, transformOrigin: `${x}px ${y}px` }} />
          ),
        )}
      </g>
      {/* gluten strands */}
      <g stroke="#9a7a4a" fill="none" strokeLinecap="round" opacity="0.75">
        <path d="M6 20 Q40 30 60 14 T96 26" strokeWidth="1.5" className="mm-anim mm-drift2" />
        <path d="M8 50 Q34 40 58 54 T98 48" strokeWidth="1.8" />
        <path d="M4 74 Q40 64 64 78 T96 70" strokeWidth="1.4" className="mm-anim mm-drift" />
        <path d="M22 6 Q30 40 18 70 T34 98" strokeWidth="1.2" opacity="0.7" />
        <path d="M74 4 Q66 38 82 68 T70 98" strokeWidth="1.3" opacity="0.7" />
      </g>
    </svg>
  );
}

function Microbes() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <rect width="100" height="100" fill="#efe6d2" />
      {/* rising CO2 */}
      <g fill="#ffffff" opacity="0.7">
        {[[26, 0.9], [54, 1.2], [78, 0.8]].map(([x, r], i) => (
          <circle key={i} cx={x} cy={90} r={r as number} className="mm-floatup" style={{ animationDelay: `${i * 1.1}s` }} />
        ))}
      </g>
      {/* lactic acid bacteria — rods */}
      <g>
        {[[24, 30, 18], [70, 24, -24], [60, 70, 40], [30, 76, -12], [82, 58, 8]].map(([x, y, rot], i) => (
          <g key={i} className="mm-anim mm-drift2" style={{ animationDelay: `${i * 0.6}s`, transformOrigin: `${x}px ${y}px` }}>
            <rect x={x - 9} y={y - 3} width="18" height="6" rx="3" fill="#8aa98c" stroke="#5f7d62" strokeWidth="0.6" transform={`rotate(${rot} ${x} ${y})`} />
          </g>
        ))}
      </g>
      {/* yeast — budding circles */}
      <g>
        {[[44, 42, 11], [72, 50, 8], [34, 58, 7]].map(([x, y, r], i) => (
          <g key={i} className="mm-anim mm-drift" style={{ animationDelay: `${i * 0.8}s`, transformOrigin: `${x}px ${y}px` }}>
            <circle cx={x} cy={y} r={r} fill="#ecca85" stroke="#c79a45" strokeWidth="0.8" />
            <circle cx={x + r * 0.8} cy={y - r * 0.7} r={r * 0.45} fill="#ecca85" stroke="#c79a45" strokeWidth="0.7" />
            <circle cx={x - r * 0.2} cy={y} r={r * 0.3} fill="#c79a45" opacity="0.6" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function Molecular() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <rect width="100" height="100" fill="#ece2cf" />
      {/* polysaccharide hexagon chain (starch) */}
      <g stroke="#2a2018" fill="none" strokeWidth="1.3" opacity="0.8" className="mm-anim mm-drift">
        {[14, 34, 54, 74].map((x, i) => (
          <polygon key={i} points={hexPoints(x, 30, 9)} />
        ))}
        <path d="M23 30 H25 M43 30 H45 M63 30 H65" strokeWidth="1.2" />
      </g>
      {/* folded gluten protein coil */}
      <path
        d="M12 64 q8 -12 16 0 t16 0 t16 0 t16 0"
        stroke="#c0741a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        className="mm-anim mm-drift2"
      />
      {/* lactic acid molecule */}
      <g className="mm-anim mm-spin" style={{ transformOrigin: '60px 80px' }}>
        <line x1="50" y1="84" x2="60" y2="80" stroke="#2a2018" strokeWidth="1.2" />
        <line x1="60" y1="80" x2="70" y2="84" stroke="#2a2018" strokeWidth="1.2" />
        <line x1="60" y1="80" x2="60" y2="70" stroke="#2a2018" strokeWidth="1.2" />
        <circle cx="50" cy="84" r="4" fill="#0e7a6b" />
        <circle cx="60" cy="80" r="4" fill="#2a2018" />
        <circle cx="70" cy="84" r="4" fill="#0e7a6b" />
        <circle cx="60" cy="70" r="3.4" fill="#c0741a" />
      </g>
    </svg>
  );
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
}
