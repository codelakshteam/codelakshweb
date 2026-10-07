// Content for the cinematic homepage and /technology. Everything here is real HTML on the page (never only in a
// canvas), and every claim must stay true: no invented clients, numbers, awards or milestones.

export const heroLines = ['YOUR', 'VISION.', 'ENGINEERED.'];

export const statementLines = ['WE DON’T', 'JUST WRITE', 'CODE.', 'WE ENGINEER', 'DIGITAL', 'SYSTEMS.'];

// Interactive technology map (Section 03). x/y are percentages inside the map; `links` draws the connecting lines.
export const universe = [
  { id: 'ai', label: 'AI', x: 50, y: 14, links: ['data', 'automation', 'web'], href: '/services/ai-development', text: 'Chatbots that answer from your own content, document reading, AI features inside existing software.' },
  { id: 'web', label: 'WEB', x: 82, y: 32, links: ['ai', 'cloud', 'mobile', 'erp'], href: '/services/web-development', text: 'Business websites, web applications, portals, dashboards and SaaS platforms built to be fast and findable.' },
  { id: 'mobile', label: 'MOBILE', x: 88, y: 72, links: ['web', 'erp', 'cloud'], href: '/services/mobile-app-development', text: 'Android, iOS and cross-platform apps for customers and for your team.' },
  { id: 'erp', label: 'ERP', x: 58, y: 88, links: ['mobile', 'data', 'cloud', 'web'], href: '/services/erp-development', text: 'Billing, inventory, accounting and payments, including our own product CodeLaksh ERP.' },
  { id: 'cloud', label: 'CLOUD', x: 22, y: 78, links: ['erp', 'data', 'web', 'mobile'], href: '/services/cloud-solutions', text: 'Architecture, migration and deployment on AWS, Azure and Google Cloud, with backups and monitoring.' },
  { id: 'data', label: 'DATA', x: 12, y: 42, links: ['ai', 'cloud', 'erp', 'automation'], href: '/services/machine-learning', text: 'Forecasting, classification and anomaly detection on your own records, delivered inside your software.' },
  { id: 'automation', label: 'AUTOMATION', x: 30, y: 24, links: ['ai', 'data'], href: '/services/custom-software-development', text: 'Workflows, approvals and integrations that remove repeated manual steps between people and systems.' },
];

// Section 04: one stage per service line, each with its own generative backdrop (see ServiceBackdrop.jsx).
export const serviceStages = [
  { n: '01', title: 'AI ENGINEERING', theme: 'ai', href: '/services/ai-development', anchor: 'AI development services', text: 'AI systems that automate, understand and scale business processes: chatbots, document reading, predictive analytics and AI inside your existing software.' },
  { n: '02', title: 'WEB ENGINEERING', theme: 'web', href: '/services/web-development', anchor: 'Web development services', text: 'Business websites, web applications, portals, dashboards and e-commerce platforms, rendered so people and search engines can both read them.' },
  { n: '03', title: 'MOBILE EXPERIENCES', theme: 'mobile', href: '/services/mobile-app-development', anchor: 'Mobile app development services', text: 'Android, iOS and cross-platform apps. We ship our own apps to Google Play and the App Store, so release work is not new to us.' },
  { n: '04', title: 'ERP & BUSINESS SYSTEMS', theme: 'erp', href: '/services/erp-development', anchor: 'ERP development services', text: 'Custom ERP and business software for billing, inventory, accounting and payments, backed by our own live product, CodeLaksh ERP.' },
  { n: '05', title: 'CLOUD & INFRASTRUCTURE', theme: 'cloud', href: '/services/cloud-solutions', anchor: 'Cloud solutions', text: 'Cloud architecture, migration and deployment on AWS, Azure and Google Cloud, with backups, monitoring and predictable costs.' },
  { n: '06', title: 'DIGITAL GROWTH', theme: 'growth', href: '/services/digital-marketing', anchor: 'Digital marketing services', text: 'SEO, search visibility, social media and performance marketing, joined with the website work that makes them effective.' },
];

export const flow = [
  { k: 'IDEA', t: 'A problem worth solving.' },
  { k: 'CODE', t: 'Written, reviewed and tested.' },
  { k: 'SYSTEM', t: 'Connected, secured and deployed.' },
  { k: 'PRODUCT', t: 'In your customers’ hands.' },
];

