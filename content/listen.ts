/**
 * EDU PROMPT 32: "Worth a listen", the monthly editor's pick (Home, Magazine Section right column, under How we report).
 * To change the pick: run `node scripts/archive-listen.mjs` (saves the current pick to content/archive/listen/ with its
 * dates), then edit the fields below. Title, show and release date come from Spotify's oEmbed endpoint and episode page.
 */
export type ListenPick = {
  month: string;        // the month the pick runs, shown in the card label
  pickedOn: string;     // date the pick went up
  title: string;
  show: string;
  host: string;
  guest: string;
  released: string;     // episode release date, from Spotify
  length: string;
  note: string;
  smallPrint: string;
  spotifyUrl: string;
  embedUrl: string;
};

export const LISTEN: ListenPick = {
  month: 'November 2026',
  pickedOn: 'Nov 3, 2026',
  title: 'Are Peptides Legal? A Peptide Lawyer on Research Peptides & the FDA | Jeff Cohen',
  show: 'Muscle Intelligence',
  host: 'Ben Pakulski',
  guest: 'Jeff Cohen',
  released: 'Nov 2, 2026',
  length: '1 hr 51 min',
  note: 'Listen to the first 50 minutes: what ‘Research Use Only’ really means, where the FDA stands on BPC-157, and the fight over retatrutide.',
  smallPrint: 'Views are the speakers’ own. Not reviewed by Adonis. Not medical advice.',
  spotifyUrl: 'https://open.spotify.com/episode/7Hy5lyCKTuwrN3ENsbEZr9',
  embedUrl: 'https://open.spotify.com/embed/episode/7Hy5lyCKTuwrN3ENsbEZr9',
};
