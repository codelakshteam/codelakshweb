'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { film } from '@/lib/film';
import { initSound, play, unlock } from '@/lib/sound';

// Behaviour layered over the HTML: smooth scroll with velocity, the precision reticle cursor, the shutter page
// transition, the light-source mouse position and scroll-reveal for inner pages. All of it is optional: with
// reduced motion or no JavaScript the page is plain, fully visible HTML.
export default function Runtime() {
  const shutter = useRef(null);
  const ret = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    film.reduced = reduced;
    const off = [];

    // ---- interface sound (see lib/sound.js): unlocked by the first gesture ----
    initSound();
    const gesture = () => unlock();
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
    window.addEventListener('pointerdown', gesture, { once: false, passive: true });
    window.addEventListener('keydown', gesture, { passive: true });
    document.addEventListener('click', onSoundClick);
    document.addEventListener('mouseover', onSoundHover, { passive: true });
    off.push(() => {
      window.removeEventListener('pointerdown', gesture);
      window.removeEventListener('keydown', gesture);
      document.removeEventListener('click', onSoundClick);
      document.removeEventListener('mouseover', onSoundHover);
    });

    // ---- smooth scroll + velocity ----
    let lenis = null;
    let raf = 0;
    if (!reduced) {
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

    // ---- pointer: scene camera + light, and the precision reticle ----
    if (fine && !reduced) {
      let tx = -100;
      let ty = -100;
      let x = -100;
      let y = -100;
      let r = 0;
      let lastT = null;
      const loop = () => {
        x += (tx - x) * 0.45;
        y += (ty - y) * 0.45;
        if (ret.current) ret.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        r = Math.abs(tx - x) + Math.abs(ty - y) > 0.2 ? requestAnimationFrame(loop) : 0;
      };
      const onMove = (e) => {
        tx = e.clientX;
        ty = e.clientY;
        film.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        film.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
        root.style.setProperty('--mx', `${e.clientX}px`);
        root.style.setProperty('--my', `${e.clientY}px`);
        if (!r) r = requestAnimationFrame(loop);
        const t = e.target;
        if (t === lastT || !ret.current) return;
        lastT = t;
        const tag = t.closest('[data-cursor]');
        const input = t.closest('input, textarea, select');
        const link = t.closest('a, button, summary, [role="tab"], [role="button"]');
        const mode = input ? 'off' : tag ? 'tag' : link ? (link.matches('.fm-btn, [data-cta]') ? 'cta' : 'link') : 'off';
        ret.current.dataset.mode = mode;
        root.classList.toggle('has-ret', mode !== 'off');
        if (label.current) label.current.textContent = mode === 'tag' ? tag.getAttribute('data-cursor') : mode === 'cta' ? '↗' : '';
      };
      const onLeave = () => {
        if (ret.current) ret.current.dataset.mode = 'off';
        root.classList.remove('has-ret');
        lastT = null;
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      document.addEventListener('mouseleave', onLeave);
      off.push(() => {
        window.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseleave', onLeave);
        cancelAnimationFrame(r);
        root.classList.remove('has-ret');
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
      <div className="fm-ret" ref={ret} data-mode="off" aria-hidden="true">
        <svg width="34" height="34" viewBox="-17 -17 34 34" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M-14 0H-5M5 0H14M0 -14V-5M0 5V14" />
          <path className="fm-ret-box" d="M-9 -9H9V9H-9Z" />
        </svg>
        <span ref={label}></span>
      </div>
    </>
  );
}
