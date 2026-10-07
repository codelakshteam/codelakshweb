'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// The WebGL hero: an abstract "C" built from arcs, a rising arrow and bars (the CodeLaksh mark, deconstructed),
// inside a network of nodes and a drifting particle field. It reacts to the mouse, drifts on its own, and the camera
// moves deeper as the hero scrolls away. It pauses when off screen, caps pixel ratio, lowers quality if frames are
// slow, and disposes everything on unmount. Loaded only on capable desktop devices (see SceneLoader).
const BLUE = 0x0483d2;
const TEAL = 0x14b8a6;

export default function HeroScene({ low = false }) {
  const mount = useRef(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return undefined;
    }
    let dpr = Math.min(window.devicePixelRatio || 1, low ? 1 : 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.05);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 0, 12);

    const rig = new THREE.Group();
    scene.add(rig);
    const disposables = [];
    const track = (o) => {
      disposables.push(o);
      return o;
    };

    // --- the C: two nested arcs, one open to the right like the logo ---
    const metal = track(new THREE.MeshStandardMaterial({ color: 0x0a1118, metalness: 0.9, roughness: 0.28, emissive: BLUE, emissiveIntensity: 0.9 }));
    const metal2 = track(new THREE.MeshStandardMaterial({ color: 0x0a1118, metalness: 0.9, roughness: 0.3, emissive: TEAL, emissiveIntensity: 0.8 }));
    const arc1 = new THREE.Mesh(track(new THREE.TorusGeometry(3.1, 0.07, 14, 200, Math.PI * 1.45)), metal);
    arc1.rotation.z = Math.PI * 0.275;
    const arc2 = new THREE.Mesh(track(new THREE.TorusGeometry(2.55, 0.035, 10, 160, Math.PI * 1.2)), metal2);
    arc2.rotation.z = Math.PI * 0.4;
    rig.add(arc1, arc2);

    // dotted outer ring
    const ringPts = [];
    for (let i = 0; i < 160; i += 1) {
      const a = (i / 160) * Math.PI * 2;
      ringPts.push(Math.cos(a) * 4.1, Math.sin(a) * 4.1, 0);
    }
    const ringGeo = track(new THREE.BufferGeometry());
    ringGeo.setAttribute('position', new THREE.Float32BufferAttribute(ringPts, 3));
    const ringMat = track(new THREE.PointsMaterial({ color: BLUE, size: 0.045, transparent: true, opacity: 0.55, depthWrite: false }));
    const ring = new THREE.Points(ringGeo, ringMat);
    rig.add(ring);

    // rising bars (from the logo) as edges only
    const barMat = track(new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: 0.85 }));
    [0.55, 0.95, 1.4].forEach((h, i) => {
      const box = track(new THREE.BoxGeometry(0.28, h, 0.28));
      const edges = track(new THREE.EdgesGeometry(box));
      const m = new THREE.LineSegments(edges, barMat);
      m.position.set(-1.25 + i * 0.5, -1.1 + h / 2, 0);
      rig.add(m);
    });

    // arrow: a curve climbing out through the opening of the C
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.6, -1.5, 0.1),
      new THREE.Vector3(-0.2, -0.5, 0.35),
      new THREE.Vector3(1.4, 0.9, 0.1),
      new THREE.Vector3(3.6, 2.7, 0),
    ]);
    const arrowMat = track(new THREE.MeshStandardMaterial({ color: 0xdff4ff, emissive: 0x7fd4ff, emissiveIntensity: 1.1, metalness: 0.4, roughness: 0.3 }));
    const tube = new THREE.Mesh(track(new THREE.TubeGeometry(curve, 80, 0.05, 8, false)), arrowMat);
    const head = new THREE.Mesh(track(new THREE.ConeGeometry(0.2, 0.55, 14)), arrowMat);
    const tipPos = curve.getPoint(1);
    const tan = curve.getTangent(1);
    head.position.copy(tipPos);
    head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tan.normalize());
    rig.add(tube, head);

    // --- network of nodes joined by faint lines ---
    const nodeCount = low ? 34 : 56;
    const nodePos = [];
    const rand = (a, b) => a + Math.random() * (b - a);
    for (let i = 0; i < nodeCount; i += 1) {
      const r = rand(4.6, 8.2);
      const th = rand(0, Math.PI * 2);
      const ph = Math.acos(rand(-1, 1));
      nodePos.push(new THREE.Vector3(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th) * 0.7, r * Math.cos(ph) - 1));
    }
    const nodeArr = new Float32Array(nodeCount * 3);
    nodePos.forEach((v, i) => v.toArray(nodeArr, i * 3));
    const nodeGeo = track(new THREE.BufferGeometry());
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodeArr, 3));
    const nodes = new THREE.Points(nodeGeo, track(new THREE.PointsMaterial({ color: 0x7fe9dc, size: 0.11, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending })));
    const lineArr = [];
    for (let i = 0; i < nodeCount; i += 1) {
      for (let j = i + 1; j < nodeCount; j += 1) {
        if (nodePos[i].distanceTo(nodePos[j]) < 2.9) lineArr.push(...nodePos[i].toArray(), ...nodePos[j].toArray());
      }
    }
    const lineGeo = track(new THREE.BufferGeometry());
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineArr, 3));
    const lines = new THREE.LineSegments(lineGeo, track(new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.22, depthWrite: false })));
    const web = new THREE.Group();
    web.add(nodes, lines);
    scene.add(web);

    // --- dust ---
    let dustCount = low ? 700 : 1500;
    const dustArr = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      dustArr[i * 3] = rand(-18, 18);
      dustArr[i * 3 + 1] = rand(-10, 10);
      dustArr[i * 3 + 2] = rand(-22, 8);
    }
    const dustGeo = track(new THREE.BufferGeometry());
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustArr, 3));
    const dust = new THREE.Points(dustGeo, track(new THREE.PointsMaterial({ color: 0x9fcbe6, size: 0.035, transparent: true, opacity: 0.55, depthWrite: false })));
    scene.add(dust);

    // --- lights that drift ---
    scene.add(new THREE.AmbientLight(0x6688aa, 0.35));
    const lightA = new THREE.PointLight(BLUE, 90, 26, 2);
    const lightB = new THREE.PointLight(TEAL, 70, 26, 2);
    scene.add(lightA, lightB);

    // --- sizing ---
    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = w / h;
      camera.position.x = 0;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // --- input ---
    const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // --- loop ---
    let visible = true;
    let raf = 0;
    let t0 = performance.now();
    let frames = 0;
    let slow = 0;
    const clock = { t: 0 };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        t0 = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(host);

    function loop(now) {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min(0.05, (now - t0) / 1000);
      t0 = now;
      clock.t += dt;
      const t = clock.t;

      // adaptive quality: if the first seconds are slow, drop pixel ratio and dust once
      frames += 1;
      if (dt > 0.034) slow += 1;
      if (frames === 90) {
        if (slow > 30 && dpr > 1) {
          dpr = 1;
          renderer.setPixelRatio(1);
          resize();
        }
        if (slow > 45) dust.visible = false;
      }

      mouse.sx += (mouse.x - mouse.sx) * 0.05;
      mouse.sy += (mouse.y - mouse.sy) * 0.05;
      const p = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));

      rig.rotation.y = Math.sin(t * 0.18) * 0.35 + mouse.sx * 0.3;
      rig.rotation.x = -mouse.sy * 0.16 + Math.sin(t * 0.13) * 0.05;
      rig.rotation.z = p * 0.7;
      rig.position.set(2.7 - p * 2.4, p * 1.4, -1.2 - p * 1.5);
      arc1.rotation.z = Math.PI * 0.275 + t * 0.04;
      arc2.rotation.z = Math.PI * 0.4 - t * 0.09;
      ring.rotation.z = t * 0.03;
      web.rotation.y = t * 0.035 + mouse.sx * 0.1;
      web.rotation.x = Math.sin(t * 0.07) * 0.08;
      dust.rotation.y = t * 0.012 + mouse.sx * 0.04;
      dust.position.y = p * 3;
      camera.position.z = 12 - p * 6.5;
      camera.position.x = Math.sin(t * 0.1) * 0.5 + mouse.sx * 0.4;
      camera.position.y = Math.cos(t * 0.08) * 0.3 - mouse.sy * 0.25;
      camera.lookAt(0.4 - p, p * 0.8, 0);
      lightA.position.set(Math.cos(t * 0.5) * 6 + mouse.sx * 3, Math.sin(t * 0.4) * 4 - mouse.sy * 2, 4);
      lightB.position.set(Math.cos(t * 0.35 + 2) * -6, Math.sin(t * 0.3 + 1) * 3, 3);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    const onVis = () => {
      if (!document.hidden && visible && !raf) {
        t0 = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    const onLost = (e) => e.preventDefault();
    renderer.domElement.addEventListener('webglcontextlost', onLost);

    host.dataset.ready = 'true';

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      renderer.domElement.removeEventListener('webglcontextlost', onLost);
      disposables.forEach((d) => d.dispose && d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
      delete host.dataset.ready;
    };
  }, [low]);

  return <div className="cx-scene" ref={mount} />;
}
