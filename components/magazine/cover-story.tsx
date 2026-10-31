import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { A } from '@/components/ext';
import { FDA_BRIEFING } from '@/content/articles/peptides';
import { Banned, Calendar, Mortar, People, ShieldX } from './glance-icons';

const GLANCE = [
  { icon: <ShieldX />, label: 'Not approved', line: 'No FDA approval for any use, in any country.' },
  { icon: <Mortar />, label: 'Compounding allowed', line: 'Under HHS conditions since Oct 30, 2026.' },
  { icon: <People />, label: '~80 people', line: 'Five human studies, all small.' },
  { icon: <Calendar />, label: '2 weeks max', line: 'Longest anyone took it in a study.' },
  { icon: <Banned />, label: 'Banned in sport', line: 'WADA class S0, at all times.' },
];

export type CoverPhoto = { src: StaticImageData; alt: string; caption: string; position: string } | null;

/**
 * Magazine Section, Home: the cover story as a magazine spread's left page. The photo carries the headline over its plain
 * wall; then the byline, the article (with the "At a glance" icon box floated inside it) and the pull quote.
 * `photo: null` shows a marked stand-in until the photo file is in the repo.
 */
export function CoverStory({ photo }: { photo: CoverPhoto }) {
  return (
    <article className="spreadArticle">
      <div className="spreadPhoto">
        {photo ? (
          <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1180px) 680px, (min-width: 860px) 58vw, 100vw"
            style={{ objectFit: 'cover', objectPosition: photo.position }} />
        ) : (
          <div className="spreadStandIn" role="img" aria-label="Photo to come">[ Photo: home-cover-record.jpg, not received yet ]</div>
        )}
        <div className="spreadHead">
          <h2 className="spreadTitle"><span>Six peptides.</span> <span className="spreadNavy">Zero approvals.</span></h2>
          <p className="spreadDek">HHS opened compounding to BPC-157 and five others. It didn’t approve them.</p>
        </div>
        {photo ? <p className="spreadCaption">{photo.caption}</p> : null}
      </div>
      <p className="spreadByline">Adonis Men’s Health · Checked Oct 31, 2026 · Clinical review pending</p>

      <div className="spreadText">
        <aside className="atGlance" aria-label="At a glance">
          <p className="glanceHead">At a glance</p>
          <ul>
            {GLANCE.map((g) => (
              <li key={g.label}>
                <span className="glanceIcon">{g.icon}</span>
                <span><span className="glanceLabel">{g.label}</span><span className="glanceLine">{g.line}</span></span>
              </li>
            ))}
          </ul>
        </aside>
        <p className="spreadDrop">On October 30, HHS said it won’t take action against licensed pharmacies and physicians that compound BPC-157, TB-500, KPV, MOTS-c, Epitalon and Semax, as long as they meet ten conditions.</p>
        <p>That is enforcement discretion. None of the six is FDA-approved, and the policy says so. It runs while FDA works through the rules on each one.</p>
        <p>FDA’s own scientists had recommended against adding BPC-157 to the compounding list. The advisory committee voted 8 to 6 to add it anyway.</p>
        <p>The human record behind BPC-157 is five published studies, about 80 people, and none longer than two weeks. Every one of them is listed, study by study, in <Link href="/bpc-157" className="spreadLink">the BPC-157 file</Link>.</p>
        <figure className="spreadPull">
          <blockquote>“We found no studies that administered BPC-157 to humans via the proposed oral, SC, nasal, or transdermal ROA.”</blockquote>
          <figcaption><A href={FDA_BRIEFING}>FDA briefing document, July 2026</A></figcaption>
        </figure>
      </div>
    </article>
  );
}
