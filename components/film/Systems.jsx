'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollProgress, useOnScreen } from '@/components/film/hooks';
import { film, setAct } from '@/lib/film';
import { systems } from '@/lib/home';

// What we engineer: a pinned act where the scene itself changes. Scrolling (or choosing a system on the rail) moves the
// camera and morphs the structure behind the text into the next system. Every system is real text in a real list.
export default function Systems() {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const on = useOnScreen(ref, '0px');
  useScrollProgress(ref, {
    mode: 'pin',
    onChange: (p) => {
      film.p.sys = p;
      setIdx(Math.max(0, Math.min(systems.length - 1, Math.floor(p * 5 + 0.41))));
    },
  });
  useEffect(() => {
    setAct('systems', on);
    return () => setAct('systems', false);
  }, [on]);

  const go = (i) => {
    const el = ref.current;
    if (!el) return;
    const y = el.offsetTop + (i / 5) * (el.offsetHeight - window.innerHeight) + 2;
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.6 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section className="fm-systems" ref={ref} data-tone="dark" aria-label="Engineering systems">
      <div className="fm-pin">
        <div className="fm-wrap fm-sys-grid">
          <div className="fm-sys-head">
            <p className="fm-label">Engineering systems</p>
            <p className="fm-meta">System {systems[idx].n} / 06 &nbsp;&middot;&nbsp; <b className="fm-dot"></b> {systems[idx].status}</p>
          </div>
          <ol className="fm-sys-list">
            {systems.map((s, i) => (
              <li key={s.id} className={i === idx ? 'is-active' : i < idx ? 'is-past' : ''} inert={i === idx ? undefined : ''}>
                <h3 className="fm-sys-title"><span>{s.title}</span></h3>
                <p className="fm-sys-full">{s.full}</p>
                <p className="fm-sys-text">{s.text}</p>
                <ul className="fm-keys">{s.keys.map((k) => <li key={k}>{k}</li>)}</ul>
                <a href={s.href} className="fm-link" data-cursor="EXPLORE &rarr;">{s.anchor} <i aria-hidden="true">&rarr;</i></a>
              </li>
            ))}
          </ol>
          <nav className="fm-rail" aria-label="Choose a system">
            {systems.map((s, i) => (
              <button key={s.id} type="button" className={i === idx ? 'is-active' : ''} aria-current={i === idx ? 'true' : undefined} onClick={() => go(i)}>
                <small>{s.n}</small>{s.title}
              </button>
            ))}
          </nav>
        </div>
        <p className="fm-also fm-wrap">
          Also engineered: <a className="fm-link" href="/services/web-development">Web</a>, <a className="fm-link" href="/services/ecommerce-development">E-commerce</a>, <a className="fm-link" href="/services/digital-marketing">Digital growth</a>. <a className="fm-link" href="/services">All services <i aria-hidden="true">&rarr;</i></a>
        </p>
      </div>
    </section>
  );
}
