'use client';

import { useRef, useState } from 'react';
import ServiceBackdrop from '@/components/cinematic/ServiceBackdrop';
import { useCapability, useScrollProgress } from '@/components/cinematic/hooks';
import { serviceStages } from '@/lib/home';

// Section 04. A pinned vertical sequence: scrolling swaps one huge service for the next while the generative
// backdrop changes. All six stages stay in the DOM as a real ordered list with real links.
export default function ServiceExperience() {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const cap = useCapability();
  const n = serviceStages.length;
  useScrollProgress(ref, {
    mode: 'pin',
    onChange: (p) => setIdx(Math.min(n - 1, Math.floor(p * n * 0.999))),
  });
  const stage = serviceStages[idx];
  const pinned = cap.ready && !cap.reduced;

  return (
    <section className="cx-services" aria-labelledby="services-title">
      <div className="cx-tall" ref={ref} style={{ '--n': n }}>
      <div className="cx-pin">
        <ServiceBackdrop theme={stage.theme} reduced={cap.reduced} />
        <div className="cx-wrap cx-svc-wrap">
          <p className="cx-eyebrow">What we engineer</p>
          <h2 id="services-title" className="cx-sr-h2">
            Six engineering disciplines, one team
          </h2>
          <ol className="cx-svc-list">
            {serviceStages.map((s, i) => (
              <li key={s.n} className={i === idx ? 'is-active' : i < idx ? 'is-past' : ''} inert={pinned && i !== idx ? '' : undefined}>
                <span className="cx-svc-n">{s.n}</span>
                <h3 className="cx-svc-title">{s.title}</h3>
                <p>{s.text}</p>
                <a href={s.href} className="cx-link" data-cursor="EXPLORE">
                  {s.anchor} <span aria-hidden="true">&rarr;</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="cx-rail" aria-hidden="true">
            {serviceStages.map((s, i) => (
              <span key={s.n} className={i === idx ? 'is-active' : ''}>
                {s.n}
              </span>
            ))}
          </div>
        </div>
      </div>
      </div>
      <p className="cx-svc-more cx-wrap">
        Also: <a href="/services/custom-software-development">custom software development</a>,{' '}
        <a href="/services/machine-learning">machine learning</a> and <a href="/services/ecommerce-development">e-commerce development</a>.{' '}
        <a href="/services">See every service</a>.
      </p>
    </section>
  );
}
