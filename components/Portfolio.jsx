// `accent` picks the card's colour palette (see .accent-* in globals.css).
const projects = [
  { icon: 'fa-store', title: 'E-Commerce Platform', category: 'Web Development', accent: 'amber' },
  { icon: 'fa-robot', title: 'AI Customer Support', category: 'Chatbot Development', accent: 'violet' },
  { icon: 'fa-mobile-alt', title: 'Mobile App', category: 'App Development', accent: 'blue' },
  { icon: 'fa-brain', title: 'ML Analytics Dashboard', category: 'Machine Learning', accent: 'green' },
];

export default function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Our Work</span>
          <h2 className="section-title">
            Featured
            <br />
            <span className="highlight">Projects</span>
          </h2>
        </div>
        <div className="portfolio-grid">
          {projects.map((project) => (
            <div className={`portfolio-item accent-${project.accent}`} key={project.title}>
              <div className="portfolio-image">
                <span className="portfolio-icon">
                  <i className={`fas ${project.icon}`} aria-hidden="true"></i>
                </span>
              </div>
              <div className="portfolio-info">
                <span className="portfolio-tag">{project.category}</span>
                <h4>{project.title}</h4>
              </div>
              <span className="portfolio-arrow" aria-hidden="true">
                <i className="fas fa-arrow-right"></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
