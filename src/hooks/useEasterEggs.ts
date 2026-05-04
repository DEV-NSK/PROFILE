import { useEffect, useRef } from "react";

// Konami Code: ↑↑↓↓←→←→BA
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const SUDO_SEQUENCE = ["s", "u", "d", "o"];

// Matrix rain effect
const triggerMatrixRain = () => {
  const existing = document.getElementById("matrix-overlay");
  if (existing) return;

  const canvas = document.createElement("canvas");
  canvas.id = "matrix-overlay";
  canvas.style.cssText = `
    position: fixed; inset: 0; z-index: 99990; pointer-events: none;
    width: 100vw; height: 100vh;
  `;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d")!;
  const cols = Math.floor(canvas.width / 16);
  const drops = Array(cols).fill(1);
  const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";

  let frame = 0;
  const maxFrames = 180; // ~3 seconds at 60fps

  const draw = () => {
    ctx.fillStyle = "rgba(13,13,26,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#E94560";
    ctx.font = "14px 'JetBrains Mono', monospace";

    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 16, y * 16);
      if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });

    frame++;
    if (frame < maxFrames) {
      requestAnimationFrame(draw);
    } else {
      canvas.style.transition = "opacity 0.5s";
      canvas.style.opacity = "0";
      setTimeout(() => canvas.remove(), 500);
    }
  };

  draw();
};

// Confetti explosion
export const triggerConfetti = (x?: number, y?: number) => {
  const colors = ["#E94560", "#0F3460", "#FF9A4D", "#F0F0F0", "#22c55e"];
  const cx = x ?? window.innerWidth / 2;
  const cy = y ?? window.innerHeight / 2;

  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    const angle = Math.random() * Math.PI * 2;
    const velocity = 80 + Math.random() * 200;
    const size = 4 + Math.random() * 8;
    const color = colors[Math.floor(Math.random() * colors.length)];

    el.style.cssText = `
      position: fixed;
      left: ${cx}px;
      top: ${cy}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      pointer-events: none;
      z-index: 99995;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(el);

    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    el.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 800 + Math.random() * 600,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "forwards",
      }
    ).onfinish = () => el.remove();
  }
};

// Arcade mode (pixel palette swap)
const toggleArcadeMode = () => {
  const existing = document.getElementById("arcade-style");
  if (existing) {
    existing.remove();
    document.documentElement.removeAttribute("data-arcade");
    return;
  }
  document.documentElement.setAttribute("data-arcade", "true");
  const style = document.createElement("style");
  style.id = "arcade-style";
  style.textContent = `
    [data-arcade="true"] {
      --primary: #00FF41 !important;
      --bg: #000000 !important;
      --bg2: #001100 !important;
      --surface: #002200 !important;
      --text: #00FF41 !important;
      --text-muted: #00AA2A !important;
      --border: #004400 !important;
      --glow: rgba(0,255,65,0.3) !important;
      --glow-light: rgba(0,255,65,0.15) !important;
      image-rendering: pixelated;
      font-family: 'JetBrains Mono', monospace !important;
    }
    [data-arcade="true"] * {
      font-family: 'JetBrains Mono', monospace !important;
      border-radius: 0 !important;
    }
  `;
  document.head.appendChild(style);
};

// Screensaver mode
let screensaverTimer: ReturnType<typeof setTimeout> | null = null;
let screensaverEl: HTMLElement | null = null;

const startScreensaverTimer = () => {
  if (screensaverTimer) clearTimeout(screensaverTimer);
  screensaverTimer = setTimeout(() => {
    if (screensaverEl) return;
    const el = document.createElement("div");
    el.id = "screensaver";
    el.style.cssText = `
      position: fixed; inset: 0; z-index: 99980; pointer-events: none;
      background: rgba(13,13,26,0.92); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      font-family: 'JetBrains Mono', monospace; color: rgba(233,69,96,0.6);
      font-size: 14px;
    `;

    const snippets = [
      "const dream = () => buildSomethingAmazing();",
      "while (alive) { learn(); build(); ship(); }",
      "git commit -m 'feat: another day, another feature'",
      "console.log('Hello, World! 👋');",
      "npm run build && npm run deploy",
      "// TODO: change the world",
      "const skills = [...frontend, ...backend, ...passion];",
    ];

    let idx = 0;
    const span = document.createElement("span");
    span.textContent = snippets[0];
    el.appendChild(span);
    document.body.appendChild(el);
    screensaverEl = el;

    const interval = setInterval(() => {
      idx = (idx + 1) % snippets.length;
      span.style.opacity = "0";
      setTimeout(() => {
        span.textContent = snippets[idx];
        span.style.opacity = "1";
      }, 300);
    }, 2000);

    (el as HTMLElement & { _interval: ReturnType<typeof setInterval> })._interval = interval;
  }, 30000);
};

const resetScreensaver = () => {
  if (screensaverEl) {
    const el = screensaverEl as HTMLElement & { _interval: ReturnType<typeof setInterval> };
    clearInterval(el._interval);
    screensaverEl.remove();
    screensaverEl = null;
  }
  startScreensaverTimer();
};

export const useEasterEggs = (options?: { onReplayLoader?: () => void }) => {
  const konamiBuffer = useRef<string[]>([]);
  const sudoBuffer = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      // Reset screensaver on any key
      resetScreensaver();

      // Konami code
      konamiBuffer.current.push(key);
      if (konamiBuffer.current.length > KONAMI.length) {
        konamiBuffer.current.shift();
      }
      if (JSON.stringify(konamiBuffer.current) === JSON.stringify(KONAMI)) {
        toggleArcadeMode();
        konamiBuffer.current = [];
      }

      // sudo sequence
      sudoBuffer.current.push(key.toLowerCase());
      if (sudoBuffer.current.length > SUDO_SEQUENCE.length) {
        sudoBuffer.current.shift();
      }
      if (JSON.stringify(sudoBuffer.current) === JSON.stringify(SUDO_SEQUENCE)) {
        triggerMatrixRain();
        sudoBuffer.current = [];
      }

      // L key to replay loader
      if (key === "l" || key === "L") {
        options?.onReplayLoader?.();
      }
    };

    const handleActivity = () => resetScreensaver();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleActivity, { passive: true });
    window.addEventListener("click", handleActivity);
    window.addEventListener("scroll", handleActivity, { passive: true });

    startScreensaverTimer();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      if (screensaverTimer) clearTimeout(screensaverTimer);
      if (screensaverEl) {
        const el = screensaverEl as HTMLElement & { _interval: ReturnType<typeof setInterval> };
        clearInterval(el._interval);
        screensaverEl.remove();
        screensaverEl = null;
      }
    };
  }, [options?.onReplayLoader]);
};
