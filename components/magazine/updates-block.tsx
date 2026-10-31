import { A } from '@/components/ext';

export const FED_REG = 'https://public-inspection.federalregister.gov/2026-22192.pdf';
export const WADA_2027 = 'https://www.wada-ama.org/en/news/wada-publishes-2027-prohibited-list';
export const AJMC = 'https://www.ajmc.com/view/hhs-draft-policy-eases-enforcement-on-6-compounded-peptides';

const LOG = [
  { date: 'Oct 30, 2026', title: 'HHS peptide compounding policy published', text: 'Six peptides, ten conditions. Not FDA approval.', href: FED_REG },
  { date: 'Sep 21, 2026', title: 'WADA publishes its 2027 Prohibited List', text: 'BPC-157 still banned at all times, class S0.', href: WADA_2027 },
  { date: 'Jul 23, 2026', title: 'FDA advisers vote 8 to 6 on BPC-157', text: 'Recommended for the compounding list over FDA staff’s objection.', href: AJMC },
];

/** Magazine Section block: Updates (the agency-blue record band: the Federal Action box and the latest-updates log). */
export function UpdatesBlock() {
  return (
<section className="agencyBand" id="updates">
  <div className="wrap">
    <div className="secHead"><h2 className="h2">Updates</h2></div>
  </div>
  <div className="wrap twoCol">
    <div>
      <h3 className="subHead">The record</h3>
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
      <h3 className="subHead">Latest updates</h3>
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
  );
}
