'use client';

import { useEffect, useRef } from 'react';
import { useOnScreen } from '@/components/cinematic/hooks';

// Cheap 2D canvas particle network: the hero fallback on phones, tablets and weak devices, and a quiet backdrop for
// other sections. Few points, DPR 1, stops when off screen, and draws a single still frame under reduced motion.
export default function Network2D({ count = 42, still = false, className = '' }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const on = useOnScreen(wrap);

  useEffect(() => {
    const cv = canvas.current;
    const host = wrap.current;
    if (!cv || !host) return undefined;
    const ctx = cv.getContext('2d');
    let w = 1;
    let h = 1;
    const pts = Array.from({ length: count }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.00018, vy: (Math.random() - 0.5) * 0.00018 }));
    const size = () => {
      w = host.clientWidth || 1;
      h = host.clientHeight || 1;
      cv.width = w;
      cv.height = h;
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const reach = Math.min(w, h) * 0.2;
      for (let i = 0; i < pts.length; i += 1) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j += 1) {
          const b = pts[j];
          const d = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
          if (d < reach) {
            ctx.strokeStyle = `rgba(4,131,210,${(1 - d / reach) * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = 'rgba(127,233,220,0.8)';
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, 1.4, 0, 6.283);
        ctx.fill();
      });
    };
    size();
    draw();
    if (still || !on) return undefined;
    let raf = 0;
    const loop = () => {
      pts.forEach((p) => {
        p.x += p.vx * 16;
        p.y += p.vy * 16;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      });
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(() => {
      size();
      draw();
    });
    ro.observe(host);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count, still, on]);

  return (
    <div className={`cx-net ${className}`} ref={wrap} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
