import { execFileSync } from 'node:child_process';
import type { NextConfig } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

// Not live yet: every response also sends a noindex header, alongside the meta robots tag and robots.txt.
const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
};

// EDU PROMPT 39: a production build fails when a treatment card's data changed but its PNG/PDF were not re-rendered
// (scripts/check-cards.mjs). CARDS_SKIP_CHECK=1 is only for the build scripts/render-cards.mjs renders from.
export default function config(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD && process.env.CARDS_SKIP_CHECK !== '1') {
    execFileSync(process.execPath, ['scripts/check-cards.mjs'], { stdio: 'inherit' });
  }
  return nextConfig;
}
