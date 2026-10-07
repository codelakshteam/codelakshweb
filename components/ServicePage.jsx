import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import { SITE, absoluteUrl, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { getService } from '@/lib/services';

export default function ServicePage({ service }) {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: service.name, href: `/services/${service.slug}` },
  ];
  const related = service.related.map(getService).filter(Boolean);

  const schema = [
    {
      '@type': 'Service',
      '@id': `${absoluteUrl(`/services/${service.slug}`)}#service`,
      name: service.name,
      serviceType: service.name,
      description: service.description,
      url: absoluteUrl(`/services/${service.slug}`),
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: { '@type': 'Country', name: 'India' },
    },
    breadcrumbSchema(crumbs),
    faqSchema(service.faqs),
  ];

  return (
    <>
      <JsonLd nodes={schema} />
      <Header />
      <main>
        <PageHero crumbs={crumbs} label="Our Services" h1={service.h1} lead={service.lead}>
          <div className="erp-cta pg-hero-cta">
            <a href="/contact" className="btn btn-primary">
              Discuss your project <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
            <a href="/portfolio" className="btn btn-outline">
              See our work
            </a>
          </div>
        </PageHero>

        <section className="erp-section">
          <div className="container pg-prose">
            {service.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {service.extraLink && (
              <p>
                <a className="pg-inline-link" href={service.extraLink.href}>
                  {service.extraLink.label} <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </a>
              </p>
            )}
          </div>
        </section>

        <section className="erp-section erp-alt">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">{service.buildsTitle}</h2>
            </div>
            <div className="erp-feature-grid">
              {service.builds.map(([title, text]) => (
                <div className="service-card" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="erp-section">
          <div className="container pg-two">
            <div>
              <h2 className="pg-h2">{service.useCasesTitle}</h2>
              <ul className="pg-list">
                {service.useCases.map((item) => (
                  <li key={item}>
                    <i className="fas fa-check" aria-hidden="true"></i> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="pg-h2">Technologies and approach</h2>
              <dl className="pg-tech">
                {service.tech.map(([group, items]) => (
                  <div key={group}>
                    <dt>{group}</dt>
                    <dd>{items}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="erp-section erp-alt">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Why work with CodeLaksh</h2>
            </div>
            <div className="pg-benefits">
              {service.benefits.map(([title, text]) => (
                <div className="pg-benefit" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <p className="pg-note">
              CodeLaksh is a software development company in {SITE.city} ({SITE.cityAlt}), {SITE.region}, India.{' '}
              <a href="/about">About CodeLaksh</a> · <a href="/locations/aurangabad">Software development in Aurangabad</a>
            </p>
          </div>
        </section>

        <section className="erp-section" id="faq">
          <div className="container erp-faq">
            <div className="section-header">
              <h2 className="section-title">Frequently asked questions</h2>
            </div>
            {service.faqs.map(([q, a]) => (
              <details className="erp-faq-item" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="erp-section erp-alt">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Related services</h2>
            </div>
            <div className="pg-links">
              {related.map((item) => (
                <a key={item.slug} href={`/services/${item.slug}`} className="pg-link-card">
                  <strong>{item.anchor}</strong>
                  <span>{item.cardText}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="erp-section">
          <div className="container erp-final">
            <h2 className="section-title">
              Tell us what you want to <span className="highlight">build</span>
            </h2>
            <p className="erp-sub">
              Share your requirement and we will reply with questions, a suggested approach and a written estimate. Call{' '}
              <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a> or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
            <div className="erp-cta erp-center">
              <a href="/contact" className="btn btn-primary">
                Contact CodeLaksh
              </a>
              <a href="/services" className="btn btn-outline">
                All services
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
