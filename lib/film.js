// The "film": one continuous scene that the whole home page is shot with. Sections report their scroll progress here
// and the scene (WebGL on capable desktops, a 2D projection elsewhere) turns it into camera moves and morphs.
// Pure JS (no three.js), so both renderers and the sections share it.

export const film = {
  p: { hero: 0, sys: 0, work: 0 },
  acts: new Set(),
  vel: 0,
  mouse: { x: 0, y: 0 },
  reduced: false,
};
export const filmT = () => film.p.hero + film.p.sys * 5 + film.p.work; // 0..1 hero, 1..6 systems, 6..7 interface
export const setAct = (name, on) => (on ? film.acts.add(name) : film.acts.delete(name));

const rng = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Turn a node/edge diagram into N points: the first points are the nodes, the rest ride along the edges.
function diagram(nodes, edges, N, rand, cam, jitter = 0.035) {
  const K = Math.min(nodes.length, Math.floor(N * 0.28));
  const pos = new Float32Array(N * 3);
  const size = new Float32Array(N);
  for (let i = 0; i < K; i += 1) {
    pos.set(nodes[i], i * 3);
    size[i] = 1;
  }
  const live = edges.filter(([a, b]) => a < K && b < K);
  for (let i = K; i < N; i += 1) {
    const [a, b] = live[Math.floor(rand() * live.length)];
    const t = rand();
    for (let k = 0; k < 3; k += 1) pos[i * 3 + k] = nodes[a][k] + (nodes[b][k] - nodes[a][k]) * t + (rand() - 0.5) * jitter * 4;
    size[i] = 0.32;
  }
  const pairs = new Uint16Array(live.flat());
  return { pos, size, pairs, cam };
}

// ---- hero object, sampled analytically (matches the meshes in StageGL) ----
export const OBJ = { arcOuter: 3.2, arcInner: 2.5, arcDepth: 0.9, arcStart: 0.42, arcEnd: Math.PI * 2 - 0.42, ringOuter: 2.1, ringInner: 1.82, ringDepth: 0.28, beamW: 0.5, beamL: 5.4, beamD: 0.7, beamAngle: 0.66 };

function sampleObject(N, rand) {
  const pos = new Float32Array(N * 3);
  const size = new Float32Array(N).fill(0.3);
  const o = OBJ;
  for (let i = 0; i < N; i += 1) {
    const part = rand();
    let x;
    let y;
    let z;
    if (part < 0.5) {
      const th = o.arcStart + rand() * (o.arcEnd - o.arcStart);
      const wall = rand();
      const r = wall < 0.2 ? o.arcOuter : wall < 0.4 ? o.arcInner : o.arcInner + rand() * (o.arcOuter - o.arcInner);
      const flat = wall >= 0.4;
      z = flat ? (rand() < 0.5 ? 0 : o.arcDepth) : rand() * o.arcDepth;
      x = Math.cos(th) * r;
      y = Math.sin(th) * r;
      z -= o.arcDepth / 2;
    } else if (part < 0.72) {
      const th = rand() * Math.PI * 2;
      const r = o.ringInner + rand() * (o.ringOuter - o.ringInner);
      x = Math.cos(th) * r;
      y = Math.sin(th) * r;
      z = (rand() < 0.5 ? -1 : 1) * (o.ringDepth / 2);
    } else {
      const face = Math.floor(rand() * 3);
      let u = (rand() - 0.5) * o.beamL;
      let v = (rand() - 0.5) * o.beamW;
      let w = (rand() - 0.5) * o.beamD;
      if (face === 0) w = w < 0 ? -o.beamD / 2 : o.beamD / 2;
      else if (face === 1) v = v < 0 ? -o.beamW / 2 : o.beamW / 2;
      else u = u < 0 ? -o.beamL / 2 : o.beamL / 2;
      const c = Math.cos(o.beamAngle);
      const s = Math.sin(o.beamAngle);
      x = u * c - v * s + 0.5;
      y = u * s + v * c - 0.3;
      z = w;
    }
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
  }
  return { pos, size, pairs: new Uint16Array(0), cam: { p: [0, 0, 14], l: [0, 0, 0] } };
}

