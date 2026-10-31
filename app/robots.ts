import type { MetadataRoute } from 'next';

// Not live yet: disallow every crawler from every page.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', disallow: '/' }] };
}
