import { SITE } from '@/lib/seo';
import { services } from '@/lib/services';

// Footer with the brand wordmark as the visual. All links are real, crawlable URLs. No social links are shown
// because CodeLaksh has not confirmed official profiles to link to.
export default function CinematicFooter() {
  return (
    <footer className="cx-footer">
      <div className="cx-footer-glow" aria-hidden="true"></div>
      <div className="cx-wrap">
        <p className="cx-eyebrow">Code Your Vision With Innovation</p>
        <div className="cx-footer-cols">
          <nav aria-label="Services">
            <h2>Services</h2>
            {services.map((s) => (
              <a key={s.slug} href={`/services/${s.slug}`}>
                {s.name}
              </a>
            ))}
          </nav>
          <nav aria-label="Company">
            <h2>Company</h2>
            <a href="/about">About CodeLaksh</a>
            <a href="/portfolio">Work</a>
            <a href="/technology">Technology</a>
            <a href="/erp">CodeLaksh ERP</a>
            <a href="/portfolio/kidodom">Kidodom app</a>
            <a href="/locations/aurangabad">Chhatrapati Sambhajinagar</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
          </nav>
          <address>
            <h2>Studio</h2>
            <p>
              Sangram Nagar, {SITE.city} ({SITE.cityAlt})
              <br />
              {SITE.region}, India
            </p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
            <p className="cx-faint">Mon to Sat, 10:00 to 19:00 IST</p>
          </address>
        </div>
        <p className="cx-wordmark" aria-hidden="true">
          CODELAKSH
        </p>
        <p className="cx-legal">
          CodeLaksh is a software development company in {SITE.city}, {SITE.region}, India.
          <span>&copy; {new Date().getFullYear()} CodeLaksh. All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
}
