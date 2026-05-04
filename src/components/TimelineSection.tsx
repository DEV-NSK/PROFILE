import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HiAcademicCap, HiBriefcase, HiStar } from "react-icons/hi";

const timelineItems = [
  {
    type: "education",
    icon: HiAcademicCap,
    year: "2023 – 2026",
    title: "B.Tech, Computer Science & Engineering",
    org: "St. Mary's Integrated Campus",
    location: "Deshmukhi",
    cgpa: "CGPA: 7.6",
    bullets: [
      "Key focus: Software development, DSA, full-stack applications, placement preparation",
      "Built production-grade projects including a full-stack Job Portal with AI integration",
    ],
  },
  {
    type: "internship",
    icon: HiBriefcase,
    year: "2024 – 2025",
    title: "Full-Stack Developer Intern",
    org: "Self-Directed Projects & Freelance",
    location: "Remote",
    cgpa: null,
    bullets: [
      "Built and deployed multiple full-stack web applications using React.js, Django, and Node.js",
      "Integrated OpenAI API for AI-driven features including resume matching and mock interviews",
      "Developed REST APIs, implemented JWT authentication, and managed PostgreSQL databases",
    ],
  },
  {
    type: "achievement",
    icon: HiStar,
    year: "2023 – Present",
    title: "Peer Teacher & Self-Learner",
    org: "St. Mary's Integrated Campus",
    location: "Hyderabad",
    cgpa: null,
    bullets: [
      "Peer teacher for Python and frontend development among classmates",
      "Continuously learning: Async JS, Higher-Order Functions, Python DSA, System Design",
      "Active on GitHub with consistent project contributions and open-source learning",
    ],
  },
];

const typeColors: Record<string, string> = {
  education: "var(--primary)",
  internship: "#60a5fa",
  achievement: "#a78bfa",
};

const TimelineSection = () => {
  const lineRef = useRef<SVGLineElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          line.classList.add("drawn");
        }
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
          <h2
            className="font-display font-bold text-3xl md:text-5xl"
            style={{ color: "var(--text)" }}
          >
            Experience &{" "}
            <span className="gradient-text">Education</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Animated SVG center line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px overflow-hidden" aria-hidden="true">
            <svg
              className="w-full h-full"
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              <line
                ref={lineRef}
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="var(--primary)"
                strokeWidth="2"
                strokeOpacity="0.4"
                className="timeline-line"
                style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
              />
            </svg>
            {/* Static fallback line */}
            <div
              className="absolute inset-0"
              style={{ background: "var(--border)", width: "1px" }}
            />
          </div>

          {timelineItems.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative mb-12 pl-16 md:pl-0 ${
                  isLeft ? "md:pr-[52%]" : "md:pl-[52%]"
                }`}
              >
                {/* Dot */}
                <div
                  className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-5 w-5 h-5 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: typeColors[item.type],
                    boxShadow: `0 0 12px ${typeColors[item.type]}60`,
                  }}
                  aria-hidden="true"
                >
                  <item.icon size={10} color="#fff" />
                </div>

                {/* Card */}
                <div
                  className="rounded-2xl p-6 transition-all duration-300"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = typeColors[item.type];
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${typeColors[item.type]}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span
                        className="font-mono text-xs font-medium"
                        style={{ color: typeColors[item.type] }}
                      >
                        {item.year}
                      </span>
                      <h3
                        className="font-heading font-bold text-lg mt-1"
                        style={{ color: "var(--text)" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="font-sans text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item.org} · {item.location}
                      </p>
                    </div>
                    {item.cgpa && (
                      <span
                        className="font-mono text-xs px-2.5 py-1 rounded-full shrink-0"
                        style={{
                          background: "rgba(232,101,10,0.1)",
                          color: "var(--primary)",
                          border: "1px solid rgba(232,101,10,0.2)",
                        }}
                      >
                        {item.cgpa}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {item.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="font-sans text-sm leading-relaxed flex gap-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <span style={{ color: "var(--primary)", marginTop: "2px" }}>▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default TimelineSection;
