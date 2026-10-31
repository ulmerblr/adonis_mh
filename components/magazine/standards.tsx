import Link from 'next/link';
import { PopupButton } from './popup';

const STANDARDS = [
  { title: 'Cited or left out', text: 'Every claim links to its source. If it isn’t published, we don’t say it.' },
  { title: 'Study by study', text: 'Size, country, design and length for each one. Never “studies show.”' },
  { title: 'Side effects stay in', text: 'Documented ones on every page. No scare lines either.' },
  { title: 'Dated and reviewed', text: 'Every status has an “as of” date. A licensed clinician signs off each page.' },
];

/** Magazine Section card: How we report; "Read our standards →" opens the four standards, linking to /how-we-report. */
export function StandardsCard({ as = 'div' }: { as?: 'div' | 'li' }) {
  const Tag = as;
  return (
    <Tag className="briefCard">
      <span className="label">How we report</span>
      <h3 className="briefHead">We report the record. We don’t sell it.</h3>
      <p className="briefList">{STANDARDS.map((s) => s.title).join(' · ')}</p>
      <PopupButton label="Read our standards →" title="How we report">
        <div className="popupBody">
          <h3 className="bandHead" style={{ fontSize: 'clamp(24px, 6vw, 30px)' }}>We report the record. We don’t sell it.</h3>
          <div className="grid2">
            {STANDARDS.map((s) => <div key={s.title}><h3>{s.title}</h3><p>{s.text}</p></div>)}
          </div>
          <Link href="/how-we-report" className="moreLink">Full standards page →</Link>
        </div>
      </PopupButton>
    </Tag>
  );
}
