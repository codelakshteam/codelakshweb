'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useScrollProgress } from '@/components/cinematic/hooks';
import { projectScenes } from '@/lib/home';

// Section 06. Pinned horizontal gallery driven by vertical scroll on desktop, a plain vertical stack on phones.
// Only genuine, disclosable projects appear. Each panel links to its real case-study page.
export default function ProjectShowcase() {
  const ref = useRef(null);
  useScrollProgress(ref, { mode: 'pin' });
  const n = projectScenes.length;
  return (
    <section className="cx-work" ref={ref} style={{ '--n': n, '--d': n - 1 }} aria-labelledby="work-title">
      <div className="cx-pin">
        <div className="cx-work-head cx-wrap">
          <p className="cx-eyebrow">Selected work</p>
          <h2 id="work-title" className="cx-h2">
            BUILT.
            <span className="cx-grad"> SHIPPED. LIVE.</span>
          </h2>
        </div>
        <div className="cx-track">
          {projectScenes.map((p, i) => (
            <article className="cx-panel" key={p.slug} style={{ '--k': i }}>
              <div className="cx-panel-copy">
                <p className="cx-panel-n">{p.n}</p>
                <h3>{p.title}</h3>
                <p className="cx-panel-kind">{p.kind}</p>
                <p>{p.text}</p>
                <ul className="cx-chips">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a href={`/portfolio/${p.slug}`} className="cx-pill cx-pill-solid cx-magnetic" data-cursor="VIEW">
                  Read the case study <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
              <a href={`/portfolio/${p.slug}`} className="cx-stage" data-cursor="VIEW" aria-label={`${p.title} case study`} tabIndex={-1}>
                <div className="cx-shot cx-shot-a">
                  <Image src={p.img.src} alt={p.img.alt} width={p.img.w} height={p.img.h} loading={i === 0 ? 'eager' : 'lazy'} sizes="(max-width: 800px) 90vw, 46vw" />
                </div>
                <div className="cx-shot cx-shot-b">
                  <Image src={p.img2.src} alt={p.img2.alt} width={p.img2.w} height={p.img2.h} loading="lazy" sizes="(max-width: 800px) 40vw, 18vw" />
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
