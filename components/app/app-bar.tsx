import Image from 'next/image';
import Link from 'next/link';
import logoB from '@/public/images/logo-b.png';

/** The app view's slim top bar: logo (or a back arrow), the title, and the Magazine pill back to Home. */
export function AppBar({ title, back }: { title: string; back?: React.ReactNode }) {
  return (
    <div className="appBar">
      {back ?? (
        <Link href="/app" className="appLogo" aria-label="Treatments, app home">
          <Image src={logoB} alt="Adonis Men’s Health" sizes="96px" priority style={{ width: '100%', height: 'auto' }} />
        </Link>
      )}
      <h1 className="appTitle">{title}</h1>
      <Link href="/" className="appMag">Magazine</Link>
    </div>
  );
}
