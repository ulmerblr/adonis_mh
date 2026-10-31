/** Line icons for the "At a glance" box: 40px, navy, stroke 2.4, no fill, rounded ends. */
const P = { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

export const ShieldX = () => (
  <svg {...P}><path d="M20 4 L33 9 V19 C33 27 27.5 32.5 20 36 C12.5 32.5 7 27 7 19 V9 Z" /><path d="M15 15 L25 25 M25 15 L15 25" /></svg>
);
export const Mortar = () => (
  <svg {...P}><path d="M6 19 H34 C34 27 28 32 20 32 C12 32 6 27 6 19 Z" /><path d="M15 32 L14 36 H26 L25 32" /><path d="M21 19 L30 6" /><circle cx="31" cy="5" r="2" /></svg>
);
export const People = () => (
  <svg {...P}><circle cx="14" cy="13" r="4.5" /><path d="M5 32 C5 25 9 21.5 14 21.5 C19 21.5 23 25 23 32" /><circle cx="27.5" cy="14.5" r="3.6" /><path d="M24.5 22.4 C25.5 21.9 26.5 21.7 27.5 21.7 C31.5 21.7 35 24.6 35 30" /></svg>
);
export const Calendar = () => (
  <svg {...P}><rect x="6" y="9" width="28" height="25" rx="3" /><path d="M6 16 H34 M14 5 V12 M26 5 V12 M12 22 H15 M18.5 22 H21.5 M25 22 H28 M12 28 H15 M18.5 28 H21.5" /></svg>
);
export const Banned = () => (
  <svg {...P}><circle cx="20" cy="20" r="14" /><path d="M10.1 29.9 L29.9 10.1" /></svg>
);
