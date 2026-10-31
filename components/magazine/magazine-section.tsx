/**
 * The Magazine Section: the part of Home and of each lane page between the header (banner, masthead, lane bar) and the
 * treatments section ("Find a treatment" on Home, "<Lane> treatments" on a lane page).
 *   Home: a magazine spread, 60/40 (cover-story.tsx): left, the cover story (photo with the headline in it, byline,
 *   article with the "At a glance" icon box, pull quote); right, In this issue (in-this-issue.tsx, data in
 *   content/home/in-this-issue.ts), the Updates card and the How we report card (each opening a pop-up).
 *   Lane page: lane band, lead article, summary cards with the How we report card (StandardsCard) as the fourth. No Updates.
 */
export function MagazineSection({ children }: { children: React.ReactNode }) {
  return <div className="magazineSection" data-section="magazine">{children}</div>;
}
