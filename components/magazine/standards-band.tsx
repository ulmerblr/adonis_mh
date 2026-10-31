import Link from 'next/link';

const STANDARDS = [
  { title: 'Cited or left out', text: 'Every claim links to its source. If it isn’t published, we don’t say it.' },
  { title: 'Study by study', text: 'Size, country, design and length for each one. Never “studies show.”' },
  { title: 'Side effects stay in', text: 'Documented ones on every page. No scare lines either.' },
  { title: 'Dated and reviewed', text: 'Every status has an “as of” date. A licensed clinician signs off each page.' },
];

/** Magazine Section block: How we report (the standards band). Its link goes to the full /how-we-report page. */
export function StandardsBand() {
  return (
    <section className="band" id="how-we-report">
      <div className="wrap">
        <div className="secHead"><h2 className="h2">How we report</h2></div>
        <h3 className="bandHead">We report the record. We don’t sell it.</h3>
        <div className="grid2">
          {STANDARDS.map((s) => (
            <div key={s.title}><h3>{s.title}</h3><p>{s.text}</p></div>
          ))}
        </div>
        <Link href="/how-we-report" className="btn btnPunch" style={{ marginTop: 14 }}>Read our full standards →</Link>
      </div>
    </section>
  );
}
