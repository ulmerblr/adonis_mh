// For each content/treatments/<slug>.json: create its route (app/<slug>/page.tsx) and set the page link on its row(s) in
// lib/library.ts (evidence, fda and sport from the JSON's "index"). Shared treatments (Tretinoin, GHK-Cu, Sermorelin) get
// one page; every row with that name links to it. Run: node scripts/sync-treatments.mjs [slug …]
import fs from 'node:fs';

const ROW_NAME = {
  'tb-500': 'TB-500 (thymosin beta-4 fragment)', kpv: 'KPV', semaglutide: 'Semaglutide', tirzepatide: 'Tirzepatide',
  testosterone: 'Testosterone', enclomiphene: 'Enclomiphene', anastrozole: 'Anastrozole', hcg: 'Human chorionic gonadotropin (hCG)',
  sildenafil: 'Sildenafil', tadalafil: 'Tadalafil', vardenafil: 'Vardenafil', oxytocin: 'Oxytocin', bremelanotide: 'Bremelanotide (PT-141)',
  sertraline: 'Sertraline (Zoloft)', finasteride: 'Finasteride', minoxidil: 'Minoxidil', latanoprost: 'Latanoprost', ketoconazole: 'Ketoconazole',
  tretinoin: 'Tretinoin', biotin: 'Biotin', fluocinolone: 'Fluocinolone', melatonin: 'Melatonin (topical)', 'azelaic-acid': 'Azelaic acid',
  niacinamide: 'Niacinamide', doxycycline: 'Doxycycline', 'ghk-cu': 'GHK-Cu (copper peptide)', spironolactone: 'Spironolactone', estriol: 'Estriol',
  'vitamin-b12': 'Vitamin B12', 'vitamin-b6': 'Vitamin B6 (pyridoxine)', methionine: 'Methionine', inositol: 'Inositol', choline: 'Choline',
  'l-carnitine': 'L-carnitine', semax: 'Semax', sermorelin: 'Sermorelin', glycine: 'Glycine', nad: 'NAD+', 'nicotinamide-riboside': 'Nicotinamide riboside',
  glutathione: 'Glutathione', metformin: 'Metformin', 'mots-c': 'MOTS-c', epitalon: 'Epitalon',
};
const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const want = process.argv.slice(2);
const slugs = fs.readdirSync('content/treatments').filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)).filter((s) => !want.length || want.includes(s));
let lib = fs.readFileSync('lib/library.ts', 'utf8');
for (const slug of slugs) {
  const spec = JSON.parse(fs.readFileSync(`content/treatments/${slug}.json`, 'utf8'));
  if (spec.slug !== slug) throw new Error(`${slug}: slug field says ${spec.slug}`);
  const row = spec.row ?? ROW_NAME[slug];
  if (!row) throw new Error(`${slug}: no library row mapped`);
  // EDU PROMPT 22: a new treatment's rows are added to each of its lanes (after the lane's existing rows) if missing.
  for (const lane of spec.lanes) {
    const key = lane.includes('-') ? `'${lane}'` : lane;
    const laneRe = new RegExp(`(\\n  ${key}: \\[\\n)([\\s\\S]*?)(\\n  \\],)`);
    const m = lib.match(laneRe);
    if (!m) throw new Error(`${slug}: lane ${lane} not found`);
    if (!m[2].includes(`{ name: '${row.replace(/'/g, "\\'")}'`)) {
      const aka = spec.aka?.length ? `, aka: [${spec.aka.map(q).join(', ')}]` : '';
      lib = lib.replace(laneRe, (_x, a, body, c) => `${a}${body}\n    { name: ${q(row)}${spec.peptide ? ', peptide: true' : ''}${aka} },${c}`);
    }
  }
  fs.mkdirSync(`app/${slug}`, { recursive: true });
  fs.writeFileSync(`app/${slug}/page.tsx`, `import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import { TreatmentPage } from '@/components/treatment/template';
import spec from '@/content/treatments/${slug}.json';

export const metadata = { title: ${q(spec.name)} };

export default function Page() {
  return <TreatmentPage data={fromSpec(spec as Spec)} />;
}
`);
  const { evidence, fda, sport } = spec.index;
  const page = `page: { href: ${q('/' + slug)}, evidence: ${q(evidence)}, fda: ${q(fda)}, sport: ${q(sport)} }`;
  const esc = row.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`\\{ name: '${esc}'(, peptide: true)?(, aka: \\[[^\\]]*\\])?(, page: \\{[^}]*\\})? \\}`, 'g');
  let n = 0;
  lib = lib.replace(re, (_m, pep, aka) => { n++; return `{ name: ${q(row)}${pep ?? ''}${aka ?? ''}, ${page} }`; });
  if (!n) throw new Error(`${slug}: row '${row}' not found in lib/library.ts`);
  console.log(`${slug}: route written; ${n} row(s) linked`);
}
fs.writeFileSync('lib/library.ts', lib);
