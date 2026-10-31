import { Archivo, Inter } from 'next/font/google';
import { Footer, Header } from '@/components/chrome';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
// The Adonis display face: Archivo's width axis gives the condensed, heavy uppercase of the Adonis Clinical site.
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-display', display: 'swap' });

export const metadata = {
  title: { default: 'AdonisMensHealth.com', template: '%s | AdonisMensHealth.com' },
  description: 'A reference library on men’s health treatments: the chemistry, the published research, and where regulators stand. Run by Adonis, the company behind Adonis Clinical.',
  // Not live yet: keep every page out of search engines.
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};
export const viewport = { themeColor: '#0B1F2D', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
