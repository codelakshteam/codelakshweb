import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import { SITE, absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { services } from '@/lib/services';

export const metadata = pageMetadata({
  title: 'Software Development Services in India | CodeLaksh',
  description:
    'Explore CodeLaksh services: custom software, web and mobile apps, AI, machine learning, ERP, e-commerce, cloud and digital marketing for Indian businesses.',
  path: '/services',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
];

export default function ServicesPage() {
  const schema = [
    breadcrumbSchema(crumbs),
    {
      '@type': 'CollectionPage',
      '@id': `${absoluteUrl('/services')}#page`,
      url: absoluteUrl('/services'),
      name: 'CodeLaksh software development services',
      isPartOf: { '@id': `${SITE.url}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: services.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: absoluteUrl(`/services/${service.slug}`),
          name: service.name,
        })),
      },
    },
  ];

  return (
    <>
      <JsonLd nodes={schema} />
      <Header />
      <main>
        <PageHero
          crumbs={crumbs}
          label="Our Services"
          h1="Software Development Services"
          lead="CodeLaksh is a software development company in Aurangabad, Maharashtra. We design, build and support software for businesses across India, from custom applications and ERP to AI, mobile apps and cloud."
        />
        <section className="erp-section">
          <div className="container">
            <div className="erp-feature-grid">
              {services.map((service) => (
                <a className="service-card pg-service-card" href={`/services/${service.slug}`} key={service.slug}>
                  <div className="service-icon">
                    <i className={`fas ${service.icon}`} aria-hidden="true"></i>
                  </div>
                  <h2>{service.name}</h2>
                  <p>{service.cardText}</p>
                  <span className="service-link">
                    {service.anchor} <i className="fas fa-arrow-right" aria-hidden="true"></i>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="erp-section erp-alt">
          <div className="container pg-prose">
            <h2 className="pg-h2">How we work with you</h2>
            <p>
              Every engagement starts with a conversation about the problem, not the technology. We confirm scope and
              priorities, agree a milestone plan and a written estimate, then build in stages so you can review working
              software early. After launch we stay on for fixes, updates and new requirements.
            </p>
            <p>
              Not sure which service you need? Describe the problem on our <a href="/contact">contact page</a> and we
              will recommend a starting point. You can also read about <a href="/about">CodeLaksh</a>, see{' '}
              <a href="/portfolio">our work</a>, or learn about{' '}
              <a href="/locations/aurangabad">software development in Aurangabad</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
