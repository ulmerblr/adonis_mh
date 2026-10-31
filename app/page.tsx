import { A } from '@/components/ext';
import { TreatmentFinder } from '@/components/finder';
import { CoverStory, type CoverPhoto } from '@/components/magazine/cover-story';
import { InThisIssue } from '@/components/magazine/in-this-issue';
import { MagazineSection } from '@/components/magazine/magazine-section';
import { StandardsCard } from '@/components/magazine/standards';
import { AJMC, FED_REG, UpdatesCard, WADA_2027 } from '@/components/magazine/updates';
import { FDA_BRIEFING } from '@/content/articles/peptides';

/**
 * Home's cover photo (AI-generated illustration): public/images/photos/home-cover-record.jpg. It has not been received
 * yet, so the spread shows a marked stand-in. When the file is in the repo, set:
 *   import coverRecord from '@/public/images/photos/home-cover-record.jpg';
 *   const COVER_PHOTO: CoverPhoto = { src: coverRecord, alt: 'A working man in a denim shirt stands with arms crossed beside a table of documents.', caption: 'Illustration: AI-generated image', position: '78% 30%' };
 * (home-lead.jpg, the rancher, stays in the repo, unused.)
 */
const COVER_PHOTO: CoverPhoto = null;

export const metadata = { title: { absolute: 'AdonisMensHealth.com' } };

/** Every outside link Home uses, once each. */
const SOURCES = [FDA_BRIEFING, FED_REG, WADA_2027, AJMC];

export default function Home() {
  return (
    <>
      {/* The Magazine Section: everything between the header and the treatments section. */}
      <MagazineSection>
        {/* Magazine Section, Home: a magazine spread, 60/40. Left: the cover story (photo with the headline in it, byline,
            article with the "At a glance" box, pull quote). Right: In this issue, the Updates card, the How we report card. */}
        <section className="section spreadSection">
          <div className="wrap spread">
            <CoverStory photo={COVER_PHOTO} />
            <aside className="spreadSide">
              <InThisIssue />
              <UpdatesCard />
              <StandardsCard />
            </aside>
          </div>
        </section>
      </MagazineSection>

      {/* The treatments section */}
      <section className="section" id="index">
        <div className="wrap">
          <div className="secHead"><h2 className="h2">Find a treatment</h2></div>
          <TreatmentFinder />
        </div>
      </section>

      {/* Sources */}
      <section className="section" id="sources">
        <div className="wrap">
          <div className="secHead"><h2 className="h2">Sources</h2></div>
          <ol className="sources">
            {SOURCES.map((s) => <li key={s}><A href={s} /></li>)}
          </ol>
        </div>
      </section>
    </>
  );
}
