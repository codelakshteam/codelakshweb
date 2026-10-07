import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import { SITE, absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { projects, getProject } from '@/lib/projects';
import { getService } from '@/lib/services';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  if (!project) return {};
  return pageMetadata({ title: project.title, description: project.description, path: `/portfolio/${project.slug}` });
}

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: project.name, href: `/portfolio/${project.slug}` },
  ];
  const provided = project.services.map(getService).filter(Boolean);
  const schema = [
    breadcrumbSchema(crumbs),
    {
      '@type': 'WebPage',
      '@id': `${absoluteUrl(`/portfolio/${project.slug}`)}#page`,
      url: absoluteUrl(`/portfolio/${project.slug}`),
      name: project.title,
      description: project.description,
      isPartOf: { '@id': `${SITE.url}/#website` },
      about: { '@id': `${SITE.url}/#organization` },
    },
  ];
  if (project.slug === 'kidodom') {
    schema.push({
      '@type': 'MobileApplication',
      '@id': 'https://kidodom.in/#app',
      name: 'Kidodom',
      url: 'https://kidodom.in',
      applicationCategory: 'ShoppingApplication',
      operatingSystem: 'iOS, Android',
      installUrl: [
        'https://apps.apple.com/ng/app/kidodom/id6804982156',
        'https://play.google.com/store/apps/details?id=com.kidodom.web',
      ],
      publisher: { '@id': `${SITE.url}/#organization` },
    });
  }

  return (
    <>
      <JsonLd nodes={schema} />
      <Header />
      <main id="main">
        <PageHero crumbs={crumbs} label={project.category} h1={project.h1} lead={project.summary} />

        <section className="erp-section">
          <div className="container pg-two">
            <div className="pg-prose">
              <h2 className="pg-h2">The problem</h2>
              <p>{project.problem}</p>
            </div>
            <div className="pg-prose">
              <h2 className="pg-h2">Our solution</h2>
              <p>{project.solution}</p>
            </div>
          </div>
        </section>

        <section className="erp-section erp-alt">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Screenshots</h2>
            </div>
            <div className="pg-shots">
              {project.shots.map((shot) => (
                <Image key={shot.src} src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" />
              ))}
            </div>
          </div>
        </section>

        <section className="erp-section">
          <div className="container pg-two">
            <div>
              <h2 className="pg-h2">Key features</h2>
              <ul className="pg-list">
                {project.features.map((feature) => (
                  <li key={feature}>
                    <i className="fas fa-check" aria-hidden="true"></i> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="pg-h2">Technology</h2>
              <ul className="pg-chips">
                {project.tech.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h2 className="pg-h2">Result</h2>
              <p className="pg-prose-p">{project.impact}</p>
              <h2 className="pg-h2">Services provided</h2>
              <ul className="pg-list">
                {provided.map((service) => (
                  <li key={service.slug}>
                    <i className="fas fa-check" aria-hidden="true"></i>{' '}
                    <a href={`/services/${service.slug}`}>{service.anchor}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="erp-section erp-alt">
          <div className="container erp-final">
            <h2 className="section-title">
              See it <span className="highlight">live</span>
            </h2>
            <div className="erp-cta erp-center">
              {project.links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`btn ${index === 0 ? 'btn-primary' : 'btn-outline'}`}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="erp-sub">
              Want something similar? <a href="/contact">Contact CodeLaksh</a> or browse <a href="/portfolio">all projects</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
