'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    } catch (err) {
      console.warn('Three.js background initialization fallback:', err);
      cv.style.background = 'radial-gradient(circle at 75% 30%, #0f2140 0%, #070b14 70%)';
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b14, 0.035);

    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;

    scene.add(new THREE.AmbientLight(0x223355, 1.5));
    const l1 = new THREE.PointLight(0x3fe0ff, 4, 30);
    l1.position.set(5, 4, 6);
    scene.add(l1);

    const l2 = new THREE.PointLight(0x8b7bff, 3.5, 30);
    l2.position.set(-5, -3, 4);
    scene.add(l2);

    const G = new THREE.Group();
    scene.add(G);

    // Inner Icosahedron geometric core
    G.add(
      new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.45, 1),
        new THREE.MeshStandardMaterial({
          color: 0x0b1a33,
          emissive: 0x0b3d6e,
          emissiveIntensity: 0.75,
          metalness: 0.9,
          roughness: 0.2,
          flatShading: true,
          transparent: true,
          opacity: 0.92
        })
      )
    );

    // Outer wireframe shell
    G.add(
      new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.52, 1),
        new THREE.MeshBasicMaterial({
          color: 0x3fe0ff,
          wireframe: true,
          transparent: true,
          opacity: 0.3
        })
      )
    );

    // Node network on a Fibonacci sphere
    const N = 52;
    const P: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (2 * (i + 0.5)) / N;
      const r = Math.sqrt(1 - y * y);
      const t = i * 2.39996;
      P.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r).multiplyScalar(2.75));
    }

    const seg: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (P[i].distanceTo(P[j]) < 1.75) {
          seg.push(P[i], P[j]);
        }
      }
    }

    G.add(
      new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints(seg),
        new THREE.LineBasicMaterial({ color: 0x5b8cff, transparent: true, opacity: 0.32 })
      )
    );

    G.add(
      new THREE.Points(
        new THREE.BufferGeometry().setFromPoints(P),
        new THREE.PointsMaterial({ color: 0x7cf0ff, size: 0.11 })
      )
    );

    // Orbital rings
    const rings = (
      [
        [3.3, 0x3fe0ff, 0.5, [1.1, 0, 0]],
        [3.7, 0x8b7bff, 0.4, [0, 0.7, 0.3]]
      ] as [number, number, number, [number, number, number]][]
    ).map(([r, c, o, rot]) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.014, 12, 120),
        new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o })
      );
      m.rotation.set(...rot);
      G.add(m);
      return m;
    });

    // Cosmic background starfield
    const n = 500;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n * 3; i++) {
      pos[i] = (Math.random() - 0.5) * (i % 3 === 2 ? 16 : 30);
    }
    const stars = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)),
      new THREE.PointsMaterial({ color: 0x8fb4ff, size: 0.04, transparent: true, opacity: 0.6 })
    );
    scene.add(stars);

    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;

    const onPointerMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize, { passive: true });

    const clk = new THREE.Clock();
    let animId: number;

    const loop = () => {
      animId = requestAnimationFrame(loop);
      const dt = clk.getDelta();
      const t = clk.elapsedTime;
      const wide = window.innerWidth > 900;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const sp = window.scrollY / docHeight;

      const k = wide ? 0.85 : 0.5;
      G.scale.setScalar(k);
      G.position.x = (wide ? 3 : 0) + Math.sin(sp * Math.PI * 2) * (wide ? 0.9 : 0.3);
      G.position.y = (wide ? 0.1 : 1.3) - sp * 3 + Math.sin(t * 1.1) * 0.12;

      if (!rm) {
        G.rotation.y += dt * 0.12;
        G.rotation.x = Math.sin(t * 0.25) * 0.12 + ty * 0.5;
        rings[0].rotation.z += dt * 0.35;
        rings[1].rotation.x += dt * 0.25;
        stars.rotation.y = t * 0.012;
      }

      tx += (mx - tx) * 0.05;
      ty += (my - ty) * 0.05;
      camera.position.x += (tx * 1.4 - camera.position.x) * 0.05;
      camera.position.y += (-ty * 1.0 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    loop();

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  return <canvas id="bg" ref={canvasRef} aria-hidden="true" />;
}
