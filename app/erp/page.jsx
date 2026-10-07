import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import ErpSubnav from '@/components/ErpSubnav';
import ErpPricing from '@/components/ErpPricing';
import { pageMetadata } from '@/lib/seo';
import { PLAY_STORE_URL, erpHighlights, advancedFeatures, industryModules, mobileShots, desktopShots, addOns, erpFaqs } from '@/components/erpData';

export const metadata = {
  ...pageMetadata({
    title: 'CodeLaksh ERP: GST Billing, Inventory & Accounting Software',
    description:
      'GST billing, inventory and accounting ERP for Indian shops, restaurants and hotels. Multi-branch, live sync, offline desktop and Android app. 7-day free trial.',
    path: '/erp',
    image: '/erp-assets/mobile/billing.webp',
    imageAlt: 'CodeLaksh ERP mobile app',
    imageWidth: 540,
    imageHeight: 1169,
  }),
  keywords: [
    'ERP software India',
    'GST billing software',
    'billing software for small business',
    'inventory management software',
    'accounting software India',
    'restaurant billing software',
    'offline billing software',
    'CodeLaksh ERP',
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: erpFaqs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://codelaksh.in/erp#app',
      name: 'CodeLaksh ERP',
      url: 'https://codelaksh.in/erp',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Android, Windows',
      description:
        'GST billing, inventory, accounting, purchases and payments software for Indian shops, restaurants and hotels. Works offline on desktop with cloud sync and a mobile app.',
      downloadUrl: 'https://play.google.com/store/apps/details?id=com.codelaksh.erp',
      publisher: { '@id': 'https://codelaksh.in/#organization' },
      offers: [
        { '@type': 'Offer', name: 'Starter (yearly)', price: '3499', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Growth (monthly)', price: '499', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Growth (yearly)', price: '4999', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Business (monthly)', price: '999', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Business (yearly)', price: '9999', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Pro (monthly)', price: '1999', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Pro (yearly)', price: '19999', priceCurrency: 'INR' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://codelaksh.in/' },
        { '@type': 'ListItem', position: 2, name: 'CodeLaksh ERP', item: 'https://codelaksh.in/erp' },
      ],
    },
  ],
};

function PlayStoreButton({ className = '' }) {
  return (
    <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className={`btn btn-play ${className}`}>
      <i className="fab fa-google-play" aria-hidden="true"></i>
      <span>
        <small>GET IT ON</small>
        Google Play
      </span>
    </a>
  );
}

