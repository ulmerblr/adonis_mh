'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export const LIST_KEY = 'adonis-app-list';

/** The detail page's back arrow: returns to the list as it was left (search, lane and peptide filter from the URL). */
export function BackLink() {
  const [href, setHref] = useState('/app');
  useEffect(() => {
    try { const q = sessionStorage.getItem(LIST_KEY); if (q && q.startsWith('/app')) setHref(q); } catch { /* storage blocked: plain /app */ }
  }, []);
  return (
    <Link href={href} className="appBack" aria-label="Back to the treatment list">
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </Link>
  );
}
