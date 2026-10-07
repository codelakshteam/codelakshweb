// Single source of truth for the CodeLaksh ERP pages (home teaser + /erp). Prices come from the ERP pricing sheet
// (September 2026); all exclude 18% GST.

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.codelaksh.erp';

export const PLAY_STORE_URL_KIDODOM = 'https://play.google.com/store/apps/details?id=com.kidodom.web&hl=en';
export const APP_STORE_URL_KIDODOM = 'https://apps.apple.com/ng/app/kidodom/id6804982156';
export const KIDODOM_SITE_URL = 'https://kidodom.in';

export const erpHighlights = [
  { icon: 'fa-file-invoice', title: 'GST-ready billing', text: 'Fast, barcode-ready invoicing for your counter, with print, PDF and share.' },
  { icon: 'fa-boxes-stacked', title: 'Inventory & products', text: 'Stock levels, batches and expiry, low-stock alerts and barcode labels.' },
  { icon: 'fa-book', title: 'Accounting & books', text: 'Cash and bank books, purchases, supplier ledger, P&L and balance sheet.' },
  { icon: 'fa-cloud-arrow-up', title: 'Works offline, syncs online', text: 'Bill at the counter without internet; cloud sync keeps every device up to date.' },
  { icon: 'fa-utensils', title: 'Restaurant & hotel', text: 'KOT, table management, QR ordering and reservations for restaurants and hotels.' },
  { icon: 'fa-credit-card', title: 'Get paid faster', text: 'Collect payments through Razorpay or PhonePe and share receipts instantly.' },
];

export const mobileShots = [
  { src: '/erp-assets/mobile/billing.webp', alt: 'CodeLaksh ERP mobile app: home dashboard with revenue, dues and quick actions' },
  { src: '/erp-assets/mobile/tables.webp', alt: 'CodeLaksh ERP mobile app: real-time restaurant table management' },
  { src: '/erp-assets/mobile/invoices.webp', alt: 'CodeLaksh ERP mobile app: invoice tracking' },
  { src: '/erp-assets/mobile/payments.webp', alt: 'CodeLaksh ERP mobile app: invoice with payment settled and share option' },
  { src: '/erp-assets/mobile/reports.webp', alt: 'CodeLaksh ERP mobile app: sales reports' },
  { src: '/erp-assets/mobile/secure.webp', alt: 'CodeLaksh ERP mobile app: secure and customizable settings' },
  { src: '/erp-assets/mobile/signin.webp', alt: 'CodeLaksh ERP mobile app: sign in with your organization ID' },
];

export const desktopShots = [
  { src: '/erp-assets/desktop/dashboard.webp', title: 'Dashboard', text: 'Revenue, dues, cash and bank balances at a glance.' },
  { src: '/erp-assets/desktop/reports.webp', title: 'Reports', text: 'Sales, purchase, stock and tax reports with CSV export.' },
  { src: '/erp-assets/desktop/invoice.webp', title: 'Invoices & printing', text: 'GST invoices with CGST/SGST, print and PDF download.' },
  { src: '/erp-assets/desktop/barcode-labels.webp', title: 'Barcode labels', text: 'Build and print sheets of product barcode labels.' },
  { src: '/erp-assets/desktop/plan-billing.webp', title: 'Plan & billing', text: 'See your plan, renewal date and what is included.' },
];

export const plans = [
  {
    name: 'Starter',
    tagline: 'One counter, works fully offline',
    price: 'Rs. 3,500',
    cadence: 'one-time',
    extra: '+ Rs. 1,499/year renewal',
    badge: '7-day free trial',
    features: [
      'Billing / invoicing (GST-ready)',
      'Inventory & products',
      'Customers & suppliers',
      '1 branch / counter',
      'Works offline (desktop)',
      'Basic reports',
      'Admin login',
      'Email support',
    ],
    cta: 'Start free trial',
    href: '/#contact',
  },
  {
    name: 'Growth',
    tagline: 'Cloud sync, mobile app and accounting',
    price: 'Rs. 599',
    cadence: 'per month',
    extra: 'or Rs. 5,999/year (saves ~17%)',
    badge: '7-day free trial',
    featured: true,
    yearly: { price: 'Rs. 5,999', cadence: 'per year', extra: 'About Rs. 500/month, saves ~17%' },
    features: [
      'Everything in Starter',
      'Cloud sync & mobile app',
      'Accounting & cash/bank books',
      'Purchases & supplier ledger',
      'Advanced reports (sales, stock, GST)',
      'Online payments (Razorpay / PhonePe)',
      'Admin + 1 staff user',
      'Email + chat support',
    ],
    cta: 'Get the app',
    href: PLAY_STORE_URL,
    external: true,
  },
  {
    name: 'Restaurant / Hotel Pro',
    tagline: 'For restaurants, cafes and hotels',
    price: 'Rs. 1,999',
    cadence: 'per month, per outlet',
    extra: '2 branches / counters included',
    yearly: { extra: 'Billed monthly, per outlet' },
    features: [
      'Everything in Growth',
      'KOT, QR ordering & reservations',
      'Table management',
      'Admin + 3 staff users',
      'Priority support',
    ],
    cta: 'Contact us',
    href: '/#contact',
  },
  {
    name: 'Enterprise',
    tagline: 'Multi-branch and custom needs',
    price: 'from Rs. 4,999',
    cadence: 'per month',
    extra: 'Custom quote',
    features: [
      'Everything in Restaurant / Hotel Pro',
      'Unlimited branches',
      'Multi-org / multi-outlet management',
      'Custom roles & permissions',
      'Advanced + custom reports',
      'Restaurant modules optional',
      'Dedicated support',
    ],
    cta: 'Talk to us',
    href: '/#contact',
  },
];

