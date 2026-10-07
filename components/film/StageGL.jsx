'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OBJ, OBJ_OFFSET, OBJ_SCALE, buildLayouts, cameraFor, film, filmT, headFrame, makeSolver } from '@/lib/film';

// The WebGL stage. One precision-machined object (a C-arc, a notched ring and a beam passing through it, lit by a
// studio environment) is the opening shot. As the page scrolls the camera moves in, the object breaks into points,
// and the points reassemble as the engineering systems (see lib/film.js). Everything stops when no dark act is on screen.
const VERT = `
attribute float aSize; uniform float uScale; varying float vNode; varying float vDepth;
void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vNode = step(0.9, aSize); vDepth = clamp(1.0 - (-mv.z - 6.0)/20.0, 0.15, 1.0);
gl_PointSize = clamp((0.04 + aSize*0.06) * uScale / -mv.z, 1.3, 4.6); gl_Position = projectionMatrix * mv; }`;
const FRAG = `
precision mediump float; uniform float uAlpha; uniform vec3 uBase; uniform vec3 uNode; varying float vNode; varying float vDepth;
void main(){ vec3 c = mix(uBase, uNode, vNode); gl_FragColor = vec4(c, uAlpha * vDepth * mix(0.55, 1.0, vNode)); }`;

export default function StageGL({ n = 1800 }) {
  const mount = useRef(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return undefined;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return undefined;
    }
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
    const pm = new THREE.PMREMGenerator(renderer);
    const env = pm.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = env.texture;
    const own = [env, pm];
    const track = (o) => (own.push(o), o);

    const world = new THREE.Group();
    scene.add(world);
    const rig = new THREE.Group();
    world.add(rig);

    // ---- the object: the CodeLaksh logo, machined ----
    const metal = track(new THREE.MeshPhysicalMaterial({ color: 0xcfd8dc, metalness: 1, roughness: 0.27, clearcoat: 0.3, clearcoatRoughness: 0.35 }));
    const navy = track(new THREE.MeshPhysicalMaterial({ color: 0x0b4a78, metalness: 0.85, roughness: 0.3, clearcoat: 0.4 }));
    const teal = track(new THREE.MeshPhysicalMaterial({ color: 0x0b8d99, metalness: 0.8, roughness: 0.28, clearcoat: 0.5 }));
    const inlay = track(new THREE.MeshBasicMaterial({ color: 0x5fe0c8, transparent: true, opacity: 0.95 }));
    const barG = track(new THREE.MeshPhysicalMaterial({ color: 0x1fa57a, metalness: 0.8, roughness: 0.3, clearcoat: 0.5 }));
    const tip = track(new THREE.MeshStandardMaterial({ color: 0x3cb878, emissive: 0x1e8a52, emissiveIntensity: 0.9, metalness: 0.4, roughness: 0.4 }));
    const lineMat = track(new THREE.MeshBasicMaterial({ color: 0x6fc4d4, transparent: true, opacity: 0.5 }));
    const fadeMats = [metal, navy, teal, barG, inlay, lineMat, tip];
    const parts = [];

    // C: thick arc open on the right, with a green terminal at the top
    const a = OBJ.arc;
    const arcShape = new THREE.Shape();
    arcShape.absarc(0, 0, a.outer, a.start, a.end, false);
    arcShape.absarc(0, 0, a.inner, a.end, a.start, true);
    arcShape.closePath();
    const arcGeo = track(new THREE.ExtrudeGeometry(arcShape, { depth: a.depth, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 3, curveSegments: 120 }));
    arcGeo.translate(0, 0, -a.depth / 2);
    parts.push(new THREE.Mesh(arcGeo, metal));
    const capShape = new THREE.Shape();
    capShape.absarc(0, 0, a.outer + 0.01, a.start, a.start + 0.16, false);
    capShape.absarc(0, 0, a.inner - 0.01, a.start + 0.16, a.start, true);
    capShape.closePath();
    const capGeo = track(new THREE.ExtrudeGeometry(capShape, { depth: a.depth + 0.04, bevelEnabled: false, curveSegments: 16 }));
    capGeo.translate(0, 0, -a.depth / 2 - 0.02);
    parts.push(new THREE.Mesh(capGeo, tip));

    // three rising bars
    OBJ.bars.forEach((b, i) => {
      const m = new THREE.Mesh(track(new THREE.BoxGeometry(OBJ.barW, b.h, OBJ.barD)), [navy, teal, barG][i]);
      m.position.set(b.x, OBJ.barBase + b.h / 2, 0);
      m.userData.bar = i;
      parts.push(m);
    });

    // the S-curve arrow climbing out through the opening, with its head
    const curve = new THREE.CatmullRomCurve3(OBJ.curve.map((v) => new THREE.Vector3(...v)), false, 'catmullrom', 0.5);
    const tube = new THREE.Mesh(track(new THREE.TubeGeometry(curve, 120, OBJ.tube, 12, false)), teal);
    tube.scale.z = OBJ.tubeFlat;
    tube.position.z = OBJ.curve[0][2] * (1 - OBJ.tubeFlat);
    parts.push(tube);
    const hf = headFrame();
    const headShape = new THREE.Shape();
    headShape.moveTo(OBJ.head.tip, 0);
    headShape.lineTo(-OBJ.head.back, OBJ.head.half);
    headShape.lineTo(-OBJ.head.back * 0.55, 0);
    headShape.lineTo(-OBJ.head.back, -OBJ.head.half);
    headShape.closePath();
    const headGeo = track(new THREE.ExtrudeGeometry(headShape, { depth: OBJ.head.depth, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2 }));
    headGeo.translate(0, 0, -OBJ.head.depth / 2);
    const head = new THREE.Mesh(headGeo, teal);
    head.position.set(hf.end[0], hf.end[1], hf.end[2]);
    head.rotation.z = hf.ang;
    parts.push(head);

    // the L, with its green foot tip
    const L = OBJ.ell;
    const stem = new THREE.Mesh(track(new THREE.BoxGeometry(L.w, L.y1 - L.y0, L.d)), navy);
    stem.position.set(L.x, (L.y0 + L.y1) / 2, L.z);
    const foot = new THREE.Mesh(track(new THREE.BoxGeometry(L.x1 - L.x, L.h, L.d)), navy);
    foot.position.set((L.x + L.x1) / 2, L.y0 + L.h / 2, L.z);
    const footTip = new THREE.Mesh(track(new THREE.BoxGeometry(0.34, L.h + 0.02, L.d + 0.02)), tip);
    footTip.position.set(L.x1 - 0.17, L.y0 + L.h / 2, L.z);
    parts.push(stem, foot, footTip);

    // the </> mark on the C's lower tail
    const tag = new THREE.Group();
    const stroke = (x, y, w, h, r) => {
      const m = new THREE.Mesh(track(new THREE.BoxGeometry(w, h, 0.04)), inlay);
      m.position.set(x, y, 0);
      m.rotation.z = r;
      tag.add(m);
    };
    stroke(-0.38, 0.09, 0.3, 0.06, 0.7); stroke(-0.38, -0.09, 0.3, 0.06, -0.7);
    stroke(0.38, 0.09, 0.3, 0.06, -0.7); stroke(0.38, -0.09, 0.3, 0.06, 0.7);
    stroke(0, 0, 0.42, 0.06, 1.15);
    tag.position.set(-0.55, -2.62, a.depth / 2 + 0.06);
    tag.rotation.z = 0.2;
    parts.push(tag);

    const guide = new THREE.Mesh(track(new THREE.TorusGeometry(3.75, 0.01, 6, 240)), lineMat);
    const guide2 = new THREE.Mesh(track(new THREE.TorusGeometry(4.25, 0.006, 6, 240)), lineMat);
    guide2.rotation.x = 1.1;
    parts.push(guide, guide2);
    const inner = new THREE.Group();
    inner.add(...parts);
    inner.scale.setScalar(OBJ_SCALE);
    inner.position.set(...OBJ_OFFSET);
    rig.add(inner);

    const key = new THREE.DirectionalLight(0xf2fbfb, 2.4);
    key.position.set(5, 6, 6);
    const rim = new THREE.DirectionalLight(0x35c4c9, 2.6);
    rim.position.set(-6, 2, -5);
    scene.add(key, rim);

    // ---- points + lines ----
    const layouts = buildLayouts(n);
    const solve = makeSolver(layouts, n);
    const posArr = new Float32Array(n * 3);
    const sizeArr = new Float32Array(n);
    const posAttr = new THREE.BufferAttribute(posArr, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    const sizeAttr = new THREE.BufferAttribute(sizeArr, 1);
    sizeAttr.setUsage(THREE.DynamicDrawUsage);
    const pg = track(new THREE.BufferGeometry());
    pg.setAttribute('position', posAttr);
    pg.setAttribute('aSize', sizeAttr);
    const pmat = track(new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, uniforms: { uScale: { value: 600 }, uAlpha: { value: 0 }, uBase: { value: new THREE.Color(0xcfe9ee) }, uNode: { value: new THREE.Color(0xc9f2e6) } } }));
    const points = new THREE.Points(pg, pmat);
    points.frustumCulled = false;
    world.add(points);

    const lineGeos = layouts.systems.map((s) => {
      const g = track(new THREE.BufferGeometry());
      g.setAttribute('position', posAttr);
      g.setIndex(new THREE.BufferAttribute(s.pairs, 1));
      return g;
    });
    const lmA = track(new THREE.LineBasicMaterial({ color: 0x8fdce0, transparent: true, opacity: 0, depthWrite: false }));
    const lmB = track(new THREE.LineBasicMaterial({ color: 0x8fdce0, transparent: true, opacity: 0, depthWrite: false }));
    const linesA = new THREE.LineSegments(lineGeos[0], lmA);
    const linesB = new THREE.LineSegments(lineGeos[0], lmB);
    linesA.frustumCulled = false;
    linesB.frustumCulled = false;
    world.add(linesA, linesB);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      pmat.uniforms.uScale.value = (h * renderer.getPixelRatio()) / (2 * Math.tan((38 * Math.PI) / 360));
      const asp = w / h;
      const fit = asp < 1 ? Math.max(0.4, asp) : 1;
      world.scale.setScalar(fit);
      world.position.set(asp > 1.35 ? 1.9 : 0, asp < 1 ? 2.4 : 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const onMove = (e) => {
      film.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      film.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let raf = 0;
    let last = performance.now();
    let time = 0;
    let tS = filmT();
    const mouse = { x: 0, y: 0 };
    let frames = 0;
    let slow = 0;
    let transparentOn = false;
    host.style.opacity = '0';

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const on = film.acts.size > 0 && !document.hidden;
      host.style.opacity = on ? '1' : '0';
      if (!on) return;
      time += dt;
      frames += 1;
      if (dt > 0.034) slow += 1;
      if (frames === 120 && slow > 40 && dpr > 1) {
        dpr = 1;
        renderer.setPixelRatio(1);
        resize();
      }
      tS += (filmT() - tS) * Math.min(1, dt * 5);
      mouse.x += (film.mouse.x - mouse.x) * 0.05;
      mouse.y += (film.mouse.y - mouse.y) * 0.05;

      const rotY = Math.sin(time * 0.2) * 0.35 + mouse.x * 0.45 + tS * 0.5;
      const rotX = -mouse.y * 0.2 + Math.sin(time * 0.15) * 0.06;
      rig.rotation.set(rotX, rotY, 0);
      guide.rotation.z = -time * 0.05;
      guide2.rotation.z = time * 0.04;
      tube.position.y = Math.sin(time * 0.7) * 0.04;
      parts.forEach((m) => {
        if (m.userData.bar !== undefined) m.scale.y = 1 + Math.sin(time * 0.9 + m.userData.bar * 0.8) * 0.025;
      });

      const s = solve(tS, rotY, rotX, posArr, sizeArr, false);
      posAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;
      pmat.uniforms.uAlpha.value = s.alpha;
      if (s.b !== linesA.userData.b || s.a !== linesA.userData.a) {
        linesA.geometry = lineGeos[s.a];
        linesB.geometry = lineGeos[s.b];
        linesA.userData = { a: s.a, b: s.b };
      }
      lmA.opacity = (1 - s.m) * 0.26 * s.line;
      lmB.opacity = s.m * 0.26 * s.line;
      linesB.visible = s.b !== s.a;

      const meshOn = s.mesh > 0.01;
      parts.forEach((m) => (m.visible = meshOn));
      const wantT = s.mesh < 0.999;
      if (wantT !== transparentOn) {
        transparentOn = wantT;
        fadeMats.forEach((m) => {
          m.transparent = wantT || m === inlay || m === lineMat;
          m.needsUpdate = true;
        });
      }
      metal.opacity = navy.opacity = teal.opacity = barG.opacity = tip.opacity = s.mesh;
      inlay.opacity = 0.95 * s.mesh;
      lineMat.opacity = 0.45 * s.mesh;
      rig.scale.setScalar(1 + (1 - s.mesh) * 0.25);

      const cam = cameraFor(layouts, tS, time, mouse);
      camera.position.set(cam.p[0], cam.p[1], cam.p[2]);
      camera.lookAt(cam.l[0], cam.l[1], cam.l[2]);
      key.position.set(5 + Math.sin(time * 0.3) * 2, 6, 6);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);
    host.dataset.ready = 'true';
    const onLost = (e) => e.preventDefault();
    renderer.domElement.addEventListener('webglcontextlost', onLost);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      renderer.domElement.removeEventListener('webglcontextlost', onLost);
      own.forEach((o) => o.dispose && o.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
      delete host.dataset.ready;
    };
  }, [n]);

  return <div className="fm-gl" ref={mount} />;
}
