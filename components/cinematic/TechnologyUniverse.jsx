'use client';

import { useState } from 'react';
import { universe } from '@/lib/home';

// Section 03. An interactive map of the capabilities. Hover, focus or tap a node and it expands, its links light up
// and its description opens. Every description is real text in the list beside the map, so nothing depends on hover.
export default function TechnologyUniverse() {
  const [active, setActive] = useState('ai');
  const byId = Object.fromEntries(universe.map((n) => [n.id, n]));
  const current = byId[active];
  const edges = [];
  universe.forEach((n) => n.links.forEach((l) => n.id < l && edges.push([n.id, l])));

  return (
    <section className="cx-section cx-universe" aria-labelledby="universe-title">
      <div className="cx-wrap">
        <p className="cx-eyebrow rv">The CodeLaksh technology universe</p>
        <h2 id="universe-title" className="cx-h2 rv">
          ONE TEAM.
          <br />
          <span className="cx-grad">MULTIPLE WORLDS.</span>
        </h2>
        <div className="cx-uni-grid">
          <div className="cx-map rv" role="group" aria-label="Capability map">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              {edges.map(([a, b]) => {
                const lit = a === active || b === active;
                return <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} className={lit ? 'is-lit' : ''} vectorEffect="non-scaling-stroke" />;
              })}
            </svg>
            {universe.map((n) => {
              const near = current.links.includes(n.id);
              return (
                <button
                  key={n.id}
                  type="button"
                  className={`cx-node ${n.id === active ? 'is-active' : ''} ${near ? 'is-near' : ''}`}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  aria-pressed={n.id === active}
                  onMouseEnter={() => setActive(n.id)}
                  onFocus={() => setActive(n.id)}
                  onClick={() => setActive(n.id)}
                >
                  <i aria-hidden="true"></i>
                  <span>{n.label}</span>
                </button>
              );
            })}
          </div>
          <ul className="cx-uni-list">
            {universe.map((n) => (
              <li key={n.id} className={n.id === active ? 'is-active' : ''} onMouseEnter={() => setActive(n.id)}>
                <h3>
                  <button type="button" onClick={() => setActive(n.id)} aria-expanded={n.id === active}>
                    {n.label}
                  </button>
                </h3>
                <div className="cx-uni-body">
                  <p>{n.text}</p>
                  <a href={n.href}>
                    Learn more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
