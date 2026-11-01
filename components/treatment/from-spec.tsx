import { A, CLINIC } from '@/components/ext';
import { Fact, type TreatmentData } from '@/components/treatment/template';
import { WorldMap, type MapRegion, type Tone } from '@/components/treatment/world-map';
import { LANES, type LaneKey } from '@/lib/library';
import type { Step } from '@/lib/tracks';

/** A treatment page's data as plain JSON (content/treatments/<slug>.json; the format is in content/treatments/SPEC.md). */
export type Source = { url: string; label: string; date: string };
type Item = { lead?: string; text: string; src?: Source[] };
export type Block =
  | { t: 'lead'; text: string }
  | { t: 'p'; text: string; src?: Source[] }
  | { t: 'h3'; text: string }
  | { t: 'list'; items: Item[] }
  | { t: 'callout'; text: string }
  | { t: 'study'; meta?: string; title: string; facts: { k: string; v: string }[]; found?: string; src?: Source[]; badge?: string }
  | { t: 'card'; title: string; text: string; src?: Source[] };
export type Country = { country: string; regulator: string; status: string; checked?: string; sources?: Source[]; iso: string[]; tone: Tone };
export type Spec = {
  slug: string; name: string; peptide?: boolean; lanes: LaneKey[];
  index: { evidence: string; fda: string; sport: string };
  track: Step[];
  sections: { what: Block[]; research: Block[]; us: Block[]; world: { lead: string; countries: Country[]; after?: Block[] }; side: Block[] };
  unconfirmed?: string[]; surprises?: string[];
  /** EDU PROMPT 22: the row name in lib/library.ts, other names people search for (brands, codes), and the check date. */
  row?: string; aka?: string[]; checked?: string;
};

function srcs(src?: Source[]): React.ReactNode {
  if (!src?.length) return null;
  return <>{src.map((s) => <span key={s.url + s.label} className="src">Source: <A href={s.url}>{s.label}</A>, {s.date}</span>)}</>;
}

/** Built eagerly (not as components) so the template's per-tab Sources can see every link. */
function blocks(list: Block[]): React.ReactNode {
  const blocks = list;
  const out: React.ReactNode[] = [];
  let cards: React.ReactNode[] = [];
  const flush = () => { if (cards.length) { out.push(<div className="cards" key={`c${out.length}`} style={{ margin: '0 0 16px' }}>{cards}</div>); cards = []; } };
  blocks.forEach((b, i) => {
    if (b.t !== 'study') flush();
    switch (b.t) {
      case 'lead': out.push(<p key={i} className="bodyLead">{b.text}</p>); break;
      case 'p': out.push(<div key={i} className="body" style={{ marginBottom: '1em' }}><p style={{ margin: 0 }}>{b.text}</p>{srcs(b.src)}</div>); break;
      case 'h3': out.push(<h3 key={i} className="h3">{b.text}</h3>); break;
      case 'callout': out.push(<p key={i} className="callout">{b.text}</p>); break;
      case 'list': out.push(
        <ul key={i} className="list">
          {b.items.map((it, j) => <li key={j}>{it.lead ? <><strong>{it.lead}</strong> </> : null}{it.text} {srcs(it.src)}</li>)}
        </ul>,
      ); break;
      case 'card': out.push(<div key={i} className="card sport" style={{ marginBottom: 16 }}><h3 className="cardTitle">{b.title}</h3><p style={{ margin: 0 }}>{b.text}</p>{srcs(b.src)}</div>); break;
      case 'study': cards.push(
        <article key={i} className="card">
          {b.badge ? <span className="badge">{b.badge}</span> : null}
          {b.meta ? <span className="cardMeta">{b.meta}</span> : null}
          <h4 className="cardTitle">{b.title}</h4>
          <dl className="facts">{b.facts.map((f) => <Fact key={f.k} k={f.k}>{f.v}</Fact>)}</dl>
          {b.found ? <div className="found"><span className="label">Found</span>{b.found}</div> : null}
          {srcs(b.src)}
        </article>,
      ); break;
    }
  });
  flush();
  return <>{out}</>;
}

function world(w: Spec['sections']['world']): React.ReactNode {
  const regions: MapRegion[] = w.countries.map((c) => ({ country: c.country, regulator: c.regulator, status: c.status, checked: c.checked, sources: c.sources?.map((s) => s.url), iso: c.iso, tone: c.tone }));
  return (
    <>
      <p className="bodyLead">{w.lead}</p>
      <WorldMap regions={regions} />
      <div className="countries">
        {w.countries.map((c) => (
          <article className={c.sources?.length ? 'card' : 'card countryPending'} key={c.country}>
            <h3 className="cardTitle">{c.country}</h3>
            <p className="regulator">{c.regulator}</p>
            <dl className="facts">
              <Fact k="Status">{c.status}</Fact>
              <Fact k="Checked">{c.checked ?? '—'}</Fact>
              <Fact k="Source">{c.sources?.length ? c.sources.map((s, i) => <span key={s.url}>{i > 0 ? ' and ' : null}<A href={s.url}>{s.label}</A> ({s.date})</span>) : '—'}</Fact>
            </dl>
          </article>
        ))}
      </div>
      {w.after?.length ? <div style={{ marginTop: 16 }}>{blocks(w.after)}</div> : null}
    </>
  );
}

/** Turn a JSON spec into the treatment page template's data: the same six sections as /bpc-157. */
export function fromSpec(spec: Spec): TreatmentData {
  const s = spec.sections;
  if (!LANES.some((l) => l.key === spec.lanes[0])) throw new Error(`${spec.slug}: unknown lane ${spec.lanes[0]}`);
  return {
    slug: spec.slug,
    name: spec.name,
    lane: spec.lanes[0],
    peptide: spec.peptide,
    statusLine: `Statuses as of ${spec.checked ?? 'October 31, 2026'}. Clinical review: pending.`,
    track: spec.track,
    sections: [
      { title: 'What it is', body: blocks(s.what) },
      { title: 'Research', body: blocks(s.research) },
      { title: 'US position', body: blocks(s.us) },
      { title: 'Around the world', body: world(s.world) },
      { title: 'Documented side effects', body: blocks(s.side) },
      {
        title: 'Talk to a clinician',
        body: (
          <>
            <p className="bodyLead">Questions about {spec.name} and your own health belong with a licensed clinician. This site reports published research and regulator records; it does not offer, sell or prescribe any treatment.</p>
            <a href={CLINIC} className="btn btnLeather btnHuge" data-cta="clinician">Talk to a licensed clinician at Adonis Clinical</a>
          </>
        ),
      },
    ],
    sourcesTitle: `Sources — all checked ${spec.checked ?? 'October 31, 2026'}`,
  };
}
