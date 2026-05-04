import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX, HiDownload, HiSun, HiMoon, HiVolumeUp, HiVolumeOff } from "react-icons/hi";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [logoHovered, setLogoHovered] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Scroll handler
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Theme init
  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-64px 0px -40% 0px" }
    );

    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  // Ambient sound toggle using Web Audio API (subtle electronic hum)
  const toggleSound = () => {
    if (soundOn) {
      // Stop audio
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setSoundOn(false);
    } else {
      try {
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Create a subtle ambient drone
        const createOscillator = (freq: number, gain: number, type: OscillatorType = "sine") => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          osc.type = type;
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(gain, ctx.currentTime + 2);
          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          osc.start();
          return { osc, gainNode };
        };

        // Subtle ambient layers
        createOscillator(55, 0.02, "sine");   // deep bass
        createOscillator(110, 0.015, "sine"); // mid
        createOscillator(220, 0.008, "triangle"); // high

        setSoundOn(true);
      } catch {
        // Web Audio not supported
      }
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-[20px] border-b"
            : ""
        }`}
        style={{
          background: scrolled
            ? "color-mix(in srgb, var(--bg) 85%, transparent)"
            : "transparent",
          borderColor: scrolled ? "var(--border)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display font-bold text-2xl select-none"
            style={{ color: "var(--primary)" }}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            aria-label="Sai Kiran - Home"
          >
            <motion.span
              animate={logoHovered ? { rotateY: 15, rotateX: -10 } : { rotateY: 0, rotateX: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: "inline-block", transformStyle: "preserve-3d" }}
            >
              SK
            </motion.span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link ${activeSection === l.href ? "active" : ""}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Sound toggle — muted by default */}
            <button
              onClick={toggleSound}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: soundOn ? "rgba(233,69,96,0.1)" : "var(--surface)",
                border: `1px solid ${soundOn ? "rgba(233,69,96,0.4)" : "var(--border)"}`,
                color: soundOn ? "#E94560" : "var(--text-muted)",
              }}
              aria-label={soundOn ? "Mute ambient sound" : "Enable ambient sound"}
              title={soundOn ? "Mute ambient sound" : "Enable ambient sound (subtle electronic hum)"}
            >
              <motion.div
                key={soundOn ? "on" : "off"}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {soundOn ? <HiVolumeUp size={16} /> : <HiVolumeOff size={16} />}
              </motion.div>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? <HiSun size={16} /> : <HiMoon size={16} />}
              </motion.div>
            </button>

            {/* Resume */}
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="outline-btn text-sm py-2 px-4"
              aria-label="View and Download Resume"
            >
              <HiDownload size={14} />
              Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <HiSun size={16} /> : <HiMoon size={16} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "var(--text)" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: "color-mix(in srgb, var(--bg) 97%, transparent)", backdropFilter: "blur(20px)" }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl font-bold transition-colors"
                style={{ color: activeSection === l.href ? "var(--primary)" : "var(--text)" }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.07 }}
              className="outline-btn mt-4"
              onClick={() => setMobileOpen(false)}
            >
              <HiDownload size={16} />
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
