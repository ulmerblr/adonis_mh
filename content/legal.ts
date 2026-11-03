/**
 * EDU PROMPT 34: the Legal highlight (Home card, monthly) and the laws listed on /legal. Federal law only for now.
 * To replace the highlight: run `node --experimental-strip-types scripts/archive-legal.mjs` (saves the current highlight to
 * content/archive/legal/ with its dates), then edit LEGAL. Text: [[/slug|words]] links a treatment, [^key] a note.
 * Tone: the law and the regulators' own records, neutral; the reader decides.
 */
export type LegalNote = { key: string; source: string; title: string; date: string; url: string };
export type LegalHighlight = { month: string; published: string; headline: string; cardSummary: string; body: string[]; notes: LegalNote[] };
export type Law = { id: string; name: string; summary: string; treatments: string[]; text: { label: string; url: string }[]; checked: string };

export const LEGAL_NOTE = 'This section reports the law and the regulators’ own records. It is not legal advice.';

const DEA_LIST = 'https://www.deadiversion.usdoj.gov/schedules/orangebook/c_cs_alpha.pdf';
const EXT4 = 'https://www.govinfo.gov/content/pkg/FR-2025-12-31/pdf/2025-24123.pdf';
const RH = 'https://www.govinfo.gov/content/pkg/PLAW-110publ425/pdf/PLAW-110publ425.pdf';
const USC829 = 'https://www.govinfo.gov/content/pkg/USCODE-2023-title21/html/USCODE-2023-title21-chap13-subchapI-partC-sec829.htm';
const USC802 = 'https://www.govinfo.gov/content/pkg/USCODE-2023-title21/html/USCODE-2023-title21-chap13-subchapI-partA-sec802.htm';
const NPRM = 'https://www.govinfo.gov/content/pkg/FR-2025-01-17/pdf/2025-01099.pdf';

