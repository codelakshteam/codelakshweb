import { SITE } from '@/lib/seo';

// Sitewide JSON-LD: the organization and the website. Page-specific schema (Service, FAQPage, BreadcrumbList,
// SoftwareApplication ...) is rendered by each page through components/JsonLd.jsx.
const data = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      alternateName: 'CodeLaksh Software Development',
      description:
        'CodeLaksh is a software development company in Aurangabad (Chhatrapati Sambhajinagar), Maharashtra, India, building custom software, web and mobile apps, AI, machine learning, ERP, cloud and digital marketing solutions.',
      url: `${SITE.url}/`,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/logo.png`, width: 534, height: 467 },
      image: `${SITE.url}/og-image.png`,
      email: SITE.email,
      telephone: SITE.phone,
      foundingDate: SITE.foundingYear,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.street,
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
      areaServed: { '@type': 'Country', name: 'India' },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: SITE.hours.days,
        opens: SITE.hours.opens,
        closes: SITE.hours.closes,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi', 'Marathi'],
      },
      knowsAbout: [
        'Custom software development',
        'Web development',
        'Mobile app development',
        'Artificial intelligence',
        'Machine learning',
        'ERP software',
        'Cloud computing',
        'Digital marketing',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: `${SITE.url}/`,
      name: SITE.name,
      inLanguage: 'en-IN',
      publisher: { '@id': `${SITE.url}/#organization` },
    },
  ],
};

export default function StructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
