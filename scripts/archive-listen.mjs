// Save the current "Worth a listen" pick (content/listen.ts) to content/archive/listen/<pickedOn>-<slug>.json before it is
// replaced. Run: node scripts/archive-listen.mjs ["<replaced on date>"]  (the date defaults to today).
import fs from 'node:fs';
const src = fs.readFileSync('content/listen.ts', 'utf8');
const body = src.slice(src.indexOf('export const LISTEN'));
const pick = {};
for (const m of body.matchAll(/^\s+(\w+): '((?:[^'\\]|\\.)*)',$/gm)) pick[m[1]] = m[2].replace(/\\'/g, "'");
const replaced = process.argv[2] ?? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const iso = new Date(pick.pickedOn).toISOString().slice(0, 10);
const slug = pick.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
fs.mkdirSync('content/archive/listen', { recursive: true });
const out = `content/archive/listen/${iso}-${slug}.json`;
fs.writeFileSync(out, JSON.stringify({ ran: `${pick.pickedOn} to ${replaced}`, replaced, ...pick }, null, 2) + '\n');
console.log('archived', out);
