import { notFound } from 'next/navigation';
import { TreatmentFinder } from '@/components/finder';
import { LaneSources, LaneSpread } from '@/components/magazine/lane-story';
import { MagazineSection } from '@/components/magazine/magazine-section';
import { LANES, laneOf, type LaneKey } from '@/lib/library';

export const dynamicParams = false;
export function generateStaticParams() {
  return LANES.map((l) => ({ lane: l.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ lane: string }> }) {
  const lane = laneOf((await params).lane);
  return { title: lane ? lane.name : 'Lane' };
}

/** A lane's page: its one story in Home's Magazine Section design, Find a treatment locked to the lane, the story's Sources. */
export default async function LanePage({ params }: { params: Promise<{ lane: string }> }) {
  const lane = laneOf((await params).lane);
  if (!lane) notFound();
  const key = lane.key as LaneKey;
  return (
    <>
      <MagazineSection>
        <h1 className="srOnly">{lane.name}</h1>
        <LaneSpread lane={key} laneMark />
      </MagazineSection>

      <section className="section" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <div className="secHead"><h2 className="h2">{lane.name} treatments</h2></div>
          <TreatmentFinder lane={key} hideTabs />
        </div>
      </section>

      <LaneSources lane={key} />
    </>
  );
}
