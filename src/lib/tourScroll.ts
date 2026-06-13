// Lightweight bridge between the document scroll, the 3D camera (which reads it
// every frame inside useFrame — no React re-render) and the HTML overlays
// (which subscribe for the active-room highlight). One scroll listener total.

import { ROOMS } from '@/components/tour3d/rooms';

type State = {
  p: number; // 0..1 progress across the whole document
  room: number; // continuous room position (0 .. ROOMS.length-1)
  active: number; // nearest room index (for UI)
};

export const tourState: State = { p: 0, room: 0, active: 0 };

const subs = new Set<(active: number) => void>();

export function subscribeActive(fn: (active: number) => void) {
  subs.add(fn);
  return () => subs.delete(fn);
}

let raf = 0;
export function startTourScroll() {
  if (typeof window === 'undefined') return () => {};
  const N = ROOMS.length;

  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
    tourState.p = p;
    tourState.room = p * (N - 1);
    const active = Math.round(tourState.room);
    if (active !== tourState.active) {
      tourState.active = active;
      subs.forEach((fn) => fn(active));
    }
  };

  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(update);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}
