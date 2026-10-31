'use client';

import { useEffect, useState } from 'react';

const ITEMS = [
  { id: 's1', label: 'What it is' },
  { id: 's2', label: 'Research' },
  { id: 's3', label: 'US status' },
  { id: 's4', label: 'Worldwide' },
  { id: 's5', label: 'Side effects' },
  { id: 's6', label: 'Clinician' },
];

/** The section jump grid: the section being read shows in ink. */
export function Jump() {
  const [cur, setCur] = useState('s1');
  useEffect(() => {
    const els = ITEMS.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const pick = () => {
      let at = 's1';
      for (const e of els) if (e.getBoundingClientRect().top < window.innerHeight * 0.35) at = e.id;
      setCur(at);
    };
    pick();
    window.addEventListener('scroll', pick, { passive: true });
    return () => window.removeEventListener('scroll', pick);
  }, []);
  return (
    <nav aria-label="Sections">
      <ul className="jump">
        {ITEMS.map((i) => (
          <li key={i.id}><a href={`#${i.id}`} aria-current={cur === i.id ? 'true' : undefined}>{i.label}</a></li>
        ))}
      </ul>
    </nav>
  );
}
