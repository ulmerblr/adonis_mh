import type { MetadataRoute } from 'next';

/** EDU PROMPT 26: Add to Home Screen. Opens the app view, full screen. Icons are logo-b.png on navy. No service worker. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Adonis Men's Health",
    short_name: 'Adonis',
    description: 'Men’s health treatments: the published research and where regulators stand.',
    start_url: '/app',
    scope: '/',
    display: 'standalone',
    theme_color: '#0F2C55',
    background_color: '#0F2C55',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