// Real technologies only (named in the CodeLaksh codebases or on the service pages). Extend only with confirmation.
export const stack = [
  { group: 'Backend', items: ['Java (Spring Boot, Spring MVC, Hibernate)', 'Node.js (Express)', 'Python (Django, Flask, FastAPI)', '.NET'], text: 'APIs, business logic and integrations, with RESTful design and JUnit-tested services.' },
  { group: 'Frontend', items: ['React', 'Angular', 'Next.js', 'TypeScript', 'jQuery'], text: 'Fast, accessible interfaces for web and desktop.' },
  { group: 'Mobile', items: ['React Native', 'Android', 'iOS'], text: 'Apps live on Google Play and the App Store.' },
  { group: 'AI and GenAI', items: ['RAG pipelines', 'FastAPI', 'TensorFlow', 'Ollama (self-hosted LLMs)', 'OCR', 'Audio analysis'], text: 'Chatbots, document reading and custom models, including models run on your own servers.' },
  { group: 'LLM and speech providers', items: ['Anthropic Claude', 'OpenAI GPT', 'Google Gemini', 'Alibaba Qwen', 'Sarvam AI', 'ElevenLabs'], text: 'Multi-model orchestration, chosen per task, cost and data-privacy needs.' },
  { group: 'Data and messaging', items: ['MySQL', 'MongoDB', 'SQL Server', 'Redis', 'Kafka', 'RabbitMQ', 'ZooKeeper'], text: 'Databases, queues and streams that keep systems consistent.' },
  { group: 'Cloud and DevOps', items: ['GCP', 'AWS', 'Vercel', 'Self-hosted VPS (Ubuntu)', 'GitHub Actions', 'Jenkins', 'GitLab CI'], text: 'Deployment, scaling, backups and cost control.' },
  { group: 'Integrations', items: ['Razorpay', 'Stripe', 'Shiprocket', 'MSG91', 'SendGrid', 'Nodemailer', 'MJML', 'Webhooks'], text: 'Payments, shipping, SMS and email wired into your software.' },
  { group: 'Desktop', items: ['Electron', 'Offline-first'], text: 'Windows apps that keep working without internet.' },
  { group: 'Practice', items: ['Agile', 'Scrum', 'REST API design', 'Jira', 'ClickUp'], text: 'Delivery you can follow, in milestones you can review.' },
];

export const codeSample = [
  ['kw', 'export default async function'],
  ['fn', ' createInvoice'],
  ['p', '(order) {'],
  ['kw', '  const'],
  ['v', ' gst'],
  ['p', ' = '],
  ['fn', 'calculateGst'],
  ['p', '(order.items);'],
  ['kw', '  await'],
  ['fn', ' saveOffline'],
  ['p', '(order, gst);'],
  ['kw', '  return'],
  ['fn', ' syncToCloud'],
  ['p', '(order.id);'],
  ['p', '}'],
];

export const process = [
  { n: '01', k: 'DISCOVER', t: 'Understand the problem.', d: 'We start with your process, your users and what is going wrong today.' },
  { n: '02', k: 'ARCHITECT', t: 'Design the system.', d: 'Scope, milestones and a written estimate before development begins.' },
  { n: '03', k: 'ENGINEER', t: 'Build the product.', d: 'Built in stages, so you see working software early.' },
  { n: '04', k: 'VALIDATE', t: 'Test and refine.', d: 'Testing against real workflows and your own data.' },
  { n: '05', k: 'LAUNCH', t: 'Deploy to production.', d: 'Deployment, store submission and training where needed.' },
  { n: '06', k: 'EVOLVE', t: 'Improve continuously.', d: 'Fixes, updates and new requirements after you are live.' },
];

// Verified facts only. No year is printed here: add one only once the founding date is confirmed (the site's older
// copy says 2020; other public information says 2022).
export const story = [
  { k: 'THE BEGINNING', d: 'CodeLaksh starts in Sangram Nagar, Chhatrapati Sambhajinagar (Aurangabad), as a team of developers, designers and project managers building custom software.' },
  { k: 'BUILDING', d: 'Websites, applications and systems for businesses across several industries, with our own products growing alongside client work.' },
  { k: 'SHIPPING', d: 'CodeLaksh ERP goes live on Google Play with a Windows desktop app, and Kidodom launches on the App Store and Google Play.' },
  { k: 'TODAY', d: 'Published ERP plans for Indian businesses, nine service lines and one team that builds, deploys and supports what it ships.' },
];

