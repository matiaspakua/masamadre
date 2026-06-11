// Prepends the GitHub Pages basePath to a public asset path so <img> tags
// resolve both locally (NEXT_PUBLIC_BASE_PATH = '') and in production
// (NEXT_PUBLIC_BASE_PATH = '/masamadre'). next/font and next/link handle the
// basePath automatically; raw <img src> does not.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const img = (name: string) => `${BASE}/images/${name}.jpg`;
