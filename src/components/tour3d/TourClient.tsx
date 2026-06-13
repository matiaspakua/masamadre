'use client';

import dynamic from 'next/dynamic';

// The WebGL bakery is loaded client-only (Three.js needs the DOM) and code-split
// so it never blocks first paint of the readable content.
const BakeryTour3D = dynamic(() => import('./BakeryTour3D'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0" style={{ background: '#120a05' }} aria-hidden="true" />,
});

export default function TourClient() {
  return <BakeryTour3D />;
}
