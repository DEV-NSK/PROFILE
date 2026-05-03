import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-2xl ${
          scrolled ? "glass-strong glow-border px-6 py-3" : "px-6 py-4"
        }`}
      >
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center group">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110">
              <img src="/profile.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden md:inline-flex text-sm px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all duration-200"
          >
            Hire Me
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-display text-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
