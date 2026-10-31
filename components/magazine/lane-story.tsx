import { A } from '@/components/ext';
import { InThisIssue } from './in-this-issue';
import { StandardsCard } from './standards';
import { StoryArticle, StoryPhoto, lanePhoto, linkify } from './story';
import { UpdatesCard } from './updates';
import { issueEntries } from '@/content/home/in-this-issue';
import { STORIES } from '@/content/lanes';
import type { LaneKey } from '@/lib/library';

/**
 * A lane's story in the Magazine Section spread, as Home and the lane pages show it: the photo (or sand placeholder)
 * beside In this issue, then the article beside the Updates and How we report cards. Home passes its cover lane.
 */
export function LaneSpread({ lane, laneMark = false }: { lane: LaneKey; laneMark?: boolean }) {
  const st = STORIES[lane];
  const photo = st.photo ? { ...st.photo, file: `/images/photos/${st.photo.file}` } : undefined;
  return (
    <section className="section spreadSection">
      <div className="wrap spread2">
        <StoryPhoto photo={lanePhoto(lane, st.photoAlt, photo)} headline={st.headline} dek={st.dek} />
        <InThisIssue entries={issueEntries(lane)} laneMark={laneMark} />
        <StoryArticle byline={st.byline} glance={st.glance} paragraphs={(st.summary ?? st.paragraphs ?? []).map((p) => linkify(p))} pull={st.pull} record={st.excerpts} />
        <aside className="spreadSide">
          <UpdatesCard />
          <StandardsCard />
        </aside>
      </div>
    </section>
  );
}

/** The story's Sources list (dated). */
export function LaneSources({ lane }: { lane: LaneKey }) {
  return (
    <section className="section" id="sources">
      <div className="wrap">
        <div className="secHead"><h2 className="h2">Sources</h2></div>
        <ol className="sources">
          {STORIES[lane].sources.map((s) => <li key={s.url + s.label}><span><A href={s.url}>{s.label}</A>, {s.date}</span></li>)}
        </ol>
      </div>
    </section>
  );
}
