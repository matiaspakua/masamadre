'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useContent } from '@/lib/i18n';

// Landing page: pre-dawn boulangerie facade.
// Layout: sky/text zone (top ~45vh) + building zone (bottom ~55vh).
// On "Enter": 3D barn-doors swing open → scroll to first section.
export default function BakeryExterior() {
  const root    = useRef<HTMLElement>(null);
  const doorRef = useRef<HTMLDivElement>(null);
  const { hero } = useContent();
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.ext-sky-title',    { opacity: 0, y: 36, duration: 1.1 },  0.25)
        .from('.ext-sky-sub',      { opacity: 0, y: 20, duration: 0.9 },  0.75)
        .from('.ext-sky-cta',      { opacity: 0,         duration: 0.8 },  1.15)
        .from('.ext-building-svg', { opacity: 0, y: 50, duration: 1.4 },  0.05)
        .from('.ext-awning',       { scaleX: 0, transformOrigin: 'center', duration: 0.8 }, 0.7)
        .from('.ext-win-l, .ext-win-r', { opacity: 0, duration: 1 }, 0.85);

      // Lantern / window warm pulse
      gsap.to('.ext-glow-el', {
        opacity: 0.65,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.9, from: 'random' },
      });

      // Sign gentle sway
      gsap.to('.ext-sign', {
        rotation: 1.4,
        transformOrigin: '50% 5%',
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const enter = () => {
    if (opening) return;
    setOpening(true);
    // Swing both door halves open in 3-D then scroll
    const door = doorRef.current;
    if (door) {
      const l = door.querySelector<HTMLElement>('.door-l');
      const r = door.querySelector<HTMLElement>('.door-r');
      if (l) l.style.transform = 'perspective(900px) rotateY(80deg)';
      if (r) r.style.transform = 'perspective(900px) rotateY(-80deg)';
    }
    setTimeout(() => {
      document.getElementById('origins')?.scrollIntoView({ behavior: 'smooth' });
    }, 750);
  };

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* ── Sky gradient background ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg,#060402 0%,#1c0b04 38%,#7a3208 78%,#c0741a44 100%)',
        }}
      />

      {/* ── Stars + moon (fixed layer) ── */}
      <svg
        className="pointer-events-none absolute inset-0 h-[50%] w-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {([[120,38],[290,22],[490,14],[680,42],[890,18],[1060,55],[1140,32],[60,82],[380,68],[760,28],[1010,78],[200,95],[550,105],[830,88]] as [number,number][]).map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={i%4===0?1.8:1.1} fill="#fff" opacity={0.25+i%3*0.15}/>
        ))}
        <circle cx="1060" cy="62" r="26" fill="#f5e8c0" opacity="0.82"/>
        <circle cx="1073" cy="56" r="21" fill="#060402" opacity="0.9"/>
      </svg>

      {/* ── Sky zone: title + CTA (top ~45vh) ── */}
      <div className="relative z-10 flex flex-[0_0_45vh] flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow mb-5 text-levain/70 tracking-widest">
          {hero.eyebrow}
        </p>
        <h1 className="ext-sky-title display text-paper text-[clamp(3.2rem,11vw,8.5rem)] leading-[0.9]">
          <span className="block">{hero.titleA}</span>
          <span className="block italic text-levain">{hero.titleB}</span>
        </h1>
        <p className="ext-sky-sub mt-5 max-w-xs font-mono text-[0.65rem] uppercase tracking-[0.22em] text-paper/50 sm:max-w-sm">
          {hero.thesis}
        </p>
        <button
          onClick={enter}
          className="ext-sky-cta group mt-9 flex flex-col items-center gap-3 text-paper/65 transition-colors duration-300 hover:text-levain"
          aria-label="Enter the bakery"
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.35em]">
            {hero.scrollCue}
          </span>
          <span className="relative h-12 w-px overflow-hidden bg-paper/20">
            <span className="absolute left-0 top-0 h-4 w-full animate-[rise_1.8s_ease-in-out_infinite] bg-levain"/>
          </span>
        </button>
      </div>

      {/* ── Building zone (bottom ~55vh) ── */}
      <div className="relative flex-1">

        {/* Bakery facade SVG */}
        <svg
          className="ext-building-svg absolute inset-0 h-full w-full"
          viewBox="0 0 1200 520"
          preserveAspectRatio="xMidYMax meet"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="bWinL" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#ffe080" stopOpacity="0.98"/>
              <stop offset="55%" stopColor="#e08820" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#c0741a" stopOpacity="0.1"/>
            </radialGradient>
            <radialGradient id="bWinR" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#ffd878" stopOpacity="0.95"/>
              <stop offset="55%" stopColor="#d87c18" stopOpacity="0.75"/>
              <stop offset="100%" stopColor="#c0741a" stopOpacity="0.1"/>
            </radialGradient>
            <radialGradient id="bLantern" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff5c0" stopOpacity="0.95"/>
              <stop offset="70%" stopColor="#e09030" stopOpacity="0.45"/>
              <stop offset="100%" stopColor="#c0741a" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="bDoor" cx="50%" cy="110%" r="60%">
              <stop offset="0%" stopColor="#ffe080" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#c0741a" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="bStone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7a5e42"/>
              <stop offset="100%" stopColor="#4a3420"/>
            </linearGradient>
            <linearGradient id="bAwning" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c0741a"/>
              <stop offset="100%" stopColor="#8a4408"/>
            </linearGradient>
            <pattern id="bCobble" x="0" y="0" width="72" height="22" patternUnits="userSpaceOnUse">
              <rect x="1" y="1" width="68" height="9" rx="2" fill="#281a0c" opacity="0.9"/>
              <rect x="37" y="12" width="68" height="9" rx="2" fill="#221608" opacity="0.8"/>
            </pattern>
          </defs>

          {/* Chimneys */}
          <rect x="218" y="0" width="44" height="80" fill="#2e1e0e"/>
          <rect x="206" y="0" width="68" height="12" rx="1" fill="#241408"/>
          <rect x="938" y="0" width="44" height="80" fill="#2e1e0e"/>
          <rect x="926" y="0" width="68" height="12" rx="1" fill="#241408"/>

          {/* Smoke circles — CSS-animated via className */}
          <circle className="ext-smoke-a" cx="240" cy="0"  r="9"  fill="#888"/>
          <circle className="ext-smoke-b" cx="246" cy="0" r="13"  fill="#999"/>
          <circle className="ext-smoke-c" cx="234" cy="0"  r="8"  fill="#aaa"/>
          <circle className="ext-smoke-a" cx="960" cy="0"  r="9"  fill="#888"/>
          <circle className="ext-smoke-b" cx="966" cy="0" r="12"  fill="#999"/>
          <circle className="ext-smoke-c" cx="954" cy="0"  r="8"  fill="#aaa"/>

          {/* Roof gable */}
          <path d="M 340,118 L 600,30 L 860,118 Z" fill="#241408"/>
          {[50,75,100].map((y,i)=>{
            const f=(y-30)/(118-30);
            return <line key={i} x1={340+f*(600-340)} y1={y} x2={860-f*(860-600)} y2={y} stroke="#3a2010" strokeWidth="1.2" opacity="0.5"/>;
          })}
          <circle cx="600" cy="27" r="7" fill="#c0741a"/>
          <line x1="600" y1="20" x2="600" y2="8" stroke="#c0741a" strokeWidth="2.5"/>
          <circle cx="600" cy="5" r="4.5" fill="#c0741a" opacity="0.8"/>

          {/* Parapets */}
          <rect x="100" y="100" width="240" height="26" fill="#2e1e0e"/>
          <rect x="860" y="100" width="240" height="26" fill="#2e1e0e"/>
          {[112,148,184,220,256,292].map(x=><rect key={x} x={x} y="90" width="19" height="26" rx="1" fill="#3a2818"/>)}
          {[872,908,944,980,1016,1056].map(x=><rect key={x} x={x} y="90" width="19" height="26" rx="1" fill="#3a2818"/>)}

          {/* Main facade */}
          <rect x="100" y="118" width="1000" height="332" fill="url(#bStone)"/>
          {[158,198,238,278,318,358,398].map((y,i)=>(
            <line key={i} x1="100" y1={y} x2="1100" y2={y} stroke="#4a3220" strokeWidth="0.7" opacity="0.4"/>
          ))}

          {/* Awning */}
          <g className="ext-awning">
            <path d="M 95,162 L 1105,162 L 1082,212 L 118,212 Z" fill="url(#bAwning)"/>
            {Array.from({length:24},(_,i)=>(
              <path key={i} d={`M ${118+i*41},212 Q ${118+i*41+20.5},232 ${118+i*41+41},212`} fill="#923a06" opacity="0.8"/>
            ))}
          </g>

          {/* Left window */}
          <g className="ext-win-l">
            <rect x="142" y="228" width="295" height="210" rx="3" fill="#5a4030"/>
            <rect x="152" y="236" width="275" height="194" rx="2" fill="#1e1208"/>
            <rect className="ext-glow-el" x="158" y="242" width="263" height="182" fill="url(#bWinL)" opacity="0.92"/>
            <line x1="289" y1="242" x2="289" y2="424" stroke="#1e1208" strokeWidth="7"/>
            <line x1="158" y1="333" x2="421" y2="333" stroke="#1e1208" strokeWidth="7"/>
            <line x1="223" y1="242" x2="223" y2="333" stroke="#1e1208" strokeWidth="3.5" opacity="0.7"/>
            <line x1="355" y1="242" x2="355" y2="333" stroke="#1e1208" strokeWidth="3.5" opacity="0.7"/>
            {/* Bread silhouettes */}
            <ellipse cx="200" cy="414" rx="28" ry="8" fill="#3a2810" opacity="0.65"/>
            <path d="M182,410 Q200,401 218,410 Q200,418 182,410Z" fill="#4a3418" opacity="0.5"/>
            <ellipse cx="375" cy="415" rx="24" ry="7" fill="#3a2810" opacity="0.6"/>
            <rect x="142" y="434" width="295" height="8" rx="2" fill="#3a2818"/>
          </g>

          {/* Right window */}
          <g className="ext-win-r">
            <rect x="763" y="228" width="295" height="210" rx="3" fill="#5a4030"/>
            <rect x="773" y="236" width="275" height="194" rx="2" fill="#1e1208"/>
            <rect className="ext-glow-el" x="779" y="242" width="263" height="182" fill="url(#bWinR)" opacity="0.92"/>
            <line x1="910" y1="242" x2="910" y2="424" stroke="#1e1208" strokeWidth="7"/>
            <line x1="779" y1="333" x2="1042" y2="333" stroke="#1e1208" strokeWidth="7"/>
            <line x1="844" y1="242" x2="844" y2="333" stroke="#1e1208" strokeWidth="3.5" opacity="0.7"/>
            <line x1="976" y1="242" x2="976" y2="333" stroke="#1e1208" strokeWidth="3.5" opacity="0.7"/>
            <ellipse cx="820" cy="414" rx="28" ry="8" fill="#3a2810" opacity="0.65"/>
            <path d="M802,410 Q820,401 838,410 Q820,418 802,410Z" fill="#4a3418" opacity="0.5"/>
            <ellipse cx="995" cy="415" rx="24" ry="7" fill="#3a2810" opacity="0.6"/>
            <rect x="763" y="434" width="295" height="8" rx="2" fill="#3a2818"/>
          </g>

          {/* Central arch door */}
          <path d="M 472,450 L 472,268 A 128,128 0 0 1 728,268 L 728,450 Z" fill="#5a4030"/>
          <path d="M 484,450 L 484,273 A 116,116 0 0 1 716,273 L 716,450 Z" fill="#1a0e06"/>
          <path d="M 491,450 L 491,278 A 109,109 0 0 1 709,278 L 709,450 Z" fill="url(#bDoor)" opacity="0.9"/>
          <rect x="492" y="296" width="98" height="84" rx="4" fill="#2a1810" stroke="#160c04" strokeWidth="2"/>
          <rect x="610" y="296" width="98" height="84" rx="4" fill="#2a1810" stroke="#160c04" strokeWidth="2"/>
          <rect x="492" y="390" width="98" height="54" rx="4" fill="#2a1810" stroke="#160c04" strokeWidth="2"/>
          <rect x="610" y="390" width="98" height="54" rx="4" fill="#2a1810" stroke="#160c04" strokeWidth="2"/>
          <rect x="598" y="278" width="4" height="172" fill="#0e0804"/>
          {/* Fanlight */}
          <path d="M 491,278 A 109,109 0 0 1 709,278 L 709,300 A 87,87 0 0 0 491,300 Z" fill="#ffe080" opacity="0.5"/>
          {[-70,-42,-14,14,42,70].map((deg,i)=>{
            const rad=(deg-90)*Math.PI/180;
            return <line key={i} x1="600" y1="278" x2={600+104*Math.cos(rad)} y2={278+104*Math.sin(rad)} stroke="#1a0e06" strokeWidth={2} opacity="0.75"/>;
          })}
          {/* Handles */}
          <rect x="588" y="356" width="10" height="26" rx="5" fill="#c0a030"/>
          <rect x="602" y="356" width="10" height="26" rx="5" fill="#b09020"/>
          {/* Steps */}
          <rect x="450" y="450" width="300" height="14" rx="2" fill="#3a2818"/>
          <rect x="430" y="464" width="340" height="10" rx="2" fill="#2e2010"/>

          {/* Lanterns */}
          <line x1="454" y1="234" x2="454" y2="256" stroke="#7a5a2a" strokeWidth="3"/>
          <rect x="438" y="254" width="32" height="48" rx="5" fill="#160e06" stroke="#7a5a2a" strokeWidth="2"/>
          <ellipse className="ext-glow-el" cx="454" cy="278" rx="13" ry="15" fill="url(#bLantern)" opacity="0.9"/>
          <line x1="746" y1="234" x2="746" y2="256" stroke="#7a5a2a" strokeWidth="3"/>
          <rect x="730" y="254" width="32" height="48" rx="5" fill="#160e06" stroke="#7a5a2a" strokeWidth="2"/>
          <ellipse className="ext-glow-el" cx="746" cy="278" rx="13" ry="15" fill="url(#bLantern)" opacity="0.9"/>

          {/* Hanging sign */}
          <g className="ext-sign">
            <line x1="543" y1="120" x2="543" y2="148" stroke="#7a5a2a" strokeWidth="2.5" strokeDasharray="3,4"/>
            <line x1="657" y1="120" x2="657" y2="148" stroke="#7a5a2a" strokeWidth="2.5" strokeDasharray="3,4"/>
            <rect x="518" y="146" width="164" height="54" rx="4" fill="#1e1208" stroke="#7a5a2a" strokeWidth="1.8"/>
            <text x="600" y="165" textAnchor="middle" fontFamily="Georgia,'Times New Roman',serif" fontSize="9" letterSpacing="5" fill="#c0741a">BOULANGERIE</text>
            <text x="600" y="186" textAnchor="middle" fontFamily="Georgia,'Times New Roman',serif" fontSize="16" letterSpacing="1" fontWeight="bold" fill="#f0d090">Masa Madre</text>
          </g>

          {/* Cobblestone ground */}
          <rect x="0" y="474" width="1200" height="46" fill="#1a1008"/>
          <rect x="0" y="474" width="1200" height="46" fill="url(#bCobble)" opacity="0.55"/>
          {/* Ground glow from windows */}
          <ellipse cx="289" cy="474" rx="200" ry="18" fill="#c0741a" opacity="0.1"/>
          <ellipse cx="910" cy="474" rx="200" ry="18" fill="#c0741a" opacity="0.1"/>
          {/* Ground glow from door */}
          <ellipse cx="600" cy="475" rx="130" ry="20" fill="#ffe080" opacity="0.12"/>
        </svg>

        {/* ── 3D door overlay — the two barn-door halves ── */}
        <div
          ref={doorRef}
          className="pointer-events-none absolute inset-0"
          style={{ perspective: '900px', perspectiveOrigin: '50% 80%' }}
        >
          <div
            className="door-l absolute inset-y-0 left-0 w-1/2"
            style={{
              background: 'linear-gradient(to right, #1e1208 0%, #2a1a10 85%, #3a2418 100%)',
              transformOrigin: 'left center',
              transform: opening ? 'rotateY(82deg)' : 'rotateY(0deg)',
              transition: 'transform 0.85s cubic-bezier(0.4,0,0.2,1)',
              willChange: 'transform',
            }}
          />
          <div
            className="door-r absolute inset-y-0 right-0 w-1/2"
            style={{
              background: 'linear-gradient(to left, #1e1208 0%, #2a1a10 85%, #3a2418 100%)',
              transformOrigin: 'right center',
              transform: opening ? 'rotateY(-82deg)' : 'rotateY(0deg)',
              transition: 'transform 0.85s cubic-bezier(0.4,0,0.2,1)',
              willChange: 'transform',
            }}
          />
        </div>
      </div>
    </section>
  );
}
