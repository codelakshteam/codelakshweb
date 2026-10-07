import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import { SITE, absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { services } from '@/lib/services';

export const metadata = pageMetadata({
  title: 'About CodeLaksh | Software Development Company',
  description:
    'CodeLaksh is a software development company in Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, building custom software, apps, AI and ERP for businesses since 2020.',
  path: '/about',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
];

const industries = [
  ['Retail and distribution', 'Shops, supermarkets, kirana stores and distributors that need fast billing, stock control and accounts.'],
  ['Restaurants and hotels', 'Table, kitchen-order, reservation and room management with billing.'],
  ['Healthcare retail', 'Medical stores that track batches and expiry dates.'],
  ['Food and bakery', 'Sweet marts, bakeries and cake shops with counters, production plans and custom orders.'],
  ['Services', 'Salons and other appointment-based businesses.'],
  ['Growing companies', 'Teams that have outgrown spreadsheets and need their own application, portal or mobile app.'],
];

export default function AboutPage() {
  const schema = [
    breadcrumbSchema(crumbs),
    {
      '@type': 'AboutPage',
      '@id': `${absoluteUrl('/about')}#page`,
      url: absoluteUrl('/about'),
      name: 'About CodeLaksh',
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
          label="About Us"
          h1="About CodeLaksh, a Software Development Company in Chhatrapati Sambhajinagar (Aurangabad)"
          lead="CodeLaksh designs, builds and supports software for businesses in India: custom applications, web and mobile apps, ERP, AI and cloud."
        />

        <section className="erp-section">
          <div className="container pg-prose">
            <h2 className="pg-h2">Who we are</h2>
            <p>
              CodeLaksh is a software development company based in Sangram Nagar, {SITE.city} ({SITE.cityAlt}),{' '}
              {SITE.region}, India. We have been building software since {SITE.foundingYear}. Our team of developers,
              designers and project managers has worked on projects across several industries, and we work with businesses
              from {SITE.city} and across India.
            </p>
            <p>
              We are also a product company. CodeLaksh ERP, our billing, inventory and accounting software, is live on
              Google Play, and Kidodom, our app for parents, is on the App Store and Google Play. Building and supporting
              our own products keeps us honest about what good software needs after launch: updates, support, backups and
              clear pricing.
            </p>
            <h2 className="pg-h2">What we do</h2>
            <p>We take on projects in these areas, each described on its own page:</p>
            <ul className="pg-list">
              {services.map((service) => (
                <li key={service.slug}>
                  <i className="fas fa-check" aria-hidden="true"></i>{' '}
                  <a href={`/services/${service.slug}`}>{service.anchor}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="erp-section erp-alt">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Industries we build for</h2>
            </div>
            <div className="erp-feature-grid">
              {industries.map(([title, text]) => (
                <div className="service-card" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="erp-section">
          <div className="container pg-prose">
            <h2 className="pg-h2">How we approach a project</h2>
            <ol className="pg-steps">
              <li>
                <strong>Understand the problem.</strong> We start with your process, your users and what is going wrong
                today.
              </li>
              <li>
                <strong>Agree scope and a plan.</strong> You get a milestone plan and a written estimate before
                development starts.
              </li>
              <li>
                <strong>Build in stages.</strong> You see working software early and can change direction while it is cheap
                to do so.
              </li>
              <li>
                <strong>Launch and support.</strong> We deploy, train your team where needed and stay available for fixes
                and new requirements.
              </li>
            </ol>
            <h2 className="pg-h2">Technology</h2>
            <p>
              We work with React, Next.js, Node.js, Python and TypeScript for web and back-end systems, Android, iOS and
              cross-platform tools for mobile, and AWS, Azure and Google Cloud for hosting. We choose tools to fit the
              project rather than the other way round.
            </p>
            <h2 className="pg-h2">Our work and where to find us</h2>
            <p>
              See what we have built on our <a href="/portfolio">portfolio</a>, including{' '}
              <a href="/portfolio/codelaksh-erp">CodeLaksh ERP</a> and <a href="/portfolio/kidodom">Kidodom</a>. Our office
              is at Sangram Nagar, {SITE.city}, {SITE.region}; read more about{' '}
              <a href="/locations/aurangabad">our Chhatrapati Sambhajinagar (Aurangabad) location</a>. To discuss a project, visit the{' '}
              <a href="/contact">contact page</a>, call <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a> or email{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
            <div className="pg-brandmark">
              <Image src="/logo-header.png" alt="CodeLaksh logo" width={72} height={63} loading="lazy" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
