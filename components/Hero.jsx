import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span> AI Solutions & Software Development
          </div>
          <h1 className="hero-title">
            <span>Code Your Vision</span>
            <span className="highlight">With Innovation</span>
          </h1>
          <p className="hero-subtitle">
            We deliver customized software solutions with expert team of developers, designers &
            project managers. Transform your business with cutting-edge AI technology.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              Get Started <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
            <a href="/erp" className="btn btn-outline">
              Explore CodeLaksh ERP
            </a>
            <a href="#portfolio" className="btn btn-ghost">
              View Work
            </a>
          </div>
        </div>

        <div className="hero-stage">
          <div className="frame">
            <div className="frame-bar" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <Image
              src="/erp-assets/desktop/dashboard.webp"
              alt="CodeLaksh ERP desktop dashboard with revenue, dues and quick actions"
              width={1200}
              height={617}
              priority
            />
          </div>
          <div className="stage-phone">
            <Image
              src="/erp-assets/mobile/billing.webp"
              alt="CodeLaksh ERP mobile app home screen"
              width={540}
              height={1169}
              priority
            />
          </div>
          <div className="stage-chip chip-1">
            <i className="fas fa-file-invoice" aria-hidden="true"></i> GST-ready invoices
          </div>
          <div className="stage-chip chip-2">
            <i className="fas fa-wifi" aria-hidden="true"></i> Works offline
          </div>
        </div>
      </div>
    </section>
  );
}