export const facts = [
  { v: '2', l: 'Products live on app stores', d: 'CodeLaksh ERP and Kidodom' },
  { v: '9', l: 'Service lines', d: 'From custom software to digital growth' },
  { v: '4', l: 'Interface languages in CodeLaksh ERP', d: 'English, Hindi, Marathi, Gujarati' },
  { v: '3', l: 'Platforms we ship to', d: 'Android, iOS and Windows' },
];

export const projectScenes = [
  {
    slug: 'codelaksh-erp',
    n: 'PROJECT 01',
    title: 'CODELAKSH ERP',
    kind: 'ERP & business software',
    text: 'Offline-first GST billing, inventory, accounting and payments for Indian shops, restaurants and hotels, with a Windows desktop app, an Android app and cloud sync.',
    tags: ['React', 'TypeScript', 'Electron', 'Android', 'Cloud sync'],
    img: { src: '/erp-assets/desktop/dashboard.webp', alt: 'CodeLaksh ERP desktop dashboard with revenue, dues, cash and bank balances', w: 1200, h: 617 },
    img2: { src: '/erp-assets/mobile/billing.webp', alt: 'CodeLaksh ERP mobile app home screen', w: 540, h: 1169 },
  },
  {
    slug: 'kidodom',
    n: 'PROJECT 02',
    title: 'KIDODOM',
    kind: 'Mobile app & e-commerce',
    text: 'A shopping and guidance app for parents of young children, with a vaccination tracker, developmental milestones, contests and deals, on the App Store and Google Play.',
    tags: ['iOS', 'Android', 'E-commerce', 'Google and Apple sign-in'],
    img: { src: '/kidodom-assets/2-discover.webp', alt: 'Kidodom app home screen with product categories', w: 520, h: 1125 },
    img2: { src: '/kidodom-assets/5-guidance.webp', alt: 'Kidodom guidance hub with vaccination tracker and milestones', w: 520, h: 1125 },
  },
];

export const erpViews = [
  { id: 'dashboard', label: 'Dashboard', text: 'Revenue, dues, cash and bank balances at a glance.', src: '/erp-assets/desktop/dashboard.webp', alt: 'CodeLaksh ERP desktop dashboard' },
  { id: 'invoice', label: 'GST invoices', text: 'CGST and SGST invoices with print, PDF and share.', src: '/erp-assets/desktop/invoice.webp', alt: 'CodeLaksh ERP GST invoice' },
  { id: 'reports', label: 'Reports', text: 'Sales, purchase, stock and tax reports with CSV export.', src: '/erp-assets/desktop/reports.webp', alt: 'CodeLaksh ERP reports' },
  { id: 'labels', label: 'Barcode labels', text: 'Build and print sheets of product barcode labels.', src: '/erp-assets/desktop/barcode-labels.webp', alt: 'CodeLaksh ERP barcode label printing' },
  { id: 'plan', label: 'Plan & billing', text: 'See your plan, renewal date and what is included.', src: '/erp-assets/desktop/plan-billing.webp', alt: 'CodeLaksh ERP plan and billing screen' },
];

export const contactTypes = ['Software', 'Website', 'Mobile App', 'AI', 'ERP', 'Cloud', 'Marketing', 'Other'];

