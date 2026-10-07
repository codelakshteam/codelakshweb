'use client';

import { useRef } from 'react';
import { useScrollProgress } from '@/components/cinematic/hooks';
import { process as steps } from '@/lib/home';

// Section 09. A line is drawn down the page as you scroll, lighting each stage in turn. The stages are a real
// ordered list; the SVG path is decoration.
export default function ProcessTimeline() {
  const ref = useRef(null);
  useScrollProgress(ref, { mode: 'pass' });
  const n = steps.length;
  return (
    <section className="cx-section cx-process" ref={ref} aria-labelledby="process-title">
      <div className="cx-wrap">
        <p className="cx-eyebrow rv">How we build</p>
        <h2 id="process-title" className="cx-h2 rv">
          FROM PROBLEM
          <br />
          <span className="cx-grad">TO PRODUCTION.</span>
        </h2>
        <div className="cx-journey">
          <svg className="cx-journey-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path className="base" d="M50 0 V100" vectorEffect="non-scaling-stroke" />
            <path className="draw" d="M50 0 V100" pathLength="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <ol>
            {steps.map((s, i) => (
              <li key={s.n} style={{ '--s': ((i + 0.4) / (n + 0.4)).toFixed(3) }} className={i % 2 ? 'is-right' : ''}>
                <span className="cx-dot" aria-hidden="true"></span>
                <div className="cx-step rv">
                  <span className="cx-step-n">{s.n}</span>
                  <h3>{s.k}</h3>
                  <p className="cx-step-t">{s.t}</p>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
