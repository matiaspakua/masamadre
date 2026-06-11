'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useContent } from '@/lib/i18n';

// A playable bake: the dough proportions feed a loaf that you send into the
// oven and watch spring, brown, and cool. Flour type, seeds, temperature and
// steam all change the formula — and the result. The loaf is a textured SVG
// driven by a single rAF "bake clock"; reduced-motion jumps straight to the
// finished result.

type FlourKey = 'white' | 'wholewheat' | 'spelt' | 'rye' | 'oat';

// Language-independent baking model, keyed to the flour content entries.
const FLOUR: Record<
  FlourKey,
  { absorb: number; rise: number; brown: number; raw: string; crumb: string }
> = {
  white: { absorb: 1.0, rise: 1.0, brown: 1.0, raw: '#ead9af', crumb: '#efdcab' },
  wholewheat: { absorb: 1.12, rise: 0.78, brown: 1.22, raw: '#d8c195', crumb: '#caa873' },
  spelt: { absorb: 0.96, rise: 0.9, brown: 1.08, raw: '#e3cf9f', crumb: '#e1c489' },
  rye: { absorb: 1.2, rise: 0.6, brown: 1.28, raw: '#c7ad7e', crumb: '#b08a5a' },
  oat: { absorb: 1.05, rise: 0.74, brown: 0.92, raw: '#ecdcb0', crumb: '#ecdcb0' },
};

const SEED_STYLE: Record<string, { fill: string; rx: number; ry: number }> = {
  sesame: { fill: '#efe6cb', rx: 1.5, ry: 2.4 },
  poppy: { fill: '#2c2622', rx: 1.1, ry: 1.1 },
  sunflower: { fill: '#6b5126', rx: 1.6, ry: 3 },
  flax: { fill: '#7a5a2e', rx: 1.3, ry: 2.6 },
  pumpkin: { fill: '#5f7d4a', rx: 2, ry: 3.2 },
};

// crust colour ramp: pale → golden → deep → dark
const RAMP = ['#ead9af', '#d59a4e', '#a86a28', '#75431a'];

