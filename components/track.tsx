import type { Step } from '@/lib/tracks';

const STATUS_WORDS = { done: 'Done', started: 'Started, never fully published', not: 'Not done' } as const;

/** "Where it stands": numbered steps, each filled by how far the treatment has gone; a flag marks where it is now. */
export function Track({ name, steps }: { name: string; steps: Step[] }) {
  return (
    <div className="track">
      <ol className="trackSteps">
        {steps.map((s, i) => (
          <li key={s.title} className={`step step-${s.status}${s.here ? ' stepHere' : ''}`}>
            {s.here ? <span className="hereFlag">{name} is here</span> : null}
            <span className="stepNum" aria-hidden="true">{i + 1}</span>
            <span className="stepTitle">{s.title}</span>
            <span className="stepLine">{s.line}</span>
            <span className="srOnly">Status: {STATUS_WORDS[s.status]}.</span>
          </li>
        ))}
      </ol>
      <ul className="trackKey" aria-label="Key">
        <li><span className="key key-done" aria-hidden="true" />Done</li>
        <li><span className="key key-started" aria-hidden="true" />Started, never fully published</li>
        <li><span className="key key-not" aria-hidden="true" />Not done</li>
      </ul>
    </div>
  );
}
