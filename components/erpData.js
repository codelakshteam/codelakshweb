// Single source of truth for the CodeLaksh ERP pages (home teaser + /erp). Prices come from the ERP pricing sheet
// (October 2026); all exclude 18% GST.

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

export const advancedFeatures = [
  { icon: 'fa-building', title: 'Multi-branch & counters', text: 'Run several branches and billing counters under one account, with branch stock transfers, shifts and day closing.' },
  { icon: 'fa-user-shield', title: 'Roles, permissions & approvals', text: 'Custom roles with fine-grained permissions, plus an approval flow for stock adjustments and modification requests.' },
  { icon: 'fa-rotate', title: 'Live multi-device sync', text: 'Offline-first billing with cloud sync, live updates on every signed-in device, backup and restore.' },
  { icon: 'fa-scale-balanced', title: 'Full accounting', text: 'Cash and bank books, transfers, journal, trial balance, income statement and balance sheet.' },
  { icon: 'fa-chart-line', title: 'Business insights & reports', text: 'Dashboard insights; sales, purchase, stock, GST and profit reports, party statements and CSV export.' },
  { icon: 'fa-barcode', title: 'Barcodes, labels & bulk tools', text: 'Barcode label sheets, alternate barcodes, bulk import / export and bulk price updates.' },
  { icon: 'fa-boxes-packing', title: 'Batches, expiry & stock control', text: 'Batch and expiry (FEFO) tracking, stock count with approval, reorder centre, dead-stock and expiry reports.' },
  { icon: 'fa-tags', title: 'Price lists, schemes & coupons', text: 'Retail and wholesale price lists, schemes, coupon codes, bill discounts and loyalty points.' },
  { icon: 'fa-book-open', title: 'Khata, dues & purchases', text: 'Customer khata with credit limits, supplier ledger, purchase orders with GRN, returns and expenses.' },
  { icon: 'fa-paper-plane', title: 'e-Bills & WhatsApp / SMS', text: 'Send invoices by email or WhatsApp and order alerts by SMS, with prepaid credit packs.' },
  { icon: 'fa-credit-card', title: 'Online payments & QR', text: 'Razorpay / PhonePe payments with shareable receipts, and QR ordering for tables.' },
  { icon: 'fa-language', title: 'Multi-language', text: 'Use the app in English, Hindi, Marathi or Gujarati.' },
];

export const industryModules = [
  { icon: 'fa-utensils', title: 'Restaurant & Cafe', text: 'Tables, orders, KOT, kitchen display, reservations, QR ordering, menu and restaurant reports.' },
  { icon: 'fa-hotel', title: 'Hotel', text: 'Room types and a live room board, bookings with double-booking protection, check-in / check-out billed to an invoice.' },
  { icon: 'fa-cart-shopping', title: 'Kirana & Supermarket', text: 'Fast barcode POS, units and conversions, FEFO batches, price lists, returns, stock transfers, Khata and day closing.' },
  { icon: 'fa-cookie-bite', title: 'Sweet Mart', text: 'Fulfilment counters (sweet, farsan, pani puri), one bill with a token per counter, counter screens and slips.' },
  { icon: 'fa-bread-slice', title: 'Bakery', text: 'Daily production plan, what came out, what was wasted, and waste by item, with weighed billing.' },
  { icon: 'fa-cake-candles', title: 'Cake Shop', text: 'Custom cake order book with flavour, weight, message, delivery date and advance payment.' },
  { icon: 'fa-pills', title: 'Medical Store', text: 'Batch, expiry and manufacturer fields, expiry control with value at risk, and billing blocks expired medicine.' },
  { icon: 'fa-scissors', title: 'Salon & Spa', text: 'Service menu, stylists, appointments with double-booking protection, billed straight to an invoice.' },
  { icon: 'fa-shirt', title: 'Clothing & Electronics', text: 'Size, colour and variant fields for clothing; serial number, IMEI, model and warranty for electronics.' },
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
    price: 'Rs. 3,499',
    cadence: 'per year',
    extra: 'Annual licence with desktop activation',
    features: [
      'Billing / invoicing (GST-ready)',
      'Inventory & products',
      'Works offline (desktop)',
      '1 outlet',
      '1 staff user (admin login extra)',
      'Basic accounting & cash/bank books',
      'Software updates included',
      'Email support',
    ],
    cta: 'Contact us',
    href: '/#contact',
  },
  {
    name: 'Growth',
    tagline: 'Cloud sync, mobile app and reports',
    price: 'Rs. 499',
    cadence: 'per month',
    extra: 'or Rs. 4,999/year (saves ~17%)',
    badge: '7-day free trial',
    featured: true,
    yearly: { price: 'Rs. 4,999', cadence: 'per year', extra: 'About Rs. 417/month, saves ~17%' },
    features: [
      'Everything in Starter',
      'Cloud sync & mobile app',
      '1 outlet',
      '3 staff users (admin login extra)',
      'Accounting & cash/bank books',
      'Advanced reports (sales, stock, GST)',
      'Basic roles & permissions',
      'Email + chat support',
    ],
    cta: 'Get the app',
    href: PLAY_STORE_URL,
    external: true,
  },
  {
    name: 'Business',
    tagline: 'Multiple outlets and more users',
    price: 'Rs. 999',
    cadence: 'per month',
    extra: 'or Rs. 9,999/year (saves ~17%)',
    yearly: { price: 'Rs. 9,999', cadence: 'per year', extra: 'About Rs. 833/month, saves ~17%' },
    features: [
      'Everything in Growth',
      '5 outlets included',
      '10 staff users (admin login extra)',
      'Branch management',
      'Stock transfer between branches',
      'Full roles & permissions (RBAC)',
      'API access as an add-on',
      'Priority support',
    ],
    cta: 'Contact us',
    href: '/#contact',
  },
  {
    name: 'Pro',
    tagline: 'Multi-outlet operations with advanced controls',
    price: 'Rs. 1,999',
    cadence: 'per month',
    extra: 'or Rs. 19,999/year (saves ~17%)',
    yearly: { price: 'Rs. 19,999', cadence: 'per year', extra: 'About Rs. 1,667/month, saves ~17%' },
    features: [
      'Everything in Business',
      '20 outlets included',
      '30 staff users (admin login extra)',
      'Advanced accounting',
      'Advanced roles & permissions (RBAC)',
      'API access included',
      'Priority support',
    ],
    cta: 'Talk to us',
    href: '/#contact',
  },
];

