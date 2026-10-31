/**
 * "Where it stands": the path every drug takes to FDA approval, step by step, with how far a treatment has gone.
 * One track per treatment; a treatment page and Home read the same data.
 */
export type StepStatus = 'done' | 'started' | 'not';
export type Step = { title: string; line: string; status: StepStatus; here?: boolean };

export const TRACKS: Record<string, Step[]> = {
  'bpc-157': [
    { title: 'Lab & animal', line: '100+ studies since 1993, mostly rats', status: 'done' },
    { title: 'Pilot in people', line: '3 small Florida studies, no control group', status: 'done' },
    { title: 'Phase I', line: '24 people, 2002–03, abstract only', status: 'started' },
    { title: 'Phase II', line: '53 people, 2005, abstract only, not significant', status: 'started', here: true },
    { title: 'Phase III', line: 'Never run', status: 'not' },
    { title: 'FDA approval', line: 'None; HHS compounding discretion, Oct 2026', status: 'not' },
  ],
};
