import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import { SITE, absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { projects } from '@/lib/projects';

export const metadata = pageMetadata({
  title: 'Portfolio: Software and App Projects | CodeLaksh',
  description:
    'See software CodeLaksh has built and runs: CodeLaksh ERP for GST billing and inventory, and the Kidodom shopping app for parents, with features and technology.',
  path: '/portfolio',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
];

export default function PortfolioPage() {
  const schema = [
    breadcrumbSchema(crumbs),
    {
      '@type': 'CollectionPage',
      '@id': `${absoluteUrl('/portfolio')}#page`,
      url: absoluteUrl('/portfolio'),
      name: 'CodeLaksh portfolio',
      isPartOf: { '@id': `${SITE.url}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: absoluteUrl(`/portfolio/${project.slug}`),
          name: project.name,
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
          label="Our Work"
          h1="Portfolio: Software We Have Built"
          lead="These are products CodeLaksh designed, built and runs itself. We add client projects here when the client agrees to be named."
        />
        <section className="erp-section">
          <div className="container">
            <div className="portfolio-grid is-two">
              {projects.map((project) => (
                <a className={`portfolio-item accent-${project.accent}`} href={`/portfolio/${project.slug}`} key={project.slug}>
                  <div className="portfolio-image">
                    <span className="portfolio-icon">
                      <i className={`fas ${project.icon}`} aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="portfolio-info">
                    <span className="portfolio-tag">{project.category}</span>
                    <h2>{project.name}</h2>
                    <p>{project.cardText}</p>
                  </div>
                  <span className="portfolio-arrow" aria-hidden="true">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="erp-section erp-alt">
          <div className="container pg-prose">
            <h2 className="pg-h2">Have a project in mind?</h2>
            <p>
              We build custom applications, websites, mobile apps, ERP, AI and cloud systems. Read about our{' '}
              <a href="/services">software development services</a> or <a href="/contact">contact us</a> to discuss your
              requirement.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
