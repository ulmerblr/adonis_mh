import type { GlanceRow } from '@/components/magazine/story';
import type { LaneKey } from '@/lib/library';

/**
 * A lane page's story (content/lanes/<lane>.json): rendered by the shared Magazine Section story parts, like Home.
 * Body (EDU PROMPT 21): the Adonis summary (3 or 4 short paragraphs, drop cap, At a glance, one pull quote), then
 * "From the record": 5 to 8 word-for-word excerpts, regulator first, then trials, then reporting. Government records may
 * run to a paragraph; journals, law firms and news outlets one or two sentences, always linked. Summary text may link a
 * treatment once with [[/slug|words]]. Every claim is backed by `sources` (dated). No product mentions.
 */
export type Excerpt = {
  quote: string;
  source: string;
  date: string;
  href: string;
  kind: 'regulator' | 'trial' | 'reporting';
  note?: string;
};

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
  body?: string[];
  notes?: Note[];
  /** Optional in EDU PROMPT 24: used only where it helps the story. A pull quote is a line already in the article. */
  glance?: GlanceRow[];
  pull?: { quote: string; cite?: string; href?: string; note?: string };
  /** Before EDU PROMPT 24 (removed once all ten lanes are rewritten). */
  summary?: string[];
  excerpts?: Excerpt[];
  sources?: { url: string; label: string; date: string }[];
};
