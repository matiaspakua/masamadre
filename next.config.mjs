/** @type {import('next').NextConfig} */

// On GitHub Pages the site is served from https://<user>.github.io/<repo>/.
// We expose the repo name as a basePath/assetPrefix in production so every
// asset and route resolves correctly. Locally (dev) we keep the root.
const isProd = process.env.NODE_ENV === 'production';
const repo = 'masamadre';

const nextConfig = {
  output: 'export',
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '',
  },
};

export default nextConfig;
