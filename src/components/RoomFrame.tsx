'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

export type RoomConfig = {
  id: string;
  number: string;
  es: string;
  en: string;
  // Tailwind-compatible CSS color for the accent stripe
  accent: string;
  // Which side the arch opens toward
  side?: 'left' | 'right' | 'center';
};

// Architectural arch SVG at the top of each room — the "doorway" framing.
function RoomArch({ accent, side = 'center' }: { accent: string; side?: string }) {
  const w = 1200;
  const archW = side === 'center' ? 320 : 240;
  const archX = side === 'left' ? 80 : side === 'right' ? w - 80 - archW : (w - archW) / 2;
  const archH = 40;

  return (
    <svg
      className="room-arch pointer-events-none absolute inset-x-0 top-0 w-full"
      viewBox={`0 0 ${w} 60`}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ height: 60 }}
    >
      {/* Full-width divider rule */}
      <line x1="0" y1="1" x2={w} y2="1" stroke={accent} strokeWidth="1" opacity="0.35" />
      {/* Arch cutout rising from the rule */}
      <path
        d={`M ${archX},2 L ${archX},${archH} Q ${archX + archW / 2},${archH + 22} ${archX + archW},${archH} L ${archX + archW},2 Z`}
        fill="transparent"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.5"
      />
      {/* Left and right accent marks */}
      <rect x="0" y="0" width="48" height="1.5" fill={accent} opacity="0.5" />
      <rect x={w - 48} y="0" width="48" height="1.5" fill={accent} opacity="0.5" />
    </svg>
  );
}

// Room name placard — appears at the arch keystone
function RoomPlaque({
  number,
  name,
  accent,
}: {
  number: string;
  name: string;
  accent: string;
}) {
  return (
    <div
      className="room-plaque pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 flex items-center gap-2.5 opacity-0"
      aria-hidden="true"
    >
      <span
        className="font-mono text-[0.58rem] uppercase tracking-[0.3em]"
        style={{ color: accent }}
      >
        {number}
      </span>
      <span className="h-px w-6" style={{ background: accent, opacity: 0.5 }} />
      <span
        className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink/70"
      >
        {name}
      </span>
      <span className="h-px w-6" style={{ background: accent, opacity: 0.5 }} />
    </div>
  );
}

export default function RoomFrame({
  config,
  children,
}: {
  config: RoomConfig;
  children: ReactNode;
}) {
  const { lang } = useLang();
  const frameRef = useRef<HTMLDivElement>(null);
  const name = lang === 'es' ? config.es : config.en;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = frameRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Room plaque: fade in as the arch enters, fade out after
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        end: 'top 30%',
        onEnter: () => {
          gsap.to(el.querySelector('.room-plaque'), {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
        },
        onLeave: () => {
          gsap.to(el.querySelector('.room-plaque'), {
            opacity: 0,
            duration: 0.4,
          });
        },
        onEnterBack: () => {
          gsap.to(el.querySelector('.room-plaque'), {
            opacity: 1,
            duration: 0.4,
          });
        },
        onLeaveBack: () => {
          gsap.to(el.querySelector('.room-plaque'), {
            opacity: 0,
            duration: 0.4,
          });
        },
      });

      // Room arch: draw in with a clip-path wipe
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.from(el.querySelector('.room-arch'), {
            scaleX: 0,
            transformOrigin: 'center top',
            duration: 0.9,
            ease: 'power3.inOut',
          });
        },
      });

      // Content: depth-push entry — slides in from a slight Z-recession
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.from(el.querySelector('.room-content'), {
            opacity: 0,
            scale: 0.972,
            y: 18,
            duration: 1.1,
            ease: 'power3.out',
          });
        },
      });
    }, frameRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={frameRef}
      data-room={config.id}
      className="relative"
    >
      <RoomArch accent={config.accent} side={config.side} />
      <RoomPlaque number={config.number} name={name} accent={config.accent} />
      <div className="room-content">{children}</div>
    </div>
  );
}
