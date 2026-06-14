// The living-ferment bridge — the signature device of the site.
//
// It reframes page scroll as one continuous sourdough fermentation: as you
// descend, the culture matures. Gas rises, pH falls from 6.0 toward 3.8, and
// the page's accent colour travels a pH-paper arc (fresh amber → ferment teal
// → oven ember) in lockstep with the ambient field. The numbers are not
// decorative — they trace the real stage data in content.ts (pH 6.0 → 3.8,
// activity climbing then settling).
//
// One rAF loop reads scroll, writes CSS custom properties (--accent,
// --accent-soft, --accent-ink) to :root, and notifies subscribers. Nothing in
// the hot path causes a React re-render — components subscribe and mutate refs.

export type FermentState = {
  p: number; // 0..1 scroll progress
  hours: number; // 0 → 26 elapsed "fermentation" hours
  ph: number; // 6.0 → 3.8
  gas: number; // 0..1 gas / rise
  rgb: [number, number, number]; // current accent
};

export const ferment: FermentState = {
  p: 0,
  hours: 0,
  ph: 6,
  gas: 0,
  rgb: [192, 116, 26],
};

type Sub = (s: FermentState) => void;
const subs = new Set<Sub>();

export function subscribeFerment(fn: Sub) {
  subs.add(fn);
  fn(ferment);
  return () => {
    subs.delete(fn);
  };
}

// Accent stops, matched to AmbientCanvas so background + UI ferment together:
// amber (fresh) → ferment teal (peak) → oven ember (the bake).
const STOPS: [number, number, number][] = [
  [192, 116, 26], // levain amber
  [14, 122, 107], // phosphor teal
  [168, 67, 30], // ember
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function accentAt(p: number): [number, number, number] {
  const seg = p * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(seg));
  const t = seg - i;
  return [
    Math.round(lerp(STOPS[i][0], STOPS[i + 1][0], t)),
    Math.round(lerp(STOPS[i][1], STOPS[i + 1][1], t)),
    Math.round(lerp(STOPS[i][2], STOPS[i + 1][2], t)),
  ];
}

// smoothstep for an organic gas curve
const smooth = (x: number) => x * x * (3 - 2 * x);

let started = false;

// Starts the single scroll→ferment loop. Safe to call more than once; only the
// first call wires listeners. Returns a disposer.
export function startFerment(): () => void {
  if (typeof window === 'undefined') return () => {};
  if (started) return () => {};
  started = true;

  let target = 0;
  let raf = 0;

  const readScroll = () => {
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    target = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
  };

  const tick = () => {
    // ease the eased scroll once more for a calm, liquid feel
    ferment.p += (target - ferment.p) * 0.12;
    if (Math.abs(target - ferment.p) < 0.0002) ferment.p = target;

    const p = ferment.p;
    ferment.hours = p * 26;
    ferment.ph = 6.0 - smooth(Math.min(1, p / 0.85)) * 2.2; // 6.0 → 3.8
    ferment.gas = smooth(Math.min(1, p * 1.1));
    ferment.rgb = accentAt(p);

    const [r, g, b] = ferment.rgb;
    const root = document.documentElement.style;
    root.setProperty('--accent', `rgb(${r} ${g} ${b})`);
    root.setProperty('--accent-soft', `rgba(${r}, ${g}, ${b}, 0.14)`);
    root.setProperty('--accent-line', `rgba(${r}, ${g}, ${b}, 0.5)`);

    subs.forEach((fn) => fn(ferment));
    raf = requestAnimationFrame(tick);
  };

  readScroll();
  window.addEventListener('scroll', readScroll, { passive: true });
  window.addEventListener('resize', readScroll);
  raf = requestAnimationFrame(tick);

  return () => {
    started = false;
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', readScroll);
    window.removeEventListener('resize', readScroll);
  };
}
