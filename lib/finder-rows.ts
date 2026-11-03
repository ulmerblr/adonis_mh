import { LANES, TREATMENTS, type LaneKey, type Treatment } from '@/lib/library';

/** Every treatment row the finder shows, in the site's lane order (a treatment in two lanes has a row in each). */
export type Row = Treatment & { lane: LaneKey; laneName: string };
export const ROWS: Row[] = LANES.flatMap((l) => TREATMENTS[l.key].map((t) => ({ ...t, lane: l.key, laneName: l.name })));

/** Case-insensitive, ignoring hyphens, spaces and punctuation: "bpc157" finds BPC-157. */
export const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+]/g, '');

/** Edit distance (insert, delete, substitute), stopping early once it passes `max`. */
function lev(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]; let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (cur[j] < best) best = cur[j];
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

/** The names a row can be found by: its name, the name without the bracketed part, the bracketed part, and its aliases. */
function names(r: Row): string[] {
  const out = [r.name, r.name.replace(/\s*\([^)]*\)/, ''), ...(r.name.match(/\(([^)]*)\)/)?.slice(1) ?? []), ...(r.aka ?? [])];
  return [...new Set(out.map(norm).filter(Boolean))];
}

/**
 * The finder's search (shared by the magazine finder and the App view). Returns a rank, lower is better, or null for no
 * match. `q` is normalised (see norm). 0: a name or alias equals the query; 1: one starts with it; 2: one contains it;
 * 3: the lane name or "Peptide" contains it; 4 and 5: forgiving matches for queries of 4 or more characters, within a
 * small edit distance (1 edit for 4 to 6 characters, 2 for longer) of a whole name (4) or of a name's beginning (5).
 */
export function rank(r: Row, q: string): number | null {
  if (!q) return 0;
  const ns = names(r);
  if (ns.some((n) => n === q)) return 0;
  if (ns.some((n) => n.startsWith(q))) return 1;
  if (ns.some((n) => n.includes(q))) return 2;
  if ([r.laneName, r.peptide ? 'Peptide' : ''].some((f) => f && norm(f).includes(q))) return 3;
  if (q.length >= 4) {
    const k = q.length <= 6 ? 1 : 2;
    if (ns.some((n) => lev(q, n, k) <= k)) return 4;
    if (ns.some((n) => [q.length - 1, q.length, q.length + 1].some((L) => L >= 3 && L <= n.length && lev(q, n.slice(0, L), k) <= k))) return 5;
  }
  return null;
}

export const matches = (r: Row, q: string) => rank(r, q) !== null;

/** Rows that match, best first; rows of equal rank keep the site's order. */
export function ranked<T extends Row>(rows: T[], q: string): T[] {
  if (!q) return rows;
  return rows.map((r, i) => ({ r, i, k: rank(r, q) })).filter((x) => x.k !== null)
    .sort((a, b) => (a.k! - b.k!) || (a.i - b.i)).map((x) => x.r);
}
