'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';

// Top-down bakery "floor plan" navigation. Each room is a node in the
// journey. Clicking a node scrolls to that section; the active node
// glows in levain orange. Fixed to the bottom of the viewport.
const ROOMS = [
  { id: 'hero',        icon: '⬡', es: 'Entrada',   en: 'Entry'      },
  { id: 'origins',     icon: '◈', es: 'Vitrina',   en: 'Display'    },
  { id: 'timeline',    icon: '◉', es: 'Historia',  en: 'History'    },
  { id: 'laboratory',  icon: '⟁', es: 'Lab',       en: 'Lab'        },
  { id: 'breads',      icon: '◈', es: 'Panes',     en: 'Breads'     },
  { id: 'process',     icon: '⊛', es: 'Proceso',   en: 'Process'    },
  { id: 'composition', icon: '◎', es: 'Cocina',    en: 'Kitchen'    },
  { id: 'baking',      icon: '◈', es: 'Horno',     en: 'Oven'       },
  { id: 'benefits',    icon: '✦', es: 'Despensa',  en: 'Pantry'     },
  { id: 'references',  icon: '◫', es: 'Biblioteca',en: 'Library'    },
  { id: 'closing',     icon: '◉', es: 'Salida',    en: 'Exit'       },
] as const;

type RoomId = (typeof ROOMS)[number]['id'];

export default function BakeryMap() {
  const { lang, toggle, c } = useLang();
  const [active, setActive] = useState<RoomId>('hero');
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const ids = ROOMS.map((r) => r.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as RoomId);
        });
      },
      { rootMargin: '-40% 0px -40% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 80 || y < lastY);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      {/* ── Compact bottom strip (desktop) ── */}
      <nav
        className={`
          fixed bottom-0 left-0 right-0 z-40 hidden transition-transform duration-300 ease-out md:block
          ${visible ? 'translate-y-0' : 'translate-y-full'}
        `}
        aria-label="Bakery map navigation"
      >
        {/* Top progress rule */}
        <div className="absolute inset-x-0 top-0 h-px bg-line" />

        <div className="flex items-center justify-between gap-0 bg-paper/92 px-6 py-2 backdrop-blur-sm lg:px-10">
          {/* Wordmark */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); goTo('hero'); }}
            className="mr-4 shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-ink/70 hover:text-levain"
          >
            Masa&nbsp;Madre
          </a>

          {/* Journey nodes */}
          <ol className="flex flex-1 items-center justify-center">
            {ROOMS.map((room, i) => {
              const isActive = active === room.id;
              const label = lang === 'es' ? room.es : room.en;
              return (
                <li key={room.id} className="flex items-center">
                  {i > 0 && (
                    <span
                      className="mx-0.5 h-px w-4 transition-colors duration-300 lg:w-6"
                      style={{ background: isActive ? '#c0741a' : 'rgba(42,32,24,0.2)' }}
                    />
                  )}
                  <button
                    onClick={() => goTo(room.id)}
                    title={label}
                    className={`
                      group relative flex flex-col items-center gap-0.5 px-1 py-1 transition-all duration-300
                      ${isActive ? 'scale-110' : 'opacity-50 hover:opacity-90'}
                    `}
                  >
                    <span
                      className={`
                        text-[0.7rem] leading-none transition-colors duration-300
                        ${isActive ? 'text-levain' : 'text-ink group-hover:text-levain'}
                      `}
                    >
                      {room.icon}
                    </span>
                    <span
                      className={`
                        hidden font-mono text-[0.5rem] uppercase tracking-[0.15em] transition-all duration-300 xl:block
                        ${isActive ? 'text-levain' : 'text-ash group-hover:text-ink'}
                      `}
                    >
                      {label}
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-levain" />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="ml-4 shrink-0 border border-line bg-surface/80 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink transition-colors hover:border-levain hover:text-levain"
          >
            <span className="text-levain">{lang === 'es' ? 'ES' : 'EN'}</span>
            <span className="text-ash">/</span>
            <span>{c.nav.langLabel}</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile: wordmark + hamburger ── */}
      <div className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-5 py-3 md:hidden">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); goTo('hero'); }}
          className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-ink/80"
        >
          Masa&nbsp;Madre
        </a>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ash"
          >
            {lang === 'es' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-xs text-ink/80"
            aria-label="Menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-paper/97 backdrop-blur md:hidden">
          <p className="eyebrow mb-4 text-levain">{lang === 'es' ? 'La Panadería' : 'The Bakery'}</p>
          {ROOMS.map((room) => (
            <button
              key={room.id}
              onClick={() => goTo(room.id)}
              className={`
                flex items-center gap-3 font-display text-2xl transition-colors
                ${active === room.id ? 'text-levain' : 'text-ink/80'}
              `}
            >
              <span className="font-mono text-xs text-ash">{room.icon}</span>
              {lang === 'es' ? room.es : room.en}
            </button>
          ))}
        </div>
      )}

      {/* Top progress hairline */}
      <ProgressLine />
    </>
  );
}

function ProgressLine() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-px bg-line/40">
      <div
        className="h-full bg-levain transition-[width] duration-150"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