export const addOns = [
  { name: 'Additional branch / outlet', price: 'Rs. 499/month', on: 'Growth, Restaurant/Hotel Pro' },
  { name: 'WhatsApp / SMS invoice & order alerts', price: 'Rs. 299/month (500 credits)', on: 'All plans' },
  { name: 'Payment gateway setup (Razorpay / PhonePe)', price: 'Rs. 999 one-time', on: 'Starter (free on Growth and above)' },
  { name: 'Data migration & onboarding (from Tally / Vyapar / manual books)', price: 'Rs. 2,999 one-time', on: 'All plans' },
  { name: 'Priority AMC (faster support, on-site visit credits)', price: 'Rs. 1,999/year', on: 'Starter' },
];

export const erpFaqs = [
  {
    q: 'What is CodeLaksh ERP?',
    a: 'CodeLaksh ERP is GST billing, inventory, accounting, purchases and payments software for Indian shops, distributors, restaurants and hotels. It runs on Windows desktop, works offline, and has an Android app on Google Play.',
  },
  {
    q: 'How much does CodeLaksh ERP cost?',
    a: 'Starter is Rs. 3,500 one-time plus Rs. 1,499 per year renewal. Growth is Rs. 599 per month or Rs. 5,999 per year. Restaurant / Hotel Pro is Rs. 1,999 per month per outlet. Enterprise starts from Rs. 4,999 per month. All prices exclude 18% GST.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. Starter and Growth both come with a 7-day free trial.',
  },
  {
    q: 'Does the billing software work without internet?',
    a: 'Yes. The desktop app works fully offline at the counter. Cloud sync and the mobile app are part of the Growth plan and above.',
  },
  {
    q: 'Does it support GST invoices?',
    a: 'Yes. Invoices are GST-ready with CGST and SGST, and can be printed, downloaded as PDF or shared. GST, sales, purchase and stock reports are included.',
  },
  {
    q: 'Can I use it for a restaurant or hotel?',
    a: 'Yes. The Restaurant / Hotel Pro plan adds KOT, table management, QR ordering and reservations on top of billing and inventory.',
  },
  {
    q: 'Can I move my data from Tally, Vyapar or manual books?',
    a: 'Yes. A data migration and onboarding add-on (Rs. 2,999 one-time) moves your data from Tally, Vyapar or manual books.',
  },
  {
    q: 'Is there a mobile app?',
    a: 'Yes. The CodeLaksh ERP Android app is live on Google Play, so you can bill, track invoices and view reports from your phone.',
  },
];

export const kidodomShots = [
  { src: '/kidodom-assets/1-welcome.webp', alt: 'Kidodom app: everything your little one needs, in one happy place' },
  { src: '/kidodom-assets/2-discover.webp', alt: 'Kidodom app home screen with product categories for little ones' },
  { src: '/kidodom-assets/3-shop.webp', alt: 'Kidodom app: shop everything kids love' },
  { src: '/kidodom-assets/4-signin.webp', alt: 'Kidodom app: simple, safe sign in with Google or Apple' },
  { src: '/kidodom-assets/5-guidance.webp', alt: 'Kidodom app guidance hub with vaccination tracker and developmental milestones' },
  { src: '/kidodom-assets/6-contests.webp', alt: 'Kidodom app: contests and baby of the month' },
  { src: '/kidodom-assets/7-deals.webp', alt: 'Kidodom app: deals and discounts for parents' },
];
