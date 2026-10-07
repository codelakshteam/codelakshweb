'use client';

import { useRef } from 'react';
import { useScrollProgress } from '@/components/film/hooks';

// An engineering drawing of the machined object from the opening shot, drawn on as you scroll. Decorative.
export default function Blueprint() {
  const ref = useRef(null);
  useScrollProgress(ref, { mode: 'pass' });
  const arc = (r, a0, a1) => {
    const p = (a) => [Math.cos(a) * r, Math.sin(a) * r];
    const [x0, y0] = p(a0);
    const [x1, y1] = p(a1);
    return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 1 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  };
  const a0 = 0.42;
  const a1 = Math.PI * 2 - 0.42;
  return (
    <svg className="fm-blueprint" ref={ref} viewBox="-420 -340 840 680" aria-hidden="true" focusable="false">
      <g className="g">
        <path d="M-400 0H400M0 -330V330" className="ax" />
        <path d={arc(320, a0, a1)} className="dr" pathLength="1" />
        <path d={arc(250, a0, a1)} className="dr" pathLength="1" />
        <circle r="210" className="dr" pathLength="1" />
        <circle r="182" className="dr dash" pathLength="1" />
        <circle r="370" className="ax" />
        <g transform="rotate(-37.8)"><rect x="-190" y="-25" width="540" height="50" className="dr" pathLength="1" /><path d="M-170 0H330" className="ax" /></g>
        <path d="M-320 -300V-262M320 -300V-262M-320 -281H320" className="dim" />
        <text x="0" y="-290" textAnchor="middle">&#216; 640</text>
        <path d="M-250 296V330M250 296V330M-250 312H250" className="dim" />
        <text x="0" y="326" textAnchor="middle">&#216; 500</text>
        <path d="M0 0L222 -222" className="dim" />
        <text x="130" y="-150">R 320</text>
        <path d="M-10 0H10M0 -10V10" className="ax" />
      </g>
    </svg>
  );
}
