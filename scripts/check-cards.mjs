// Build check (EDU PROMPT 39): fail when a card's data file changed but its PNG or PDF was not re-rendered.
// Each content/cards/<slug>.json must have public/cards/adonis-<slug>-card.png and .pdf, and its current hash must match
// the one scripts/render-cards.mjs recorded in public/cards/manifest.json. Run by next.config.ts at build time; set
// CARDS_SKIP_CHECK=1 only for the build that render-cards.mjs itself renders from.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const MANIFEST = path.join(root, 'public/cards/manifest.json');
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
const problems = [];
for (const f of fs.readdirSync(path.join(root, 'content/cards')).filter((f) => f.endsWith('.json')).sort()) {
  const slug = f.slice(0, -5);
  const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'content/cards', f))).digest('hex').slice(0, 16);
  for (const ext of ['png', 'pdf']) if (!fs.existsSync(path.join(root, 'public/cards', `adonis-${slug}-card.${ext}`))) problems.push(`${slug}: no ${ext}`);
  if (manifest[slug] !== hash) problems.push(`${slug}: card data changed since its PNG/PDF were rendered`);
}
if (problems.length) {
  console.error(`Treatment cards out of date (run: CARDS_SKIP_CHECK=1 npx next build && node scripts/render-cards.mjs):\n  - ${problems.join('\n  - ')}`);
  process.exit(1);
}
console.log(`Treatment cards: ${Object.keys(manifest).length} rendered, all current.`);
