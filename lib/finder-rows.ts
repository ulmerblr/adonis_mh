import { LANES, TREATMENTS, type LaneKey, type Treatment } from '@/lib/library';

/** Every treatment row the finder shows, in the site's lane order (a treatment in two lanes has a row in each). */
export type Row = Treatment & { lane: LaneKey; laneName: string };
export const ROWS: Row[] = LANES.flatMap((l) => TREATMENTS[l.key].map((t) => ({ ...t, lane: l.key, laneName: l.name })));

/** Case-insensitive, ignoring hyphens, spaces and punctuation: "bpc157" finds BPC-157. */
export const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+]/g, '');
/** The finder's search: name, lane, "Peptide", and every other name on the row (brands, code names). `q` is normalised. */
export const matches = (r: Row, q: string) => !q || [r.name, r.laneName, r.peptide ? 'Peptide' : '', ...(r.aka ?? [])].some((f) => norm(f).includes(q));
