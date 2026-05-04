import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle, HiClipboardCopy, HiCheck } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import MagneticButton from "./MagneticButton";

// ─── EmailJS Config ───────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_portfolio";
const EMAILJS_TEMPLATE_ID = "template_contact";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
// ─────────────────────────────────────────────────────────────

const EMAIL = "bathulasaikiran2k2@gmail.com";

interface FormData {
  from_name: string;
  from_email: string;
  message: string;
}

interface FormErrors {
  from_name?: string;
  from_email?: string;
  message?: string;
}

const validate = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.from_name || data.from_name.trim().length < 2)
    errors.from_name = "Name too short (min 2 chars)";
  if (!data.from_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.from_email))
    errors.from_email = "Enter a valid email address";
  if (!data.message || data.message.trim().length < 20)
    errors.message = "Message too short (min 20 chars)";
  if (data.message && data.message.trim().length > 1000)
    errors.message = "Message too long (max 1000 chars)";
  return errors;
};

// ─── Particle Vortex Background ──────────────────────────────
const VortexBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const activeRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || 600;
    };
    resize();

    const colors = ["#E94560", "#0F3460", "#E94560", "rgba(255,255,255,0.6)"];
    const count = window.innerWidth < 768 ? 40 : 80;

    const particles = Array.from({ length: count }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 20 + Math.random() * Math.min(canvas.width, canvas.height) * 0.4,
      speed: (0.003 + Math.random() * 0.005) * (Math.random() > 0.5 ? 1 : -1),
      size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      if (!activeRef.current) return;
      rafRef.current = requestAnimationFrame(draw);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.38;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    // Only run when section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting;
        if (entry.isIntersecting) draw();
        else cancelAnimationFrame(rafRef.current);
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.35 }}
    />
  );
};

// ─── Display Text with letter animation ──────────────────────
const DisplayText = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <span aria-label={text}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 40, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: delay + i * 0.04,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ display: "inline-block", transformOrigin: "bottom" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

// ─── Social icon with brand-specific hover ────────────────────
const SocialLink = ({
  icon: Icon,
  url,
  label,
  hoverColor,
}: {
  icon: React.ComponentType<{ size?: number }>;
  url: string;
  label: string;
  hoverColor: string;
}) => (
  <a
    href={url}
    target={url.startsWith("mailto") ? undefined : "_blank"}
    rel="noopener noreferrer"
    aria-label={label}
    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group"
    style={{
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.6)",
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLElement;
      el.style.color = hoverColor;
      el.style.borderColor = hoverColor;
      el.style.background = `${hoverColor}20`;
      el.style.boxShadow = `0 0 20px ${hoverColor}40`;
      el.style.transform = "translateY(-3px)";
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLElement;
      el.style.color = "rgba(255,255,255,0.6)";
      el.style.borderColor = "rgba(255,255,255,0.1)";
      el.style.background = "rgba(255,255,255,0.05)";
      el.style.boxShadow = "none";
      el.style.transform = "translateY(0)";
    }}
  >
    <Icon size={20} />
  </a>
);

