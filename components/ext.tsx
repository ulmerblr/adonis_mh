export { CLINIC } from '@/lib/library';

/** An outside link: opens in a new tab. */
export function A({ href, children }: { href: string; children?: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children ?? href}</a>;
}

/** "Source: <citation>" with the citation as the link, or the bare address when there is no citation. */
export function Src({ href, label }: { href: string; label?: string }) {
  return <span className="src">Source: <A href={href}>{label ?? href}</A></span>;
}

export function Pill({ kind, children }: { kind: 'rust' | 'ink' | 'sand'; children: React.ReactNode }) {
  return <span className={`pill pill-${kind}`}>{children}</span>;
}

export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={className ? `label ${className}` : 'label'}>{children}</span>;
}
