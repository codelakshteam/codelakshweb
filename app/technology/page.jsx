import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import TechConstellation from '@/components/cinematic/TechConstellation';
import TechnologyUniverse from '@/components/cinematic/TechnologyUniverse';
import { SITE, absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Technology Stack and Engineering | CodeLaksh',
  description:
    'The technologies CodeLaksh builds with: React, Next.js, TypeScript, Node.js, Python, AI, Android, iOS, Electron and AWS, Azure and Google Cloud, and how we choose them.',
  path: '/technology',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Technology', href: '/technology' },
];

export default function TechnologyPage() {
  const schema = [
    breadcrumbSchema(crumbs),
    { '@type': 'WebPage', '@id': `${absoluteUrl('/technology')}#page`, url: absoluteUrl('/technology'), name: 'CodeLaksh technology stack', about: { '@id': `${SITE.url}/#organization` }, isPartOf: { '@id': `${SITE.url}/#website` } },
  ];
  return (
    <>
      <JsonLd nodes={schema} />
      <Header />
      <main id="main">
        <PageHero
          crumbs={crumbs}
          label="Technology"
          h1="Technology and Engineering Stack"
          lead="CodeLaksh chooses tools to fit the project. This is what we build web, mobile, desktop, AI and cloud software with, and how the capabilities connect."
        />
        <section className="erp-section">
          <div className="container pg-prose">
            <p>
              We build web products with React, Next.js and TypeScript, back-end services with Node.js and Python, desktop software with
              Electron, and mobile apps for Android and iOS. AI features use language model APIs and Python machine learning, and we deploy
              to AWS, Azure or Google Cloud with backups and monitoring. Our own products, CodeLaksh ERP and Kidodom, run on this same
              engineering practice.
            </p>
            <p>
              Each choice is made per project: the simplest tool that meets the need, that your team can maintain, and that fits your budget.
              See the <a href="/services">services</a> we offer or <a href="/contact">talk to us about your project</a>.
            </p>
          </div>
        </section>
        <TechConstellation heading={false} />
        <TechnologyUniverse />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
