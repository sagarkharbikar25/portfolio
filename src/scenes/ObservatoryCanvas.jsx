import React, { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferGeometry,
  Clock,
  Color,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TorusGeometry,
  WebGLRenderer,
} from 'three';

/**
 * Lazy-loaded procedural Three.js Observatory core.
 * Syncs camera dolly & ring spin with `scrollStateRef` (zero React state renders),
 * caps DPR (2 desktop / 1.5 mobile) & particles (1700 / 700 / 0 reduced motion),
 * and tears down cleanly on unmount or `webglcontextlost`.
 */
export default function ObservatoryCanvas({
  scrollStateRef,
  onReady,
  onFallback,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCompactViewport = window.innerWidth <= 768;

    let renderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: !isCompactViewport,
        powerPreference: 'high-performance',
      });
    } catch {
      onFallback?.();
      return undefined;
    }

    const getSize = () => ({
      width: container.clientWidth || window.innerWidth,
      height: container.clientHeight || window.innerHeight,
    });

    const { width, height } = getSize();
    const scene = new Scene();
    const camera = new PerspectiveCamera(60, width / height, 0.1, 1000);
    const baseZ = isCompactViewport ? 28 : 24;
    if (scrollStateRef?.current && scrollStateRef.current.z === 32) {
      scrollStateRef.current.z = baseZ;
    }
    camera.position.z = scrollStateRef?.current?.z ?? baseZ;

    renderer.setSize(width, height);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, isCompactViewport ? 1.5 : 2)
    );
    container.appendChild(renderer.domElement);

    const cosmicGroup = new Group();
    scene.add(cosmicGroup);

    // Outer cyan wireframe observatory shell
    const outerGeo = new IcosahedronGeometry(8.5, isCompactViewport ? 2 : 3);
    const outerMat = new MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.34,
      blending: AdditiveBlending,
    });
    const outerSphere = new Mesh(outerGeo, outerMat);
    cosmicGroup.add(outerSphere);

    const nodeMat = new PointsMaterial({
      color: 0x6fc4f2,
      size: 0.24,
      transparent: true,
      opacity: 0.85,
      blending: AdditiveBlending,
    });
    const outerNodes = new Points(outerGeo, nodeMat);
    cosmicGroup.add(outerNodes);

    // Inner violet core (kept small, <= 5% visual budget)
    const innerGeo = new IcosahedronGeometry(4.8, 2);
    const innerMat = new MeshBasicMaterial({
      color: 0x9d4edd,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      blending: AdditiveBlending,
    });
    const innerSphere = new Mesh(innerGeo, innerMat);
    cosmicGroup.add(innerSphere);

    // Orbital gyro rings (Cyan + Ice + subtle Gold astrolabe band)
    const ringGeo1 = new TorusGeometry(12.5, 0.045, 16, 120);
    const ringMat1 = new MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.62,
      blending: AdditiveBlending,
    });
    const ring1 = new Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.15;
    cosmicGroup.add(ring1);

    const ringGeo2 = new TorusGeometry(11.0, 0.038, 16, 120);
    const ringMat2 = new MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.42,
      blending: AdditiveBlending,
    });
    const ring2 = new Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI * 0.25;
    ring2.rotation.y = Math.PI * 0.45;
    cosmicGroup.add(ring2);

    // Additive orbital particle field (1700 desktop / 700 mobile / 0 reduced motion)
    const particleCount = reducedMotion ? 0 : isCompactViewport ? 700 : 1700;
    const particleGeo = new BufferGeometry();
    if (particleCount > 0) {
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const colorCyan = new Color(0x00f0ff);
      const colorIce = new Color(0x6fc4f2);
      const colorGold = new Color(0xffd700);

      for (let i = 0; i < particleCount; i += 1) {
        const i3 = i * 3;
        const radius = 9 + Math.random() * 25;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        const pick = Math.random();
        const tone = pick > 0.62 ? colorCyan : pick > 0.12 ? colorIce : colorGold;
        colors[i3] = tone.r;
        colors[i3 + 1] = tone.g;
        colors[i3 + 2] = tone.b;
      }

      particleGeo.setAttribute('position', new Float32BufferAttribute(positions, 3));
      particleGeo.setAttribute('color', new Float32BufferAttribute(colors, 3));
    }

    const particleMat = new PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: particleCount > 0 ? 0.85 : 0,
      blending: AdditiveBlending,
    });
    const particleSystem = new Points(particleGeo, particleMat);
    scene.add(particleSystem);

    let targetRotX = 0;
    let targetRotY = 0;
    let isInViewport = true;
    let isTabVisible = !document.hidden;
    let rafId = null;
    let disposed = false;

    const handlePointerMove = (e) => {
      if (reducedMotion) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotY = nx * 0.42;
      targetRotX = ny * 0.3;
    };

    const handleResize = () => {
      if (disposed) return;
      const next = getSize();
      camera.aspect = next.width / next.height;
      camera.updateProjectionMatrix();
      renderer.setSize(next.width, next.height);
      if (reducedMotion) renderer.render(scene, camera);
    };

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const disposeScene = () => {
      if (disposed) return;
      disposed = true;
      stopLoop();
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };

    const handleContextLost = (e) => {
      e.preventDefault();
      disposeScene();
      onFallback?.();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    const clock = new Clock();

    const renderFrame = () => {
      if (disposed || !isInViewport || !isTabVisible || reducedMotion) {
        rafId = null;
        return;
      }

      const t = clock.getElapsedTime();
      const scrollSpin = scrollStateRef?.current?.ringSpin ?? 0;
      const targetZ = scrollStateRef?.current?.z ?? baseZ;

      outerSphere.rotation.y = t * 0.12 + scrollSpin * 0.35;
      outerSphere.rotation.x = Math.sin(t * 0.08) * 0.15;
      outerNodes.rotation.copy(outerSphere.rotation);

      innerSphere.rotation.y = -t * 0.18 - scrollSpin * 0.25;
      innerSphere.rotation.z = Math.cos(t * 0.1) * 0.2;

      ring1.rotation.z = t * 0.08 + scrollSpin * 0.85;
      ring2.rotation.z = -t * 0.12 - scrollSpin * 0.65;

      particleSystem.rotation.y = t * 0.03 + scrollSpin * 0.1;
      particleSystem.rotation.x = t * 0.015;

      cosmicGroup.rotation.y += (targetRotY - cosmicGroup.rotation.y) * 0.05;
      cosmicGroup.rotation.x += (targetRotX - cosmicGroup.rotation.x) * 0.05;
      camera.position.x += (targetRotY * 2.2 - camera.position.x) * 0.04;
      camera.position.y += (-targetRotX * 1.6 - camera.position.y) * 0.04;
      camera.position.z += (targetZ - camera.position.z) * 0.09;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(renderFrame);
    };

    const startLoop = () => {
      if (disposed) return;
      if (reducedMotion) {
        renderer.render(scene, camera);
        onReady?.();
        return;
      }
      if (rafId === null && isInViewport && isTabVisible) {
        clock.getDelta();
        renderer.render(scene, camera);
        onReady?.();
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isInViewport = entries[0]?.isIntersecting ?? true;
        if (isInViewport) startLoop();
        else stopLoop();
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) startLoop();
      else stopLoop();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    startLoop();

    return () => {
      disposeScene();
    };
  }, [scrollStateRef, onReady, onFallback]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

