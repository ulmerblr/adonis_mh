import Link from 'next/link';
import { IN_THIS_ISSUE } from '@/content/home/in-this-issue';

/** Magazine Section, Home sidebar: "In this issue", nine numbered stories, each linking to its lane. */
export function InThisIssue() {
  return (
    <nav className="issue" aria-label="In this issue">
      <h2 className="issueTitle">In this issue</h2>
      <ol>
        {IN_THIS_ISSUE.map((e) => (
          <li key={e.n}>
            <Link href={`/lanes/${e.lane}`} aria-current={e.current ? 'true' : undefined}>
              <span className="issueNum">{e.n}</span>
              <span>
                <span className="issueLane">{e.label}{e.current ? <span className="issueNow"> · Now reading</span> : null}</span>
                <span className={e.written ? 'issueStory' : 'issueStory issueUnwritten'}>{e.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
