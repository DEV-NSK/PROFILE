import { useRef, useState, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  download?: boolean | string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  as?: "a" | "button";
}

const MagneticButton = ({
  children,
  className = "",
  style,
  href,
  download,
  onClick,
  target,
  rel,
  "aria-label": ariaLabel,
  as: Tag = href ? "a" : "button",
}: MagneticButtonProps) => {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 80;

    if (dist < maxDist) {
      const strength = (1 - dist / maxDist) * 0.4;
      x.set(dx * strength);
      y.set(dy * strength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const props = {
    ref: ref as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
    className,
    style,
    onClick,
    "aria-label": ariaLabel,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    ...(href ? { href, download, target, rel } : {}),
  };

  return (
    <motion.div
      style={{ x, y, display: "inline-block", position: "relative" }}
      className="magnetic-wrapper"
    >
      {/* Fluid fill overlay */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 rounded-xl"
          style={{ background: "rgba(233,69,96,0.15)" }}
        />
      </motion.div>

      {Tag === "a" ? (
        <a {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} style={{ ...style, position: "relative", zIndex: 1 }}>
          {children}
        </a>
      ) : (
        <button {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} style={{ ...style, position: "relative", zIndex: 1 }}>
          {children}
        </button>
      )}
    </motion.div>
  );
};

export default MagneticButton;