export const LEGAL: LegalHighlight = {
  month: 'November 2026',
  published: 'Nov 3, 2026',
  headline: 'The telehealth cliff',
  cardSummary:
    'Since 2020, federal rules have let practitioners prescribe many controlled medications by video without first seeing the patient in person. The fourth extension of these rules runs through December 31, 2026. Unless DEA and HHS act again, the Ryan Haight Act’s in-person evaluation requirement would return. DEA’s special registration rule, proposed in January 2025, is not final. Nine treatments on this site, including testosterone, ketamine and phentermine, are Schedule III or IV controlled substances.',
  body: [
    'Since March 2020, the Drug Enforcement Administration (DEA) has allowed practitioners to prescribe controlled medications by telemedicine without first examining the patient in person. These temporary “telemedicine flexibilities” have been extended four times. The latest extension was published in the Federal Register on December 31, 2025. DEA and the Department of Health and Human Services (HHS) said they were “issuing a fourth extension of telemedicine flexibilities for the prescribing of controlled medications through December 31, 2026.”[^ext4] The rule states: “This rule is effective January 1, 2026 through December 31, 2026.”[^ext4] The earlier extensions ran through November 11, 2023, December 31, 2024 and December 31, 2025.[^ext4]',
    'What the law requires without the flexibilities. The Ryan Haight Online Pharmacy Consumer Protection Act of 2008 (Public Law 110-425) amended the Controlled Substances Act.[^rh] It says no prescription-drug controlled substance “may be delivered, distributed, or dispensed by means of the Internet without a valid prescription.”[^usc829] A valid prescription must come from “a practitioner who has conducted at least 1 in-person medical evaluation of the patient” or from a covering practitioner.[^usc829] The law defines that evaluation as one “conducted with the patient in the physical presence of the practitioner”.[^usc829] It exempts seven defined kinds of telemedicine.[^usc802] DEA describes the end of the flexibilities as “the reinstatement of the pre-pandemic restrictions imposed by the CSA,” commonly called the telemedicine cliff.[^ext4]',
    'The special registration rule. One of the law’s exemptions is a DEA special registration for telemedicine.[^usc802] DEA proposed rules for it on January 17, 2025. The proposal “would establish a Special Registration framework and authorize three types of Special Registration.”[^nprm] As of November 3, 2026, no final rule has been published in the Federal Register.[^frapi] DEA’s 2026 regulatory agenda places the rule at the final rule stage and lists final action for November 2026, a projection rather than a commitment.[^agenda]',
    'Controlled substances on this site. DEA’s alphabetical list of controlled substances, dated October 21, 2026, and DEA’s regulations place these treatments in federal schedules.[^dea][^cfr] In Schedule III are [[/testosterone|testosterone]], including its esters such as [[/testosterone-enanthate|testosterone enanthate]] and [[/testosterone-undecanoate|testosterone undecanoate]], and [[/nandrolone|nandrolone]], as anabolic steroids (DEA code 4000), and [[/ketamine|ketamine]] (7285), whose listing covers “its salts, isomers, and salts of isomers,” which includes [[/esketamine|esketamine]].[^dea][^cfr] In Schedule IV are [[/modafinil|modafinil]] (1680), whose listing covers its isomers, which includes [[/armodafinil|armodafinil]], and [[/phentermine|phentermine]] (1640).[^dea][^cfr] [[/psilocybin|Psilocybin]] (7437) is in Schedule I.[^dea]',
    'Several treatments that readers sometimes assume are scheduled are not on DEA’s list, including [[/dhea|DHEA]], [[/hcg|hCG]], the SARMs [[/enobosarm|enobosarm]], [[/lgd-4033|LGD-4033]] and [[/rad-140|RAD-140]], [[/melatonin|melatonin]] and [[/bpc-157|BPC-157]].[^dea] The legal definition of “anabolic steroid” expressly excludes “dehydroepiandrosterone.”[^usc802] [[/kratom|Kratom]] and mitragynine are not listed; three related synthetic compounds, including mitragynine pseudoindoxyl, have been temporarily placed in Schedule I since August 26, 2026.[^kratom]',
    'This page describes federal law only. State laws may differ.',
  ],
  notes: [
    { key: 'ext4', source: 'DEA and HHS, Federal Register', title: 'Fourth Temporary Extension of COVID-19 Telemedicine Flexibilities for Prescription of Controlled Medications (90 FR 61301)', date: 'Dec 31, 2025', url: EXT4 },
    { key: 'rh', source: 'U.S. Congress (govinfo)', title: 'Public Law 110-425, Ryan Haight Online Pharmacy Consumer Protection Act of 2008', date: 'Oct 15, 2008', url: RH },
    { key: 'usc829', source: 'U.S. Code (govinfo)', title: '21 U.S.C. 829(e), controlled substances dispensed by means of the Internet', date: '2023 edition, checked Nov 3, 2026', url: USC829 },
    { key: 'usc802', source: 'U.S. Code (govinfo)', title: '21 U.S.C. 802, definitions (anabolic steroid; practice of telemedicine)', date: '2023 edition, checked Nov 3, 2026', url: USC802 },
    { key: 'nprm', source: 'DEA, Federal Register', title: 'Special Registrations for Telemedicine and Limited State Telemedicine Registrations, proposed rule (90 FR 6541)', date: 'Jan 17, 2025', url: NPRM },
    { key: 'frapi', source: 'Federal Register (API)', title: 'DEA documents matching “telemedicine”', date: 'checked Nov 3, 2026', url: 'https://www.federalregister.gov/api/v1/documents.json?conditions[term]=telemedicine&conditions[agencies][]=drug-enforcement-administration' },
    { key: 'agenda', source: 'OMB/OIRA, Reginfo.gov', title: 'Unified Agenda 2026, RIN 1117-AB40', date: 'checked Nov 3, 2026', url: 'https://www.reginfo.gov/public/do/eAgendaViewRule?pubId=202510&RIN=1117-AB40' },
    { key: 'dea', source: 'DEA Diversion Control Division', title: 'Controlled Substances, Alphabetical Order', date: 'Oct 21, 2026', url: DEA_LIST },
    { key: 'cfr', source: 'eCFR', title: '21 CFR part 1308, schedules of controlled substances', date: 'current as of Oct 30, 2026', url: 'https://www.ecfr.gov/current/title-21/chapter-II/part-1308' },
    { key: 'kratom', source: 'DEA, Federal Register', title: 'Temporary Placement of Mitragynine Pseudoindoxyl, MGM-15, and MGM-16 in Schedule I (91 FR 54948)', date: 'Aug 26, 2026', url: 'https://www.govinfo.gov/content/pkg/FR-2026-08-26/pdf/2026-17429.pdf' },
  ],
};

const CHECKED = 'Nov 3, 2026';
const RX_CONTROLLED = ['testosterone', 'testosterone-enanthate', 'testosterone-undecanoate', 'nandrolone', 'ketamine', 'esketamine', 'modafinil', 'armodafinil', 'phentermine'];

