import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiArrowDown, HiDownload, HiMail } from "react-icons/hi";
import HoverMaskReveal from "./HoverMaskReveal";

const roles = [
  "Full Stack Developer",
  "AI Automation Builder",
  "SaaS Developer",
  "Startup Builder",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 60);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 30);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 max-w-6xl w-full">
        {/* Left - Text content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for opportunities
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Hi, I'm{" "}
            <span className="gradient-text text-glow">
              Naga Sai Kiran
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-10 mb-6"
          >
            <span className="text-xl md:text-2xl font-display text-primary">
              {text}
            </span>
            <span className="inline-block w-0.5 h-6 bg-primary animate-pulse ml-1 align-middle" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10"
          >
            Building AI‑powered applications, automation systems, and scalable web platforms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:shadow-[0_0_30px_hsl(190_95%_50%/0.4)] transition-all duration-300 hover:-translate-y-0.5"
            >
              View My Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl glass glow-border text-foreground font-medium hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <HiMail /> Contact Me
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <HiDownload /> Resume
            </a>
          </motion.div>
        </div>

        {/* Right - Hover Mask Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-shrink-0 hidden md:block"
        >
          <HoverMaskReveal />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
          <HiArrowDown size={24} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
