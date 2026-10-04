'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function SpatialSimulator() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [wireframeActive, setWireframeActive] = useState(false);
  const [particlesActive, setParticlesActive] = useState(true);
  const [glowActive, setGlowActive] = useState(true);
  const [fps, setFps] = useState(60);

  // References to 3D scene objects to allow toolbar control
  const latticeMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const coreLightRef = useRef<THREE.PointLight | null>(null);
  const bellMatRef = useRef<THREE.MeshPhongMaterial | null>(null);
  const resetCameraRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b14, 0.035);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x281a4b, 2.8);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xff8fd8, 5.0, 16);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);
    coreLightRef.current = coreLight;

    const rimLight = new THREE.DirectionalLight(0xb38cff, 3.0);
    rimLight.position.set(5, 9, 7);
    scene.add(rimLight);

    const cyanRim = new THREE.DirectionalLight(0x38bdf8, 2.2);
    cyanRim.position.set(-6, -4, 5);
    scene.add(cyanRim);

    // Main 3D Model Group
    const jellyfishGroup = new THREE.Group();
    scene.add(jellyfishGroup);

    // 1. Translucent Bioluminescent Outer Bell
    const bellGeo = new THREE.SphereGeometry(1.7, 36, 28, 0, Math.PI * 2, 0, Math.PI * 0.52);
    const bellMat = new THREE.MeshPhongMaterial({
      color: 0x6d28d9,
      emissive: 0x3b0764,
      emissiveIntensity: 0.6,
      specular: 0x38bdf8,
      shininess: 100,
      transparent: true,
      opacity: 0.82,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    bellMatRef.current = bellMat;
    const bellMesh = new THREE.Mesh(bellGeo, bellMat);
    bellMesh.rotation.x = Math.PI;
    jellyfishGroup.add(bellMesh);

    // 2. Glowing Wireframe Outer Lattice
    const latticeGeo = new THREE.SphereGeometry(1.73, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.52);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
    latticeMesh.rotation.x = Math.PI;
    latticeMesh.visible = false; // Initially wireframe is off
    jellyfishGroup.add(latticeMesh);
    latticeMeshRef.current = latticeMesh;

    // 3. Luminous Core Organ
    const coreGeo = new THREE.SphereGeometry(0.58, 20, 20);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff8fd8,
      transparent: true,
      opacity: 0.92
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = -0.12;
    jellyfishGroup.add(coreMesh);

    // 4. Floating Rib Rings inside bell
    const ringGeo1 = new THREE.TorusGeometry(0.95, 0.035, 12, 36);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
    const innerRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    innerRing1.rotation.x = Math.PI / 2;
    innerRing1.position.y = -0.3;
    jellyfishGroup.add(innerRing1);

    const ringGeo2 = new THREE.TorusGeometry(1.35, 0.025, 12, 36);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xb38cff, transparent: true, opacity: 0.5 });
    const innerRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    innerRing2.rotation.x = Math.PI / 2;
    innerRing2.position.y = -0.7;
    jellyfishGroup.add(innerRing2);

    // 5. Undulating Physics Tentacles
    const NUM_TENTACLES = 18;
    const TENTACLE_POINTS = 26;
    const tentacles: Array<{
      line: THREE.Line;
      originX: number;
      originZ: number;
      speed: number;
      offset: number;
      amplitude: number;
    }> = [];

    for (let i = 0; i < NUM_TENTACLES; i++) {
      const angle = (i / NUM_TENTACLES) * Math.PI * 2;
      const radius = 0.5 + Math.random() * 0.95;
      const originX = Math.cos(angle) * radius;
      const originZ = Math.sin(angle) * radius;

      const points: THREE.Vector3[] = [];
      for (let p = 0; p < TENTACLE_POINTS; p++) {
        points.push(new THREE.Vector3(originX, -p * 0.19, originZ));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const tentacleGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(32));
      const tentacleMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0xb38cff : i % 3 === 0 ? 0x38bdf8 : 0xff8fd8,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });
      const tentacleLine = new THREE.Line(tentacleGeo, tentacleMat);
      jellyfishGroup.add(tentacleLine);

      tentacles.push({
        line: tentacleLine,
        originX,
        originZ,
        speed: 1.5 + Math.random() * 1.6,
        offset: Math.random() * Math.PI * 2,
        amplitude: 0.14 + Math.random() * 0.1
      });
    }

    // 6. Bioluminescent Particle System
    const particleCount = 480;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const cLilac = new THREE.Color(0xb38cff);
    const cPink = new THREE.Color(0xff8fd8);
    const cCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 34;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 28;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2;

      const rnd = Math.random();
      const c = rnd < 0.4 ? cLilac : rnd < 0.75 ? cPink : cCyan;
      pColors[i * 3] = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Interaction State
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };
    let targetParallax = { x: 0, y: 0 };
    let currentParallax = { x: 0, y: 0 };
    let targetZoom = 11;
    let currentZoom = 11;

    resetCameraRef.current = () => {
      targetRotation = { x: 0, y: 0 };
      targetZoom = 11;
      targetParallax = { x: 0, y: 0 };
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      container.classList.add('is-grabbing');
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetParallax = { x: nx * 0.9, y: ny * 0.6 };
      }

      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotation.y += deltaX * 0.0075;
      targetRotation.x += deltaY * 0.0075;
      targetRotation.x = Math.max(-Math.PI * 0.45, Math.min(Math.PI * 0.45, targetRotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      if (isDragging) {
        isDragging = false;
        container.classList.remove('is-grabbing');
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom += e.deltaY * 0.008;
      targetZoom = Math.max(6.5, Math.min(18, targetZoom));
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 480;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('splashComplete', () => {
      setTimeout(handleResize, 150);
    });

    let ro: ResizeObserver | null = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(handleResize);
      ro.observe(container);
    }

    // Animation Loop & FPS calculation
    const clock = new THREE.Clock();
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // FPS Calculation
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;
      currentParallax.x += (targetParallax.x - currentParallax.x) * 0.06;
      currentParallax.y += (targetParallax.y - currentParallax.y) * 0.06;
      currentZoom += (targetZoom - currentZoom) * 0.08;

      camera.position.z = currentZoom;
      camera.position.x = currentParallax.x * 2.2;
      camera.position.y = currentParallax.y * 1.5;
      camera.lookAt(0, 0, 0);

      const pulse = Math.sin(t * 2.4) * 0.13;
      bellMesh.scale.set(1 + pulse, 1 - pulse * 0.65, 1 + pulse);
      latticeMesh.scale.set(1 + pulse, 1 - pulse * 0.65, 1 + pulse);
      coreMesh.scale.set(1 - pulse * 0.35, 1 + pulse * 0.45, 1 - pulse * 0.35);

      jellyfishGroup.rotation.x = currentRotation.x + Math.sin(t * 0.7) * 0.05;
      jellyfishGroup.rotation.y = currentRotation.y + (rm ? 0 : t * 0.15);
      jellyfishGroup.rotation.z = Math.cos(t * 0.8) * 0.04;

      jellyfishGroup.position.y = Math.sin(t * 1.2) * 0.35;
      jellyfishGroup.position.x = Math.cos(t * 0.8) * 0.25;

      coreLight.position.copy(jellyfishGroup.position);
      coreLight.intensity = (coreLight.intensity > 2 ? 4.5 : 1.2) + Math.sin(t * 2.4) * 1.2;

      tentacles.forEach(tent => {
        const pos = tent.line.geometry.attributes.position as THREE.BufferAttribute;
        for (let p = 1; p < TENTACLE_POINTS; p++) {
          const factor = p / TENTACLE_POINTS;
          const waveX = Math.sin(t * tent.speed + p * 0.36 + tent.offset) * (tent.amplitude * factor * 3.2);
          const waveZ = Math.cos(t * tent.speed * 0.88 + p * 0.36 + tent.offset) * (tent.amplitude * factor * 3.2);
          pos.setXYZ(p, tent.originX + waveX, -p * 0.19, tent.originZ + waveZ);
        }
        pos.needsUpdate = true;
      });

      particles.rotation.y = t * 0.035;
      particles.rotation.x = t * 0.018;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      if (ro) ro.disconnect();
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  const toggleWireframe = () => {
    if (latticeMeshRef.current) {
      latticeMeshRef.current.visible = !latticeMeshRef.current.visible;
      setWireframeActive(latticeMeshRef.current.visible);
    }
  };

  const toggleParticles = () => {
    if (particlesRef.current) {
      particlesRef.current.visible = !particlesRef.current.visible;
      setParticlesActive(particlesRef.current.visible);
    }
  };

  const toggleGlow = () => {
    const nextGlow = !glowActive;
    setGlowActive(nextGlow);
    if (coreLightRef.current) {
      coreLightRef.current.intensity = nextGlow ? 5.0 : 1.2;
    }
    if (bellMatRef.current) {
      bellMatRef.current.shininess = nextGlow ? 100 : 20;
    }
  };

  const resetCamera = () => {
    if (resetCameraRef.current) {
      resetCameraRef.current();
    }
  };

  return (
    <section id="simulator" className="simulator-section rv in">
      <div className="head rv in" style={{ marginBottom: '24px' }}>
        <h2>Live 3D Spatial Simulator</h2>
        <p>
          Real-time WebGL spatial viewport executing procedural bioluminescent particle mesh, physics tentacles, and dynamic shaders.
        </p>
      </div>

      <div className="simulator-box">
        {/* Viewport Top Toolbar */}
        <div className="sim-toolbar">
          <div className="sim-window-dots">
            <span className="dot-red" />
            <span className="dot-lilac" />
            <span className="dot-pink" />
            <span className="sim-file-name">spatial_engine_core.threejs</span>
            <span className="sim-status-chip">
              <span className="status-pulse" />
              Live 3D WebGL Session
            </span>
          </div>

          <div className="sim-controls">
            <button
              id="btnToggleWireframe"
              type="button"
              className={`sim-btn ${wireframeActive ? 'active' : ''}`}
              title="Toggle Wireframe Shell"
              onClick={toggleWireframe}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              Wireframe
            </button>
            <button
              id="btnToggleParticles"
              type="button"
              className={`sim-btn ${particlesActive ? 'active' : ''}`}
              title="Toggle Bioluminescent Particles"
              onClick={toggleParticles}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <circle cx="6" cy="6" r="2" />
                <circle cx="18" cy="18" r="2" />
              </svg>
              Particles
            </button>
            <button
              id="btnToggleGlow"
              type="button"
              className={`sim-btn ${glowActive ? 'active' : ''}`}
              title="Toggle Specular Glow"
              onClick={toggleGlow}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Shader Glow
            </button>
            <button
              id="btnResetCamera"
              type="button"
              className="sim-btn"
              title="Reset Viewport Perspective"
              onClick={resetCamera}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <polyline points="3 3 3 8 8 8" />
              </svg>
              Reset View
            </button>
          </div>
        </div>

        {/* Viewport Canvas Container */}
        <div className="sim-viewport-wrap">
          <div
            id="threejs-simulator-container"
            ref={containerRef}
            className="sim-canvas-container"
          />

          {/* Live Telemetry HUD Overlays */}
          <div className="sim-hud top-left">
            <span className="hud-label">GEOMETRY</span>
            <span className="hud-value">Proc-Bioluminescent Mesh</span>
          </div>
          <div className="sim-hud top-right">
            <span className="hud-label">ENGINE</span>
            <span className="hud-value">THREE.JS / WEBGL 2.0</span>
          </div>
          <div className="sim-hud bottom-left">
            <span className="hud-item">
              <span className="hud-label">FPS:</span> <span className="hud-num" id="hudFps">{fps}</span>
            </span>
            <span className="hud-item">
              <span className="hud-label">VERTICES:</span> <span className="hud-num">124K</span>
            </span>
            <span className="hud-item">
              <span className="hud-label">DRAWCALLS:</span> <span className="hud-num">18</span>
            </span>
          </div>
          <div className="sim-hud bottom-right">
            <span className="hud-tag">DRAG TO ROTATE 3D • SCROLL TO ZOOM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
