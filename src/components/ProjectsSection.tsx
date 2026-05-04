import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiExternalLink } from "react-icons/hi";
import { SiGithub } from "react-icons/si";

const projects = [
  {
    title: "Job Portal & Talent Platform",
    description:
      "A multi-role job portal simulating a real-world hiring platform with AI-driven career tools. Three user types: Job Seekers, Employers, and Administrators. Built with 40+ pages, 80+ REST APIs, resume match, mock interviews using OpenAI API, and gamification features.",
    stack: ["React.js", "Django", "PostgreSQL", "Tailwind CSS", "OpenAI API", "JWT"],
    github: "https://github.com/DEV-NSK",
    live: null,
    status: "In Development",
    featured: true,
    badge: "🏆 Featured Project",
    gradient: "from-orange-500/20 via-orange-400/10 to-transparent",
  },
  {
    title: "Travel Diary",
    description:
      "A full-stack social travel platform where users can share travel stories, explore destinations, and interact through likes and comments. Designed with secure authentication, responsive UI, and scalable REST API architecture.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "Cloudinary"],
    github: "https://github.com/DEV-NSK",
    live: "https://travel-diary-saikira.vercel.app/",
    status: "Live",
    featured: false,
    badge: null,
    gradient: "from-blue-500/15 via-blue-400/8 to-transparent",
  },
  {
    title: "Personal Portfolio Website",
    description:
      "A production-quality personal portfolio with Three.js WebGL backgrounds, dark/light theming, Framer Motion animations, and a working contact form via EmailJS.",
    stack: ["React.js", "Three.js", "Framer Motion", "Tailwind CSS", "EmailJS"],
    github: "https://github.com/DEV-NSK",
    live: "https://profile-pink-eight.vercel.app",
    status: "Live",
    featured: false,
    badge: null,
    gradient: "from-purple-500/15 via-purple-400/8 to-transparent",
  },
  {
    title: "CRM Dashboard",
    description:
      "Customer relationship management dashboard with analytics, pipeline management, and real-time data visualization.",
    stack: ["React.js", "Recharts", "Tailwind CSS"],
    github: "https://github.com/DEV-NSK",
    live: "https://crm-gray-six.vercel.app/dashboard",
    status: "Live",
    featured: false,
    badge: null,
    gradient: "from-green-500/15 via-green-400/8 to-transparent",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -5;
      const rotY = ((x - cx) / cx) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    };

    const handleLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`tilt-card rounded-2xl overflow-hidden flex flex-col ${
        project.featured ? "md:col-span-2" : ""
      }`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px var(--glow-light)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Top gradient banner */}
      <div
        className={`h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
      >
        {/* Initials */}
        <span
          className="font-display font-bold text-4xl select-none"
          style={{ color: "var(--primary)", opacity: 0.3 }}
        >
          {project.title
            .split(" ")
            .slice(0, 3)
            .map((w) => w[0])
            .join("")}
        </span>

        {/* Status badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full font-mono text-xs font-medium"
          style={{
            background:
              project.status === "Live"
                ? "rgba(34,197,94,0.15)"
                : "rgba(232,101,10,0.15)",
            color: project.status === "Live" ? "#22c55e" : "var(--primary)",
            border: `1px solid ${project.status === "Live" ? "rgba(34,197,94,0.3)" : "rgba(232,101,10,0.3)"}`,
          }}
        >
          {project.status === "Live" ? "● Live" : "⟳ In Dev"}
        </div>

        {/* Featured badge */}
        {project.badge && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full font-mono text-xs font-medium"
            style={{
              background: "rgba(232,101,10,0.15)",
              color: "var(--primary)",
              border: "1px solid rgba(232,101,10,0.3)",
            }}
          >
            {project.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3
          className="font-heading font-bold text-xl mb-3"
          style={{ color: "var(--text)" }}
        >
          {project.title}
        </h3>
        <p
          className="font-sans text-sm leading-relaxed mb-5 flex-1"
          style={{ color: "var(--text-muted)" }}
        >
          {project.description}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map((t) => (
            <span key={t} className="skill-tag text-xs">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} GitHub`}
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--primary)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
            }
          >
            <SiGithub size={16} />
            GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} Live Demo`}
              className="flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--primary)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
              }
            >
              <HiExternalLink size={16} />
              Live Demo
            </a>
          )}
          {!project.live && (
            <span
              className="flex items-center gap-2 text-sm font-mono"
              style={{ color: "var(--text-muted)", opacity: 0.5 }}
            >
              In Progress...
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => (
  <section id="projects" className="section-padding max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="text-center mb-16">
        <span className="section-tag">// what I've built</span>
        <h2
          className="font-display font-bold text-3xl md:text-5xl"
          style={{ color: "var(--text)" }}
        >
          Featured <span className="gradient-text">Projects</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-10"
      >
        <a
          href="https://github.com/DEV-NSK"
          target="_blank"
          rel="noopener noreferrer"
          className="outline-btn"
        >
          <SiGithub size={16} />
          View All on GitHub
        </a>
      </motion.div>
    </motion.div>
  </section>
);

export default ProjectsSection;
