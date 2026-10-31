import { Label } from './ext';

export type Article = {
  photo: string;
  kicker: string;
  headline: string;
  byline: string;
  /** The two-column body. */
  body: React.ReactNode;
  /** Under the body: pull quote, big stat. */
  after?: React.ReactNode;
  takeaways: string[];
  /** Not written yet: shown in soft gray italics so it is obviously not content. */
  placeholder?: boolean;
};

/** The health-letter lead story: wide photo slot, kicker, headline, byline strip, two-column body; sidebar with takeaways. */
export function LeadArticle({ a, sidebarExtra, articleExtra, headingLevel = 'h2', balanced = false }: {
  a: Article; sidebarExtra?: React.ReactNode; articleExtra?: React.ReactNode; headingLevel?: 'h1' | 'h2';
  /** Home's Magazine Section: the two columns balanced at desktop width (globals.css, .leadBalanced). */
  balanced?: boolean;
}) {
  const H = headingLevel;
  const ph = a.placeholder ? ' ph' : '';
  return (
    <section className={balanced ? 'section leadSection leadBalanced' : 'section leadSection'}>
      <div className="wrap articleGrid">
        <article className="article">
          <div className="leadPhoto">{a.photo}</div>
          <Label>{a.kicker}</Label>
          <H className={`articleHead${ph}`}>{a.headline}</H>
          <p className={`byline${ph}`}>{a.byline}</p>
          <div className={`columns${ph}`}>{a.body}</div>
          {a.after}
          {articleExtra}
        </article>
        <aside className="sidebar">
          <div className="takeaways">
            <p className="boxHead">Key takeaways</p>
            <ol>
              {a.takeaways.map((t, i) => <li key={t} className={a.placeholder ? 'ph' : undefined}><span className="tNum" aria-hidden="true">{i + 1}</span><span>{t}</span></li>)}
            </ol>
          </div>
          {sidebarExtra}
        </aside>
      </div>
    </section>
  );
}
