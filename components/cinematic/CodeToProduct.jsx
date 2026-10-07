'use client';

import { useRef } from 'react';
import { useScrollProgress } from '@/components/cinematic/hooks';
import { codeSample, flow } from '@/lib/home';

const chips = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Electron', 'AWS', 'Azure', 'Google Cloud'];

// Section 05. IDEA -> CODE -> SYSTEM -> PRODUCT. The code panel is decorative (aria-hidden, one illustrative snippet,
// not a working terminal); the stages and technology names are real text.
export default function CodeToProduct() {
  const ref = useRef(null);
  useScrollProgress(ref, { mode: 'pass' });
  return (
    <section className="cx-section cx-code" ref={ref} aria-labelledby="code-title">
      <div className="cx-wrap">
        <p className="cx-eyebrow rv">From first line to live product</p>
        <h2 id="code-title" className="cx-h2 rv">
          CODE, MADE
          <br />
          <span className="cx-grad">INTO SYSTEMS.</span>
        </h2>
        <div className="cx-code-grid">
          <div className="cx-codebox rv" aria-hidden="true">
            <div className="cx-codebar">
              <i></i>
              <i></i>
              <i></i>
              <span>invoice.js</span>
            </div>
            <pre>
              <code>
                {codeSample.map(([cls, text], i) => (
                  <span key={`${i}-${text}`} className={`tk-${cls}`} style={{ '--s': (i / codeSample.length) * 0.55 + 0.1 }}>
                    {text}
                    {text.endsWith('{') || text.endsWith(';') || text === '}' ? '\n' : ''}
                  </span>
                ))}
              </code>
            </pre>
          </div>
          <ol className="cx-flow">
            {flow.map((f, i) => (
              <li key={f.k} className="rv" style={{ '--i': i }}>
                <span className="cx-flow-k">{f.k}</span>
                <span className="cx-flow-t">{f.t}</span>
              </li>
            ))}
          </ol>
        </div>
        <svg className="cx-pipe" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path id="cx-pipe-path" d="M0 30 H1000" vectorEffect="non-scaling-stroke" />
          {[0, 1, 2, 3, 4].map((k) => (
            <circle key={k} r="3.2">
              <animateMotion dur="6s" begin={`${k * 1.2}s`} repeatCount="indefinite" path="M0 30 H1000" />
            </circle>
          ))}
          {[0, 333, 666, 1000].map((x) => (
            <rect key={x} x={Math.min(x, 988)} y="22" width="12" height="16" rx="2" />
          ))}
        </svg>
        <ul className="cx-chips rv" aria-label="Technologies we build with">
          {chips.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
