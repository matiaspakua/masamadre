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

// crust colour ramp: pale floury → golden → deep golden-brown → dark crust
const RAMP = ['#e7dcc0', '#d49a4f', '#b06c25', '#7a4216'];

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

// horizontal fractions (−1..1 of the half-width) to scatter seeds across the
// upper crust; the y is derived from the dome curve at render time.
const SEED_FRAC = [
  -0.74, -0.58, -0.42, -0.26, -0.1, 0.06, 0.22, 0.38, 0.54, 0.7,
  -0.66, -0.34, -0.02, 0.3, 0.62, -0.48,
];

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
  const f = FLOUR[flourType];
  const springProg = ease(clamp((progress - 0.1) / 0.34, 0, 1));
  const brownProg = ease(clamp((progress - 0.18) / 0.66, 0, 1));
  const cooling = progress > 0.9;

  // Loaf geometry. Centre and the point where it sits on the rack are fixed;
  // the boule grows from there. Raw dough is slack (wide, low); oven spring
  // puffs the dome taller than it widens.
  const cx = 110;
  const sitY = 140;
  const sizeK = clamp(0.8 + total / 4200, 0.8, 1.32);
  const slack = clamp((hydration - 55) / 45, 0, 1); // wetter = flatter raw
  const grow = springProg * (0.26 + model.spring / 120);
  const RX = 54 * (1 + slack * 0.06 + grow * 0.14);
  const RY = 30 * (0.9 - slack * 0.08 + grow);

  // crust colours: a baked base, a lighter top highlight, a gentle edge, and a
  // darker tone reserved for the scored ear and grounding shadow.
  const base = hexLerp(f.raw, rampColor(model.crust), brownProg);
  const light = hexLerp(base, '#fff4e0', 0.34);
  const edge = hexLerp(base, '#8a5520', 0.26);
  const dark = hexLerp(base, '#3a1d0a', 0.5);
  const bloomCol = hexLerp('#ecdfc0', base, brownProg * 0.55); // exposed crumb

  // boule silhouette: domed top, gently rounded bottom
  const boule = (rx: number, ry: number) => {
    const my = sitY - ry;
    const ty = sitY - 2 * ry;
    return `M ${cx - rx} ${my} C ${cx - rx} ${my - ry * 0.9} ${cx - rx * 0.55} ${ty} ${cx} ${ty} C ${cx + rx * 0.55} ${ty} ${cx + rx} ${my - ry * 0.9} ${cx + rx} ${my} C ${cx + rx} ${my + ry * 0.82} ${cx + rx * 0.6} ${sitY} ${cx} ${sitY} C ${cx - rx * 0.6} ${sitY} ${cx - rx} ${my + ry * 0.82} ${cx - rx} ${my} Z`;
  };
  const boulePath = boule(RX, RY);
  const midY = sitY - RY;
  const topY = sitY - 2 * RY;

  // scored ear that blooms open with oven spring
  const ax = cx - RX * 0.42;
  const ay = midY - RY * 0.12;
  const bx = cx + RX * 0.3;
  const by = midY - RY * 0.74;
  const mx = (ax + bx) / 2;
  const my2 = (ay + by) / 2;
  const earLift = 3 + springProg * 10;
  const earCtrl = `${mx - 10 - earLift * 0.4} ${my2 - 6 - earLift}`;
  const cutCtrl = `${mx + 7} ${my2 + 5 + springProg * 5}`;
  const bloomPath = `M ${ax} ${ay} Q ${earCtrl} ${bx} ${by} Q ${cutCtrl} ${ax} ${ay} Z`;
  const earPath = `M ${ax} ${ay} Q ${earCtrl} ${bx} ${by}`;

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
          <svg viewBox="0 0 220 170" className="w-full">
            <defs>
              <radialGradient id="ovenHeat" cx="50%" cy="100%" r="85%">
                <stop offset="0%" stopColor="#c45a26" stopOpacity={phase === 'idle' ? 0.3 : 0.78} />
                <stop offset="55%" stopColor="#8a3d1a" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#1c130c" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ovenWall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a2c20" />
                <stop offset="100%" stopColor="#211711" />
              </linearGradient>
              {/* crust: highlight top-left, base, dark lower-right — roundness */}
              <radialGradient id="crustGrad" cx="42%" cy="32%" r="80%">
                <stop offset="0%" stopColor={light} />
                <stop offset="72%" stopColor={base} />
                <stop offset="100%" stopColor={edge} />
              </radialGradient>
              {/* soft grounding shadow along the base of the loaf */}
              <linearGradient id="ridge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="55%" stopColor={dark} stopOpacity="0" />
                <stop offset="100%" stopColor={dark} stopOpacity="0.32" />
              </linearGradient>
              <filter id="loafTex">
                <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="3" seed="6" result="n" />
                <feColorMatrix in="n" type="saturate" values="0" />
              </filter>
              <filter id="blister">
                <feTurbulence type="turbulence" baseFrequency="0.14" numOctaves="2" seed="9" result="n" />
                <feColorMatrix in="n" type="saturate" values="0" />
              </filter>
              <filter id="shimmer">
                <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="1" seed="3" result="tt">
                  <animate attributeName="baseFrequency" dur="9s" values="0.012 0.05;0.015 0.044;0.012 0.05" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="tt" scale="3" />
              </filter>
              <clipPath id="loafClip">
                <path
                  d={boulePath}
                  transform={`translate(${cx} ${sitY}) scale(${sizeK}) translate(${-cx} ${-sitY})`}
                />
              </clipPath>
            </defs>

            {/* oven chamber */}
            <rect x="6" y="6" width="208" height="158" rx="12" fill="url(#ovenWall)" />
            <rect x="6" y="6" width="208" height="158" rx="12" fill="url(#ovenHeat)" />
            {/* back-wall seams */}
            <g stroke="#000" strokeOpacity="0.12" strokeWidth="1">
              <line x1="6" y1="52" x2="214" y2="52" />
              <line x1="6" y1="100" x2="214" y2="100" />
            </g>
            {/* shimmer veil over the hot floor */}
            {phase === 'baking' && (
              <rect x="10" y="80" width="200" height="80" fill="#c45a26" opacity="0.1" filter="url(#shimmer)" />
            )}
            {/* rack */}
            <g stroke="#6a513a" strokeWidth="1.6" opacity="0.7">
              <line x1="20" y1="142" x2="200" y2="142" />
            </g>
            {/* heat element glow */}
            <ellipse
              cx={cx}
              cy="158"
              rx="92"
              ry="9"
              fill="#d06a1c"
              opacity={phase === 'idle' ? 0.2 : 0.42 + 0.18 * Math.sin(progress * 26)}
            />

            {/* contact shadow */}
            <ellipse cx={cx} cy={sitY + 2} rx={RX * sizeK * 0.96} ry="5" fill="#000" opacity="0.32" />

            {/* ---- the loaf (grows from the rack) ---- */}
            <g transform={`translate(${cx} ${sitY}) scale(${sizeK}) translate(${-cx} ${-sitY})`}>
              {/* body */}
              <path d={boulePath} fill="url(#crustGrad)" />

              {/* textures, ear & seeds clipped to the body */}
              <g clipPath="url(#loafClip)">
                {/* ridge browning on top */}
                <path d={boulePath} fill="url(#ridge)" />
                {/* flour dusting — heavy on raw, burns off as it bakes */}
                <rect
                  x={cx - RX - 4}
                  y={topY - 2}
                  width={RX * 2 + 8}
                  height={RY * 2 + 6}
                  filter="url(#loafTex)"
                  style={{ mixBlendMode: 'screen' }}
                  opacity={0.18 + (1 - brownProg) * 0.5}
                />
                {/* crust blistering / char builds with browning */}
                <rect
                  x={cx - RX - 4}
                  y={topY - 2}
                  width={RX * 2 + 8}
                  height={RY * 2 + 6}
                  filter="url(#blister)"
                  style={{ mixBlendMode: 'multiply' }}
                  opacity={brownProg * 0.42}
                />
                {/* wet sheen from oven steam, fades as crust sets */}
                <ellipse
                  cx={cx - RX * 0.2}
                  cy={topY + RY * 0.5}
                  rx={RX * 0.7}
                  ry={RY * 0.55}
                  fill="#fff"
                  opacity={clamp(steam * (1 - brownProg) * 0.5 + brownProg * 0.08, 0, 0.5)}
                />

                {/* seeds across the upper crust */}
                {seedList.length > 0 &&
                  SEED_FRAC.map((fx, i) => {
                    const sd = seedList[i % seedList.length];
                    const st = SEED_STYLE[sd];
                    const sxp = cx + fx * RX * 0.92;
                    const syp = topY + RY * 0.45 + fx * fx * RY * 0.7;
                    return (
                      <ellipse
                        key={i}
                        cx={sxp}
                        cy={syp}
                        rx={st.rx}
                        ry={st.ry}
                        fill={st.fill}
                        transform={`rotate(${(i * 41) % 110} ${sxp} ${syp})`}
                        opacity="0.9"
                      />
                    );
                  })}
              </g>

              {/* scoring bloom — the open cut, lighter exposed crumb */}
              <path d={bloomPath} fill={bloomCol} opacity={0.55 + springProg * 0.45} />
              <path d={bloomPath} fill="none" stroke={dark} strokeWidth="0.8" opacity="0.5" />
              {/* the ear — a lifted crust flap */}
              <g transform={`translate(0 ${-springProg * 2})`}>
                <path
                  d={earPath}
                  fill="none"
                  stroke={dark}
                  strokeWidth={1.6 + springProg * 1.6}
                  strokeLinecap="round"
                  opacity={0.55 + brownProg * 0.35}
                />
                <path
                  d={earPath}
                  fill="none"
                  stroke={light}
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  opacity={springProg * 0.6}
                  transform="translate(0 1.4)"
                />
              </g>

              {/* a couple of faint secondary scores for character */}
              <path
                d={`M ${cx - RX * 0.1} ${midY - RY * 0.2} Q ${cx + RX * 0.3} ${midY - RY * 0.15} ${cx + RX * 0.55} ${midY + RY * 0.15}`}
                fill="none"
                stroke={dark}
                strokeWidth="0.7"
                opacity={0.25 + brownProg * 0.25}
              />
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
