import Link from 'next/link';
import { A, Label } from '@/components/ext';
import { Cover } from '@/components/cover';
import { IndexTable } from '@/components/index-table';
import { Track } from '@/components/track';
import { LANES, TREATMENTS, UPDATED, countWords } from '@/lib/library';
import { TRACKS } from '@/lib/tracks';

export const metadata = { title: { absolute: 'AdonisMensHealth.com' } };

const FED_REG = 'https://public-inspection.federalregister.gov/2026-22192.pdf';
const FDA_BRIEFING = 'https://www.fda.gov/media/193343/download';
const WADA_2027 = 'https://www.wada-ama.org/en/news/wada-publishes-2027-prohibited-list';
const AJMC = 'https://www.ajmc.com/view/hhs-draft-policy-eases-enforcement-on-6-compounded-peptides';

const LOG = [
  { date: 'Oct 30, 2026', title: 'HHS peptide compounding policy published', text: 'Six peptides, ten conditions. Not FDA approval.', href: FED_REG },
  { date: 'Sep 21, 2026', title: 'WADA publishes its 2027 Prohibited List', text: 'BPC-157 still banned at all times, class S0.', href: WADA_2027 },
  { date: 'Jul 23, 2026', title: 'FDA advisers vote 8 to 6 on BPC-157', text: 'Recommended for the compounding list over FDA staff’s objection.', href: AJMC },
];

/** Every outside link Home uses, once each. */
const SOURCES = [FDA_BRIEFING, FED_REG, WADA_2027, AJMC];

const TAKEAWAYS = [
  'Not FDA-approved for any use, in any country.',
  'Pharmacies may compound it under HHS conditions since Oct 30, 2026.',
  'About 80 people studied. No study used the shots or pills people take.',
  'Banned in sport at all times (WADA S0).',
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
      {/* 1. Cover */}
      <Cover
        tag="Recovery · The file"
        title="BPC-157"
        gold="By the numbers"
        buttons
        dek={<p>More than 50 million video views online. About 80 people ever studied. Here is every study, and what regulators said.</p>}
      />

      {/* 2. Where it stands */}
      <section className="section">
        <div className="wrap">
          <div className="secHead"><h2 className="h2">Where it stands</h2><Label>The path every drug takes</Label></div>
          <p className="dek" style={{ margin: '0 0 22px' }}>A drug earns FDA approval by passing each step in order. Here is how far BPC-157 has gone.</p>
          <Track name="BPC-157" steps={TRACKS['bpc-157']} />
        </div>
      </section>

      {/* 3. The article */}
      <section className="section">
        <div className="wrap articleGrid">
          <article className="article">
            <Label>Recovery · Peptides</Label>
            <h2 className="articleHead">HHS opened compounding to six peptides. It didn’t approve them.</h2>
            <p className="byline">Adonis Men’s Health · Checked Oct 31, 2026 · Clinical review pending</p>
            <div className="columns">
              <p className="dropcap">On October 30, HHS said it won’t take action against licensed pharmacies and physicians that compound BPC-157, TB-500, KPV, MOTS-c, Epitalon and Semax, as long as they meet ten conditions.</p>
              <p>That is enforcement discretion. None of the six is FDA-approved, and the policy says so. It runs while FDA works through the rules on each one.</p>
              <p>FDA’s own scientists had recommended against adding BPC-157 to the compounding list. The advisory committee voted 8 to 6 to add it anyway.</p>
            </div>
            <figure className="pull">
              <blockquote>“We found no studies that administered BPC-157 to humans via the proposed oral, SC, nasal, or transdermal ROA.”</blockquote>
              <figcaption><A href={FDA_BRIEFING}>FDA briefing document, July 2026</A></figcaption>
            </figure>
            <div className="bigStat">
              <span className="bigStatNum">2 wk</span>
              <p>The longest anyone has taken BPC-157 in a published human study.</p>
            </div>
          </article>
          <aside className="sidebar">
            <div className="takeaways">
              <p className="boxHead">Key takeaways</p>
              <ol>
                {TAKEAWAYS.map((t, i) => <li key={t}><span className="tNum" aria-hidden="true">{i + 1}</span><span>{t}</span></li>)}
              </ol>
            </div>
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
          </aside>
        </div>
      </section>

      {/* 4. Browse by lane */}
      <section className="section" style={{ paddingTop: 8 }}>
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

      {/* 5. Treatment index */}
      <section className="section" id="index">
        <div className="wrap">
          <div className="secHead"><h2 className="h2">Treatment index</h2><Label>Statuses as of {UPDATED}</Label></div>
          <IndexTable />
        </div>
      </section>

      {/* 6. The record */}
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

      {/* 7. Standards band */}
      <section className="band">
        <div className="wrap">
          <Label>How we report</Label>
          <h2 className="h2 bandHead">We report the record. We don’t sell it.</h2>
          <div className="grid2">
            {STANDARDS.map((s) => (
              <div key={s.title}><h3>{s.title}</h3><p>{s.text}</p></div>
            ))}
          </div>
          <Link href="/how-we-report" className="btn btnPunch" style={{ marginTop: 14 }}>Read our full standards →</Link>
        </div>
      </section>

      {/* 8. Sources */}
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
