'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useContent } from '@/lib/i18n';

// The landing page reimagined as a traditional boulangerie facade.
// Pre-dawn: warm window light spills onto cobblestones, smoke drifts from chimneys.
// Users are invited to "enter" the bakery and begin the journey.
export default function BakeryExterior() {
  const root = useRef<HTMLElement>(null);
  const { hero } = useContent();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.ext-building', { opacity: 0, y: 40, duration: 1.4 }, 0.1)
        .from('.ext-sign', { opacity: 0, scale: 0.88, duration: 1, ease: 'back.out(1.6)' }, 0.9)
        .from('.ext-title', { opacity: 0, y: 32, duration: 1 }, 1.1)
        .from('.ext-sub', { opacity: 0, y: 18, duration: 0.9 }, 1.45)
        .from('.ext-cta', { opacity: 0, duration: 0.7 }, 1.8);

      // Gentle lantern flicker
      gsap.to('.ext-lantern-glow', {
        opacity: 0.65,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.8, from: 'random' },
      });

      // Window warm pulse
      gsap.to('.ext-win-glow', {
        opacity: 0.78,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 2,
      });

      // Sign gentle sway
      gsap.to('.ext-sign', {
        rotation: 1.2,
        transformOrigin: '50% 0%',
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const enter = () =>
    document.getElementById('origins')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-screen flex-col items-center overflow-hidden"
    >
      {/* ── Bakery facade SVG ── */}
      <svg
        className="ext-building absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="beSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#090604" />
            <stop offset="40%" stopColor="#2a1006" />
            <stop offset="78%" stopColor="#8a4010" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c0741a" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="beWinL" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#ffe080" stopOpacity="0.98" />
            <stop offset="55%" stopColor="#e08820" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c0741a" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="beWinR" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#ffd878" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#d87c18" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#c0741a" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="beDoorGlow" cx="50%" cy="105%" r="60%">
            <stop offset="0%" stopColor="#ffe080" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#c0741a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="beLantern" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff5c0" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#e09030" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c0741a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="beStone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a5e42" />
            <stop offset="100%" stopColor="#4a3420" />
          </linearGradient>
          <linearGradient id="beAwning" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c0741a" />
            <stop offset="100%" stopColor="#8a4408" />
          </linearGradient>
          <linearGradient id="beGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2e2012" />
            <stop offset="100%" stopColor="#1a1008" />
          </linearGradient>
          <pattern id="cobble" x="0" y="0" width="72" height="22" patternUnits="userSpaceOnUse">
            <rect x="1" y="1" width="68" height="9" rx="2" fill="#281a0c" opacity="0.9" />
            <rect x="37" y="12" width="68" height="9" rx="2" fill="#221608" opacity="0.8" />
          </pattern>
          <filter id="beGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Sky */}
        <rect width="1200" height="800" fill="url(#beSky)" />

        {/* Stars */}
        {([[120,38],[290,22],[490,14],[680,42],[890,18],[1060,55],[1140,32],[60,82],[380,68],[760,28],[1010,78]] as [number,number][]).map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={i%4===0?1.8:1.1} fill="#fff" opacity={0.3+i%3*0.15} />
        ))}

        {/* Moon */}
        <circle cx="1060" cy="62" r="26" fill="#f5e8c0" opacity="0.82" />
        <circle cx="1072" cy="56" r="21" fill="#090604" opacity="0.88" />

        {/* Chimneys */}
        <rect x="215" y="152" width="46" height="116" fill="#2e1e0e" />
        <rect x="203" y="145" width="70" height="16" rx="1" fill="#241408" />
        <rect x="938" y="152" width="46" height="116" fill="#2e1e0e" />
        <rect x="926" y="145" width="70" height="16" rx="1" fill="#241408" />

        {/* Smoke (CSS-animated via className) */}
        <circle className="ext-smoke-a" cx="238" cy="138" r="9" fill="#888" />
        <circle className="ext-smoke-b" cx="244" cy="124" r="13" fill="#999" />
        <circle className="ext-smoke-c" cx="232" cy="112" r="8" fill="#aaa" />
        <circle className="ext-smoke-a" cx="961" cy="138" r="9" fill="#888" />
        <circle className="ext-smoke-b" cx="967" cy="122" r="12" fill="#999" />
        <circle className="ext-smoke-c" cx="955" cy="110" r="8" fill="#aaa" />

        {/* Roof (gabled center, flat parapets on sides) */}
        <path d="M 340,298 L 600,205 L 860,298 Z" fill="#241408" />
        {/* Roof tiles — gentle lines */}
        {[225,240,255,270,285].map((y,i)=>{
          const frac = (y-205)/(298-205);
          const x0 = 340 + frac*(600-340);
          const x1 = 860 - frac*(860-600);
          return <line key={i} x1={x0} y1={y} x2={x1} y2={y} stroke="#3a2010" strokeWidth="1.2" opacity="0.6"/>;
        })}
        <circle cx="600" cy="202" r="7" fill="#c0741a" />
        <line x1="600" y1="195" x2="600" y2="182" stroke="#c0741a" strokeWidth="2.5" />
        <circle cx="600" cy="179" r="5" fill="#c0741a" opacity="0.8" />

        {/* Side parapets */}
        <rect x="100" y="280" width="240" height="28" fill="#2e1e0e" />
        <rect x="860" y="280" width="240" height="28" fill="#2e1e0e" />
        {/* Parapet crenels */}
        {[112,148,184,220,256,292].map(x=><rect key={x} x={x} y="268" width="20" height="28" rx="1" fill="#3a2818"/>)}
        {[872,908,944,980,1016,1052,1080].map(x=><rect key={x} x={x} y="268" width="20" height="28" rx="1" fill="#3a2818"/>)}

        {/* Main facade wall */}
        <rect x="100" y="298" width="1000" height="440" fill="url(#beStone)" />
        {/* Mortar lines */}
        {[338,378,418,458,498,538,578,618,658,698].map((y,i)=>(
          <line key={i} x1="100" y1={y} x2="1100" y2={y} stroke="#4a3220" strokeWidth="0.7" opacity="0.45" />
        ))}

        {/* Quoins (corner stones) */}
        {[320,360,400,440,480,520,560,600,640,680].map((y,i)=>(
          <rect key={i} x={i%2===0?100:112} y={y-1} width={i%2===0?22:12} height="19" rx="1" fill="#8a6a48" opacity="0.4" />
        ))}
        {[320,360,400,440,480,520,560,600,640,680].map((y,i)=>(
          <rect key={i} x={i%2===0?1078:1090} y={y-1} width={i%2===0?22:12} height="19" rx="1" fill="#8a6a48" opacity="0.4" />
        ))}

        {/* ── Awning ── */}
        <path d="M 95,342 L 1105,342 L 1080,398 L 120,398 Z" fill="url(#beAwning)" />
        {/* Awning scalloped valance */}
        {Array.from({length:24},(_,i)=>(
          <path key={i} d={`M ${120+i*41},398 Q ${120+i*41+20.5},420 ${120+i*41+41},398`} fill="#923a06" opacity="0.8" />
        ))}
        {/* Awning stripe lines */}
        {Array.from({length:26},(_,i)=>(
          <line key={i} x1={120+i*38} y1="342" x2={122+i*38} y2="398" stroke="#e08030" strokeWidth="1.5" opacity="0.22" />
        ))}

        {/* ── Left window ── */}
        {/* Stone surround */}
        <rect x="140" y="415" width="305" height="285" rx="3" fill="#5a4030" />
        {/* Wood frame */}
        <rect x="150" y="423" width="285" height="269" rx="2" fill="#1e1208" />
        {/* Window glow */}
        <rect className="ext-win-glow" x="157" y="429" width="271" height="257" fill="url(#beWinL)" opacity="0.92" />
        {/* Window panes */}
        <line x1="292" y1="429" x2="292" y2="686" stroke="#1e1208" strokeWidth="7" />
        <line x1="157" y1="557" x2="428" y2="557" stroke="#1e1208" strokeWidth="7" />
        <line x1="224" y1="429" x2="224" y2="557" stroke="#1e1208" strokeWidth="3.5" opacity="0.7" />
        <line x1="360" y1="429" x2="360" y2="557" stroke="#1e1208" strokeWidth="3.5" opacity="0.7" />
        {/* Bread display silhouettes in lower pane */}
        <ellipse cx="200" cy="674" rx="30" ry="9" fill="#3a2810" opacity="0.65" />
        <path d="M 182,670 Q 200,660 218,670 Q 200,678 182,670Z" fill="#4a3418" opacity="0.5" />
        <ellipse cx="380" cy="675" rx="26" ry="8" fill="#3a2810" opacity="0.6" />
        <path d="M 364,671 Q 380,662 396,671 Q 380,679 364,671Z" fill="#4a3418" opacity="0.5" />
        {/* Window sill */}
        <rect x="140" y="696" width="305" height="10" rx="2" fill="#3a2818" />

        {/* ── Right window (mirror) ── */}
        <rect x="755" y="415" width="305" height="285" rx="3" fill="#5a4030" />
        <rect x="765" y="423" width="285" height="269" rx="2" fill="#1e1208" />
        <rect className="ext-win-glow" x="772" y="429" width="271" height="257" fill="url(#beWinR)" opacity="0.92" />
        <line x1="907" y1="429" x2="907" y2="686" stroke="#1e1208" strokeWidth="7" />
        <line x1="772" y1="557" x2="1043" y2="557" stroke="#1e1208" strokeWidth="7" />
        <line x1="839" y1="429" x2="839" y2="557" stroke="#1e1208" strokeWidth="3.5" opacity="0.7" />
        <line x1="975" y1="429" x2="975" y2="557" stroke="#1e1208" strokeWidth="3.5" opacity="0.7" />
        <ellipse cx="820" cy="674" rx="30" ry="9" fill="#3a2810" opacity="0.65" />
        <path d="M 802,670 Q 820,660 838,670 Q 820,678 802,670Z" fill="#4a3418" opacity="0.5" />
        <ellipse cx="995" cy="675" rx="26" ry="8" fill="#3a2810" opacity="0.6" />
        <path d="M 979,671 Q 995,662 1011,671 Q 995,679 979,671Z" fill="#4a3418" opacity="0.5" />
        <rect x="755" y="696" width="305" height="10" rx="2" fill="#3a2818" />

        {/* ── Central arched door ── */}
        {/* Stone arch surround */}
        <path d="M 468,714 L 468,450 A 132,132 0 0 1 732,450 L 732,714 Z" fill="#5a4030" />
        {/* Keystone */}
        <polygon points="586,318 600,305 614,318 607,338 593,338" fill="#7a5a38" />
        {/* Arch voussoirs (wedge blocks) */}
        {[-70,-50,-30,-10,10,30,50,70].map((deg,i)=>{
          const rad = (deg-90)*Math.PI/180;
          const r=135;
          const cx=600+r*Math.cos(rad);
          const cy=450+r*Math.sin(rad);
          return <line key={i} x1={600+118*Math.cos(rad)} y1={450+118*Math.sin(rad)} x2={cx} y2={cy} stroke="#4a3020" strokeWidth="1.5" opacity="0.5"/>;
        })}
        {/* Door frame */}
        <path d="M 480,714 L 480,456 A 120,120 0 0 1 720,456 L 720,714 Z" fill="#1a0e06" />
        {/* Door interior glow */}
        <path d="M 487,714 L 487,460 A 113,113 0 0 1 713,460 L 713,714 Z" fill="url(#beDoorGlow)" />
        {/* Door panels */}
        <rect x="488" y="485" width="100" height="88" rx="4" fill="#2a1810" stroke="#160c04" strokeWidth="2" />
        <rect x="612" y="485" width="100" height="88" rx="4" fill="#2a1810" stroke="#160c04" strokeWidth="2" />
        <rect x="488" y="583" width="100" height="122" rx="4" fill="#2a1810" stroke="#160c04" strokeWidth="2" />
        <rect x="612" y="583" width="100" height="122" rx="4" fill="#2a1810" stroke="#160c04" strokeWidth="2" />
        {/* Door split */}
        <rect x="597" y="460" width="6" height="254" fill="#0e0804" />
        {/* Brass handles */}
        <rect x="587" y="576" width="12" height="28" rx="6" fill="#c0a030" />
        <rect x="601" y="576" width="12" height="28" rx="6" fill="#b09020" />
        {/* Fanlight (semicircular transom) */}
        <path d="M 488,460 A 112,112 0 0 1 712,460 L 712,485 A 88,88 0 0 0 488,485 Z" fill="#ffe080" opacity="0.55" />
        {/* Fanlight spokes */}
        {[-70,-42,-14,14,42,70].map((deg,i)=>{
          const rad=(deg-90)*Math.PI/180;
          return <line key={i} x1="600" y1="460" x2={600+100*Math.cos(rad)} y2={460+100*Math.sin(rad)} stroke="#1a0e06" strokeWidth={i===2||i===3?3:2} opacity="0.8"/>;
        })}
        {/* Door step */}
        <rect x="448" y="714" width="304" height="16" rx="2" fill="#3a2818" />
        <rect x="428" y="730" width="344" height="12" rx="2" fill="#2e2010" />

        {/* Light spill on ground */}
        <ellipse cx="600" cy="742" rx="160" ry="28" fill="url(#beDoorGlow)" opacity="0.7" />

        {/* ── Lanterns ── */}
        {/* Left */}
        <line x1="452" y1="415" x2="452" y2="438" stroke="#7a5a2a" strokeWidth="3" />
        <rect x="435" y="436" width="34" height="52" rx="5" fill="#160e06" stroke="#7a5a2a" strokeWidth="2" />
        <ellipse className="ext-lantern-glow" cx="452" cy="462" rx="14" ry="16" fill="url(#beLantern)" filter="url(#beGlow)" opacity="0.9" />
        {/* Right */}
        <line x1="748" y1="415" x2="748" y2="438" stroke="#7a5a2a" strokeWidth="3" />
        <rect x="731" y="436" width="34" height="52" rx="5" fill="#160e06" stroke="#7a5a2a" strokeWidth="2" />
        <ellipse className="ext-lantern-glow" cx="748" cy="462" rx="14" ry="16" fill="url(#beLantern)" filter="url(#beGlow)" opacity="0.9" />

        {/* ── Hanging sign ── */}
        <g className="ext-sign">
          {/* Bracket arm */}
          <path d="M 560,316 Q 560,298 578,298 L 622,298 Q 640,298 640,316" fill="none" stroke="#6a4a20" strokeWidth="3" />
          {/* Hanging chains */}
          <line x1="540" y1="316" x2="540" y2="342" stroke="#7a5a2a" strokeWidth="2.5" strokeDasharray="3,4" />
          <line x1="660" y1="316" x2="660" y2="342" stroke="#7a5a2a" strokeWidth="2.5" strokeDasharray="3,4" />
          {/* Sign board */}
          <rect x="515" y="340" width="170" height="60" rx="5" fill="#1e1208" stroke="#7a5a2a" strokeWidth="2" />
          <text x="600" y="362" textAnchor="middle" fontFamily="Georgia,'Times New Roman',serif" fontSize="10" letterSpacing="5" fill="#c0741a">
            BOULANGERIE
          </text>
          <text x="600" y="386" textAnchor="middle" fontFamily="Georgia,'Times New Roman',serif" fontSize="18" letterSpacing="1" fontWeight="bold" fill="#f0d090">
            Masa Madre
          </text>
        </g>

        {/* ── Ground + cobblestones ── */}
        <rect x="0" y="742" width="1200" height="58" fill="url(#beGround)" />
        <rect x="0" y="742" width="1200" height="58" fill="url(#cobble)" opacity="0.6" />

        {/* Ground ambient glow (from windows) */}
        <ellipse cx="293" cy="742" rx="200" ry="22" fill="#c0741a" opacity="0.12" />
        <ellipse cx="907" cy="742" rx="200" ry="22" fill="#c0741a" opacity="0.12" />
      </svg>

      {/* ── Overlay: title + CTA ── */}
      <div className="relative z-10 mt-auto flex w-full flex-col items-center pb-20 text-center">
        <p className="eyebrow mb-5 text-levain/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
          {hero.eyebrow}
        </p>
        <h1 className="ext-title display text-paper [text-shadow:0_2px_24px_rgba(0,0,0,0.9)] text-[clamp(3rem,11vw,9rem)] leading-[0.88]">
          <span className="block">{hero.titleA}</span>
          <span className="block italic text-levain">{hero.titleB}</span>
        </h1>
        <p className="ext-sub mt-6 max-w-xs font-mono text-[0.65rem] uppercase tracking-[0.24em] text-paper/55 [text-shadow:0_1px_6px_rgba(0,0,0,0.8)] sm:max-w-sm">
          {hero.thesis}
        </p>
        <button
          onClick={enter}
          className="ext-cta group mt-10 flex flex-col items-center gap-3 text-paper/70 transition-colors duration-300 hover:text-levain"
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.35em] [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
            {hero.scrollCue}
          </span>
          <span className="relative h-12 w-px overflow-hidden bg-paper/25">
            <span className="absolute left-0 top-0 h-4 w-full animate-[rise_1.8s_ease-in-out_infinite] bg-levain" />
          </span>
        </button>
      </div>
    </section>
  );
}
