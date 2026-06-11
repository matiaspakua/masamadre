'use client';

import { useEffect, useState } from 'react';
import { SECTIONS } from '@/lib/content';

// Fixed side index that doubles as a reading instrument: quick jumps to any
// section, a live progress bar, and a highlight of where you currently are.
export default function Nav() {
  const [active, setActive] = useState<string>('hero');
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);

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
  }, []);

  return (
    <>
      {/* Top progress hairline */}
      <div className="fixed left-0 right-0 top-0 z-40 h-px bg-crumb/40">
        <div
          className="h-full bg-levain transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Wordmark */}
      <a
        href="#hero"
        className="fixed left-6 top-5 z-40 font-mono text-xs uppercase tracking-[0.3em] text-linen/80 mix-blend-difference hover:text-levain lg:left-10"
      >
        Masa&nbsp;Madre
      </a>

      {/* Mobile toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed right-6 top-4 z-50 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-linen/80 mix-blend-difference md:hidden"
        aria-label="Toggle section index"
      >
        {open ? 'Close' : 'Index'}
      </button>

      {/* Desktop side index */}
      <nav className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
        {SECTIONS.map((s, i) => (
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
                  : 'w-4 bg-ash/50 group-hover:w-6 group-hover:bg-linen'
              }`}
            />
          </a>
        ))}
      </nav>

      {/* Mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-soot/95 backdrop-blur md:hidden">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-linen"
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
