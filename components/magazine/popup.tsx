'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';

/**
 * A button that opens a pop-up (a real <dialog>, shown modally): centered on paper with an ink top rule and an Anton title;
 * full screen on a phone, scrolling inside itself. Closes with ×, Escape or a click outside; focus moves in on open and back
 * to the button on close; the page behind does not scroll. With `hash`, that address hash (/#updates) opens it.
 */
export function PopupButton({ label, title, hash, children }: { label: string; title: string; hash?: string; children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const id = useId();

  const show = useCallback(() => {
    const d = dialog.current;
    if (!d || d.open) return;
    d.showModal();
    setOpen(true);
    closeBtn.current?.focus();
  }, []);
  const close = useCallback(() => dialog.current?.close(), []);

  // The dialog closed (×, Escape, outside click): unlock the page, return focus, drop our hash from the address.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      setOpen(false);
      button.current?.focus({ preventScroll: true });
      if (hash && window.location.hash === `#${hash}`) window.history.replaceState(null, '', window.location.pathname + window.location.search);
    };
    d.addEventListener('close', onClose);
    return () => d.removeEventListener('close', onClose);
  }, [hash]);

  // The page behind does not scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { html.style.overflow = prev; };
  }, [open]);

  // The hash opens it: on load, and when a link changes the hash (the footer's "Regulatory updates" on Home).
  useEffect(() => {
    if (!hash) return;
    const check = () => { if (window.location.hash === `#${hash}`) show(); };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, [hash, show]);

  return (
    <>
      <button type="button" ref={button} className="popupLink" onClick={show} aria-haspopup="dialog">
        {label.endsWith('→') ? <>{label.slice(0, -1).trimEnd()} <span className="popupArrow" aria-hidden="true">→</span></> : label}
      </button>
      <dialog ref={dialog} className="popup" aria-labelledby={`${id}-title`} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="popupInner">
          <button type="button" ref={closeBtn} className="popupClose" aria-label="Close" onClick={close}>×</button>
          <h2 id={`${id}-title`} className="popupTitle">{title}</h2>
          {children}
        </div>
      </dialog>
    </>
  );
}
