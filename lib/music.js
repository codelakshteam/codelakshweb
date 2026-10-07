// The score: a generative ambient piece synthesised live with the Web Audio API (0 KB of audio files).
// A slow D-minor drone, pad chords that change every ~8 s (Dm9, Bb maj7, Gm9, Am7), sparse bell notes through echo and
// reverb, and a low pulse. It follows the page: dark scenes are deeper and warmer, light sections open up, and fast
// scrolling brightens the filter. It fades in after the first gesture, fades out when hidden, and has its own toggle.

import { film } from '@/lib/film';
import { audioContext } from '@/lib/sound';

const KEY = 'cl-music';
const VOLUME = 0.2;
let enabled = true;
let ctx = null;
let out = null; // music bus gain
let padFilter = null;
let reverbIn = null;
let echoIn = null;
let analyser = null;
let timer = 0;
let started = false;
let next = { chord: 0, bell: 0, pulse: 0 };
let chordIdx = 0;
let mood = 0;

export const musicStats = { playing: false, chords: 0, bells: 0 };

const hz = (m) => 440 * 2 ** ((m - 69) / 12);
const CHORDS = [
  [38, 50, 53, 57, 60, 64], // Dm9
  [34, 46, 50, 53, 57, 62], // Bb maj7 (add 9)
  [43, 50, 53, 57, 60, 62], // Gm9
  [33, 45, 52, 55, 57, 64], // Am7
];
const BELLS = [74, 77, 79, 81, 84, 86]; // D minor pentatonic, high

export function initMusic() {
  try {
    enabled = window.localStorage.getItem(KEY) !== '0';
  } catch {
    enabled = true;
  }
  return enabled;
}
export const isMusicEnabled = () => enabled;

function impulse(seconds = 3.4, decay = 2.6) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c += 1) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i += 1) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** decay;
  }
  return buf;
}

function build() {
  out = ctx.createGain();
  out.gain.value = 0;
  const comp = ctx.createDynamicsCompressor();
  analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  out.connect(comp);
  comp.connect(analyser);
  comp.connect(ctx.destination);

  padFilter = ctx.createBiquadFilter();
  padFilter.type = 'lowpass';
  padFilter.frequency.value = 700;
  padFilter.Q.value = 0.7;
  padFilter.connect(out);

  const conv = ctx.createConvolver();
  conv.buffer = impulse();
  const wet = ctx.createGain();
  wet.gain.value = 0.55;
  reverbIn = ctx.createGain();
  reverbIn.connect(conv);
  conv.connect(wet);
  wet.connect(out);
  padFilter.connect(reverbIn);

  const delay = ctx.createDelay(1.2);
  delay.delayTime.value = 0.46;
  const fb = ctx.createGain();
  fb.gain.value = 0.38;
  const dl = ctx.createBiquadFilter();
  dl.type = 'lowpass';
  dl.frequency.value = 2400;
  echoIn = ctx.createGain();
  echoIn.connect(delay);
  delay.connect(dl);
  dl.connect(fb);
  fb.connect(delay);
  dl.connect(out);
  dl.connect(reverbIn);

  // the drone: two detuned saws on D, filtered and slowly breathing
  const dg = ctx.createGain();
  dg.gain.value = 0.05;
  const df = ctx.createBiquadFilter();
  df.type = 'lowpass';
  df.frequency.value = 260;
  [[73.42, -7], [73.42, 6], [110, 0]].forEach(([f, det], i) => {
    const o = ctx.createOscillator();
    o.type = i === 2 ? 'sine' : 'sawtooth';
    o.frequency.value = f;
    o.detune.value = det;
    o.connect(df);
    o.start();
  });
  const lfo = ctx.createOscillator();
  const lg = ctx.createGain();
  lfo.frequency.value = 0.07;
  lg.gain.value = 90;
  lfo.connect(lg);
  lg.connect(df.frequency);
  lfo.start();
  df.connect(dg);
  dg.connect(out);
  dg.connect(reverbIn);
}

