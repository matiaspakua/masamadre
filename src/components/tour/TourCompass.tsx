'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { CSS_EASE } from '@/lib/motion';

// Persistent, discreet orientation system. Desktop: a drawn building
// cross-section on the right where each room is a "floor"; a "you are here"
// marker tracks scroll, and any floor is a quick-jump link. Mobile: a compact
// index button opens a bottom sheet. Always available, never blocks reading.

export type TourRoom = { id: string; number: string; es: string; en: string; accent: string };

export default function TourCompass({ rooms }: { rooms: TourRoom[] }) {
  const { lang, toggle, c } = useLang();
  const [active, setActive] = useState(rooms[0]?.id ?? '');
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = rooms.map((r) => r.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.room ?? e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    ids.forEach((id) => {
      const el = document.querySelector(`[data-room="${id}"]`) ?? document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [rooms]);

  const goTo = (id: string) => {
    const el = document.querySelector(`[data-room="${id}"]`) ?? document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const activeIndex = Math.max(0, rooms.findIndex((r) => r.id === active));
  const activeAccent = rooms[activeIndex]?.accent ?? '#c0741a';

  // Building geometry
  const floorH = 26;
  const top = 14;
  const buildingH = rooms.length * floorH;

  return (
    <>
      {/* Top progress hairline */}
      <div className="fixed left-0 right-0 top-0 z-50 h-px bg-line/60">
        <div
          className="h-full"
          style={{ width: `${progress * 100}%`, background: activeAccent, transition: `width 0.15s ${CSS_EASE.soft}` }}
        />
      </div>

      {/* Wordmark */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); goTo(rooms[0].id); }}
        className="fixed left-6 top-5 z-40 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-ink/75 hover:text-levain lg:left-10"
      >
        Masa&nbsp;Madre
      </a>

      {/* Language toggle */}
      <button
        onClick={toggle}
        className="fixed right-6 top-4 z-50 flex items-center gap-1.5 border border-line bg-surface/85 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink shadow-sm backdrop-blur transition-colors hover:border-levain hover:text-levain md:right-10"
        aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
      >
        <span className="text-levain">{lang === 'es' ? 'ES' : 'EN'}</span>
        <span className="text-ash">/</span>
        <span>{c.nav.langLabel}</span>
      </button>

      {/* ── Desktop: building cross-section ── */}
      <nav
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        aria-label={lang === 'es' ? 'Plano de la panadería' : 'Bakery floor plan'}
      >
        <div className="flex items-stretch gap-3">
          {/* drawn building */}
          <svg width="58" height={buildingH + top * 2} viewBox={`0 0 58 ${buildingH + top * 2}`} aria-hidden="true">
            {/* roof */}
            <path d={`M6 ${top} L29 4 L52 ${top}Z`} fill="none" stroke={activeAccent} strokeWidth="1.2" opacity="0.5" />
            {/* outer wall */}
            <rect x="8" y={top} width="42" height={buildingH} rx="2" fill="none" stroke="currentColor" strokeWidth="1" className="text-line" />
            {/* floor lines */}
            {rooms.map((r, i) => (
              <line key={r.id} x1="8" y1={top + i * floorH} x2="50" y2={top + i * floorH} stroke="currentColor" strokeWidth="0.6" className="text-line" opacity="0.6" />
            ))}
            {/* "you are here" lit floor */}
            <rect
              x="9"
              y={top + activeIndex * floorH + 1}
              width="40"
              height={floorH - 2}
              rx="1.5"
              fill={activeAccent}
              opacity="0.16"
              style={{ transition: `y 0.4s ${CSS_EASE.move}, fill 0.4s ${CSS_EASE.move}` }}
            />
            {/* marker */}
            <circle
              cx="29"
              cy={top + activeIndex * floorH + floorH / 2}
              r="3.4"
              fill={activeAccent}
              style={{ transition: `cy 0.4s ${CSS_EASE.move}, fill 0.4s ${CSS_EASE.move}` }}
            />
          </svg>

          {/* floor labels */}
          <ol className="flex flex-col justify-start py-[14px]">
            {rooms.map((r, i) => {
              const isActive = r.id === active;
              return (
                <li key={r.id} style={{ height: floorH }} className="flex items-center">
                  <button
                    onClick={() => goTo(r.id)}
                    className="group flex items-center gap-2 text-left"
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span
                      className="font-mono text-[0.56rem] tabular-nums transition-colors"
                      style={{ color: isActive ? r.accent : undefined }}
                    >
                      {r.number}
                    </span>
                    <span
                      className={`font-mono text-[0.58rem] uppercase tracking-[0.14em] transition-all duration-200 ${
                        isActive ? 'opacity-100' : 'text-ash opacity-40 group-hover:opacity-90'
                      }`}
                      style={{ color: isActive ? r.accent : undefined }}
                    >
                      {lang === 'es' ? r.es : r.en}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>

      {/* ── Mobile: index button + bottom sheet ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2 rounded-full border border-line bg-surface/90 px-5 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink shadow-lg backdrop-blur lg:hidden"
        aria-label={lang === 'es' ? 'Plano' : 'Map'}
      >
        <span style={{ color: activeAccent }}>◈</span>
        {rooms[activeIndex] ? (lang === 'es' ? rooms[activeIndex].es : rooms[activeIndex].en) : ''}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
          <div
            className="relative max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-line bg-paper px-6 pb-10 pt-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="eyebrow mb-5 text-levain">{lang === 'es' ? 'La Panadería' : 'The Bakery'}</p>
            <ol className="flex flex-col gap-1">
              {rooms.map((r) => {
                const isActive = r.id === active;
                return (
                  <li key={r.id}>
                    <button
                      onClick={() => goTo(r.id)}
                      className="flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-left"
                      style={isActive ? { background: `${r.accent}14` } : undefined}
                    >
                      <span className="font-mono text-xs tabular-nums" style={{ color: r.accent }}>{r.number}</span>
                      <span className={`font-display text-xl ${isActive ? '' : 'text-ink/75'}`} style={isActive ? { color: r.accent } : undefined}>
                        {lang === 'es' ? r.es : r.en}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
