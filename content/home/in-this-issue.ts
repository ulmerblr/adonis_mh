import { coverLane } from '@/content/cover';
import { STORIES } from '@/content/lanes';
import { LANES, type LaneKey } from '@/lib/library';

/**
 * "In this issue" (Home and every lane page): the nine lanes in top-nav order, numbered 01 to 09, each with its lane's
 * current story headline, read from the lane story itself. `current` is the story on the page; `cover` is the Home cover.
 */
export type IssueEntry = { n: string; lane: LaneKey; label: string; title: string; current: boolean; cover: boolean };

export function issueEntries(current: LaneKey): IssueEntry[] {
  return LANES.map((l, i) => ({
    n: String(i + 1).padStart(2, '0'),
    lane: l.key,
    label: l.name,
    title: STORIES[l.key].headline.join(' '),
    current: l.key === current,
    cover: l.key === coverLane,
  }));
}
