'use client';

import { useRef } from 'react';
import { useScrollProgress } from '@/components/film/hooks';
import TechIndex from '@/components/film/TechIndex';
import { process as steps } from '@/lib/home';

// Light act: the engineering method drawn as a line that lights each stage, then a technology index as a plain
// precise table (no logo grid, no orbit).
export default function Process() {
  const ref = useRef(null);
  useScrollProgress(ref, { mode: 'pass' });
  return (
    <section className="fm-process" ref={ref} data-tone="light" aria-label="Method and technology">
      <div className="fm-wrap">
        <div className="fm-journey">
          <svg className="fm-jline" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path className="b" d="M1 0V100" vectorEffect="non-scaling-stroke" />
            <path className="d" d="M1 0V100" pathLength="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <ol>
            {steps.map((s, i) => (
              <li key={s.n} style={{ '--s': ((i + 0.5) / (steps.length + 0.5)).toFixed(3) }}>
                <span className="fm-jdot" aria-hidden="true"></span>
                <p className="fm-meta">Stage {s.n}</p>
                <h3>{s.k}</h3>
                <p className="fm-jt">{s.t}</p>
                <p className="fm-jd">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>

        <TechIndex />
      </div>
    </section>
  );
}
