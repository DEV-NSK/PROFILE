import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiExternalLink, HiX, HiCode } from "react-icons/hi";
import { SiGithub } from "react-icons/si";

const projects = [
  {
    title: "HIRA — Find Your Dream Job",
    description:
      "A multi-role job portal simulating a real-world hiring platform with AI-driven career tools. Three user types: Job Seekers, Employers, and Administrators. Built with 40+ pages, 80+ REST APIs, resume match, mock interviews using OpenAI API, and gamification features.",
    fullDescription:
      "A comprehensive full-stack platform that replicates a real-world hiring ecosystem. Features include AI-powered resume matching, mock interview simulations via OpenAI API, employer dashboards with analytics, job seeker profiles with skill assessments, and a full admin panel for platform management. Built with a microservices-inspired architecture using Django REST Framework and React.js.",
    stack: ["React.js", "Django", "PostgreSQL", "Tailwind CSS", "OpenAI API", "JWT"],
    github: "https://github.com/DEV-NSK",
    live: "https://job-portal-frontend-blue-gamma.vercel.app/",
    status: "Live",
    featured: true,
    tag: "Side Project",
    badge: "🏆 Featured",
    gradient: "from-[#E94560]/20 via-[#E94560]/10 to-transparent",
    color: "#E94560",
    codePreview: `// AI Resume Matching Engine
const matchResume = async (resume, jobDesc) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content:
      \`Match score (0-100) for:\\n\${resume}\\n---\\n\${jobDesc}\`
    }]
  });
  return parseScore(response.choices[0].message.content);
};`,
  },
  {
    title: "Travel Diary",
    description:
      "A full-stack social travel platform where users can share travel stories, explore destinations, and interact through likes and comments.",
    fullDescription:
      "A MERN stack social platform for travel enthusiasts. Features include user authentication with JWT, image uploads via Cloudinary, real-time likes and comments, destination exploration with search and filters, and a responsive mobile-first design. Deployed on Vercel with MongoDB Atlas.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "Cloudinary"],
    github: "https://github.com/DEV-NSK",
    live: "https://travel-diary-saikira.vercel.app/",
    status: "Live",
    featured: false,
    tag: "Side Project",
    badge: null,
    gradient: "from-blue-500/15 via-blue-400/8 to-transparent",
    color: "#60a5fa",
    codePreview: `// Cloudinary Image Upload
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'travel_diary');
  const res = await axios.post(CLOUDINARY_URL, formData);
  return res.data.secure_url;
};`,
  },
  {
    title: "CRM Dashboard",
    description:
      "Customer relationship management dashboard with analytics, pipeline management, and real-time data visualization.",
    fullDescription:
      "A feature-rich CRM dashboard built with React and Recharts. Includes sales pipeline visualization, customer analytics, activity tracking, and responsive data tables. Features real-time chart updates, dark/light theme support, and a clean, professional UI.",
    stack: ["React.js", "Recharts", "Tailwind CSS"],
    github: "https://github.com/DEV-NSK",
    live: "https://crm-gray-six.vercel.app/dashboard",
    status: "Live",
    featured: false,
    tag: "Side Project",
    badge: null,
    gradient: "from-green-500/15 via-green-400/8 to-transparent",
    color: "#34d399",
    codePreview: `// Sales Pipeline Chart
const PipelineChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="stage" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="value" fill="#E94560" radius={[4,4,0,0]} />
    </BarChart>
  </ResponsiveContainer>
);`,
  },
];

// ─── Project Card ─────────────────────────────────────────────
const ProjectCard = ({
  project,
  index,
  onOpen,
}: {
  project: (typeof projects)[0];
  index: number;
  onOpen: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

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
      className={`tilt-card rounded-2xl overflow-hidden flex flex-col cursor-pointer ${
        project.featured ? "md:col-span-2" : ""
      }`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onClick={onOpen}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = project.color;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${project.color}20`;
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
        <span
          className="font-display font-bold text-5xl select-none"
          style={{ color: project.color, opacity: 0.2 }}
        >
          {project.title.split(" ").slice(0, 3).map((w) => w[0]).join("")}
        </span>

        {/* Status badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full font-mono text-xs font-medium"
          style={{
            background: project.status === "Live" ? "rgba(34,197,94,0.15)" : "rgba(233,69,96,0.15)",
            color: project.status === "Live" ? "#22c55e" : "#E94560",
            border: `1px solid ${project.status === "Live" ? "rgba(34,197,94,0.3)" : "rgba(233,69,96,0.3)"}`,
          }}
        >
          {project.status === "Live" ? "● Live" : "⟳ In Dev"}
        </div>

        {/* Tag badge */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full font-mono text-xs"
          style={{
            background: `${project.color}15`,
            color: project.color,
            border: `1px solid ${project.color}30`,
          }}
        >
          {project.badge ?? project.tag}
        </div>

        <div
          className="absolute bottom-3 right-3 font-mono text-xs opacity-50"
          style={{ color: "var(--text-muted)" }}
        >
          Click to explore →
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-xl mb-3" style={{ color: "var(--text)" }}>
          {project.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-muted)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-2.5 py-1 rounded-full"
              style={{
                background: `${project.color}10`,
                color: project.color,
                border: `1px solid ${project.color}25`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} GitHub`}
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "var(--text-muted)" }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = project.color)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
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
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = project.color)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            >
              <HiExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Project Detail Panel ─────────────────────────────────────