// ─── Clean Input Field (replaces broken floating-label NeonField) ────────────
const FormField = ({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled,
  multiline,
  rows,
  maxLength,
}: {
  id: string;
  name: string;
  type?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
}) => {
  const [focused, setFocused] = useState(false);
  const hasError = !!(touched && error);
  const isFloated = focused || value.length > 0;

  const sharedStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: `1.5px solid ${hasError ? "#ef4444" : focused ? "#E94560" : "rgba(255,255,255,0.12)"}`,
    borderRadius: "0.75rem",
    padding: "1.5rem 1rem 0.625rem",
    color: "#F0F0F0",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9375rem",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxShadow: focused && !hasError ? "0 0 0 3px rgba(233,69,96,0.15)" : "none",
    resize: "none" as const,
  };

  return (
    <div className="relative">
      {/* Floating label */}
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "1rem",
          top: isFloated ? "0.45rem" : "1.05rem",
          fontSize: isFloated ? "0.65rem" : "0.875rem",
          color: hasError ? "#ef4444" : focused ? "#E94560" : "rgba(255,255,255,0.45)",
          letterSpacing: isFloated ? "0.08em" : "0",
          textTransform: isFloated ? "uppercase" : "none",
          transition: "all 0.18s ease",
          pointerEvents: "none",
          fontFamily: "'JetBrains Mono', monospace",
          zIndex: 1,
        }}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); onBlur(e); }}
          placeholder={focused ? placeholder : ""}
          disabled={disabled}
          rows={rows ?? 4}
          maxLength={maxLength}
          aria-describedby={hasError ? `${id}-error` : undefined}
          aria-invalid={hasError}
          style={sharedStyle}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); onBlur(e); }}
          placeholder={focused ? placeholder : ""}
          disabled={disabled}
          aria-describedby={hasError ? `${id}-error` : undefined}
          aria-invalid={hasError}
          style={sharedStyle}
        />
      )}

      {/* Error message */}
      {hasError && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          id={`${id}-error`}
          className="font-mono text-xs mt-1.5 ml-1"
          style={{ color: "#ef4444" }}
          role="alert"
        >
          {error}
        </motion.p>
      )}

      {/* Char count */}
      {multiline && maxLength && (
        <span
          className="absolute right-2 bottom-2 font-mono text-xs"
          style={{ color: value.length > maxLength * 0.9 ? "#ef4444" : "rgba(255,255,255,0.25)" }}
        >
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────
const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { from_name: true, from_email: true, message: true };
    setTouched(allTouched);
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData({ from_name: "", from_email: "", message: "" });
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg(`Something went wrong. Email directly: ${EMAIL}`);
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#0D0D1A", minHeight: "100vh" }}
    >
      {/* Particle vortex background */}
      <VortexBackground />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(233,69,96,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 section-padding max-w-7xl mx-auto">
        {/* ── Display headline ── */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden"
          >
            <h2
              className="font-display font-bold leading-tight scanline-header"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                color: "#F0F0F0",
                letterSpacing: "-0.02em",
              }}
            >
              <DisplayText text="Let's Build" delay={0} />
              <br />
              <span style={{ color: "#E94560" }}>
                <DisplayText text="Something" delay={0.3} />
              </span>
            </h2>
            <h2
              className="font-display font-bold leading-tight"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                color: "#F0F0F0",
                letterSpacing: "-0.02em",
                marginTop: "-0.1em",
              }}
            >
              <DisplayText text="Incredible Together" delay={0.6} />
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="font-sans text-base mt-6 max-w-md mx-auto"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Have a project in mind or want to collaborate? Let's connect.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* LEFT — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-6 mb-10">
              {/* Email with copy */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(233,69,96,0.1)", border: "1px solid rgba(233,69,96,0.2)" }}
                >
                  <HiMail size={20} style={{ color: "#E94560" }} />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Email
                  </p>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${EMAIL}`}
                      className="font-sans text-sm font-medium transition-colors"
                      style={{ color: "#F0F0F0" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E94560")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#F0F0F0")}
                    >
                      {EMAIL}
                    </a>
                    <button
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      className="transition-all duration-200"
                      style={{ color: emailCopied ? "#22c55e" : "rgba(255,255,255,0.3)" }}
                      onMouseEnter={(e) => {
                        if (!emailCopied) (e.currentTarget as HTMLElement).style.color = "#E94560";
                      }}
                      onMouseLeave={(e) => {
                        if (!emailCopied) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)";
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {emailCopied ? (
                          <motion.span
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-1 font-mono text-xs"
                            style={{ color: "#22c55e" }}
                          >
                            <HiCheck size={14} /> Copied!
                          </motion.span>
                        ) : (
                          <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <HiClipboardCopy size={16} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(15,52,96,0.3)", border: "1px solid rgba(15,52,96,0.4)" }}
                >
                  <HiPhone size={20} style={{ color: "#60a5fa" }} />
                </div>
                <div>
                  <p className="font-mono text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Phone
                  </p>
                  <a
                    href="tel:+919014794676"
                    className="font-sans text-sm font-medium"
                    style={{ color: "#F0F0F0" }}
                  >
                    +91 9014794676
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)" }}
                >
                  <HiLocationMarker size={20} style={{ color: "#a78bfa" }} />
                </div>
                <div>
                  <p className="font-mono text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Location
                  </p>
                  <p className="font-sans text-sm" style={{ color: "#F0F0F0" }}>
                    Hyderabad, India · Open to Bengaluru
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mb-8">
              <SocialLink icon={SiGithub} url="https://github.com/DEV-NSK" label="GitHub" hoverColor="#ffffff" />
              <SocialLink
                icon={FaLinkedinIn}
                url="https://www.linkedin.com/in/bathula-naga-sai-kiran"
                label="LinkedIn"
                hoverColor="#0077b5"
              />
              <SocialLink icon={HiMail} url={`mailto:${EMAIL}`} label="Email" hoverColor="#E94560" />
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl flex items-center gap-3"
              style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
                style={{ background: "#22c55e" }}
                aria-hidden="true"
              />
              <p className="font-sans text-sm" style={{ color: "#22c55e" }}>
                Available for SDE roles starting mid-2026
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center text-center p-12 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(34,197,94,0.3)",
                    minHeight: "420px",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  >
                    <HiCheckCircle size={72} style={{ color: "#22c55e" }} />
                  </motion.div>
                  <h3 className="font-display font-bold text-2xl mt-5 mb-2" style={{ color: "#F0F0F0" }}>
                    Message Sent!
                  </h3>
                  <p className="font-sans text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="outline-btn mt-8 text-sm py-2 px-6"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-10"
                  noValidate
                >
                  <FormField
                    id="from_name"
                    name="from_name"
                    label="Your Name"
                    placeholder="Bathula Naga Sai Kiran"
                    value={formData.from_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.from_name}
                    touched={touched.from_name}
                    disabled={status === "sending"}
                  />

                  <FormField
                    id="from_email"
                    name="from_email"
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    value={formData.from_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.from_email}
                    touched={touched.from_email}
                    disabled={status === "sending"}
                  />

                  <FormField
                    id="message"
                    name="message"
                    label="Message"
                    placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.message}
                    touched={touched.message}
                    disabled={status === "sending"}
                    multiline
                    rows={5}
                    maxLength={1000}
                  />

                  {/* Error toast */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl font-sans text-sm"
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.3)",
                        color: "#ef4444",
                      }}
                      role="alert"
                    >
                      {errorMsg}
                    </motion.div>
                  )}

                  {/* Submit — magnetic + fluid fill */}
                  <MagneticButton
                    as="button"
                    className="orange-btn w-full justify-center py-4 text-base"
                    style={{ opacity: status === "sending" ? 0.7 : 1 }}
                    onClick={status !== "sending" ? undefined : undefined}
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>Send Message <span aria-hidden="true">→</span></>
                    )}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
