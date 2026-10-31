'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LANES } from '@/lib/library';

const ITEMS = [
  ...LANES.map((l) => ({ key: l.key as string, label: l.name, href: `/lanes/${l.key}` })),
  { key: 'updates', label: 'Updates', href: '/#updates' },
  { key: 'how', label: 'How we report', href: '/how-we-report' },
];

/** The current lane: its own page, a treatment page's lane, or How we report. */
function currentOf(path: string): string | null {
  if (path.startsWith('/lanes/')) return path.split('/')[2] ?? null;
  if (path === '/bpc-157') return 'recovery';
  if (path === '/how-we-report') return 'how';
  return null;
}

export function LaneBar() {
  const cur = currentOf(usePathname() ?? '');
  return (
    <nav className="laneBar" aria-label="Lanes">
      <div className="wrap">
        <ul>
          {ITEMS.map((i) => (
            <li key={i.key}><Link href={i.href} aria-current={cur === i.key ? 'page' : undefined}>{i.label}</Link></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
