// Interface sounds, synthesised with the Web Audio API: no audio files, so the page ships 0 KB of audio. Everything is
// quiet and short. Browsers only allow audio after a user gesture, so nothing plays until the first click, tap or key;
// the nav's Sound toggle turns it all off and the choice is remembered.

const KEY = 'cl-sound';
let ctx = null;
let master = null;
let enabled = true;
let noiseBuf = null;
const lastAt = {};
export const stats = { played: 0, last: '' };

export function initSound() {
  try {
    enabled = window.localStorage.getItem(KEY) !== '0';
  } catch {
    enabled = true;
  }
  return enabled;
}
export const isEnabled = () => enabled;
// Shared AudioContext (created lazily, after a gesture) so effects and music use one context.
export const audioContext = () => ensure();

function ensure() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.7;
  const comp = ctx.createDynamicsCompressor();
  master.connect(comp);
  comp.connect(ctx.destination);
  return ctx;
}

// Call from a user gesture.
export function unlock() {
  const c = ensure();
  if (c && c.state === 'suspended') c.resume();
}

function tone(freq, dur, { type = 'sine', gain = 0.03, at = 0, slide = 0 } = {}) {
  const t = ctx.currentTime + at;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function noise(dur, { gain = 0.03, from = 400, to = 3000, q = 1.4, at = 0, swell = false } = {}) {
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i += 1) d[i] = Math.random() * 2 - 1;
  }
  const t = ctx.currentTime + at;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuf;
  src.loop = true;
  const f = ctx.createBiquadFilter();
  f.type = 'bandpass';
  f.Q.value = q;
  f.frequency.setValueAtTime(from, t);
  f.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(gain, t + (swell ? dur * 0.55 : 0.01));
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f);
  f.connect(g);
  g.connect(master);
  src.start(t);
  src.stop(t + dur + 0.05);
}

const SOUNDS = {
  hover: () => tone(2300, 0.03, { gain: 0.009 }),
  tick: () => tone(1500, 0.025, { gain: 0.018 }),
  click: () => {
    tone(280, 0.06, { type: 'triangle', gain: 0.05, slide: -130 });
    noise(0.03, { gain: 0.012, from: 4000, to: 6000, q: 0.8 });
  },
  latch: () => {
    tone(330, 0.07, { type: 'square', gain: 0.01 });
    tone(560, 0.09, { type: 'square', gain: 0.01, at: 0.07 });
  },
  sweep: () => noise(1.0, { gain: 0.035, from: 260, to: 3800, q: 0.9, swell: true }),
  whoosh: () => noise(0.4, { gain: 0.04, from: 2600, to: 220, q: 0.8 }),
  chime: () => {
    tone(660, 0.45, { gain: 0.04 });
    tone(990, 0.5, { gain: 0.03, at: 0.12 });
    tone(1320, 0.6, { gain: 0.02, at: 0.24 });
  },
  on: () => tone(880, 0.12, { gain: 0.03 }),
};
const MIN_GAP = { hover: 90, tick: 40, click: 30, latch: 120, sweep: 1500, whoosh: 300, chime: 800, on: 100 };

export function play(name) {
  if (!enabled || typeof window === 'undefined' || document.hidden) return;
  const c = ensure();
  if (!c || c.state !== 'running' || !SOUNDS[name]) return;
  const now = performance.now();
  if (now - (lastAt[name] || 0) < (MIN_GAP[name] || 0)) return;
  lastAt[name] = now;
  try {
    SOUNDS[name]();
    stats.played += 1;
    stats.last = name;
    window.__clSound = stats;
  } catch {
    /* audio is optional */
  }
}

export function setEnabled(v) {
  enabled = v;
  try {
    window.localStorage.setItem(KEY, v ? '1' : '0');
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event('cl-sound'));
  if (v) {
    unlock();
    play('on');
  }
}
