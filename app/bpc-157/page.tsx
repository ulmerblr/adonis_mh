import { A, CLINIC, Src } from '@/components/ext';

export const metadata = { title: 'BPC-157' };

const U = {
  hsieh: 'https://www.nature.com/articles/s41598-020-74022-y',
  pmcReview: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12446177/',
  chang: 'https://journals.physiology.org/doi/full/10.1152/japplphysiol.00945.2010',
  vasireddi: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12313605/',
  knee: 'https://pubmed.ncbi.nlm.nih.gov/34324435/',
  bladder: 'https://pubmed.ncbi.nlm.nih.gov/39325560/',
  iv: 'https://pubmed.ncbi.nlm.nih.gov/40131143/',
  veljaca: 'https://www.semanticscholar.org/paper/7cc5b526006d9ecc959aa09ede50cfb12b751787',
  nct: 'https://clinicaltrials.gov/study/NCT02637284',
  fdaBriefing: 'https://www.fda.gov/media/193343/download',
  ajmc: 'https://www.ajmc.com/view/hhs-draft-policy-eases-enforcement-on-6-compounded-peptides',
  fedReg: 'https://public-inspection.federalregister.gov/2026-22192.pdf',
  hhsAppendix: 'https://www.hhs.gov/sites/default/files/hhs-503a-peptide-enforcement-discretion-policy-appendix-b.pdf',
  fdaCat2: 'https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks',
  opss: 'https://www.opss.org/article/bpc-157-prohibited-peptide-and-unapproved-drug-found-health-and-wellness-products',
  canada: 'https://recalls-rappels.canada.ca/en/alert-recall/think-twice-injecting-peptides-bought-online-unauthorized-products-can-seriously-harm',
  ausSport: 'https://sportintegrity.gov.au/substances/bpc-157',
  ausLeg: 'https://www.legislation.gov.au/F2026L00633/asmade',
  wada2026: 'https://www.wada-ama.org/sites/default/files/2025-09/2026list_en_final_clean_september_2025.pdf',
  wada2027: 'https://www.wada-ama.org/en/news/wada-publishes-2027-prohibited-list',
  usada: 'https://www.usada.org/substance/bpc-157/',
};
/** Every source used on the page, once each, in the order it first appears. */
const SOURCES = Object.values(U);

type Country = { country: string; regulator: string; status: string; checked?: string; sources?: string[] };
const COUNTRIES: Country[] = [
  { country: 'United States', regulator: 'FDA / HHS', status: 'Not approved. Compounding under HHS enforcement discretion.', checked: 'Oct 31, 2026', sources: [U.fedReg] },
  { country: 'Canada', regulator: 'Health Canada', status: 'Not approved. Named among unauthorized injectable peptides seized.', checked: 'Oct 31, 2026', sources: [U.canada] },
  { country: 'Australia', regulator: 'TGA', status: 'Not approved (not in the ARTG). Prescription-only (Schedule 4); possession without authority is illegal (Appendix D).', checked: 'Oct 31, 2026', sources: [U.ausSport, U.ausLeg] },
  { country: 'United Kingdom', regulator: 'MHRA', status: 'Status being confirmed with the regulator’s record.' },
  { country: 'EU / Germany', regulator: 'EMA / BfArM', status: 'Status being confirmed with the regulator’s record.' },
  { country: 'China', regulator: 'NMPA', status: 'Status being confirmed with the regulator’s record.' },
  { country: 'India', regulator: 'CDSCO', status: 'Status being confirmed with the regulator’s record.' },
  { country: 'Russia', regulator: 'Roszdravnadzor', status: 'Status being confirmed with the regulator’s record.' },
];

function Sec({ n, title, warm, children }: { n: number; title: string; warm?: boolean; children: React.ReactNode }) {
  return (
    <section className={warm ? 'section sectionWarm' : 'section'} id={`s${n}`}>
      <div className="wrap">
        <div className="secHead"><span className="secNum" aria-hidden="true">{n}</span><h2 className="h2"><span className="srOnly">{n}. </span>{title}</h2></div>
        {children}
      </div>
    </section>
  );
}

function Fact({ k, children }: { k: string; children: React.ReactNode }) {
  return <div><dt>{k}</dt><dd>{children}</dd></div>;
}

