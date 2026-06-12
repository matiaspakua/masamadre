'use client';

import { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { useReveal } from '@/lib/useReveal';
import { useContent } from '@/lib/i18n';
import type { Reference, ReferenceShelf } from '@/lib/content';

// The closing instrument: a recipe book whose leaves flip in 3D to reveal the
// bibliography — books, peer-reviewed papers, institutions, and open sources
// that validate the content of the archive. Pure CSS 3D rotation around the
// spine; reduced-motion collapses the flip to an instant cut (handled globally
// in globals.css). The book is the citation; turning a page is reading it.

const LEAVES = 3; // 6 faces: cover · books · papers · institutions · open · colophon

export default function References() {
  const ref = useReveal<HTMLElement>();
  const { references: r } = useContent();
  const [flipped, setFlipped] = useState(0);

  const shelves = r.shelves;
  // face order across the leaves (front, back, front, back, …)
  const faces: React.ReactNode[] = [
    <CoverFace key="cover" r={r} />,
    <ShelfFace key="books" shelf={shelves[0]} r={r} page={1} />,
    <ShelfFace key="papers" shelf={shelves[1]} r={r} page={2} />,
    <ShelfFace key="inst" shelf={shelves[2]} r={r} page={3} />,
    <ShelfFace key="open" shelf={shelves[3]} r={r} page={4} />,
    <ColophonFace key="colophon" r={r} />,
  ];
  const leaves = Array.from({ length: LEAVES }, (_, i) => ({
    front: faces[2 * i],
    back: faces[2 * i + 1],
  }));

  const spread = flipped; // 0..LEAVES
  const atStart = flipped === 0;
  const atEnd = flipped === LEAVES;

  return (
    <section id="references" ref={ref} className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index={r.index}
          eyebrow={r.eyebrow}
          title={
            <>
              {r.titleA} <span className="italic text-levain">{r.titleB}</span>
            </>
          }
        />
        <p className="reveal text-pretty mt-6 max-w-reading leading-relaxed text-ink/80">
          {r.intro}
        </p>

        {/* the book */}
        <div className="reveal mt-12">
          <div className="mm-book relative mx-auto w-full max-w-3xl">
            <div className="relative h-[clamp(380px,54vw,540px)] w-full">
              {/* endpapers behind the leaves */}
              <Endpaper side="left" />
              <Endpaper side="right" />

              {leaves.map((leaf, i) => {
                const isFlipped = i < flipped;
                return (
                  <div
                    key={i}
                    className="mm-leaf"
                    style={{
                      transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                      zIndex: isFlipped ? i : LEAVES - i,
                    }}
                  >
                    <div className="mm-face">
                      <Page>{leaf.front}</Page>
                    </div>
                    <div className="mm-face mm-face-back">
                      <Page>{leaf.back}</Page>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* controls */}
          <div className="mx-auto mt-7 flex max-w-3xl items-center justify-between">
            <button
              onClick={() => setFlipped((f) => Math.max(0, f - 1))}
              disabled={atStart}
              className="rounded-full border border-line px-5 py-2 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:border-levain hover:text-levain disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← {r.prev}
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: LEAVES + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFlipped(i)}
                  aria-label={`${r.pageLabel} ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === spread ? 'w-6 bg-levain' : 'w-2 bg-line hover:bg-ash'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setFlipped((f) => Math.min(LEAVES, f + 1))}
              disabled={atEnd}
              className="rounded-full border border-line px-5 py-2 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:border-levain hover:text-levain disabled:cursor-not-allowed disabled:opacity-30"
            >
              {r.next} →
            </button>
          </div>

          <p className="mx-auto mt-5 max-w-reading text-center text-[0.7rem] italic leading-snug text-ash">
            {r.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}

// ---- page chrome ----

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-surface to-paper">
      {/* spine shadow on the inner edge */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ink/15 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative flex h-full flex-col overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
        {children}
      </div>
    </div>
  );
}

function Endpaper({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      className={`absolute top-0 h-full w-1/2 bg-sink/70 ${side === 'left' ? 'left-0' : 'right-0'}`}
    >
      <div className="grain absolute inset-0 opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Wheat className="h-16 w-16 text-line" />
      </div>
    </div>
  );
}

// ---- faces ----

function CoverFace({ r }: { r: ReturnType<typeof useContent>['references'] }) {
  const lines = r.cover.title.split('\n');
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="eyebrow text-ash">{r.cover.kicker}</p>
      <Wheat className="my-6 h-12 w-12 text-levain" />
      <h3 className="display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05] text-ink">
        {lines.map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
      </h3>
      <span className="mt-5 h-px w-16 bg-levain/50" />
      <p className="mt-5 max-w-[26ch] font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ash">
        {r.cover.subtitle}
      </p>
      <p className="mt-8 font-mono text-[0.62rem] text-levain">{r.next} →</p>
    </div>
  );
}

function ShelfFace({
  shelf,
  r,
  page,
}: {
  shelf: ReferenceShelf;
  r: ReturnType<typeof useContent>['references'];
  page: number;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between">
        <p className="eyebrow text-ash">{r.eyebrow}</p>
        <span className="font-mono text-[0.6rem] text-ash">· {page} ·</span>
      </div>
      <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-none text-levain">
        {shelf.label}
      </h3>
      <p className="text-pretty mt-2 text-[0.78rem] leading-snug text-ink/70">{shelf.blurb}</p>

      <ul className="mt-4 flex-1 space-y-3">
        {shelf.items.map((item, i) => (
          <RefItem key={i} item={item} openLabel={r.openLabel} />
        ))}
      </ul>
    </div>
  );
}

function RefItem({ item, openLabel }: { item: Reference; openLabel: string }) {
  const meta = [item.authors, item.source, item.year].filter(Boolean).join(' · ');
  return (
    <li className="border-t border-line/70 pt-2.5">
      <p className="font-display text-[0.96rem] leading-tight text-ink">{item.title}</p>
      {meta && (
        <p className="mt-0.5 font-mono text-[0.6rem] leading-snug text-ash">{meta}</p>
      )}
      {item.note && (
        <p className="text-pretty mt-1 text-[0.72rem] italic leading-snug text-ink/65">
          {item.note}
        </p>
      )}
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block font-mono text-[0.6rem] tracking-[0.06em] text-levain underline decoration-levain/40 underline-offset-2 transition-colors hover:text-ember"
        >
          {openLabel}
        </a>
      )}
    </li>
  );
}

function ColophonFace({ r }: { r: ReturnType<typeof useContent>['references'] }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <Wheat className="mb-6 h-10 w-10 text-levain" />
      <p className="font-display text-2xl italic text-ink">{r.titleB}</p>
      <span className="my-5 h-px w-16 bg-levain/50" />
      <p className="max-w-[30ch] text-pretty text-[0.78rem] leading-relaxed text-ink/70">
        {r.disclaimer}
      </p>
      <p className="mt-8 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ash">
        masa · madre
      </p>
    </div>
  );
}

function Wheat({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M12 46 V18" />
      {[20, 26, 32, 38].map((y, i) => (
        <g key={i}>
          <path d={`M12 ${y} Q5 ${y - 2} 4 ${y - 7} Q10 ${y - 6} 12 ${y - 2}`} />
          <path d={`M12 ${y} Q19 ${y - 2} 20 ${y - 7} Q14 ${y - 6} 12 ${y - 2}`} />
        </g>
      ))}
      <path d="M12 16 Q9 11 12 5 Q15 11 12 16" />
      <path d="M12 18 Q6 16 5 11 M12 18 Q18 16 19 11" />
    </svg>
  );
}