// ---- v2: engineering systems (scene-driven) ----
export const systems = [
  { id: 'ai', n: '01', title: 'AI', full: 'AI ENGINEERING', href: '/services/ai-development', anchor: 'AI development services', text: 'Systems that read, answer and decide: RAG chatbots grounded in your own content, document reading, speech, and AI inside the software you already run, on hosted or self-hosted models.', keys: ['RAG', 'Multi-model LLMs', 'Speech', 'Self-hosted Ollama'], status: 'Learning layer' },
  { id: 'software', n: '02', title: 'SOFTWARE', full: 'SOFTWARE ENGINEERING', href: '/services/custom-software-development', anchor: 'Custom software development services', text: 'Business applications designed around how your team works: modular, integrated and built to be maintained for years, not just launched.', keys: ['Java', '.NET', 'Node.js', 'Python'], status: 'Application layer' },
  { id: 'mobile', n: '03', title: 'MOBILE', full: 'MOBILE EXPERIENCES', href: '/services/mobile-app-development', anchor: 'Mobile app development services', text: 'Android, iOS and cross-platform apps that work on the phones your customers and staff actually hold. We ship our own apps to both stores.', keys: ['React Native', 'Android', 'iOS', 'Store release'], status: 'Interface layer' },
  { id: 'erp', n: '04', title: 'ERP', full: 'BUSINESS SYSTEMS', href: '/services/erp-development', anchor: 'ERP development services', text: 'Billing, inventory, accounting and payments in one system of record, backed by our own live product, CodeLaksh ERP.', keys: ['GST billing', 'Inventory', 'Accounting', 'Payments'], status: 'Records layer' },
  { id: 'cloud', n: '05', title: 'CLOUD', full: 'CLOUD ENGINEERING', href: '/services/cloud-solutions', anchor: 'Cloud solutions', text: 'Architecture, migration and deployment on GCP, AWS and self-hosted servers, with CI/CD, backups, monitoring and costs you can predict.', keys: ['GCP', 'AWS', 'VPS', 'CI/CD'], status: 'Infrastructure layer' },
  { id: 'data', n: '06', title: 'DATA', full: 'DATA & MACHINE LEARNING', href: '/services/machine-learning', anchor: 'Machine learning development services', text: 'Forecasting, classification and anomaly detection trained on your own records and delivered as features inside your software.', keys: ['TensorFlow', 'OCR', 'Audio analysis', 'Pipelines'], status: 'Insight layer' },
];

// ---- v2: industries (modules are the real ones in CodeLaksh ERP and the service pages) ----
export const industries = [
  { id: 'retail', name: 'RETAIL', arr: 'radial', text: 'Shops, supermarkets and kirana stores billing at a busy counter.', modules: ['Barcode billing', 'Inventory', 'Purchases', 'Customers', 'Payments', 'GST reports'] },
  { id: 'distribution', name: 'DISTRIBUTION', arr: 'flow', text: 'Several branches, one supplier ledger, stock that moves between them.', modules: ['Orders', 'Branch stock', 'Transfers', 'Purchase orders', 'Supplier ledger', 'Dues'] },
  { id: 'restaurants', name: 'RESTAURANTS', arr: 'grid', text: 'Tables, kitchen tickets and QR ordering on one floor plan.', modules: ['Tables', 'Orders', 'KOT', 'Kitchen display', 'QR ordering', 'Payments'] },
  { id: 'hotels', name: 'HOTELS', arr: 'flow', text: 'Rooms and bookings with check-in and check-out billed to an invoice.', modules: ['Rooms', 'Bookings', 'Check-in', 'Check-out', 'Invoices', 'Occupancy'] },
  { id: 'medical', name: 'MEDICAL', arr: 'radial', text: 'Batches and expiry dates controlled at the point of sale.', modules: ['Products', 'Batches', 'Expiry control', 'Billing', 'Write-off', 'Customers'] },
  { id: 'bakeries', name: 'BAKERIES', arr: 'grid', text: 'A daily production plan, weighed billing and waste you can see.', modules: ['Production plan', 'Waste', 'Counters', 'Weighed billing', 'Inventory', 'Orders'] },
  { id: 'sweet-marts', name: 'SWEET MARTS', arr: 'radial', text: 'Multiple counters, one customer bill and a token for each counter.', modules: ['Counters', 'Tokens', 'Products', 'Slips', 'Orders', 'Counter reports'] },
  { id: 'salons', name: 'SALONS', arr: 'flow', text: 'Services, stylists and appointments with no double-booking.', modules: ['Services', 'Stylists', 'Appointments', 'Billing', 'Customers', 'Day summary'] },
  { id: 'growing', name: 'GROWING BUSINESSES', arr: 'grid', text: 'Teams that outgrew spreadsheets and need software of their own.', modules: ['Custom app', 'Portal', 'Workflows', 'Dashboards', 'Integrations', 'Mobile app'] },
];

export const studioLines = [
  ['CODELAKSH', 'Studio'],
  ['CHHATRAPATI SAMBHAJINAGAR', 'Aurangabad'],
  ['MAHARASHTRA', 'State'],
  ['INDIA', 'Country'],
];
