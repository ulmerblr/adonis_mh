// Render each treatment card to public/cards/adonis-<slug>-card.png (2x) and .pdf (one page, sized to the card) with the
// installed Playwright (EDU PROMPT 39). Records each card file's hash in public/cards/manifest.json, which
// scripts/check-cards.mjs compares at build time.
//
// Usage:
//   CARDS_SKIP_CHECK=1 npx next build     (the build's card check would fail while renders are stale)
//   node scripts/render-cards.mjs [slug ...]   (starts `next start` on a free port; or pass --url http://localhost:PORT)
import { spawn } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const OUT = path.join(root, 'public/cards');
const MANIFEST = path.join(OUT, 'manifest.json');
export const hashOf = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 16);

const args = process.argv.slice(2);
let url = null;
const ui = args.indexOf('--url');
if (ui >= 0) { url = args[ui + 1]; args.splice(ui, 2); }
const all = fs.readdirSync(path.join(root, 'content/cards')).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)).sort();
const slugs = args.length ? args : all;

const freePort = () => new Promise((res) => { const s = net.createServer(); s.listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });
let server = null;
if (!url) {
  const port = await freePort();
  server = spawn('npx', ['next', 'start', '-p', String(port)], { cwd: root, stdio: 'ignore', detached: true });
  url = `http://localhost:${port}`;
  for (let i = 0; i < 60; i++) { try { if ((await fetch(url)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 500)); }
}

fs.mkdirSync(OUT, { recursive: true });
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
const browser = await chromium.launch();
const shot = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
const print = await browser.newPage({ viewport: { width: 900, height: 900 } });
const PRINT_CSS = `@page { margin: 0 } html, body { background: #fff !important; margin: 0 !important }
  body * { visibility: hidden } [data-card], [data-card] * { visibility: visible }
  [data-card] { position: absolute; left: 0; top: 0; width: 900px !important; max-width: 900px !important; margin: 0 !important }
  [data-card] article { box-shadow: none !important; border-radius: 0 !important }`;
let n = 0;
try {
  for (const slug of slugs) {
    // PNG: the card as it shows at desktop width, with the export footer line, at 2x
    await shot.goto(`${url}/${slug}`, { waitUntil: 'networkidle' });
    await shot.addStyleTag({ content: 'body * { visibility: hidden } [data-card], [data-card] * { visibility: visible }' });
    await shot.evaluate(async () => { document.body.classList.add('cardExport'); await document.fonts.ready; });
    const card = await shot.$('[data-card] article');
    if (!card) throw new Error(`${slug}: no card on the page`);
    const png = await card.screenshot();
    // a palette PNG (sharp, which Next installs) keeps the files near 400 KB instead of 1.3 MB; plain PNG if it is missing
    let out = png;
    try { out = await require('sharp')(png).png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 }).toBuffer(); } catch {}
    fs.writeFileSync(path.join(OUT, `adonis-${slug}-card.png`), out);
    // PDF: one page sized to the card
    await print.goto(`${url}/${slug}`, { waitUntil: 'networkidle' });
    await print.emulateMedia({ media: 'print' });
    await print.addStyleTag({ content: PRINT_CSS });
    await print.evaluate(async () => { document.body.classList.add('cardExport'); await document.fonts.ready; });
    const h = Math.ceil(await print.evaluate(() => document.querySelector('[data-card] article').getBoundingClientRect().height));
    await print.pdf({ path: path.join(OUT, `adonis-${slug}-card.pdf`), width: '900px', height: `${h + 1}px`, printBackground: true, pageRanges: '1' });
    manifest[slug] = hashOf(path.join(root, 'content/cards', `${slug}.json`));
    n++;
    if (n % 20 === 0) console.log(`  ${n} of ${slugs.length}`);
  }
} finally {
  const sorted = Object.fromEntries(Object.entries(manifest).filter(([s]) => all.includes(s)).sort());
  fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 1) + '\n');
  await browser.close();
  if (server) process.kill(-server.pid);
}
console.log(`Rendered ${n} card(s) to public/cards/.`);
