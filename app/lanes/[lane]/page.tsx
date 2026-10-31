import { notFound } from 'next/navigation';
import { Label } from '@/components/ext';
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
      <section className="titleBlock">
        <div className="wrap">
          <Label>Lane</Label>
          <h1 className="h1 h1Big">{lane.name}</h1>
          <hr className="inkRule" />
          <p className="dek" style={{ marginTop: 0 }}>{countWords(n)}. Pages are added as each record is checked and reviewed.</p>
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
