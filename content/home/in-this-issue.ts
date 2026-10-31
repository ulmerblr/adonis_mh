import type { LaneKey } from '@/lib/library';

/**
 * Home's "In this issue" contents (the Magazine Section sidebar). Edit the story titles here. `current` is the story on
 * the page; `written: false` shows the title in soft gray to mark that the story is not written yet.
 */
export type IssueEntry = { n: string; lane: LaneKey; label: string; title: string; current?: boolean; written: boolean };

export const IN_THIS_ISSUE: IssueEntry[] = [
  { n: '01', lane: 'recovery', label: 'Recovery', title: 'Six peptides. Zero FDA approvals.', current: true, written: true },
  { n: '02', lane: 'longevity', label: 'Longevity', title: 'Men die about five years younger than women', written: false },
  { n: '03', lane: 'trt', label: 'TRT', title: 'Testosterone: what the FDA label says', written: false },
  { n: '04', lane: 'weight', label: 'Weight', title: 'Semaglutide and tirzepatide, trial by trial', written: false },
  { n: '05', lane: 'vitality', label: 'Vitality', title: 'Three ED drugs and what their labels say', written: false },
  { n: '06', lane: 'energy', label: 'Energy', title: 'B12 and amino shots: what’s been studied', written: false },
  { n: '07', lane: 'sleep', label: 'Sleep', title: 'Sermorelin: the record so far', written: false },
  { n: '08', lane: 'hair-loss', label: 'Hair loss', title: 'Finasteride and minoxidil, the approved options', written: false },
  { n: '09', lane: 'skin', label: 'Skin', title: 'Tretinoin and what dermatology trials show', written: false },
];
