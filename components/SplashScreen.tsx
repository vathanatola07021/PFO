'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ProfileData } from '@/data/portfolioData';

interface SplashScreenProps {
  profile: ProfileData;
}

const LOG_MESSAGES = [
  "Mounting virtual camera & perspective projection...",
  "Compiling vertex & fragment GLSL shaders...",
  "Instantiating icosahedron lattice & orbital gyroscopes...",
  "Calibrating cosmic starfield & nebula particle velocity...",
  "Connecting telemetry stream and distributed node mesh...",
  "Synchronizing profile tokens & developer telemetry...",
  "System fully synchronized. Launching workspace..."
];

export default function SplashScreen({ profile }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING THREE.JS WEBGL ENGINE...");
  const [logText, setLogText] = useState(LOG_MESSAGES[0]);
  const [isReady, setIsReady] = useState(false);
  const [flashActive, setFlashActive] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hasLaunchedRef = useRef(false);
  const progressRef = useRef(0);
  const progressRafRef = useRef<number | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Trigger launch transition into main portfolio workspace
  const triggerLaunch = () => {
    if (hasLaunchedRef.current) return;
    hasLaunchedRef.current = true;

    if (progressRafRef.current) {
      cancelAnimationFrame(progressRafRef.current);
      progressRafRef.current = null;
    }

    setFlashActive(true);

    setTimeout(() => {
      setIsDismissed(true);
      document.body.style.overflow = '';

      setTimeout(() => {
        setFlashActive(false);
        setIsVisible(false);

        // Cancel splash WebGL render loop
        if (animFrameIdRef.current) {
          cancelAnimationFrame(animFrameIdRef.current);
          animFrameIdRef.current = null;
        }

        window.dispatchEvent(new CustomEvent('splashComplete'));
      }, 350);
    }, 280);
  };

  const updateProgress = (val: number) => {
    const clamped = Math.min(100, Math.max(0, val));
    progressRef.current = clamped;
    setProgress(clamped);

    const logIdx = Math.min(LOG_MESSAGES.length - 1, Math.floor((clamped / 100) * LOG_MESSAGES.length));
    setLogText(LOG_MESSAGES[logIdx]);

    if (clamped >= 100 && !hasLaunchedRef.current) {
      setStatusText("INITIALIZATION COMPLETE // SYSTEM READY");
      setIsReady(true);
      setTimeout(triggerLaunch, 450);
    }
  };

  // Run the multi-stage boot sequence
  const startBootSequence = () => {
    hasLaunchedRef.current = false;
    setIsDismissed(false);
    setIsVisible(true);
    setIsReady(false);
    setStatusText("INITIALIZING THREE.JS WEBGL ENGINE...");
    document.body.style.overflow = 'hidden';

    const TOTAL_DURATION_MS = 3800;
    let startTime: number | null = null;

    const runProgressLoop = (timestamp: number) => {
      if (hasLaunchedRef.current) return;
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(1, elapsed / TOTAL_DURATION_MS);

      let calculated: number;
      if (t < 0.15) {
        calculated = (t / 0.15) * 20;
      } else if (t < 0.55) {
        const subT = (t - 0.15) / 0.40;
        calculated = 20 + subT * 46;
      } else if (t < 0.85) {
        const subT = (t - 0.55) / 0.30;
        calculated = 66 + subT * 26;
      } else {
        const subT = (t - 0.85) / 0.15;
        calculated = 92 + subT * 8;
      }

      updateProgress(calculated);

      if (t < 1 && !hasLaunchedRef.current) {
        progressRafRef.current = requestAnimationFrame(runProgressLoop);
      } else {
        updateProgress(100);
      }
    };

    if (progressRafRef.current) cancelAnimationFrame(progressRafRef.current);
    progressRafRef.current = requestAnimationFrame(runProgressLoop);
  };

  useEffect(() => {
    // Prevent background scrolling while splash is active
    document.body.style.overflow = 'hidden';

    // Start boot sequence once on mount
    startBootSequence();

    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      updateProgress(100);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b14, 0.035);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8.5;

    // Cinematic Lights
    const ambient = new THREE.AmbientLight(0x152238, 2.2);
    scene.add(ambient);

    const cyanLight = new THREE.PointLight(0x00f5ff, 6, 25);
    cyanLight.position.set(4, 3, 5);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b7bff, 5, 25);
    violetLight.position.set(-4, -3, 4);
    scene.add(violetLight);

    // Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Faceted Cyber Core Mesh
    const coreGeo = new THREE.IcosahedronGeometry(1.3, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x07152b,
      emissive: 0x004369,
      emissiveIntensity: 0.85,
      roughness: 0.15,
      metalness: 0.9,
      flatShading: true,
      transparent: true,
      opacity: 0.88
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // 2. Wireframe Cage Outer Layer
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const wireMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.38, 1), wireMat);
    coreGroup.add(wireMesh);

    // 3. Dual Holographic Gyro Rings
    const ringGeo1 = new THREE.TorusGeometry(2.2, 0.016, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.65 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.6;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.6, 0.014, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8b7bff, transparent: true, opacity: 0.55 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    coreGroup.add(ring2);

    // 4. Fibonacci Lattice Particle Vertices & Connections
    const nodeCount = 44;
    const nodePoints: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (2 * (i + 0.5)) / nodeCount;
      const r = Math.sqrt(1 - y * y);
      const theta = i * 2.39996;
      nodePoints.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(2.1));
    }

    const lineCoords: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePoints[i].distanceTo(nodePoints[j]) < 1.35) {
          lineCoords.push(nodePoints[i], nodePoints[j]);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(lineCoords);
    const lineMesh = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        color: 0x5b8cff,
        transparent: true,
        opacity: 0.35
      })
    );
    coreGroup.add(lineMesh);

    const pGeo = new THREE.BufferGeometry().setFromPoints(nodePoints);
    const pMat = new THREE.PointsMaterial({ color: 0x00f5ff, size: 0.09, transparent: true, opacity: 0.95 });
    const pMesh = new THREE.Points(pGeo, pMat);
    coreGroup.add(pMesh);

    // 5. Deep Space Particle Field
    const starCount = 500;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 35;
      starPositions[i + 1] = (Math.random() - 0.5) * 35;
      starPositions[i + 2] = (Math.random() - 0.5) * 25;
    }
    const starGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x7aa7ff, size: 0.035, transparent: true, opacity: 0.65 });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Touch & Pointer Physics
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevPos = { x: 0, y: 0 };

    const handlePointerMove = (clientX: number, clientY: number) => {
      const xNorm = clientX / window.innerWidth - 0.5;
      const yNorm = clientY / window.innerHeight - 0.5;
      if (!isDragging) {
        targetRotY = xNorm * 0.75;
        targetRotX = yNorm * 0.75;
      } else {
        const deltaX = clientX - prevPos.x;
        const deltaY = clientY - prevPos.y;
        coreGroup.rotation.y += deltaX * 0.007;
        coreGroup.rotation.x += deltaY * 0.007;
      }
      prevPos = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: PointerEvent) => handlePointerMove(e.clientX, e.clientY);
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPos = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onResize = () => {
      if (hasLaunchedRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();

    const animate = () => {
      if (hasLaunchedRef.current) return;
      animFrameIdRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      coreMesh.rotation.y += delta * 0.35;
      coreMesh.rotation.x = Math.sin(time * 0.4) * 0.15;
      wireMesh.rotation.y -= delta * 0.25;

      ring1.rotation.z += delta * 0.45;
      ring1.rotation.x = Math.PI / 2.6 + Math.sin(time * 0.7) * 0.12;

      ring2.rotation.z -= delta * 0.3;
      ring2.rotation.y = Math.PI / 3 + Math.cos(time * 0.6) * 0.15;

      starField.rotation.y = time * 0.012;

      if (!isDragging) {
        coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.06;
        coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.06;
      }

      const currentProg = progressRef.current;
      const pulse = 1.0 + Math.sin(time * 2.2) * 0.025 + (currentProg / 100) * 0.06;
      coreGroup.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    // Keyboard shortcuts (Escape, Enter, Space) to bypass
    const onKeyDown = (e: KeyboardEvent) => {
      if (!hasLaunchedRef.current && (e.key === 'Escape' || e.key === 'Enter' || e.code === 'Space')) {
        updateProgress(100);
        triggerLaunch();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Global replay hook for footer / drawer button
    (window as any).replaySplashScreen = () => {
      startBootSequence();
    };

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (progressRafRef.current) cancelAnimationFrame(progressRafRef.current);
      renderer.dispose();
    };
  }, []); // Run once on mount!

  if (!isVisible) return null;

  return (
    <>
      <aside
        id="splash-screen"
        className={isDismissed ? 'dismissed' : ''}
        style={isDismissed ? { display: 'none' } : undefined}
        aria-label="System Initialization Splash Screen"
      >
        <canvas id="splash-webgl" ref={canvasRef} aria-label="3D Quantum Core background" />
        <div className="splash-crt-overlay" aria-hidden="true" />

        {/* Precision Corner Brackets */}
        <div className="splash-corner-bracket splash-cb-tl" aria-hidden="true" />
        <div className="splash-corner-bracket splash-cb-tr" aria-hidden="true" />
        <div className="splash-corner-bracket splash-cb-bl" aria-hidden="true" />
        <div className="splash-corner-bracket splash-cb-br" aria-hidden="true" />

        {/* Top Telemetry HUD */}
        <header className="splash-top-telemetry" aria-label="System status telemetry">
          <div className="splash-telemetry-item">
            <div className="splash-pulse-dot" />
            <span>SYS.KERNEL v4.2 // NOMINAL</span>
          </div>
          <div className="splash-telemetry-item">
            <span>MEM: 64MB / SHADER ACTIVE</span>
          </div>
          <div className="splash-telemetry-item">
            <span>LATENCY: 1.4ms</span>
          </div>
        </header>

        {/* Main Center Container */}
        <div className="splash-container">
          <div className="splash-content">
            {/* 3D Holographic Emblem */}
            <div className="splash-emblem-wrapper">
              <div className="splash-emblem-aura" />
              <div className="splash-emblem-ring-outer" />
              <div className="splash-emblem-ring-inner" />
              <div className="splash-emblem-core">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
            </div>

            {/* Identity Title & Role Subtitle */}
            <h1 className="splash-brand-title">{profile.fullName.toUpperCase()} // OS</h1>
            <div className="splash-brand-subtitle">{profile.roleTitle || "Interactive 3D Portfolio & Mission Control"}</div>

            {/* System Initialization Card */}
            <div className="splash-init-card">
              <div className="splash-progress-header">
                <div className="splash-status-indicator">
                  <svg className="splash-spin-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  <span id="splash-status-label" style={{ color: isReady ? '#5ef2b4' : undefined }}>{statusText}</span>
                </div>
                <div className="splash-progress-percent" id="splash-pct-label">{Math.floor(progress)}%</div>
              </div>

              {/* Progress Track */}
              <div
                className="splash-progress-track"
                role="progressbar"
                aria-valuenow={Math.floor(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                id="splash-progress-track"
              >
                <div
                  className="splash-progress-fill"
                  id="splash-progress-bar"
                  style={{ width: `${progress}%` }}
                >
                  <div className="splash-progress-glow-head" />
                </div>
              </div>

              {/* Terminal Stream Ticker */}
              <div className="splash-terminal-stream">
                <div className="splash-stream-text">
                  <span style={{ color: '#00f5ff' }}>$ </span>
                  <span id="splash-log-text">{logText}</span>
                  <span className="splash-terminal-cursor" />
                </div>
                <div className="splash-system-speed">60 FPS // GPU SYNC</div>
              </div>
            </div>

            {/* Action Controls */}
            <div className="splash-action-area">
              <button
                className={`splash-enter-btn ${isReady ? 'ready' : ''}`}
                id="splash-enter-btn"
                type="button"
                aria-label="Enter Workspace"
                onClick={(e) => {
                  e.preventDefault();
                  updateProgress(100);
                  triggerLaunch();
                }}
              >
                <span>{isReady ? 'LAUNCHING WORKSPACE...' : 'ENTER WORKSPACE'}</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                className="splash-skip-btn"
                id="splash-skip-btn"
                type="button"
                aria-label="Skip splash screen"
                onClick={(e) => {
                  e.preventDefault();
                  updateProgress(100);
                  triggerLaunch();
                }}
              >
                SKIP INTRO [ESC]
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Telemetry HUD */}
        <footer className="splash-bottom-telemetry" aria-label="System bottom telemetry">
          <div className="splash-hud-meta-left">
            <span>BUILD: 2026.10-REL</span>
            <span>LOC: {profile.location || "CAMBODIA // 11.5564° N, 104.9282° E"}</span>
          </div>
          <div className="splash-interactive-hint">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
            <span>INTERACTIVE 3D VIEWPORT // DRAG TO ROTATE CORE</span>
          </div>
          <div className="splash-hud-meta-right">
            <span>SYSTEM: ONLINE // NOMINAL</span>
          </div>
        </footer>
      </aside>

      <div
        id="splash-flash-curtain"
        className={flashActive ? 'active' : ''}
        aria-hidden="true"
        style={!flashActive ? { transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)' } : undefined}
      />
    </>
  );
}
