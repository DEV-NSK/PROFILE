import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { triggerConfetti } from "@/hooks/useEasterEggs";

const stats = [
  { target: 20, suffix: "+", label: "Projects Built" },
  { target: 10, suffix: "+", label: "Technologies" },
  { target: 3, suffix: "+", label: "Years Learning" },
  { target: 80, suffix: "+", label: "REST APIs" },
];

const useCounter = (target: number, duration = 1200, started: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
};

const StatCard = ({ stat, started, index }: { stat: typeof stats[0]; started: boolean; index: number }) => {
  const count = useCounter(stat.target, 1200, started);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="text-center py-3 px-2 rounded-xl"
      style={{ background: "rgba(233,69,96,0.06)", border: "1px solid rgba(233,69,96,0.14)" }}
    >
      <div className="font-display font-bold text-xl md:text-2xl" style={{ color: "#E94560" }}>
        {count}{stat.suffix}
      </div>
      <div className="font-mono text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
        {stat.label}
      </div>
    </motion.div>
  );
};

// ─── Interactive Photo ────────────────────────────────────────
const InteractivePhoto = ({
  photoClickCount,
  onPhotoClick,
  borderDrawn,
}: {
  photoClickCount: number;
  onPhotoClick: (e: React.MouseEvent) => void;
  borderDrawn: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  const tiltX = hovered ? (mousePos.y - 0.5) * -14 : 0;
  const tiltY = hovered ? (mousePos.x - 0.5) * 14 : 0;

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center items-center"
      style={{ perspective: "900px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cursor-following glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.4 }}
        style={{
          width: 340, height: 380,
          background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(233,69,96,0.22) 0%, transparent 70%)`,
          filter: "blur(24px)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      />

      {/* Spinning dashed ring */}
      <svg
        className="absolute pointer-events-none animate-spin-slow"
        style={{ width: "calc(100% + 36px)", height: "calc(100% + 36px)", top: -18, left: -18, opacity: hovered ? 0.65 : 0.25, transition: "opacity 0.3s" }}
        viewBox="0 0 100 100" fill="none" aria-hidden="true"
      >
        <circle cx="50" cy="50" r="48" stroke="url(#photoGrad2)" strokeWidth="0.7" strokeDasharray="6 3" />
        <defs>
          <linearGradient id="photoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E94560" />
            <stop offset="100%" stopColor="#0F3460" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3D tilting photo */}
      <motion.div
        animate={{ rotateX: tiltX, rotateY: tiltY, scale: hovered ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        style={{ transformStyle: "preserve-3d", width: 260, height: 300 }}
        onClick={onPhotoClick}
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        title="Click 5 times for a surprise! 🎉"
      >
        {/* Animated SVG border */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <rect x="1" y="1" width="98" height="98" rx="8" ry="8" fill="none"
            stroke="url(#aboutBorderGrad2)" strokeWidth="1.5" strokeDasharray="400"
            strokeDashoffset={borderDrawn ? 0 : 400}
            style={{ transition: "stroke-dashoffset 2s ease 0.3s" }}
          />
          <defs>
            <linearGradient id="aboutBorderGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E94560" />
              <stop offset="50%" stopColor="#0F3460" />
              <stop offset="100%" stopColor="#E94560" />
            </linearGradient>
          </defs>
        </svg>

        <img
          src="/profile.jpg"
          alt="Bathula Naga Sai Kiran"
          style={{
            width: 260, height: 300,
            objectFit: "cover", objectPosition: "top",
            display: "block",
            filter: hovered ? "brightness(1.08) saturate(1.15)" : "brightness(1) saturate(1)",
            transition: "filter 0.4s ease",
          }}
        />

        {/* Bottom gradient */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,26,0.75) 0%, transparent 55%)" }} aria-hidden="true" />

        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: `linear-gradient(${mousePos.x * 180}deg, rgba(233,69,96,0.1) 0%, transparent 60%)` }}
          aria-hidden="true"
        />

        {/* Name badge */}
        <div className="absolute bottom-3 left-3 right-3 rounded-xl px-3 py-2"
          style={{ background: "rgba(13,13,26,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(233,69,96,0.2)" }}>
          <p className="font-display font-bold text-xs" style={{ color: "#F0F0F0" }}>Bathula Naga Sai Kiran</p>
          <p className="font-mono text-xs mt-0.5" style={{ color: "#E94560" }}>Full-Stack Developer</p>
        </div>

        {/* Click hint */}
        <AnimatePresence>
          {photoClickCount > 0 && photoClickCount < 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="absolute top-2 right-2 font-mono text-xs px-2 py-1 rounded-full z-20"
              style={{ background: "rgba(233,69,96,0.9)", color: "#fff" }}
            >
              {5 - photoClickCount} more!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-3 -right-2 px-3 py-1.5 rounded-xl font-mono text-xs font-medium z-20"
        style={{ background: "#E94560", color: "#fff", boxShadow: "0 4px 16px rgba(233,69,96,0.5)" }}
      >
        Open to Work 🚀
      </motion.div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────
const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [photoClickCount, setPhotoClickCount] = useState(0);
  const [borderDrawn, setBorderDrawn] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setCountersStarted(true); setBorderDrawn(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePhotoClick = (e: React.MouseEvent) => {
    const newCount = photoClickCount + 1;
    setPhotoClickCount(newCount);
    if (newCount >= 5) { triggerConfetti(e.clientX, e.clientY); setPhotoClickCount(0); }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "4rem 1rem" }}
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(233,69,96,0.05)" }} aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "rgba(15,52,96,0.07)" }} aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="section-tag">// who I am</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl" style={{ color: "var(--text)" }}>
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-10 xl:gap-14 items-center">

          {/* LEFT — Photo + stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-5"
          >
            <InteractivePhoto
              photoClickCount={photoClickCount}
              onPhotoClick={handlePhotoClick}
              borderDrawn={borderDrawn}
            />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2.5 w-full">
              {stats.map((s, i) => (
                <StatCard key={s.label} stat={s} started={countersStarted} index={i} />
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            {/* Name + role */}
            <div className="mb-5">
              <h3 className="font-display font-bold text-2xl md:text-3xl mb-1" style={{ color: "var(--text)" }}>
                Bathula Naga Sai Kiran
              </h3>
              <p className="font-mono text-sm" style={{ color: "#E94560" }}>
                B.Tech CSE Graduate · Full-Stack Developer
              </p>
            </div>

            {/* Bio — flowing paragraphs, no bullet points */}
            <div className="space-y-4 mb-5">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="font-sans text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                I'm <span style={{ color: "var(--text)", fontWeight: 600 }}>Bathula Naga Sai Kiran</span>, a B.Tech graduate and aspiring software developer focused on building practical, user-centered digital products. My journey started with curiosity about how websites and applications work, and that curiosity grew into a strong interest in problem-solving, clean code, and continuous learning.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="font-sans text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                I enjoy turning ideas into real projects — from designing responsive interfaces with HTML, CSS, and JavaScript to building interactive applications with React and exploring full-stack development. For me, development is not only about writing code; it is about understanding problems clearly, thinking logically, and creating solutions that people can actually use.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="font-sans text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                My mindset is simple: <span style={{ color: "var(--text)", fontWeight: 500 }}>learn deeply, build consistently, and improve every day.</span> I believe strong careers are built through discipline, patience, and repeated practice. I naturally think in terms of improvement — how a product can be better, how code can be cleaner, and how skills can become stronger over time.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="font-sans text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Right now, I'm focused on growing as a developer, sharpening my technical foundation, and building projects that reflect both my skills and my way of thinking. My goal is to create <span style={{ color: "#E94560", fontWeight: 600 }}>meaningful software</span>, contribute to strong engineering teams, and keep evolving into a better developer with every project I build.
              </motion.p>
            </div>

            {/* Career bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
            >
              <div className="flex justify-between mb-1.5">
                <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Career Journey</span>
                <span className="font-mono text-xs" style={{ color: "#E94560" }}>B.Tech Graduate ✓</span>
              </div>
              <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "75%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: "linear-gradient(90deg, #E94560, #0F3460)" }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>2023</span>
                <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>2026</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
