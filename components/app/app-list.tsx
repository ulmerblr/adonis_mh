'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LANES, countWords, type LaneKey } from '@/lib/library';
import { ROWS, norm, ranked, type Row } from '@/lib/finder-rows';
import { Label, Pill } from '../ext';
import { LIST_KEY } from './back-link';

type Item = Row & { slug: string; lanes: string[] };

/** One row per treatment page. Under "All" a treatment in two lanes shows once, with both lanes; in a lane, that lane. */
function items(lane: LaneKey | 'all'): Item[] {
  const withPage = ROWS.filter((r) => r.page);
  if (lane !== 'all') return withPage.filter((r) => r.lane === lane).map((r) => ({ ...r, slug: r.page!.href.slice(1), lanes: [r.laneName] }));
  const bySlug = new Map<string, Item>();
  for (const r of withPage) {
    const slug = r.page!.href.slice(1);
    const seen = bySlug.get(slug);
    if (seen) seen.lanes.push(r.laneName); else bySlug.set(slug, { ...r, slug, lanes: [r.laneName] });
  }
  return [...bySlug.values()];
}

/**
 * The app view's treatment list. Search, lane and the peptide switch live in the URL (?q=…&lane=…&peptides=1), so Back
 * returns to the same filtered list. The search is the finder's (name, brand and code names).
 */
export function AppList() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const laneParam = params.get('lane');
  const lane: LaneKey | 'all' = LANES.some((l) => l.key === laneParam) ? (laneParam as LaneKey) : 'all';
  const peptidesOnly = params.get('peptides') === '1';
  const [text, setText] = useState(params.get('q') ?? '');
  const chips = useRef<HTMLDivElement>(null);

  // Keep the box in step with the address when Back or Forward changes it.
  useEffect(() => { setText(params.get('q') ?? ''); }, [params]);

  // Remember the list as it is, for the detail page's back arrow.
  const qs = params.toString();
  useEffect(() => { try { sessionStorage.setItem(LIST_KEY, qs ? `/app?${qs}` : '/app'); } catch { /* storage blocked */ } }, [qs]);

  // Bring the selected chip into view inside the chip row (the page itself does not move).
  useEffect(() => {
    const row = chips.current; const on = row?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (row && on) row.scrollLeft = on.offsetLeft - (row.clientWidth - on.offsetWidth) / 2;
  }, [lane]);

  const go = (next: { q?: string; lane?: LaneKey | 'all'; peptides?: boolean }) => {
    const p = new URLSearchParams();
    const q = next.q ?? text; const l = next.lane ?? lane; const pep = next.peptides ?? peptidesOnly;
    if (q) p.set('q', q);
    if (l !== 'all') p.set('lane', l);
    if (pep) p.set('peptides', '1');
    const s = p.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  };

  const q = norm(text);
  const shown = ranked(items(lane).filter((r) => !peptidesOnly || !!r.peptide), q);
  const chipList: { key: LaneKey | 'all'; name: string }[] = [{ key: 'all', name: 'All' }, ...LANES.map((l) => ({ key: l.key, name: l.name }))];

  return (
    <>
      <div className="appControls">
        <label htmlFor="app-q" className="srOnly">Search treatments</label>
        <input id="app-q" type="search" className="appSearch" value={text} placeholder="Search: name, brand or code"
          autoComplete="off" enterKeyHint="search" aria-controls="app-results"
          onChange={(e) => { setText(e.target.value); go({ q: e.target.value }); }} />
        <div className="appChips" ref={chips} role="group" aria-label="Lanes">
          {chipList.map((c) => (
            <button key={c.key} type="button" className="appChip" aria-pressed={lane === c.key} onClick={() => go({ lane: c.key })}>{c.name}</button>
          ))}
        </div>
        <label className="peptideSwitch appSwitch">
          <input type="checkbox" role="switch" checked={peptidesOnly} onChange={(e) => go({ peptides: e.target.checked })} aria-controls="app-results" />
          <span className="switchTrack" aria-hidden="true"><span className="switchThumb" /></span>
          <span className="switchText">Peptides only</span>
        </label>
      </div>

      <p className="srOnly" aria-live="polite">{countWords(shown.length)}</p>
      <div id="app-results" className="appResults">
        {shown.length === 0 ? (
          <p className="finderEmpty">{text ? <>No treatment matches ‘{text}’.</> : 'No peptide treatments in this lane.'}</p>
        ) : (
          <ul className="appRows">
            {shown.map((t) => (
              <li key={`${lane}-${t.slug}`}>
                <Link href={`/app/${t.slug}`} className="appRow">
                  <span className="appRowMain">
                    <span className="appRowName">{t.name}{t.peptide ? <Label className="labelTag">Peptide</Label> : null}</span>
                    <span className="appRowLane">{t.lanes.join(' · ')}</span>
                    <span className="appRowPill"><Pill kind={/^approved/i.test(t.page!.fda) ? 'ok' : 'rust'}>{t.page!.fda}</Pill></span>
                    <span className="appRowEvidence">{t.page!.evidence}</span>
                  </span>
                  <svg className="appChevron" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="appNote">Research and regulator records only. This site does not offer, sell or prescribe any treatment.</p>
    </>
  );
}
