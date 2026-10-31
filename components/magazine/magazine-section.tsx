/**
 * The Magazine Section: the part of Home and of each lane page between the header (banner, masthead, lane bar) and the
 * treatments section ("Find a treatment" on Home, "<Lane> treatments" on a lane page).
 *   Home: lead article (left); sidebar (right): Key takeaways, Updates card (UpdatesCard), How we report card
 *   (StandardsCard), Inside. Each card opens a pop-up with the full content (PopupButton). At desktop width the two
 *   columns are balanced to end within 40px of each other (the lead photo height, --lead-photo-h, is the lever).
 *   Lane page: lane band, lead article, summary cards with the How we report card (StandardsCard) as the fourth. No Updates.
 */
export function MagazineSection({ children }: { children: React.ReactNode }) {
  return <div className="magazineSection" data-section="magazine">{children}</div>;
}
