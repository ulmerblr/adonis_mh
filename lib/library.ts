/**
 * The library's lanes and treatments.
 *
 * Lanes match Adonis Clinical's, in Bill's order. Treatments are listed by active ingredient, one row per ingredient. No prices. Each lane is its own section here; Recovery holds BPC-157 and two more of the HHS peptides.
 *
 * A treatment shows a status only once its page exists with a dated, sourced record (`page`).
 */
export type LaneKey = 'trt' | 'weight' | 'recovery' | 'vitality' | 'energy' | 'sleep' | 'hair-loss' | 'skin' | 'longevity';

export const LANES: { key: LaneKey; name: string }[] = [
  { key: 'trt', name: 'TRT' },
  { key: 'weight', name: 'Weight' },
  { key: 'recovery', name: 'Recovery' },
  { key: 'vitality', name: 'Vitality' },
  { key: 'energy', name: 'Energy' },
  { key: 'sleep', name: 'Sleep' },
  { key: 'hair-loss', name: 'Hair loss' },
  { key: 'skin', name: 'Skin' },
  { key: 'longevity', name: 'Longevity' },
];

export type Treatment = {
  name: string;
  peptide?: boolean;
  /** Other names the finder's search matches: brands, codes, common names. */
  aka?: string[];
  /** Only when the treatment's page exists with a dated, sourced record. */
  page?: { href: string; evidence: string; fda: string; sport: string };
};

