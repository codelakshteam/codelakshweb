'use client';

import { useEffect, useRef } from 'react';
import { buildLayouts, cameraFor, film, filmT, makeSolver } from '@/lib/film';

// The same film, projected onto a 2D canvas: used on phones, tablets, weak devices and with reduced motion. The hero
// object appears as a field of points in the exact shape of the mesh, so the story reads the same without WebGL.
export default function Stage2D({ n = 700, still = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return undefined;
    const ctx = cv.getContext('2d');
    const layouts = buildLayouts(n, 11);
    const solve = makeSolver(layouts, n);
    const pos = new Float32Array(n * 3);
    const size = new Float32Array(n);
    let W = 1;
    let H = 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const mouse = { x: 0, y: 0 };
    let tS = filmT();
    let time = 0;
    let last = performance.now();
    let raf = 0;
    const draw = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const on = film.acts.size > 0 && !document.hidden;
      cv.style.opacity = on ? '1' : '0';
      if (on) {
        time += dt;
        tS += (filmT() - tS) * Math.min(1, dt * 5);
        const rotY = still ? 0.3 : Math.sin(time * 0.2) * 0.35 + tS * 0.5;
        const s = solve(tS, rotY, 0, pos, size, true);
        const cam = cameraFor(layouts, tS, still ? 0 : time, mouse);
        // view basis
        const f = [cam.l[0] - cam.p[0], cam.l[1] - cam.p[1], cam.l[2] - cam.p[2]];
        const fl = Math.hypot(...f);
        f[0] /= fl; f[1] /= fl; f[2] /= fl;
        let r = [f[2], 0, -f[0]];
        const rl = Math.hypot(...r) || 1;
        r = [r[0] / rl, 0, r[2] / rl];
        const u = [r[1] * f[2] - r[2] * f[1], r[2] * f[0] - r[0] * f[2], r[0] * f[1] - r[1] * f[0]];
        const focal = H / 2 / Math.tan((38 * Math.PI) / 360);
        const ox = W / H > 1.35 ? 1.9 : 0;
        const proj = new Float32Array(n * 3);
        for (let i = 0; i < n; i += 1) {
          const x = pos[i * 3] + ox - cam.p[0];
          const y = pos[i * 3 + 1] - cam.p[1];
          const z = pos[i * 3 + 2] - cam.p[2];
          const dz = x * f[0] + y * f[1] + z * f[2];
          proj[i * 3] = W / 2 + ((x * r[0] + y * r[1] + z * r[2]) * focal) / dz;
          proj[i * 3 + 1] = H / 2 - ((x * u[0] + y * u[1] + z * u[2]) * focal) / dz;
          proj[i * 3 + 2] = dz;
        }
        ctx.clearRect(0, 0, W, H);
        const drawLines = (idx, a) => {
          if (a < 0.01) return;
          ctx.strokeStyle = `rgba(205,215,228,${a})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          const pr = layouts.systems[idx].pairs;
          for (let k = 0; k < pr.length; k += 2) {
            const A = pr[k] * 3;
            const B = pr[k + 1] * 3;
            if (proj[A + 2] < 1 || proj[B + 2] < 1) continue;
            ctx.moveTo(proj[A], proj[A + 1]);
            ctx.lineTo(proj[B], proj[B + 1]);
          }
          ctx.stroke();
        };
        drawLines(s.a, (1 - s.m) * 0.22 * s.line);
        if (s.b !== s.a) drawLines(s.b, s.m * 0.22 * s.line);
        for (let i = 0; i < n; i += 1) {
          const dz = proj[i * 3 + 2];
          if (dz < 1) continue;
          const px = (0.9 + size[i] * 2.2) * Math.min(2.2, 12 / dz + 0.4);
          const node = size[i] > 0.9;
          ctx.fillStyle = node ? 'rgba(236,246,255,0.95)' : `rgba(205,214,226,${0.5 * Math.min(1, 24 / dz)})`;
          ctx.fillRect(proj[i * 3] - px / 2, proj[i * 3 + 1] - px / 2, px, px);
        }
      }
      if (!still) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [n, still]);

  return <canvas className="fm-2d" ref={ref} />;
}
