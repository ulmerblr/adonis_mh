import type { GlanceRow } from '@/components/magazine/story';
import type { LaneKey } from '@/lib/library';

/**
 * A lane page's story (content/lanes/<lane>.json): rendered by the shared Magazine Section story parts, like Home.
 * Paragraph text may link a treatment once with [[/slug|words]]. Every claim is backed by `sources` (dated).
 */
export type LaneStory = {
  key: LaneKey;
  headline: [string, string];
  dek: string;
  photoAlt: string;
  byline: string;
  paragraphs: string[];
  glance: GlanceRow[];
  pull: { quote: string; cite: string; href: string };
  sources: { url: string; label: string; date: string }[];
};
