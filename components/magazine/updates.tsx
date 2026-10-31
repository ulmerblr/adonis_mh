import { A } from '@/components/ext';
import { PopupButton } from './popup';

export const FED_REG = 'https://public-inspection.federalregister.gov/2026-22192.pdf';
export const WADA_2027 = 'https://www.wada-ama.org/en/news/wada-publishes-2027-prohibited-list';
export const AJMC = 'https://www.ajmc.com/view/hhs-draft-policy-eases-enforcement-on-6-compounded-peptides';

const LOG = [
  { date: 'Oct 30, 2026', short: 'HHS peptide policy published', title: 'HHS peptide compounding policy published', text: 'Six peptides, ten conditions. Not FDA approval.', href: FED_REG },
  { date: 'Sep 21, 2026', short: 'WADA 2027 list out', title: 'WADA publishes its 2027 Prohibited List', text: 'BPC-157 still banned at all times, class S0.', href: WADA_2027 },
  { date: 'Jul 23, 2026', short: 'FDA advisers vote 8–6', title: 'FDA advisers vote 8 to 6 on BPC-157', text: 'Recommended for the compounding list over FDA staff’s objection.', href: AJMC },
];

/** The full Updates content (in its pop-up): the Federal Action record box and the full log. */
function UpdatesRecord() {
  return (
    <div className="popupBody">
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
      <h3 className="subHead" style={{ marginTop: 22 }}>Latest updates</h3>
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
  );
}

/** Magazine Section card: Updates, three compact log lines; "See the record →" opens the full record. /#updates opens it. */
export function UpdatesCard() {
  return (
    <div className="briefCard">
      <span className="label">Updates</span>
      <ul className="briefLines">
        {LOG.map((e) => <li key={e.date}><span className="briefDate">{e.date}</span> — {e.short}</li>)}
      </ul>
      <PopupButton label="See the record →" title="Updates" hash="updates"><UpdatesRecord /></PopupButton>
    </div>
  );
}