export function buildLayouts(N, seed = 7) {
  const rand = rng(seed);
  const J = (a) => (rand() - 0.5) * a;

  // 0 AI: a layered network
  const aiN = [];
  const aiE = [];
  const layers = [5, 7, 8, 7, 5];
  const idx = [];
  layers.forEach((n, li) => {
    idx[li] = [];
    for (let j = 0; j < n; j += 1) {
      idx[li].push(aiN.length);
      aiN.push([(li - 2) * 2.7, (j - (n - 1) / 2) * 0.95, J(2.4)]);
    }
  });
  for (let li = 0; li < layers.length - 1; li += 1) {
    idx[li].forEach((a) => {
      const sorted = [...idx[li + 1]].sort((p, q) => Math.abs(aiN[p][1] - aiN[a][1]) - Math.abs(aiN[q][1] - aiN[a][1]));
      sorted.slice(0, 3).forEach((b) => aiE.push([a, b]));
    });
  }

  // 1 SOFTWARE: a modular architecture (services, modules, shared bus)
  const swN = [[0, 3.7, 0]];
  const swE = [];
  const l1 = [];
  for (let i = 0; i < 4; i += 1) {
    l1.push(swN.length);
    swN.push([-4.8 + i * 3.2, 1.7, i % 2 ? 1.2 : -1.2]);
    swE.push([0, swN.length - 1]);
  }
  const l2 = [];
  l1.forEach((p) => {
    for (let k = 0; k < 3; k += 1) {
      l2.push(swN.length);
      swN.push([swN[p][0] + (k - 1) * 1.05, -0.5, swN[p][2] + (k - 1) * 0.7]);
      swE.push([p, swN.length - 1]);
    }
  });
  const leaves = [];
  l2.forEach((p) => {
    leaves.push(swN.length);
    swN.push([swN[p][0], -2.8, swN[p][2]]);
    swE.push([p, swN.length - 1]);
  });
  for (let i = 0; i < leaves.length - 1; i += 1) swE.push([leaves[i], leaves[i + 1]]);

  // 2 MOBILE: three screens at different depths, each with interface rows
  const mbN = [];
  const mbE = [];
  [[-3.6, -0.5, -1.4, 0.38, 1], [0, 0, 0.6, 0, 1.15], [3.6, -0.3, -1.2, -0.38, 1]].forEach(([cx, cy, cz, ry, sc]) => {
    const pt = (x, y) => {
      const X = x * sc;
      return [cx + X * Math.cos(ry), cy + y * sc, cz - X * Math.sin(ry)];
    };
    const base = mbN.length;
    [[-1.05, 2.1], [1.05, 2.1], [1.05, -2.1], [-1.05, -2.1]].forEach(([x, y]) => mbN.push(pt(x, y)));
    [[0, 1], [1, 2], [2, 3], [3, 0]].forEach(([a, b]) => mbE.push([base + a, base + b]));
    for (let r = 0; r < 6; r += 1) {
      const y = 1.45 - r * 0.62;
      const w = r === 0 ? 0.8 : r % 2 ? 0.8 : 0.45;
      const a = mbN.length;
      mbN.push(pt(-0.8, y), pt(w, y));
      mbE.push([a, a + 1]);
    }
  });

  // 3 ERP: a data lattice (tables joined along three axes)
  const erN = [];
  const erE = [];
  const id = (x, y, z) => (x * 4 + y) * 3 + z;
  for (let x = 0; x < 5; x += 1) for (let y = 0; y < 4; y += 1) for (let z = 0; z < 3; z += 1) erN[id(x, y, z)] = [(x - 2) * 2.3, (y - 1.5) * 1.55, (z - 1) * 2.1];
  for (let x = 0; x < 5; x += 1) for (let y = 0; y < 4; y += 1) for (let z = 0; z < 3; z += 1) {
    if (x < 4) erE.push([id(x, y, z), id(x + 1, y, z)]);
    if (y < 3) erE.push([id(x, y, z), id(x, y + 1, z)]);
    if (z < 2) erE.push([id(x, y, z), id(x, y, z + 1)]);
  }

  // 4 CLOUD: regions (small lattices) joined by long links
  const clN = [];
  const clE = [];
  const centers = [[-4.6, 1.6, 0], [4.6, 2.1, -1], [-2.2, -2.6, 1.6], [3.2, -2.3, 1.6], [0.2, 0.1, -3.2]];
  const first = [];
  centers.forEach((c) => {
    const b = clN.length;
    first.push(b);
    for (let i = 0; i < 8; i += 1) clN.push([c[0] + (i & 1 ? 0.6 : -0.6), c[1] + (i & 2 ? 0.6 : -0.6), c[2] + (i & 4 ? 0.6 : -0.6)]);
    for (let i = 0; i < 8; i += 1) [1, 2, 4].forEach((m) => !(i & m) && clE.push([b + i, b + (i | m)]));
  });
  for (let i = 0; i < first.length; i += 1) for (let j = i + 1; j < first.length; j += 1) {
    let best = [first[i], first[j], 1e9];
    for (let a = 0; a < 8; a += 1) for (let b = 0; b < 8; b += 1) {
      const A = clN[first[i] + a];
      const B = clN[first[j] + b];
      const d = Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2]);
      if (d < best[2]) best = [first[i] + a, first[j] + b, d];
    }
    clE.push([best[0], best[1]]);
  }

  // 5 DATA: streams passing through validation gates
  const dtN = [];
  const dtE = [];
  for (let s = 0; s < 3; s += 1) {
    let prev = -1;
    for (let i = 0; i < 24; i += 1) {
      const x = -6.2 + i * (12.4 / 23);
      dtN.push([x, Math.sin(x * 0.85 + s * 2.1) * 1.1 + (s - 1) * 1.9, Math.cos(x * 0.85 + s * 2.1) * 1.3]);
      if (prev >= 0) dtE.push([prev, dtN.length - 1]);
      prev = dtN.length - 1;
    }
  }
  [-4.2, -1.4, 1.4, 4.2].forEach((x) => {
    const b = dtN.length;
    [[-3, -2], [3, -2], [3, 2], [-3, 2]].forEach(([y, z]) => dtN.push([x, y * 0.95, z * 0.8]));
    [[0, 1], [1, 2], [2, 3], [3, 0]].forEach(([a, c]) => dtE.push([b + a, b + c]));
  });

  // 6 INTERFACE: a screen grid the network resolves into
  const plN = [];
  const plE = [];
  const cols = 14;
  const rows = 8;
  for (let r = 0; r < rows; r += 1) for (let c = 0; c < cols; c += 1) plN.push([(c - (cols - 1) / 2) * 0.82, ((rows - 1) / 2 - r) * 0.78, 0]);
  for (let r = 0; r < rows; r += 1) for (let c = 0; c < cols; c += 1) {
    if (c < cols - 1) plE.push([r * cols + c, r * cols + c + 1]);
    if (r < rows - 1) plE.push([r * cols + c, (r + 1) * cols + c]);
  }

  const cams = [
    { p: [-4, 1.4, 12.5], l: [0, 0, 0] },
    { p: [3, 3.2, 13], l: [0, 0.4, 0] },
    { p: [0, 0.4, 11.5], l: [0, 0, 0] },
    { p: [7.5, 4.5, 10.5], l: [0, 0, 0] },
    { p: [-2.5, 5, 13.5], l: [0, 0, 0] },
    { p: [-8.5, 1.2, 8.5], l: [1, 0, 0] },
    { p: [0, 0, 10.6], l: [0, 0, 0] },
  ];
  const sets = [aiN, swN, mbN, erN, clN, dtN, plN];
  const edges = [aiE, swE, mbE, erE, clE, dtE, plE];
  return {
    object: sampleObject(N, rand),
    systems: sets.map((nodes, i) => diagram(nodes, edges[i], N, rand, cams[i])),
  };
}

