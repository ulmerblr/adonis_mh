import Link from 'next/link';
import { A, Label } from '@/components/ext';
import { IndexTable } from '@/components/index-table';
import { LANES, TREATMENTS, UPDATED, countWords } from '@/lib/library';

export const metadata = { title: { absolute: 'AdonisMensHealth.com' } };

const FED_REG = 'https://public-inspection.federalregister.gov/2026-22192.pdf';

const LOG = [
  { date: 'Oct 30, 2026', title: 'HHS peptide compounding policy published', text: 'Six peptides, ten conditions. Not FDA approval.', href: FED_REG },
  { date: 'Sep 21, 2026', title: 'WADA publishes its 2027 Prohibited List', text: 'BPC-157 still banned at all times, class S0.', href: 'https://www.wada-ama.org/en/news/wada-publishes-2027-prohibited-list' },
  { date: 'Jul 23, 2026', title: 'FDA advisers vote 8 to 6 on BPC-157', text: 'Recommended for the compounding list over FDA staff’s objection.', href: 'https://www.ajmc.com/view/hhs-draft-policy-eases-enforcement-on-6-compounded-peptides' },
];

const STANDARDS = [
  { title: 'Cited or left out', text: 'Every claim links to its source. If it isn’t published, we don’t say it.' },
  { title: 'Study by study', text: 'Size, country, design and length for each one. Never “studies show.”' },
  { title: 'Side effects stay in', text: 'Documented ones on every page. No scare lines either.' },
  { title: 'Dated and reviewed', text: 'Every status has an “as of” date. A licensed clinician signs off each page.' },
];

export default function Home() {
  return (
    <>
      {/* A. Lead */}
      <section className="wrap lead">
        <div>
          <Label>Regulatory update · Recovery</Label>
          <h1 className="h1">HHS opened pharmacy compounding to six peptides. <em>It did not approve them.</em></h1>
          <p className="dek">
            Since October 30, HHS says it won’t act against licensed pharmacies that compound BPC-157 and five others under set
            conditions. Here is what has been tested in people.
          </p>
          <div className="record">
            <p className="recordHead">THE RECORD</p>
            <dl className="recordRows">
              <div><dt>Policy</dt><dd>HHS enforcement discretion, Docket HHS-OASH-2026-0496</dd></div>
              <div><dt>Published</dt><dd>Oct 30, 2026</dd></div>
              <div><dt>Covers</dt><dd>BPC-157, TB-500, KPV, MOTS-c, Epitalon, Semax</dd></div>
              <div><dt>FDA approval</dt><dd>None</dd></div>
            </dl>
          </div>
          <div className="btnRow">
            <Link href="/bpc-157" className="btn btnLeather">Read the BPC-157 file</Link>
            <a href={FED_REG} className="btn btnOutline" target="_blank" rel="noopener noreferrer">Federal Register notice</a>
          </div>
        </div>
        <div className="photo">
          <div className="photoSlot">[ Photo: a working man, outdoors, mid-job ]</div>
          <div className="photoStrip">
            <div><span className="bigNum">5</span><span>BPC-157 human studies</span></div>
            <div><span className="bigNum">~80</span><span>people, all-time</span></div>
            <div><span className="bigNum">2 wk</span><span>longest course</span></div>
          </div>
        </div>
      </section>

      {/* B. Browse by lane */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="label" style={{ display: 'block', margin: '0 0 10px' }}>Browse by lane</h2>
          <ul className="lanes">
            {LANES.map((l) => (
              <li key={l.key}>
                <Link href={`/lanes/${l.key}`}>
                  <span className="laneName">{l.name}</span>
                  <span className="laneCount">{countWords(TREATMENTS[l.key].length)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* C. Treatment index */}
      <section className="section" id="index">
        <div className="wrap">
          <div className="secHead"><h2 className="h2">Treatment index</h2><Label>Statuses as of {UPDATED}</Label></div>
          <IndexTable />
        </div>
      </section>

      {/* D. Latest from the regulators, and the feature */}
      <section className="section" id="updates">
        <div className="wrap twoCol">
          <div>
            <div className="secHead"><h2 className="h2">Latest from the regulators</h2></div>
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
          <article className="feature">
            <div className="featurePhoto">[ Photo ]</div>
            <div className="featureBody">
              <Label>The file · Recovery</Label>
              <h3 className="h3">BPC-157: every study, as it was run</h3>
              <p>Five human studies, one placebo trial published only as an abstract, and two trials registered with no results yet.</p>
              <Link href="/bpc-157" className="more">Read the file →</Link>
            </div>
          </article>
        </div>
      </section>

      {/* E. Standards band */}
      <section className="band">
        <div className="wrap">
          <Label>How we report</Label>
          <h2 className="h2" style={{ marginTop: 8 }}>We report the record. We don’t sell it.</h2>
          <div className="grid2">
            {STANDARDS.map((s) => (
              <div key={s.title}><h3>{s.title}</h3><p>{s.text}</p></div>
            ))}
          </div>
          <Link href="/how-we-report" className="moreLink">Read our full standards →</Link>
        </div>
      </section>
    </>
  );
}
