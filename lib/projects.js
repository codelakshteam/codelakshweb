// Portfolio entries. Only projects CodeLaksh can publicly disclose belong here: today that is CodeLaksh's own products.
// Add a client case study only with the client's permission, and never add numbers that cannot be verified.

export const projects = [
  {
    slug: 'codelaksh-erp',
    name: 'CodeLaksh ERP',
    category: 'ERP & Business Software',
    icon: 'fa-file-invoice',
    accent: 'blue',
    cardText: 'GST billing, inventory, accounting and payments for Indian shops, restaurants and hotels, on desktop and Android.',
    title: 'CodeLaksh ERP Case Study: GST Billing Software | CodeLaksh',
    description:
      'How CodeLaksh built CodeLaksh ERP: offline-first GST billing, inventory, accounting and payments for Indian businesses, with a Windows app, Android app and cloud sync.',
    h1: 'CodeLaksh ERP: GST billing, inventory and accounting software',
    summary: 'CodeLaksh\'s own ERP product for Indian shops, distributors, restaurants and hotels. It is live on Google Play and offered on published plans.',
    problem:
      'Small and mid-sized Indian businesses often run billing, stock and accounts in separate tools or on paper. A counter cannot stop billing because the internet is down, GST invoices must be correct, and owners want to see sales and dues from their phone. Many existing products solved one of these problems but not all of them together.',
    solution:
      'We built a single ERP that bills offline at the counter, keeps inventory and accounts in the same system, and syncs to the cloud so every device and branch sees the same data. A desktop app handles the counter, an Android app gives owners and staff access on the move, and industry modules adapt the system to different kinds of business.',
    features: [
      'GST-ready invoicing with CGST and SGST, barcode scanning, print, PDF and sharing',
      'Inventory with batches, expiry, low-stock alerts and barcode label printing',
      'Cash and bank books, purchases, supplier ledger, income statement and balance sheet',
      'Offline-first desktop billing with cloud sync, backup and restore',
      'Multi-branch management, stock transfers, custom roles, permissions and approvals',
      'Online payments through Razorpay or PhonePe, and e-bills by email or WhatsApp',
      'Industry modules for restaurants, hotels, kirana stores, sweet marts, bakeries, medical stores and salons',
      'Interface in English, Hindi, Marathi and Gujarati',
    ],
    tech: ['React', 'TypeScript', 'Windows desktop app', 'Android app', 'Cloud sync and backup', 'Razorpay and PhonePe payments'],
    services: ['erp-development', 'mobile-app-development', 'cloud-solutions', 'custom-software-development'],
    impact: 'CodeLaksh ERP is live on Google Play with published plans and a 7-day free trial on the Growth plan. We do not publish customer counts or revenue figures.',
    shots: [
      { src: '/erp-assets/desktop/dashboard.webp', alt: 'CodeLaksh ERP desktop dashboard with revenue, dues, cash and bank balances', width: 1200, height: 617 },
      { src: '/erp-assets/desktop/invoice.webp', alt: 'CodeLaksh ERP GST invoice with CGST and SGST and print option', width: 1200, height: 616 },
      { src: '/erp-assets/desktop/reports.webp', alt: 'CodeLaksh ERP sales, purchase, stock and tax reports', width: 1200, height: 621 },
    ],
    links: [
      { href: '/erp', label: 'CodeLaksh ERP features and pricing' },
      { href: 'https://play.google.com/store/apps/details?id=com.codelaksh.erp', label: 'CodeLaksh ERP on Google Play', external: true },
    ],
    image: '/erp-assets/desktop/dashboard.webp',
  },
  {
    slug: 'kidodom',
    name: 'Kidodom',
    category: 'Mobile App & E-Commerce',
    icon: 'fa-baby',
    accent: 'amber',
    cardText: 'A shopping and guidance app for parents of young children, on the App Store and Google Play.',
    title: 'Kidodom App Case Study: Baby & Kids Shopping App | CodeLaksh',
    description:
      'How CodeLaksh built Kidodom, a mobile app for parents combining baby and kids product shopping with a vaccination tracker, milestones, contests and deals on iOS and Android.',
    h1: 'Kidodom: a shopping and guidance app for parents',
    summary: 'A CodeLaksh brand and app for parents of babies and young children, available on the App Store and Google Play at kidodom.in.',
    problem:
      'Parents of young children shop for products across many places and look for guidance such as vaccination schedules and developmental milestones somewhere else. They want products they can trust and a place that brings these needs together.',
    solution:
      'We designed and built Kidodom as a single mobile app for iOS and Android. It combines a product catalogue with categories for little ones, simple sign-in with Google or Apple, a guidance hub, contests and deals, so parents can shop and plan in one place.',
    features: [
      'Product categories and shopping for baby and kids products',
      'Simple, safe sign-in with Google or Apple',
      'Guidance hub with a vaccination tracker and developmental milestones',
      'Contests and baby of the month',
      'Deals and discounts for parents',
      'Available on iOS and Android',
    ],
    tech: ['iOS app', 'Android app', 'Google and Apple sign-in', 'E-commerce catalogue'],
    services: ['mobile-app-development', 'ecommerce-development', 'custom-software-development'],
    impact: 'Kidodom is live on the App Store and Google Play. We do not publish download or sales figures.',
    shots: [
      { src: '/kidodom-assets/2-discover.webp', alt: 'Kidodom app home screen with product categories for little ones', width: 520, height: 1125 },
      { src: '/kidodom-assets/5-guidance.webp', alt: 'Kidodom guidance hub with vaccination tracker and developmental milestones', width: 520, height: 1125 },
      { src: '/kidodom-assets/7-deals.webp', alt: 'Kidodom deals and discounts for parents', width: 520, height: 1125 },
    ],
    links: [
      { href: 'https://kidodom.in', label: 'Kidodom website', external: true },
      { href: 'https://apps.apple.com/ng/app/kidodom/id6804982156', label: 'Kidodom on the App Store', external: true },
      { href: 'https://play.google.com/store/apps/details?id=com.kidodom.web&hl=en', label: 'Kidodom on Google Play', external: true },
    ],
    image: '/kidodom-assets/2-discover.webp',
  },
];

export const getProject = (slug) => projects.find((project) => project.slug === slug);
