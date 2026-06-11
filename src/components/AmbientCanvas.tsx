'use client';

import { useEffect, useRef } from 'react';

// A living biological field rendered behind the whole page. Three layers, all
// thematic: drifting connected nodes (a gluten / molecular mesh), floating
// flour dust, and CO2 bubbles rising like a ferment. The mesh colour lerps
// across the scroll (amber → ferment teal → oven ember) so the atmosphere
// shifts with the narrative. One rAF loop, particle counts capped, paused when
// the tab is hidden, and disabled entirely for reduced-motion users.
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
    const NODES = small ? 26 : 54;
    const DUST = small ? 26 : 64;
    const LINK = (small ? 120 : 160) * dpr;

    type P = { x: number; y: number; vx: number; vy: number; r: number; ph: number };
    const nodes: P[] = [];
    const dust: P[] = [];
    type B = { x: number; y: number; r: number; v: number; a: number };
    const bubbles: B[] = [];
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

    function seed() {
      nodes.length = 0;
      dust.length = 0;
      for (let i = 0; i < NODES; i++)
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: rand(-0.12, 0.12) * dpr,
          vy: rand(-0.12, 0.12) * dpr,
          r: rand(0.9, 2.4) * dpr,
          ph: Math.random() * Math.PI * 2,
        });
      for (let i = 0; i < DUST; i++)
        dust.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: rand(-0.05, 0.05) * dpr,
          vy: rand(-0.16, -0.04) * dpr,
          r: rand(0.5, 1.6) * dpr,
          ph: 0,
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

    let t = 0;
    function frame() {
      t += 0.016;
      const [r, g, b] = accentAt(scrollP);
      ctx!.clearRect(0, 0, w, h);

      // flour dust
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
        ctx!.fillStyle = `rgba(150,130,100,0.30)`;
        ctx!.fill();
      }

      // mesh nodes
      for (const n of nodes) {
        // pointer repel
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const R = 130 * dpr;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / R) * 0.6;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.98;
        n.vy *= 0.98;
        // gentle baseline drift so they never fully stop
        n.vx += rand(-0.01, 0.01) * dpr;
        n.vy += rand(-0.01, 0.01) * dpr;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      }

      // links (the gluten / molecular network)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const c = nodes[j];
          const dx = a.x - c.x;
          const dy = a.y - c.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            const alpha = (1 - dist / LINK) * 0.22;
            ctx!.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(c.x, c.y);
            ctx!.stroke();
          }
        }
      }
      // node dots (gently pulsing)
      for (const n of nodes) {
        const pr = n.r * (0.85 + 0.15 * Math.sin(t + n.ph));
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, pr, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${b},0.5)`;
        ctx!.fill();
      }

      // fermentation bubbles
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
        ctx!.strokeStyle = `rgba(${r},${g},${b},${bu.a * 0.6})`;
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
