'use client';

// A vertical pH gauge. The needle slides as fermentation acidifies the dough;
// the 4.6 line marks the threshold below which pathogens cannot reproduce.
export default function PhMeter({ ph }: { ph: number }) {
  const min = 3.5;
  const max = 6.5;
  const pct = (v: number) => ((max - v) / (max - min)) * 100;

  return (
    <div className="flex h-full gap-3">
      <div className="relative w-2 overflow-hidden rounded-full bg-gradient-to-b from-phosphor/70 via-levain/70 to-ember">
        {/* needle */}
        <div
          className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-char bg-linen shadow-[0_0_8px_rgba(237,228,211,0.6)] transition-all duration-700 ease-archive"
          style={{ top: `calc(${pct(ph)}% - 6px)` }}
        />
        {/* pH 4.6 safety threshold */}
        <div
          className="absolute left-0 h-px w-full bg-linen/60"
          style={{ top: `${pct(4.6)}%` }}
        />
      </div>

      <div className="flex flex-col justify-between py-0.5">
        <span className="font-mono text-[0.6rem] text-ash">6.5</span>
        <span className="font-mono text-[0.6rem] text-linen/70">
          4.6 · safe
        </span>
        <span className="font-mono text-[0.6rem] text-ash">3.5</span>
      </div>

      <div className="flex flex-col justify-center">
        <p className="lab-readout text-[0.6rem]">pH</p>
        <p className="font-mono text-3xl text-phosphor transition-all duration-500">
          {ph.toFixed(1)}
        </p>
      </div>
    </div>
  );
}
