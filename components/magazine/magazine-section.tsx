/**
 * The Magazine Section: the part of Home and of each lane page between the header (banner, masthead, lane bar) and the
 * treatments section ("Find a treatment" on Home, "<Lane> treatments" on a lane page).
 *   Home: lead article and sidebar, Updates (UpdatesBlock), How we report (StandardsBand).
 *   Lane page: lane band, lead article, summary cards, How we report (StandardsBand). No Updates.
 */
export function MagazineSection({ children }: { children: React.ReactNode }) {
  return <div className="magazineSection" data-section="magazine">{children}</div>;
}
