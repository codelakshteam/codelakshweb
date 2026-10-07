const siteUrl = 'https://codelaksh.in';

const data = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'CodeLaksh',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      description:
        'Premier AI Solutions & Software Development Company in India. Web Development, App Development, AI Chatbots, Machine Learning.',
      email: 'codelaksh@gmail.com',
      telephone: '+91-9834684866',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sangram Nagar',
        addressLocality: 'Aurangabad',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'CodeLaksh',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#localbusiness`,
      name: 'CodeLaksh',
      image: `${siteUrl}/logo.png`,
      url: siteUrl,
      telephone: '+91-9834684866',
      email: 'codelaksh@gmail.com',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sangram Nagar',
        addressLocality: 'Aurangabad',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/erp#app`,
      name: 'CodeLaksh ERP',
      url: `${siteUrl}/erp`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Android, Windows',
      description:
        'Billing, inventory, accounting, purchases and payments software for Indian shops, restaurants and hotels. Works offline on desktop with cloud sync and a mobile app.',
      downloadUrl: 'https://play.google.com/store/apps/details?id=com.codelaksh.erp',
      publisher: { '@id': `${siteUrl}/#organization` },
      offers: [
        { '@type': 'Offer', name: 'Starter (yearly)', price: '3499', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Growth (monthly)', price: '499', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Growth (yearly)', price: '4999', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Business (monthly)', price: '999', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Business (yearly)', price: '9999', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Pro (monthly)', price: '1999', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Pro (yearly)', price: '19999', priceCurrency: 'INR' },
      ],
    },
    {
      '@type': 'Brand',
      '@id': 'https://kidodom.in/#brand',
      name: 'Kidodom',
      url: 'https://kidodom.in',
      logo: `${siteUrl}/kidodom-icon.png`,
      description: 'Safe, certified baby and kids products, a CodeLaksh brand. Available on the App Store and Google Play.',
    },
    {
      '@type': 'MobileApplication',
      '@id': 'https://kidodom.in/#app',
      name: 'Kidodom',
      url: 'https://kidodom.in',
      applicationCategory: 'ShoppingApplication',
      operatingSystem: 'iOS, Android',
      installUrl: [
        'https://apps.apple.com/ng/app/kidodom/id6804982156',
        'https://play.google.com/store/apps/details?id=com.kidodom.web',
      ],
      publisher: { '@id': `${siteUrl}/#organization` },
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
