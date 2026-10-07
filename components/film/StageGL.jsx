'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OBJ, buildLayouts, cameraFor, film, filmT, makeSolver } from '@/lib/film';

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

    // ---- the object ----
    const metal = track(new THREE.MeshPhysicalMaterial({ color: 0xcfd8dc, metalness: 1, roughness: 0.27, clearcoat: 0.3, clearcoatRoughness: 0.35 }));
    const dark = track(new THREE.MeshPhysicalMaterial({ color: 0x14303f, metalness: 0.85, roughness: 0.36 }));
    const inlay = track(new THREE.MeshBasicMaterial({ color: 0x5fd0b5, transparent: true, opacity: 0.95 }));
    const tip = track(new THREE.MeshStandardMaterial({ color: 0x3cb371, emissive: 0x1e7a4a, emissiveIntensity: 0.9, metalness: 0.4, roughness: 0.4 }));
    const lineMat = track(new THREE.MeshBasicMaterial({ color: 0x6fc4d4, transparent: true, opacity: 0.5 }));
    const fadeMats = [metal, dark, inlay, lineMat, tip];

    const arcShape = new THREE.Shape();
    arcShape.absarc(0, 0, OBJ.arcOuter, OBJ.arcStart, OBJ.arcEnd, false);
    arcShape.absarc(0, 0, OBJ.arcInner, OBJ.arcEnd, OBJ.arcStart, true);
    arcShape.closePath();
    const arcGeo = track(new THREE.ExtrudeGeometry(arcShape, { depth: OBJ.arcDepth, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 3, curveSegments: 96 }));
    arcGeo.translate(0, 0, -OBJ.arcDepth / 2);
    const arc = new THREE.Mesh(arcGeo, metal);

    const ringShape = new THREE.Shape();
    ringShape.absarc(0, 0, OBJ.ringOuter, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, OBJ.ringInner, 0, Math.PI * 2, true);
    ringShape.holes.push(hole);
    for (let k = 0; k < 28; k += 1) {
      const a = (k / 28) * Math.PI * 2;
      const rc = (OBJ.ringOuter + OBJ.ringInner) / 2;
      const cx = Math.cos(a) * rc;
      const cy = Math.sin(a) * rc;
      const p = new THREE.Path();
      [[-0.03, -0.07], [0.03, -0.07], [0.03, 0.07], [-0.03, 0.07]].forEach(([u, v], i) => {
        const x = cx + u * Math.cos(a) - v * Math.sin(a);
        const y = cy + u * Math.sin(a) + v * Math.cos(a);
        if (i === 0) p.moveTo(x, y);
        else p.lineTo(x, y);
      });
      p.closePath();
      ringShape.holes.push(p);
    }
    const ringGeo = track(new THREE.ExtrudeGeometry(ringShape, { depth: OBJ.ringDepth, bevelEnabled: false, curveSegments: 96 }));
    ringGeo.translate(0, 0, -OBJ.ringDepth / 2);
    const ring = new THREE.Mesh(ringGeo, dark);

    const beamGeo = track(new THREE.BoxGeometry(OBJ.beamL, OBJ.beamW, OBJ.beamD));
    const beam = new THREE.Mesh(beamGeo, metal);
    beam.rotation.z = OBJ.beamAngle;
    beam.position.set(0.5, -0.3, 0);
    const inlayMesh = new THREE.Mesh(track(new THREE.BoxGeometry(OBJ.beamL * 0.78, 0.035, 0.02)), inlay);
    inlayMesh.position.z = OBJ.beamD / 2 + 0.006;
    beam.add(inlayMesh);
    const cap = new THREE.Mesh(track(new THREE.BoxGeometry(0.16, OBJ.beamW + 0.16, OBJ.beamD + 0.16)), dark);
    cap.position.x = OBJ.beamL / 2;
    beam.add(cap);
    const tipMesh = new THREE.Mesh(track(new THREE.BoxGeometry(0.1, OBJ.beamW + 0.18, OBJ.beamD + 0.18)), tip);
    tipMesh.position.x = OBJ.beamL / 2 + 0.13;
    beam.add(tipMesh);

    const guide = new THREE.Mesh(track(new THREE.TorusGeometry(3.7, 0.01, 6, 240)), lineMat);
    const guide2 = new THREE.Mesh(track(new THREE.TorusGeometry(4.15, 0.006, 6, 240)), lineMat);
    guide2.rotation.x = 1.1;
    rig.add(arc, ring, beam, guide, guide2);

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
      world.position.x = w / h > 1.35 ? 2.5 : 0;
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
      ring.rotation.z = time * 0.22;
      guide.rotation.z = -time * 0.05;
      guide2.rotation.z = time * 0.04;
      beam.position.y = -0.3 + Math.sin(time * 0.6) * 0.05;

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
      arc.visible = ring.visible = beam.visible = guide.visible = guide2.visible = meshOn;
      const wantT = s.mesh < 0.999;
      if (wantT !== transparentOn) {
        transparentOn = wantT;
        fadeMats.forEach((m) => {
          m.transparent = wantT || m === inlay || m === lineMat;
          m.needsUpdate = true;
        });
      }
      metal.opacity = dark.opacity = tip.opacity = s.mesh;
      inlay.opacity = 0.9 * s.mesh;
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
