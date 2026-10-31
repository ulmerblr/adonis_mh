'use client';

import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export type TabDef = { id: string; label: string };

/**
 * The treatment page's sections as tabs. One panel shows at a time; the others stay in the HTML, hidden (search and print
 * keep every word). Each tab sets the address hash (#what-it-is …), a hash in a link opens its tab, and Back steps through
 * tabs. Switching never moves the page: the tab boxes stay where they are on screen and the content swaps in place below.
 */
export function TreatmentTabs({ tabs, children }: { tabs: TabDef[]; children: React.ReactNode }) {
  const panels = Children.toArray(children);
  const [cur, setCur] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Where the tab boxes sat on screen before a switch, so the page can be held still after it.
  const anchor = useRef<number | null>(null);

  const indexOf = useCallback((hash: string) => tabs.findIndex((t) => `#${t.id}` === hash), [tabs]);

  // A hash in the address opens its tab: on load, and when Back or Forward changes it.
  useEffect(() => {
    const fromHash = (scroll: boolean) => {
      const i = indexOf(window.location.hash);
      if (i < 0) { if (!window.location.hash) setCur(0); return; }
      if (!scroll) anchor.current = listRef.current?.getBoundingClientRect().top ?? null;
      setCur(i);
      if (scroll) requestAnimationFrame(() => listRef.current?.scrollIntoView({ block: 'start' }));
    };
    fromHash(true);
    const onPop = () => fromHash(false);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [indexOf]);

  // Hold the tab boxes still across a switch (a shorter panel must not pull the page up).
  useLayoutEffect(() => {
    if (anchor.current == null || !listRef.current) return;
    const drift = listRef.current.getBoundingClientRect().top - anchor.current;
    if (Math.abs(drift) > 0.5) window.scrollBy(0, drift);
    anchor.current = null;
  }, [cur]);

  const open = (i: number, opts: { focus?: boolean; bringIntoView?: boolean } = {}) => {
    if (i === cur && !opts.bringIntoView) return;
    if (!opts.bringIntoView) anchor.current = listRef.current?.getBoundingClientRect().top ?? null;
    setCur(i);
    if (window.location.hash !== `#${tabs[i].id}`) window.history.pushState(null, '', `#${tabs[i].id}`);
    if (opts.focus) tabRefs.current[i]?.focus({ preventScroll: true });
    if (opts.bringIntoView) requestAnimationFrame(() => listRef.current?.scrollIntoView({ block: 'start' }));
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = tabs.length;
    const to = { ArrowRight: (i + 1) % n, ArrowDown: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, ArrowUp: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    open(to, { focus: true });
  };

  const next = cur + 1 < tabs.length ? cur + 1 : null;
  return (
    <div className="tabs">
      <div className="tabList" role="tablist" aria-label="Sections" ref={listRef}>
        {tabs.map((t, i) => (
          <button key={t.id} type="button" role="tab" id={`tab-${t.id}`} aria-controls={`panel-${t.id}`} aria-selected={i === cur}
            tabIndex={i === cur ? 0 : -1} ref={(el) => { tabRefs.current[i] = el; }} onClick={() => open(i)} onKeyDown={(e) => onKey(e, i)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="tabPanels">
        {panels.map((p, i) => (
          <div key={tabs[i]?.id ?? i} role="tabpanel" id={`panel-${tabs[i]?.id}`} aria-labelledby={`tab-${tabs[i]?.id}`} hidden={i !== cur} tabIndex={0}>
            {p}
          </div>
        ))}
        {next !== null ? (
          <div className="wrap">
            <button type="button" className="nextTab" onClick={() => open(next, { bringIntoView: true, focus: true })}>
              Next: {tabs[next].label} →
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
