import Image from 'next/image';
import { services } from '@/lib/services';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="logo">
              <Image className="logo-img-dark" src="/logo-white-header.png" alt="CodeLaksh logo" width={36} height={29} />
              <Image className="logo-img-light" src="/logo-header.png" alt="" width={36} height={31} />
              <span>CodeLaksh</span>
            </a>
            <p>
              CodeLaksh is a software development company in Aurangabad (Chhatrapati Sambhajinagar), Maharashtra,
              building custom software, web and mobile apps, AI, ERP and cloud solutions for businesses in India.
            </p>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            {services.map((service) => (
              <a key={service.slug} href={`/services/${service.slug}`}>
                {service.name}
              </a>
            ))}
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <a href="/about">About CodeLaksh</a>
            <a href="/portfolio">Portfolio</a>
            <a href="/erp">CodeLaksh ERP</a>
            <a href="/portfolio/kidodom">Kidodom app</a>
            <a href="/locations/aurangabad">Aurangabad</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
          <div className="footer-links">
            <h4>Contact</h4>
            <p>
              <i className="fas fa-map-marker-alt" aria-hidden="true"></i> Sangram Nagar, Aurangabad (Chhatrapati
              Sambhajinagar), Maharashtra, India
            </p>
            <p>
              <i className="fas fa-phone" aria-hidden="true"></i> <a href="tel:+919834684866">+91-9834684866</a>
            </p>
            <p>
              <i className="fas fa-envelope" aria-hidden="true"></i> <a href="mailto:codelaksh@gmail.com">codelaksh@gmail.com</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CodeLaksh. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
