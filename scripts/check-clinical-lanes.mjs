// Standing rule C (content/coverage-list.md): every compound Adonis Clinical carries sits in the same lane on both sites.
//
// Usage: node scripts/check-clinical-lanes.mjs [path to a local clone of ulmerblr/adonis]
//
// Reads Adonis Clinical's content/cart/products.json from ulmerblr/adonis, read-only: with a local clone it only runs
// `git fetch` and `git show origin/main:...`; without one it makes a shallow clone in a temporary folder and deletes it.
// It never writes to that repo. Each Clinical product's "group" is its lane (hair = hair-loss here). Each product is
// mapped to its active ingredient(s) by the RULES below; the research-site lanes come from lib/library.ts (the rows the
// finder shows) and from each treatment JSON's "lanes". It reports, per ingredient:
//   - a research-site lane Clinical does not carry it in (a second lane is allowed only if Clinical has it there too);
//   - a Clinical group with no research-site row for it;
//   - a Clinical ingredient with no research-site page.
// Products no rule matches are reported too, so a new Clinical product cannot slip through. Exit code 1 on any problem.
// Run it whenever a row is added or a lane changes.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const REPO = 'https://github.com/ulmerblr/adonis';
const FILE = 'content/cart/products.json';
const GROUP_TO_LANE = { trt: 'trt', vitality: 'vitality', hair: 'hair-loss', skin: 'skin', longevity: 'longevity', sleep: 'sleep', energy: 'energy', weight: 'weight', recovery: 'recovery' };

// Active ingredient rules: a pattern on the product's name + detail, and the research-site slug(s) it means.
// MIC = methionine, inositol, choline. Niagen is nicotinamide riboside. "Ket…" is ketoconazole (the name is cut off in
// Clinical's file). PT-141 is bremelanotide.
const RULES = [
  [/sermorelin/i, ['sermorelin']],
  [/glycine/i, ['glycine']],
  [/enclomiphene/i, ['enclomiphene']],
  [/semaglutide/i, ['semaglutide']],
  [/tirzepatide/i, ['tirzepatide']],
  [/testosterone/i, ['testosterone']],
  [/anastrozole/i, ['anastrozole']],
  [/chorionic gonadotropin|\bhcg\b/i, ['hcg']],
  [/\bnad\+?|nicotinamide adenine dinucleotide/i, ['nad']],
  [/glutathione/i, ['glutathione']],
  [/metformin/i, ['metformin']],
  [/ghk-?cu/i, ['ghk-cu']],
  [/niagen|nicotinamide riboside/i, ['nicotinamide-riboside']],
  [/\bb12\b|cobalamin/i, ['vitamin-b12']],
  [/\bb6\b|pyridoxine/i, ['vitamin-b6']],
  [/\bmicc?\b|methionine/i, ['methionine', 'inositol', 'choline']],
  [/carnitine/i, ['l-carnitine']],
  [/oxytocin/i, ['oxytocin']],
  [/pt-?141|bremelanotide/i, ['bremelanotide']],
  [/sildenafil/i, ['sildenafil']],
  [/tadalafil/i, ['tadalafil']],
  [/vardenafil/i, ['vardenafil']],
  [/tretinoin/i, ['tretinoin']],
  [/azelaic/i, ['azelaic-acid']],
  [/niacinamide/i, ['niacinamide']],
  [/doxycycline/i, ['doxycycline']],
  [/minoxidil/i, ['minoxidil']],
  [/finasteride|propecia/i, ['finasteride']],
  [/latanoprost/i, ['latanoprost']],
  [/ketoconazole|\/ ket…/i, ['ketoconazole']],
  [/biotin/i, ['biotin']],
];
// Add-ins: in Clinical's GLP-1 injections, "with B12" or "with glycine" is mixed into the semaglutide or tirzepatide.
// The GLP-1 is the active ingredient and sets the lane; the add-in is listed in the output but does not set a lane.
const ADDIN = /\bwith (b12|glycine)\b/i;

