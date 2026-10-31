import Link from 'next/link';
import { A } from '@/components/ext';
import { TreatmentFinder } from '@/components/finder';
import { LeadArticle } from '@/components/lead-article';
import { MagazineSection } from '@/components/magazine/magazine-section';
import { StandardsCard } from '@/components/magazine/standards';
import { AJMC, FED_REG, UpdatesCard, WADA_2027 } from '@/components/magazine/updates';
import { FDA_BRIEFING, peptidesArticle } from '@/content/articles/peptides';
import { LANES, TREATMENTS, countWords } from '@/lib/library';

export const metadata = { title: { absolute: 'AdonisMensHealth.com' } };

/** Every outside link Home uses, once each. */
const SOURCES = [FDA_BRIEFING, FED_REG, WADA_2027, AJMC];

export default function Home() {
  return (
    <>
      {/* The Magazine Section: everything between the header and the treatments section. */}
      <MagazineSection>
        {/* Magazine Section: lead article (with the Updates and How we report cards under it) and its sidebar */}
        <LeadArticle a={peptidesArticle} articleExtra={
          <div className="briefCards">
            <UpdatesCard />
            <StandardsCard />
          </div>
        } sidebarExtra={
              <div className="agencyBox inside">
                <p className="insideHead">Inside</p>
                <ul>
                  {LANES.map((l) => (
                    <li key={l.key}>
                      <Link href={`/lanes/${l.key}`}>
                        <span>{l.name}</span>
                        <span className="insideCount">{l.key === 'recovery' ? 'BPC-157 ready' : countWords(TREATMENTS[l.key].length)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
        } />

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
