'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n';

// Fixed side index that doubles as a reading instrument: quick jumps, a live
// progress bar, a highlight of where you are, and the language toggle.
export default function Nav() {
  const { c, lang, toggle } = useLang();
  const sections = c.nav.sections;
  const [active, setActive] = useState<string>('hero');
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = sections.map((s) => s.id);

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [sections]);

  return (
    <>
      {/* Top progress hairline */}
      <div className="fixed left-0 right-0 top-0 z-40 h-px bg-line">
        <div
          className="h-full bg-levain transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Wordmark */}
      <a
        href="#hero"
        className="fixed left-6 top-5 z-40 font-mono text-xs uppercase tracking-[0.3em] text-ink/80 hover:text-levain lg:left-10"
      >
        Masa&nbsp;Madre
      </a>

      {/* Language toggle */}
      <button
        onClick={toggle}
        className="fixed right-6 top-4 z-50 flex items-center gap-1.5 border border-line bg-surface/80 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink shadow-sm backdrop-blur transition-colors hover:border-levain hover:text-levain md:right-10"
        aria-label={
          lang === 'es' ? 'Switch to English' : 'Cambiar a español'
        }
      >
        <span className="text-levain">{lang === 'es' ? 'ES' : 'EN'}</span>
        <span className="text-ash">/</span>
        <span>{c.nav.langLabel}</span>
      </button>

      {/* Mobile toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed left-1/2 top-4 z-50 -translate-x-1/2 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-ink/80 md:hidden"
        aria-label="Index"
      >
        {open ? '×' : '☰'}
      </button>

      {/* Desktop side index */}
      <nav className="fixed right-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center justify-end gap-3"
          >
            <span
              className={`font-mono text-[0.62rem] uppercase tracking-[0.18em] transition-all duration-300 ${
                active === s.id
                  ? 'text-levain opacity-100'
                  : 'text-ash opacity-0 group-hover:opacity-100'
              }`}
            >
              {String(i + 1).padStart(2, '0')} · {s.label}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                active === s.id
                  ? 'w-8 bg-levain'
                  : 'w-4 bg-ash/50 group-hover:w-6 group-hover:bg-ink'
              }`}
            />
          </a>
        ))}
      </nav>

      {/* Mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 bg-paper/97 backdrop-blur md:hidden">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-ink"
            >
              <span className="mr-3 font-mono text-sm text-levain">
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
