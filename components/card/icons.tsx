/**
 * Line icons for the treatment card (EDU PROMPT 39). 24x24, stroke only; the mockup's own icons first, then the body-area
 * and flow icons the cards' data may name. scripts/validate-cards.mjs reads the keys of ICONS from this file.
 */
export const ICONS: Record<string, string> = {
  // the mockup's icons
  flask: 'M9 3h6M10 3v6L5 19a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3|M7 15h10',
  target: 'C12 12 8|C12 12 3',
  bars: 'M5 19v-5M10 19v-9M15 19v-6M20 19V6',
  shield: 'M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z',
  clockface: 'C12 12 9|M12 7v5l3 2',
  arrow: 'M4 12h16M14 6l6 6-6 6',
  knee: 'M9 2v8l-1.5 12M15 2v8l1.5 12|E12 11 4.5 3',
  bladder: 'M7 10c0-5 10-5 10 0v4c0 6-10 6-10 0z|M12 19v3',
  bandage: 'R4 9 16 6 3 -30|M11 10.5l1 2M13 9.5l1 2',
  molecule: 'C6 12 2.5|C12 7 2.5|C18 12 2.5|M8 11l2-2M14 9l2 2',
  vessel: 'M3 18c5-1 5-8 9-8s4 7 9 8|M12 10V3M9 6l3-3 3 3',
  trend: 'M4 17l5-5 4 4 7-8|M15 8h5v5',
  fiber: 'M4 14c3-1 5-4 6-8M10 6c2 3 6 4 10 3M4 14c4 2 10 2 16-5',
  question: 'C12 12 9|M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01',
  calendar: 'S4 5 16 15 2|M4 10h16',
  clock: 'C12 13 8|M12 9v4l3 2',
  list: 'M4 7h16M4 12h10M4 17h7',
  interact: 'M7 4v16M17 4v16M7 12h10',
  alert: 'C12 12 9|M12 8v5M12 16h.01',
  timer: 'C12 13 8|M12 9v4l3 2M9 2h6',
  route: 'M4 12h12M12 6l6 6-6 6M20 4v16',
  bag: 'M5 8h14l-1 12H6z|M9 8a3 3 0 0 1 6 0',
  pulse: 'M4 7h4l3 10 3-14 3 7h3',
  medal: 'C12 9 5|M9 13l-2 8 5-3 5 3-2-8',
  info: 'C12 12 9|M12 11v5M12 8h.01',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  // body areas and flow steps
  gut: 'M8 3v4c0 2 8 1 8 5s-8 2-8 6 6 3 8 3',
  bone: 'M7 7l10 10|C5.5 6.5 1.8|C6.5 5.5 1.8|C17.5 18.5 1.8|C18.5 17.5 1.8',
  muscle: 'M6 9v6M18 9v6M3 11v2M21 11v2M6 12h12',
  skin: 'M3 8c3-2 6 2 9 0s6-2 9 0|M3 13h18M3 18h18',
  hair: 'M3 19h18|M7 19c0-6 1-11 3-14M12 19c0-6 0-10 1-14M17 19c0-5-1-9-3-13',
  brain: 'M12 5a3 3 0 0 0-5.5 1.5A3 3 0 0 0 5 12a3 3 0 0 0 2 5 3 3 0 0 0 5 1z|M12 5a3 3 0 0 1 5.5 1.5A3 3 0 0 1 19 12a3 3 0 0 1-2 5 3 3 0 0 1-5 1z',
  mood: 'C12 12 9|M8.5 14.5c1.8 2 5.2 2 7 0M9 9.5h.01M15 9.5h.01',
  nerve: 'M13 2L5 14h6l-1 8 8-12h-6z',
  moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z',
  gauge: 'M4 16a8 8 0 1 1 16 0|M12 16l4-5',
  drop: 'M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z',
  liver: 'M3 9c3-3 13-4 18-2-1 6-6 11-11 11-4 0-7-5-7-9z',
  kidney: 'M14 4c-5 0-8 4-8 8s3 8 8 8c3 0 4-3 2-5s-2-4 0-6 1-5-2-5z',
  male: 'C10 14 5|M14 10l6-6M15 4h5v5',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6',
  sperm: 'C8 8 3|M10 10.5c2 2 1 4 3 6s4 1 5 3',
  hormone: 'C12 6 2|C6 17 2|C18 17 2|M11 8l-4 7M13 8l4 7M8 17h8',
  fat: 'C8 9 3|C15 8 2.5|C10 16 3.5|C17 15 2.5',
  fork: 'M7 3v7a2 2 0 0 0 4 0V3M9 10v11|M16 3c-2 2-2 7 0 8v10',
  lungs: 'M12 4v8|M12 10c-2 0-3 1-4 0-2 1-4 5-4 9 2 1 6 0 7-2v-5M12 10c2 0 3 1 4 0 2 1 4 5 4 9-2 1-6 0-7-2v-5',
  flame: 'M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4 3-6 0 2 1 3 2 3 0-3 0-5 1-8z',
  cell: 'C12 12 8|C12 12 3|M7 8h.01M16 16h.01M17 9h.01',
  eye: 'M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z|C12 12 3',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  sun: 'C12 12 4|M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5',
  pill: 'R3 9 18 6 3 -40|M9 9l4 5',
  receptor: 'M4 18h16|M8 18v-6a4 4 0 0 1 8 0v6|C12 6 2',
  enzyme: 'M5 12a7 7 0 0 1 14 0l-7 7z|C12 10 2',
  block: 'C12 12 9|M6 6l12 12',
};

/** One icon. Path syntax: "|"-separated parts; "C cx cy r" a circle, "E cx cy rx ry" an ellipse, "S x y w h r" a rounded
 * rect, "R x y w h r deg" a rounded rect rotated about the centre (12,12); anything else is an SVG path. */
export function Icon({ name, className = 'ci' }: { name: string; className?: string }) {
  const def = ICONS[name] ?? ICONS.info;
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {def.split('|').map((p, i) => {
        const n = p.slice(1).trim().split(/\s+/).map(Number);
        if (p[0] === 'C') return <circle key={i} cx={n[0]} cy={n[1]} r={n[2]} />;
        if (p[0] === 'E') return <ellipse key={i} cx={n[0]} cy={n[1]} rx={n[2]} ry={n[3]} />;
        if (p[0] === 'S') return <rect key={i} x={n[0]} y={n[1]} width={n[2]} height={n[3]} rx={n[4]} />;
        if (p[0] === 'R') return <rect key={i} x={n[0]} y={n[1]} width={n[2]} height={n[3]} rx={n[4]} transform={`rotate(${n[5]} 12 12)`} />;
        return <path key={i} d={p} />;
      })}
    </svg>
  );
}
