import fs from 'node:fs';
import path from 'node:path';
import { CARD_TILES } from '@/content/card-tiles';
import { Icon } from './icons';
import s from './card.module.css';

/**
 * The treatment card (EDU PROMPT 39): a compact clinical summary at the top of every treatment page and of its app
 * screen, copied from the approved mockup. It reads only content/cards/<slug>.json (format and limits:
 * scripts/validate-cards.mjs). The header art is the lane's (public/images/cards/lane-card-<lane>.jpg; Recovery uses
 * lane-card-recovery-bpc157.jpg). scripts/render-cards.mjs saves each card as public/cards/adonis-<slug>-card.png and .pdf.
 */
export type CardData = {
  slug: string; lane: string; number: string; name: string; description: string;
  status: { class: string; studiedFor: string; humanEvidence: string; usStatus: string };
  studiedFor: { items: { label: string; detail?: string; evidence: 'Human' | 'Animal' | 'Human + animal'; tile: string }[]; note?: { lead: string; text: string } };
  mechanism: { steps: { label: string; icon: string }[]; bullets: string[] };
  evidence: { level: 1 | 2 | 3 | 4 | 5; bullets: string[] };
  notEstablished: { text: string; icon: string }[];
  practical: { halfLife: string; routes: string; pharmacokinetics: string; soldAs: string; monitored: string; sport: string };
  regulatory: { agency: string; text: string }[];
  references: string[];
  checked: string;
};

const LANE_NAME: Record<string, string> = { trt: 'TRT', weight: 'Weight', recovery: 'Recovery', vitality: 'Vitality', energy: 'Energy', brain: 'Brain', sleep: 'Sleep', 'hair-loss': 'Hair loss', skin: 'Skin', longevity: 'Longevity' };
const LEVEL = ['', 'LAB OR ANIMAL', 'CASE REPORTS', 'SMALL HUMAN', 'CONTROLLED TRIALS', 'FDA APPROVED'];
const PRACTICAL: [keyof CardData['practical'], string, string][] = [
  ['halfLife', 'Half-life', 'timer'], ['routes', 'Routes studied', 'route'], ['pharmacokinetics', 'Pharmacokinetics', 'bars'],
  ['soldAs', 'Sold as', 'bag'], ['monitored', 'Monitored in trials', 'pulse'], ['sport', 'Sport (WADA)', 'medal'],
];

export function cardData(slug: string): CardData | null {
  const f = path.join(process.cwd(), 'content/cards', `${slug}.json`);
  if (!fs.existsSync(f)) return null;
  const d = JSON.parse(fs.readFileSync(f, 'utf8')) as CardData;
  // a file still being written (only some fields) shows no card rather than a broken one
  return d.status && d.studiedFor && d.mechanism && d.evidence && d.notEstablished && d.practical && d.regulatory && d.references ? d : null;
}

export const headerArt = (lane: string) => `/images/cards/lane-card-${lane === 'recovery' ? 'recovery-bpc157' : lane}.jpg`;
export const cardFile = (slug: string, ext: 'png' | 'pdf') => `/cards/adonis-${slug}-card.${ext}`;

/** "**bold** words" -> <b>bold</b> words */
function Rich({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*)/).map((p, i) => (p.startsWith('**') ? <b key={i}>{p.slice(2, -2)}</b> : p))}</>;
}

