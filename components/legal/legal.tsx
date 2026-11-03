import Link from 'next/link';
import { Fragment } from 'react';
import { A } from '@/components/ext';
import { LEGAL, LAWS, type LegalNote } from '@/content/legal';
import { TREATMENTS } from '@/lib/library';

/** Text with [[/slug|words]] treatment links and [^key] footnotes (numbered by first use within `notes`). */
export function legalText(text: string, order: string[], prefix: string): React.ReactNode {
  const out: React.ReactNode[] = []; let last = 0; let k = 0;
  for (const m of text.matchAll(/\[\[(\/[a-z0-9-]+)\|([^\]]+)\]\]|\[\^([a-z0-9-]+)\]/g)) {
    out.push(text.slice(last, m.index));
    if (m[1]) out.push(<Link key={k++} href={m[1]}>{m[2]}</Link>);
    else { const n = order.indexOf(m[3]) + 1; out.push(<sup key={k++} className="fnRef"><a href={`#${prefix}-note-${n}`}>{n}</a></sup>); }
    last = (m.index ?? 0) + m[0].length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}

/** Note keys in order of first citation. */
export function noteOrder(paras: string[]): string[] {
  const o: string[] = [];
  for (const p of paras) for (const m of p.matchAll(/\[\^([a-z0-9-]+)\]/g)) if (!o.includes(m[1])) o.push(m[1]);
  return o;
}

export function LegalNotes({ notes, order, prefix }: { notes: LegalNote[]; order: string[]; prefix: string }) {
  return (
    <ol className="notesList legalNotes">
      {order.map((key, i) => { const n = notes.find((x) => x.key === key)!; return (
        <li key={key} id={`${prefix}-note-${i + 1}`}>{n.source}, <A href={n.url}>{n.title}</A>, {n.date}.</li>
      ); })}
    </ol>
  );
}

/** Home only: the Legal highlight card, under Worth a listen. Links to /legal (the page is reached only from here and from cited sources). */
export function LegalCard() {
  const h = LEGAL;
  return (
    <div className="briefCard legalCard">
      <span className="label">Legal highlight · {h.month}</span>
      <h3 className="briefHead">{h.headline}</h3>
      <p className="legalSummary">{h.cardSummary}</p>
      <Link href="/legal" className="moreLink">See all legal records →</Link>
    </div>
  );
}

/** "Laws that apply" on a treatment page's US status tab: links to the /legal entries that clearly apply to it. */
export function LawsThatApply({ slug }: { slug: string }) {
  const laws = LAWS.filter((l) => l.treatments.includes(slug));
  if (!laws.length) return null;
  return (
    <p className="lawsApply"><strong>Laws that apply:</strong>{' '}
      {laws.map((l, i) => <Fragment key={l.id}>{i ? '; ' : ''}<Link href={`/legal#${l.id}`}>{l.name}</Link></Fragment>)}.
    </p>
  );
}

/** A treatment's display name, from its finder row. */
export function treatmentName(slug: string): string {
  for (const rows of Object.values(TREATMENTS)) for (const t of rows) if (t.page?.href === `/${slug}`) return t.name;
  return slug;
}
