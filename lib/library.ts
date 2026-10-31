/**
 * The library's lanes and treatments.
 *
 * Lanes match Adonis Clinical's, in Bill's order. Treatments are listed by active ingredient, one row per ingredient, read
 * from the Adonis Clinical catalog (ulmerblr/adonis content/cart/products.json: its groups and each product's name and
 * detail; content/cart/lanes.json for Longevity also carrying sermorelin). Combination products are split into their
 * ingredients. No brand names, no prices. Clinical's TRT and Hair loss groups sit in its Vitality lane and Skin in Longevity;
 * here each is its own lane. Recovery has no products at Clinical (ordering on hold), so it holds BPC-157 only.
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
    { name: 'Testosterone' },
    { name: 'Enclomiphene' },
    { name: 'Anastrozole' },
    { name: 'Human chorionic gonadotropin (hCG)' },
  ],
  weight: [
    { name: 'Semaglutide', peptide: true },
    { name: 'Tirzepatide', peptide: true },
  ],
  recovery: [
    { name: 'BPC-157', peptide: true, page: { href: '/bpc-157', evidence: '5 studies, ~80 people', fda: 'Not approved', sport: 'Banned' } },
  ],
  vitality: [
    { name: 'Sildenafil' },
    { name: 'Tadalafil' },
    { name: 'Vardenafil' },
    { name: 'Oxytocin', peptide: true },
    { name: 'Bremelanotide (PT-141)', peptide: true },
  ],
  energy: [
    { name: 'Vitamin B12' },
    { name: 'Vitamin B6 (pyridoxine)' },
    { name: 'Methionine' },
    { name: 'Inositol' },
    { name: 'Choline' },
    { name: 'L-carnitine' },
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
  ],
  skin: [
    { name: 'Tretinoin' },
    { name: 'Azelaic acid' },
    { name: 'Niacinamide' },
    { name: 'Doxycycline' },
    { name: 'GHK-Cu (copper peptide)', peptide: true },
  ],
  longevity: [
    { name: 'NAD+' },
    { name: 'Nicotinamide riboside' },
    { name: 'Glutathione' },
    { name: 'Metformin' },
    { name: 'GHK-Cu (copper peptide)', peptide: true },
    { name: 'Sermorelin', peptide: true },
  ],
};

export const laneOf = (key: string) => LANES.find((l) => l.key === key);
export const countWords = (n: number) => `${n} treatment${n === 1 ? '' : 's'}`;
export const CLINIC = 'https://adonisclinical.com';
export const UPDATED = 'Oct 31, 2026';
