import Link from 'next/link';
import { IN_THIS_ISSUE, type IssueEntry } from '@/content/home/in-this-issue';

/**
 * Magazine Section sidebar: "In this issue", nine numbered stories, each linking to its lane. Home passes its own list
 * (the default); a lane page passes the nine lane stories with its own lane marked current (`laneMark`: punch red).
 */
export function InThisIssue({ entries = IN_THIS_ISSUE, laneMark = false }: { entries?: IssueEntry[]; laneMark?: boolean }) {
  return (
    <nav className={laneMark ? 'issue issueLanes' : 'issue'} aria-label="In this issue">
      <h2 className="issueTitle">In this issue</h2>
      <ol>
        {entries.map((e) => (
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
