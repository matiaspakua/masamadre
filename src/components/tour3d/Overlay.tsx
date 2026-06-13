'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/lib/i18n';
import { registerMotion, prefersReducedMotion, DUR, EASE } from '@/lib/motion';
import type { Room3D } from './rooms';

// A floating, translucent "glass" panel that holds one section's content over
// the live 3D bakery. The blur + translucency keep the room visible behind the
// text (text-as-overlay), while the light ground keeps reading crisp. A room
// placard names the space; the panel docks in with a short depth move.
export default function Overlay({ room, children }: { room: Room3D; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const name = lang === 'es' ? room.es : room.en;

  useEffect(() => {
    registerMotion();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.ov-panel', {
        opacity: 0,
        y: 40,
        scale: 0.97,
        duration: DUR.blockSlow,
        ease: EASE.enter,
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      });
      gsap.from('.ov-placard', {
        opacity: 0,
        y: 14,
        duration: DUR.component,
        ease: EASE.enter,
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      data-room={room.id}
      ref={ref}
      className="relative z-10 px-3 py-[11vh] sm:px-5 md:py-[15vh]"
    >
      <div className="ov-panel relative mx-auto max-w-6xl overflow-hidden rounded-[1.4rem] border border-line/50 bg-paper/82 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
        {/* accent top edge */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${room.accent}, transparent)` }} />

        {/* room placard */}
        <div className="ov-placard flex items-center justify-center gap-3 pt-7">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.34em]" style={{ color: room.accent }}>
            {room.number}
          </span>
          <span className="h-px w-7" style={{ background: room.accent, opacity: 0.5 }} />
          <span className="font-mono text-[0.64rem] uppercase tracking-[0.24em] text-ink/70">{name}</span>
          <span className="h-px w-7" style={{ background: room.accent, opacity: 0.5 }} />
        </div>

        {children}
      </div>
    </section>
  );
}