export const addOns = [
  { name: 'Additional branch / outlet', price: 'Rs. 199/month', on: 'Growth, Business, Pro' },
  { name: 'Additional user', price: 'Rs. 49/month per user', on: 'Growth and above' },
  { name: 'WhatsApp / SMS invoice & order alerts', price: 'Rs. 149/month (500 credits)', on: 'Growth and above' },
  { name: 'SMS e-bill credits: 500 / 1,000 / 5,000 SMS', price: 'Rs. 99 / Rs. 179 / Rs. 699', on: 'All plans' },
  { name: 'Payment gateway setup (Razorpay / PhonePe)', price: 'Rs. 499 one-time', on: 'All plans' },
  { name: 'Data migration & onboarding (from Tally / Vyapar / manual books)', price: 'Rs. 1,499 one-time', on: 'All plans' },
  { name: 'Priority AMC (faster support, on-site visit credits)', price: 'Rs. 999/year', on: 'All plans' },
];

export const erpFaqs = [
  {
    q: 'What is CodeLaksh ERP?',
    a: 'CodeLaksh ERP is GST billing, inventory, accounting, purchases and payments software for Indian shops, distributors, restaurants and hotels. It runs on Windows desktop, works offline, and has an Android app on Google Play.',
  },
  {
    q: 'How much does CodeLaksh ERP cost?',
    a: 'Starter is Rs. 3,499 per year. Growth is Rs. 499 per month or Rs. 4,999 per year. Business is Rs. 999 per month or Rs. 9,999 per year. Pro is Rs. 1,999 per month or Rs. 19,999 per year. Yearly prepay is about 17% cheaper. All prices exclude 18% GST.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. Growth comes with a 7-day free trial. It needs no card upfront and never auto-charges when the trial ends.',
  },
  {
    q: 'Does the billing software work without internet?',
    a: 'Yes. The desktop app works fully offline at the counter. Cloud sync and the mobile app are part of the Growth plan and above; Starter is desktop-only.',
  },
  {
    q: 'Does it support GST invoices?',
    a: 'Yes. Invoices are GST-ready with CGST and SGST, and can be printed, downloaded as PDF or shared. GST, sales, purchase and stock reports are included.',
  },
  {
    q: 'Can I use it for a restaurant or hotel?',
    a: 'Yes. The restaurant and hotel modules add KOT, kitchen display, table management, QR ordering, reservations, and hotel rooms and bookings on top of billing and inventory. Pricing follows your plan, outlets and users.',
  },
  {
    q: 'Can I move my data from Tally, Vyapar or manual books?',
    a: 'Yes. A data migration and onboarding add-on (Rs. 1,499 one-time) moves your data from Tally, Vyapar or manual books.',
  },
  {
    q: 'Which advanced features does CodeLaksh ERP have?',
    a: 'Multi-branch billing with stock transfers (Business and Pro), multi-counter billing, roles and permissions with approvals, live multi-device cloud sync with backup and restore, full accounting (journal, trial balance, P&L, balance sheet), batch and expiry tracking, price lists and schemes, Khata and supplier ledgers, purchase orders with GRN, e-Bills by email or WhatsApp, online payments, and English, Hindi, Marathi and Gujarati languages.',
  },
  {
    q: 'Which businesses does it support?',
    a: 'Restaurants, cafes, hotels, kirana stores and supermarkets, sweet marts, bakeries, cake shops, medical stores, salons, and clothing and electronics shops. Each has its own module with the screens and fields that business needs.',
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
