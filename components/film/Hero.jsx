'use client';

import { useEffect, useRef } from 'react';
import { useScrollProgress, useOnScreen } from '@/components/film/hooks';
import { film, setAct } from '@/lib/film';

// Opening shot. The object itself is drawn by the fixed stage behind this section; this is the title card that the
// camera pushes through. All text is real HTML, with the keyword line inside the H1.
export default function Hero() {
  const ref = useRef(null);
  const on = useOnScreen(ref, '0px');
  useScrollProgress(ref, { mode: 'pin', onChange: (p) => (film.p.hero = p) });
  useEffect(() => {
    setAct('hero', on);
    return () => setAct('hero', false);
  }, [on]);
  return (
    <section className="fm-hero" ref={ref} data-tone="dark" aria-labelledby="hero-title">
      <div className="fm-pin">
        <div className="fm-hero-top">
          <p className="fm-label">CodeLaksh<span> / </span>Digital Engineering Studio</p>
          <p className="fm-meta fm-hide-s">19.8762&deg; N &nbsp; 75.3433&deg; E</p>
        </div>
        <div className="fm-hero-copy">
          <h1 id="hero-title">
            <span className="fm-kicker">Custom Software Development Company in India</span>
            <span className="fm-hero-mega">
              <span className="fm-hl"><span>We engineer</span></span>
              <span className="fm-hl"><span>what&rsquo;s next.</span></span>
            </span>
          </h1>
          <p className="fm-hero-sub"><strong>Code Your Vision With Innovation.</strong> <span className="fm-sub-more">Software, AI, mobile, ERP and cloud, engineered in Chhatrapati Sambhajinagar and Pune (Hadapsar) for businesses across India.</span></p>
          <div className="fm-actions">
            <a href="/contact" className="fm-btn fm-btn-solid">Start a project <i aria-hidden="true">&rarr;</i></a>
            <a href="/portfolio" className="fm-btn">Explore our work <i aria-hidden="true">&rarr;</i></a>
          </div>
        </div>
        <div className="fm-hero-foot">
          <p className="fm-meta"><b className="fm-dot"></b> System 01 &nbsp;/&nbsp; Online</p>
          <p className="fm-meta fm-hide-s">AI &nbsp;/&nbsp; Software &nbsp;/&nbsp; Cloud &nbsp;/&nbsp; Data</p>
          <p className="fm-meta fm-scrollcue">Scroll <i aria-hidden="true"></i></p>
        </div>
      </div>
    </section>
  );
}
