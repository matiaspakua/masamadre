import type { Metadata, Viewport } from 'next';
import { Fraunces, Spline_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

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
  title: 'Masa Madre — A Museum & Laboratory of Sourdough',
  description:
    'An immersive journey through 6,000 years of sourdough bread and a living laboratory of its fermentation science — history, microbiology, and craft.',
  openGraph: {
    title: 'Masa Madre',
    description:
      'Six thousand years of sourdough, and its biology under glass. A digital museum and living laboratory.',
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
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