const ProjectPanel = ({
  project,
  onClose,
}: {
  project: (typeof projects)[0] | null;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000]"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={onClose} aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[9001] w-full max-w-2xl overflow-y-auto"
            style={{ background: "var(--bg2)", borderLeft: `1px solid ${project.color}30`, boxShadow: `-20px 0 60px rgba(0,0,0,0.5)` }}
            role="dialog" aria-modal="true" aria-label={`${project.title} details`}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between p-6"
              style={{ background: "var(--bg2)", borderBottom: `1px solid ${project.color}20` }}>
              <div>
                <span className="font-mono text-xs" style={{ color: project.color }}>{project.tag}</span>
                <h2 className="font-display font-bold text-2xl mt-1" style={{ color: "var(--text)" }}>{project.title}</h2>
              </div>
              <button onClick={onClose}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                aria-label="Close panel"
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E94560"; (e.currentTarget as HTMLElement).style.color = "#E94560"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
              >
                <HiX size={18} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs px-3 py-1.5 rounded-full"
                  style={{ background: project.status === "Live" ? "rgba(34,197,94,0.15)" : "rgba(233,69,96,0.15)", color: project.status === "Live" ? "#22c55e" : "#E94560", border: `1px solid ${project.status === "Live" ? "rgba(34,197,94,0.3)" : "rgba(233,69,96,0.3)"}` }}>
                  {project.status === "Live" ? "● Live" : "⟳ In Development"}
                </span>
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full transition-all"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = project.color; (e.currentTarget as HTMLElement).style.color = project.color; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}>
                  <SiGithub size={12} /> GitHub
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full transition-all"
                    style={{ background: `${project.color}15`, border: `1px solid ${project.color}30`, color: project.color }}>
                    <HiExternalLink size={12} /> Live Demo
                  </a>
                )}
              </div>

              <div>
                <h3 className="font-heading font-semibold text-lg mb-3" style={{ color: "var(--text)" }}>About this project</h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{project.fullDescription}</p>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-lg mb-3" style={{ color: "var(--text)" }}>Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="font-mono text-xs px-3 py-1.5 rounded-full"
                      style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-lg mb-3 flex items-center gap-2" style={{ color: "var(--text)" }}>
                  <HiCode size={18} style={{ color: project.color }} /> Code Highlight
                </h3>
                <div className="rounded-xl overflow-hidden" style={{ background: "#0D0D1A", border: `1px solid ${project.color}20` }}>
                  <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: `1px solid ${project.color}15` }}>
                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
                    <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
                    <span className="ml-2 font-mono text-xs" style={{ color: "var(--text-muted)" }}>snippet.js</span>
                  </div>
                  <pre className="p-4 overflow-x-auto font-mono text-xs leading-relaxed" style={{ color: "#F0F0F0" }}>
                    <code dangerouslySetInnerHTML={{
                      __html: project.codePreview
                        .replace(/\/\/.*/g, (m) => `<span style="color:#888">${m}</span>`)
                        .replace(/\b(const|let|var|async|await|return|if|else|new)\b/g, `<span style="color:#E94560">$1</span>`)
                        .replace(/\b(function|=>)\b/g, `<span style="color:#60a5fa">$1</span>`)
                        .replace(/'([^']*)'/g, `<span style="color:#34d399">'$1'</span>`)
                        .replace(/"([^"]*)"/g, `<span style="color:#34d399">"$1"</span>`)
                        .replace(/`([^`]*)`/g, `<span style="color:#34d399">\`$1\`</span>`),
                    }} />
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Main Section ─────────────────────────────────────────────
const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-12">
          <span className="section-tag">// what I've built</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl" style={{ color: "var(--text)" }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="font-mono text-xs mt-3" style={{ color: "var(--text-muted)" }}>
            Click any card to explore details
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} onOpen={() => setSelectedProject(p)} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <a href="https://github.com/DEV-NSK" target="_blank" rel="noopener noreferrer" className="outline-btn">
            <SiGithub size={16} /> View All on GitHub
          </a>
        </motion.div>
      </motion.div>

      <ProjectPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default ProjectsSection;
