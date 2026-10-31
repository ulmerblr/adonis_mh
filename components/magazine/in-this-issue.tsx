import Link from 'next/link';
import type { IssueEntry } from '@/content/home/in-this-issue';

/**
 * Magazine Section sidebar: "In this issue", the nine lane stories in nav order, each linking to its lane. The cover
 * lane shows "Cover story"; the story on the page shows "Now reading" (punch red on lane pages: `laneMark`).
 */
export function InThisIssue({ entries, laneMark = false }: { entries: IssueEntry[]; laneMark?: boolean }) {
  return (
    <nav className={laneMark ? 'issue issueLanes' : 'issue'} aria-label="In this issue">
      <h2 className="issueTitle">In this issue</h2>
      <ol>
        {entries.map((e) => (
          <li key={e.n}>
            <Link href={`/lanes/${e.lane}`} aria-current={e.current ? 'true' : undefined}>
              <span className="issueNum">{e.n}</span>
              <span>
                <span className="issueLane">
                  {e.label}
                  {e.cover ? <span className="issueCover"> · Cover story</span> : null}
                  {e.current ? <span className="issueNow"> · Now reading</span> : null}
                </span>
                <span className="issueStory">{e.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
