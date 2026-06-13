'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

type ThresholdProps = {
  // Room heading shown at the vanishing point
  es: string;
  en: string;
  number: string;
  // Wall/torch accent color (hex)
  accent?: string;
};

// Full-viewport corridor threshold — the "doorway" moment between bakery rooms.
// One-point perspective box rendered in SVG: floor, ceiling, walls converge to an
// arch at the center. GSAP ScrollTrigger drives the draw-in animation so the
// corridor appears to "zoom" the user through the threshold.
export default function BakeryThreshold({ es, en, number, accent = '#c0741a' }: ThresholdProps) {
  const ref   = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const name  = lang === 'es' ? es : en;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Entrance: the corridor "rushes toward" the viewer
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      tl.from('.thr-bg',         { opacity: 0, duration: 0.4 })
        .from('.thr-wall',       { opacity: 0, scale: 0.88, duration: 0.8, transformOrigin: 'center', stagger: 0.06 }, 0.1)
        .from('.thr-arch',       { opacity: 0, scale: 0.3, transformOrigin: 'center', duration: 0.9, ease: 'back.out(1.4)' }, 0.35)
        .from('.thr-number',     { opacity: 0, letterSpacing: '1.4em', duration: 0.7 }, 0.55)
        .from('.thr-name',       { opacity: 0, y: 22, duration: 0.8 }, 0.7)
        .from('.thr-rule',       { scaleX: 0, transformOrigin: 'center', duration: 0.6 }, 0.85)
        .from('.thr-torch-glow', { opacity: 0, duration: 0.8 }, 0.5);

      // Torch flicker — ongoing after entry
      gsap.to('.thr-torch-glow', {
        opacity: 0.55,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.7, from: 'random' },
      });

      // Subtle corridor depth breathing
      gsap.to('.thr-inner', {
        scale: 1.018,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        transformOrigin: 'center',
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* Dark background */}
      <div className="thr-bg absolute inset-0" style={{ background: '#0e0a06' }} />

      {/* One-point perspective corridor SVG */}
      <svg
        className="thr-inner absolute inset-0 h-full w-full"
        viewBox="0 0 200 120"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="thrArchGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.7"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="thrTorch" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe080" stopOpacity="0.9"/>
            <stop offset="60%" stopColor="#e08020" stopOpacity="0.4"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="thrCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Vanishing-point glow at arch */}
        <ellipse cx="100" cy="60" rx="24" ry="20" fill="url(#thrCenter)"/>

        {/* ── One-point perspective box ── */}
        {/* Floor — trapezoid converging to center */}
        <polygon className="thr-wall" points="0,120 200,120 130,72 70,72" fill="#1e1408"/>
        {/* Ceiling */}
        <polygon className="thr-wall" points="0,0 200,0 130,48 70,48" fill="#0a0806"/>
        {/* Left wall */}
        <polygon className="thr-wall" points="0,0 70,48 70,72 0,120" fill="#160e08"/>
        {/* Right wall */}
        <polygon className="thr-wall" points="200,0 130,48 130,72 200,120" fill="#160e08"/>

        {/* Floor tile lines — depth lines on the floor */}
        {[0.15,0.35,0.55,0.75].map((t,i)=>{
          const lx = t*70, rx=200-t*70;
          const ly = 120-t*(120-72), ry=120-t*(120-72);
          const cx = 100;
          return (
            <g key={i}>
              <line x1={lx} y1={ly} x2={cx} y2={72} stroke="#2a1a0c" strokeWidth="0.4" opacity="0.6"/>
              <line x1={rx} y1={ry} x2={cx} y2={72} stroke="#2a1a0c" strokeWidth="0.4" opacity="0.6"/>
              {/* Horizontal floor lines */}
              <line x1={lx} y1={ly} x2={rx} y2={ry} stroke="#251508" strokeWidth="0.35" opacity="0.5"/>
            </g>
          );
        })}

        {/* Ceiling tile lines */}
        {[0.2,0.5,0.8].map((t,i)=>{
          const lx=t*70, rx=200-t*70;
          const ly=t*(48-0), ry=t*(48-0);
          return <line key={i} x1={lx} y1={ly} x2={rx} y2={ry} stroke="#180f06" strokeWidth="0.3" opacity="0.5"/>;
        })}

        {/* Wall vertical lines (left) */}
        {[0.3,0.6].map((t,i)=>(
          <line key={i} x1={t*70} y1={t*48} x2={t*70} y2={120-t*(120-72)} stroke="#1e120a" strokeWidth="0.4" opacity="0.5"/>
        ))}
        {/* Wall vertical lines (right) */}
        {[0.3,0.6].map((t,i)=>(
          <line key={i} x1={200-t*70} y1={t*48} x2={200-t*70} y2={120-t*(120-72)} stroke="#1e120a" strokeWidth="0.4" opacity="0.5"/>
        ))}

        {/* ── Arch at vanishing point ── */}
        <g className="thr-arch">
          {/* Stone arch frame */}
          <path d="M 70,72 L 70,52 A 30,30 0 0 1 130,52 L 130,72 Z" fill="#2a1c0e" stroke="#3a2816" strokeWidth="0.8"/>
          {/* Arch interior glow */}
          <path d="M 74,72 L 74,56 A 26,26 0 0 1 126,56 L 126,72 Z" fill="url(#thrArchGlow)"/>
          {/* Keystone */}
          <polygon points="96,48 100,44 104,48 102,56 98,56" fill={accent} opacity="0.7"/>
          {/* Arch voussoir lines */}
          {[-50,-30,-10,10,30,50].map((deg,i)=>{
            const rad=(deg-90)*Math.PI/180;
            const r=26, outerR=30;
            return <line key={i} x1={100+r*Math.cos(rad)} y1={52+r*Math.sin(rad)} x2={100+outerR*Math.cos(rad)} y2={52+outerR*Math.sin(rad)} stroke="#2a1810" strokeWidth="0.6" opacity="0.6"/>;
          })}
          {/* Warm arch glow overlay */}
          <ellipse cx="100" cy="62" rx="20" ry="14" fill={accent} opacity="0.08"/>
        </g>

        {/* ── Wall torches ── */}
        {/* Left torch */}
        <g>
          <rect x="20" y="44" width="4" height="12" rx="1" fill="#3a2010"/>
          <circle className="thr-torch-glow" cx="22" cy="42" r="7" fill="url(#thrTorch)" opacity="0.8"/>
          <circle cx="22" cy="42" r="2.5" fill="#fff8e0" opacity="0.9"/>
          {/* Wall sconce glow on stone */}
          <ellipse cx="22" cy="48" rx="18" ry="12" fill="#e08020" opacity="0.06"/>
        </g>
        {/* Right torch */}
        <g>
          <rect x="176" y="44" width="4" height="12" rx="1" fill="#3a2010"/>
          <circle className="thr-torch-glow" cx="178" cy="42" r="7" fill="url(#thrTorch)" opacity="0.8"/>
          <circle cx="178" cy="42" r="2.5" fill="#fff8e0" opacity="0.9"/>
          <ellipse cx="178" cy="48" rx="18" ry="12" fill="#e08020" opacity="0.06"/>
        </g>

        {/* Floor dust/grit scatter */}
        {[[18,115],[45,118],[80,116],[120,117],[158,115],[185,118]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={0.8+i%3*0.3} fill="#3a2818" opacity="0.4"/>
        ))}
      </svg>

      {/* ── Room announcement text ── */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <span className="thr-number font-mono text-[0.65rem] uppercase tracking-[0.4em]" style={{ color: accent }}>
          {number}
        </span>
        <div className="thr-rule h-px w-16 rounded-full" style={{ background: accent, opacity: 0.4 }}/>
        <h2 className="thr-name font-display text-[clamp(1.8rem,5vw,4rem)] font-light leading-none tracking-[-0.01em] text-paper/90">
          {name}
        </h2>
        <div className="thr-rule h-px w-16 rounded-full" style={{ background: accent, opacity: 0.4 }}/>
      </div>
    </div>
  );
}
