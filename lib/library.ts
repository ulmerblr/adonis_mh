/**
 * The library's lanes and treatments.
 *
 * Lanes match Adonis Clinical's, in Bill's order. Treatments are listed by active ingredient, one row per ingredient, read
 * from the Adonis Clinical catalog (ulmerblr/adonis content/cart/products.json: its groups and each product's name and
 * detail; content/cart/lanes.json for Longevity also carrying sermorelin). Combination products are split into their
 * ingredients. No brand names (one exception, as asked: "Sertraline (Zoloft)"), no prices. Clinical's TRT and Hair loss groups sit in its Vitality lane and Skin in Longevity;
 * here each is its own lane. Recovery has no products at Clinical (ordering on hold); it holds BPC-157 and two more of the
 * HHS peptides. Prompt 15 added ten rows from the Beluga catalog and the HHS peptide list, each after its lane's existing rows.
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
    { name: 'BPC-157', peptide: true, page: { href: '/bpc-157', evidence: '5 studies, ~80 people', fda: 'Not approved', sport: 'Banned' } },
    { name: 'TB-500 (thymosin beta-4 fragment)', peptide: true, page: { href: '/tb-500', evidence: '3-case report; no trials', fda: 'Not approved', sport: 'Banned (S2)' } },
    { name: 'KPV', peptide: true, page: { href: '/kpv', evidence: 'Animal and cell only', fda: 'Not approved', sport: 'Not listed' } },
  ],
  vitality: [
    { name: 'Sildenafil' },
    { name: 'Tadalafil' },
    { name: 'Vardenafil' },
    { name: 'Oxytocin', peptide: true },
    { name: 'Bremelanotide (PT-141)', peptide: true },
    { name: 'Sertraline (Zoloft)' },
  ],
  energy: [
    { name: 'Vitamin B12' },
    { name: 'Vitamin B6 (pyridoxine)' },
    { name: 'Methionine' },
    { name: 'Inositol' },
    { name: 'Choline' },
    { name: 'L-carnitine' },
    { name: 'Semax', peptide: true },
  ],
  sleep: [
    { name: 'Sermorelin', peptide: true },
    { name: 'Glycine' },
  ],
  'hair-loss': [
    { name: 'Finasteride' },
    { name: 'Minoxidil' },
    { name: 'Latanoprost' },
    { name: 'Ketoconazole' },
    { name: 'Tretinoin' },
    { name: 'Biotin' },
    { name: 'Fluocinolone' },
    { name: 'Melatonin (topical)' },
  ],
  skin: [
    { name: 'Tretinoin' },
    { name: 'Azelaic acid' },
    { name: 'Niacinamide' },
    { name: 'Doxycycline' },
    { name: 'GHK-Cu (copper peptide)', peptide: true },
    { name: 'Spironolactone' },
    { name: 'Estriol' },
  ],
  longevity: [
    { name: 'NAD+' },
    { name: 'Nicotinamide riboside' },
    { name: 'Glutathione' },
    { name: 'Metformin' },
    { name: 'GHK-Cu (copper peptide)', peptide: true },
    { name: 'Sermorelin', peptide: true },
    { name: 'MOTS-c', peptide: true },
    { name: 'Epitalon', peptide: true },
  ],
};

export const laneOf = (key: string) => LANES.find((l) => l.key === key);
export const countWords = (n: number) => `${n} treatment${n === 1 ? '' : 's'}`;
export const CLINIC = 'https://adonisclinical.com';
export const UPDATED = 'Oct 31, 2026';
