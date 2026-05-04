import { HiArrowUp } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const Footer = () => (
  <footer
    className="py-10 px-4"
    style={{ borderTop: "1px solid var(--border)" }}
  >
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Left */}
      <div className="text-center md:text-left">
        <p
          className="font-display font-bold text-lg"
          style={{ color: "var(--text)" }}
        >
          Bathula Naga Sai Kiran
        </p>
        <p className="font-sans text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
          Full-Stack Developer · SDE Aspirant · Hyderabad, India
        </p>
        <p className="font-mono text-xs mt-2" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
          © {new Date().getFullYear()} · Built with React + Three.js
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {[
          { icon: SiGithub, url: "https://github.com/DEV-NSK", label: "GitHub" },
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
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--primary)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            }}
          >
            <s.icon size={15} />
          </a>
        ))}

        {/* Back to top */}
        <a
          href="#hero"
          aria-label="Back to top"
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ml-1"
          style={{
            background: "rgba(232,101,10,0.1)",
            border: "1px solid rgba(232,101,10,0.2)",
            color: "var(--primary)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(232,101,10,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(232,101,10,0.1)";
          }}
        >
          <HiArrowUp size={15} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
