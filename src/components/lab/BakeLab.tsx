'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useContent } from '@/lib/i18n';

// A playable bake. You design a real formula — a *blend* of flours measured in
// grams, plus any seeds you like — and send it into the oven. A single rAF
// "bake clock" drives a staged film: a raw, floured boule springs, blooms at
// the score, turns golden-brown, then cools into a sliced crumb. Reduced-motion
// jumps straight to the finished result.

type FlourKey =
  | 'white'
  | 'strong'
  | 'wholewheat'
  | 'spelt'
  | 'rye'
  | 'oat'
  | 'semolina'
  | 'einkorn';

type BlendRow = { key: FlourKey; grams: number };
type SeedRow = { key: string; grams: number };

// Language-independent baking model, keyed to the flour content entries.
// absorb = thirst · rise = leavening strength · brown = how fast it colours.
const FLOUR: Record<
  FlourKey,
  { absorb: number; rise: number; brown: number; raw: string; crumb: string }
> = {
  white: { absorb: 1.0, rise: 1.0, brown: 1.0, raw: '#ead9af', crumb: '#f0e0b4' },
  strong: { absorb: 1.06, rise: 1.16, brown: 0.98, raw: '#ecdcb2', crumb: '#f2e2b6' },
  wholewheat: { absorb: 1.14, rise: 0.78, brown: 1.24, raw: '#d6bd8f', crumb: '#c7a36e' },
  spelt: { absorb: 0.96, rise: 0.9, brown: 1.08, raw: '#e3cf9f', crumb: '#e1c489' },
  rye: { absorb: 1.22, rise: 0.58, brown: 1.3, raw: '#c5aa78', crumb: '#ad8654' },
  oat: { absorb: 1.05, rise: 0.74, brown: 0.92, raw: '#ecdcb0', crumb: '#ecdcb0' },
  semolina: { absorb: 0.98, rise: 0.92, brown: 1.06, raw: '#e7c673', crumb: '#eccd66' },
  einkorn: { absorb: 0.9, rise: 0.7, brown: 1.12, raw: '#e6c986', crumb: '#e4c274' },
};

const SEED_STYLE: Record<string, { fill: string; rx: number; ry: number }> = {
  sesame: { fill: '#efe6cb', rx: 1.5, ry: 2.4 },
  poppy: { fill: '#2c2622', rx: 1.1, ry: 1.1 },
  sunflower: { fill: '#6b5126', rx: 1.6, ry: 3 },
  flax: { fill: '#7a5a2e', rx: 1.3, ry: 2.6 },
  pumpkin: { fill: '#5f7d4a', rx: 2, ry: 3.2 },
  chia: { fill: '#3a3330', rx: 1, ry: 1.2 },
  millet: { fill: '#e3c969', rx: 1.3, ry: 1.3 },
  caraway: { fill: '#6b4a2a', rx: 1, ry: 2.4 },
};

// crust colour ramp: pale floury → amber → mahogany → dark bake
const RAMP = ['#e8d6ab', '#cf9a4e', '#a25e22', '#69330f'];

