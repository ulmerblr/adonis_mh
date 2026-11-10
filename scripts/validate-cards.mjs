// Treatment-card data check (EDU PROMPT 39). Usage: node scripts/validate-cards.mjs [slug ...]
// Checks content/cards/<slug>.json against the card format: every field in the mockup's order, the limits on counts and
// lengths, tile keys from content/card-tiles.ts, icon keys from components/card/icons.tsx, lane and number from
// lib/library.ts, and the site's word rules. With no slugs it checks every treatment page and reports missing cards.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const TILES = new Set([...read('content/card-tiles.ts').matchAll(/^\s+'?([a-z-]+)'?: \{ label:/gm)].map((m) => m[1]));
const ICONS = new Set([...read('components/card/icons.tsx').matchAll(/^\s+'?([a-z-]+)'?: '/gm)].map((m) => m[1]));

// lane and number: the page's lane (first lane in its data), numbered by its order among that lane's rows with a page
const lib = read('lib/library.ts');
const order = {};
for (const m of lib.matchAll(/\n {2}'?([a-z-]+)'?: \[([\s\S]*?)\n {2}\],/g)) order[m[1]] = [...m[2].matchAll(/href: '\/([a-z0-9-]+)'/g)].map((r) => r[1]);
const laneOf = (s) => (s === 'bpc-157' ? 'recovery' : JSON.parse(read(`content/treatments/${s}.json`)).lanes[0]);
const nameOf = (s) => (s === 'bpc-157' ? 'BPC-157' : JSON.parse(read(`content/treatments/${s}.json`)).name);
const ALL = [...new Set(Object.values(order).flat())];

const KEYS = ['slug', 'lane', 'number', 'name', 'description', 'status', 'studiedFor', 'mechanism', 'evidence', 'notEstablished', 'practical', 'regulatory', 'references', 'checked'];
const BANNED = /\b(catalog\w*|carr(y|ies|ied)|we sell|we offer|our|ours|adonis clinical|beluga|buy|order now|price\w*|discount|shop)\b|\$\d/i;
const VERDICT = /\b(proven|safe|effective|promising|breakthrough|miracle|dangerous|risky|hype\w*|powerful|amazing|unproven|should|must)\b/i;
const EV = new Set(['Human', 'Animal', 'Human + animal']);

export function validate(slug) {
  const p = [];
  const file = path.join(root, 'content/cards', `${slug}.json`);
  if (!fs.existsSync(file)) return ['missing card file'];
  let d;
  try { d = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return [`bad JSON: ${e.message}`]; }
  const keys = Object.keys(d);
  if (keys.join() !== KEYS.join()) p.push(`fields must be, in order: ${KEYS.join(', ')} (got ${keys.join(', ')})`);
  const str = (v, max, where) => { if (typeof v !== 'string' || !v.trim()) p.push(`${where}: empty`); else if (v.length > max) p.push(`${where}: ${v.length} chars, max ${max}`); };
  if (d.slug !== slug) p.push('slug does not match file name');
  const lane = laneOf(slug);
  if (d.lane !== lane) p.push(`lane must be ${lane}`);
  const num = String(order[lane].indexOf(slug) + 1).padStart(2, '0');
  if (d.number !== num) p.push(`number must be ${num}`);
  if (d.name !== nameOf(slug)) p.push(`name must be "${nameOf(slug)}" (the page's name)`);
  str(d.description, 110, 'description');
  const s = d.status ?? {};
  if (Object.keys(s).join() !== 'class,studiedFor,humanEvidence,usStatus') p.push('status fields: class, studiedFor, humanEvidence, usStatus');
  for (const k of ['class', 'studiedFor', 'humanEvidence', 'usStatus']) str(s[k], 48, `status.${k}`);
  const sf = d.studiedFor ?? {};
  if (!Array.isArray(sf.items) || sf.items.length > 5) p.push('studiedFor.items: up to 5');
  if (!sf.items?.length && !sf.note) p.push('studiedFor: with no items, a note must say why');
  for (const [i, it] of (sf.items ?? []).entries()) {
    str(it.label, 22, `studiedFor.items[${i}].label`);
    if (it.detail !== undefined) str(it.detail, 32, `studiedFor.items[${i}].detail`);
    if (!EV.has(it.evidence)) p.push(`studiedFor.items[${i}].evidence must be Human, Animal or Human + animal`);
    if (!TILES.has(it.tile)) p.push(`studiedFor.items[${i}].tile "${it.tile}" is not in content/card-tiles.ts`);
  }
  if (sf.note !== undefined) { str(sf.note.lead, 40, 'studiedFor.note.lead'); str(sf.note.text, 150, 'studiedFor.note.text'); }
  const m = d.mechanism ?? {};
  if (!Array.isArray(m.steps) || m.steps.length !== 4) p.push('mechanism.steps: exactly 4');
  for (const [i, st] of (m.steps ?? []).entries()) { str(st.label, 18, `mechanism.steps[${i}].label`); if (!ICONS.has(st.icon)) p.push(`mechanism.steps[${i}].icon "${st.icon}" unknown`); }
  if (!Array.isArray(m.bullets) || m.bullets.length > 4) p.push('mechanism.bullets: up to 4');
  for (const [i, b] of (m.bullets ?? []).entries()) str(b, 90, `mechanism.bullets[${i}]`);
  const e = d.evidence ?? {};
  if (![1, 2, 3, 4, 5].includes(e.level)) p.push('evidence.level: 1 to 5');
  if (!Array.isArray(e.bullets) || e.bullets.length < 1 || e.bullets.length > 3) p.push('evidence.bullets: 1 to 3');
  for (const [i, b] of (e.bullets ?? []).entries()) str(b, 60, `evidence.bullets[${i}]`);
  if (!Array.isArray(d.notEstablished) || d.notEstablished.length > 4) p.push('notEstablished: up to 4');
  for (const [i, n] of (d.notEstablished ?? []).entries()) { str(n.text, 32, `notEstablished[${i}].text`); if (!ICONS.has(n.icon)) p.push(`notEstablished[${i}].icon "${n.icon}" unknown`); }
  const q = d.practical ?? {};
  if (Object.keys(q).join() !== 'halfLife,routes,pharmacokinetics,soldAs,monitored,sport') p.push('practical fields: halfLife, routes, pharmacokinetics, soldAs, monitored, sport');
  for (const k of ['halfLife', 'routes', 'pharmacokinetics', 'soldAs', 'monitored', 'sport']) str(q[k], 70, `practical.${k}`);
  if (!Array.isArray(d.regulatory) || d.regulatory.length < 1 || d.regulatory.length > 4) p.push('regulatory: 1 to 4 tags');
  for (const [i, r] of (d.regulatory ?? []).entries()) { str(r.agency, 8, `regulatory[${i}].agency`); str(r.text, 52, `regulatory[${i}].text`); }
  if (!Array.isArray(d.references) || d.references.length < 1 || d.references.length > 3) p.push('references: 1 to 3');
  for (const [i, r] of (d.references ?? []).entries()) str(r, 110, `references[${i}]`);
  if (!/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/.test(d.checked ?? '')) p.push('checked: "Mon YYYY"');
  const text = JSON.stringify(d);
  const bw = text.match(BANNED); if (bw) p.push(`banned word: "${bw[0]}"`);
  const vw = text.match(VERDICT); if (vw) p.push(`verdict word: "${vw[0]}"`);
  return p;
}

export function notEstablishedCount(d) {
  const vals = [...Object.values(d.status), ...Object.values(d.practical)];
  return vals.filter((v) => /not established/i.test(v)).length;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const slugs = process.argv.slice(2).length ? process.argv.slice(2) : ALL;
  let bad = 0;
  for (const s of slugs) {
    const p = validate(s);
    if (p.length) { bad++; console.log(`${s}:\n  - ${p.join('\n  - ')}`); }
  }
  console.log(`${slugs.length - bad} of ${slugs.length} cards pass.`);
  process.exit(bad ? 1 : 0);
}
