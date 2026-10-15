import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import TeamApplyForm from '@/components/TeamApplyForm';
import { SITE, absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { careers, getCareer } from '@/lib/careers';

export function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const job = getCareer(params.slug);
  if (!job) return {};
  return pageMetadata({
    title: `${job.title} (${job.type}) at CodeLaksh | Pan India`,
    description: job.summary,
    path: `/careers/${job.slug}`,
  });
}

export default function CareerPage({ params }) {
  const job = getCareer(params.slug);
  if (!job) notFound();

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Careers', href: '/careers' },
    { name: job.title, href: `/careers/${job.slug}` },
  ];
  const schema = [
    breadcrumbSchema(crumbs),
    {
      '@type': 'JobPosting',
      '@id': `${absoluteUrl(`/careers/${job.slug}`)}#job`,
      title: job.title,
      description: `${job.summary} ${job.role}`,
      employmentType: job.employmentType,
      datePosted: '2026-10-14',
      hiringOrganization: { '@type': 'Organization', name: SITE.name, sameAs: SITE.url },
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'India' },
      totalJobOpenings: Number(job.openings) || undefined,
    },
  ];

  const list = (items) => (
    <ul className="pg-list">
      {items.map((t) => (
        <li key={t}>
          <i className="fas fa-check" aria-hidden="true"></i> {t}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <JsonLd nodes={schema} />
      <Header />
      <main id="main">
        <PageHero crumbs={crumbs} label={`${job.department} · ${job.type}`} h1={`${job.title} at CodeLaksh`} lead={job.summary}>
          <ul className="career-meta career-meta-hero">
            <li>{job.location}</li>
            <li>{job.duration}</li>
            <li>Openings: {job.openings}</li>
          </ul>
          <a href="#apply" className="btn btn-primary pg-hero-cta">
            Apply now
          </a>
        </PageHero>
        <section className="erp-section">
          <div className="container join-wrap career-body">
            <h2 className="pg-h2">About CodeLaksh</h2>
            <p>{job.about}</p>
            <h2 className="pg-h2">The role</h2>
            <p>{job.role}</p>
            <h2 className="pg-h2">What you will do</h2>
            {list(job.responsibilities)}
            <h2 className="pg-h2">Who we are looking for</h2>
            {list(job.requirements)}
            <h2 className="pg-h2">What you get</h2>
            {list(job.benefits)}
            <h2 className="pg-h2">How we hire</h2>
            <ol className="career-steps">
              {job.process.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </section>
        <section className="erp-section" id="apply">
          <div className="container join-wrap">
            <h2 className="pg-h2">Apply for {job.title}</h2>
            <TeamApplyForm role={job.slug} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
