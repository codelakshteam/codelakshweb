import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import { SITE, absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { careers } from '@/lib/careers';

export const metadata = pageMetadata({
  title: 'Careers at CodeLaksh | Sales Intern Openings, Pan India',
  description:
    'CodeLaksh is hiring 10 Sales Interns across India (unpaid internship). Learn to sell software by introducing CodeLaksh ERP to businesses in your city. Apply online.',
  path: '/careers',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Careers', href: '/careers' },
];

export default function CareersPage() {
  const schema = [
    breadcrumbSchema(crumbs),
    {
      '@type': 'CollectionPage',
      '@id': `${absoluteUrl('/careers')}#page`,
      url: absoluteUrl('/careers'),
      name: 'Careers at CodeLaksh',
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
          label="Careers"
          h1="Build your career with CodeLaksh"
          lead="We are a software team building ERP and apps for Indian businesses. Our internships are open across India. Join us and learn by doing real work."
        />
        <section className="erp-section">
          <div className="container join-wrap">
            <h2 className="pg-h2">Open roles</h2>
            <div className="career-list">
              {careers.map((job) => (
                <a key={job.slug} href={`/careers/${job.slug}`} className="career-card">
                  <div className="career-card-top">
                    <h3>{job.title}</h3>
                    <span className="career-tag">{job.type}</span>
                  </div>
                  <p>{job.summary}</p>
                  <ul className="career-meta">
                    <li>{job.department}</li>
                    <li>{job.location}</li>
                    <li>{job.duration}</li>
                  </ul>
                  <span className="career-cta">View role and apply &rarr;</span>
                </a>
              ))}
            </div>
            <p className="career-note">
              Do not see a role that fits? Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with a short note about yourself.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