function parseHex(h: string) {
  return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
}
function toHex(p: number[]) {
  return `#${p.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
}
function hexLerp(a: string, b: string, t: number) {
  const pa = parseHex(a);
  const pb = parseHex(b);
  return toHex(pa.map((v, i) => v + (pb[i] - v) * t));
}
// weighted average of several hex colours (weights = grams)
function blendHex(items: { color: string; w: number }[], fallback = '#e9d8af') {
  let r = 0,
    g = 0,
    b = 0,
    tot = 0;
  for (const it of items) {
    const [pr, pg, pb] = parseHex(it.color);
    r += pr * it.w;
    g += pg * it.w;
    b += pb * it.w;
    tot += it.w;
  }
  if (tot === 0) return fallback;
  return toHex([r / tot, g / tot, b / tot]);
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
  -0.74, -0.58, -0.42, -0.26, -0.1, 0.06, 0.22, 0.38, 0.54, 0.7, -0.66, -0.34,
  -0.02, 0.3, 0.62, -0.48,
];

// condensation droplets clinging inside the oven during the steamy opening of
// the bake. Fixed scatter near the chamber ceiling and upper walls; a few drip.
const DROPS = [
  { left: '14%', top: '12%', size: 7, o: 0.9, drip: false, delay: 0 },
  { left: '22%', top: '20%', size: 5, o: 0.7, drip: true, delay: 0.4 },
  { left: '31%', top: '10%', size: 8, o: 1, drip: false, delay: 0 },
  { left: '40%', top: '16%', size: 5, o: 0.7, drip: false, delay: 0 },
  { left: '49%', top: '9%', size: 9, o: 1, drip: true, delay: 1.1 },
  { left: '58%', top: '15%', size: 6, o: 0.8, drip: false, delay: 0 },
  { left: '67%', top: '11%', size: 7, o: 0.9, drip: false, delay: 0 },
  { left: '76%', top: '19%', size: 5, o: 0.7, drip: true, delay: 0.7 },
  { left: '84%', top: '13%', size: 8, o: 1, drip: false, delay: 0 },
  { left: '12%', top: '30%', size: 4, o: 0.6, drip: false, delay: 0 },
  { left: '88%', top: '32%', size: 4, o: 0.6, drip: false, delay: 0 },
  { left: '35%', top: '26%', size: 5, o: 0.7, drip: true, delay: 1.6 },
];

export default function BakeLab() {
  const { lab } = useContent();
  const t = lab.bake;

  const [blend, setBlend] = useState<BlendRow[]>([
    { key: 'white', grams: 400 },
    { key: 'wholewheat', grams: 100 },
  ]);
  const [seedRows, setSeedRows] = useState<SeedRow[]>([{ key: 'sesame', grams: 30 }]);
  const [hydration, setHydration] = useState(72);
  const [saltPct, setSaltPct] = useState(2);
  const [starterPct, setStarterPct] = useState(20);
  const [temp, setTemp] = useState(230);
  const [steamPct, setSteamPct] = useState(60);

  const [phase, setPhase] = useState<'idle' | 'baking' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  const totalFlour = blend.reduce((s, r) => s + r.grams, 0);
  const seedTotal = seedRows.reduce((s, r) => s + r.grams, 0);
  const water = Math.round((totalFlour * hydration) / 100);
  const salt = Math.round((totalFlour * saltPct) / 100);
  const starter = Math.round((totalFlour * starterPct) / 100);
  const total = totalFlour + water + salt + starter + seedTotal;
  const steam = steamPct / 100;
  const empty = totalFlour <= 0;

  // ---- derived bake outcome (weighted across the blend) ----
  const model = useMemo(() => {
    const tf = totalFlour || 1;
    let absorb = 0,
      rise = 0,
      brown = 0;
    const rawItems: { color: string; w: number }[] = [];
    const crumbItems: { color: string; w: number }[] = [];
    for (const row of blend) {
      const f = FLOUR[row.key];
      const w = row.grams / tf;
      absorb += f.absorb * w;
      rise += f.rise * w;
      brown += f.brown * w;
      rawItems.push({ color: f.raw, w: row.grams });
      crumbItems.push({ color: f.crumb, w: row.grams });
    }
    if (blend.length === 0) {
      absorb = 1;
      rise = 1;
      brown = 1;
    }
    const raw = blendHex(rawItems);
    const crumbColor = blendHex(crumbItems);
    const seedLoad = clamp(seedTotal / tf, 0, 0.35); // heavy seeds weigh the rise

    const bakeTime = clamp(
      Math.round((18 + total * 0.022) * (235 / temp) * (0.92 + absorb * 0.08)),
      16,
      70,
    );
    const spring = clamp(
      Math.round(
        26 *
          rise *
          (0.75 + (hydration - 60) / 70) *
          (0.7 + steam * 0.6) *
          (1 - seedLoad * 0.5),
      ),
      6,
      92,
    );
    const crust = clamp(
      brown * ((temp - 195) / 55) * (0.6 + bakeTime / 45) * (1.15 - steam * 0.35),
      0,
      3,
    );
    const crumb = clamp(
      (hydration - 58) / 9 + spring / 45 + (rise - 0.8) * 1.2 - seedLoad,
      0,
      3,
    );
    let rating = 3;
    if (crumb >= 1.5) rating += 1;
    if (spring >= 28) rating += 1;
    if (crust > 2.6) rating -= 1;
    if (crust < 0.5) rating -= 1;
    rating = clamp(rating, 1, 5);
    return { bakeTime, spring, crust, crumb, rating, raw, crumbColor, absorb, rise, brown };
  }, [blend, totalFlour, seedTotal, total, temp, hydration, steam]);

  // ---- bake clock ----
  function bake() {
    if (empty) return;
    cancelAnimationFrame(rafRef.current);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setProgress(1);
      setPhase('done');
      return;
    }
    setPhase('baking');
    setProgress(0);
    const dur = 7600;
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
  const springProg = ease(clamp((progress - 0.08) / 0.4, 0, 1));
  const brownProg = ease(clamp((progress - 0.32) / 0.56, 0, 1));
  const cooling = progress > 0.9;

  // Loaf geometry. The boule sits on the rack and grows from there: raw dough
  // is slack (wide, low); oven spring puffs the dome taller than it widens.
  const cx = 110;
  const sitY = 142;
  const sizeK = clamp(0.82 + total / 4400, 0.82, 1.34);
  const slack = clamp((hydration - 55) / 45, 0, 1); // wetter = flatter raw
  const grow = springProg * (0.24 + model.spring / 120);
  const RX = 56 * (1 + slack * 0.05 + grow * 0.12);
  const RY = 31 * (0.86 - slack * 0.06 + grow);

  const midY = sitY - RY;
  const topY = sitY - 2 * RY;

  // crust colours: a baked base, lighter top highlight, warm edge, deep tone.
  const base = hexLerp(model.raw, rampColor(model.crust), brownProg);
  const light = hexLerp(base, '#fff3da', 0.4);
  const edge = hexLerp(base, '#8a5320', 0.3);
  const dark = hexLerp(base, '#34190a', 0.55);
  const bloomCol = hexLerp('#efe3c6', base, brownProg * 0.5); // exposed crumb

  // organic domed boule: a smooth crown (apex nudged slightly off-centre for
  // a hand-shaped feel) over a rounded, gently flattened base.
  const boule = (rx: number, ry: number) => {
    const baseY = sitY;
    const ty = sitY - 2 * ry;
    const my = sitY - ry;
    return `M ${cx - rx} ${my}
      C ${cx - rx} ${my - ry * 0.86} ${cx - rx * 0.52} ${ty} ${cx - rx * 0.05} ${ty}
      C ${cx + rx * 0.3} ${ty} ${cx + rx} ${my - ry * 0.82} ${cx + rx} ${my}
      C ${cx + rx} ${my + ry * 0.78} ${cx + rx * 0.6} ${baseY} ${cx} ${baseY}
      C ${cx - rx * 0.6} ${baseY} ${cx - rx} ${my + ry * 0.78} ${cx - rx} ${my} Z`;
  };
  const boulePath = boule(RX, RY);

  // banneton flour rings — concentric arcs following the dome (signature look)
  const rings = [0.86, 0.66, 0.46, 0.26].map((k) => {
    const rx = RX * k;
    const ry = RY * k;
    const yc = midY + RY * (1 - k) * 0.5;
    return `M ${cx - rx} ${yc} A ${rx} ${ry} 0 0 1 ${cx + rx} ${yc}`;
  });

  // off-centre ear slash that blooms open with oven spring
  const ax = cx - RX * 0.46;
  const ay = midY + RY * 0.18;
  const bx = cx + RX * 0.34;
  const by = midY - RY * 0.66;
  const mx = (ax + bx) / 2;
  const my2 = (ay + by) / 2;
  const earLift = 3 + springProg * 11;
  const earCtrl = `${mx - 11 - earLift * 0.4} ${my2 - 7 - earLift}`;
  const cutCtrl = `${mx + 8} ${my2 + 6 + springProg * 5}`;
  const bloomPath = `M ${ax} ${ay} Q ${earCtrl} ${bx} ${by} Q ${cutCtrl} ${ax} ${ay} Z`;
  const earPath = `M ${ax} ${ay} Q ${earCtrl} ${bx} ${by}`;

  // a few decorative wheat-ear ribs branching off a faint spine
  const ribs = [0.28, 0.46, 0.64].map((tt) => {
    const sx = ax + (bx - ax) * tt;
    const sy = ay + (by - ay) * tt - 2;
    const len = 8 + springProg * 3;
    return `M ${sx} ${sy} l ${len} ${-len * 0.5}  M ${sx} ${sy} l ${-len} ${-len * 0.5}`;
  });

  const overlayLabel =
    phase === 'idle'
      ? null
      : progress < 0.08
        ? t.stages.load
        : progress < 0.45
          ? t.stages.spring
          : progress < 0.85
            ? t.stages.crust
            : cooling
              ? t.stages.cooling
              : t.stages.done;
  const clockMin = Math.round(Math.min(progress / 0.92, 1) * model.bakeTime);

  // narrative filmstrip: shaping → proofing → spring → crust → cooling
  const filmSteps = [t.stages.shape, t.stages.proof, t.stages.spring, t.stages.crust, t.stages.cooling];
  const liveStep =
    phase === 'idle' ? 1 : progress < 0.12 ? 1 : progress < 0.45 ? 2 : progress < 0.85 ? 3 : 4;
  const stripFill = phase === 'idle' ? 0.25 : 0.25 + progress * 0.75;

  const seedList = seedRows.map((r) => r.key);
  // humidity lives only in the opening ~15 min of the bake, then burns off
  const humid = phase === 'idle' ? 0 : clamp((15 - clockMin) / 15, 0, 1) * (0.5 + steam * 0.5);
  const showDrops = phase === 'baking' && humid > 0.05;

  const availableFlours = t.flours.filter((fl) => !blend.some((b) => b.key === fl.key));
  const availableSeeds = t.seeds.filter((sd) => !seedRows.some((s) => s.key === sd.key));
  const flourName = (k: string) => t.flours.find((f) => f.key === k)?.name ?? k;
  const seedName = (k: string) => t.seeds.find((s) => s.key === k)?.name ?? k;

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-line lg:grid-cols-2">
      {/* ---- recipe builder ---- */}
      <div className="bg-surface p-7 sm:p-8">
        <div className="mb-6">
          <p className="lab-readout text-xs">{t.sub}</p>
          <h4 className="font-display text-2xl text-ink">{t.heading}</h4>
        </div>

        {/* flour blend */}
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ash">
            {t.blendLabel}
          </p>
          <p className="font-mono text-sm text-levain">
            {totalFlour} {lab.calc.grams}
          </p>
        </div>
        <p className="mt-1 text-[0.7rem] leading-snug text-ash/80">{t.blendHint}</p>

        <div className="mt-3 space-y-3">
          {blend.length === 0 && (
            <p className="rounded-sm border border-dashed border-line px-3 py-3 text-center text-xs italic text-ash">
              {t.emptyBlend}
            </p>
          )}
          {blend.map((row) => {
            const pct = totalFlour ? Math.round((row.grams / totalFlour) * 100) : 0;
            return (
              <div key={row.key} className="rounded-sm border border-line bg-paper/60 px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-[0.72rem] text-ink">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: FLOUR[row.key].raw, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)' }}
                    />
                    {flourName(row.key)}
                    <span className="text-ash">· {pct}%</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-sm text-ink">
                      {row.grams} {lab.calc.grams}
                    </span>
                    <button
                      onClick={() => setBlend((b) => b.filter((x) => x.key !== row.key))}
                      className="font-mono text-sm text-ash transition-colors hover:text-ember"
                      aria-label={`remove ${flourName(row.key)}`}
                    >
                      ×
                    </button>
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={10}
                  value={row.grams}
                  onChange={(e) =>
                    setBlend((b) =>
                      b.map((x) => (x.key === row.key ? { ...x, grams: Number(e.target.value) } : x)),
                    )
                  }
                  className="mm-range mt-2"
                  aria-label={`${flourName(row.key)} grams`}
                />
              </div>
            );
          })}
        </div>

        {availableFlours.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {availableFlours.map((fl) => (
              <button
                key={fl.key}
                onClick={() => setBlend((b) => [...b, { key: fl.key as FlourKey, grams: 100 }])}
                className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[0.64rem] text-ash transition-colors hover:border-levain hover:text-levain"
                title={fl.note}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: FLOUR[fl.key as FlourKey].raw }}
                />
                + {fl.name}
              </button>
            ))}
          </div>
        )}

        {/* seeds */}
        <div className="mt-7 flex items-baseline justify-between">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ash">
            {t.seedsLabel}
          </p>
          <p className="font-mono text-sm text-phosphor">
            {seedTotal} {lab.calc.grams}
          </p>
        </div>
        <p className="mt-1 text-[0.7rem] leading-snug text-ash/80">{t.seedsHint}</p>

        {seedRows.length > 0 && (
          <div className="mt-3 space-y-2">
            {seedRows.map((row) => (
              <div
                key={row.key}
                className="flex items-center gap-3 rounded-sm border border-line bg-paper/60 px-3 py-2"
              >
                <span className="flex w-24 shrink-0 items-center gap-1.5 font-mono text-[0.7rem] text-ink">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: SEED_STYLE[row.key]?.fill }}
                  />
                  {seedName(row.key)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={150}
                  step={5}
                  value={row.grams}
                  onChange={(e) =>
                    setSeedRows((s) =>
                      s.map((x) => (x.key === row.key ? { ...x, grams: Number(e.target.value) } : x)),
                    )
                  }
                  className="mm-range"
                  aria-label={`${seedName(row.key)} grams`}
                />
                <span className="w-12 shrink-0 text-right font-mono text-xs text-ink">
                  {row.grams}
                  {lab.calc.grams}
                </span>
                <button
                  onClick={() => setSeedRows((s) => s.filter((x) => x.key !== row.key))}
                  className="font-mono text-sm text-ash transition-colors hover:text-ember"
                  aria-label={`remove ${seedName(row.key)}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {availableSeeds.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {availableSeeds.map((sd) => (
              <button
                key={sd.key}
                onClick={() => setSeedRows((s) => [...s, { key: sd.key, grams: 20 }])}
                className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[0.64rem] text-ash transition-colors hover:border-phosphor hover:text-phosphor"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: SEED_STYLE[sd.key]?.fill }} />
                + {sd.name}
              </button>
            ))}
          </div>
        )}

        {/* hydration / salt / starter */}
        <div className="mt-7 border-t border-line pt-5">
          <Slider label={lab.calc.hydration} unit="%" min={55} max={95} value={hydration} onChange={setHydration} />
          <div className="mt-5 grid grid-cols-2 gap-5">
            <Slider label={lab.calc.saltPct} unit="%" min={1} max={3} step={0.1} value={saltPct} onChange={setSaltPct} />
            <Slider label={lab.calc.starterPct} unit="%" min={5} max={40} value={starterPct} onChange={setStarterPct} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5">
            <Slider label={t.tempLabel} unit="°C" min={190} max={260} step={5} value={temp} onChange={setTemp} />
            <Slider label={t.steamLabel} unit="%" min={0} max={100} step={5} value={steamPct} onChange={setSteamPct} />
          </div>
        </div>

        {/* formula readout */}
        <div className="mt-7 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center font-mono">
          {[
            [t.totalFlourLabel, totalFlour],
            [lab.calc.water, water],
            [lab.calc.salt, salt],
            [lab.calc.starter, starter],
            [t.seedsLabel, seedTotal],
            [lab.calc.total, total],
          ].map(([k, v], i) => (
            <div key={i}>
              <p className="text-[0.54rem] uppercase tracking-[0.1em] text-ash">{k as string}</p>
              <p className={`text-sm ${i === 5 ? 'text-levain' : 'text-ink'}`}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---- the bake film ---- */}
      <div className="flex flex-col bg-sink/50 p-7 sm:p-8">
        {/* narrative filmstrip */}
        <div className="mb-5">
          <div className="flex items-center justify-between">
            {filmSteps.map((s, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <span
                  className={`h-2 w-2 rounded-full border transition-all duration-300 ${
                    i <= liveStep && (phase !== 'idle' || i <= 1)
                      ? 'scale-110 border-ember bg-ember'
                      : 'border-ash/40 bg-transparent'
                  }`}
                />
                <span
                  className={`font-mono text-[0.52rem] uppercase tracking-[0.08em] transition-colors ${
                    i === liveStep ? 'text-ember' : 'text-ash'
                  }`}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2 h-px w-full bg-line">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-levain to-ember transition-[width] duration-200"
              style={{ width: `${stripFill * 100}%` }}
            />
          </div>
        </div>

        <div className="relative">
          <svg viewBox="0 0 220 170" className="w-full">
            <defs>
              <radialGradient id="ovenHeat" cx="50%" cy="100%" r="85%">
                <stop offset="0%" stopColor="#d35e22" stopOpacity={phase === 'idle' ? 0.28 : 0.8} />
                <stop offset="55%" stopColor="#8a3d1a" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#1c130c" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ovenWall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a2c20" />
                <stop offset="100%" stopColor="#1d140e" />
              </linearGradient>
              {/* crust: highlight top-left, base, warm edge — roundness */}
              <radialGradient id="crustGrad" cx="40%" cy="30%" r="82%">
                <stop offset="0%" stopColor={light} />
                <stop offset="46%" stopColor={hexLerp(light, base, 0.7)} />
                <stop offset="78%" stopColor={base} />
                <stop offset="100%" stopColor={edge} />
              </radialGradient>
              {/* ambient occlusion along the base of the loaf */}
              <linearGradient id="ridge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="52%" stopColor={dark} stopOpacity="0" />
                <stop offset="100%" stopColor={dark} stopOpacity="0.4" />
              </linearGradient>
              <filter id="loafTex">
                <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" seed="6" result="n" />
                <feColorMatrix in="n" type="saturate" values="0" />
              </filter>
              <filter id="blister">
                <feTurbulence type="turbulence" baseFrequency="0.13" numOctaves="2" seed="9" result="n" />
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
            <g stroke="#000" strokeOpacity="0.12" strokeWidth="1">
              <line x1="6" y1="52" x2="214" y2="52" />
              <line x1="6" y1="100" x2="214" y2="100" />
            </g>
            {phase === 'baking' && (
              <rect x="10" y="80" width="200" height="80" fill="#d35e22" opacity="0.1" filter="url(#shimmer)" />
            )}
            <g stroke="#6a513a" strokeWidth="1.6" opacity="0.7">
              <line x1="20" y1="144" x2="200" y2="144" />
            </g>
            <ellipse
              cx={cx}
              cy="158"
              rx="92"
              ry="9"
              fill="#d8701c"
              opacity={phase === 'idle' ? 0.2 : 0.42 + 0.18 * Math.sin(progress * 26)}
            />

            {/* contact shadow */}
            <ellipse cx={cx} cy={sitY + 3} rx={RX * sizeK * 0.98} ry="5.5" fill="#000" opacity="0.34" />

            {/* ---- the loaf ---- */}
            <g transform={`translate(${cx} ${sitY}) scale(${sizeK}) translate(${-cx} ${-sitY})`}>
              <path d={boulePath} fill="url(#crustGrad)" />

              <g clipPath="url(#loafClip)">
                {/* base ambient occlusion */}
                <path d={boulePath} fill="url(#ridge)" />

                {/* banneton flour rings — faint, fade as the crust browns */}
                <g
                  fill="none"
                  stroke="#fff6e4"
                  strokeWidth="1.1"
                  style={{ mixBlendMode: 'screen' }}
                  opacity={0.22 + (1 - brownProg) * 0.4}
                >
                  {rings.map((d, i) => (
                    <path key={i} d={d} />
                  ))}
                </g>

                {/* flour dusting — heavy on raw, burns off as it bakes */}
                <rect
                  x={cx - RX - 4}
                  y={topY - 2}
                  width={RX * 2 + 8}
                  height={RY * 2 + 6}
                  filter="url(#loafTex)"
                  style={{ mixBlendMode: 'screen' }}
                  opacity={0.16 + (1 - brownProg) * 0.5}
                />
                {/* crust blistering / char builds with browning */}
                <rect
                  x={cx - RX - 4}
                  y={topY - 2}
                  width={RX * 2 + 8}
                  height={RY * 2 + 6}
                  filter="url(#blister)"
                  style={{ mixBlendMode: 'multiply' }}
                  opacity={brownProg * 0.4}
                />
                {/* wet sheen from oven steam, fades as crust sets */}
                <ellipse
                  cx={cx - RX * 0.22}
                  cy={topY + RY * 0.5}
                  rx={RX * 0.66}
                  ry={RY * 0.5}
                  fill="#fff"
                  opacity={clamp(steam * (1 - brownProg) * 0.5 + brownProg * 0.06, 0, 0.5)}
                />

                {/* seeds across the upper crust */}
                {seedList.length > 0 &&
                  SEED_FRAC.map((fx, i) => {
                    const sd = seedList[i % seedList.length];
                    const st = SEED_STYLE[sd];
                    const sxp = cx + fx * RX * 0.92;
                    const syp = topY + RY * 0.42 + fx * fx * RY * 0.7;
                    return (
                      <ellipse
                        key={i}
                        cx={sxp}
                        cy={syp}
                        rx={st.rx}
                        ry={st.ry}
                        fill={st.fill}
                        transform={`rotate(${(i * 41) % 110} ${sxp} ${syp})`}
                        opacity="0.92"
                      />
                    );
                  })}
              </g>

              {/* scoring bloom — exposed crumb, opens with spring */}
              <path d={bloomPath} fill={bloomCol} opacity={0.5 + springProg * 0.5} />
              <path d={bloomPath} fill="none" stroke={dark} strokeWidth="0.8" opacity="0.5" />
              {/* the lifted ear */}
              <g transform={`translate(0 ${-springProg * 2})`}>
                <path
                  d={earPath}
                  fill="none"
                  stroke={dark}
                  strokeWidth={1.6 + springProg * 1.8}
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
              {/* decorative wheat ribs */}
              <g fill="none" stroke={dark} strokeWidth="0.7" strokeLinecap="round" opacity={0.3 + brownProg * 0.3}>
                {ribs.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
            </g>
          </svg>

          {/* humidity — condensation droplets in the steamy first minutes */}
          {showDrops && (
            <div className="pointer-events-none absolute inset-0">
              {DROPS.map((d, i) => (
                <span
                  key={i}
                  className={`mm-drop${d.drip ? ' mm-drop-drip' : ''}`}
                  style={{
                    left: d.left,
                    top: d.top,
                    width: d.size,
                    height: d.size * 1.15,
                    opacity: humid * d.o,
                    animationDelay: `${d.delay}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* stage + clock overlay */}
          {phase !== 'idle' && (
            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-line bg-surface/85 px-3 py-1 backdrop-blur">
              <span
                className="h-1.5 w-1.5 rounded-full bg-ember"
                style={{ animation: phase === 'baking' ? 'mm-pulse 1.2s ease-in-out infinite' : undefined }}
              />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink">{overlayLabel}</span>
              <span className="font-mono text-[0.62rem] text-levain">
                {clockMin} {t.clock}
              </span>
            </div>
          )}

          {/* live oven gauges */}
          {phase !== 'idle' && (
            <div className="absolute right-3 top-3 flex flex-col items-end gap-1 rounded-sm border border-line bg-surface/80 px-2.5 py-1.5 backdrop-blur">
              <span className="font-mono text-[0.56rem] text-ash">
                {temp}°C
              </span>
              <span className="font-mono text-[0.56rem] text-phosphor">
                {Math.round((steam * (1 - brownProg) * 0.8 + 0.1) * 100)}% RH
              </span>
            </div>
          )}
        </div>

        {/* bake controls / result */}
        {phase !== 'done' ? (
          <button
            onClick={bake}
            disabled={phase === 'baking' || empty}
            className="mt-6 w-full rounded-sm bg-ember py-3 font-mono text-sm uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
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

            {/* crumb cross-section payoff — a cut slice of the baked loaf */}
            <div className="mt-4">
              <p className="lab-readout mb-2 text-[0.58rem]">
                {t.result.crumb} · {t.crumbLevels[Math.round(model.crumb)]}
              </p>
              <div className="overflow-hidden rounded-sm border border-line">
                <CrumbSlice openness={model.crumb} color={model.crumbColor} crust={rampColor(model.crust)} />
              </div>
            </div>

            {/* recipe summary */}
            <p className="mt-3 text-[0.7rem] leading-snug text-ash">
              {blend.map((b) => `${Math.round((b.grams / (totalFlour || 1)) * 100)}% ${flourName(b.key)}`).join(' · ')}
              {seedRows.length > 0 && ` + ${seedRows.map((s) => seedName(s.key)).join(', ')}`}
            </p>

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
  // a slice cut from the boule, seen face-on: a crust ring around an open
  // crumb of soft air pockets. Holes are bigger and fewer when the crumb is
  // open, tighter when dense; each reads as a shaded cavity with a lit rim.
  const cxv = 100;
  const cyv = 64;
  const RXi = 82;
  const RYi = 46;
  const holes = useMemo(() => {
    const n = 22 + Math.round(openness * 16);
    const maxR = 2.5 + openness * 4.8;
    const arr: { x: number; y: number; rx: number; ry: number; rot: number }[] = [];
    let s = 11;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    let placed = 0;
    let guard = 0;
    while (placed < n && guard < n * 8) {
      guard++;
      const ang = rnd() * Math.PI * 2;
      const rad = Math.pow(rnd(), 0.65); // 0 centre → 1 edge
      const px = cxv + Math.cos(ang) * rad * RXi * 0.9;
      const py = cyv + Math.sin(ang) * rad * RYi * 0.9;
      const r = (1 + rnd() * maxR) * (1 - rad * 0.5); // smaller near the crust
      if (r < 0.9) continue;
      arr.push({ x: px, y: py, rx: r, ry: r * (0.72 + rnd() * 0.5), rot: rnd() * 180 });
      placed++;
    }
    return arr;
  }, [openness]);
  const crumbLight = hexLerp(color, '#fff7e8', 0.32);
  const crumbEdge = hexLerp(color, '#a07b46', 0.35);
  return (
    <svg viewBox="0 0 200 134" className="w-full">
      <defs>
        <radialGradient id="crumbFill" cx="50%" cy="42%" r="64%">
          <stop offset="0%" stopColor={crumbLight} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
        <radialGradient id="holeGrad" cx="50%" cy="46%" r="52%">
          <stop offset="0%" stopColor="#3a2613" stopOpacity="0.62" />
          <stop offset="68%" stopColor="#3a2613" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3a2613" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* board + contact shadow */}
      <rect width="200" height="134" fill="#efe6d4" />
      <ellipse cx={cxv} cy={cyv + 56} rx="84" ry="9" fill="#000" opacity="0.08" />
      {/* crust ring */}
      <ellipse cx={cxv} cy={cyv} rx="94" ry="58" fill={crust} />
      <ellipse cx={cxv} cy={cyv} rx="89" ry="53" fill={crumbEdge} opacity="0.55" />
      {/* crumb interior */}
      <ellipse cx={cxv} cy={cyv} rx={RXi} ry={RYi} fill="url(#crumbFill)" />
      {/* air pockets */}
      {holes.map((h, i) => (
        <g key={i} transform={`rotate(${h.rot.toFixed(1)} ${h.x} ${h.y})`}>
          <ellipse cx={h.x} cy={h.y} rx={h.rx} ry={h.ry} fill="url(#holeGrad)" />
          <ellipse
            cx={h.x}
            cy={h.y + h.ry * 0.55}
            rx={h.rx * 0.66}
            ry={h.ry * 0.28}
            fill={crumbLight}
            opacity="0.55"
          />
        </g>
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
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ash">{label}</span>
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