// ---- shared helpers ----
export const clamp01 = (v) => Math.min(1, Math.max(0, v));
export const smooth = (a, b, v) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
// Which two layouts are showing and how far we are between them. Plateaus hold each system before morphing on.
export function systemsPhase(t) {
  const s = Math.min(5.999, Math.max(0, t - 1));
  const a = Math.floor(s);
  const m = smooth(0.4, 0.78, s - a);
  return { a, b: Math.min(6, a + 1), m };
}

// ---- solver shared by both renderers ----
export function makeSolver(layouts, N) {
  const r = rng(99);
  const delay = new Float32Array(N);
  const dir = new Float32Array(N * 3);
  for (let i = 0; i < N; i += 1) {
    delay[i] = r();
    const th = r() * Math.PI * 2;
    const ph = Math.acos(2 * r() - 1);
    dir[i * 3] = Math.sin(ph) * Math.cos(th);
    dir[i * 3 + 1] = Math.sin(ph) * Math.sin(th);
    dir[i * 3 + 2] = Math.cos(ph);
  }
  const obj = layouts.object;
  const sys = layouts.systems;

  // Fills outPos/outSize for time tS (the smoothed film time). rotY/rotX turn the object's points with the mesh.
  return function solve(tS, rotY, rotX, outPos, outSize, showObject) {
    const cy = Math.cos(rotY);
    const sy = Math.sin(rotY);
    const cx = Math.cos(rotX);
    const sx = Math.sin(rotX);
    if (tS < 1) {
      const m = smooth(0.5, 0.96, tS);
      const T = sys[0];
      for (let i = 0; i < N; i += 1) {
        const x0 = obj.pos[i * 3];
        const y0 = obj.pos[i * 3 + 1];
        const z0 = obj.pos[i * 3 + 2];
        const x1 = x0 * cy + z0 * sy;
        const z1 = -x0 * sy + z0 * cy;
        const y2 = y0 * cx - z1 * sx;
        const z2 = y0 * sx + z1 * cx;
        const q = clamp01((m * 1.55 - delay[i] * 0.55) / 1);
        const e = q * q * (3 - 2 * q);
        const bulge = Math.sin(Math.PI * e) * 2.4;
        outPos[i * 3] = x1 + (T.pos[i * 3] - x1) * e + dir[i * 3] * bulge;
        outPos[i * 3 + 1] = y2 + (T.pos[i * 3 + 1] - y2) * e + dir[i * 3 + 1] * bulge;
        outPos[i * 3 + 2] = z2 + (T.pos[i * 3 + 2] - z2) * e + dir[i * 3 + 2] * bulge;
        outSize[i] = obj.size[i] + (T.size[i] - obj.size[i]) * e;
      }
      return { a: 0, b: 0, m: 0, alpha: showObject ? 1 : smooth(0.42, 0.62, tS), line: smooth(0.9, 1, tS), mesh: 1 - smooth(0.5, 0.78, tS) };
    }
    const { a, b, m } = systemsPhase(tS);
    const A = sys[a];
    const B = sys[b];
    for (let i = 0; i < N; i += 1) {
      const q = clamp01((m - delay[i] * 0.35) / 0.65);
      const e = q * q * (3 - 2 * q);
      const bulge = Math.sin(Math.PI * e) * 0.9;
      outPos[i * 3] = A.pos[i * 3] + (B.pos[i * 3] - A.pos[i * 3]) * e + dir[i * 3] * bulge;
      outPos[i * 3 + 1] = A.pos[i * 3 + 1] + (B.pos[i * 3 + 1] - A.pos[i * 3 + 1]) * e + dir[i * 3 + 1] * bulge;
      outPos[i * 3 + 2] = A.pos[i * 3 + 2] + (B.pos[i * 3 + 2] - A.pos[i * 3 + 2]) * e + dir[i * 3 + 2] * bulge;
      outSize[i] = A.size[i] + (B.size[i] - A.size[i]) * e;
    }
    return { a, b, m, alpha: 1, line: 1, mesh: 0 };
  };
}

// Camera for film time tS: a slow dolly through the hero object, then a pose per system. Mouse nudges it like a hand on a rig.
export function cameraFor(layouts, tS, time, mouse) {
  const sys = layouts.systems;
  let p;
  let l;
  if (tS < 1) {
    const d = smooth(0, 0.6, tS);
    const hp = [Math.sin(time * 0.12) * 1.1, 0.5 + Math.sin(time * 0.09) * 0.3, 14 - 7 * d];
    const k = smooth(0.55, 1, tS);
    const c = sys[0].cam.p;
    p = [hp[0] + (c[0] - hp[0]) * k, hp[1] + (c[1] - hp[1]) * k, hp[2] + (c[2] - hp[2]) * k];
    l = [sys[0].cam.l[0] * k, sys[0].cam.l[1] * k, 0];
  } else {
    const { a, b, m } = systemsPhase(tS);
    const A = sys[a].cam;
    const B = sys[b].cam;
    p = [0, 1, 2].map((k) => A.p[k] + (B.p[k] - A.p[k]) * m);
    l = [0, 1, 2].map((k) => A.l[k] + (B.l[k] - A.l[k]) * m);
  }
  return { p: [p[0] + mouse.x * 1.5, p[1] - mouse.y * 1, p[2]], l };
}
