import { A, CLINIC, Src } from '@/components/ext';
import { Fact, type TreatmentData } from '@/components/treatment/template';
import { WorldMap, type MapRegion } from '@/components/treatment/world-map';
import { TRACKS } from '@/lib/tracks';

/* BPC-157: the treatment's data for the treatment page template (components/treatment/template.tsx). */

const U = {
  hsieh: 'https://www.nature.com/articles/s41598-020-74022-y',
  pmcReview: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12446177/',
  chang: 'https://journals.physiology.org/doi/full/10.1152/japplphysiol.00945.2010',
  vasireddi: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12313605/',
  knee: 'https://pubmed.ncbi.nlm.nih.gov/34324435/',
  bladder: 'https://pubmed.ncbi.nlm.nih.gov/39325560/',
  iv: 'https://pubmed.ncbi.nlm.nih.gov/40131143/',
  veljaca: 'https://www.semanticscholar.org/paper/7cc5b526006d9ecc959aa09ede50cfb12b751787',
  fdaBriefing: 'https://www.fda.gov/media/193343/download',
  nct: 'https://clinicaltrials.gov/study/NCT02637284',
  nctHamstring: 'https://clinicaltrials.gov/study/NCT07437547',
  healio: 'https://www.healio.com/news/primary-care/20260724/fda-committee-recommends-looser-restrictions-for-several-peptides',
  nctTb500Fictional: 'https://clinicaltrials.gov/study/NCT07487363',
  nctRotator: 'https://clinicaltrials.gov/study/NCT07803250',
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
  fedRegOfficial: 'https://www.govinfo.gov/content/pkg/FR-2026-10-30/pdf/2026-22192.pdf',
  bakerSummary: 'https://www.bakerlaw.com/insights/hhs-issues-enforcement-discretion-policy-regarding-503a-compounding-using-certain-peptide-bulk-drug-substances/',
};

type Country = MapRegion;
const COUNTRIES: Country[] = [
  { country: 'United States', regulator: 'FDA / HHS', status: 'Not approved. Compounding under HHS enforcement discretion.', checked: 'Oct 31, 2026', sources: [U.fedReg], iso: ['840'], tone: 'discretion' },
  { country: 'Canada', regulator: 'Health Canada', status: 'Not approved. Named among unauthorized injectable peptides seized.', checked: 'Oct 31, 2026', sources: [U.canada], iso: ['124'], tone: 'not' },
  { country: 'Australia', regulator: 'TGA', status: 'Not approved (not in the ARTG). Prescription-only (Schedule 4); possession without authority is illegal (Appendix D).', checked: 'Oct 31, 2026', sources: [U.ausSport, U.ausLeg], iso: ['036'], tone: 'rx' },
  { country: 'United Kingdom', regulator: 'MHRA', status: 'Status being confirmed with the regulator’s record.', iso: ['826'], tone: 'pending' },
  { country: 'EU / Germany', regulator: 'EMA / BfArM', status: 'Status being confirmed with the regulator’s record.', iso: ['040', '056', '100', '191', '196', '203', '208', '233', '246', '250', '276', '300', '348', '372', '380', '428', '440', '442', '470', '528', '616', '620', '642', '703', '705', '724', '752'], tone: 'pending' },
  { country: 'China', regulator: 'NMPA', status: 'Status being confirmed with the regulator’s record.', iso: ['156'], tone: 'pending' },
  { country: 'India', regulator: 'CDSCO', status: 'Status being confirmed with the regulator’s record.', iso: ['356'], tone: 'pending' },
  { country: 'Russia', regulator: 'Roszdravnadzor', status: 'Status being confirmed with the regulator’s record.', iso: ['643'], tone: 'pending' },
];

