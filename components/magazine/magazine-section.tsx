/**
 * The Magazine Section: the part of Home and of each lane page between the header (banner, masthead, lane bar) and the
 * treatments section ("Find a treatment" on Home, "<Lane> treatments" on a lane page).
 *   Home: a two-by-two grid, 2/3 + 1/3 (cover-story.tsx). Row 1: the cover photo with the headline in it, its height
 *   matching "In this issue" (in-this-issue.tsx, data in content/home/in-this-issue.ts). Row 2: the byline and article
 *   (with the "At a glance" icon box), and the Updates and How we report cards (each opening a pop-up).
 *   Lane page: lane band, lead article, summary cards with the How we report card (StandardsCard) as the fourth. No Updates.
 */
export function MagazineSection({ children }: { children: React.ReactNode }) {
  return <div className="magazineSection" data-section="magazine">{children}</div>;
}
