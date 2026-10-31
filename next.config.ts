import type { NextConfig } from 'next';

// Not live yet: every response also carries a noindex header, alongside the meta robots tag and robots.txt.
const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
};

export default nextConfig;
