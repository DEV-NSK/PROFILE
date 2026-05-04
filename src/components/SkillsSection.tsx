import { useRef, useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

// ─── Skill data ───────────────────────────────────────────────
const categories = [
  {
    id: "frontend",
    icon: "</>",
    title: "Frontend",
    color: "#E94560",
    skills: [
      { name: "React.js", level: "intermediate", years: 2 },
      { name: "HTML5", level: "advanced", years: 3 },
      { name: "CSS3", level: "advanced", years: 3 },
      { name: "JavaScript", level: "intermediate", years: 2 },
      { name: "TypeScript", level: "intermediate", years: 1 },
      { name: "Tailwind CSS", level: "intermediate", years: 2 },
    ],
  },
  {
    id: "backend",
    icon: "⚙️",
    title: "Backend",
    color: "#60a5fa",
    skills: [
      { name: "Django", level: "intermediate", years: 2 },
      { name: "Python", level: "intermediate", years: 2 },
      { name: "Node.js", level: "intermediate", years: 1 },
      { name: "Express.js", level: "intermediate", years: 1 },
      { name: "REST APIs", level: "intermediate", years: 2 },
      { name: "Django ORM", level: "intermediate", years: 2 },
    ],
  },
  {
    id: "database",
    icon: "🗄️",
    title: "Database",
    color: "#a78bfa",
    skills: [
      { name: "PostgreSQL", level: "intermediate", years: 1 },
      { name: "MongoDB", level: "intermediate", years: 1 },
      { name: "DBMS", level: "beginner", years: 1 },
    ],
  },
  {
    id: "tools",
    icon: "🛠",
    title: "Tools & DevOps",
    color: "#34d399",
    skills: [
      { name: "Git", level: "advanced", years: 3 },
      { name: "GitHub", level: "advanced", years: 3 },
      { name: "VS Code", level: "advanced", years: 3 },
      { name: "Vercel", level: "advanced", years: 2 },
      { name: "Postman", level: "intermediate", years: 2 },
    ],
  },
  {
    id: "learning",
    icon: "🚀",
    title: "Learning",
    color: "#fbbf24",
    skills: [
      { name: "Async JS", level: "learning", years: 0 },
      { name: "Python DSA", level: "learning", years: 0 },
      { name: "System Design", level: "learning", years: 0 },
      { name: "OpenAI API", level: "learning", years: 0 },
    ],
  },
];

const levelColors: Record<string, string> = {
  advanced: "#E94560",
  intermediate: "#c73652",
  beginner: "#a02a42",
  learning: "#d97706",
};

const levelBg: Record<string, string> = {
  advanced: "rgba(233,69,96,0.12)",
  intermediate: "rgba(233,69,96,0.09)",
  beginner: "rgba(233,69,96,0.06)",
  learning: "rgba(217,119,6,0.1)",
};

// ─── 3D Skill Orb ─────────────────────────────────────────────
interface OrbProps {
  skill: { name: string; level: string; years: number };
  position: [number, number, number];
  color: string;
  phaseOffset: number;
}

const SkillOrb = ({ skill, position, color, phaseOffset }: OrbProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime + phaseOffset;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
    if (hovered) meshRef.current.rotation.y += 0.03;
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.5, 16, 16]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.9 : 0.55}
          roughness={0.2}
          metalness={0.5}
          transparent
          opacity={0.95}
        />
      </Sphere>

      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.62, 0.025, 6, 24]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.9 : 0.4} />
      </mesh>

      {/* HTML label — always white text on dark canvas bg */}
      <Html
        position={[0, -0.9, 0]}
        center
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            color: hovered ? color : "#e0e0e0",
            whiteSpace: "nowrap",
            transition: "color 0.2s",
            textShadow: "0 1px 3px rgba(0,0,0,0.8)",
          }}
        >
          {skill.name}
          {hovered && skill.years > 0 && (
            <span style={{ color, marginLeft: 4 }}>· {skill.years}yr</span>
          )}
        </span>
      </Html>
    </group>
  );
};

const OrbScene = ({ skills, color }: { skills: (typeof categories)[0]["skills"]; color: string }) => {
  const cols = Math.min(skills.length, 4);
  const rows = Math.ceil(skills.length / cols);

  return (
    <>
      {/* Strong ambient so orbs are always visible regardless of theme */}
      <ambientLight intensity={1.2} />
      <pointLight position={[5, 5, 5]} intensity={2} color={color} />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 0, 8]} intensity={0.8} color="#ffffff" />

      {skills.map((skill, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = (col - (cols - 1) / 2) * 2.2;
        const y = rows === 1 ? 0 : (row - (rows - 1) / 2) * 2.2;
        return (
          <SkillOrb
            key={skill.name}
            skill={skill}
            position={[x, y, 0]}
            color={color}
            phaseOffset={i * 0.7}
          />
        );
      })}
    </>
  );
};

