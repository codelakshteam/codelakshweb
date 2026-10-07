'use client';

import { useEffect, useRef } from 'react';
import { useOnScreen } from '@/components/cinematic/hooks';

// A generative backdrop per service, drawn on one 2D canvas and cross-faded when the stage changes. No images, no
// stock icons. It only animates while visible and draws a single still frame when reduced motion is on.
const B = '4,131,210';
const T = '20,184,166';
const rr = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
};

const themes = {
  ai(ctx, w, h, t) {
    const cols = 5;
    const rows = 7;
    const P = (c, r) => ({ x: w * (0.5 + c * 0.095), y: h * (0.18 + r * 0.11) + Math.sin(t * 0.7 + r * 1.3 + c) * 9 });
    ctx.lineWidth = 1;
    for (let c = 0; c < cols - 1; c += 1) {
      for (let r = 0; r < rows; r += 1) {
        for (let s = 0; s < rows; s += 1) {
          const a = P(c, r);
          const b = P(c + 1, s);
          ctx.strokeStyle = `rgba(${B},0.07)`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for (let k = 0; k < 14; k += 1) {
      const c = k % (cols - 1);
      const a = P(c, (k * 3) % rows);
      const b = P(c + 1, (k * 5 + 2) % rows);
      const u = (t * 0.5 + k * 0.37) % 1;
      ctx.fillStyle = `rgba(${T},${0.9 - u * 0.5})`;
      ctx.beginPath();
      ctx.arc(a.x + (b.x - a.x) * u, a.y + (b.y - a.y) * u, 2.4, 0, 6.283);
      ctx.fill();
    }
    for (let c = 0; c < cols; c += 1) for (let r = 0; r < rows; r += 1) {
      const p = P(c, r);
      ctx.fillStyle = `rgba(190,235,255,${0.35 + 0.35 * Math.sin(t + r + c)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.6, 0, 6.283);
      ctx.fill();
    }
  },
  web(ctx, w, h, t) {
    for (let i = 0; i < 8; i += 1) {
      const x = w * 0.5 + i * 34 + Math.sin(t * 0.5 + i * 0.6) * 22;
      const y = h * 0.16 + i * 48 + Math.cos(t * 0.4 + i) * 10;
      ctx.strokeStyle = `rgba(${i % 2 ? T : B},${0.12 + i * 0.035})`;
      ctx.lineWidth = 1.2;
      rr(ctx, x, y, Math.min(300, w * 0.34), 150, 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y + 28);
      ctx.lineTo(x + Math.min(300, w * 0.34), y + 28);
      ctx.moveTo(x + 18, y + 60);
      ctx.lineTo(x + 130, y + 60);
      ctx.moveTo(x + 18, y + 82);
      ctx.lineTo(x + 96, y + 82);
      ctx.stroke();
    }
  },
  mobile(ctx, w, h, t) {
    for (let i = 0; i < 3; i += 1) {
      const sx = 0.35 + 0.65 * Math.abs(Math.cos(t * 0.35 + i * 1.1));
      const pw = 128 * sx;
      const cx = w * (0.58 + i * 0.15);
      const cy = h * 0.5 + Math.sin(t * 0.8 + i) * 14;
      ctx.strokeStyle = `rgba(${i === 1 ? T : B},0.55)`;
      ctx.lineWidth = 1.4;
      rr(ctx, cx - pw / 2, cy - 130, pw, 260, 22 * sx + 4);
      ctx.stroke();
      ctx.strokeStyle = `rgba(${B},0.25)`;
      for (let k = 0; k < 5; k += 1) {
        ctx.beginPath();
        ctx.moveTo(cx - pw * 0.36, cy - 80 + k * 38);
        ctx.lineTo(cx + pw * 0.36 * (k % 2 ? 0.6 : 1), cy - 80 + k * 38);
        ctx.stroke();
      }
    }
  },
  erp(ctx, w, h, t) {
    const cols = 5;
    const rows = 4;
    const P = (c, r) => ({ x: w * (0.5 + c * 0.1), y: h * (0.22 + r * 0.18) });
    ctx.strokeStyle = `rgba(${B},0.4)`;
    ctx.lineWidth = 1;
    for (let c = 0; c < cols; c += 1) for (let r = 0; r < rows; r += 1) {
      const p = P(c, r);
      if (c < cols - 1) {
        const q = P(c + 1, r);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
      if (r < rows - 1) {
        const q = P(c, r + 1);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
      ctx.strokeStyle = `rgba(${B},0.9)`;
      ctx.strokeRect(p.x - 7, p.y - 7, 14, 14);
      ctx.strokeStyle = `rgba(${B},0.4)`;
    }
    for (let k = 0; k < 12; k += 1) {
      const r = k % rows;
      const u = (t * 0.35 + k * 0.17) % 1;
      const a = P(0, r);
      const b = P(cols - 1, r);
      ctx.fillStyle = `rgba(${T},1)`;
      ctx.fillRect(a.x + (b.x - a.x) * u - 4, a.y - 4, 8, 8);
    }
  },
  cloud(ctx, w, h, t) {
    for (let i = 0; i < 4; i += 1) {
      const x = w * (0.6 + Math.sin(t * 0.12 + i * 2) * 0.12);
      const y = h * (0.25 + i * 0.18) + Math.cos(t * 0.15 + i) * 20;
      const g = ctx.createRadialGradient(x, y, 0, x, y, w * 0.28);
      g.addColorStop(0, `rgba(${i % 2 ? T : B},0.22)`);
      g.addColorStop(1, `rgba(${B},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.strokeStyle = `rgba(${B},0.16)`;
    for (let i = 0; i < 6; i += 1) {
      const y = h * (0.2 + i * 0.12) + Math.sin(t * 0.3 + i) * 6;
      ctx.beginPath();
      ctx.moveTo(w * 0.45, y);
      ctx.lineTo(w * 0.97, y);
      ctx.stroke();
    }
    for (let k = 0; k < 26; k += 1) {
      const x = w * (0.5 + ((k * 0.0377) % 0.45));
      const y = h - ((t * 24 + k * 47) % (h * 0.85));
      ctx.fillStyle = `rgba(190,235,255,${0.25 + (k % 3) * 0.15})`;
      ctx.fillRect(x, y, 2, 2);
    }
  },
  growth(ctx, w, h, t) {
    for (let s = 0; s < 6; s += 1) {
      ctx.strokeStyle = `rgba(${s % 2 ? T : B},${0.25 + s * 0.08})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      const n = 60;
      for (let i = 0; i <= n; i += 1) {
        const x = w * (0.46 + (i / n) * 0.5);
        const y = h * (0.82 - s * 0.05) - (i / n) * h * (0.3 + s * 0.06) - Math.sin(i * 0.5 + t * 1.2 + s) * 10 - Math.sin(i * 0.17 + s) * 14;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    for (let k = 0; k < 24; k += 1) {
      const x = w * (0.48 + ((k * 0.0413) % 0.48));
      const y = h - ((t * 40 + k * 61) % h);
      ctx.fillStyle = `rgba(${T},${0.2 + (k % 4) * 0.12})`;
      ctx.fillRect(x, y, 2, 8);
    }
  },
};

export default function ServiceBackdrop({ theme, reduced }) {
  const wrap = useRef(null);
  const cv = useRef(null);
  const on = useOnScreen(wrap);
  const state = useRef({ cur: theme, prev: theme, blend: 1 });

  useEffect(() => {
    const s = state.current;
    if (s.cur !== theme) {
      s.prev = s.cur;
      s.cur = theme;
      s.blend = 0;
    }
  }, [theme]);

  useEffect(() => {
    const canvas = cv.current;
    const host = wrap.current;
    if (!canvas || !host) return undefined;
    const ctx = canvas.getContext('2d');
    let w = 1;
    let h = 1;
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      w = host.clientWidth || 1;
      h = host.clientHeight || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(host);
    const s = state.current;
    let raf = 0;
    let t0 = performance.now();
    const frame = (now) => {
      const dt = Math.min(0.05, (now - t0) / 1000);
      t0 = now;
      const t = reduced ? 3 : now / 1000;
      ctx.clearRect(0, 0, w, h);
      s.blend = Math.min(1, s.blend + dt * 2.2);
      if (s.blend < 1) {
        ctx.globalAlpha = 1 - s.blend;
        themes[s.prev](ctx, w, h, t);
      }
      ctx.globalAlpha = s.blend;
      themes[s.cur](ctx, w, h, t);
      ctx.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(frame);
    };
    if (reduced || on) raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [on, reduced, theme]);

  return (
    <div className="cx-backdrop" ref={wrap} aria-hidden="true">
      <canvas ref={cv} />
    </div>
  );
}
