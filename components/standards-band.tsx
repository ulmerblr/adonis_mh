import Link from 'next/link';
import { Label } from './ext';

const STANDARDS = [
  { title: 'Cited or left out', text: 'Every claim links to its source. If it isn’t published, we don’t say it.' },
  { title: 'Study by study', text: 'Size, country, design and length for each one. Never “studies show.”' },
  { title: 'Side effects stay in', text: 'Documented ones on every page. No scare lines either.' },
  { title: 'Dated and reviewed', text: 'Every status has an “as of” date. A licensed clinician signs off each page.' },
];

export function StandardsBand() {
  return (
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
  );
}
