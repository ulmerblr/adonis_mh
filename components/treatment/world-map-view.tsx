'use client';

import { useEffect, useRef, useState } from 'react';

export type Tone = 'rx' | 'discretion' | 'not' | 'pending';
export type Shape = { id: string; name: string; d: string };
export type MapRegion = {
  country: string; regulator: string; status: string; checked?: string; sources?: string[];
  /** ISO 3166-1 numeric codes of the countries this record covers. */
  iso: string[];
  tone: Tone;
};

export const TONES: { tone: Tone | 'none'; label: string }[] = [
  { tone: 'rx', label: 'Prescription-only, not approved' },
  { tone: 'discretion', label: 'Not approved; compounding under enforcement discretion' },
  { tone: 'not', label: 'Not approved' },
  { tone: 'pending', label: 'Status being confirmed' },
  { tone: 'none', label: 'Not yet checked' },
];

type Pop = { region?: MapRegion; name?: string; x: number; y: number; pinned: boolean };

export function WorldMapView({ shapes, regions, width, height }: { shapes: Shape[]; regions: MapRegion[]; width: number; height: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [pop, setPop] = useState<Pop | null>(null);
  const byIso = new Map<string, MapRegion>();
  regions.forEach((r) => r.iso.forEach((c) => byIso.set(c, r)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPop(null); };
    const onDown = (e: PointerEvent) => { if (box.current && !box.current.contains(e.target as Node)) setPop(null); };
    window.addEventListener('keydown', onKey); window.addEventListener('pointerdown', onDown);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown); };
  }, []);

  const at = (clientX: number, clientY: number) => {
    const r = box.current!.getBoundingClientRect();
    return { x: clientX - r.left, y: clientY - r.top };
  };
  const show = (e: React.PointerEvent | React.MouseEvent, s: Shape, pinned: boolean) => {
    if (pop?.pinned && !pinned) return;
    const region = byIso.get(s.id);
    setPop({ ...at(e.clientX, e.clientY), region, name: region ? undefined : s.name, pinned });
  };
  const focusRegion = (e: React.FocusEvent<SVGGElement>, region: MapRegion) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPop({ ...at(r.left + r.width / 2, r.top + r.height / 2), region, pinned: false });
  };

  // Keep the popup inside the map box.
  const w = box.current?.clientWidth ?? 600;
  const popW = Math.min(300, w - 16);
  const left = pop ? Math.max(8, Math.min(pop.x - popW / 2, w - popW - 8)) : 0;
  const below = pop ? pop.y < (box.current?.clientHeight ?? 400) / 2 : true;

  const colored = regions.map((r) => ({ region: r, paths: shapes.filter((s) => r.iso.includes(s.id)) }));
  const plain = shapes.filter((s) => !byIso.has(s.id));

  return (
    <figure className="worldMap">
      <div className="mapBox" ref={box} onMouseLeave={() => { if (!pop?.pinned) setPop(null); }}>
        <svg viewBox={`0 0 ${width} ${height}`} onPointerMove={(e) => { if (e.target === e.currentTarget && !pop?.pinned) setPop(null); }} role="img" aria-label="World map of each regulator's status. The same records are listed as cards below.">
          <defs>
            <pattern id="mapStripes" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="6" height="6" className="stripeBg" /><rect width="2.5" height="6" className="stripeFg" />
            </pattern>
          </defs>
          <g>
            {plain.map((s) => (
              <path key={s.id} d={s.d} className="land tone-none" onPointerMove={(e) => show(e, s, false)} onClick={(e) => show(e, s, true)} />
            ))}
          </g>
          {colored.map(({ region, paths }) => (
            <g key={region.country} className={`region tone-${region.tone}`} tabIndex={0} role="button"
              aria-label={`${region.country}, ${region.regulator}: ${region.status}`}
              onFocus={(e) => focusRegion(e, region)} onBlur={() => { if (!pop?.pinned) setPop(null); }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const r = e.currentTarget.getBoundingClientRect(); setPop({ ...at(r.left + r.width / 2, r.top + r.height / 2), region, pinned: true }); } }}>
              {paths.map((s) => (
                <path key={s.id} d={s.d} className="land" onPointerMove={(e) => show(e, s, false)} onClick={(e) => show(e, s, true)} />
              ))}
            </g>
          ))}
        </svg>

        {pop ? (
          <div className={`mapPop${below ? ' popBelow' : ' popAbove'}`} style={{ left, width: popW, top: below ? pop.y + 14 : undefined, bottom: below ? undefined : (box.current?.clientHeight ?? 0) - pop.y + 14 }} role="dialog" aria-label={pop.region ? pop.region.country : pop.name}>
            {pop.pinned ? <button type="button" className="popClose" aria-label="Close" onClick={() => setPop(null)}>×</button> : null}
            {pop.region ? (
              <>
                <p className="popName">{pop.region.country}</p>
                <p className="popReg">{pop.region.regulator}</p>
                <p className="popStatus"><span className={`swatch tone-${pop.region.tone}`} aria-hidden="true" />{pop.region.status}</p>
                <dl className="popFacts">
                  <div><dt>Checked</dt><dd>{pop.region.checked ?? '—'}</dd></div>
                  <div><dt>Source</dt><dd>{pop.region.sources?.length
                    ? pop.region.sources.map((s, i) => <span key={s}>{i > 0 ? ' and ' : null}<a href={s} target="_blank" rel="noopener noreferrer">{s}</a></span>)
                    : '—'}</dd></div>
                </dl>
                {!pop.pinned && pop.region.sources?.length ? <p className="popHint">Click the country to keep this open.</p> : null}
              </>
            ) : (
              <>
                <p className="popName">{pop.name}</p>
                <p className="popStatus"><span className="swatch tone-none" aria-hidden="true" />Not yet checked</p>
              </>
            )}
          </div>
        ) : null}
      </div>
      <figcaption>
        <ul className="mapKey">
          {TONES.map((t) => <li key={t.tone}><span className={`swatch tone-${t.tone}`} aria-hidden="true" />{t.label}</li>)}
        </ul>
      </figcaption>
    </figure>
  );
}
