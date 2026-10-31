// Print a treatment JSON as plain reading text (for review). node scripts/read-treatment.mjs slug
import fs from 'node:fs';
const s = JSON.parse(fs.readFileSync(`content/treatments/${process.argv[2]}.json`, 'utf8'));
const src = (a) => (a?.length ? ` [${a.map((x) => `${x.label}; ${x.date}; ${x.url}`).join(' | ')}]` : '');
const blocks = (bs) => (bs ?? []).forEach((b) => {
  if (b.t === 'lead') console.log(`  **${b.text}**`);
  else if (b.t === 'p') console.log(`  ${b.text}${src(b.src)}`);
  else if (b.t === 'h3') console.log(`  ## ${b.text}`);
  else if (b.t === 'callout') console.log(`  !! ${b.text}`);
  else if (b.t === 'list') b.items.forEach((it) => console.log(`  - ${it.lead ? it.lead + ' ' : ''}${it.text}${src(it.src)}`));
  else if (b.t === 'card') console.log(`  [card ${b.title}] ${b.text}${src(b.src)}`);
  else if (b.t === 'study') console.log(`  [study${b.badge ? ' ' + b.badge : ''}] ${b.meta ?? ''} — ${b.title}: ${b.facts.map((f) => f.k + ': ' + f.v).join('; ')}${b.found ? ' FOUND: ' + b.found : ''}${src(b.src)}`);
});
console.log(`# ${s.name} (${s.slug}) lanes=${s.lanes} peptide=${!!s.peptide} index=${JSON.stringify(s.index)}`);
console.log('TRACK: ' + s.track.map((t) => `${t.title}=${t.status}${t.here ? '*' : ''} (${t.line})`).join(' / '));
for (const k of ['what', 'research', 'us']) { console.log(`== ${k}`); blocks(s.sections[k]); }
console.log('== world'); console.log(`  **${s.sections.world.lead}**`);
s.sections.world.countries.forEach((c) => console.log(`  [${c.tone}] ${c.country} (${c.regulator}): ${c.status}${src(c.sources)}`));
blocks(s.sections.world.after);
console.log('== side'); blocks(s.sections.side);
