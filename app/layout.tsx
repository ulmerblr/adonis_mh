import { Anton, Source_Sans_3, Zilla_Slab } from 'next/font/google';
import { Footer, Top } from '@/components/chrome';
import './globals.css';

const zilla = Zilla_Slab({ subsets: ['latin'], weight: ['500', '700'], style: ['normal', 'italic'], variable: '--font-zilla', display: 'swap' });
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' });
const sans = Source_Sans_3({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-sans', display: 'swap' });

export const metadata = {
  title: { default: 'AdonisMensHealth.com', template: '%s | AdonisMensHealth.com' },
  description: 'A reference library on men’s health treatments: the chemistry, the published research, and where regulators stand. Run by Adonis, the company behind Adonis Clinical.',
  // Not live yet: keep every page out of search engines.
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};
export const viewport = { themeColor: '#0F2C55', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${zilla.variable} ${sans.variable} ${anton.variable}`}>
      <body>
        <Top />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
