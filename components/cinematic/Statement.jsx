'use client';

import { useRef } from 'react';
import { useScrollProgress } from '@/components/cinematic/hooks';
import { statementLines } from '@/lib/home';

// Section 02. A pinned editorial statement: each line lights up as you scroll. Without JavaScript or with reduced
// motion the CSS default (--p: 1) shows every line fully.
export default function Statement() {
  const ref = useRef(null);
  useScrollProgress(ref, { mode: 'pin' });
  return (
    <section className="cx-statement" id="statement" ref={ref} aria-labelledby="statement-title">
      <div className="cx-pin">
        <div className="cx-wrap">
          <p className="cx-eyebrow">What we do</p>
          <h2 id="statement-title" className="cx-statement-text">
            {statementLines.map((line, i) => (
              <span key={line} className="cx-sline" style={{ '--s': (i * 0.1 + 0.02).toFixed(2) }}>
                {line}
              </span>
            ))}
          </h2>
          <p className="cx-statement-sub">
            From intelligent applications to enterprise platforms, CodeLaksh helps businesses turn ideas into production-ready
            technology, then stays on to run it.
          </p>
        </div>
      </div>
    </section>
  );
}
