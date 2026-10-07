import { services } from '@/lib/services';

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Our Services</span>
          <h2 className="section-title">
            Software Development
            <br />
            <span className="highlight">Services for Your Business</span>
          </h2>
          <p className="erp-sub">
            From custom software and ERP to mobile apps, AI and cloud, everything is built, deployed and supported by one
            team.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.slug}>
              <div className="service-icon">
                <i className={`fas ${service.icon}`} aria-hidden="true"></i>
              </div>
              <h3>{service.name}</h3>
              <p>{service.cardText}</p>
              <a href={`/services/${service.slug}`} className="service-link">
                {service.anchor} <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          ))}
        </div>
        <p className="pg-note">
          <a href="/services">Browse all software development services</a>
        </p>
      </div>
    </section>
  );
}