export const bpc157: TreatmentData = {
  slug: 'bpc-157',
  name: 'BPC-157',
  lane: 'recovery',
  peptide: true,
  statusLine: 'Statuses as of October 31, 2026. Clinical review: pending.',
  track: TRACKS['bpc-157'],
  sections: [
    {
      title: 'What it is',
      body: (
        <>
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
        </>
      ),
    },
    {
      title: 'Research',
      body: (
        <>
        <p className="bodyLead">
          Human evidence: five published studies, about 80 people in total, according to FDA’s July 2026 review. Two were run in
          Croatia in the early 2000s and three in Florida since 2021. Two more randomized trials are registered but have no results yet.
        </p>
        <p className="body">Each is listed below exactly as it was run.</p>

        <h3 className="h3">Human studies</h3>
        <div className="cards">
          <article className="card">
            <span className="cardMeta">USA · 2021 · Retrospective chart review</span>
            <h4 className="cardTitle">Knee pain, 2021 (USA)</h4>
            <dl className="facts">
              <Fact k="Citation"><A href={U.knee}>Lee E, Padgett B. Altern Ther Health Med 2021;27(4):8-13</A></Fact>
              <Fact k="Where">one clinic, Orlando, Florida</Fact>
              <Fact k="Design">retrospective chart review. No control group, no placebo.</Fact>
              <Fact k="People">17 adults with chronic knee pain treated (FDA count); the paper reports outcomes for 16. Of those 16, 12 got BPC-157 alone and 4 got BPC-157 plus TB-500 (thymosin beta-4).</Fact>
              <Fact k="What was given">2 to 4 mg injected into the knee joint, once or twice</Fact>
              <Fact k="Length">patients contacted by phone 6 to 12 months later</Fact>
            </dl>
            <div className="found"><span className="label">Found</span>11 of 12 in the BPC-157-only group reported significant improvement; 3 of 4 in the combined group did. Pain was self-reported, not measured on a validated scale.</div>
          </article>

          <article className="card">
            <span className="cardMeta">USA · 2024 · Pilot study</span>
            <h4 className="cardTitle">Interstitial cystitis (bladder pain), 2024 (USA)</h4>
            <dl className="facts">
              <Fact k="Citation"><A href={U.bladder}>Lee E, Walker C, Ayadi B. Altern Ther Health Med 2024;30(10):12-17</A></Fact>
              <Fact k="Design">pilot study, one practice. No control group.</Fact>
              <Fact k="People">12 women aged 39 to 76 whose condition had not responded to pentosan polysulfate</Fact>
              <Fact k="What was given">10 mg injected into the bladder wall during cystoscopy, made by a 503A compounding pharmacy</Fact>
              <Fact k="Length">6 weeks</Fact>
            </dl>
            <div className="found"><span className="label">Found</span>10 of 12 reported full symptom resolution; 2 reported 80% resolution. No adverse events were reported.</div>
          </article>

          <article className="card">
            <span className="cardMeta">USA · 2025 · Safety pilot</span>
            <h4 className="cardTitle">Intravenous safety, 2025 (USA)</h4>
            <dl className="facts">
              <Fact k="Citation"><A href={U.iv}>Lee E, Burgess. Altern Ther Health Med 2025</A></Fact>
              <Fact k="Design">safety pilot. No control group.</Fact>
              <Fact k="People">2 healthy adults</Fact>
              <Fact k="What was given">10 mg by IV infusion on day 1, 20 mg on day 2</Fact>
            </dl>
            <div className="found"><span className="label">Found</span>no measurable change in heart, liver, kidney, thyroid or blood-sugar markers, and no side effects reported</div>
          </article>
        </div>
        <p className="under">The same lead author ran all three Florida studies.</p>

        <div className="cards" style={{ marginTop: 16 }}>
          <article className="card">
            <span className="cardMeta">Croatia · 2002 to 2005 · Conference abstracts</span>
            <h4 className="cardTitle">Ulcerative colitis program, 2002 to 2005 (Croatia, Pliva)</h4>
            <ul className="cardBullets">
              <li><strong>Phase I, healthy volunteers:</strong> <A href={U.veljaca}>Veljača M, et al. Gut 2003;51(Suppl III):A309</A> — and a 2002 abstract. 24 healthy people got BPC-157 by enema, up to 2 mg/kg once daily for 8 days. Most common side effects reported: headache and flatulence. BPC-157 was mostly not detectable in the blood.</li>
              <li><strong>Phase II, ulcerative colitis:</strong> Ruenzi M, et al. Gastroenterology 2005;128:A584. Multicenter, randomized, double-blind, placebo-controlled. 53 people with mild-to-moderate ulcerative colitis were split evenly between an 80 mg BPC-157 enema and a placebo enema, once daily for 2 weeks. 46 finished.</li>
              <li><strong>Phase II result:</strong> the disease activity score fell 3.2 points on BPC-157 and 1.6 points on placebo. The difference between groups was not statistically significant (95% confidence interval crossed zero). Three people on BPC-157 and two on placebo withdrew for adverse events, mainly worsening colitis.</li>
              <li><strong>Both exist only as conference abstracts. FDA called the Phase II data inadequate to show the enema works or is safe.</strong> <Src href={U.fdaBriefing} label="FDA briefing" /></li>
            </ul>
          </article>

          <article className="card">
            <span className="cardMeta">Mexico · 2015 · Registered trial</span>
            <h4 className="cardTitle">Oral safety trial, 2015 (Mexico): no results</h4>
            <ul className="cardBullets">
              <li><A href={U.nct}>NCT02637284</A>, sponsored by PharmaCotherapia. A randomized, placebo-controlled Phase I trial of BPC-157 tablets in 42 planned healthy volunteers aged 18 to 35, in Tijuana.</li>
              <li><strong>A results submission was withdrawn in 2016 before review. No data has been released.</strong></li>
            </ul>
          </article>
        </div>

        <h3 className="h3">Registered trials with no results yet</h3>
        <div className="cards">
          <article className="card">
            <span className="badge">No results yet</span>
            <span className="cardMeta">Registered trial · Phase 2</span>
            <h4 className="cardTitle">Hamstring strain, Phase 2</h4>
            <ul className="cardBullets">
              <li><A href={U.nctHamstring}>NCT07437547</A>, sponsored by Hudson Biotech. Randomized, double-blind, placebo-controlled, under-the-skin BPC-157 for MRI-confirmed grade II hamstring strain. Registered February 2026, recruiting, about 120 people planned.</li>
              <li>The same sponsor, Hudson Biotech, registered a TB-500 entry that describes itself as fictional: <A href={U.nctTb500Fictional}>NCT07487363</A>, first posted March 23, 2026.</li>
            </ul>
          </article>
          <article className="card">
            <span className="badge">No results yet</span>
            <span className="cardMeta">Registered trial · Phase 1 pilot</span>
            <h4 className="cardTitle">Rotator cuff surgery recovery, Phase 1 pilot</h4>
            <ul className="cardBullets">
              <li><A href={U.nctRotator}>NCT07803250</A>, sponsored by the University of Arkansas. Randomized, double-blind, placebo-controlled, daily under-the-skin injections for 90 days after surgery. Not yet recruiting; planned start January 2027.</li>
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
          <li>FDA’s scientists, in a briefing dated May 11, 2026 for the July meeting, recommended against adding BPC-157 to the compounding list. They found no human studies using the oral, under-the-skin, nasal or skin routes people actually use, and no human pharmacokinetic data for those routes. <Src href={U.fdaBriefing} label="FDA briefing" /></li>
          <li>FDA’s advisory committee voted 8 to 6, with 1 abstention, on July 23, 2026, to recommend adding it anyway, as reported by Healio from the July 23–24, 2026 meeting. FDA has not posted the official vote record. <Src href={U.ajmc} label="AJMC" /><Src href={U.healio} label="Healio, July 24, 2026" /></li>
        </ul>
        </>
      ),
    },
    {
      title: 'US position',
      body: (
        <>
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
          <li><strong>Routes and conditions:</strong> the policy names BPC-157 acetate, for injection under the skin or into muscle, and for products taken by mouth or applied to the skin. The conditions include a valid patient-specific prescription; only one active ingredient from the list; a bulk substance from an FDA-registered maker that follows good manufacturing practice, with a valid certificate of analysis; the label “This is a compounded drug product. Not for resale.”; documented adequate bioavailability for oral forms; serious adverse events and quality problems reported to FDA’s MedWatch; and an FDA-cleared syringe as the only packaged device. <Src href={U.fedRegOfficial} label="HHS notice, Federal Register 2026-22192, published Oct 30, 2026" /><Src href={U.bakerSummary} label="BakerHostetler summary of the policy, Oct 28, 2026 (a law firm’s summary, used because HHS’s policy appendix could not be opened)" /></li>
          <li><strong>What it does not cover:</strong> blends with other active ingredients, other routes or forms, outsourcing facilities (section 503B), or products sold as research chemicals or dietary supplements. It is interim: HHS may revise or withdraw it. <Src href={U.bakerSummary} label="BakerHostetler summary of the policy, Oct 28, 2026" /></li>
          <li><strong>Before this policy:</strong> FDA placed BPC-157 in 503A “Category 2” (substances with potential safety risks) in 2023. By April 2026 it was moved to a list of substances whose nominations were withdrawn. <Src href={U.fdaCat2} /></li>
          <li><strong>Controlled substance:</strong> no. It is not on the DEA’s controlled substances list.</li>
          <li><strong>Military:</strong> listed as prohibited for service members by the Department of Defense’s Operation Supplement Safety. <Src href={U.opss} /></li>
        </ul>
        <p className="callout">Compounded drugs are not FDA-approved. FDA does not review their safety, effectiveness or quality before they are sold.</p>
        </>
      ),
    },
    {
      title: 'Around the world',
      body: (
        <>
        <p className="bodyLead">
          No regulator anywhere has approved BPC-157 as a medicine. Australia makes it prescription-only, Canada has seized it as an
          unauthorized drug, and it is banned in sport worldwide.
        </p>
        <WorldMap regions={COUNTRIES} />
        <div className="countries">
          {COUNTRIES.map((c) => (
            <article className={c.sources ? 'card' : 'card countryPending'} key={c.country}>
              <h3 className="cardTitle">{c.country}</h3>
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
        <div className="card sport">
          <h3 className="cardTitle">Sport</h3>
          <p>
            BPC-157 is prohibited at all times under class S0 (non-approved substances) on the WADA Prohibited List. It is named on
            the 2026 list and the 2027 list, which takes effect January 1, 2027. Sources: <A href={U.wada2026} /> and <A href={U.wada2027} />.
            USADA says a therapeutic use exemption is unlikely to be granted: <A href={U.usada} />
          </p>
        </div>
        </>
      ),
    },
    {
      title: 'Documented side effects',
      body: (
        <>
        <p className="bodyLead">
          No serious adverse events were reported in the five human studies, but they were small and short, and safety monitoring
          was unclear in most. Animal studies and FDA’s adverse event reports have recorded specific findings, listed below.
        </p>
        <ul className="cardList">
          <li className="card"><strong>Human studies:</strong> in healthy volunteers given enemas, the most common side effects were headache and flatulence. In the colitis trial, 3 of the BPC-157 group withdrew for adverse events, mainly worsening colitis (2 on placebo did too). The bladder and IV studies reported none. <Src href={U.fdaBriefing} /></li>
          <li className="card"><strong>FDA adverse event reports through December 4, 2025:</strong> three reports, all injected BPC-157. One injection-site redness and swelling (with another peptide in use). One shortness of breath leading to an emergency room visit. One widespread skin darkening and darkened gums that returned when the product, a BPC-157 and TB-500 blend, was restarted. FDA could not establish that BPC-157 caused any of them. <Src href={U.fdaBriefing} /></li>
          <li className="card"><strong>Reports since then:</strong> FDA’s reporting system has logged 10 serious reports tied to BPC-157 since 2021, 8 of them in 2026. Reports like these do not show that BPC-157 caused the event. <Src href={U.ajmc} /></li>
          <li className="card"><strong>Animal toxicity studies:</strong> in 28-day injection studies, rats and dogs showed changes in blood-clotting time and liver-related blood markers (ALT, glucose, triglycerides). Lab tests found it does not damage DNA, and it caused no birth defects in pregnant rats. No cancer studies have been done. <Src href={U.fdaBriefing} /></li>
          <li className="card"><strong>FDA-identified risks:</strong> FDA lists a risk of immune reactions (immunogenicity) and peptide-related impurities in compounded versions, higher for injected and nasal forms. <Src href={U.fdaCat2} /></li>
          <li className="card"><strong>Product quality:</strong> Health Canada has seized unauthorized injectable peptide products, including BPC-157, sold online. <Src href={U.canada} /></li>
        </ul>
        </>
      ),
    },
    {
      title: 'Talk to a clinician',
      body: (
        <>
        <p className="bodyLead">
          Questions about BPC-157 and your own health belong with a licensed clinician. This site reports published research and regulator records; it does not offer, sell or prescribe any treatment.
        </p>
        <a href={CLINIC} className="btn btnLeather btnHuge" data-cta="clinician">Talk to a licensed clinician at Adonis Clinical</a>
        </>
      ),
    },
  ],
  sourcesTitle: 'Sources — all checked October 31, 2026',
};
