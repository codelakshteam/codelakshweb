import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import Contact from '@/components/Contact';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import { SITE, absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { services } from '@/lib/services';

export const metadata = pageMetadata({
  title: 'Contact CodeLaksh | Software Development Company in India',
  description:
    'Contact CodeLaksh in Aurangabad, Maharashtra to discuss custom software, web or mobile apps, ERP, AI or cloud. Call +91-9834684866 or send your requirement online.',
  path: '/contact',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
];

export default function ContactPage() {
  const schema = [
    breadcrumbSchema(crumbs),
    {
      '@type': 'ContactPage',
      '@id': `${absoluteUrl('/contact')}#page`,
      url: absoluteUrl('/contact'),
      name: 'Contact CodeLaksh',
      isPartOf: { '@id': `${SITE.url}/#website` },
      about: { '@id': `${SITE.url}/#organization` },
    },
  ];

  return (
    <>
      <JsonLd nodes={schema} />
      <Header />
      <main>
        <PageHero
          crumbs={crumbs}
          label="Contact Us"
          h1="Contact CodeLaksh, a Software Development Company in India"
          lead="Tell us what you want to build or fix. We will reply with questions, a suggested approach and a written estimate."
        />
        <section className="erp-section">
          <div className="container pg-two">
            <div className="pg-prose">
              <h2 className="pg-h2">CodeLaksh business details</h2>
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
              </address>
              <p>
                <strong>Business hours:</strong> Monday to Saturday, 10:00 AM to 7:00 PM (IST). We work with clients in{' '}
                {SITE.city} and across India.
              </p>
              <p>
                Read <a href="/about">about CodeLaksh</a> or see <a href="/locations/aurangabad">how we work from Aurangabad</a>.
              </p>
            </div>
            <div className="pg-prose">
              <h2 className="pg-h2">What you can contact us about</h2>
              <ul className="pg-list">
                {services.map((service) => (
                  <li key={service.slug}>
                    <i className="fas fa-check" aria-hidden="true"></i>{' '}
                    <a href={`/services/${service.slug}`}>{service.anchor}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
