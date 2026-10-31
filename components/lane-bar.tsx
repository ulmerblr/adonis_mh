'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { LANES, TREATMENTS } from '@/lib/library';

/** The nine lanes, nothing else (Updates and How we report live in the Magazine Section). */
const ITEMS = LANES.map((l) => ({ key: l.key as string, label: l.name, href: `/lanes/${l.key}` }));

/** The current lane: its own page, or a treatment page's lane. */
function currentOf(path: string): string | null {
  if (path.startsWith('/lanes/')) return path.split('/')[2] ?? null;
  for (const l of LANES) if (TREATMENTS[l.key].some((t) => t.page?.href === path)) return l.key;
  return null;
}

export function LaneBar() {
  const cur = currentOf(usePathname() ?? '');
  const list = useRef<HTMLUListElement>(null);
  // On a phone the bar scrolls sideways: bring the current lane into view inside the bar (the page itself does not move).
  useEffect(() => {
    const ul = list.current; const a = ul?.querySelector<HTMLElement>('[aria-current]');
    if (ul && a) ul.scrollLeft = a.offsetLeft - (ul.clientWidth - a.offsetWidth) / 2;
  }, [cur]);
  return (
    <nav className="laneBar" aria-label="Lanes">
      <div className="wrap">
        <ul ref={list}>
          {ITEMS.map((i) => (
            <li key={i.key}><Link href={i.href} aria-current={cur === i.key ? 'page' : undefined}>{i.label}</Link></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