export const TREATMENTS: Record<LaneKey, Treatment[]> = {
  trt: [
    { name: 'Testosterone', page: { href: '/testosterone', evidence: 'Approved; large RCTs', fda: 'Approved (since 1953)', sport: 'Banned' } },
    { name: 'Enclomiphene', page: { href: '/enclomiphene', evidence: 'Phase 3; hormone endpoints', fda: 'Not approved', sport: 'Banned (S4)' } },
    { name: 'Anastrozole', page: { href: '/anastrozole', evidence: 'Approved; small male RCTs', fda: 'Approved (Arimidex)', sport: 'Banned (S4)' } },
    { name: 'Human chorionic gonadotropin (hCG)', page: { href: '/hcg', evidence: 'Approved; few TRT studies', fda: 'Approved (Novarel)', sport: 'Banned (males)' } },
  ],
  weight: [
    { name: 'Semaglutide', peptide: true, page: { href: '/semaglutide', evidence: 'Approved; large RCTs', fda: 'Approved (Wegovy)', sport: 'Not prohibited' } },
    { name: 'Tirzepatide', peptide: true, page: { href: '/tirzepatide', evidence: 'Approved; large RCTs', fda: 'Approved (Zepbound)', sport: 'Not prohibited' } },
  ],
  recovery: [
    { name: 'BPC-157', peptide: true, page: { href: '/bpc-157', evidence: '5 studies, ~80 people', fda: 'Not approved; HHS discretion', sport: 'Banned' } },
    { name: 'TB-500 (thymosin beta-4 fragment)', peptide: true, page: { href: '/tb-500', evidence: '3-case report; no trials', fda: 'Not approved; HHS discretion', sport: 'Banned (S2)' } },
    { name: 'KPV', peptide: true, page: { href: '/kpv', evidence: 'Animal and cell only', fda: 'Not approved; HHS discretion', sport: 'Not listed' } },
  ],
  vitality: [
    { name: 'Sildenafil', page: { href: '/sildenafil', evidence: 'Approved; many RCTs', fda: 'Approved (Viagra)', sport: 'Not listed' } },
    { name: 'Tadalafil', page: { href: '/tadalafil', evidence: 'Approved; many RCTs', fda: 'Approved (Cialis)', sport: 'Not listed' } },
    { name: 'Vardenafil', page: { href: '/vardenafil', evidence: 'Approved; many RCTs', fda: 'Approved (Levitra)', sport: 'Not listed' } },
    { name: 'Oxytocin', peptide: true, page: { href: '/oxytocin', evidence: 'Few small studies in men', fda: 'Approved (Pitocin)', sport: 'Not listed' } },
    { name: 'Bremelanotide (PT-141)', peptide: true, page: { href: '/bremelanotide', evidence: 'Women RCTs; few in men', fda: 'Approved (Vyleesi)', sport: 'Not listed' } },
    { name: 'Sertraline (Zoloft)', page: { href: '/sertraline', evidence: 'Approved; small PE RCTs', fda: 'Approved (Zoloft)', sport: 'Not listed' } },
  ],
  energy: [
    { name: 'Vitamin B12', page: { href: '/vitamin-b12', evidence: '2 small placebo trials', fda: 'Approved (deficiency)', sport: 'Not listed' } },
    { name: 'Vitamin B6 (pyridoxine)', page: { href: '/vitamin-b6', evidence: 'No energy trials found', fda: 'Approved (deficiency)', sport: 'Not listed' } },
    { name: 'Methionine', page: { href: '/methionine', evidence: 'No trials found', fda: 'Not approved', sport: 'Not listed' } },
    { name: 'Inositol', page: { href: '/inositol', evidence: 'No trials found', fda: 'Not approved', sport: 'Not listed' } },
    { name: 'Choline', page: { href: '/choline', evidence: 'No trials found', fda: 'Not approved (energy)', sport: 'Not listed' } },
    { name: 'L-carnitine', page: { href: '/l-carnitine', evidence: 'Approved; few energy RCTs', fda: 'Approved (Carnitor)', sport: 'Not listed' } },
    { name: 'Semax', peptide: true, page: { href: '/semax', evidence: 'Small Russian studies', fda: 'Not approved; HHS discretion', sport: 'Not listed' } },
  ],
  sleep: [
    { name: 'Sermorelin', peptide: true, page: { href: '/sermorelin', evidence: 'No sleep or aging RCTs', fda: 'Was approved (Geref)', sport: 'Banned' } },
    { name: 'Glycine', page: { href: '/glycine', evidence: 'Little sleep research', fda: 'Not a drug for sleep', sport: 'Not listed' } },
  ],
  'hair-loss': [
    { name: 'Finasteride', page: { href: '/finasteride', evidence: 'Approved; many RCTs', fda: 'Approved (Propecia)', sport: 'Not listed' } },
    { name: 'Minoxidil', page: { href: '/minoxidil', evidence: 'Topical: RCTs; oral: few', fda: 'Topical OTC (Rogaine)', sport: 'Not listed' } },
    { name: 'Latanoprost', page: { href: '/latanoprost', evidence: '2 pilots; 1 trial running', fda: 'Approved (Xalatan)', sport: 'Not listed' } },
    { name: 'Ketoconazole', page: { href: '/ketoconazole', evidence: 'Few small studies', fda: 'Approved (Nizoral)', sport: 'Not listed' } },
    { name: 'Tretinoin', page: { href: '/tretinoin', evidence: 'Acne: approved; hair: few', fda: 'Approved (Retin-A)', sport: 'Not listed' } },
    { name: 'Biotin', page: { href: '/biotin', evidence: 'Little research', fda: 'Supplement, not drug', sport: 'Not listed' } },
    { name: 'Fluocinolone', page: { href: '/fluocinolone', evidence: 'No hair-loss studies', fda: 'Approved (Synalar)', sport: 'S9 (some routes)' } },
    { name: 'Melatonin (topical)', page: { href: '/melatonin', evidence: '1 pilot RCT; open studies', fda: 'Not approved', sport: 'Not listed' } },
  ],
  skin: [
    { name: 'Tretinoin', page: { href: '/tretinoin', evidence: 'Acne: approved; hair: few', fda: 'Approved (Retin-A)', sport: 'Not listed' } },
    { name: 'Azelaic acid', page: { href: '/azelaic-acid', evidence: 'Approved; 2 rosacea RCTs', fda: 'Approved (Finacea)', sport: 'Not listed' } },
    { name: 'Niacinamide', page: { href: '/niacinamide', evidence: 'Few small trials', fda: 'Not approved (skin)', sport: 'Not listed' } },
    { name: 'Doxycycline', page: { href: '/doxycycline', evidence: 'Approved; RCTs (rosacea)', fda: 'Approved (Vibramycin)', sport: 'Not listed' } },
    { name: 'GHK-Cu (copper peptide)', peptide: true, page: { href: '/ghk-cu', evidence: '1 small RCT; lab/animal', fda: 'Not approved', sport: 'Not listed' } },
    { name: 'Spironolactone', page: { href: '/spironolactone', evidence: 'Acne RCTs in women only', fda: 'Approved (Aldactone)', sport: 'Banned' } },
    { name: 'Estriol', page: { href: '/estriol', evidence: '2 small studies in women', fda: 'Not approved', sport: 'Not listed' } },
  ],
  longevity: [
    { name: 'NAD+', page: { href: '/nad', evidence: 'Few small human studies', fda: 'Not approved', sport: 'Not listed' } },
    { name: 'Nicotinamide riboside', page: { href: '/nicotinamide-riboside', evidence: 'Oral RCTs; IV: 1 review', fda: 'Not approved (suppl.)', sport: 'Not listed' } },
    { name: 'Glutathione', page: { href: '/glutathione', evidence: 'Small trials, not aging', fda: 'Not approved', sport: 'Not listed' } },
    { name: 'Metformin', page: { href: '/metformin', evidence: 'Approved; aging data thin', fda: 'Approved (Glucophage)', sport: 'Not listed' } },
    { name: 'GHK-Cu (copper peptide)', peptide: true, page: { href: '/ghk-cu', evidence: '1 small RCT; lab/animal', fda: 'Not approved', sport: 'Not listed' } },
    { name: 'Sermorelin', peptide: true, page: { href: '/sermorelin', evidence: 'No sleep or aging RCTs', fda: 'Was approved (Geref)', sport: 'Banned' } },
    { name: 'MOTS-c', peptide: true, page: { href: '/mots-c', evidence: 'No human studies', fda: 'Not approved; HHS discretion', sport: 'Banned (S4)' } },
    { name: 'Epitalon', peptide: true, page: { href: '/epitalon', evidence: 'Animal/cell; few in people', fda: 'Not approved; HHS discretion', sport: 'Not listed' } },
  ],
};

export const laneOf = (key: string) => LANES.find((l) => l.key === key);
export const countWords = (n: number) => `${n} treatment${n === 1 ? '' : 's'}`;
export const CLINIC = 'https://adonisclinical.com';
export const UPDATED = 'Oct 31, 2026';
