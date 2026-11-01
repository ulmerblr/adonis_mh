import Image from 'next/image';
import Link from 'next/link';
import logoC from '@/public/images/logo-c.png';
import logoB from '@/public/images/logo-b.png';
import { CLINIC, UPDATED } from '@/lib/library';
import { A } from './ext';
import { LaneBar } from './lane-bar';
import { PhoneIcon } from './phone-icon';

export function Top() {
  return (
    <>
      <div className="banner">
        <div className="wrap bannerInner">
          <p className="bannerText"><b>Education only.</b> No ads. No sponsors. Every fact cited and dated.</p>
          <a href={CLINIC} className="btnLine">Get started at Adonis Clinical →</a>
        </div>
      </div>
      <header className="masthead">
        <div className="wrap mastWrap">
          <div className="mastTop">
            <Link href="/app" className="appBtn" aria-label="App view of the treatments"><PhoneIcon />App</Link>
          </div>
          <Link href="/" className="mastLogo" aria-label="AdonisMensHealth.com, home">
            <Image src={logoC} alt="Adonis Men’s Health" priority sizes="(max-width: 600px) 80vw, 520px" style={{ height: 'auto' }} />
          </Link>
          <div className="mastBand">
            <span>The reference library</span>
            <span>Research · Regulators · Side effects</span>
            <span>Updated {UPDATED}</span>
          </div>
        </div>
      </header>
      <LaneBar />
    </>
  );
}

const COLS: { head: string; links: { label: string; href: string }[] }[] = [
  { head: 'Library', links: [{ label: 'Treatment index', href: '/#index' }, { label: 'Regulatory updates', href: '/#updates' }] },
  { head: 'Standards', links: [{ label: 'How we report', href: '/how-we-report' }] },
  { head: 'About', links: [{ label: 'Run by Adonis', href: '/how-we-report#what-this-site-is' }, { label: 'No advertising', href: '/how-we-report#what-this-site-is' }] },
  { head: 'Get care', links: [{ label: 'Adonis Clinical', href: CLINIC }] },
];

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="footTop">
          <Link href="/" className="footLogo" aria-label="AdonisMensHealth.com, home">
            <Image src={logoB} alt="Adonis Men’s Health" sizes="220px" style={{ height: 'auto' }} />
          </Link>
          <a href={CLINIC} className="btn btnLeather btnMain">Talk to a licensed clinician →</a>
        </div>
        <nav className="footCols" aria-label="Footer">
          {COLS.map((c) => (
            <div key={c.head}>
              <p className="footHead">{c.head}</p>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>{l.href.startsWith('http') || l.href.includes('#') ? <a href={l.href}>{l.label}</a> : <Link href={l.href}>{l.label}</Link>}</li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <p className="footNote">
          AdonisMensHealth.com is an education site run by Adonis, the company behind Adonis Clinical. It reports published
          research and regulator records as of the dates shown. It is not medical advice and does not replace a conversation
          with a licensed clinician. Compounded medications are not FDA-approved; the FDA does not review their safety,
          effectiveness or quality before they are sold. This site does not offer, sell or prescribe any treatment. Talk to a clinician at <A href={CLINIC}>Adonis Clinical</A>.
        </p>
      </div>
    </footer>
  );
}
