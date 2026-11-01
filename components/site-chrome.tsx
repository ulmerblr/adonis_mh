'use client';

import { usePathname } from 'next/navigation';

/** The magazine chrome (banner, masthead, lane bar, footer) is left out of the app view (/app and /app/<slug>). */
export function MagazineOnly({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? '';
  return path === '/app' || path.startsWith('/app/') ? null : <>{children}</>;
}
