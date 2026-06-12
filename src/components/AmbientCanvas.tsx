'use client';

import { useEffect, useRef } from 'react';

// A living bakery field rendered behind the whole page. The motifs are all of
// the craft: ears of wheat and loose grains drifting and turning, a haze of
// flour dust, and CO2 bubbles rising like a ferment. Their tint lerps across
// the scroll (amber → ferment teal → oven ember) so the atmosphere shifts with
// the narrative. One rAF loop, counts capped, paused when the tab is hidden,
// and disabled entirely for reduced-motion users.
export default function AmbientCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    let raf = 0;
    let scrollP = 0;

    const small = window.innerWidth < 760;
    const EARS = small ? 4 : 8;
    const GRAINS = small ? 12 : 26;
    const DUST = small ? 24 : 56;
    const mouse = { x: -9999, y: -9999 };

    // amber → ferment teal → oven ember
    const stops = [
      [192, 116, 26],
      [14, 122, 107],
      [168, 67, 30],
    ];
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const accentAt = (p: number) => {
      const seg = p * (stops.length - 1);
      const i = Math.min(stops.length - 2, Math.floor(seg));
      const t = seg - i;
      return stops[0].map((_, k) => Math.round(lerp(stops[i][k], stops[i + 1][k], t)));
    };
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    type Motif = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      rot: number;
      vr: number;
      s: number;
    };
    type Dust = { x: number; y: number; vx: number; vy: number; r: number };
    type Bubble = { x: number; y: number; r: number; v: number; a: number };
    const ears: Motif[] = [];
    const grains: Motif[] = [];
    const dust: Dust[] = [];
    const bubbles: Bubble[] = [];

    function seed() {
      ears.length = 0;
      grains.length = 0;
      dust.length = 0;
      for (let i = 0; i < EARS; i++)
        ears.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: rand(-0.06, 0.06) * dpr,
          vy: rand(-0.05, 0.05) * dpr,
          rot: rand(0, Math.PI * 2),
          vr: rand(-0.0016, 0.0016),
          s: rand(0.85, 1.7) * dpr,
        });
      for (let i = 0; i < GRAINS; i++)
        grains.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: rand(-0.1, 0.1) * dpr,
          vy: rand(-0.08, 0.08) * dpr,
          rot: rand(0, Math.PI * 2),
          vr: rand(-0.01, 0.01),
          s: rand(0.7, 1.5) * dpr,
        });
      for (let i = 0; i < DUST; i++)
        dust.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: rand(-0.05, 0.05) * dpr,
          vy: rand(-0.16, -0.04) * dpr,
          r: rand(0.5, 1.6) * dpr,
        });
    }

    function resize() {
      w = canvas!.width = Math.floor(window.innerWidth * dpr);
      h = canvas!.height = Math.floor(window.innerHeight * dpr);
      canvas!.style.width = window.innerWidth + 'px';
      canvas!.style.height = window.innerHeight + 'px';
      seed();
    }

    function onScroll() {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      scrollP = max > 0 ? Math.min(1, el.scrollTop / max) : 0;
    }
    function onMove(e: PointerEvent) {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    // a single almond grain (filled)
    function grainShape(rx: number, ry: number) {
      ctx!.beginPath();
      ctx!.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx!.fill();
    }

    // an ear of wheat: a curved stalk with rows of grains and awns
    function drawEar(m: Motif, alpha: number, col: string) {
      const s = m.s;
      ctx!.save();
      ctx!.translate(m.x, m.y);
      ctx!.rotate(m.rot);
      ctx!.strokeStyle = `rgba(${col},${alpha})`;
      ctx!.fillStyle = `rgba(${col},${alpha})`;
      ctx!.lineWidth = 1 * s;
      const top = -24 * s;
      const bot = 20 * s;
      // stalk
      ctx!.beginPath();
      ctx!.moveTo(0, bot);
      ctx!.quadraticCurveTo(3 * s, 0, 0, top);
      ctx!.stroke();
      // grain head (upper section)
      const rows = 5;
      const headBot = 4 * s;
      for (let i = 0; i < rows; i++) {
        const tt = i / (rows - 1);
        const gy = headBot + (top + 3 * s - headBot) * tt;
        const grow = 1 - tt * 0.5;
        for (const side of [-1, 1]) {
          ctx!.save();
          ctx!.translate(side * 3 * s, gy);
          ctx!.rotate(side * 0.7);
          grainShape(1.5 * s * grow, 3.4 * s * grow);
          ctx!.restore();
          // awn
          ctx!.beginPath();
          ctx!.moveTo(side * 3.5 * s, gy - 2 * s);
          ctx!.lineTo(side * 8 * s * grow, gy - 9 * s * grow);
          ctx!.stroke();
        }
      }
      // tip grain
      ctx!.save();
      ctx!.translate(0, top + 1 * s);
      grainShape(1.6 * s, 4 * s);
      ctx!.restore();
      ctx!.restore();
    }

    function drift(m: Motif) {
      // gentle pointer push
      const dx = m.x - mouse.x;
      const dy = m.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      const R = 150 * dpr;
      if (d2 < R * R) {
        const d = Math.sqrt(d2) || 1;
        const f = (1 - d / R) * 0.4;
        m.vx += (dx / d) * f;
        m.vy += (dy / d) * f;
      }
      m.x += m.vx;
      m.y += m.vy;
      m.vx *= 0.99;
      m.vy *= 0.99;
      m.rot += m.vr;
      const pad = 40 * dpr;
      if (m.x < -pad) m.x = w + pad;
      if (m.x > w + pad) m.x = -pad;
      if (m.y < -pad) m.y = h + pad;
      if (m.y > h + pad) m.y = -pad;
    }

    function frame() {
      const [r, g, b] = accentAt(scrollP);
      const col = `${r},${g},${b}`;
      ctx!.clearRect(0, 0, w, h);

      // flour dust (back)
      for (const d of dust) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -4) {
          d.y = h + 4;
          d.x = Math.random() * w;
        }
        if (d.x < -4) d.x = w + 4;
        if (d.x > w + 4) d.x = -4;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(150,130,100,0.28)`;
        ctx!.fill();
      }

      // ears of wheat (faint, large)
      for (const m of ears) {
        drift(m);
        drawEar(m, 0.16, col);
      }

      // loose grains
      for (const m of grains) {
        drift(m);
        ctx!.save();
        ctx!.translate(m.x, m.y);
        ctx!.rotate(m.rot);
        ctx!.fillStyle = `rgba(${col},0.32)`;
        grainShape(1.7 * m.s, 3.6 * m.s);
        // crease
        ctx!.strokeStyle = `rgba(${col},0.4)`;
        ctx!.lineWidth = 0.6 * m.s;
        ctx!.beginPath();
        ctx!.moveTo(0, -3.4 * m.s);
        ctx!.lineTo(0, 3.4 * m.s);
        ctx!.stroke();
        ctx!.restore();
      }

      // fermentation bubbles (front)
      if (bubbles.length < (small ? 8 : 16) && Math.random() < 0.04)
        bubbles.push({
          x: Math.random() * w,
          y: h + 10,
          r: rand(2, 7) * dpr,
          v: rand(0.3, 0.9) * dpr,
          a: 0,
        });
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const bu = bubbles[i];
        bu.y -= bu.v;
        bu.a = Math.min(0.5, bu.a + 0.01);
        if (bu.y < -10) {
          bubbles.splice(i, 1);
          continue;
        }
        ctx!.beginPath();
        ctx!.arc(bu.x, bu.y, bu.r, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${col},${bu.a * 0.55})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.arc(bu.x - bu.r * 0.3, bu.y - bu.r * 0.3, bu.r * 0.3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${bu.a * 0.5})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    function start() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    }
    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(raf);
      else start();
    }

    resize();
    onScroll();
    start();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
