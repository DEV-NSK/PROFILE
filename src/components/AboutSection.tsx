import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { target: 5, suffix: "+", label: "Projects Built" },
  { target: 3, suffix: "+", label: "Tech Stacks" },
  { target: 1000, suffix: "+", label: "Lines of Code" },
  { target: 2, suffix: "", label: "Internships" },
];

const useCounter = (target: number, duration = 1500, started: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);

  return count;
};

const StatCard = ({
  stat,
  started,
}: {
  stat: (typeof stats)[0];
  started: boolean;
}) => {
  const count = useCounter(stat.target, 1500, started);
  return (
    <div className="text-center">
      <div
        className="font-display font-bold text-3xl md:text-4xl"
        style={{ color: "var(--primary)" }}
      >
        {count}
        {stat.suffix}
      </div>
      <div
        className="font-sans text-sm mt-1"
        style={{ color: "var(--text-muted)" }}
      >
        {stat.label}
      </div>
    </div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-padding max-w-7xl mx-auto" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="section-tag">// who I am</span>
          <h2
            className="font-display font-bold text-3xl md:text-5xl"
            style={{ color: "var(--text)" }}
          >
            About <span className="gradient-text">Me</span>
          </h2>
          <p
            className="font-sans italic mt-3 text-base"
            style={{ color: "var(--text-muted)" }}
          >
            "Building software that reflects real-world standards, one project at a time."
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            {/* Angled border frame */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "var(--primary)",
                transform: "rotate(3deg) scale(0.97)",
                opacity: 0.15,
              }}
              aria-hidden="true"
            />
            <div
              className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden"
              style={{
                border: "1px solid var(--border)",
                boxShadow: "0 0 40px var(--glow-light)",
              }}
            >
              <img
                src="/profile.jpg"
                alt="Bathula Naga Sai Kiran"
                className="w-full h-full object-cover object-top"
              />
              {/* Orange glow overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(232,101,10,0.08) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl font-mono text-xs font-medium"
              style={{
                background: "var(--primary)",
                color: "#fff",
                boxShadow: "0 4px 20px var(--glow)",
              }}
            >
              Open to Work 🚀
            </motion.div>
          </motion.div>

          {/* RIGHT — Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-5 mb-10">
              <p className="font-sans text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                I'm a final-year Computer Science and Engineering student at{" "}
                <span style={{ color: "var(--text)", fontWeight: 600 }}>
                  St. Mary's Integrated Campus
                </span>
                , graduating in May 2026. My journey in tech started with a simple curiosity about
                how websites work — that curiosity turned into a disciplined pursuit of full-stack
                development.
              </p>
              <p className="font-sans text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Over the past two years, I've gone from building static HTML pages to developing a
                multi-role{" "}
                <span style={{ color: "var(--text)", fontWeight: 600 }}>
                  Job Portal & Talent Platform
                </span>{" "}
                using React.js and Django — complete with AI-driven career tools, job seeker flows,
                employer dashboards, and an admin panel. I don't just build features; I think about
                UX, data flow, and how a product feels to use.
              </p>
              <p className="font-sans text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                I'm actively targeting{" "}
                <span style={{ color: "var(--primary)", fontWeight: 600 }}>SDE roles</span> starting
                mid-2026, with a preference for Bengaluru. My preparation covers DSA, system design
                fundamentals, core CS subjects, and continuous project improvement. I believe in
                building strong fundamentals and executing consistently.
              </p>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {stats.map((s) => (
                <StatCard key={s.label} stat={s} started={countersStarted} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
