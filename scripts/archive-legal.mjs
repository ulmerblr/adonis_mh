// Save the current Legal highlight (content/legal.ts) to content/archive/legal/<published>-<slug>.json before it is
// replaced. Run: node --experimental-strip-types scripts/archive-legal.mjs ["<replaced on date>"]
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const { LEGAL } = await import(pathToFileURL('content/legal.ts').href);
const replaced = process.argv[2] ?? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const iso = new Date(LEGAL.published).toISOString().slice(0, 10);
const slug = LEGAL.headline.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
fs.mkdirSync('content/archive/legal', { recursive: true });
const out = `content/archive/legal/${iso}-${slug}.json`;
fs.writeFileSync(out, JSON.stringify({ ran: `${LEGAL.published} to ${replaced}`, replaced, ...LEGAL }, null, 2) + '\n');
console.log('archived', out);