export default function ErpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <section className="erp-hero">
          <div className="container erp-hero-grid">
            <div className="erp-hero-copy">
              <span className="section-subtitle">Our Product</span>
              <h1 className="erp-title">
                CodeLaksh <span className="highlight">ERP</span>
              </h1>
              <p className="erp-lead">
                GST billing software, inventory management, accounting, purchases and payments in one ERP, built for
                Indian shops, distributors, restaurants and hotels. Bill offline at the counter, sync to the cloud, and run your
                business from your phone.
              </p>
              <div className="erp-cta">
                <PlayStoreButton />
                <a href="#pricing" className="btn btn-outline">
                  See pricing
                </a>
              </div>
              <p className="erp-note">
                <i className="fas fa-circle-check" aria-hidden="true"></i> Live on Google Play &nbsp;·&nbsp;
                <i className="fas fa-circle-check" aria-hidden="true"></i> Windows desktop app &nbsp;·&nbsp;
                <i className="fas fa-circle-check" aria-hidden="true"></i> 7-day free trial on Growth
              </p>
            </div>
            <div className="erp-hero-phones" aria-hidden="false">
              <Image className="erp-phone erp-phone-back" src={mobileShots[2].src} alt={mobileShots[2].alt} width={270} height={584} priority />
              <Image className="erp-phone erp-phone-front" src={mobileShots[0].src} alt={mobileShots[0].alt} width={270} height={584} priority />
            </div>
          </div>
        </section>

        <ErpSubnav />

        <section className="erp-section" id="features">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">What you get</span>
              <h2 className="section-title">
                Everything to run <span className="highlight">your counter</span>
              </h2>
            </div>
            <div className="erp-feature-grid">
              {erpHighlights.map((item) => (
                <div className="service-card" key={item.title}>
                  <div className="service-icon">
                    <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="erp-section erp-alt" id="advanced">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Advanced features</span>
              <h2 className="section-title">
                Power that <span className="highlight">grows with you</span>
              </h2>
              <p className="erp-sub">Multi-branch control, accounting, sync and approvals, built into the same app.</p>
            </div>
            <div className="erp-feature-grid">
              {advancedFeatures.map((item) => (
                <div className="service-card" key={item.title}>
                  <div className="service-icon">
                    <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="erp-section" id="industries">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Industry modules</span>
              <h2 className="section-title">
                Made for <span className="highlight">your kind of business</span>
              </h2>
              <p className="erp-sub">Pick your business type and get the screens and product fields it needs.</p>
            </div>
            <div className="erp-feature-grid">
              {industryModules.map((item) => (
                <div className="service-card" key={item.title}>
                  <div className="service-icon">
                    <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="erp-section erp-alt" id="mobile">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Mobile app</span>
              <h2 className="section-title">
                Your business, <span className="highlight">in your pocket</span>
              </h2>
              <p className="erp-sub">Available on Android. Bill, track invoices and check reports from anywhere.</p>
            </div>
            <div className="erp-phone-strip">
              {mobileShots.map((shot) => (
                <Image key={shot.src} className="erp-strip-phone" src={shot.src} alt={shot.alt} width={270} height={584} loading="lazy" />
              ))}
            </div>
            <div className="erp-center">
              <PlayStoreButton />
            </div>
          </div>
        </section>

        <section className="erp-section" id="desktop">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Desktop app</span>
              <h2 className="section-title">
                Built for the <span className="highlight">billing counter</span>
              </h2>
              <p className="erp-sub">
                A Windows app that keeps working with no internet, with barcode scanning, printing and full reports.
              </p>
            </div>
            <div className="erp-desktop-grid">
              {desktopShots.map((shot, index) => (
                <figure className={`erp-desktop-card ${index === 0 ? 'wide' : ''}`} key={shot.src}>
                  <div className="frame-bar" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <Image src={shot.src} alt={`CodeLaksh ERP desktop: ${shot.title}`} width={1200} height={617} loading="lazy" />
                  <figcaption>
                    <strong>{shot.title}</strong>
                    <span>{shot.text}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="erp-section erp-alt" id="pricing">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Pricing</span>
              <h2 className="section-title">
                Simple plans, <span className="highlight">honest prices</span>
              </h2>
              <p className="erp-sub">All prices exclude 18% GST. Try Growth free for 7 days. The trial needs no card and never auto-charges.</p>
            </div>
            <ErpPricing />

            <h3 className="erp-addons-title">Add-ons</h3>
            <div className="erp-addons">
              {addOns.map((addOn) => (
                <div className="erp-addon" key={addOn.name}>
                  <div>
                    <strong>{addOn.name}</strong>
                    <span>{addOn.on}</span>
                  </div>
                  <em>{addOn.price}</em>
                </div>
              ))}
            </div>
            <p className="erp-fine">
              Starter is an annual desktop licence that includes activation, software updates and email support. Staff users shown are in addition to the account administrator, who is always included at no charge. Growth, Business and Pro are subscriptions billed monthly or yearly; yearly prepay is about 17% cheaper. Pricing is indicative and confirmed after we understand your branches, users and modules.
            </p>
          </div>
        </section>

        <section className="erp-section erp-alt" id="faq">
          <div className="container erp-faq">
            <div className="section-header">
              <span className="section-subtitle">FAQ</span>
              <h2 className="section-title">
                Common <span className="highlight">questions</span>
              </h2>
            </div>
            {erpFaqs.map((item) => (
              <details className="erp-faq-item" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="erp-section">
          <div className="container erp-final">
            <h2 className="section-title">
              Ready to <span className="highlight">get started?</span>
            </h2>
            <p className="erp-sub">Install the app, or talk to us for a demo, migration from Tally/Vyapar, or a custom quote.</p>
            <div className="erp-cta erp-center">
              <PlayStoreButton />
              <a href="/contact" className="btn btn-outline">
                Contact us
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
