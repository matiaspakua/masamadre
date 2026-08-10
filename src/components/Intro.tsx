'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// A once-per-session opening: the wordmark rises like proofing dough, flour
// motes settle, a "fermenting" line fills, then the curtain lifts to reveal
// the hero. Skipped entirely for reduced-motion or on repeat visits. Page
// content lives in the DOM beneath the whole time (SEO / a11y safe).
export default function Intro() {
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced || sessionStorage.getItem('mm-intro')) {
      setGone(true);
      return;
    }
    sessionStorage.setItem('mm-intro', '1');
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          setGone(true);
        },
      });
      tl.from('.intro-word', {
        yPercent: 130,
        opacity: 0,
        duration: 1,
        stagger: 0.14,
        ease: 'power4.out',
        delay: 0.15,
      })
        .from('.intro-sub', { opacity: 0, y: 10, duration: 0.6 }, '-=0.35')
        .fromTo(
          '.intro-bar-fill',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: 'power2.inOut' },
          '-=0.4',
        )
        .to('.intro-content', { opacity: 0, duration: 0.5 }, '+=0.15')
        .to(
          root.current,
          {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1,
            ease: 'power4.inOut',
          },
          '-=0.2',
        );
    }, root);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="intro-root fixed inset-0 z-[60] flex items-center justify-center bg-paper"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      {/* settling flour motes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-ash/40"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animation: `mm-floatup ${4 + (i % 5)}s ease-in ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="intro-content relative text-center">
        <div className="overflow-hidden">
          <span className="intro-word display block text-[clamp(3rem,12vw,9rem)] leading-none">
            Masa
          </span>
        </div>
        <div className="overflow-hidden">
          <span className="intro-word display block italic text-levain text-[clamp(3rem,12vw,9rem)] leading-none">
            Madre
          </span>
        </div>
        <p className="intro-sub mt-8 font-mono text-[0.7rem] uppercase tracking-[0.4em] text-ash">
          fermentando
        </p>
        <div className="intro-bar mx-auto mt-5 h-px w-40 overflow-hidden bg-line">
          <div className="intro-bar-fill h-full w-full origin-left bg-levain" />
        </div>
      </div>
    </div>
  );
}
