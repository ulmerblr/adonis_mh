import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { A } from '@/components/ext';
import { FDA_BRIEFING } from '@/content/articles/peptides';
import { Banned, Mortar, ShieldX } from './glance-icons';

const GLANCE: { icon: React.ReactNode; label: string; line: string; src?: { href: string; label: string } }[] = [
  { icon: <ShieldX />, label: 'None FDA-approved', line: 'None of the six has FDA approval for any use.' },
  { icon: <Mortar />, label: 'Compounding allowed', line: 'All six, under HHS conditions since Oct 30, 2026.' },
  { icon: <Banned />, label: 'Sport bans', line: 'BPC-157, TB-500 and MOTS-c are named on WADA’s list. KPV, Epitalon and Semax are not.', src: { href: 'https://www.wada-ama.org/sites/default/files/2025-09/2026list_en_final_clean_september_2025.pdf', label: 'WADA 2026 Prohibited List (BPC-157: S0; TB-500: S2.3; MOTS-c: S4.4.1)' } },
];

export type CoverPhotoData = { src: StaticImageData; alt: string; caption: string; position: string };

/**
 * Magazine Section, Home, row 1 left: the cover photo with the headline and dek on its plain wall. In the grid its
 * height matches the "In this issue" box beside it (the cell stretches to the row).
 */
export function CoverPhoto({ photo }: { photo: CoverPhotoData }) {
  return (
    <div className="spreadPhoto">
      <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1180px) 744px, (min-width: 860px) 64vw, 100vw"
        style={{ objectFit: 'cover', objectPosition: photo.position }} />
      <div className="spreadHead">
        <h2 className="spreadTitle"><span>Six peptides.</span> <span className="spreadNavy">Zero FDA approvals.</span></h2>
        <p className="spreadDek">HHS opened compounding to BPC-157 and five others. It didn’t approve them.</p>
      </div>
      <p className="spreadCaption">{photo.caption}</p>
    </div>
  );
}

/** Magazine Section, Home, row 2 left: the byline, the article (with the "At a glance" box floated inside it), the pull quote. */
export function CoverArticle() {
  return (
    <article className="spreadArticle">
      <p className="spreadByline">Adonis Men’s Health · Checked Oct 31, 2026 · Clinical review pending</p>
      <div className="spreadText">
        <aside className="atGlance" aria-label="At a glance">
          <p className="glanceHead">At a glance</p>
          <ul>
            {GLANCE.map((g) => (
              <li key={g.label}>
                <span className="glanceIcon">{g.icon}</span>
                <span><span className="glanceLabel">{g.label}</span><span className="glanceLine">{g.line}</span>{g.src ? <span className="glanceLine">Source: <A href={g.src.href}>{g.src.label}</A></span> : null}</span>
              </li>
            ))}
          </ul>
        </aside>
        <p className="spreadDrop">On October 30, HHS said it won’t take action against licensed pharmacies and physicians that compound BPC-157, TB-500, KPV, MOTS-c, Epitalon and Semax, as long as they meet ten conditions.</p>
        <p>The notice, signed by HHS Secretary Robert F. Kennedy Jr., was filed with the Federal Register on October 28 and published on October 30 under Docket HHS-OASH-2026-0496. It covers state-licensed pharmacies, federal facilities and licensed physicians. The public can comment for two weeks after publication.</p>
        <p>This is enforcement discretion, not approval. None of the six is FDA-approved, and the policy says so. It does not add them to FDA’s list of ingredients pharmacies may compound with, it is not binding on HHS, and HHS says it may revisit the policy if a safety signal or product-quality problem appears. It runs while FDA writes rules on each peptide.</p>
        <p>Compounded drugs are not FDA-approved either. FDA does not review their safety, effectiveness or quality before they are sold.</p>
        <p>The policy follows a July meeting of FDA’s Pharmacy Compounding Advisory Committee. The committee reviewed seven peptides and recommended six of them; it rejected the seventh, emideltide. FDA’s own career scientists had recommended against all seven. On BPC-157, the vote was 8 to 6, with one abstention. These vote details are as reported by Healio from the July 23–24, 2026 meeting. FDA has not posted the official vote record.</p>
        <p>The human record behind BPC-157 is five published studies, about 80 people, and none longer than two weeks. Every one of them is listed, study by study, in <Link href="/bpc-157" className="spreadLink">the BPC-157 file</Link>. Files on the other five peptides are being written.</p>
        <figure className="spreadPull">
          <blockquote>“We found no studies that administered BPC-157 to humans via the proposed oral, SC, nasal, or transdermal ROA.”</blockquote>
          <figcaption><A href={FDA_BRIEFING}>FDA briefing document, July 2026</A></figcaption>
        </figure>
      </div>
    </article>
  );
}
