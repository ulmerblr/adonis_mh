import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Label } from '@/components/ext';
import { TreatmentFinder } from '@/components/finder';
import { LeadArticle } from '@/components/lead-article';
import { A } from '@/components/ext';
import { InThisIssue } from '@/components/magazine/in-this-issue';
import { StoryArticle, StoryPhoto, lanePhoto, linkify } from '@/components/magazine/story';
import { UpdatesCard } from '@/components/magazine/updates';
import { IN_THIS_ISSUE, type IssueEntry } from '@/content/home/in-this-issue';
import { STORIES } from '@/content/lanes';
import { MagazineSection } from '@/components/magazine/magazine-section';
import { StandardsCard } from '@/components/magazine/standards';
import { peptidesArticle, placeholderArticle } from '@/content/articles/peptides';
import { LANES, TREATMENTS, countWords, laneOf, type LaneKey } from '@/lib/library';

export const dynamicParams = false;
export function generateStaticParams() {
  return LANES.map((l) => ({ lane: l.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ lane: string }> }) {
  const lane = laneOf((await params).lane);
  return { title: lane ? lane.name : 'Lane' };
}

type Card = { kicker: string; title: string; summary: string; href: string; link: string } | null;

/** Each lane's summary cards: written ones, else marked placeholders (null). */
const CARDS: Partial<Record<LaneKey, Card[]>> = {
  recovery: [
    { kicker: 'The file · Recovery', title: 'BPC-157: every study, as it was run', summary: 'Five human studies, one placebo trial published only as an abstract, and two trials registered with no results yet.', href: '/bpc-157', link: 'Read the file →' },
  ],
};

/** A lane's page, in Home's magazine layout for that one lane. */
export default async function LanePage({ params }: { params: Promise<{ lane: string }> }) {
  const lane = laneOf((await params).lane);
  if (!lane) notFound();
  const key = lane.key as LaneKey;
  const n = TREATMENTS[key].length;
  const story = STORIES[key];
  if (story) return <LaneMagazine laneKey={key} laneName={lane.name} />;
  const article = key === 'recovery' ? peptidesArticle : placeholderArticle(lane.name);
  const cards = [0, 1, 2].map((i) => CARDS[key]?.[i] ?? null);
  return (
    <>
      {/* The Magazine Section: lane band, lead article, summary cards and the How we report card. */}
      <MagazineSection>
        <section className="laneCover">
          <div className="wrap">
            <span className="coverTag">Lane</span>
            <h1 className="laneCoverHead">{lane.name}</h1>
            <p className="laneCoverCount">{countWords(n)}</p>
          </div>
        </section>

        <LeadArticle a={{ ...article, photo: `[ Photo: ${lane.name} lead story ]`, kicker: key === 'recovery' ? article.kicker : lane.name }} />

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <ul className="summaryCards summaryCards4">
              {cards.map((c, i) => (
                <li key={i} className="summaryCard">
                  <div className="cardPhoto">[ Photo ]</div>
                  <div className="summaryBody">
                    {c ? (
                      <>
                        <Label>{c.kicker}</Label>
                        <h3 className="summaryTitle">{c.title}</h3>
                        <p>{c.summary}</p>
                        <Link href={c.href} className="more">{c.link}</Link>
                      </>
                    ) : (
                      <p className="ph summaryTitle">[ Summary to be written ]</p>
                    )}
                  </div>
                </li>
              ))}
              <StandardsCard as="li" />
            </ul>
          </div>
        </section>

      </MagazineSection>

      {/* The treatments section */}
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <div className="secHead"><h2 className="h2">{lane.name} treatments</h2></div>
          <TreatmentFinder lane={key} hideTabs />
        </div>
      </section>
    </>
  );
}

/** "In this issue" on a lane page: the nine lanes in lane order, each with its story's headline; this lane marked. */
function laneEntries(current: LaneKey): IssueEntry[] {
  return LANES.map((l, i) => {
    const st = STORIES[l.key];
    const home = IN_THIS_ISSUE.find((e) => e.lane === l.key);
    return {
      n: String(i + 1).padStart(2, '0'), lane: l.key, label: l.name,
      title: st ? `${st.headline[0]} ${st.headline[1]}` : home?.title ?? l.name,
      current: l.key === current, written: !!st,
    };
  });
}

/**
 * A lane page in Home's Magazine Section design (shared parts): the photo (or sand placeholder) beside In this issue,
 * then the article beside the Updates and How we report cards; Find a treatment locked to the lane; the story's Sources.
 */
function LaneMagazine({ laneKey, laneName }: { laneKey: LaneKey; laneName: string }) {
  const st = STORIES[laneKey]!;
  return (
    <>
      <MagazineSection>
        <h1 className="srOnly">{laneName}</h1>
        <section className="section spreadSection">
          <div className="wrap spread2">
            <StoryPhoto photo={lanePhoto(laneKey, st.photoAlt)} headline={st.headline} dek={st.dek} />
            <InThisIssue entries={laneEntries(laneKey)} laneMark />
            <StoryArticle byline={st.byline} glance={st.glance} paragraphs={st.paragraphs.map((p) => linkify(p))} pull={st.pull} />
            <aside className="spreadSide">
              <UpdatesCard />
              <StandardsCard />
            </aside>
          </div>
        </section>
      </MagazineSection>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <div className="secHead"><h2 className="h2">{laneName} treatments</h2></div>
          <TreatmentFinder lane={laneKey} hideTabs />
        </div>
      </section>

      <section className="section" id="sources">
        <div className="wrap">
          <div className="secHead"><h2 className="h2">Sources</h2></div>
          <ol className="sources">
            {st.sources.map((s) => <li key={s.url + s.label}><span><A href={s.url}>{s.label}</A>, {s.date}</span></li>)}
          </ol>
        </div>
      </section>
    </>
  );
}
