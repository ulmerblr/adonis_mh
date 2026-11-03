import Link from 'next/link';
import { Fragment } from 'react';
import { A } from '@/components/ext';
import { LegalNotes, legalText, noteOrder, treatmentName } from '@/components/legal/legal';
import { LAWS, LEGAL, LEGAL_NOTE, PAST } from '@/content/legal';

export const metadata = { title: 'Legal records' };

/** /legal: the current Legal highlight in full, the federal laws that touch treatments on this site, and past highlights.
 *  Reached only from the Home card and from treatment pages (no header link, no tab). */
export default function Legal() {
  const order = noteOrder(LEGAL.body);
  return (
    <>
      <section className="titleBlock">
        <div className="wrap">
          <span className="label">Legal records</span>
          <h1 className="h1 h1Big">The law and the record</h1>
          <p className="legalStanding">{LEGAL_NOTE}</p>
          <hr className="inkRule" />
        </div>
      </section>

      <section className="section" id="highlight">
        <div className="wrap legalWrap">
          <div className="secHead"><h2 className="h2">Legal highlight · {LEGAL.month}</h2></div>
          <h3 className="legalHeadline">{LEGAL.headline}</h3>
          <div className="body legalBody">
            {LEGAL.body.map((p, i) => <p key={i}>{legalText(p, order, 'legal')}</p>)}
          </div>
          <h3 className="notesHead">Notes</h3>
          <LegalNotes notes={LEGAL.notes} order={order} prefix="legal" />
        </div>
      </section>

      <section className="section" id="laws">
        <div className="wrap legalWrap">
          <div className="secHead"><h2 className="h2">The laws</h2><span className="label">Federal law only for now</span></div>
          <div className="legalLaws">
            {LAWS.map((l) => (
              <article key={l.id} id={l.id} className="card legalLaw">
                <h3 className="cardTitle">{l.name}</h3>
                <p>{l.summary}</p>
                <dl className="facts">
                  <div><dt>Treatments on this site</dt><dd>{l.treatments.length ? l.treatments.map((t, i) => <Fragment key={t}>{i ? ', ' : ''}<Link href={`/${t}`}>{treatmentName(t)}</Link></Fragment>) : 'None named on this site'}</dd></div>
                  <div><dt>Official text</dt><dd>{l.text.map((t, i) => <Fragment key={t.url}>{i ? '; ' : ''}<A href={t.url}>{t.label}</A></Fragment>)}</dd></div>
                  <div><dt>Checked</dt><dd>{l.checked}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="past">
        <div className="wrap legalWrap">
          <div className="secHead"><h2 className="h2">Past highlights</h2></div>
          {PAST.length ? <ul>{PAST.map((p) => <li key={p.month}>{p.month}: {p.headline} ({p.ran})</li>)}</ul> : <p className="body">None yet. Past highlights will be listed here.</p>}
          <p className="legalStanding">{LEGAL_NOTE}</p>
        </div>
      </section>
    </>
  );
}
