import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiArrowDown, HiDownload, HiLocationMarker } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const roles = [
  "Software Developer",
  "Full-Stack Engineer",
  "Problem Solver",
  "SDE Aspirant",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

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

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Ambient glow orbs */}
      <div
        className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] animate-pulse-glow pointer-events-none"
        style={{ background: "var(--glow)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full blur-[120px] animate-pulse-glow pointer-events-none"
        style={{ background: "var(--glow-light)", animationDelay: "1.5s" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto grid lg:grid-cols-[60%_40%] gap-12 items-center pt-16">
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
            👋 Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold leading-tight mb-4"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              color: "var(--text)",
            }}
          >
            Bathula Naga{" "}
            <span className="gradient-text text-glow">Sai Kiran</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            variants={itemVariants}
            className="h-10 mb-5 flex items-center justify-center lg:justify-start"
          >
            <span
              className="font-heading font-semibold text-xl md:text-2xl"
              style={{ color: "var(--primary)" }}
            >
              {text}
            </span>
            <span className="typewriter-cursor ml-1" aria-hidden="true" />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-3 leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Final-year CSE student building production-grade software.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="font-sans text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Passionate about clean code, real-world products,{" "}
            <br className="hidden md:block" />
            and shipping things that actually work.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
          >
            <a href="#projects" className="orange-btn">
              View My Work
              <span aria-hidden="true">→</span>
            </a>
            <a href="/resume.pdf" download className="outline-btn">
              <HiDownload size={16} />
              Download Resume
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 justify-center lg:justify-start"
          >
            {[
              {
                icon: SiGithub,
                url: "https://github.com/DEV-NSK",
                label: "GitHub",
              },
              {
                icon: FaLinkedinIn,
                url: "https://www.linkedin.com/in/bathula-naga-sai-kiran",
                label: "LinkedIn",
              },
              {
                icon: HiMail,
                url: "mailto:bathulasaikiran2k2@gmail.com",
                label: "Email",
              },
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
                  (e.currentTarget as HTMLElement).style.color = "var(--primary)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
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
              <HiLocationMarker size={14} style={{ color: "var(--primary)" }} />
              Hyderabad, India
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — Photo card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="hidden lg:flex justify-center items-center relative"
        >
          {/* Floating orbs around card */}
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
                width: orb.size,
                height: orb.size,
                top: orb.top,
                left: (orb as any).left,
                right: (orb as any).right,
                background: "var(--primary)",
                opacity: 0.6,
                animationDelay: orb.delay,
                boxShadow: "0 0 12px var(--glow)",
              }}
              aria-hidden="true"
            />
          ))}

          {/* Photo card */}
          <div
            className="relative w-72 h-80 rounded-2xl overflow-hidden"
            style={{
              border: "1px solid var(--border)",
              boxShadow: "0 0 60px var(--glow-light), 0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src="/profile.jpg"
              alt="Bathula Naga Sai Kiran"
              className="w-full h-full object-cover object-top"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, var(--bg) 0%, transparent 50%)",
              }}
            />
            {/* Name badge */}
            <div
              className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-3"
              style={{
                background: "color-mix(in srgb, var(--surface) 90%, transparent)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="font-display font-bold text-sm"
                style={{ color: "var(--text)" }}
              >
                Bathula Naga Sai Kiran
              </p>
              <p
                className="font-mono text-xs mt-0.5"
                style={{ color: "var(--primary)" }}
              >
                Full-Stack Developer
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          aria-label="Scroll to About section"
          style={{ color: "var(--text-muted)" }}
          className="hover:text-[var(--primary)] transition-colors"
        >
          <HiArrowDown size={22} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
