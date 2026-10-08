'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { film } from '@/lib/film';
import { initMusic, startMusic } from '@/lib/music';
import { initSound, play, unlock } from '@/lib/sound';

// Behaviour layered over the HTML: smooth scroll with velocity, the precision reticle cursor, the shutter page
// transition, the light-source mouse position and scroll-reveal for inner pages. All of it is optional: with
// reduced motion or no JavaScript the page is plain, fully visible HTML.
export default function Runtime() {
  const shutter = useRef(null);
  const cur = useRef(null);
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    film.reduced = reduced;
    const off = [];

    // ---- interface sound (see lib/sound.js): unlocked by the first gesture ----
    initSound();
    initMusic();
    // The score starts as soon as the page loads. Browsers keep audio suspended until the visitor interacts once, so it
    // becomes audible at the first click, tap or key press (and then keeps playing across the page).
    const gesture = () => {
      unlock();
      startMusic();
    };
    startMusic();
    const INTERACTIVE = 'a[href], button, summary, [role="tab"], label[for]';
    const onSoundClick = (e) => {
      const t = e.target.closest && e.target.closest(INTERACTIVE);
      if (t && !t.closest('.fm-sound')) play('click');
    };
    let lastHover = null;
    const onSoundHover = (e) => {
      const t = e.target.closest && e.target.closest(INTERACTIVE);
      if (t === lastHover) return;
      lastHover = t;
      if (t && fine) play('hover');
    };
    ['pointerdown', 'keydown', 'touchend', 'click'].forEach((ev) => window.addEventListener(ev, gesture, { passive: true }));
    document.addEventListener('click', onSoundClick);
    document.addEventListener('mouseover', onSoundHover, { passive: true });
    off.push(() => {
      ['pointerdown', 'keydown', 'touchend', 'click'].forEach((ev) => window.removeEventListener(ev, gesture));
      document.removeEventListener('click', onSoundClick);
      document.removeEventListener('mouseover', onSoundHover);
    });

    // ---- smooth scroll + velocity ----
    let lenis = null;
    let raf = 0;
    const mob = root.classList.contains('mob');
    if (!reduced && !mob) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95, smoothWheel: true });
      window.__lenis = lenis;
      const tick = (t) => {
        lenis.raf(t);
        const v = Math.max(-1, Math.min(1, lenis.velocity / 40));
        film.vel += (v - film.vel) * 0.2;
        root.style.setProperty('--vel', film.vel.toFixed(3));
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      off.push(() => {
        cancelAnimationFrame(raf);
        lenis.destroy();
        delete window.__lenis;
      });
    }

    // ---- scroll reveal for inner-page blocks ----
    const items = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window && !reduced) {
      const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      items.forEach((el) => io.observe(el));
      off.push(() => io.disconnect());
    } else items.forEach((el) => el.classList.add('in'));
    const failSafe = window.setTimeout(() => root.classList.add('rv-all'), 9000);
    off.push(() => window.clearTimeout(failSafe));

    // ---- shutter transition between pages ----
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || (url.pathname === window.location.pathname && url.search === window.location.search) || reduced || !shutter.current) return;
      e.preventDefault();
      play('whoosh');
      shutter.current.classList.add('closing');
      window.setTimeout(() => (window.location.href = url.href), 420);
    };
    const onShow = (e) => e.persisted && shutter.current && shutter.current.classList.remove('closing');
    document.addEventListener('click', onClick);
    window.addEventListener('pageshow', onShow);
    off.push(() => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('pageshow', onShow);
    });

    // ---- pointer: scene camera + light, and the custom cursor (dot + circle, reticle on links) ----
    if (fine && !reduced) {
      let tx = -100;
      let ty = -100;
      let dx = -100;
      let dy = -100;
      let rx = -100;
      let ry = -100;
      let raf = 0;
      let lastT = null;
      const loop = () => {
        dx += (tx - dx) * 0.7;
        dy += (ty - dy) * 0.7;
        rx += (tx - rx) * 0.2;
        ry += (ty - ry) * 0.2;
        if (dot.current) dot.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        raf = Math.abs(tx - rx) + Math.abs(ty - ry) > 0.2 ? requestAnimationFrame(loop) : 0;
      };
      const onMove = (e) => {
        if (tx === -100) {
          dx = rx = e.clientX;
          dy = ry = e.clientY;
        }
        tx = e.clientX;
        ty = e.clientY;
        film.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        film.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
        root.style.setProperty('--mx', `${e.clientX}px`);
        root.style.setProperty('--my', `${e.clientY}px`);
        if (!raf) raf = requestAnimationFrame(loop);
        if (cur.current && !cur.current.classList.contains('is-on')) {
          cur.current.classList.add('is-on');
          root.classList.add('has-cur');
        }
        const t = e.target;
        if (t === lastT || !cur.current) return;
        lastT = t;
        const tagged = t.closest('[data-cursor]');
        const input = t.closest('input, textarea, select');
        const link = t.closest('a, button, summary, [role="tab"], [role="button"], label[for]');
        const mode = input ? 'text' : tagged ? 'tag' : link ? (link.matches('.fm-btn, [data-cta], .fm-nav-cta, .fm-chat-launch') ? 'cta' : 'link') : 'dot';
        cur.current.dataset.mode = mode;
        if (label.current) label.current.textContent = mode === 'tag' ? tagged.getAttribute('data-cursor') : mode === 'cta' ? '\u2197' : '';
      };
      const onDown = () => cur.current && cur.current.classList.add('is-down');
      const onUp = () => cur.current && cur.current.classList.remove('is-down');
      const onLeave = () => {
        if (cur.current) cur.current.classList.remove('is-on');
        root.classList.remove('has-cur');
        lastT = null;
      };
      const onEnter = () => {
        if (cur.current && tx !== -100) {
          cur.current.classList.add('is-on');
          root.classList.add('has-cur');
        }
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mousedown', onDown, { passive: true });
      window.addEventListener('mouseup', onUp, { passive: true });
      document.addEventListener('mouseleave', onLeave);
      document.addEventListener('mouseenter', onEnter);
      off.push(() => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mousedown', onDown);
        window.removeEventListener('mouseup', onUp);
        document.removeEventListener('mouseleave', onLeave);
        document.removeEventListener('mouseenter', onEnter);
        cancelAnimationFrame(raf);
        root.classList.remove('has-cur');
      });
    }
    return () => off.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div className="fm-shutter" ref={shutter} aria-hidden="true">
        <i></i>
        <i></i>
      </div>
      <div className="fm-cur" ref={cur} data-mode="dot" aria-hidden="true">
        <i className="fm-cur-dot" ref={dot}></i>
        <span className="fm-cur-ring" ref={ring}>
          <svg width="52" height="52" viewBox="-26 -26 52 52" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M-26 0H-17M17 0H26M0 -26V-17M0 17V26" />
          </svg>
          <b className="fm-cur-label" ref={label}></b>
        </span>
      </div>
    </>
  );
}
