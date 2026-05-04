import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiDownload, HiLocationMarker } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import MagneticButton from "./MagneticButton";

const roles = [
  "Full-Stack Developer",
  "React Specialist",
  "Node.js Engineer",
  "Problem Solver",
  "UI/UX Thinker",
];

// ─── Interactive hero photo with 3D tilt + glow ───────────────
const HeroPhotoCard = () => {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
  };

  const tiltX = hovered ? (mouse.y - 0.5) * -18 : 0;
  const tiltY = hovered ? (mouse.x - 0.5) * 18 : 0;

  return (
    <div
      ref={ref}
      className="relative"
      style={{ perspective: "900px" }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Spinning dashed ring — sized to match photo */}
      <svg
        className="absolute pointer-events-none animate-spin-slow"
        style={{
          width: "calc(100% + 28px)", height: "calc(100% + 28px)",
          top: -14, left: -14,
          opacity: hovered ? 0.7 : 0.35, transition: "opacity 0.3s"
        }}
        viewBox="0 0 100 100" fill="none" aria-hidden="true"
      >
        <circle cx="50" cy="50" r="48" stroke="url(#heroGrad)" strokeWidth="0.6" strokeDasharray="8 4" />
        <defs>
          <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E94560" />
            <stop offset="100%" stopColor="#0F3460" />
          </linearGradient>
        </defs>
      </svg>

      {/* Dynamic glow that follows cursor */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(233,69,96,0.3) 0%, transparent 65%)`,
          filter: "blur(12px)",
          zIndex: -1,
        }}
        aria-hidden="true"
      />

      {/* 3D tilting card — bigger size */}
      <motion.div
        animate={{ rotateX: tiltX, rotateY: tiltY, scale: hovered ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        style={{ transformStyle: "preserve-3d", width: "340px", height: "400px" }}
        className="relative rounded-2xl overflow-hidden"
        aria-label="Profile photo"
      >
        <img
          src="/profile.jpg"
          alt="Bathula Naga Sai Kiran"
          style={{
            width: "340px",
            height: "400px",
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
            filter: hovered ? "brightness(1.1) saturate(1.15)" : "brightness(1) saturate(1)",
            transition: "filter 0.4s ease",
            border: "1px solid rgba(233,69,96,0.3)",
            borderRadius: "1rem",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(to top, rgba(13,13,26,0.75) 0%, transparent 55%)" }} aria-hidden="true" />

        {/* Shimmer on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: `linear-gradient(${mouse.x * 180}deg, rgba(233,69,96,0.1) 0%, transparent 60%)` }}
          aria-hidden="true"
        />

        {/* Name badge */}
        <div
          className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-3"
          style={{ background: "rgba(13,13,26,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(233,69,96,0.2)" }}
        >
          <p className="font-display font-bold text-sm" style={{ color: "#F0F0F0" }}>Bathula Naga Sai Kiran</p>
          <p className="font-mono text-xs mt-0.5" style={{ color: "#E94560" }}>Full-Stack Developer</p>
        </div>
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showScroll, setShowScroll] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 65);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 35);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  // Hide scroll indicator after first scroll
  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 50) setShowScroll(false);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Ambient glow orbs — CSS only, no JS */}
      <div
        className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] animate-pulse-glow pointer-events-none"
        style={{ background: "rgba(233,69,96,0.1)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full blur-[120px] animate-pulse-glow pointer-events-none"
        style={{ background: "rgba(15,52,96,0.18)", animationDelay: "1.5s" }}
        aria-hidden="true"
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto grid lg:grid-cols-[55%_45%] gap-8 items-center pt-16">
        {/* LEFT COLUMN */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-lg mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            👋 Hi, I'm
          </motion.p>

          {/* Name — letter-by-letter stagger */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold leading-tight mb-4"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              color: "var(--text)",
            }}
          >
            {"Naga Sai ".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            {"Kiran".split("").map((char, i) => (
              <motion.span
                key={`k${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + ("Naga Sai ".length + i) * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="gradient-text text-glow"
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            variants={itemVariants}
            className="h-12 mb-5 flex items-center justify-center lg:justify-start"
          >
            <span
              className="font-heading font-semibold"
              style={{
                color: "#E94560",
                fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
              }}
            >
              {text}
            </span>
            <span className="typewriter-cursor ml-1" aria-hidden="true" />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            B.Tech CSE Graduate · Full-Stack Developer.{" "}
            Passionate about clean code, real-world products,{" "}
            <br className="hidden md:block" />
            and shipping things that actually work.
          </motion.p>

          {/* Magnetic CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
          >
            <MagneticButton
              href="#projects"
              className="orange-btn"
              aria-label="See my work"
            >
              See My Work
              <span aria-hidden="true">→</span>
            </MagneticButton>
            <MagneticButton
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="outline-btn"
              aria-label="Download CV"
            >
              <HiDownload size={16} />
              Download CV
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 justify-center lg:justify-start"
          >
            {[
              { icon: SiGithub, url: "https://github.com/DEV-NSK", label: "GitHub" },
              { icon: FaLinkedinIn, url: "https://www.linkedin.com/in/bathula-naga-sai-kiran", label: "LinkedIn" },
              { icon: HiMail, url: "mailto:bathulasaikiran2k2@gmail.com", label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target={s.url.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#E94560";
                  (e.currentTarget as HTMLElement).style.borderColor = "#E94560";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(233,69,96,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <s.icon size={18} />
              </a>
            ))}

            {/* Location badge */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-mono"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <HiLocationMarker size={14} style={{ color: "#E94560" }} />
              Hyderabad, India
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — Photo card with interactive hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex justify-center items-center relative"
        >
          {/* Floating orbs */}
          {[
            { size: 12, top: "10%", left: "-8%", delay: "0s" },
            { size: 10, top: "70%", left: "-5%", delay: "1s" },
            { size: 14, top: "20%", right: "-8%", delay: "0.5s" },
            { size: 8, top: "80%", right: "-4%", delay: "1.5s" },
          ].map((orb, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                width: orb.size, height: orb.size,
                top: orb.top,
                left: (orb as { left?: string }).left,
                right: (orb as { right?: string }).right,
                background: "#E94560", opacity: 0.5,
                animationDelay: orb.delay,
                boxShadow: "0 0 10px rgba(233,69,96,0.4)",
              }}
              aria-hidden="true"
            />
          ))}

          <HeroPhotoCard />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
              style={{ borderColor: "rgba(233,69,96,0.4)" }}
            >
              <motion.div
                animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 rounded-full"
                style={{ background: "#E94560" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
