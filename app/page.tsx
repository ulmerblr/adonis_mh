import { TreatmentFinder } from '@/components/finder';
import { LaneSpread } from '@/components/magazine/lane-story';
import { ListenCard } from '@/components/magazine/listen';
import { MagazineSection } from '@/components/magazine/magazine-section';
import { coverLane } from '@/content/cover';

export const metadata = { title: { absolute: 'AdonisMensHealth.com' } };

/** Home: the cover is one lane's story, chosen by coverLane (content/cover.ts). */
export default function Home() {
  return (
    <>
      {/* The Magazine Section: everything between the header and the treatments section. */}
      <MagazineSection>
        <LaneSpread lane={coverLane} sideTop={<ListenCard />} />
      </MagazineSection>

      {/* The treatments section */}
      <section className="section" id="index">
        <div className="wrap">
          <div className="secHead"><h2 className="h2">Find a treatment</h2></div>
          <TreatmentFinder />
        </div>
      </section>
    </>
  );
}
