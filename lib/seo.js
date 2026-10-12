// Single source of truth for site identity and per-page metadata. Every indexable page builds its metadata through
// pageMetadata() so title, description, canonical, Open Graph and Twitter tags always agree with each other.

export const SITE = {
  url: 'https://codelaksh.in',
  name: 'CodeLaksh',
  tagline: 'Software Development Company in India',
  phone: '+91-9834684866',
  phoneDisplay: '+91-9834684866',
  email: 'codelaksh@gmail.com',
  street: 'Sangram Nagar',
  city: 'Chhatrapati Sambhajinagar',
  cityAlt: 'Aurangabad',
  region: 'Maharashtra',
  country: 'IN',
  foundingYear: '2020',
  branches: [{ area: 'Hadapsar', city: 'Pune', region: 'Maharashtra', phone: '+91-9834684866' }],
  hours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '19:00' },
  ogImage: '/og-image.png',
  // Public profiles that identify the same organization (LinkedIn, GitHub, Instagram, Clutch, Google Business
  // Profile ...). Emitted as schema.org sameAs; add real URLs here and they flow into the JSON-LD automatically.
  profiles: [],
  // Emitted as schema.org founder Person entities. Add profiles: [...] (LinkedIn etc.) per person when available.
  founders: [
    { name: 'Gauri Gat', jobTitle: 'Co-founder', profiles: [] },
    { name: 'Laxmi Ambekar', jobTitle: 'Co-founder', profiles: [] },
  ],
};

// Date the site content was last reviewed; used in the sitemap instead of "now" so the dates stay honest.
export const CONTENT_UPDATED = '2026-10-07';

// Per-page overrides for pages that changed after CONTENT_UPDATED (taken from the last commit touching the page).
// Pages not listed here fall back to CONTENT_UPDATED.
export const PAGE_UPDATED = {
  '/erp': '2026-10-08',
  '/portfolio/codelaksh-erp': '2026-10-08',
  '/portfolio/kidodom': '2026-10-08',
  '/portfolio': '2026-10-08',
};

export const absoluteUrl = (path = '/') => `${SITE.url}${path === '/' ? '/' : path}`;

export function pageMetadata({ title, description, path, image, imageAlt, imageWidth = 1200, imageHeight = 630, type = 'website' }) {
  const ogImage = image || SITE.ogImage;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE.name,
      locale: 'en_IN',
      type,
      images: [{ url: ogImage, width: imageWidth, height: imageHeight, alt: imageAlt || `${SITE.name} - ${SITE.tagline}` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
}

export const breadcrumbSchema = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.href),
  })),
});

export const faqSchema = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});
