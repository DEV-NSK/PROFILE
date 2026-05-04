import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const animFrameRef = useRef<number>(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Glitch text animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "BNS";
    let glitchFrame = 0;
    const glitchChars = "!@#$%^&*<>?/\\|{}[]";

    const drawGlitch = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.font = `bold ${Math.min(canvas.width * 0.18, 160)}px 'Clash Display', 'Syne', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      letters.split("").forEach((letter, i) => {
        const x = cx + (i - 1) * Math.min(canvas.width * 0.12, 110);
        const glitchOffset = Math.random() > 0.85 ? (Math.random() - 0.5) * 8 : 0;

        // Glitch color layers
        if (Math.random() > 0.7) {
          ctx.fillStyle = "rgba(233,69,96,0.6)";
          ctx.fillText(letter, x + 3 + glitchOffset, cy - 2);
          ctx.fillStyle = "rgba(15,52,96,0.6)";
          ctx.fillText(letter, x - 3 + glitchOffset, cy + 2);
        }

        // Main letter
        ctx.fillStyle = "#F0F0F0";
        ctx.fillText(
          Math.random() > 0.92 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : letter,
          x + glitchOffset,
          cy
        );
      });

      glitchFrame++;
      if (glitchFrame < 45) {
        animFrameRef.current = requestAnimationFrame(drawGlitch);
      } else {
        // Draw final clean letters
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#F0F0F0";
        letters.split("").forEach((letter, i) => {
          const x = cx + (i - 1) * Math.min(canvas.width * 0.12, 110);
          ctx.fillText(letter, x, cy);
        });
      }
    };

    if (phase === 2) {
      drawGlitch();
    }

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase]);

  // Phase sequencing
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timersRef.current = timers;

    // Phase 0 → 1: scan line (0.3s)
    timers.push(setTimeout(() => setPhase(1), 300));
    // Phase 1 → 2: BNS glitch (0.7s)
    timers.push(setTimeout(() => setPhase(2), 700));
    // Phase 2 → 3: progress ring (1.4s)
    timers.push(setTimeout(() => setPhase(3), 1400));
    // Phase 3 → 4: shatter (2.4s)
    timers.push(setTimeout(() => setPhase(4), 2400));
    // Phase 4 → 5: curtain wipe (3.0s)
    timers.push(setTimeout(() => setPhase(5), 3000));
    // Complete (3.5s)
    timers.push(setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 3500));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Progress counter
  useEffect(() => {
    if (phase !== 3) return;
    let val = 0;
    const interval = setInterval(() => {
      val += Math.random() * 4 + 1;
      if (val >= 100) {
        val = 100;
        clearInterval(interval);
      }
      setProgress(Math.floor(val));
    }, 20);
    return () => clearInterval(interval);
  }, [phase]);

  const circumference = 2 * Math.PI * 60;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
          style={{ background: "#0D0D1A" }}
        >
          {/* Scan line */}
          <AnimatePresence>
            {phase >= 1 && phase < 2 && (
              <motion.div
                key="scanline"
                initial={{ top: 0, opacity: 1 }}
                animate={{ top: "100%", opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "linear" }}
                className="absolute left-0 right-0 h-0.5 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, #E94560, #0F3460, transparent)",
                  boxShadow: "0 0 20px #E94560",
                  zIndex: 2,
                }}
              />
            )}
          </AnimatePresence>

          {/* Glitch canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: phase >= 2 && phase < 4 ? 1 : 0, transition: "opacity 0.3s" }}
          />

          {/* Progress ring */}
          <AnimatePresence>
            {phase === 3 && (
              <motion.div
                key="ring"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.3 }}
                transition={{ duration: 0.3 }}
                className="absolute flex items-center justify-center"
              >
                <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
                  {/* Background ring */}
                  <circle
                    cx="80" cy="80" r="60"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="2"
                  />
                  {/* Progress ring */}
                  <motion.circle
                    cx="80" cy="80" r="60"
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (progress / 100) * circumference}
                    style={{ filter: "drop-shadow(0 0 8px #E94560)" }}
                  />
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E94560" />
                      <stop offset="100%" stopColor="#0F3460" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Percentage */}
                <div className="absolute text-center">
                  <span
                    className="font-mono text-2xl font-bold"
                    style={{ color: "#F0F0F0" }}
                  >
                    {progress}%
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shatter particles */}
          {phase === 4 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * Math.PI * 2;
                const dist = 150 + Math.random() * 200;
                return (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist,
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.01 }}
                    className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
                    style={{
                      background: i % 2 === 0 ? "#E94560" : "#0F3460",
                      boxShadow: `0 0 6px ${i % 2 === 0 ? "#E94560" : "#0F3460"}`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Curtain wipe */}
          <AnimatePresence>
            {phase >= 5 && (
              <motion.div
                key="curtain"
                initial={{ scaleY: 1, transformOrigin: "top" }}
                animate={{ scaleY: 0, transformOrigin: "top" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
                style={{ background: "#0D0D1A" }}
              />
            )}
          </AnimatePresence>

          {/* Skip hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 0.4 : 0 }}
            className="absolute bottom-8 font-mono text-xs"
            style={{ color: "#888" }}
          >
            Press <kbd className="px-1 py-0.5 rounded border border-[#333] text-[10px]">L</kbd> to replay
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
