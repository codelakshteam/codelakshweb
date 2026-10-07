import SceneLoader from '@/components/cinematic/SceneLoader';
import { heroLines } from '@/lib/home';

// Section 01. All text is real HTML (the H1 carries the keyword line plus the headline); the 3D/2D scene is a purely
// decorative layer behind it and is never needed to understand the page.
export default function CinematicHero() {
  return (
    <section className="cx-hero" aria-labelledby="hero-title">
      <div className="cx-hero-bg" aria-hidden="true">
        <SceneLoader />
        <div className="cx-hero-light"></div>
        <div className="cx-hero-vignette"></div>
        <div className="cx-grid"></div>
      </div>
      <div className="cx-wrap cx-hero-body">
        <p className="cx-eyebrow cx-fade" style={{ '--d': '0.1s' }}>
          CodeLaksh / Digital Engineering Studio
        </p>
        <h1 id="hero-title" className="cx-h1">
          <span className="cx-kicker cx-fade" style={{ '--d': '0.25s' }}>
            Custom Software Development Company in India
          </span>
          <span className="cx-mega">
            {heroLines.map((line, i) => (
              <span className="cx-hline" key={line}>
                <span style={{ '--d': `${0.35 + i * 0.14}s` }}>{line}</span>
              </span>
            ))}
          </span>
        </h1>
        <p className="cx-tagline cx-fade" style={{ '--d': '0.95s' }}>
          Code Your Vision With Innovation
        </p>
        <p className="cx-lede cx-fade" style={{ '--d': '1.05s' }}>
          Software, AI systems, mobile apps, ERP and cloud platforms, designed and built in Chhatrapati Sambhajinagar (Aurangabad) for businesses across India.
        </p>
        <div className="cx-actions cx-fade" style={{ '--d': '1.15s' }}>
          <a href="/contact" className="cx-pill cx-pill-solid cx-magnetic">
            Start a Project <span aria-hidden="true">&rarr;</span>
          </a>
          <a href="/portfolio" className="cx-pill cx-magnetic">
            Explore Our Work
          </a>
        </div>
      </div>
      <a className="cx-scroll" href="#statement" aria-label="Scroll to the next section">
        <span></span>
        Scroll
      </a>
    </section>
  );
}
