import { A } from '@/components/ext';
import { TreatmentFinder } from '@/components/finder';
import { CoverArticle, CoverPhoto, type CoverPhotoData } from '@/components/magazine/cover-story';
import { InThisIssue } from '@/components/magazine/in-this-issue';
import { MagazineSection } from '@/components/magazine/magazine-section';
import { StandardsCard } from '@/components/magazine/standards';
import { AJMC, FED_REG, UpdatesCard, WADA_2027 } from '@/components/magazine/updates';
import { FDA_BRIEFING } from '@/content/articles/peptides';

import coverRecord from '@/public/images/photos/home-cover-record.jpg';

/** Home's cover photo (AI-generated illustration). home-lead.jpg (the rancher) stays in the repo, unused. */
const COVER_PHOTO: CoverPhotoData = {
  src: coverRecord,
  alt: 'A working man in a denim shirt stands with arms crossed beside a table of documents.',
  caption: 'Illustration: AI-generated image',
  position: '78% 30%',
};

const NCPA = 'https://ncpa.org/newsroom/qam/2026/10/29/fda-grants-enforcement-discretion-compounding-six-peptides';
const WADA_PEPTIDES = 'https://granfondodailynews.com/2026/10/17/world-anti-doping-agency-puts-peptides-on-2027-prohibited-list/';

export const metadata = { title: { absolute: 'AdonisMensHealth.com' } };

/** Every outside link Home uses, once each. */
const HEALIO = 'https://www.healio.com/news/primary-care/20260724/fda-committee-recommends-looser-restrictions-for-several-peptides';
const WADA_2026 = 'https://www.wada-ama.org/sites/default/files/2025-09/2026list_en_final_clean_september_2025.pdf';
const SOURCES = [FDA_BRIEFING, FED_REG, WADA_2026, WADA_2027, AJMC, HEALIO, NCPA, WADA_PEPTIDES];

export default function Home() {
  return (
    <>
      {/* The Magazine Section: everything between the header and the treatments section. */}
      <MagazineSection>
        {/* Magazine Section, Home: a two-by-two grid, 2/3 + 1/3. Row 1: the cover photo (its height matches the box beside
            it) and In this issue. Row 2: the byline and article, and the Updates and How we report cards. */}
        <section className="section spreadSection">
          <div className="wrap spread2">
            <CoverPhoto photo={COVER_PHOTO} />
            <InThisIssue />
            <CoverArticle />
            <aside className="spreadSide">
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
