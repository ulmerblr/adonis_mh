import { isValidElement } from 'react';
import { A, CLINIC, Label } from '@/components/ext';
import { Track } from '@/components/track';
import { LANES, type LaneKey } from '@/lib/library';
import type { Step } from '@/lib/tracks';
import { CardBlock } from '@/components/card/treatment-card';
import { TreatmentTabs, type TabDef } from './tabs';

/** The six section tabs, in the template's order: their labels and their address hashes. */
export const TABS: TabDef[] = [
  { id: 'what-it-is', label: 'What it is' },
  { id: 'research', label: 'Research' },
  { id: 'us-status', label: 'US status' },
  { id: 'worldwide', label: 'Worldwide' },
  { id: 'side-effects', label: 'Side effects' },
  { id: 'clinician', label: 'Clinician' },
];

/**
 * THE TREATMENT PAGE TEMPLATE. Every treatment page uses this, in this order, so they all read alike, like a government
 * reference page:
 *   1. shared banner, masthead and lane bar (the root layout; the lane bar marks the treatment's lane)
 *   2. the treatment name as a plain h1, with small labels for its lane and "Peptide" where it applies
 *   3. one status line ("Statuses as of …. Clinical review: …")
 *   4. Where it stands (the track)
 *   5. the six section tabs (What it is, Research, US status, Worldwide, Side effects, Clinician); one open at a time,
 *      each with an address hash (components/treatment/tabs.tsx)
 *   6. the open tab's numbered section: What it is, Research, US position, Around the world, Documented side effects,
 *      Talk to a clinician (every section stays in the HTML; closed ones are hidden)
 *   7. inside each tab, after its section: that section's Sources (every outside link in it, once each, in the order
 *      they appear; Adonis Clinical is not a source), then the shared footer
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

/** Every outside source a section links to, once each, in the order it appears (Adonis Clinical is not a source). */
export function sourcesOf(node: React.ReactNode, out: string[] = []): string[] {
  if (Array.isArray(node)) { node.forEach((n) => sourcesOf(n, out)); return out; }
  if (!isValidElement(node)) return out;
  const props = node.props as { href?: unknown; children?: React.ReactNode };
  if (typeof props.href === 'string' && /^https?:/.test(props.href) && !props.href.startsWith(CLINIC) && !out.includes(props.href)) out.push(props.href);
  if (props.children !== undefined) sourcesOf(props.children, out);
  return out;
}

function SectionSources({ title, urls }: { title: string; urls: string[] }) {
  if (!urls.length) return null;
  return (
    <div className="tabSources">
      <div className="secHead"><h3 className="h2">{title}</h3></div>
      <ol className="sources">
        {urls.map((u) => <li key={u}><A href={u} /></li>)}
      </ol>
    </div>
  );
}

export function TreatmentPage({ data }: { data: TreatmentData }) {
  const lane = LANES.find((l) => l.key === data.lane)!;
  return (
    <>
      {/* EDU PROMPT 39: the treatment card and its download buttons, above the write-up. */}
      <CardBlock slug={data.slug} />
      <section className="govTitle">
        <div className="wrap">
          <h1 className="govH1">{data.name}</h1>
          <div className="titleLabels"><Label>{lane.name}</Label>{data.peptide ? <Label>Peptide</Label> : null}</div>
          <p className="asOf">{data.statusLine}</p>

          <div className="secHead" style={{ marginTop: 28 }}><h2 className="h2">Where it stands</h2><Label>The path every drug takes</Label></div>
          <Track name={data.name} steps={data.track} />
        </div>
      </section>

      <TreatmentTabs tabs={TABS}>
        {data.sections.map((s, i) => (
          <Sec key={s.title} n={i + 1} title={s.title}>
            {s.body}
            <SectionSources title={data.sourcesTitle} urls={sourcesOf(s.body)} />
          </Sec>
        ))}
      </TreatmentTabs>

    </>
  );
}
