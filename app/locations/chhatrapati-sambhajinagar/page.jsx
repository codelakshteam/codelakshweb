import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import { SITE, absoluteUrl, breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';
import { services } from '@/lib/services';

export const metadata = pageMetadata({
  title: 'Software Development Company in Chhatrapati Sambhajinagar | CodeLaksh',
  description:
    'CodeLaksh is a software development company in Chhatrapati Sambhajinagar (Aurangabad) building web and mobile apps, ERP, AI and cloud software for businesses.',
  path: '/locations/chhatrapati-sambhajinagar',
});


const faqs = [
  [
    'Where is the CodeLaksh office in Chhatrapati Sambhajinagar?',
    `CodeLaksh is based in Sangram Nagar, ${SITE.city} (${SITE.cityAlt}), ${SITE.region}. You can call ${SITE.phoneDisplay} to arrange a visit, and we also work remotely with clients across India.`,
  ],
  [
    'Can I meet the CodeLaksh team in person?',
    'Yes. Call or message us to fix a time at the Sangram Nagar office. Many clients also prefer video calls, and we run projects the same way either way.',
  ],
  [
    'What software services does CodeLaksh provide?',
    'Custom software, website and web app development, Android and iOS app development, ERP and billing software, AI development and business automation, e-commerce, cloud solutions and digital marketing.',
  ],
  [
    'Do you build billing and ERP software for shops and restaurants?',
    'Yes. CodeLaksh ERP is our own GST billing, inventory and accounting product for shops, distributors, restaurants and hotels, with restaurant features such as tables, KOT and QR ordering. It has a 7-day free trial.',
  ],
  [
    'How much does a custom software or app project cost?',
    'Cost depends on scope: the number of user roles and screens, integrations, platforms (web, Android, iOS), and whether AI features are involved. Send your requirement and we reply with questions and a written estimate.',
  ],
  [
    'Will I own the source code?',
    'Ownership and handover terms are agreed in the project contract before work begins. Tell us early if you need full source-code handover.',
  ],
  [
    'Do you support the software after launch?',
    'Yes. We offer maintenance and support after launch, including bug fixes, updates and new features as your needs change.',
  ],
  [
    'Can AI be added to software I already use?',
    'Often, yes. We add AI chatbots, document search and automation to existing websites and applications through their APIs, after checking what your current system exposes.',
  ],
];

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Chhatrapati Sambhajinagar', href: '/locations/chhatrapati-sambhajinagar' },
];

export default function ChhatrapatiSambhajinagarPage() {
  const schema = [
    breadcrumbSchema(crumbs),
    faqSchema(faqs),
    {
      '@type': 'Service',
      '@id': `${absoluteUrl('/locations/chhatrapati-sambhajinagar')}#service`,
      name: 'Software development in Chhatrapati Sambhajinagar (Aurangabad)',
      serviceType: 'Custom software, web, mobile app, ERP and AI development',
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: [
        { '@type': 'City', name: SITE.city, alternateName: SITE.cityAlt },
        { '@type': 'Country', name: 'India' },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${absoluteUrl('/locations/chhatrapati-sambhajinagar')}#page`,
      url: absoluteUrl('/locations/chhatrapati-sambhajinagar'),
      name: 'Software development company in Chhatrapati Sambhajinagar (Aurangabad)',
      about: { '@id': `${SITE.url}/#organization` },
      isPartOf: { '@id': `${SITE.url}/#website` },
    },
  ];

  return (
    <>
      <JsonLd nodes={schema} />
      <Header />
      <main id="main">
        <PageHero
          crumbs={crumbs}
          label="Our Location"
          h1="Software Development Company in Chhatrapati Sambhajinagar (Aurangabad)"
          lead="CodeLaksh is based in Sangram Nagar, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra. We build software for local businesses and work with clients across India."
        />

        <section className="erp-section">
          <div className="container pg-prose">
            <p>
              <strong>In short:</strong> CodeLaksh is a software development company in Sangram Nagar, {SITE.city} ({SITE.cityAlt}). We build
              custom software, websites, mobile apps, ERP and billing software and AI automation, and you can visit the office, call or
              send a requirement for a written estimate.
            </p>
            <p>
              <a className="fm-btn fm-btn-solid" href={`tel:${SITE.phone}`} data-cta>Call {SITE.phoneDisplay}</a>{' '}
              <a className="fm-btn" href={SITE.whatsappUrl} data-cta rel="noopener">WhatsApp us</a>{' '}
              <a className="fm-btn" href="/contact" data-cta>Send your requirement</a>
            </p>
            <h2 className="pg-h2">A software company in Chhatrapati Sambhajinagar (Aurangabad)</h2>
            <p>
              Chhatrapati Sambhajinagar, the city formerly and still widely known as Aurangabad, is where CodeLaksh is based and where our team
              works. Businesses searching for a software development company, an IT company or a web or app developer
              in Chhatrapati Sambhajinagar (Aurangabad) can meet us in person at our Sangram Nagar office, or work with us remotely like most of our
              clients across India.
            </p>
            <p>
              Local shops, distributors, restaurants, clinics, service businesses and growing companies often face the
              same problem: their billing, stock, orders and customer records live in spreadsheets, paper registers and
              chat messages. We replace that with software built around how the business actually runs.
            </p>
            <h2 className="pg-h2">What we build for Chhatrapati Sambhajinagar (Aurangabad) businesses</h2>
            <ul className="pg-list">
              {services.map((service) => (
                <li key={service.slug}>
                  <i className="fas fa-check" aria-hidden="true"></i>{' '}
                  <a href={`/services/${service.slug}`}>{service.anchor}</a>: {service.cardText}
                </li>
              ))}
            </ul>
            <p>
              CodeLaksh also has a second branch in Hadapsar, Pune, Maharashtra, on the same phone number, so teams there can work with us in person as well.
            </p>
            <h2 className="pg-h2">Billing and ERP software for local shops, restaurants and hotels</h2>
            <p>
              Many businesses in {SITE.city} ({SITE.cityAlt}) run billing from registers or spreadsheets. CodeLaksh ERP is our own GST billing,
              inventory and accounting product for shops, distributors, restaurants and hotels, with offline desktop billing, a mobile app and
              restaurant tools such as table management, KOT and QR ordering. See the <a href="/erp" data-cta>CodeLaksh ERP plans and
              7-day free trial</a>, or <a href="/contact" data-cta>ask for a walkthrough</a>.
            </p>
            <h2 className="pg-h2">Common questions</h2>
            {faqs.map(([q, a]) => (
              <details className="erp-faq-item" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
            <h2 className="pg-h2">Visit or contact CodeLaksh</h2>
            <address className="pg-address">
              <strong>CodeLaksh</strong>
              <br />
              Sangram Nagar, {SITE.city} ({SITE.cityAlt})
              <br />
              {SITE.region}, India
              <br />
              Phone: <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
              <br />
              Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <br />
              Hours: Monday to Saturday, 10:00 AM to 7:00 PM
              <br />
              <a href={SITE.mapUrl} rel="noopener" data-cta>Get directions on Google Maps</a>
            </address>
            <p>
              Learn more <a href="/about">about CodeLaksh</a>, browse <a href="/portfolio">our work</a> or{' '}
              <a href="/contact">send us your requirement</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
