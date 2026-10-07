'use client';

import { useEffect, useRef } from 'react';
import { useScrollProgress } from '@/components/film/hooks';
import { setAct } from '@/lib/film';
import { play } from '@/lib/sound';

// A tone change shot as light, not a colour switch. A bright edge travels across a pinned frame. On one side the
// scene is still the old tone; on the other it has been "exposed" into the new one, and the headline is cut along the
// same edge, so its colour flips as the light crosses it. `to` is the tone being revealed. The new-tone layer holds the
// real heading; the old-tone layer is an inert, aria-hidden twin that only exists for the visual.
export default function Sweep({ to = 'light', eyebrow, lines, children, id, meta }) {
  const ref = useRef(null);
  const fired = useRef(false);
  useScrollProgress(ref, {
    mode: 'pin',
    onChange: (p) => {
      if (p > 0.1 && p < 0.9 && !fired.current) {
        fired.current = true;
        play('sweep');
      } else if (p < 0.02 || p > 0.98) fired.current = false;
    },
  });
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const name = `sweep-${id}`;
    const io = new IntersectionObserver(([e]) => setAct(name, e.isIntersecting));
    io.observe(el);
    return () => {
      io.disconnect();
      setAct(name, false);
    };
  }, [id]);
  const old = to === 'light' ? 'dark' : 'light';
  const body = (real) => (
    <div className="fm-wrap fm-sweep-copy">
      {meta && <p className="fm-meta">{meta}</p>}
      {eyebrow && <p className="fm-label">{eyebrow}</p>}
      {real ? (
        <h2 className="fm-mega" id={`${id}-title`}>{lines.map((l) => <span key={l} className="fm-ml">{l}</span>)}</h2>
      ) : (
        <p className="fm-mega">{lines.map((l) => <span key={l} className="fm-ml">{l}</span>)}</p>
      )}
      {children}
    </div>
  );
  return (
    <section className={`fm-sweep to-${to}`} ref={ref} id={id} aria-labelledby={`${id}-title`}>
      <div className="fm-sweep-pin">
        <div className="fm-layer fm-old" data-tone={old} aria-hidden="true" inert="">{body(false)}</div>
        <div className="fm-layer fm-new" data-tone={to}>{body(true)}</div>
        <div className="fm-edge" aria-hidden="true"><b></b></div>
      </div>
    </section>
  );
}
