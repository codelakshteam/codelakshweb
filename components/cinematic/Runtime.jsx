'use client';

import { useEffect, useRef } from 'react';

// Site-wide behaviour that sits on top of the plain HTML: scroll reveal, the page-transition curtain, the custom
// cursor, magnetic buttons and the cursor-following light. None of it hides content from crawlers or no-JS users
// (the `js` class that enables the hidden-until-revealed states is only added by a script in <head>).
export default function Runtime() {
  const curtain = useRef(null);
  const cursor = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const cleanups = [];

    // ---- scroll reveal ----
    const items = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window && !reduced) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      );
      items.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    } else {
      items.forEach((el) => el.classList.add('in'));
    }
    const failSafe = window.setTimeout(() => root.classList.add('rv-all'), 9000);
    cleanups.push(() => window.clearTimeout(failSafe));

    // ---- page transitions: wipe the curtain down, then navigate ----
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      if (reduced || !curtain.current) return;
      e.preventDefault();
      curtain.current.classList.add('leaving');
      window.setTimeout(() => {
        window.location.href = url.href;
      }, 380);
    };
    const onShow = (e) => {
      if (e.persisted && curtain.current) curtain.current.classList.remove('leaving');
    };
    document.addEventListener('click', onClick);
    window.addEventListener('pageshow', onShow);
    cleanups.push(() => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('pageshow', onShow);
    });

    // ---- pointer effects (mouse only) ----
    if (fine && !reduced) {
      let tx = -100;
      let ty = -100;
      let x = -100;
      let y = -100;
      let raf = 0;
      let lastTarget = null;
      const tick = () => {
        x += (tx - x) * 0.2;
        y += (ty - y) * 0.2;
        if (cursor.current) cursor.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0;
      };
      const onMove = (e) => {
        tx = e.clientX;
        ty = e.clientY;
        root.classList.add('has-cursor');
        root.style.setProperty('--mx', `${e.clientX}px`);
        root.style.setProperty('--my', `${e.clientY}px`);
        if (!raf) raf = requestAnimationFrame(tick);
        const t = e.target;
        if (t === lastTarget || !cursor.current) return;
        lastTarget = t;
        const tagged = t.closest('[data-cursor]');
        const input = t.closest('input, textarea, select');
        const link = t.closest('a, button, summary, [role="button"], [role="tab"]');
        const state = input ? 'text' : tagged ? 'tag' : link ? 'link' : 'default';
        cursor.current.dataset.state = state;
        if (label.current) label.current.textContent = tagged ? tagged.getAttribute('data-cursor') : '';
        const mag = t.closest('.cx-magnetic');
        document.querySelectorAll('.cx-magnetic.is-pulled').forEach((m) => {
          if (m !== mag) {
            m.style.transform = '';
            m.classList.remove('is-pulled');
          }
        });
      };
      const onMagnet = (e) => {
        const mag = e.target.closest && e.target.closest('.cx-magnetic');
        if (!mag) return;
        const r = mag.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        mag.style.transform = `translate3d(${dx * 14}px, ${dy * 10}px, 0)`;
        mag.classList.add('is-pulled');
      };
      const onLeave = () => {
        root.classList.remove('has-cursor');
        if (cursor.current) cursor.current.dataset.state = 'hidden';
        lastTarget = null;
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mousemove', onMagnet, { passive: true });
      document.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mousemove', onMagnet);
        document.removeEventListener('mouseleave', onLeave);
        if (raf) cancelAnimationFrame(raf);
        root.classList.remove('has-cursor');
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div className="cx-curtain" ref={curtain} aria-hidden="true">
        <span className="cx-curtain-mark">CODELAKSH</span>
      </div>
      <div className="cx-cursor" ref={cursor} data-state="hidden" aria-hidden="true">
        <span className="cx-cursor-dot"></span>
        <span className="cx-cursor-ring">
          <span className="cx-cursor-label" ref={label}></span>
        </span>
      </div>
    </>
  );
}
