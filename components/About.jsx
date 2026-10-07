export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">About Us</span>
          <h2 className="section-title">
            A Software Development Company
            <br />
            <span className="highlight">in Aurangabad, India</span>
          </h2>
        </div>
        <div className="about-grid">
          <div className="about-content">
            <p>
              CodeLaksh is a software development company based in Aurangabad (Chhatrapati Sambhajinagar), Maharashtra.
              Since 2020 our team of developers, designers and project managers has built custom software, websites, mobile
              apps, ERP and AI solutions for businesses across India.
            </p>
            <p>
              We also build our own products: CodeLaksh ERP for billing, inventory and accounting, and Kidodom, an app for
              parents. Running real products means we understand what software needs after launch: updates, support and
              clear pricing.
            </p>
            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-check" aria-hidden="true"></i>
                </div>
                <div>
                  <h3>Built around your process</h3>
                  <p>We start with your workflow and users, then agree scope, milestones and a written estimate.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-headset" aria-hidden="true"></i>
                </div>
                <div>
                  <h3>Support after launch</h3>
                  <p>Fixes, updates and new features once your software is live.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-lightbulb" aria-hidden="true"></i>
                </div>
                <div>
                  <h3>Practical use of new technology</h3>
                  <p>AI, cloud and mobile where they solve a real problem for your business.</p>
                </div>
              </div>
            </div>
            <p>
              <a className="pg-inline-link" href="/about">
                More about CodeLaksh <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </a>
            </p>
          </div>
          <div className="about-image">
            <div className="image-frame">
              <i className="fas fa-code" aria-hidden="true"></i>
            </div>
            <div className="image-badge">Since 2020</div>
          </div>
        </div>
      </div>
    </section>
  );
}
