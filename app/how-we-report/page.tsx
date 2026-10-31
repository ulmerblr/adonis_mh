import { A, CLINIC } from '@/components/ext';

export const metadata = { title: 'How we report' };

const TERMS: [string, string][] = [
  ['Approved medicine', 'The regulator has a product approval on record for a specific use. We link the record.'],
  ['Prescription-only', 'Can be supplied only with a prescription in that country.'],
  ['Compounding allowed', 'A licensed pharmacy may prepare it for an individual patient under that country’s compounding rules. This is not approval.'],
  ['Research-only', 'Legal to make or hold for research, not for use in people.'],
  ['Not approved', 'No approval on record. Selling it as a medicine is not permitted.'],
  ['Banned', 'Prohibited by law or regulator order.'],
  ['Prohibited in sport', 'On the WADA Prohibited List. Separate from medical status.'],
];

export default function HowWeReport() {
  return (
    <>
      <section className="titleBlock">
        <div className="wrap">
          <span className="label">Standards</span>
          <h1 className="h1 h1Big">How we report</h1>
          <hr className="inkRule" />
        </div>
      </section>

      <section className="section" id="what-this-site-is">
        <div className="wrap">
          <div className="secHead"><h2 className="h2">What this site is</h2></div>
          <div className="body">
            <p className="bodyLead">
              AdonisMensHealth.com is a reference library on men’s health treatments: the chemistry, the published research, and
              where regulators stand. It is run by Adonis, the same company behind Adonis Clinical. We say so on every page.
            </p>
            <p>
              Each treatment gets one page. Each page reports what is published and nothing else. If a study exists, we cite it and
              report it exactly as it was done. If a study doesn’t exist, we say so. We don’t fill gaps with promises or with fear.
            </p>
            <p>
              This site does not sell anything. You can’t order here. Ordering, intake and talking to a licensed clinician happen
              at <A href={CLINIC}>Adonis Clinical</A>. Whether any treatment is right for you is a decision for you and a clinician,
              not for a web page.
            </p>
            <p className="note">
              Who it’s for: men who want to go past the basics. You can read the molecule, the study sizes, the countries, the
              journals, and the regulator’s own record, with a date on every status.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="secHead"><h2 className="h2">How to read a treatment page</h2></div>
          <p className="bodyLead">Every treatment page has the same six sections, in the same order.</p>
          <ol className="steps">
            <li><div><strong>What it is.</strong>The molecule in plain language, and how it acts in the body.</div></li>
            <li><div><strong>Research.</strong>Every published study we could find, listed one by one: size, country, design, length, what was measured, what was found, and the journal. Animal and lab studies are labeled as animal and lab studies.</div></li>
            <li><div><strong>US position.</strong>The FDA and HHS status, with the date we checked it and a link to the government record.</div></li>
            <li><div><strong>Around the world.</strong>The status from each country’s own regulator, dated and linked. Sports bans are included where they apply.</div></li>
            <li><div><strong>Documented side effects.</strong>What has been reported in the published record, cited.</div></li>
            <li><div><strong>Talk to a clinician.</strong>One link to Adonis Clinical.</div></li>
          </ol>

          <h3 className="h3">Regulatory status terms</h3>
          <dl className="terms">
            {TERMS.map(([t, d]) => (
              <div className="termRow" key={t}><dt>{t}</dt><dd>{d}</dd></div>
            ))}
          </dl>
          <p className="callout">
            “Approved” on this site always means a regulator record we can link to. Being sold somewhere does not make a product
            approved there.
          </p>
          <div className="body">
            <p><strong>How we describe evidence.</strong> We state the size of the evidence plainly: “one human study, 12 participants.” We don’t turn one study into “studies show.” Results in rats are rat results.</p>
            <p><strong>Dates.</strong> Regulatory status changes often. Every status has an “as of” date. If a date is old, check the linked record.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="secHead" id="standards"><h2 className="h2">The standards</h2></div>
          <p className="bodyLead">
            Every page is reviewed and signed off by a licensed clinician or pharmacist before it is published. Pages show the
            reviewer’s credential and the review date.
          </p>
          <ul className="list">
            <li><strong>Published facts only.</strong> Every claim links to its source. If something isn’t published, we don’t say it, good or bad.</li>
            <li><strong>Each study reported as it was done.</strong> We never combine small studies into a general claim like “studies show.”</li>
            <li><strong>Side effects stay in.</strong> Known, documented side effects appear on every page. We don’t add speculative warnings either.</li>
            <li><strong>No promises.</strong> We never say a compounded drug is FDA-approved, and we never say a treatment will work for you.</li>
            <li><strong>Dated statuses.</strong> Every regulatory status shows the date we checked it. We recheck on a set schedule and whenever a regulator acts.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
