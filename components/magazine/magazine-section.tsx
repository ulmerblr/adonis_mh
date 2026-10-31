/**
 * The Magazine Section: the part of Home and of each lane page between the header (banner, masthead, lane bar) and the
 * treatments section ("Find a treatment" on Home, "<Lane> treatments" on a lane page).
 *   Home: lead article and sidebar; under the article, two cards: Updates (UpdatesCard) and How we report (StandardsCard),
 *   each opening a pop-up with the full content (PopupButton).
 *   Lane page: lane band, lead article, summary cards with the How we report card (StandardsCard) as the fourth. No Updates.
 */
export function MagazineSection({ children }: { children: React.ReactNode }) {
  return <div className="magazineSection" data-section="magazine">{children}</div>;
}
