import { useEffect, useRef } from "react";
import * as THREE from "three";

const ParticleBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check WebGL support
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return; // Fallback to CSS gradient

    // Check reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Check mobile
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 200 : 600;
    const LINE_THRESHOLD = isMobile ? 80 : 120;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Get theme colors
    const getColors = () => {
      const isDark = document.documentElement.getAttribute("data-theme") !== "light";
      return {
        particle: isDark ? 0xffffff : 0x333333,
        line: isDark ? 0xe8650a : 0xe8650a,
        particleOpacity: isDark ? 0.6 : 0.4,
        lineOpacity: isDark ? 0.3 : 0.2,
      };
    };

    // Particles
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.05
        )
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const colors = getColors();
    const pointMaterial = new THREE.PointsMaterial({
      color: colors.particle,
      size: 2,
      transparent: true,
      opacity: colors.particleOpacity,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, pointMaterial);
    scene.add(points);

    // Lines geometry (updated each frame)
    const lineGeometry = new THREE.BufferGeometry();
    const maxLines = PARTICLE_COUNT * 3;
    const linePositions = new Float32Array(maxLines * 6);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({
        color: colors.line,
        transparent: true,
        opacity: colors.lineOpacity,
      })
    );
    scene.add(lineMaterial);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Animation loop
    let lineCount = 0;
    const posArray = geometry.attributes.position.array as Float32Array;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Update particle positions
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Wrap around
        if (posArray[i * 3] > 300) posArray[i * 3] = -300;
        if (posArray[i * 3] < -300) posArray[i * 3] = 300;
        if (posArray[i * 3 + 1] > 200) posArray[i * 3 + 1] = -200;
        if (posArray[i * 3 + 1] < -200) posArray[i * 3 + 1] = 200;
      }
      geometry.attributes.position.needsUpdate = true;

      // Draw lines between nearby particles
      lineCount = 0;
      const lp = lineGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT && lineCount < maxLines - 1; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT && lineCount < maxLines - 1; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < LINE_THRESHOLD) {
            lp[lineCount * 6] = posArray[i * 3];
            lp[lineCount * 6 + 1] = posArray[i * 3 + 1];
            lp[lineCount * 6 + 2] = posArray[i * 3 + 2];
            lp[lineCount * 6 + 3] = posArray[j * 3];
            lp[lineCount * 6 + 4] = posArray[j * 3 + 1];
            lp[lineCount * 6 + 5] = posArray[j * 3 + 2];
            lineCount++;
          }
        }
      }
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineCount * 2);

      // Slow Y-axis rotation + mouse parallax
      points.rotation.y += 0.0005;
      points.rotation.x += 0.0002;
      lineMaterial.rotation.y = points.rotation.y;
      lineMaterial.rotation.x = points.rotation.x;

      // Camera parallax
      camera.position.x += (mouseX * 20 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 15 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Theme change listener
    const observer = new MutationObserver(() => {
      const c = getColors();
      (pointMaterial as THREE.PointsMaterial).color.setHex(c.particle);
      (pointMaterial as THREE.PointsMaterial).opacity = c.particleOpacity;
      (lineMaterial.material as THREE.LineBasicMaterial).color.setHex(c.line);
      (lineMaterial.material as THREE.LineBasicMaterial).opacity = c.lineOpacity;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      renderer.dispose();
      geometry.dispose();
      lineGeometry.dispose();
      pointMaterial.dispose();
      (lineMaterial.material as THREE.LineBasicMaterial).dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