function readProducts(local) {
  const git = (args, cwd) => execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 64 << 20 });
  if (local) {
    git(['fetch', '-q', 'origin', 'main'], local);
    return { json: git(['show', `origin/main:${FILE}`], local), commit: git(['rev-parse', '--short', 'origin/main'], local).trim() };
  }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'adonis-clinical-'));
  try {
    git(['clone', '-q', '--depth', '1', '--filter=blob:none', '--no-checkout', REPO, dir]);
    return { json: git(['show', `HEAD:${FILE}`], dir), commit: git(['rev-parse', '--short', 'HEAD'], dir).trim() };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function researchLanes(root) {
  const lanes = {}; // slug -> Set(lane), from lib/library.ts rows
  const src = fs.readFileSync(path.join(root, 'lib/library.ts'), 'utf8');
  for (const m of src.matchAll(/\n {2}'?([a-z-]+)'?: \[([\s\S]*?)\n {2}\],/g)) {
    for (const r of m[2].matchAll(/href: '\/([a-z0-9-]+)'/g)) (lanes[r[1]] ??= new Set()).add(m[1]);
  }
  const json = {}; // slug -> lanes from content/treatments/<slug>.json
  for (const f of fs.readdirSync(path.join(root, 'content/treatments')).filter((f) => f.endsWith('.json'))) {
    const d = JSON.parse(fs.readFileSync(path.join(root, 'content/treatments', f), 'utf8'));
    if (d.slug && Array.isArray(d.lanes)) json[d.slug] = new Set(d.lanes);
  }
  return { lanes, json };
}

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const { json: raw, commit } = readProducts(process.argv[2]);
const products = JSON.parse(raw).products;
const { lanes, json } = researchLanes(root);

const clinical = {}; // slug -> Set(lane)
const addins = new Set();
const unmapped = [];
for (const p of products) {
  const lane = GROUP_TO_LANE[p.group];
  if (!lane) { unmapped.push(`${p.name} (unknown group "${p.group}")`); continue; }
  const text = `${p.name} | ${p.detail ?? ''}`;
  const addin = lane === 'weight' ? text.match(ADDIN) : null;
  const scan = addin ? text.replace(ADDIN, '') : text;
  if (addin) addins.add(addin[1].toLowerCase());
  const hits = new Set(RULES.filter(([re]) => re.test(scan)).flatMap(([, s]) => s));
  if (!hits.size) { unmapped.push(`${p.name} (${p.detail ?? ''})`); continue; }
  for (const s of hits) (clinical[s] ??= new Set()).add(lane);
}

const problems = [];
for (const [slug, cl] of Object.entries(clinical).sort()) {
  const rs = lanes[slug] ?? new Set();
  const js = json[slug];
  if (!rs.size) { problems.push(`${slug}: no research-site row (Clinical: ${[...cl].join(', ')})`); continue; }
  const extra = [...rs].filter((l) => !cl.has(l));
  const missing = [...cl].filter((l) => !rs.has(l));
  if (extra.length) problems.push(`${slug}: research-site lane(s) ${extra.join(', ')} not carried by Clinical (Clinical: ${[...cl].join(', ')})`);
  if (missing.length) problems.push(`${slug}: Clinical group(s) ${missing.join(', ')} have no research-site row (research site: ${[...rs].join(', ')})`);
  if (js && ([...js].some((l) => !rs.has(l)) || [...rs].some((l) => !js.has(l)))) problems.push(`${slug}: page JSON lanes (${[...js].join(', ')}) differ from the finder rows (${[...rs].join(', ')})`);
}
for (const u of unmapped) problems.push(`unmapped Clinical product: ${u}`);

console.log(`Clinical lanes check: ulmerblr/adonis ${commit}, ${products.length} products, ${Object.keys(clinical).length} active ingredients.`);
for (const [slug, cl] of Object.entries(clinical).sort()) console.log(`  ${slug}: Clinical ${[...cl].join(', ')} | research site ${[...(lanes[slug] ?? [])].join(', ') || 'none'}`);
if (addins.size) console.log(`  Add-ins not counted as lanes (mixed into GLP-1 injections): ${[...addins].join(', ')}`);
if (problems.length) {
  console.log(`${problems.length} mismatch(es):`);
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
console.log('0 mismatches.');