// ─── Skill Card (fallback / tag view) ─────────────────────────
const SkillCard = ({ cat, index }: { cat: (typeof categories)[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    };
    const handleLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    };
    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="tilt-card rounded-2xl p-6 transition-all duration-300"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = cat.color;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${cat.color}20`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
        <h3 className="font-heading font-bold text-lg" style={{ color: "var(--text)" }}>
          {cat.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill, i) => (
          <motion.span
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + i * 0.05 }}
            className="skill-tag"
            style={{
              color: levelColors[skill.level],
              background: levelBg[skill.level],
              borderColor: levelColors[skill.level] + "40",
            }}
          >
            {skill.name}
            {skill.level === "learning" && (
              <span className="ml-1 text-xs" style={{ color: "#d97706" }}>✦</span>
            )}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────
const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [view, setView] = useState<"orbs" | "tags">("tags");
  const [prevTab, setPrevTab] = useState(0);

  const handleTabChange = (i: number) => {
    setPrevTab(activeTab);
    setActiveTab(i);
  };

  const activeCat = categories[activeTab];

  return (
    <section id="skills" className="section-padding max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-12">
          <span className="section-tag">// what I know</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl" style={{ color: "var(--text)" }}>
            Skills & <span className="gradient-text">Stack</span>
          </h2>
          <p className="mt-3 text-sm font-mono" style={{ color: "var(--text-muted)" }}>
            <span style={{ color: "#E94560" }}>■</span> Advanced &nbsp;
            <span style={{ color: "#c73652" }}>■</span> Intermediate &nbsp;
            <span style={{ color: "#a02a42" }}>■</span> Beginner &nbsp;
            <span style={{ color: "#d97706" }}>✦</span> Learning
          </p>
        </div>

        {/* View toggle */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setView("tags")}
            className="font-mono text-xs px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: view === "tags" ? "#E94560" : "var(--surface)",
              color: view === "tags" ? "#fff" : "var(--text-muted)",
              border: `1px solid ${view === "tags" ? "#E94560" : "var(--border)"}`,
            }}
          >
            Tag View
          </button>
          <button
            onClick={() => setView("orbs")}
            className="font-mono text-xs px-4 py-2 rounded-full transition-all duration-200"
            style={{
              background: view === "orbs" ? "#E94560" : "var(--surface)",
              color: view === "orbs" ? "#fff" : "var(--text-muted)",
              border: `1px solid ${view === "orbs" ? "#E94560" : "var(--border)"}`,
            }}
          >
            3D Orb View
          </button>
        </div>

        {view === "tags" ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <SkillCard key={cat.title} cat={cat} index={i} />
            ))}
          </div>
        ) : (
          <div>
            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  onClick={() => handleTabChange(i)}
                  className="font-mono text-xs px-4 py-2 rounded-full transition-all duration-200"
                  style={{
                    background: activeTab === i ? cat.color : "var(--surface)",
                    color: activeTab === i ? "#fff" : "var(--text-muted)",
                    border: `1px solid ${activeTab === i ? cat.color : "var(--border)"}`,
                    boxShadow: activeTab === i ? `0 0 16px ${cat.color}40` : "none",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-1.5">{cat.icon}</span>
                  {cat.title}
                </motion.button>
              ))}
            </div>

            {/* 3D Canvas */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl overflow-hidden"
                style={{
                  height: "420px",
                  background: "#0D0D1A",
                  border: `1px solid ${activeCat.color}40`,
                  boxShadow: `0 0 40px ${activeCat.color}15, inset 0 0 60px rgba(0,0,0,0.3)`,
                }}
              >
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>
                      Loading 3D scene...
                    </div>
                  </div>
                }>
                  <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                    <OrbScene skills={activeCat.skills} color={activeCat.color} />
                  </Canvas>
                </Suspense>
              </motion.div>
            </AnimatePresence>

            <p className="text-center font-mono text-xs mt-3" style={{ color: "var(--text-muted)" }}>
              Hover orbs to see proficiency · Click to interact
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default SkillsSection;
