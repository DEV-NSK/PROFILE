import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const ScrollNav = () => {
  const [active, setActive] = useState("hero");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-64px 0px -40% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id;
        const isHovered = hoveredId === id;

        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={`Navigate to ${label}`}
            className="flex items-center gap-2 group"
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Label */}
            <AnimatePresence>
              {(isActive || isHovered) && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="font-mono text-xs font-medium"
                  style={{ color: isActive ? "#E94560" : "var(--text-muted)" }}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.div
              animate={{
                width: isActive ? 24 : 8,
                height: 8,
                borderRadius: isActive ? 4 : 9999,
                background: isActive
                  ? "#E94560"
                  : isHovered
                  ? "rgba(233,69,96,0.7)"
                  : "rgba(255,255,255,0.45)",
                boxShadow: isActive ? "0 0 10px rgba(233,69,96,0.6)" : "none",
              }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </a>
        );
      })}
    </nav>
  );
};

export default ScrollNav;
