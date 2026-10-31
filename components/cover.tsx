import Link from 'next/link';

const STACK = [
  { n: '5', label: 'Human studies, ever' },
  { n: '~80', label: 'People ever studied' },
  { n: '2 wk', label: 'Longest anyone took it' },
  { n: '0', label: 'Approvals, any country' },
];

/** The navy magazine cover: tag, huge headline (white then gold), dek, the number stack; the photo slot with its burst. */
export function Cover({ tag, title, gold, dek, dekClass, buttons = false, asH1 = true }: {
  tag: string; title: string; gold: string; dek: React.ReactNode; dekClass?: string; buttons?: boolean; asH1?: boolean;
}) {
  const H = asH1 ? 'h1' : 'h2';
  return (
    <section className="cover">
      <div className="wrap coverGrid">
        <div className="coverText">
          <span className="coverTag">{tag}</span>
          <H className="coverHead"><span>{title}</span> <span className="coverGold">{gold}</span></H>
          <div className={dekClass ? `coverDek ${dekClass}` : 'coverDek'}>{dek}</div>
          <dl className="stack">
            {STACK.map((s) => (
              <div key={s.label}><dt className="stackNum">{s.n}</dt><dd className="stackLabel">{s.label}</dd></div>
            ))}
          </dl>
        </div>
        <div className="coverPhoto">
          <div className="burst" aria-label="100+ animal studies"><span className="burstNum">100+</span><span className="burstText">Animal studies</span></div>
          <div className="coverSlot">[ Photo: a working man, outdoors, mid-job ]</div>
          {buttons ? (
            <div className="coverBtns">
              <Link href="/bpc-157" className="btn btnPunch">Read the file →</Link>
              <Link href="/how-we-report" className="btn btnPaper">How we report</Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
