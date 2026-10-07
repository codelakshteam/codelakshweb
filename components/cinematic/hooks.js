'use client';

import { useEffect, useRef, useState } from 'react';

// Device capability, resolved after mount so server HTML and first client render match. `tier3d` decides whether
// the heavy WebGL scene may load at all; everything else falls back to cheap 2D or pure CSS.
export function useCapability() {
  const [cap, setCap] = useState({ ready: false, reduced: false, coarse: false, narrow: true, tier3d: false, low: true });
  useEffect(() => {
    const mq = (q) => window.matchMedia(q).matches;
    const reduced = mq('(prefers-reduced-motion: reduce)');
    const coarse = mq('(pointer: coarse)');
    const narrow = window.innerWidth < 900;
    const saveData = !!(navigator.connection && navigator.connection.saveData);
    const cores = navigator.hardwareConcurrency || 4;
    const mem = navigator.deviceMemory || 4;
    let webgl = false;
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      webgl = !!gl;
      if (gl && gl.getExtension('WEBGL_lose_context')) gl.getExtension('WEBGL_lose_context').loseContext();
    } catch {
      webgl = false;
    }
    const low = cores <= 4 || mem <= 4;
    setCap({ ready: true, reduced, coarse, narrow, low, tier3d: webgl && !reduced && !coarse && !narrow && !saveData });
  }, []);
  return cap;
}

// Writes --p (0..1) onto the element as it scrolls, with no React re-render. mode "pin": progress through a tall
// container whose child is sticky. mode "pass": progress of the element travelling from entering to leaving the screen.
export function useScrollProgress(ref, { mode = 'pin', onChange } = {}) {
  const cb = useRef(onChange);
  cb.current = onChange;
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    let last = -1;
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p0 = mode === 'pin' ? (r.height - vh > 0 ? -r.top / (r.height - vh) : 0) : (vh - r.top) / (vh + r.height);
      const p = Math.min(1, Math.max(0, p0));
      if (Math.abs(p - last) < 0.0004) return;
      last = p;
      el.style.setProperty('--p', p.toFixed(4));
      if (cb.current) cb.current(p);
    };
    const req = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    calc();
    return () => {
      window.removeEventListener('scroll', req);
      window.removeEventListener('resize', req);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, mode]);
}

// True while the element is on screen; canvases use it to stop animating when nobody can see them.
export function useOnScreen(ref, margin = '100px') {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setOn(true);
      return undefined;
    }
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return on;
}
