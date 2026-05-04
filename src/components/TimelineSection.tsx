import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiAcademicCap, HiBriefcase, HiStar, HiChevronDown } from "react-icons/hi";

const timelineItems = [
  {
    type: "education",
    icon: HiAcademicCap,
    year: "2023 – 2026",
    title: "B.Tech, Computer Science & Engineering",
    org: "St. Mary's Integrated Campus",
    location: "Deshmukhi",
    cgpa: "CGPA: 7.6",
    impact: "7.6",
    impactLabel: "CGPA",
    bullets: [
      "Graduated May 2026 — B.Tech in Computer Science & Engineering",
      "Key focus: Software development, DSA, full-stack applications, placement preparation",
      "Built production-grade projects including a full-stack Job Portal with AI integration",
    ],
    stack: ["Python", "Java", "DBMS", "OS", "CN", "DSA"],
  },
  {
    type: "internship",
    icon: HiBriefcase,
    year: "2024 – 2025",
    title: "Full-Stack Developer Intern",
    org: "Self-Directed Projects & Freelance",
    location: "Remote",
    cgpa: null,
    impact: "80+",
    impactLabel: "REST APIs Built",
    bullets: [
      "Built and deployed multiple full-stack web applications using React.js, Django, and Node.js",
      "Integrated OpenAI API for AI-driven features including resume matching and mock interviews",
      "Developed REST APIs, implemented JWT authentication, and managed PostgreSQL databases",
    ],
    stack: ["React.js", "Django", "Node.js", "PostgreSQL", "JWT", "OpenAI API"],
  },
  {
    type: "achievement",
    icon: HiStar,
    year: "2023 – Present",
    title: "Peer Teacher & Self-Learner",
    org: "St. Mary's Integrated Campus",
    location: "Hyderabad",
    cgpa: null,
    impact: "∞",
    impactLabel: "Learning",
    bullets: [
      "Peer teacher for Python and frontend development among classmates",
      "Continuously learning: Async JS, Higher-Order Functions, Python DSA, System Design",
      "Active on GitHub with consistent project contributions and open-source learning",
    ],
    stack: ["Async JS", "Python DSA", "System Design", "GitHub"],
  },
];

const typeColors: Record<string, string> = {
  education: "#E94560",
  internship: "#60a5fa",
  achievement: "#a78bfa",
};

interface TimelineCardProps {
  item: (typeof timelineItems)[0];
  index: number;
  isLeft: boolean;
}

const TimelineCard = ({ item, index, isLeft }: TimelineCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const color = typeColors[item.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60, rotateY: isLeft ? -15 : 15 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`relative mb-12 pl-16 md:pl-0 ${isLeft ? "md:pr-[52%]" : "md:pl-[52%]"}`}
      style={{ perspective: "1000px" }}
    >
      {/* Hexagonal node */}
      <div
        className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-5 z-10"
        aria-hidden="true"
      >
        {/* Sonar rings — pure CSS, no JS animation */}
        <div
          className="absolute inset-0 rounded-full sonar-ring"
          style={{ background: color, width: 40, height: 40, animationDelay: `${index * 0.5}s` }}
        />
        <div
          className="absolute inset-0 rounded-full sonar-ring"
          style={{ background: color, width: 40, height: 40, animationDelay: `${index * 0.5 + 0.6}s` }}
        />

        {/* Hexagon shape */}
        <div
          className="relative w-10 h-10 flex items-center justify-center"
          style={{
            background: color,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            boxShadow: `0 0 16px ${color}50`,
          }}
        >
          <item.icon size={16} color="#fff" />
        </div>
      </div>

      {/* Glass card */}
      <div
        className="rounded-2xl p-6 transition-all duration-300 cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${color}30`,
          boxShadow: `0 4px 24px rgba(0,0,0,0.2)`,
        }}
        onClick={() => setExpanded(!expanded)}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = color;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${color}20`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${color}30`;
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.2)";
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <span className="font-mono text-xs font-medium" style={{ color }}>
              {item.year}
            </span>
            <h3 className="font-heading font-bold text-lg mt-1" style={{ color: "var(--text)" }}>
              {item.title}
            </h3>
            <p className="font-sans text-sm" style={{ color: "var(--text-muted)" }}>
              {item.org} · {item.location}
            </p>
          </div>

          {/* Impact number */}
          <div className="text-right shrink-0">
            <div
              className="font-display font-bold text-2xl"
              style={{ color, textShadow: `0 0 20px ${color}60` }}
            >
              {item.impact}
            </div>
            <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              {item.impactLabel}
            </div>
          </div>
        </div>

        <ul className="space-y-1.5 mb-3">
          {item.bullets.map((b, bi) => (
            <li
              key={bi}
              className="font-sans text-sm leading-relaxed flex gap-2"
              style={{ color: "var(--text-muted)" }}
            >
              <span style={{ color, marginTop: "2px" }}>▸</span>
              {b}
            </li>
          ))}
        </ul>

        {/* Expand toggle */}
        <button
          className="flex items-center gap-1 font-mono text-xs transition-colors"
          style={{ color: "var(--text-muted)" }}
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse tech stack" : "Expand tech stack"}
        >
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <HiChevronDown size={14} />
          </motion.span>
          {expanded ? "Hide" : "Show"} tech stack
        </button>

        {/* Expandable tech stack */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-3 pt-3" style={{ borderTop: `1px solid ${color}20` }}>
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background: `${color}15`,
                      color,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const TimelineSection = () => {
  const lineRef = useRef<SVGLineElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) line.classList.add("drawn");
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="section-padding max-w-7xl mx-auto" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-16">
          <span className="section-tag">// my journey</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl" style={{ color: "var(--text)" }}>
            Experience & <span className="gradient-text">Education</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Gradient glow center line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px overflow-hidden" aria-hidden="true">
            <svg className="w-full h-full" style={{ position: "absolute", top: 0, left: 0 }}>
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E94560" />
                  <stop offset="50%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              <line
                ref={lineRef}
                x1="0" y1="0" x2="0" y2="100%"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeOpacity="0.6"
                className="timeline-line"
                style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
              />
            </svg>
            <div className="absolute inset-0" style={{ background: "var(--border)", width: "1px" }} />
          </div>

          {timelineItems.map((item, i) => (
            <TimelineCard
              key={item.title}
              item={item}
              index={i}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TimelineSection;
