import fs from 'node:fs';
import path from 'node:path';
import { cloneElement, isValidElement } from 'react';
import { fromSpec, type Spec } from '@/components/treatment/from-spec';
import type { TreatmentData } from '@/components/treatment/template';
import { bpc157 } from '@/content/treatments/bpc-157';
import { LANES, TREATMENTS } from '@/lib/library';

/** EDU PROMPT 26: the app view reads the same treatment data as the magazine pages (no copy of the content). */

/** Every treatment that has a page, by slug (from the rows' page links). */
export const APP_SLUGS: string[] = [...new Set(LANES.flatMap((l) => TREATMENTS[l.key].flatMap((t) => (t.page ? [t.page.href.slice(1)] : []))))];

export function treatmentData(slug: string): TreatmentData | null {
  if (!APP_SLUGS.includes(slug)) return null;
  if (slug === 'bpc-157') return bpc157;
  const file = path.join(process.cwd(), 'content/treatments', `${slug}.json`);
  return fs.existsSync(file) ? fromSpec(JSON.parse(fs.readFileSync(file, 'utf8')) as Spec) : null;
}

/** Inside the app, a link to another treatment page opens that treatment's app page (/app/<slug>), not the magazine page. */
export function appLinks(node: React.ReactNode): React.ReactNode {
  if (Array.isArray(node)) return node.map(appLinks);
  if (!isValidElement(node)) return node;
  const props = node.props as { href?: unknown; children?: React.ReactNode };
  const next: { href?: string; children?: React.ReactNode } = {};
  if (typeof props.href === 'string') {
    const m = props.href.match(/^\/([a-z0-9-]+)(#.*)?$/);
    if (m && APP_SLUGS.includes(m[1])) next.href = `/app/${m[1]}${m[2] ?? ''}`;
  }
  if (props.children !== undefined) next.children = appLinks(props.children);
  return Object.keys(next).length ? cloneElement(node, next) : node;
}

export function appData(data: TreatmentData): TreatmentData {
  return { ...data, sections: data.sections.map((s) => ({ ...s, body: appLinks(s.body) })) as TreatmentData['sections'] };
}
