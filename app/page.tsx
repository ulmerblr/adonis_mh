import Link from 'next/link';
import { A } from '@/components/ext';
import { TreatmentFinder } from '@/components/finder';
import { LeadArticle } from '@/components/lead-article';
import { StandardsBand } from '@/components/standards-band';
import { FDA_BRIEFING, peptidesArticle } from '@/content/articles/peptides';
import { LANES, TREATMENTS, countWords } from '@/lib/library';

export const metadata = { title: { absolute: 'AdonisMensHealth.com' } };

const FED_REG = 'https://public-inspection.federalregister.gov/2026-22192.pdf';
const WADA_2027 = 'https://www.wada-ama.org/en/news/wada-publishes-2027-prohibited-list';
const AJMC = 'https://www.ajmc.com/view/hhs-draft-policy-eases-enforcement-on-6-compounded-peptides';

const LOG = [
  { date: 'Oct 30, 2026', title: 'HHS peptide compounding policy published', text: 'Six peptides, ten conditions. Not FDA approval.', href: FED_REG },
  { date: 'Sep 21, 2026', title: 'WADA publishes its 2027 Prohibited List', text: 'BPC-157 still banned at all times, class S0.', href: WADA_2027 },
  { date: 'Jul 23, 2026', title: 'FDA advisers vote 8 to 6 on BPC-157', text: 'Recommended for the compounding list over FDA staff’s objection.', href: AJMC },
];

/** Every outside link Home uses, once each. */
const SOURCES = [FDA_BRIEFING, FED_REG, WADA_2027, AJMC];

export default function Home() {
  return (
    <>
      {/* 1. Lead article */}
      <LeadArticle a={peptidesArticle} sidebarExtra={
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

      {/* 2. Find a treatment */}
      <section className="section" id="index">
        <div className="wrap">
          <div className="secHead"><h2 className="h2">Find a treatment</h2></div>
          <TreatmentFinder />
        </div>
      </section>

      {/* 3. The record */}
      <section className="agencyBand" id="updates">
        <div className="wrap twoCol">
          <div>
            <div className="secHead"><h2 className="h2">The record</h2></div>
            <div className="agencyPanel">
              <p className="panelHead">FEDERAL ACTION</p>
              <dl className="recordRows">
                <div><dt>Policy</dt><dd>HHS enforcement discretion</dd></div>
                <div><dt>Docket</dt><dd>HHS-OASH-2026-0496</dd></div>
                <div><dt>Published</dt><dd>Oct 30, 2026</dd></div>
                <div><dt>FDA approval</dt><dd>None</dd></div>
                <div><dt>Source</dt><dd><A href={FED_REG}>Federal Register</A></dd></div>
              </dl>
            </div>
          </div>
          <div>
            <div className="secHead"><h2 className="h2">Latest updates</h2></div>
            <div className="agencyPanel">
              <ol className="log">
                {LOG.map((e) => (
                  <li key={e.date}>
                    <span className="logDate">{e.date}</span>
                    <div>
                      <span className="logTitle">{e.title}</span>
                      <span className="logText">{e.text}</span>
                      <span className="logLink"><A href={e.href}>{e.href}</A></span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Standards band */}
      <StandardsBand />

      {/* 5. Sources */}
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
