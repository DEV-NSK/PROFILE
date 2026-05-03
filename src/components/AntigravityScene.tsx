import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";

// Extend to register materials properly
extend({
  MeshStandardMaterial: THREE.MeshStandardMaterial,
  PointsMaterial: THREE.PointsMaterial,
});

const FloatingShape = ({
  position,
  geometry,
  color,
  speed,
  scale,
}: {
  position: [number, number, number];
  geometry: "sphere" | "torus" | "octahedron" | "icosahedron" | "torusKnot" | "dodecahedron";
  color: string;
  speed: number;
  scale: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.4;
    meshRef.current.position.x = position[0] + Math.cos(t * speed * 0.5 + position[2]) * 0.2;
    meshRef.current.rotation.x = t * speed * 0.3;
    meshRef.current.rotation.z = t * speed * 0.2;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "sphere": return <sphereGeometry args={[1, 32, 32]} />;
      case "torus": return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case "octahedron": return <octahedronGeometry args={[1, 0]} />;
      case "icosahedron": return <icosahedronGeometry args={[1, 0]} />;
      case "torusKnot": return <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />;
      case "dodecahedron": return <dodecahedronGeometry args={[1, 0]} />;
    }
  }, [geometry]);

  const mat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color,
      transparent: true,
      opacity: 0.12,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
    });
  }, [color]);

  return (
    <mesh ref={meshRef} position={position} scale={scale} material={mat}>
      {geo}
    </mesh>
  );
};

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 400;

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return [pos];
  }, []);

  const pointsMat = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.03,
      color: "#00d4ff",
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef} material={pointsMat}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
    </points>
  );
};

const MouseLight = () => {
  const lightRef = useRef<THREE.PointLight>(null!);
  const { viewport } = useThree();

  useFrame((state) => {
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    lightRef.current.position.set(x, y, 3);
  });

  return <pointLight ref={lightRef} color="#00d4ff" intensity={2} distance={8} />;
};

const Scene = () => {
  const shapes = useMemo(
    () => [
      { position: [-5, 2, -3] as [number, number, number], geometry: "torusKnot" as const, color: "#00d4ff", speed: 0.4, scale: 0.5 },
      { position: [5, -1, -4] as [number, number, number], geometry: "icosahedron" as const, color: "#7c3aed", speed: 0.6, scale: 0.7 },
      { position: [-3, -3, -2] as [number, number, number], geometry: "octahedron" as const, color: "#00d4ff", speed: 0.5, scale: 0.6 },
      { position: [4, 3, -5] as [number, number, number], geometry: "torus" as const, color: "#7c3aed", speed: 0.3, scale: 0.5 },
      { position: [0, 4, -6] as [number, number, number], geometry: "dodecahedron" as const, color: "#00d4ff", speed: 0.35, scale: 0.4 },
      { position: [-6, 0, -4] as [number, number, number], geometry: "sphere" as const, color: "#7c3aed", speed: 0.45, scale: 0.8 },
      { position: [6, 1, -3] as [number, number, number], geometry: "icosahedron" as const, color: "#00d4ff", speed: 0.55, scale: 0.5 },
      { position: [2, -4, -5] as [number, number, number], geometry: "dodecahedron" as const, color: "#7c3aed", speed: 0.4, scale: 0.4 },
      { position: [-2, 3, -7] as [number, number, number], geometry: "torusKnot" as const, color: "#00d4ff", speed: 0.3, scale: 0.35 },
      { position: [3, -2, -2] as [number, number, number], geometry: "icosahedron" as const, color: "#7c3aed", speed: 0.5, scale: 0.45 },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#00d4ff" />
      <directionalLight position={[-5, -5, 5]} intensity={0.2} color="#7c3aed" />
      <MouseLight />
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}
      <ParticleField />
      <fog attach="fog" args={["#0a0b14", 5, 25]} />
    </>
  );
};

const AntigravityScene = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default AntigravityScene;
