import { A, Label } from '@/components/ext';
import { Jump } from '@/components/jump';
import { Track } from '@/components/track';
import { LANES, type LaneKey } from '@/lib/library';
import type { Step } from '@/lib/tracks';

/**
 * THE TREATMENT PAGE TEMPLATE. Every treatment page uses this, in this order, so they all read alike, like a government
 * reference page:
 *   1. shared banner, masthead and lane bar (the root layout; the lane bar marks the treatment's lane)
 *   2. the treatment name as a plain h1, with small labels for its lane and "Peptide" where it applies
 *   3. one status line ("Statuses as of …. Clinical review: …")
 *   4. Where it stands (the track)
 *   5. the section jump grid
 *   6. the six numbered sections: What it is, Research, US position, Around the world, Documented side effects,
 *      Talk to a clinician
 *   7. Sources (every outside link on the page, once each), then the shared footer
 *
 * A new treatment: add its data file under content/treatments/ (see bpc-157.tsx), its track in lib/tracks.ts, a short route
 * at app/<slug>/page.tsx (see app/bpc-157/page.tsx), and page.href on its row in lib/library.ts. The lane bar finds its lane
 * from that row.
 */
export type TreatmentData = {
  slug: string;
  name: string;
  lane: LaneKey;
  peptide?: boolean;
  /** The one status line under the title. */
  statusLine: string;
  /** Where it stands: the steps, from lib/tracks.ts. */
  track: Step[];
  /** Exactly six, in the template's order. */
  sections: [Section, Section, Section, Section, Section, Section];
  /** The heading of the Sources list, with its checked date. */
  sourcesTitle: string;
  sources: string[];
};
export type Section = { title: string; body: React.ReactNode };

export function Sec({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="tSection" id={`s${n}`}>
      <div className="wrap">
        <div className="secHead"><span className="secNum" aria-hidden="true">{n}</span><h2 className="h2"><span className="srOnly">{n}. </span>{title}</h2></div>
        {children}
      </div>
    </section>
  );
}

export function Fact({ k, children }: { k: string; children: React.ReactNode }) {
  return <div><dt>{k}</dt><dd>{children}</dd></div>;
}

export function TreatmentPage({ data }: { data: TreatmentData }) {
  const lane = LANES.find((l) => l.key === data.lane)!;
  return (
    <>
      <section className="govTitle">
        <div className="wrap">
          <h1 className="govH1">{data.name}</h1>
          <div className="titleLabels"><Label>{lane.name}</Label>{data.peptide ? <Label>Peptide</Label> : null}</div>
          <p className="asOf">{data.statusLine}</p>

          <div className="secHead" style={{ marginTop: 28 }}><h2 className="h2">Where it stands</h2><Label>The path every drug takes</Label></div>
          <Track name={data.name} steps={data.track} />
          <Jump />
        </div>
      </section>

      {data.sections.map((s, i) => <Sec key={s.title} n={i + 1} title={s.title}>{s.body}</Sec>)}

      <section className="tSection">
        <div className="wrap">
          <div className="secHead"><h2 className="h2">{data.sourcesTitle}</h2></div>
          <ol className="sources">
            {data.sources.map((s) => <li key={s}><A href={s} /></li>)}
          </ol>
        </div>
      </section>
    </>
  );
}
