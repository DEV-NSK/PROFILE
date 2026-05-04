import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const categories = [
  {
    icon: "</>",
    title: "Frontend",
    skills: [
      { name: "HTML5", level: "advanced" },
      { name: "CSS3", level: "advanced" },
      { name: "JavaScript (ES6+)", level: "intermediate" },
      { name: "React.js", level: "intermediate" },
      { name: "Tailwind CSS", level: "intermediate" },
      { name: "Responsive Design", level: "advanced" },
    ],
  },
  {
    icon: "⚙️",
    title: "Backend",
    skills: [
      { name: "Django", level: "intermediate" },
      { name: "Python", level: "intermediate" },
      { name: "Node.js", level: "intermediate" },
      { name: "Express.js", level: "intermediate" },
      { name: "REST APIs", level: "intermediate" },
      { name: "Django ORM", level: "intermediate" },
    ],
  },
  {
    icon: "🛠",
    title: "Tools & Dev",
    skills: [
      { name: "Git", level: "advanced" },
      { name: "GitHub", level: "advanced" },
      { name: "VS Code", level: "advanced" },
      { name: "Vercel", level: "advanced" },
      { name: "Postman", level: "intermediate" },
      { name: "npm", level: "advanced" },
    ],
  },
  {
    icon: "📚",
    title: "CS Fundamentals",
    skills: [
      { name: "Data Structures", level: "intermediate" },
      { name: "Algorithms", level: "intermediate" },
      { name: "OOP", level: "intermediate" },
      { name: "DBMS", level: "beginner" },
      { name: "PostgreSQL", level: "intermediate" },
      { name: "MongoDB", level: "intermediate" },
    ],
  },
  {
    icon: "🚀",
    title: "Currently Learning",
    skills: [
      { name: "Async JS", level: "learning" },
      { name: "Higher-Order Functions", level: "learning" },
      { name: "Python DSA", level: "learning" },
      { name: "System Design", level: "learning" },
      { name: "OpenAI API", level: "learning" },
    ],
  },
];

const levelColors: Record<string, string> = {
  advanced: "rgba(232,101,10,0.9)",
  intermediate: "rgba(232,101,10,0.65)",
  beginner: "rgba(232,101,10,0.4)",
  learning: "rgba(100,180,255,0.8)",
};

const levelBg: Record<string, string> = {
  advanced: "rgba(232,101,10,0.15)",
  intermediate: "rgba(232,101,10,0.1)",
  beginner: "rgba(232,101,10,0.06)",
  learning: "rgba(100,180,255,0.1)",
};

const SkillCard = ({
  cat,
  index,
}: {
  cat: (typeof categories)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
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
        (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px var(--glow-light)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl" aria-hidden="true">
          {cat.icon}
        </span>
        <h3
          className="font-heading font-bold text-lg"
          style={{ color: "var(--text)" }}
        >
          {cat.title}
        </h3>
      </div>

      {/* Skill tags */}
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
              <span
                className="ml-1 text-xs"
                style={{ color: "rgba(100,180,255,0.8)" }}
              >
                ✦
              </span>
            )}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => (
  <section id="skills" className="section-padding max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="text-center mb-16">
        <span className="section-tag">// what I know</span>
        <h2
          className="font-display font-bold text-3xl md:text-5xl"
          style={{ color: "var(--text)" }}
        >
          Skills &{" "}
          <span className="gradient-text">Stack</span>
        </h2>
        <p className="mt-3 text-sm font-mono" style={{ color: "var(--text-muted)" }}>
          <span style={{ color: "rgba(232,101,10,0.9)" }}>■</span> Advanced &nbsp;
          <span style={{ color: "rgba(232,101,10,0.65)" }}>■</span> Intermediate &nbsp;
          <span style={{ color: "rgba(232,101,10,0.4)" }}>■</span> Beginner &nbsp;
          <span style={{ color: "rgba(100,180,255,0.8)" }}>✦</span> Learning
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <SkillCard key={cat.title} cat={cat} index={i} />
        ))}
      </div>
    </motion.div>
  </section>
);

export default SkillsSection;
