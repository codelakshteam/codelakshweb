'use client';

import { useState } from 'react';
import { stack } from '@/lib/home';

// Section 08. Technology groups orbit "CodeLaksh Engineering" using pure CSS animation (no per-frame JavaScript).
// Hover or focus pauses the orbit and highlights a group; the full list is plain text in the markup.
export default function TechConstellation({ heading = true }) {
  const [active, setActive] = useState(null);
  return (
    <section className="cx-section cx-stack" aria-labelledby="stack-title">
      <div className="cx-wrap">
        {heading && (
          <>
            <p className="cx-eyebrow rv">Technology</p>
            <h2 id="stack-title" className="cx-h2 rv">
              THE STACK
              <br />
              <span className="cx-grad">BEHIND THE WORK.</span>
            </h2>
          </>
        )}
        <div className={`cx-orbit-wrap ${active ? 'is-paused' : ''}`}>
          <div className="cx-core" aria-hidden="true">
            <span>CODELAKSH</span>
            <small>ENGINEERING</small>
          </div>
          <ul className="cx-orbit">
            {stack.map((g, i) => (
              <li key={g.group} className={`cx-orb ${active === g.group ? 'is-on' : active ? 'is-dim' : ''}`} style={{ '--th': `${(360 / stack.length) * i}deg`, '--r': i % 2 ? 'var(--R2)' : 'var(--R1)' }}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(g.group)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(g.group)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(active === g.group ? null : g.group)}
                  aria-pressed={active === g.group}
                >
                  <b>{g.group}</b>
                  <span>{g.items.join(' / ')}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <dl className="cx-stack-list">
          {stack.map((g) => (
            <div key={g.group} className={active === g.group ? 'is-on' : ''}>
              <dt>{g.group}</dt>
              <dd>
                {g.items.join(', ')}. {g.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