function pad(notes, t) {
  const hold = 7.2;
  notes.forEach((m, i) => {
    [-6, 6].forEach((det, k) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = k ? 'triangle' : 'sine';
      o.frequency.value = hz(m);
      o.detune.value = det;
      const peak = (m < 45 ? 0.034 : 0.02) * (i === 0 ? 1.3 : 1);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(peak, t + 2.4);
      g.gain.setValueAtTime(peak, t + hold - 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, t + hold + 3.6);
      o.connect(g);
      g.connect(padFilter);
      o.start(t);
      o.stop(t + hold + 3.8);
    });
  });
  musicStats.chords += 1;
}

function bell(t) {
  const m = BELLS[Math.floor(Math.random() * BELLS.length)];
  [[1, 0.02], [2.76, 0.007], [5.4, 0.003]].forEach(([mult, peak]) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = hz(m) * mult;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak * (0.7 + mood * 0.5), t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6 / mult ** 0.3);
    o.connect(g);
    g.connect(out);
    g.connect(echoIn);
    g.connect(reverbIn);
    o.start(t);
    o.stop(t + 3);
  });
  musicStats.bells += 1;
}

function pulse(t) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(58, t);
  o.frequency.exponentialRampToValueAtTime(36, t + 0.7);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.1 * (1 - mood * 0.6), t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
  o.connect(g);
  g.connect(out);
  o.start(t);
  o.stop(t + 1.2);
}

function tick() {
  if (!ctx || ctx.state !== 'running') return;
  const now = ctx.currentTime;
  // mood: 0 inside the dark cinematic acts, 1 on the light sections; scroll speed opens the filter
  const target = film.acts.size > 0 ? 0 : 1;
  mood += (target - mood) * 0.12;
  const open = 520 + mood * 1500 + Math.min(1, Math.abs(film.vel || 0) * 2) * 900;
  padFilter.frequency.setTargetAtTime(open, now, 0.6);
  if (now + 0.5 >= next.chord) {
    pad(CHORDS[chordIdx % CHORDS.length], Math.max(now, next.chord));
    chordIdx += 1;
    next.chord = Math.max(now, next.chord) + 7.6;
  }
  if (now + 0.5 >= next.bell) {
    bell(Math.max(now, next.bell));
    next.bell = Math.max(now, next.bell) + 2.6 + Math.random() * 3.8;
  }
  if (now + 0.5 >= next.pulse) {
    pulse(Math.max(now, next.pulse));
    next.pulse = Math.max(now, next.pulse) + 6.4;
  }
}

function fade(to, seconds) {
  if (!out) return;
  out.gain.cancelScheduledValues(ctx.currentTime);
  out.gain.setTargetAtTime(to, ctx.currentTime, seconds / 3);
}

// Call from a user gesture. Safe to call repeatedly.
export function startMusic() {
  if (!enabled || typeof window === 'undefined') return;
  ctx = audioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  if (!started) {
    started = true;
    build();
    next = { chord: ctx.currentTime + 0.2, bell: ctx.currentTime + 4, pulse: ctx.currentTime + 2.5 };
    timer = window.setInterval(tick, 250);
    document.addEventListener('visibilitychange', () => {
      if (!out) return;
      fade(document.hidden || !enabled ? 0 : VOLUME, 0.8);
    });
  }
  musicStats.playing = true;
  window.__clMusic = { stats: musicStats, level: () => { const d = new Uint8Array(analyser.fftSize); analyser.getByteTimeDomainData(d); let s = 0; for (let i = 0; i < d.length; i += 1) s += ((d[i] - 128) / 128) ** 2; return Math.sqrt(s / d.length); } };
  fade(VOLUME, 4);
}

export function setMusicEnabled(v) {
  enabled = v;
  try {
    window.localStorage.setItem(KEY, v ? '1' : '0');
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event('cl-music'));
  if (v) startMusic();
  else {
    musicStats.playing = false;
    if (ctx) fade(0, 0.9);
  }
}
