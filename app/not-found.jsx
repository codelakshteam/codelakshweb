import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: { absolute: 'Page not found | CodeLaksh' },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="pg-hero">
          <div className="container pg-notfound">
            <h1 className="pg-title">Page not found</h1>
            <p className="pg-lead">The page you are looking for does not exist or has moved.</p>
            <div className="erp-cta pg-hero-cta">
              <a href="/" className="btn btn-primary">
                Go to the homepage
              </a>
              <a href="/services" className="btn btn-outline">
                Software development services
              </a>
              <a href="/contact" className="btn btn-outline">
                Contact us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
