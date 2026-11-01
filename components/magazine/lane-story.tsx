import { InThisIssue } from './in-this-issue';
import { StandardsCard } from './standards';
import { StoryPhoto, lanePhoto } from './story';
import { StoryArticleNotes } from './article';
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
    <section className="section spreadSection" data-lane={lane}>
      <div className="wrap spread2">
        <StoryPhoto photo={lanePhoto(lane, st.photoAlt, photo)} headline={st.headline} dek={st.dek} />
        <InThisIssue entries={issueEntries(lane)} laneMark={laneMark} />
        <StoryArticleNotes lane={lane} byline={st.byline} body={st.body} notes={st.notes} glance={st.glance} pull={st.pull} />
        <aside className="spreadSide">
          <UpdatesCard />
          <StandardsCard />
        </aside>
      </div>
    </section>
  );
}
