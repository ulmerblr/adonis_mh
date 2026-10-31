import fs from 'node:fs';
import path from 'node:path';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { A } from '@/components/ext';
import { Banned, Calendar, Mortar, People, ShieldX } from './glance-icons';

/**
 * The Magazine Section's story parts, shared by Home and the nine lane pages (one design):
 *   StoryPhoto: the photo with the headline and dek on it (or a sand placeholder until the photo exists);
 *   StoryArticle: the byline, the article with the "At a glance" box wrapped into it, the drop cap and one pull quote.
 */
export type GlanceIcon = 'shield' | 'mortar' | 'banned' | 'people' | 'calendar';
export type GlanceRow = { icon: GlanceIcon; label: string; line: string; src?: { href: string; label: string } };
const ICONS: Record<GlanceIcon, () => React.ReactNode> = { shield: ShieldX, mortar: Mortar, banned: Banned, people: People, calendar: Calendar };

export type StoryPhotoData =
  | { kind: 'static'; src: StaticImageData; alt: string; caption: string; position: string }
  | { kind: 'file'; src: string; alt: string; caption: string; position: string }
  | { kind: 'placeholder' };

/** A lane's photo: public/images/photos/lane-<key>.jpg when it exists, else the sand placeholder. */
export function lanePhoto(key: string, alt: string): StoryPhotoData {
  const file = `/images/photos/lane-${key}.jpg`;
  return fs.existsSync(path.join(process.cwd(), 'public', file))
    ? { kind: 'file', src: file, alt, caption: 'Illustration: AI-generated image', position: '78% 30%' }
    : { kind: 'placeholder' };
}

export function StoryPhoto({ photo, headline, dek, as = 'h2' }: { photo: StoryPhotoData; headline: [string, string]; dek: string; as?: 'h1' | 'h2' }) {
  const H = as;
  return (
    <div className={photo.kind === 'placeholder' ? 'spreadPhoto spreadPhotoPlaceholder' : 'spreadPhoto'}>
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

export function StoryArticle({ byline, glance, paragraphs, pull }: {
  byline: string; glance: GlanceRow[]; paragraphs: React.ReactNode[]; pull: { quote: string; cite: string; href: string };
}) {
  return (
    <article className="spreadArticle">
      <p className="spreadByline">{byline}</p>
      <div className="spreadText">
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
        {paragraphs.map((p, i) => <p key={i} className={i === 0 ? 'spreadDrop' : undefined}>{p}</p>)}
        <figure className="spreadPull">
          <blockquote>{`“${pull.quote}”`}</blockquote>
          <figcaption><A href={pull.href}>{pull.cite}</A></figcaption>
        </figure>
      </div>
    </article>
  );
}

/** Story text with links: [[/slug|words]] becomes a link to that treatment page. */
export function linkify(text: string): React.ReactNode {
  const out: React.ReactNode[] = []; let last = 0; let k = 0;
  for (const m of text.matchAll(/\[\[(\/[a-z0-9-]+)\|([^\]]+)\]\]/g)) {
    out.push(text.slice(last, m.index));
    out.push(<Link key={k++} href={m[1]} className="spreadLink">{m[2]}</Link>);
    last = (m.index ?? 0) + m[0].length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}
