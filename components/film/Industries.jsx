'use client';

import { useRef, useState } from 'react';
import { useScrollProgress } from '@/components/film/hooks';
import { industries } from '@/lib/home';

const SLOTS = {
  radial: (k) => [50 + Math.cos(((k * 60 - 90) * Math.PI) / 180) * 37, 50 + Math.sin(((k * 60 - 90) * Math.PI) / 180) * 38],
  flow: (k) => [10 + k * 16, 50 + (k % 2 ? 22 : -22)],
  grid: (k) => [20 + (k % 3) * 30, 25 + Math.floor(k / 3) * 50],
};

// Built around real business: choose an industry (or scroll through them) and the diagram rearranges into the modules
// that business actually runs on. The list and every module name are real text.
export default function Industries() {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  useScrollProgress(ref, { mode: 'pin', onChange: (p) => setIdx(Math.max(0, Math.min(industries.length - 1, Math.floor(p * industries.length * 0.999)))) });
  const cur = industries[idx];
  const slot = SLOTS[cur.arr];

  const go = (i) => {
    setIdx(i);
    const el = ref.current;
    if (!el) return;
    const y = el.offsetTop + ((i + 0.5) / industries.length) * (el.offsetHeight - window.innerHeight);
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section className="fm-ind" ref={ref} data-tone="light" aria-label="Industries">
      <div className="fm-pin">
        <div className="fm-wrap fm-ind-grid">
          <div className="fm-ind-left">
            <p className="fm-meta">Industry {String(idx + 1).padStart(2, '0')} / {String(industries.length).padStart(2, '0')}</p>
            <ol className="fm-ind-list">
              {industries.map((it, i) => (
                <li key={it.id} className={i === idx ? 'is-active' : Math.abs(i - idx) === 1 ? 'is-near' : ''}>
                  <button type="button" onClick={() => go(i)} onFocus={() => setIdx(i)} aria-current={i === idx ? 'true' : undefined}>{it.name}</button>
                </li>
              ))}
            </ol>
          </div>
          <div className="fm-ind-right">
            <p className="fm-ind-text" key={cur.id}>{cur.text}</p>
            <div className="fm-diagram" role="img" aria-label={`${cur.name} runs on: ${cur.modules.join(', ')}`}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false" key={cur.id}>
                {cur.modules.map((m, k) => {
                  const [x, y] = slot(k);
                  const from = cur.arr === 'flow' && k > 0 ? slot(k - 1) : [50, 50];
                  return <line key={m} x1={from[0]} y1={from[1]} x2={x} y2={y} vectorEffect="non-scaling-stroke" style={{ '--i': k }} />;
                })}
              </svg>
              <div className="fm-hub"><small>Runs on</small><b>{cur.name}</b></div>
              {cur.modules.map((m, k) => {
                const [x, y] = slot(k);
                return (
                  <span key={k} className="fm-mod" style={{ left: `${x}%`, top: `${y}%` }}>
                    <i></i><em key={m}>{m}</em>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
