import type { GlanceRow } from '@/components/magazine/story';
import type { LaneKey } from '@/lib/library';

/**
 * A lane page's story (content/lanes/<lane>.json): rendered by the shared Magazine Section story parts, like Home.
 * EDU PROMPT 24: one complete article in plain words, 900 to 1,000 words, with quotes inside sentences. Every direct
 * quote and every sourced fact has a footnote ([^key]) right after it; the Notes list at the end gives each cited source
 * (name, title, date, link). A treatment is linked once with [[/slug|words]]. No product mentions.
 */
/** EDU PROMPT 24: one note in an article's Notes list. Numbered by first citation in the body ([^key]). */
export type Note = { key: string; source: string; title: string; date: string; url: string };

export type LaneStory = {
  key: LaneKey;
  headline: [string, string];
  dek: string;
  photoAlt: string;
  /** The story's photo in public/images/photos/, when it has its own; else lane-<key>.jpg, else the sand placeholder. */
  photo?: { file: string; alt: string; position: string };
  byline: string;
  /**
   * EDU PROMPT 24: the article, 900 to 1,000 words, one string per paragraph. [[/slug|words]] links a treatment once;
   * [^key] places a footnote (a note in `notes`) right after the quote or fact it supports.
   */
  body: string[];
  notes: Note[];
  /** Optional in EDU PROMPT 24: used only where it helps the story. A pull quote is a line already in the article. */
  glance?: GlanceRow[];
  pull?: { quote: string; cite?: string; href?: string; note?: string };
};
