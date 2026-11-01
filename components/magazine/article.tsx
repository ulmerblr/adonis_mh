import Link from 'next/link';
import { Fragment } from 'react';
import { A } from '@/components/ext';
import type { GlanceRow } from './story';
import { GlanceBox } from './story';
import type { Note } from '@/content/lanes/types';

/**
 * EDU PROMPT 24: a lane story as one article with footnotes. Body text uses [[/slug|words]] for a treatment link and
 * [^key] for a footnote. Notes are numbered in order of first citation; each footnote jumps to its note, and each note
 * links back up to its first footnote. The Notes list sits at the end of the article, in the article column.
 */
export function StoryArticleNotes({ lane, byline, body, notes, glance, pull }: {
  lane: string; byline: string; body: string[]; notes: Note[]; glance?: GlanceRow[]; pull?: { quote: string; note?: string };
}) {
  const order: string[] = [];
  const seen: Record<string, number> = {};
  const num = (key: string) => {
    if (!order.includes(key)) order.push(key);
    return order.indexOf(key) + 1;
  };
  const fnId = (n: number) => `note-${lane}-${n}`;
  const refId = (n: number, k: number) => `ref-${lane}-${n}-${k}`;
  const render = (text: string) => {
    const out: React.ReactNode[] = [];
    let last = 0; let i = 0;
    for (const m of text.matchAll(/\[\[(\/[a-z0-9-]+)\|([^\]]+)\]\]|\[\^([a-z0-9-]+)\]/g)) {
      out.push(text.slice(last, m.index));
      if (m[1]) out.push(<Link key={i++} href={m[1]} className="spreadLink">{m[2]}</Link>);
      else {
        const n = num(m[3]); const k = (seen[m[3]] = (seen[m[3]] ?? 0) + 1);
        out.push(<sup key={i++} className="fnRef" id={refId(n, k)}><a href={`#${fnId(n)}`} aria-label={`Note ${n}`}>{n}</a></sup>);
      }
      last = (m.index ?? 0) + m[0].length;
    }
    out.push(text.slice(last));
    return out;
  };
  const paras = body.map((p) => render(p));
  const byKey = Object.fromEntries(notes.map((n) => [n.key, n]));
  const pullN = pull?.note ? order.indexOf(pull.note) + 1 : 0;
  return (
    <article className="spreadArticle">
      <p className="spreadByline">{byline}</p>
      <div className="spreadText">
        {glance?.length ? <GlanceBox glance={glance} /> : null}
        {paras.map((p, i) => (
          <Fragment key={i}>
            <p className={i === 0 ? 'spreadDrop' : undefined}>{p}</p>
            {pull && i === Math.min(2, paras.length - 1) ? (
              <figure className="spreadPull">
                <blockquote>{`“${pull.quote}”`}{pullN ? <sup className="fnRef"><a href={`#${fnId(pullN)}`} aria-label={`Note ${pullN}`}>{pullN}</a></sup> : null}</blockquote>
              </figure>
            ) : null}
          </Fragment>
        ))}
      </div>
      <section className="notes" aria-labelledby={`notes-${lane}`}>
        <h3 className="notesHead" id={`notes-${lane}`}>Notes</h3>
        <ol className="notesList">
          {order.map((key, i) => {
            const n = byKey[key];
            return (
              <li key={key} id={fnId(i + 1)}>
                {n.source}, <A href={n.url}>{n.title}</A>, {n.date}. <a href={`#${refId(i + 1, 1)}`} className="fnBack" aria-label={`Back to note ${i + 1} in the text`}>↑</a>
              </li>
            );
          })}
        </ol>
      </section>
    </article>
  );
}
