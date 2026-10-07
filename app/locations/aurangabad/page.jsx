import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import { SITE, absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { services } from '@/lib/services';

export const metadata = pageMetadata({
  title: 'Software Development Company in Chhatrapati Sambhajinagar | CodeLaksh',
  description:
    'CodeLaksh is a software development company in Chhatrapati Sambhajinagar (Aurangabad) building web and mobile apps, ERP, AI and cloud software for businesses.',
  path: '/locations/aurangabad',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Chhatrapati Sambhajinagar', href: '/locations/aurangabad' },
];

export default function AurangabadPage() {
  const schema = [
    breadcrumbSchema(crumbs),
    {
      '@type': 'WebPage',
      '@id': `${absoluteUrl('/locations/aurangabad')}#page`,
      url: absoluteUrl('/locations/aurangabad'),
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
              CodeLaksh also has a second branch in Pune, Maharashtra, so teams there can work with us in person as well.
            </p>
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
