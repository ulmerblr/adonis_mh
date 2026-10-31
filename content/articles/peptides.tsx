import { A } from '@/components/ext';
import type { Article } from '@/components/lead-article';

export const FDA_BRIEFING = 'https://www.fda.gov/media/193343/download';

/** The lead story on Home and on the Recovery lane page. */
export const peptidesArticle: Article = {
  photo: '[ Photo: lead story ]',
  kicker: 'Recovery · Peptides',
  headline: 'HHS opened compounding to six peptides. It didn’t approve them.',
  byline: 'Adonis Men’s Health · Checked Oct 31, 2026 · Clinical review pending',
  body: (
    <>
      <p className="dropcap">On October 30, HHS said it won’t take action against licensed pharmacies and physicians that compound BPC-157, TB-500, KPV, MOTS-c, Epitalon and Semax, as long as they meet ten conditions.</p>
      <p>That is enforcement discretion. None of the six is FDA-approved, and the policy says so. It runs while FDA works through the rules on each one.</p>
      <p>FDA’s own scientists had recommended against adding BPC-157 to the compounding list. The advisory committee voted 8 to 6 to add it anyway, as reported by Healio from the July 23–24, 2026 meeting. FDA has not posted the official vote record.</p>
    </>
  ),
  after: (
    <>
      <figure className="pull">
        <blockquote>“We found no studies that administered BPC-157 to humans via the proposed oral, SC, nasal, or transdermal ROA.”</blockquote>
        <figcaption><A href={FDA_BRIEFING}>FDA briefing document, July 2026</A></figcaption>
      </figure>
      <div className="bigStat">
        <span className="bigStatNum">2 wk</span>
        <p>The longest anyone has taken BPC-157 in a published human study.</p>
      </div>
    </>
  ),
  takeaways: [
    'Not FDA-approved for any use, in any country.',
    'Pharmacies may compound it under HHS conditions since Oct 30, 2026.',
    'About 80 people studied. No study used the shots or pills people take.',
    'Banned in sport at all times (WADA S0).',
  ],
};

/** A lane with no story yet: marked placeholders, so nothing invented appears. */
export function placeholderArticle(lane: string): Article {
  return {
    photo: `[ Photo: ${lane} lead story ]`,
    kicker: lane,
    headline: `[ ${lane} lead story — to be written ]`,
    byline: '[ Byline to be written ]',
    body: <p>[ Article to be written from published records. ]</p>,
    takeaways: ['[ To be written ]'],
    placeholder: true,
  };
}
