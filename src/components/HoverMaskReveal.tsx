import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import heroF1 from "@/assets/hero-f1.png";
import heroProfile from "@/assets/hero-profile.png";

const MASK_SIZE = 280;

const HoverMaskReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });

  const maskSize = useMotionValue(0);
  const springMaskSize = useSpring(maskSize, { damping: 20, stiffness: 150, mass: 0.8 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    maskSize.set(MASK_SIZE);
  }, [maskSize]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    maskSize.set(0);
  }, [maskSize]);

  // SVG filter for liquid/gooey mask edge
  const filterId = "liquid-mask-filter";

  return (
    <div
      ref={containerRef}
      className="relative w-[320px] h-[420px] md:w-[380px] md:h-[480px] cursor-none select-none overflow-hidden rounded-2xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* SVG filter for liquid blob effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Base image - Profile photo */}
      <div className="absolute inset-0">
        <img
          src={heroProfile}
          alt="Naga Sai Kiran"
          className="w-full h-full object-cover object-top"
        />
        {/* Gradient overlay on base */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      {/* Mask reveal layer - F1 image revealed on hover */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          WebkitMaskImage: isHovering
            ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50%25' cy='50%25' r='50%25' fill='black'/%3E%3C/svg%3E")`
            : undefined,
          maskImage: isHovering
            ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50%25' cy='50%25' r='50%25' fill='black'/%3E%3C/svg%3E")`
            : undefined,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat" as any,
          WebkitMaskSize: springMaskSize as any,
          maskSize: springMaskSize as any,
        }}
      >
        <MaskLayer
          springX={springX}
          springY={springY}
          springMaskSize={springMaskSize}
          isHovering={isHovering}
        />
      </motion.div>

      {/* Glow ring around cursor */}
      {isHovering && (
        <motion.div
          className="absolute z-20 rounded-full pointer-events-none border-2 border-primary/40"
          style={{
            width: springMaskSize,
            height: springMaskSize,
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            boxShadow: "0 0 40px hsl(190 95% 50% / 0.3), inset 0 0 40px hsl(190 95% 50% / 0.1)",
          }}
        />
      )}

      {/* Floating label */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 z-30"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="glass rounded-xl px-4 py-3 backdrop-blur-xl">
          <p className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
            {isHovering ? "// alter ego mode" : "// hover to reveal"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Separate component to use canvas-based masking for the liquid reveal
 */
const MaskLayer = ({
  springX,
  springY,
  springMaskSize,
  isHovering,
}: {
  springX: any;
  springY: any;
  springMaskSize: any;
  isHovering: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = heroF1;
    img.onload = () => {
      imgRef.current = img;
      setImgLoaded(true);
    };
  }, []);

  useEffect(() => {
    if (!imgLoaded || !canvasRef.current || !imgRef.current) return;

    let animFrame: number;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = springX.get();
      const my = springY.get();
      const size = springMaskSize.get();

      if (size > 5 && isHovering) {
        ctx.save();

        // Create circular clip
        ctx.beginPath();
        ctx.arc(mx, my, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Draw F1 image filling the container
        const img = imgRef.current!;
        const cw = canvas.width;
        const ch = canvas.height;
        const imgAspect = img.width / img.height;
        const canvasAspect = cw / ch;

        let drawW, drawH, drawX, drawY;
        if (canvasAspect > imgAspect) {
          drawW = cw;
          drawH = cw / imgAspect;
          drawX = 0;
          drawY = (ch - drawH) / 2;
        } else {
          drawH = ch;
          drawW = ch * imgAspect;
          drawX = (cw - drawW) / 2;
          drawY = 0;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // Add glow at edges
        const gradient = ctx.createRadialGradient(mx, my, size / 2 - 3, mx, my, size / 2);
        gradient.addColorStop(0, "rgba(0, 212, 255, 0)");
        gradient.addColorStop(1, "rgba(0, 212, 255, 0.4)");
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animFrame);
  }, [imgLoaded, isHovering, springX, springY, springMaskSize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default HoverMaskReveal;
