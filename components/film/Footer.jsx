import Image from 'next/image';
import { SITE } from '@/lib/seo';
import { services } from '@/lib/services';

// Closing frame: the wordmark as an object, real navigation, and the studio details. Plain crawlable links. No social
// links, because CodeLaksh has not confirmed official profiles.
export default function Footer() {
  return (
    <footer className="fm-footer" data-tone="light">
      <div className="fm-wrap">
        <div className="fm-footer-mark">
          <Image src="/logo-header.png" alt="CodeLaksh logo" width={64} height={56} loading="lazy" />
          <p className="fm-label" style={{ margin: 0 }}>Code Your Vision With Innovation</p>
        </div>
        <div className="fm-foot-cols">
          <nav aria-label="Services">
            <h2>Services</h2>
            {services.map((s) => <a key={s.slug} href={`/services/${s.slug}`}>{s.name}</a>)}
          </nav>
          <nav aria-label="Company">
            <h2>Company</h2>
            <a href="/about">About CodeLaksh</a>
            <a href="/portfolio">Work</a>
            <a href="/technology">Technology</a>
            <a href="/erp">CodeLaksh ERP</a>
            <a href="/portfolio/kidodom">Kidodom app</a>
            <a href="/locations/aurangabad">Studio location</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
          </nav>
          <address>
            <h2>Studio</h2>
            <p>Sangram Nagar, {SITE.city} ({SITE.cityAlt})<br />{SITE.region}, India</p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
            <p className="fm-dim">Mon to Sat, 10:00 to 19:00 IST</p>
          </address>
        </div>
        <p className="fm-wordmark" aria-hidden="true">CODELAKSH</p>
        <p className="fm-legal">
          <span>CodeLaksh is a software development company in {SITE.city}, {SITE.region}, India.</span>
          <span>&copy; {new Date().getFullYear()} CodeLaksh. All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
}
