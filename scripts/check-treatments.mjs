// Rule checks for content/treatments/<slug>.json (EDU PROMPT 16). Run: node scripts/check-treatments.mjs [--links] slug …
import fs from 'node:fs';
const args = process.argv.slice(2); const links = args.includes('--links'); const slugs = args.filter((a) => !a.startsWith('--'));
const BANNED = /drugs\.com|wikipedia|goodrx|fda\.report|webmd|healthline|medicalnewstoday|rxlist|medscape|verywell|examine\.com|statpearls|ncbi\.nlm\.nih\.gov\/books|mayoclinic|clevelandclinic|medthority|reddit|youtube/i;
const WORDS = [/\brecommend/i, /\bwe suggest/i, /\$\s?\d/, /\bprice/i, /\bcost\b/i, /\btake \d/i, /\bper day\b/i, /\bdaily dose\b/i, /\bdosage\b/i, /\bbefore and after\b/i, /\bresults? (in|within)\b/i, /\bguarantee/i, /\bproven\b/i, /\bmiracle/i];
const TONES = ['approved', 'otc', 'rx', 'discretion', 'not', 'pending'];
const allUrls = new Map();
let problems = 0;
for (const slug of slugs) {
  const p = `content/treatments/${slug}.json`;
  if (!fs.existsSync(p)) { console.log(`✗ ${slug}: file missing`); problems++; continue; }
  const s = JSON.parse(fs.readFileSync(p, 'utf8'));
  const out = []; const notes = [];
  const srcOk = (src, where) => (src ?? []).forEach((x) => {
    if (!x.url || !x.label || !x.date) out.push(`${where}: source missing url/label/date (${JSON.stringify(x).slice(0, 80)})`);
    if (BANNED.test(x.url)) out.push(`${where}: secondary source cited: ${x.url}`);
    if (x.date && !/^(published|accessed|updated|revised|issued|effective|dated)\b/i.test(x.date)) notes.push(`${where}: odd date text "${x.date}"`);
    if (x.url) allUrls.set(x.url, `${slug}/${where}`);
  });
  const texts = [];
  const walk = (blocks, where) => {
    let n = 0;
    for (const b of blocks ?? []) {
      if (b.text) texts.push([where, b.text]);
      if (b.src) { srcOk(b.src, where); n += b.src.length; }
      if (b.items) b.items.forEach((it) => { texts.push([where, (it.lead ?? '') + ' ' + it.text]); srcOk(it.src, where); n += it.src?.length ?? 0; });
      if (b.facts) b.facts.forEach((f) => texts.push([where, f.v])); if (b.found) texts.push([where, b.found]);
    }
    return n;
  };
  const sec = s.sections;
  const counts = { what: walk(sec.what, 'what'), research: walk(sec.research, 'research'), us: walk(sec.us, 'us'), side: walk(sec.side, 'side') };
  let w = walk(sec.world.after, 'world'); texts.push(['world', sec.world.lead]);
  for (const c of sec.world.countries) {
    if (!TONES.includes(c.tone)) out.push(`world: bad tone ${c.tone} (${c.country})`);
    if (!Array.isArray(c.iso) || !c.iso.length) out.push(`world: no iso for ${c.country}`);
    if (c.tone === 'pending' && c.sources?.length) notes.push(`world: ${c.country} pending but has sources`);
    if (c.tone !== 'pending' && !c.sources?.length) out.push(`world: ${c.country} has a status but no source`);
    srcOk(c.sources, `world/${c.country}`); w += c.sources?.length ?? 0; texts.push(['world', c.status]);
  }
  counts.world = w;
  for (const [k, n] of Object.entries(counts)) if (!n) out.push(`${k}: no source in this tab`);
  const here = s.track.filter((t) => t.here).length; if (here !== 1) out.push(`track: ${here} steps marked here`);
  if (s.track.length !== 6) notes.push(`track: ${s.track.length} steps`);
  s.track.forEach((t) => { if (!['done', 'started', 'not'].includes(t.status)) out.push(`track: bad status ${t.status}`); if (t.line.length > 60) notes.push(`track line long: ${t.line}`); });
  for (const [k, max] of [['evidence', 26], ['fda', 22], ['sport', 16]]) if ((s.index[k] ?? '').length > max) notes.push(`index.${k} long (${s.index[k].length}): ${s.index[k]}`);
  for (const [where, t] of texts) {
    for (const re of WORDS) if (re.test(t)) notes.push(`${where}: wording check /${re.source}/: "${t.slice(0, 140)}"`);
    const m = t.match(/[^.]*FDA[- ]approved[^.]*\./gi); if (m) m.forEach((x) => notes.push(`${where}: FDA-approved mention: "${x.trim().slice(0, 170)}"`));
  }
  problems += out.length;
  console.log(`${out.length ? '✗' : '✓'} ${slug}: sources per tab ${JSON.stringify(counts)}`);
  out.forEach((x) => console.log('   PROBLEM ' + x)); notes.forEach((x) => console.log('   check   ' + x));
  if (s.unconfirmed?.length) console.log('   unconfirmed: ' + s.unconfirmed.join(' | '));
  if (s.surprises?.length) console.log('   surprises: ' + s.surprises.join(' | '));
}
if (links) {
  const { execFileSync } = await import('node:child_process');
  const bad = [];
  for (const [u, where] of allUrls) {
    let code = '000';
    try { code = execFileSync('curl', ['-s', '-o', '/dev/null', '-m', '25', '-L', '-w', '%{http_code}', u]).toString(); } catch { /* keep 000 */ }
    if (!/^(2|3)/.test(code)) bad.push(`${code} ${u} (${where})`);
  }
  console.log(`links: ${allUrls.size} checked, ${bad.length} not loading`); bad.forEach((b) => console.log('   ' + b));
}
process.exitCode = problems ? 1 : 0;