function hexLerp(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const p = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `#${p.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
function rampColor(level: number) {
  const x = Math.max(0, Math.min(3, level));
  const i = Math.min(2, Math.floor(x));
  return hexLerp(RAMP[i], RAMP[i + 1], x - i);
}
const ease = (t: number) => t * t * (3 - 2 * t);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

// fixed scatter over the loaf dome for seed toppings
const SEED_POS = [
  [78, 92], [92, 86], [106, 84], [120, 88], [134, 94],
  [85, 99], [100, 95], [115, 95], [128, 100], [72, 100],
  [96, 89], [110, 90], [123, 93], [140, 100], [66, 96], [146, 95],
] as const;

export default function BakeLab() {
  const { lab } = useContent();
  const t = lab.bake;

  const [flour, setFlour] = useState(500);
  const [hydration, setHydration] = useState(72);
  const [saltPct, setSaltPct] = useState(2);
  const [starterPct, setStarterPct] = useState(20);
  const [flourType, setFlourType] = useState<FlourKey>('white');
  const [seeds, setSeeds] = useState<Set<string>>(new Set(['sesame']));
  const [temp, setTemp] = useState(230);
  const [steamPct, setSteamPct] = useState(60);

  const [phase, setPhase] = useState<'idle' | 'baking' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  const water = Math.round((flour * hydration) / 100);
  const salt = Math.round((flour * saltPct) / 100);
  const starter = Math.round((flour * starterPct) / 100);
  const total = flour + water + salt + starter;
  const steam = steamPct / 100;

  // ---- derived bake outcome ----
  const model = useMemo(() => {
    const f = FLOUR[flourType];
    const bakeTime = clamp(
      Math.round((18 + total * 0.022) * (235 / temp) * (0.92 + f.absorb * 0.08)),
      16,
      70,
    );
    const spring = clamp(
      Math.round(26 * f.rise * (0.75 + (hydration - 60) / 70) * (0.7 + steam * 0.6)),
      6,
      92,
    );
    const crust = clamp(
      f.brown * ((temp - 195) / 55) * (0.6 + bakeTime / 45) * (1.15 - steam * 0.35),
      0,
      3,
    );
    const crumb = clamp(
      (hydration - 58) / 9 + spring / 45 + (f.rise - 0.8) * 1.2,
      0,
      3,
    );
    let rating = 3;
    if (crumb >= 1.5) rating += 1;
    if (spring >= 28) rating += 1;
    if (crust > 2.6) rating -= 1;
    if (crust < 0.5) rating -= 1;
    rating = clamp(rating, 1, 5);
    return { bakeTime, spring, crust, crumb, rating };
  }, [flourType, total, temp, hydration, steam]);

  // ---- bake clock ----
  function bake() {
    cancelAnimationFrame(rafRef.current);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setProgress(1);
      setPhase('done');
      return;
    }
    setPhase('baking');
    setProgress(0);
    const dur = 7200;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setPhase('done');
    };
    rafRef.current = requestAnimationFrame(tick);
  }
  function reset() {
    cancelAnimationFrame(rafRef.current);
    setPhase('idle');
    setProgress(0);
  }
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // ---- visual state from progress ----
  const springProg = ease(clamp((progress - 0.12) / 0.3, 0, 1));
  const brownProg = ease(clamp((progress - 0.12) / 0.7, 0, 1));
  const cooling = progress > 0.92;

  const f = FLOUR[flourType];
  const loafScale = (0.82 + total / 4200) * (1 + (model.spring / 100) * springProg);
  const slack = 1 - (hydration - 55) / 150; // wetter = flatter
  const rx = 46 * (2 - slack) * 0.6;
  const ry = 30 * slack;
  const crustColor = hexLerp(f.raw, rampColor(model.crust), brownProg);
  const earOpen = springProg;

  const stageLabel =
    phase === 'idle'
      ? null
      : progress < 0.12
        ? t.stages.load
        : progress < 0.42
          ? t.stages.spring
          : progress < 0.82
            ? t.stages.crust
            : cooling
              ? t.stages.cooling
              : t.stages.done;
  const clockMin = Math.round(Math.min(progress / 0.92, 1) * model.bakeTime);

  const seedList = Array.from(seeds);
  const showSteam = phase === 'baking' && progress > 0.1;

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-2">
      {/* ---- controls ---- */}
      <div className="bg-surface p-7 sm:p-8">
        <div className="mb-6">
          <p className="lab-readout text-xs">{t.sub}</p>
          <h4 className="font-display text-2xl text-ink">{t.heading}</h4>
        </div>

        <Slider label={lab.calc.flour} unit={` ${lab.calc.grams}`} min={200} max={1500} step={10} value={flour} onChange={setFlour} />
        <Slider label={lab.calc.hydration} unit="%" min={55} max={95} value={hydration} onChange={setHydration} />
        <div className="mt-5 grid grid-cols-2 gap-5">
          <Slider label={lab.calc.saltPct} unit="%" min={1} max={3} step={0.1} value={saltPct} onChange={setSaltPct} />
          <Slider label={lab.calc.starterPct} unit="%" min={5} max={40} value={starterPct} onChange={setStarterPct} />
        </div>

        {/* flour type */}
        <p className="mt-7 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ash">
          {t.flourTypeLabel}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {t.flours.map((fl) => (
            <button
              key={fl.key}
              onClick={() => setFlourType(fl.key as FlourKey)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[0.66rem] transition-colors ${
                flourType === fl.key
                  ? 'border-levain bg-levain/15 text-levain'
                  : 'border-line text-ash hover:border-ink/40'
              }`}
            >
              {fl.name}
            </button>
          ))}
        </div>
        <p className="mt-2 min-h-[1.5rem] text-xs italic text-ash">
          {t.flours.find((fl) => fl.key === flourType)?.note}
        </p>

        {/* seeds */}
        <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ash">
          {t.seedsLabel}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {t.seeds.map((sd) => {
            const on = seeds.has(sd.key);
            return (
              <button
                key={sd.key}
                onClick={() =>
                  setSeeds((prev) => {
                    const n = new Set(prev);
                    n.has(sd.key) ? n.delete(sd.key) : n.add(sd.key);
                    return n;
                  })
                }
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[0.66rem] transition-colors ${
                  on
                    ? 'border-phosphor bg-phosphor/10 text-phosphor'
                    : 'border-line text-ash hover:border-ink/40'
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: SEED_STYLE[sd.key]?.fill }}
                />
                {sd.name}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-5">
          <Slider label={t.tempLabel} unit="°C" min={190} max={260} step={5} value={temp} onChange={setTemp} />
          <Slider label={t.steamLabel} unit="%" min={0} max={100} step={5} value={steamPct} onChange={setSteamPct} />
        </div>

        {/* formula readout */}
        <div className="mt-7 grid grid-cols-4 gap-2 border-t border-line pt-4 text-center font-mono">
          {[
            [lab.calc.water, water],
            [lab.calc.salt, salt],
            [lab.calc.starter, starter],
            [lab.calc.total, total],
          ].map(([k, v], i) => (
            <div key={i}>
              <p className="text-[0.56rem] uppercase tracking-[0.1em] text-ash">{k as string}</p>
              <p className={`text-sm ${i === 3 ? 'text-levain' : 'text-ink'}`}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---- oven ---- */}
      <div className="flex flex-col bg-sink/50 p-7 sm:p-8">
        <div className="relative">
          <svg viewBox="0 0 200 150" className="w-full">
            <defs>
              <radialGradient id="ovenHeat" cx="50%" cy="100%" r="80%">
                <stop offset="0%" stopColor="#b5562a" stopOpacity={phase === 'idle' ? 0.25 : 0.7} />
                <stop offset="55%" stopColor="#8a3d1a" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#1c130c" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ovenWall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a2c20" />
                <stop offset="100%" stopColor="#241a12" />
              </linearGradient>
              <filter id="loafTex">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="6" result="n" />
                <feColorMatrix in="n" type="saturate" values="0" />
              </filter>
              <filter id="shimmer">
                <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="1" seed="3" result="t">
                  <animate attributeName="baseFrequency" dur="9s" values="0.012 0.05;0.014 0.045;0.012 0.05" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="t" scale="3" />
              </filter>
              <clipPath id="loafClip">
                <ellipse cx="100" cy="112" rx={rx} ry={ry} transform={`translate(100 112) scale(${loafScale}) translate(-100 -112)`} />
              </clipPath>
            </defs>

            {/* oven chamber */}
            <rect x="6" y="6" width="188" height="138" rx="10" fill="url(#ovenWall)" />
            <rect x="6" y="6" width="188" height="138" rx="10" fill="url(#ovenHeat)" />
            {/* shimmer veil */}
            {phase === 'baking' && (
              <rect x="10" y="70" width="180" height="70" fill="#b5562a" opacity="0.12" filter="url(#shimmer)" />
            )}
            {/* rack */}
            <g stroke="#6a513a" strokeWidth="1.4" opacity="0.7">
              <line x1="22" y1="126" x2="178" y2="126" />
            </g>
            {/* heat element glow */}
            <ellipse cx="100" cy="140" rx="80" ry="8" fill="#c0741a" opacity={phase === 'idle' ? 0.18 : 0.4 + 0.2 * Math.sin(progress * 30)} />

            {/* loaf shadow */}
            <ellipse cx="100" cy="126" rx={rx * loafScale * 0.95} ry="5" fill="#000" opacity="0.3" />

            {/* loaf */}
            <g transform={`translate(100 112) scale(${loafScale}) translate(-100 -112)`}>
              <ellipse cx="100" cy="112" rx={rx} ry={ry} fill={crustColor} />
              {/* baked sheen */}
              <ellipse cx={100 - rx * 0.25} cy={112 - ry * 0.4} rx={rx * 0.55} ry={ry * 0.4} fill="#fff" opacity={0.12 + brownProg * 0.12} />
            </g>

            {/* crust / flour texture, clipped to loaf */}
            <g clipPath="url(#loafClip)">
              {/* flour dusting (burns off while baking) */}
              <rect x="50" y="78" width="100" height="60" filter="url(#loafTex)" style={{ mixBlendMode: 'screen' }} opacity={(1 - brownProg) * 0.45} />
              {/* crust blister/char (builds as it browns) */}
              <rect x="50" y="78" width="100" height="60" filter="url(#loafTex)" style={{ mixBlendMode: 'multiply' }} opacity={brownProg * 0.5} />
            </g>

            {/* scoring ear */}
            <g transform={`translate(100 112) scale(${loafScale}) translate(-100 -112)`}>
              <path
                d={`M${100 - rx * 0.5} ${112 - ry * 0.25} Q100 ${112 - ry * 0.55} ${100 + rx * 0.5} ${112 - ry * 0.2}`}
                fill="none"
                stroke="#5c3414"
                strokeWidth="1.4"
                opacity={0.5 + brownProg * 0.3}
              />
              {/* lifted ear flap */}
              <path
                d={`M${100 - rx * 0.42} ${112 - ry * 0.22} Q100 ${112 - ry * (0.55 + earOpen * 0.5)} ${100 + rx * 0.42} ${112 - ry * 0.18}`}
                fill={hexLerp(crustColor, '#5c3414', 0.25)}
                opacity={earOpen * 0.9}
              />
            </g>

            {/* seeds on the dome */}
            <g transform={`translate(100 112) scale(${loafScale}) translate(-100 -112)`}>
              {seedList.length > 0 &&
                SEED_POS.map(([sx, sy], i) => {
                  const sd = seedList[i % seedList.length];
                  const st = SEED_STYLE[sd];
                  // keep seeds within the dome
                  const dxn = (sx - 100) / rx;
                  if (Math.abs(dxn) > 1.05) return null;
                  return (
                    <ellipse
                      key={i}
                      cx={sx}
                      cy={sy - (1 - dxn * dxn) * ry * 0.5}
                      rx={st.rx}
                      ry={st.ry}
                      fill={st.fill}
                      transform={`rotate(${(i * 37) % 90} ${sx} ${sy})`}
                      opacity="0.92"
                    />
                  );
                })}
            </g>
          </svg>

          {/* steam */}
          {showSteam && (
            <div className="pointer-events-none absolute inset-0">
              {Array.from({ length: 4 + Math.round(steam * 5) }).map((_, i) => (
                <span
                  key={i}
                  className="absolute bottom-[28%] h-10 w-2 rounded-full bg-white/40 blur-[3px]"
                  style={{
                    left: `${30 + i * 9}%`,
                    animation: `mm-floatup ${2.6 + (i % 3) * 0.6}s ease-in ${i * 0.25}s infinite`,
                    opacity: 0.3 + steam * 0.4,
                  }}
                />
              ))}
            </div>
          )}

          {/* stage + clock overlay */}
          {phase !== 'idle' && (
            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-line bg-surface/85 px-3 py-1 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" style={{ animation: phase === 'baking' ? 'mm-pulse 1.2s ease-in-out infinite' : undefined }} />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink">{stageLabel}</span>
              <span className="font-mono text-[0.62rem] text-levain">
                {clockMin} {t.clock}
              </span>
            </div>
          )}
        </div>

        {/* bake controls / result */}
        {phase !== 'done' ? (
          <button
            onClick={bake}
            disabled={phase === 'baking'}
            className="mt-6 w-full rounded-sm bg-ember py-3 font-mono text-sm uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {phase === 'baking' ? t.bakingBtn : t.bakeBtn}
          </button>
        ) : (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="lab-readout text-xs">{t.result.title}</p>
              <p className="font-mono text-sm text-levain">
                {'★'.repeat(model.rating)}
                <span className="text-line">{'★'.repeat(5 - model.rating)}</span>
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Stat label={t.result.bakeTime} value={`${model.bakeTime} ${t.result.min}`} />
              <Stat label={t.result.spring} value={`${model.spring}%`} />
              <Stat label={t.result.crust} value={t.crustLevels[Math.round(model.crust)]} />
              <Stat label={t.result.crumb} value={t.crumbLevels[Math.round(model.crumb)]} />
            </div>

            {/* crumb cross-section payoff */}
            <div className="mt-4 overflow-hidden rounded-sm border border-line">
              <CrumbSlice openness={model.crumb} color={f.crumb} crust={rampColor(model.crust)} />
            </div>

            <button
              onClick={reset}
              className="mt-4 w-full rounded-sm border border-line py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:border-levain hover:text-levain"
            >
              {t.resetBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-line bg-surface px-3 py-2">
      <p className="font-mono text-[0.56rem] uppercase tracking-[0.12em] text-ash">{label}</p>
      <p className="font-display text-lg text-ink">{value}</p>
    </div>
  );
}

function CrumbSlice({
  openness,
  color,
  crust,
}: {
  openness: number;
  color: string;
  crust: string;
}) {
  // more open crumb → larger, fewer-but-bigger holes
  const holes = useMemo(() => {
    const n = 10 + Math.round(openness * 6);
    const maxR = 2 + openness * 2.4;
    return Array.from({ length: n }).map((_, i) => ({
      x: 18 + ((i * 47) % 164),
      y: 24 + ((i * 31) % 50),
      r: 1.4 + ((i * 13) % 10) / 10 * maxR,
    }));
  }, [openness]);
  return (
    <svg viewBox="0 0 200 90" className="w-full">
      <rect x="4" y="6" width="192" height="78" rx="40" fill={crust} />
      <rect x="12" y="14" width="176" height="62" rx="30" fill={color} />
      {holes.map((h, i) => (
        <circle key={i} cx={h.x} cy={h.y} r={h.r} fill="#fff" opacity="0.55" />
      ))}
    </svg>
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
    <label className="mt-5 block first:mt-0">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ash">
          {label}
        </span>
        <span className="font-mono text-base text-ink">
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
