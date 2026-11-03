'use client';

import Link from 'next/link';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { LANES, countWords, type LaneKey } from '@/lib/library';
import { ROWS, matches, norm, ranked, type Row } from '@/lib/finder-rows';
import { Label, Pill } from './ext';

/**
 * The treatment finder: a search box, lane tabs ("All" and the nine lanes, each with its count) and the treatment rows.
 * Search and tab work together (a search narrows within the selected tab). Switching tabs swaps the list in place; the page
 * holds still. `lane` starts on (or, with `hideTabs`, locks to) one lane.
 */
export function TreatmentFinder({ lane, hideTabs = false }: { lane?: LaneKey; hideTabs?: boolean }) {
  const [tab, setTab] = useState<LaneKey | 'all'>(lane ?? 'all');
  const [text, setText] = useState('');
  const [peptidesOnly, setPeptidesOnly] = useState(false);
  const id = useId();
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabBtns = useRef<(HTMLButtonElement | null)[]>([]);
  const anchor = useRef<number | null>(null);

  const q = norm(text);
  const inTab = (r: Row) => tab === 'all' || r.lane === tab;
  const pass = (r: Row) => matches(r, q) && (!peptidesOnly || !!r.peptide);
  // Best match first (exact names and aliases, then prefixes, then forgiving matches); with no search, the site's order.
  const shown = ranked(ROWS.filter((r) => inTab(r) && (!peptidesOnly || !!r.peptide)), q);
  const countFor = (k: LaneKey | 'all') => ROWS.filter((r) => (k === 'all' || r.lane === k) && pass(r)).length;

  // Hold the page still across a tab switch (a shorter list must not pull the page up).
  useLayoutEffect(() => {
    if (anchor.current == null || !tabsRef.current) return;
    const drift = tabsRef.current.getBoundingClientRect().top - anchor.current;
    if (Math.abs(drift) > 0.5) window.scrollBy(0, drift);
    anchor.current = null;
  }, [tab]);

  const tabs: { key: LaneKey | 'all'; name: string }[] = [{ key: 'all', name: 'All' }, ...LANES.map((l) => ({ key: l.key, name: l.name }))];
  const choose = (i: number, focus = false) => {
    anchor.current = tabsRef.current?.getBoundingClientRect().top ?? null;
    setTab(tabs[i].key);
    if (focus) tabBtns.current[i]?.focus({ preventScroll: true });
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = tabs.length;
    const to = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault(); choose(to, true);
  };

  const groups = tab === 'all' && !hideTabs
    ? LANES.map((l) => ({ lane: l, rows: shown.filter((r) => r.lane === l.key) })).filter((g) => g.rows.length)
        // While searching, the lane holding the best match comes first.
        .sort((a, b) => shown.indexOf(a.rows[0]) - shown.indexOf(b.rows[0]))
    : [{ lane: null, rows: shown }];
  const panelId = `${id}-results`;

  return (
    <div className="finder">
      <label htmlFor={`${id}-q`} className="finderLabel">Search treatments</label>
      <div className="finderBar">
        <input id={`${id}-q`} type="search" className="finderSearch" value={text} onChange={(e) => setText(e.target.value)}
          placeholder="Try testosterone, semaglutide, BPC-157…" autoComplete="off" aria-controls={panelId} />
        <label className="peptideSwitch">
          <input type="checkbox" role="switch" checked={peptidesOnly} onChange={(e) => setPeptidesOnly(e.target.checked)} aria-controls={panelId} />
          <span className="switchTrack" aria-hidden="true"><span className="switchThumb" /></span>
          <span className="switchText">Peptides only</span>
        </label>
      </div>

      {hideTabs ? null : (
        <div className="finderTabs" role="tablist" aria-label="Lanes" ref={tabsRef}>
          {tabs.map((t, i) => (
            <button key={t.key} type="button" role="tab" id={`${id}-tab-${t.key}`} aria-selected={tab === t.key} aria-controls={panelId}
              tabIndex={tab === t.key ? 0 : -1} ref={(el) => { tabBtns.current[i] = el; }} onClick={() => choose(i)} onKeyDown={(e) => onKey(e, i)}>
              <span className="ftName">{t.name}</span>
              <span className="ftCount">{countWords(countFor(t.key))}</span>
            </button>
          ))}
        </div>
      )}

      <p className="srOnly" aria-live="polite">{countWords(shown.length)}</p>
      <div id={panelId} role={hideTabs ? 'region' : 'tabpanel'} aria-labelledby={hideTabs ? undefined : `${id}-tab-${tab}`} aria-label={hideTabs ? 'Treatments' : undefined} className="finderResults">
        {shown.length === 0 ? (
          <p className="finderEmpty">{text ? <>No treatment matches ‘{text}’. Pages are added as each record is checked.</> : 'No peptide treatments in this lane.'}</p>
        ) : (
          <div className="tableBox" tabIndex={0} aria-label="Treatments">
            <table className="index">
              <thead>
                <tr><th scope="col">Treatment</th><th scope="col">Lane</th><th scope="col">Human evidence</th><th scope="col">FDA</th><th scope="col">Sport (WADA)</th></tr>
              </thead>
              {groups.map((g) => (
                <tbody key={g.lane?.key ?? 'rows'}>
                  {g.lane ? <tr className="laneRow"><th colSpan={5} scope="rowgroup"><Link href={`/lanes/${g.lane.key}`}>{g.lane.name}</Link></th></tr> : null}
                  {g.rows.map((t) => (
                    <tr key={`${t.lane}-${t.name}`}>
                      <th scope="row" className="txName">
                        {t.page ? <Link href={t.page.href}>{t.name}</Link> : t.name}
                        {t.peptide ? <Label className="labelTag">Peptide</Label> : null}
                      </th>
                      <td data-label="Lane">{t.laneName}</td>
                      {t.page ? (
                        <><td data-label="Human evidence">{t.page.evidence}</td><td data-label="FDA"><Pill kind={/^approved/i.test(t.page.fda) ? 'ok' : 'rust'}>{t.page.fda}</Pill></td><td data-label="Sport (WADA)"><Pill kind={/^not listed/i.test(t.page.sport) ? 'sand' : 'ink'}>{t.page.sport}</Pill></td></>
                      ) : (
                        <><td data-label="Human evidence"><Pill kind="sand">Page coming</Pill></td><td data-label="FDA"><Pill kind="sand">Page coming</Pill></td><td data-label="Sport (WADA)"><Pill kind="sand">Page coming</Pill></td></>
                      )}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