export function TreatmentCard({ data }: { data: CardData }) {
  const items = data.studiedFor.items;
  const pics = items.filter((it) => CARD_TILES[it.tile]?.image).slice(0, 2);
  const apps = items.filter((it) => !pics.includes(it));
  return (
    <div className={s.outer} data-card={data.slug}>
      <article className={s.card} aria-label={`${data.name} treatment card`}>
        <header className={s.head} style={{ backgroundImage: `url(${headerArt(data.lane)})` }}>
          <div className={s.badge}><small>{LANE_NAME[data.lane] ?? data.lane}</small><b>{data.number}</b></div>
          <div className={s.title}><h1>{data.name}</h1><p>{data.description}</p></div>
          <div className={s.art} aria-hidden="true" />
        </header>

        <div className={s.status}>
          <div className={s.st}><Icon name="flask" /><span><span className={s.k}>Class</span><b>{data.status.class}</b></span></div>
          <div className={s.st}><Icon name="target" /><span><span className={s.k}>Studied for</span><b>{data.status.studiedFor}</b></span></div>
          <div className={s.st}><Icon name="bars" /><span><span className={s.k}>Human evidence</span><b>{data.status.humanEvidence}</b></span></div>
          <div className={s.st}><Icon name="shield" /><span><span className={s.k}>US status</span><b>{data.status.usStatus}</b></span></div>
        </div>

        <div className={s.grid}>
          <div className={s.col}>
            <section>
              <h2 className={s.h2}><Icon name="clockface" />Studied for</h2>
              {pics.length ? (
                <div className={s.pics}>
                  {pics.map((it) => (
                    <div key={it.label} className={s.pic} style={{ backgroundImage: `url(${CARD_TILES[it.tile].image})`, backgroundPosition: it.tile === 'tendon' ? 'center 45%' : undefined }}>
                      <div><small>{it.evidence}</small><b>{it.label}</b>{it.detail ? <small>{it.detail}</small> : null}</div>
                    </div>
                  ))}
                </div>
              ) : null}
              {apps.length ? (
                <div className={s.apps}>
                  {apps.map((it) => (
                    <div key={it.label} className={`${s.app} ${it.evidence !== 'Animal' ? s.h : ''}`}>
                      <Icon name={CARD_TILES[it.tile]?.icon ?? 'target'} /><b>{it.label}</b><small>{it.evidence}</small>
                    </div>
                  ))}
                </div>
              ) : null}
              {data.studiedFor.note ? <div className={s.note}><b>{data.studiedFor.note.lead}</b> {data.studiedFor.note.text}</div> : null}
            </section>

            <section>
              <h2 className={s.h2}><Icon name="arrow" />How it works in the body</h2>
              <div className={s.flow}>
                <div className={s.steps}>
                  {data.mechanism.steps.map((st, i) => (
                    <span key={st.label} style={{ display: 'contents' }}>
                      {i ? <span className={s.arr} aria-hidden="true">▶</span> : null}
                      <div className={s.sp}><Icon name={st.icon} /><b>{st.label}</b></div>
                    </span>
                  ))}
                </div>
                {data.mechanism.bullets.length ? <ul className={s.dots}>{data.mechanism.bullets.map((b) => <li key={b}><Rich text={b} /></li>)}</ul> : null}
              </div>
            </section>
          </div>

          <div className={s.col}>
            <section>
              <h2 className={s.h2}><Icon name="shield" />Evidence &amp; what&rsquo;s known</h2>
              <div className={s.evs}>
                <div className={`${s.pan} ${s.ev}`}>
                  <header><Icon name="bars" />Evidence</header>
                  <div className={s.in}>
                    <div className={s.level}><b>{LEVEL[data.evidence.level]}</b><small>Level {data.evidence.level} of 5</small></div>
                    <div className={s.ladder} aria-hidden="true">{[1, 2, 3, 4, 5].map((n) => <i key={n} className={n <= data.evidence.level ? s.on : undefined} />)}</div>
                    <ul>{data.evidence.bullets.map((b) => <li key={b}><Rich text={b} /></li>)}</ul>
                  </div>
                </div>
                <div className={`${s.pan} ${s.un}`}>
                  <header><Icon name="question" />Not yet established</header>
                  <div className={s.in}>
                    {data.notEstablished.length ? (
                      <ul className={s.unk}>{data.notEstablished.map((n) => <li key={n.text}><Icon name={n.icon} />{n.text}</li>)}</ul>
                    ) : <ul className={s.unk}><li><Icon name="info" />None listed</li></ul>}
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h2 className={s.h2}><Icon name="alert" />Quick practical info</h2>
              <div className={s.qp}>
                {PRACTICAL.map(([key, label, icon]) => (
                  <div key={key} className={s.q}><Icon name={icon} /><span><span className={s.k}>{label}</span><b>{data.practical[key]}</b></span></div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className={s.reg}>
          <span className={s.k}>Regulatory</span>
          {data.regulatory.map((r) => <span key={r.agency + r.text} className={s.rg}><span>{r.agency}</span><em>{r.text}</em></span>)}
        </div>

        <div className={s.refs}>
          <div><span className={s.k}>References</span>
            <ol>{data.references.map((r) => <li key={r}>{r}</li>)}</ol>
          </div>
          <div className={s.disc}><Icon name="info" /><span>Adonis Men&rsquo;s Health · checked {data.checked}. Research and regulator records only. Not medical advice.<span className={s.site}>adonismenshealth.com</span></span></div>
        </div>
      </article>
    </div>
  );
}

/** "Download card (image)" and "Download card (PDF)": the files scripts/render-cards.mjs saves. */
export function CardDownloads({ slug }: { slug: string }) {
  return (
    <div className={s.dl}>
      <a className={s.btn} href={cardFile(slug, 'png')} download={`adonis-${slug}-card.png`}><Icon name="download" />Download card (image)</a>
      <a className={`${s.btn} ${s.alt}`} href={cardFile(slug, 'pdf')} download={`adonis-${slug}-card.pdf`}><Icon name="download" />Download card (PDF)</a>
    </div>
  );
}

/** The card and its two buttons, for the top of a treatment page (and its app screen). Nothing when no card exists. */
export function CardBlock({ slug }: { slug: string }) {
  const data = cardData(slug);
  if (!data) return null;
  return (
    <section className="treatmentCard">
      <div className="wrap">
        <TreatmentCard data={data} />
        <CardDownloads slug={slug} />
      </div>
    </section>
  );
}