export default function Bpc157() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1 className="h1">BPC-157</h1>
          <hr className="heroRule" />
        </div>
      </section>

      <section className="lead">
        <div className="wrap">
          <p className="leadText">
            BPC-157 is a lab-made peptide studied mostly in rats. Published human data covers fewer than 30 people across three
            small studies, none with a control group. It is not an FDA-approved drug.
          </p>
          <p className="leadMeta">
            <span className="chip">Statuses as of October 31, 2026.</span>
            <span className="chip chipQuiet">Clinical review: pending.</span>
          </p>
        </div>
      </section>

      <Sec n={1} title="What it is">
        <div className="body">
          <p>
            BPC-157 is a chain of 15 amino acids: <span className="mono">Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val</span>.
            Its molecular weight is about 1,419 daltons. It copies part of a larger protein found in human stomach juice, called
            “body protection compound.” Every BPC-157 product is made synthetically.
          </p>
          <p>
            A research group at the University of Zagreb, Croatia, led by Predrag Sikirić, first described it in the early 1990s.
            That group and its collaborators wrote most of the research since. It has also gone by the drug codes PL 14736, PL-10
            and Bepecin.
          </p>
        </div>
        <h3 className="h3">How it acts, according to animal and cell studies:</h3>
        <ul className="list">
          <li>It raises nitric oxide production in blood-vessel cells, through the eNOS enzyme. <Src href={U.hsieh} label="Hsieh et al., Scientific Reports, 2020" /></li>
          <li>It increases VEGFR2, a receptor that drives new blood-vessel growth. <Src href={U.pmcReview} label="PMC review, 2025" /></li>
          <li>It increased the survival and movement of rat tendon cells in the lab. <Src href={U.chang} label="Chang et al., Journal of Applied Physiology, 2011" /></li>
          <li>Unlike most peptides, it is not broken down by stomach acid. In animals it clears from the blood in under 30 minutes. <Src href={U.vasireddi} label="Vasireddi et al., HSS Journal, 2025" /></li>
        </ul>
        <p className="callout">None of these mechanisms has been measured in people.</p>
      </Sec>

      <Sec n={2} title="Research" warm>
        <p className="bodyLead">
          Human evidence: three small published studies (30 people in total), two conference abstracts, and one trial whose results
          were never released. None of the published studies used a control group. Each is listed below exactly as it was run.
        </p>

        <h3 className="h3">Human studies</h3>
        <div className="cards">
          <article className="card">
            <h4 className="cardTitle">Knee pain, 2021 (USA)</h4>
            <dl className="facts">
              <Fact k="Citation"><A href={U.knee}>Lee E, Padgett B. Altern Ther Health Med 2021;27(4):8-13</A></Fact>
              <Fact k="Where">one clinic, Orlando, Florida</Fact>
              <Fact k="Design">retrospective chart review. No control group, no placebo.</Fact>
              <Fact k="People">16 adults with chronic knee pain. 12 got BPC-157 alone; 4 got BPC-157 plus TB-500 (thymosin beta-4).</Fact>
              <Fact k="What was given">one injection into the knee joint</Fact>
              <Fact k="Length">patients contacted by phone 6 to 12 months later</Fact>
              <Fact k="Found">11 of 12 in the BPC-157-only group reported significant improvement; 3 of 4 in the combined group did. Pain was self-reported, not measured on a validated scale.</Fact>
            </dl>
          </article>

          <article className="card">
            <h4 className="cardTitle">Interstitial cystitis (bladder pain), 2024 (USA)</h4>
            <dl className="facts">
              <Fact k="Citation"><A href={U.bladder}>Lee E, Walker C, Ayadi B. Altern Ther Health Med 2024;30(10):12-17</A></Fact>
              <Fact k="Design">pilot study, one practice. No control group.</Fact>
              <Fact k="People">12 women aged 39 to 76 whose condition had not responded to pentosan polysulfate</Fact>
              <Fact k="What was given">10 mg injected into the bladder wall during cystoscopy, made by a 503A compounding pharmacy</Fact>
              <Fact k="Length">6 weeks</Fact>
              <Fact k="Found">10 of 12 reported full symptom resolution; 2 reported 80% resolution. No adverse events were reported.</Fact>
            </dl>
          </article>

          <article className="card">
            <h4 className="cardTitle">Intravenous safety, 2025 (USA)</h4>
            <dl className="facts">
              <Fact k="Citation"><A href={U.iv}>Lee E, Burgess. Altern Ther Health Med 2025</A></Fact>
              <Fact k="Design">safety pilot. No control group.</Fact>
              <Fact k="People">2 healthy adults</Fact>
              <Fact k="What was given">10 mg by IV infusion on day 1, 20 mg on day 2</Fact>
              <Fact k="Found">no measurable change in heart, liver, kidney, thyroid or blood-sugar markers, and no side effects reported</Fact>
            </dl>
          </article>
        </div>
        <p className="under">The same lead author ran all three published studies.</p>

        <div className="cards" style={{ marginTop: 16 }}>
          <article className="card cardAlt">
            <h4 className="cardTitle">Ulcerative colitis program, 2003 and 2005 (Croatia, Pliva)</h4>
            <ul className="cardBullets">
              <li><strong>Phase I:</strong> <A href={U.veljaca}>Veljača M, et al. Gut 2003;51(Suppl III):A309</A> — Healthy male volunteers, given by enema. The abstract reports it was safe and well tolerated.</li>
              <li><strong>Phase II:</strong> Ruenzi M, et al. Gastroenterology 2005;128:A584. Randomized, double-blind, placebo-controlled, in mild-to-moderate ulcerative colitis, given by enema. Reported as effective and safe.</li>
              <li><strong>Both exist only as conference abstracts. Participant counts and full results were never published in a peer-reviewed paper.</strong></li>
            </ul>
          </article>

          <article className="card cardMuted">
            <h4 className="cardTitle">Oral safety trial, 2015 (Mexico): no results</h4>
            <ul className="cardBullets">
              <li><A href={U.nct}>NCT02637284</A>, sponsored by PharmaCotherapia. A randomized, placebo-controlled Phase I trial of BPC-157 tablets in 42 healthy volunteers aged 18 to 35, in Tijuana.</li>
              <li><strong>A results submission was withdrawn in 2016 before review. No data has been released.</strong></li>
            </ul>
          </article>
        </div>

        <h3 className="h3">Animal and lab studies</h3>
        <div className="body">
          <p>
            More than 100 animal and lab studies have been published since 1993, most from the Zagreb group. They cover stomach and
            bowel injury, tendon, ligament, muscle and bone injury, liver injury, blood vessels, and nerve and brain injury, mostly
            in rats and mice. A 2025 systematic review of musculoskeletal research screened 544 articles and kept 36: 35 animal
            studies and 1 human study (<A href={U.vasireddi}>Vasireddi et al., HSS Journal, 2025</A>). <strong>Animal results have not been confirmed in people.</strong>
          </p>
        </div>

        <h3 className="h3">What reviewers concluded</h3>
        <ul className="list">
          <li>FDA’s own scientists, in a July 2026 briefing, recommended against adding BPC-157 to the compounding list. They found the human trials too small and too short to establish safety or effectiveness. <Src href={U.fdaBriefing} label="FDA briefing document" /></li>
          <li>FDA’s advisory committee voted 8 to 6, with 1 abstention, on July 23, 2026, to recommend adding it anyway. <Src href={U.ajmc} label="AJMC" /></li>
        </ul>
      </Sec>

      <Sec n={3} title="US position">
        <p className="bodyLead">
          Not FDA-approved for any use. Since October 30, 2026, HHS has said it will not take enforcement action against licensed
          pharmacies and physicians that compound it under set conditions. That is enforcement discretion, not approval. As of
          October 31, 2026.
        </p>
        <ul className="list">
          <li><strong>FDA approval:</strong> none. FDA’s July 2026 briefing says no approved product containing BPC-157 exists in any country. <Src href={U.fdaBriefing} /></li>
          <li><strong>HHS interim policy:</strong> the “Enforcement Discretion Policy Regarding 503A Compounding Using Certain Peptide Bulk Drug Substances” was filed October 28, 2026 and published October 30, 2026 (Docket HHS-OASH-2026-0496). It covers BPC-157, TB-500, KPV, MOTS-c, Epitalon and Semax. <Src href={U.fedReg} /></li>
          <li><strong>What it does:</strong> HHS does not intend to act against state-licensed pharmacies, federal facilities or licensed physicians compounding these peptides, if every condition in the policy is met. <Src href={U.hhsAppendix} /></li>
          <li><strong>What it does not do:</strong> it does not add BPC-157 to FDA’s 503A bulks list, does not make it FDA-approved, and is not binding on HHS. HHS may revisit it if a safety or quality problem appears. No end date was set; it runs while FDA completes rulemaking.</li>
          <li><strong>Before this policy:</strong> FDA placed BPC-157 in 503A “Category 2” (substances with potential safety risks) in 2023. By April 2026 it was moved to a list of substances whose nominations were withdrawn. <Src href={U.fdaCat2} /></li>
          <li><strong>Controlled substance:</strong> no. It is not on the DEA’s controlled substances list.</li>
          <li><strong>Military:</strong> listed as prohibited for service members by the Department of Defense’s Operation Supplement Safety. <Src href={U.opss} /></li>
        </ul>
        <p className="callout">Compounded drugs are not FDA-approved. FDA does not review their safety, effectiveness or quality before they are sold.</p>
      </Sec>

      <Sec n={4} title="Around the world" warm>
        <p className="bodyLead">
          No regulator anywhere has approved BPC-157 as a medicine. Australia makes it prescription-only, Canada has seized it as an
          unauthorized drug, and it is banned in sport worldwide.
        </p>
        <div className="countries">
          {COUNTRIES.map((c) => (
            <article className={c.sources ? 'country' : 'country countryPending'} key={c.country}>
              <h3 className="countryName">{c.country}</h3>
              <p className="regulator">{c.regulator}</p>
              <dl className="facts">
                <Fact k="Status">{c.status}</Fact>
                <Fact k="Checked">{c.checked ?? '—'}</Fact>
                <Fact k="Source">
                  {c.sources
                    ? c.sources.map((s, i) => <span key={s}>{i > 0 ? ' and ' : null}<A href={s} /></span>)
                    : '—'}
                </Fact>
              </dl>
            </article>
          ))}
        </div>
        <div className="sport">
          <h3 className="h3">Sport</h3>
          <p>
            BPC-157 is prohibited at all times under class S0 (non-approved substances) on the WADA Prohibited List. It is named on
            the 2026 list and the 2027 list, which takes effect January 1, 2027. Sources: <A href={U.wada2026} /> and <A href={U.wada2027} />.
            USADA says a therapeutic use exemption is unlikely to be granted: <A href={U.usada} />
          </p>
        </div>
      </Sec>

      <Sec n={5} title="Documented side effects">
        <p className="bodyLead">
          The published human studies reported no adverse events, but they covered 30 people over weeks to months. Long-term human
          safety has not been studied.
        </p>
        <ul className="list">
          <li><strong>Published human studies:</strong> no adverse events were reported in the bladder study (12 people) or the IV study (2 people). The knee study did not describe how it screened for side effects.</li>
          <li><strong>FDA adverse event reports:</strong> FDA’s reporting system has logged 10 serious reports tied to BPC-157 since 2021, 8 of them in 2026. Reports like these do not show that BPC-157 caused the event. <Src href={U.ajmc} /></li>
          <li><strong>FDA-identified risks:</strong> FDA lists a risk of immune reactions (immunogenicity) and peptide-related impurities in compounded versions. <Src href={U.fdaCat2} /></li>
          <li><strong>Product quality:</strong> Health Canada has seized unauthorized injectable peptide products, including BPC-157, sold online. <Src href={U.canada} /></li>
        </ul>
      </Sec>

      <Sec n={6} title="Talk to a clinician" warm>
        <p className="bodyLead">
          Questions about whether BPC-157 fits your situation? Talk to a licensed clinician at <A href={CLINIC}>Adonis Clinical</A>.
        </p>
        <a href={CLINIC} className="btn btnGold btnHuge" data-cta="clinician">Talk to a licensed clinician at Adonis Clinical</a>
      </Sec>

      <section className="section">
        <div className="wrap">
          <div className="secHead"><h2 className="h2">Sources — all checked October 31, 2026</h2></div>
          <ol className="sources">
            {SOURCES.map((s) => <li key={s}><A href={s} /></li>)}
          </ol>
        </div>
      </section>
    </>
  );
}
