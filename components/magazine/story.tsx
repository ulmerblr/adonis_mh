import fs from 'node:fs';
import path from 'node:path';
import Image, { type StaticImageData } from 'next/image';
import { A } from '@/components/ext';
import { Banned, Calendar, Mortar, People, ShieldX } from './glance-icons';

/**
 * The Magazine Section's story parts, shared by Home and the nine lane pages (one design):
 *   StoryPhoto: the photo with the headline and dek on it (or a sand placeholder until the photo exists);
 *   GlanceBox: the optional "At a glance" box the article (./article.tsx) wraps its text around.
 */
export type GlanceIcon = 'shield' | 'mortar' | 'banned' | 'people' | 'calendar';
export type GlanceRow = { icon: GlanceIcon; label: string; line: string; src?: { href: string; label: string } };
const ICONS: Record<GlanceIcon, () => React.ReactNode> = { shield: ShieldX, mortar: Mortar, banned: Banned, people: People, calendar: Calendar };

export type StoryPhotoData =
  | { kind: 'static'; src: StaticImageData; alt: string; caption: string; position: string }
  | { kind: 'file'; src: string; alt: string; caption: string; position: string }
  | { kind: 'placeholder' };

/** A lane's photo: the story's own photo if it names one, else public/images/photos/lane-<key>.jpg when it exists, else the sand placeholder. */
export function lanePhoto(key: string, alt: string, own?: { file: string; alt: string; position: string }): StoryPhotoData {
  if (own) return { kind: 'file', src: own.file, alt: own.alt, caption: 'Illustration: AI-generated image', position: own.position };
  const file = `/images/photos/lane-${key}.jpg`;
  return fs.existsSync(path.join(process.cwd(), 'public', file))
    ? { kind: 'file', src: file, alt, caption: 'Illustration: AI-generated image', position: '78% 30%' }
    : { kind: 'placeholder' };
}

/** EDU PROMPT 28: a lane's photo colours. backdrop fills the placeholder and tints the fade behind the headline; a cream
 *  headline colour turns the headline and dek cream (navy lanes keep the standard ink-and-navy headline). */
export type LaneColors = { backdrop: string; headline: string };
const rgbOf = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ');
const SAND = '#EDE5D3';
const NAVY = '#0F2C55';

export function StoryPhoto({ photo, headline, dek, as = 'h2', colors }: { photo: StoryPhotoData; headline: [string, string]; dek: string; as?: 'h1' | 'h2'; colors?: LaneColors }) {
  const H = as;
  const cream = !!colors && colors.headline.toUpperCase() !== NAVY;
  // Sand lanes keep the fade tone matched to their sand photo wall; every other lane fades into its own backdrop.
  const style = colors ? ({
    '--lane-backdrop': colors.backdrop,
    '--lane-headline': colors.headline,
    ...(colors.backdrop.toUpperCase() !== SAND ? { '--lane-fade': rgbOf(colors.backdrop) } : {}),
  } as React.CSSProperties) : undefined;
  const cls = ['spreadPhoto', photo.kind === 'placeholder' ? 'spreadPhotoPlaceholder' : '', cream ? 'spreadCream' : ''].filter(Boolean).join(' ');
  return (
    <div className={cls} style={style}>
      {photo.kind !== 'placeholder' ? (
        <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1180px) 744px, (min-width: 860px) 64vw, 100vw"
          style={{ objectFit: 'cover', objectPosition: photo.position }} />
      ) : null}
      <div className="spreadHead">
        <H className="spreadTitle"><span>{headline[0]}</span> <span className="spreadNavy">{headline[1]}</span></H>
        <p className="spreadDek">{dek}</p>
      </div>
      <p className="spreadCaption">{photo.kind === 'placeholder' ? 'Photo coming' : photo.caption}</p>
    </div>
  );
}

export function GlanceBox({ glance }: { glance: GlanceRow[] }) {
  return (
    <aside className="atGlance" aria-label="At a glance">
      <p className="glanceHead">At a glance</p>
      <ul>
        {glance.map((g) => (
          <li key={g.label}>
            <span className="glanceIcon">{ICONS[g.icon]()}</span>
            <span><span className="glanceLabel">{g.label}</span><span className="glanceLine">{g.line}</span>{g.src ? <span className="glanceLine">Source: <A href={g.src.href}>{g.src.label}</A></span> : null}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
