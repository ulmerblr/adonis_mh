import { notFound } from 'next/navigation';
import { IndexTable } from '@/components/index-table';
import { LANES, TREATMENTS, countWords, laneOf, type LaneKey } from '@/lib/library';

export const dynamicParams = false;
export function generateStaticParams() {
  return LANES.map((l) => ({ lane: l.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ lane: string }> }) {
  const lane = laneOf((await params).lane);
  return { title: lane ? lane.name : 'Lane' };
}

export default async function LanePage({ params }: { params: Promise<{ lane: string }> }) {
  const lane = laneOf((await params).lane);
  if (!lane) notFound();
  const n = TREATMENTS[lane.key as LaneKey].length;
  return (
    <>
      <section className="laneCover">
        <div className="wrap">
          <span className="coverTag">Lane</span>
          <h1 className="laneCoverHead">{lane.name}</h1>
          <p className="laneCoverCount">{countWords(n)}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <IndexTable lanes={[lane.key]} subheads={false} />
        </div>
      </section>
    </>
  );
}
