import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Label } from '@/components/ext';
import { TreatmentFinder } from '@/components/finder';
import { LeadArticle } from '@/components/lead-article';
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
