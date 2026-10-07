import { projects } from '@/lib/projects';

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Our Work</span>
          <h2 className="section-title">
            Software We Have
            <br />
            <span className="highlight">Built and Run</span>
          </h2>
          <p className="erp-sub">Products designed, built and supported by CodeLaksh. Open a case study for features and technology.</p>
        </div>
        <div className="portfolio-grid is-two">
          {projects.map((project) => (
            <a className={`portfolio-item accent-${project.accent}`} href={`/portfolio/${project.slug}`} key={project.slug}>
              <div className="portfolio-image">
                <span className="portfolio-icon">
                  <i className={`fas ${project.icon}`} aria-hidden="true"></i>
                </span>
              </div>
              <div className="portfolio-info">
                <span className="portfolio-tag">{project.category}</span>
                <h3>{project.name}</h3>
                <p>{project.cardText}</p>
              </div>
              <span className="portfolio-arrow" aria-hidden="true">
                <i className="fas fa-arrow-right"></i>
              </span>
            </a>
          ))}
        </div>
        <p className="pg-note">
          <a href="/portfolio">View the full portfolio</a>
        </p>
      </div>
    </section>
  );
}
