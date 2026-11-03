'use client';

import { useEffect, useRef, useState } from 'react';
import { LISTEN } from '@/content/listen';

/**
 * Home only: "Worth a listen", the monthly editor's pick (content/listen.ts), in the Magazine Section's right column under
 * How we report. A compact, lazy-loaded Spotify embed; if the embed does not load (blocked or failed), a plain
 * "Listen on Spotify" link takes its place.
 */
export function ListenCard() {
  const p = LISTEN;
  const [state, setState] = useState<'waiting' | 'loaded' | 'failed'>('waiting');
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    // The embed is lazy: only start the timeout once it is near the screen.
    const el = frame.current; if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { timer = setTimeout(() => setState((s) => (s === 'loaded' ? s : 'failed')), 10000); io.disconnect(); }
    }, { rootMargin: '200px' });
    io.observe(el);
    return () => { io.disconnect(); if (timer) clearTimeout(timer); };
  }, []);
  return (
    <div className="briefCard listenCard">
      <span className="label">Worth a listen · {p.month}</span>
      <h3 className="briefHead listenTitle">{p.title}</h3>
      <p className="listenMeta">{p.show} · with {p.guest} · {p.released}</p>
      <p className="listenNote">{p.note}</p>
      {state !== 'failed' ? (
        <iframe ref={frame} className="listenEmbed" src={`${p.embedUrl}?utm_source=generator`} title={`Spotify player: ${p.title}`}
          height={152} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          onLoad={() => setState('loaded')} onError={() => setState('failed')} />
      ) : null}
      {state === 'failed' ? <a className="btn btnOutline listenLink" href={p.spotifyUrl} target="_blank" rel="noopener noreferrer">Listen on Spotify →</a> : null}
      <noscript><a className="btn btnOutline listenLink" href={p.spotifyUrl} target="_blank" rel="noopener noreferrer">Listen on Spotify →</a></noscript>
      <p className="listenSmall">{p.smallPrint}</p>
    </div>
  );
}
