import type { Metadata, Viewport } from 'next';
import { Fraunces, Spline_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { LangProvider } from '@/lib/i18n';
import AmbientCanvas from '@/components/AmbientCanvas';
import Ferment from '@/components/Ferment';
import Intro from '@/components/Intro';

// Display: a characterful old-style serif with optical sizing & soft "wonk".
const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

// Body: a clean humanist grotesque for long-form reading.
const body = Spline_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

// Utility: monospace for lab readouts, dates, and data captions.
const mono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Masa Madre — Museo y Laboratorio del Pan de Masa Madre',
  description:
    'Un viaje inmersivo por 6.000 años de pan de masa madre y un laboratorio vivo de su ciencia de fermentación: historia, microbiología y oficio. (English available.)',
  openGraph: {
    title: 'Masa Madre',
    description:
      'Seis mil años de masa madre, y su biología bajo el microscopio. Un museo digital y laboratorio vivo.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#16110D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <AmbientCanvas />
        <LangProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <Ferment />
          <Intro />
        </LangProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