export const LAWS: Law[] = [
  { id: 'controlled-substances-act', name: 'Controlled Substances Act schedules',
    summary: 'The Controlled Substances Act sorts regulated drugs into five schedules. Schedule I is for substances with a high potential for abuse and no currently accepted medical use; Schedules II to V cover accepted medicines with decreasing potential for abuse. DEA keeps the current lists in 21 CFR 1308.11 to 1308.15, and each substance has a four-digit DEA code. Anabolic steroids are placed in Schedule III by statute.',
    treatments: [...RX_CONTROLLED, 'psilocybin'],
    text: [{ label: '21 U.S.C. 812 (govinfo)', url: 'https://www.govinfo.gov/content/pkg/USCODE-2023-title21/html/USCODE-2023-title21-chap13-subchapI-partB-sec812.htm' }, { label: '21 CFR part 1308 (eCFR)', url: 'https://www.ecfr.gov/current/title-21/chapter-II/part-1308' }, { label: 'DEA list, alphabetical (Oct 21, 2026)', url: DEA_LIST }], checked: CHECKED },
  { id: 'anabolic-steroid-acts', name: 'Anabolic Steroids Control Act of 1990 and Anabolic Steroid Control Act of 2004',
    summary: 'The 1990 Act added anabolic steroids to Schedule III and created the legal definition of an anabolic steroid. The 2004 Act rewrote that definition, named specific steroids and prohormones, and listed DHEA among the substances excluded from it. As a result, testosterone, nandrolone and their esters are Schedule III, and DHEA is not a federally controlled substance.',
    treatments: ['testosterone', 'testosterone-enanthate', 'testosterone-undecanoate', 'nandrolone', 'dhea'],
    text: [{ label: 'Pub. L. 101-647 (1990), 104 Stat. 4789 (govinfo)', url: 'https://www.govinfo.gov/content/pkg/STATUTE-104/pdf/STATUTE-104-Pg4789.pdf' }, { label: 'Pub. L. 108-358 (2004) (govinfo)', url: 'https://www.govinfo.gov/content/pkg/PLAW-108publ358/pdf/PLAW-108publ358.pdf' }, { label: '21 U.S.C. 802(41), current definition (govinfo)', url: USC802 }], checked: CHECKED },
  { id: 'designer-anabolic-steroid-act', name: 'Designer Anabolic Steroid Control Act of 2014',
    summary: 'This law added more named steroids to the definition of an anabolic steroid and covered unlisted substances that are structurally similar to a listed steroid and are made or marketed to promote muscle growth or testosterone-like effects. It created a faster process for scheduling anabolic steroids and added labeling requirements; DEA conformed its regulations in 2023. It does not name the SARMs on this site, which are not steroids.',
    treatments: [],
    text: [{ label: 'Pub. L. 113-260 (govinfo)', url: 'https://www.govinfo.gov/content/pkg/PLAW-113publ260/pdf/PLAW-113publ260.pdf' }, { label: 'DEA implementing rule, 88 FR 50036 (2023)', url: 'https://www.govinfo.gov/content/pkg/FR-2023-08-01/pdf/2023-15747.pdf' }], checked: CHECKED },
  { id: 'ryan-haight-act', name: 'Ryan Haight Online Pharmacy Consumer Protection Act of 2008',
    summary: 'The Act bars delivering, distributing or dispensing a prescription-drug controlled substance by means of the Internet without a valid prescription. A valid prescription generally requires at least one in-person medical evaluation by the prescriber, or a covering practitioner. Seven defined kinds of telemedicine are exempt, including a DEA special registration, which has not yet been put in place, and rules issued jointly by DEA and HHS, the basis for the temporary flexibilities.',
    treatments: RX_CONTROLLED,
    text: [{ label: 'Pub. L. 110-425 (govinfo)', url: RH }, { label: '21 U.S.C. 829(e) (govinfo)', url: USC829 }, { label: '21 U.S.C. 802(54) (govinfo)', url: USC802 }], checked: CHECKED },
  { id: 'telemedicine-flexibilities', name: 'DEA’s telemedicine flexibilities',
    summary: 'Since March 2020, DEA and HHS have let DEA-registered practitioners prescribe Schedule II to V controlled medications by audio-video telemedicine without a prior in-person evaluation, first under emergency exceptions and then under four temporary rules. The fourth rule keeps these flexibilities through December 31, 2026. A proposed special registration rule (January 2025) has not been finalized.',
    treatments: RX_CONTROLLED,
    text: [{ label: 'Fourth temporary rule, 90 FR 61301 (Dec 31, 2025)', url: EXT4 }, { label: 'Special registration proposed rule, 90 FR 6541 (Jan 17, 2025)', url: NPRM }], checked: CHECKED },
  { id: 'compounding-503a-503b', name: 'FD&C Act sections 503A and 503B (compounding)',
    summary: 'Section 503A exempts drugs compounded for an identified individual patient by a licensed pharmacist in a state-licensed pharmacy or federal facility, or by a licensed physician, from certain FD&C Act requirements, including new-drug approval, when the section’s conditions are met. Section 503B gives a separate pathway to outsourcing facilities registered with FDA, with limits on which bulk drug substances they may use. Compounded drugs are not FDA approved.',
    treatments: ['semaglutide', 'tirzepatide', 'bpc-157', 'tb-500', 'kpv', 'mots-c', 'epitalon', 'semax', 'sermorelin', 'ipamorelin', 'cjc-1295', 'hcg', 'gonadorelin', 'nad', 'glutathione', 'oxytocin', 'alprostadil', 'papaverine', 'phentolamine'],
    text: [{ label: '21 U.S.C. 353a (govinfo)', url: 'https://www.govinfo.gov/content/pkg/USCODE-2023-title21/html/USCODE-2023-title21-chap9-subchapV-partA-sec353a.htm' }, { label: '21 U.S.C. 353b (govinfo)', url: 'https://www.govinfo.gov/content/pkg/USCODE-2023-title21/html/USCODE-2023-title21-chap9-subchapV-partA-sec353b.htm' }], checked: CHECKED },
  { id: 'dshea', name: 'Dietary Supplement Health and Education Act of 1994 (DSHEA)',
    summary: 'DSHEA created the legal category of dietary supplement: a product taken by mouth that contains a dietary ingredient such as a vitamin, mineral, herb or amino acid, and is labeled as a supplement. A supplement is regulated as a food, not a drug, so it needs no FDA approval before sale. An article approved, or first substantially investigated, as a drug generally cannot be sold as a supplement unless it was marketed as one first.',
    treatments: ['alpha-gpc', 'ashwagandha', 'biotin', 'creatine', 'fadogia-agrestis', 'fisetin', 'glycine', 'l-arginine', 'l-citrulline', 'magnesium', 'nicotinamide-riboside', 'pumpkin-seed-oil', 'resveratrol', 'saw-palmetto', 'tongkat-ali', 'tribulus-terrestris', 'urolithin-a', 'melatonin', 'dhea', 'nmn', 'yohimbine'],
    text: [{ label: 'Pub. L. 103-417, 108 Stat. 4325 (govinfo)', url: 'https://www.govinfo.gov/content/pkg/STATUTE-108/pdf/STATUTE-108-Pg4325.pdf' }, { label: '21 U.S.C. 321(ff) (govinfo)', url: 'https://www.govinfo.gov/content/pkg/USCODE-2023-title21/html/USCODE-2023-title21-chap9-subchapII-sec321.htm' }], checked: CHECKED },
  { id: 'research-use-only', name: 'FDA’s position on “research use only” products',
    summary: 'FDA says that drugs labeled for research purposes or not for human consumption, but sold to consumers for human use, are illegally sold, unapproved drugs. Its GLP-1 statement names semaglutide, tirzepatide, retatrutide, survodutide and mazdutide, and it says SARMs sold for research use only are unapproved drugs. For the other research-use-only products on this site, FDA has stated the general position; it has not named each of them.',
    treatments: ['5-amino-1mq', 'dihexa', 'elamipretide', 'enobosarm', 'epitalon', 'foxo4-dri', 'hexarelin', 'humanin', 'ibutamoren', 'igf-1-lr3', 'klotho', 'kp1', 'lgd-4033', 'mazdutide', 'melanotan-ii', 'p21', 'pyrilutamide', 'rad-140', 'retatrutide', 'ru58841', 'survodutide', 'tb-500', 'thymalin'],
    text: [{ label: 'FDA, “FDA’s concerns with unapproved GLP-1 drugs used for weight loss”', url: 'https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss' }, { label: 'FDA Consumer Update on SARMs', url: 'https://www.fda.gov/consumers/consumer-updates/fda-warns-use-selective-androgen-receptor-modulators-sarms-among-teens-young-adults' }], checked: CHECKED },
  { id: 'hhs-peptide-policy', name: 'HHS interim peptide compounding policy (October 2026)',
    summary: 'On October 30, 2026, HHS published notice of an interim policy: while FDA develops the 503A bulks list through rulemaking, HHS does not intend to take enforcement action against state-licensed pharmacies, federal facilities or licensed physicians that compound drugs using the peptides listed in the policy’s Appendix A, when its conditions are met. The notice says compounded drugs are not FDA approved and that the policy is not binding. The Federal Register notice does not list the peptides; HHS’s appendix could not be opened, so the six named here (BPC-157, TB-500, KPV, MOTS-c, Epitalon and Semax) come from a law firm’s summary.',
    treatments: ['bpc-157', 'tb-500', 'kpv', 'mots-c', 'epitalon', 'semax'],
    text: [{ label: 'HHS notice, 91 FR 68526 (Oct 30, 2026) (govinfo)', url: 'https://www.govinfo.gov/content/pkg/FR-2026-10-30/pdf/2026-22192.pdf' }], checked: CHECKED },
];

/** Past highlights (empty for now; see content/archive/legal/). */
export const PAST: { month: string; headline: string; ran: string }[] = [];
