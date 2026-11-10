// Write content/card-art-needed.md (EDU PROMPT 39): every tile key the treatment cards' "Studied for" items use that has
// no photo tile yet in content/card-tiles.ts, with how many cards use it, most-used first.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const tilesSrc = fs.readFileSync(path.join(root, 'content/card-tiles.ts'), 'utf8');
const tiles = Object.fromEntries([...tilesSrc.matchAll(/^\s+'?([a-z-]+)'?: \{ label: '([^']+)', image: (null|'[^']+')/gm)].map((m) => [m[1], { label: m[2], image: m[3] !== 'null' }]));
const use = {};
const dir = path.join(root, 'content/cards');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  for (const k of new Set((d.studiedFor?.items ?? []).map((i) => i.tile))) (use[k] ??= []).push(d.slug);
}
const need = Object.entries(use).filter(([k]) => !tiles[k]?.image).sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
const have = Object.entries(use).filter(([k]) => tiles[k]?.image).sort((a, b) => b[1].length - a[1].length);
const out = [
  '# Card art needed',
  '',
  `Tile keys used by the treatment cards' "Studied for" items that have no photo tile yet, with how many cards use each, most-used first. ${files.length} cards; written by scripts/card-art-needed.mjs. Add an image to public/images/cards/tiles/ and its path in content/card-tiles.ts, then re-run the script.`,
  '',
  ...need.map(([k, s]) => `- ${k} (${tiles[k]?.label ?? 'unknown key'}): ${s.length} card${s.length === 1 ? '' : 's'}`),
  '',
  `Already have a photo tile: ${have.map(([k, s]) => `${k} (${s.length})`).join(', ')}.`,
  '',
];
fs.writeFileSync(path.join(root, 'content/card-art-needed.md'), out.join('\n'));
console.log(`${need.length} tile keys need art; ${have.length} have it.`);
