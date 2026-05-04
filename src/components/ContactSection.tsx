import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

// ─── EmailJS Config ───────────────────────────────────────────
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "service_portfolio";
const EMAILJS_TEMPLATE_ID = "template_contact";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
// ─────────────────────────────────────────────────────────────

interface FormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  from_name?: string;
  from_email?: string;
  subject?: string;
  message?: string;
}

const validate = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.from_name || data.from_name.trim().length < 2)
    errors.from_name = "Please enter your name (min 2 characters)";
  if (!data.from_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.from_email))
    errors.from_email = "Enter a valid email address";
  if (!data.subject || data.subject.trim().length < 5)
    errors.subject = "Add a subject line (min 5 characters)";
  if (!data.message || data.message.trim().length < 20)
    errors.message = "Message too short (min 20 characters)";
  if (data.message && data.message.trim().length > 1000)
    errors.message = "Message too long (max 1000 characters)";
  return errors;
};

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    const allTouched = { from_name: true, from_email: true, subject: true, message: true };
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
      setFormData({ from_name: "", from_email: "", subject: "", message: "" });
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try emailing directly at bathulasaikiran2k2@gmail.com");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `form-input ${touched[field] && errors[field] ? "error" : ""}`;

  return (
    <section id="contact" className="section-padding max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-16">
          <span className="section-tag">// let's talk</span>
          <h2
            className="font-display font-bold text-3xl md:text-5xl"
            style={{ color: "var(--text)" }}
          >
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p
            className="font-sans mt-3 text-base max-w-md mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            Have a project in mind or want to collaborate? Let's connect and build something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* LEFT — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="font-heading font-bold text-xl mb-6"
              style={{ color: "var(--text)" }}
            >
              Contact Information
            </h3>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: HiMail,
                  label: "Email",
                  value: "bathulasaikiran2k2@gmail.com",
                  href: "mailto:bathulasaikiran2k2@gmail.com",
                },
                {
                  icon: HiPhone,
                  label: "Phone",
                  value: "+91 9014794676",
                  href: "tel:+919014794676",
                },
                {
                  icon: HiLocationMarker,
                  label: "Location",
                  value: "Hyderabad, India · Open to Bengaluru",
                  href: null,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(232,101,10,0.1)",
                      border: "1px solid rgba(232,101,10,0.2)",
                    }}
                  >
                    <item.icon size={18} style={{ color: "var(--primary)" }} />
                  </div>
                  <div>
                    <p
                      className="font-mono text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-sans text-sm font-medium transition-colors"
                        style={{ color: "var(--text)" }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.color = "var(--primary)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.color = "var(--text)")
                        }
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-sans text-sm" style={{ color: "var(--text)" }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3">
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
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--primary)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(232,101,10,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                  }}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div
              className="mt-8 p-4 rounded-xl flex items-center gap-3"
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
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid rgba(34,197,94,0.3)",
                    minHeight: "400px",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  >
                    <HiCheckCircle size={64} style={{ color: "#22c55e" }} />
                  </motion.div>
                  <h3
                    className="font-heading font-bold text-2xl mt-4 mb-2"
                    style={{ color: "var(--text)" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="font-sans text-sm" style={{ color: "var(--text-muted)" }}>
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="outline-btn mt-6 text-sm py-2 px-5"
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
                  className="rounded-2xl p-8 space-y-5"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="from_name"
                      className="block font-sans text-sm font-medium mb-1.5"
                      style={{ color: "var(--text)" }}
                    >
                      Your Name <span style={{ color: "var(--primary)" }}>*</span>
                    </label>
                    <input
                      id="from_name"
                      name="from_name"
                      type="text"
                      value={formData.from_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Bathula Naga Sai Kiran"
                      className={inputClass("from_name")}
                      disabled={status === "sending"}
                      aria-describedby={errors.from_name ? "name-error" : undefined}
                      aria-invalid={!!errors.from_name}
                    />
                    {touched.from_name && errors.from_name && (
                      <p
                        id="name-error"
                        className="font-sans text-xs mt-1"
                        style={{ color: "#ef4444" }}
                        role="alert"
                      >
                        {errors.from_name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="from_email"
                      className="block font-sans text-sm font-medium mb-1.5"
                      style={{ color: "var(--text)" }}
                    >
                      Email Address <span style={{ color: "var(--primary)" }}>*</span>
                    </label>
                    <input
                      id="from_email"
                      name="from_email"
                      type="email"
                      value={formData.from_email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@example.com"
                      className={inputClass("from_email")}
                      disabled={status === "sending"}
                      aria-describedby={errors.from_email ? "email-error" : undefined}
                      aria-invalid={!!errors.from_email}
                    />
                    {touched.from_email && errors.from_email && (
                      <p
                        id="email-error"
                        className="font-sans text-xs mt-1"
                        style={{ color: "#ef4444" }}
                        role="alert"
                      >
                        {errors.from_email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block font-sans text-sm font-medium mb-1.5"
                      style={{ color: "var(--text)" }}
                    >
                      Subject <span style={{ color: "var(--primary)" }}>*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Project collaboration / Job opportunity"
                      className={inputClass("subject")}
                      disabled={status === "sending"}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      aria-invalid={!!errors.subject}
                    />
                    {touched.subject && errors.subject && (
                      <p
                        id="subject-error"
                        className="font-sans text-xs mt-1"
                        style={{ color: "#ef4444" }}
                        role="alert"
                      >
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block font-sans text-sm font-medium mb-1.5"
                      style={{ color: "var(--text)" }}
                    >
                      Message <span style={{ color: "var(--primary)" }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell me about your project or opportunity..."
                      className={inputClass("message")}
                      disabled={status === "sending"}
                      style={{ resize: "none" }}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      aria-invalid={!!errors.message}
                    />
                    <div className="flex justify-between items-start mt-1">
                      {touched.message && errors.message ? (
                        <p
                          id="message-error"
                          className="font-sans text-xs"
                          style={{ color: "#ef4444" }}
                          role="alert"
                        >
                          {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span
                        className="font-mono text-xs"
                        style={{
                          color:
                            formData.message.length > 900
                              ? "#ef4444"
                              : "var(--text-muted)",
                        }}
                      >
                        {formData.message.length}/1000
                      </span>
                    </div>
                  </div>

                  {/* Error toast */}
                  {status === "error" && (
                    <div
                      className="p-3 rounded-xl font-sans text-sm"
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.3)",
                        color: "#ef4444",
                      }}
                      role="alert"
                    >
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="orange-btn w-full justify-center py-3.5 text-base"
                    style={{
                      opacity: status === "sending" ? 0.7 : 1,
                    }}
                  >
                    {status === "sending" ? (
                      <>
                        <svg
                          className="animate-spin"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeOpacity="0.3"
                          />
                          <path
                            d="M12 2a10 10 0 0 1 10 10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
