import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/images/logo-b.png';
import { A, CLINIC } from './ext';

export function Header() {
  return (
    <header className="bar">
      <div className="barInner">
        <Link href="/" className="barLogo" aria-label="AdonisMensHealth.com, home">
          <Image src={logo} alt="Adonis Men’s Health" priority sizes="150px" style={{ height: 'auto' }} />
        </Link>
        <a href={CLINIC} className="btn btnGold barCta" data-cta="header">Get started at Adonis Clinical</a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <p>
          AdonisMensHealth.com is an education site run by Adonis, the company behind Adonis Clinical. It reports published
          research and regulator records as of the dates shown. It is not medical advice and does not replace a conversation
          with a licensed clinician. Compounded medications are not FDA-approved; the FDA does not review their safety,
          effectiveness or quality before they are sold. Talk to a clinician at <A href={CLINIC}>Adonis Clinical</A>.
        </p>
      </div>
    </footer>
  );
}
