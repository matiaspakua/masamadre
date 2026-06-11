'use client';

import { useRef } from 'react';

// Pointer-reactive 3D tilt for image-led cards. Mouse only (touch/pen ignored
// so it never fights scrolling), and a no-op under reduced-motion. Children can
// use translateZ to float above the card surface for parallax depth.
export default function Tilt({
  children,
  className = '',
  max = 9,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(1.02)`;
  }
  function leave() {
    if (ref.current)
      ref.current.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  }

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`transition-transform duration-500 ease-out [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  );
}
