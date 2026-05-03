import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { HiExternalLink } from "react-icons/hi";

const projects = [
  {
    title: "YouTube AI Learning App",
    desc: "AI tool that converts YouTube videos into summaries and podcasts.",
    url: "https://youtube-ai-eight.vercel.app/",
    tags: ["AI", "React", "API"],
  },
  {
    title: "Hotel Room Booking System",
    desc: "Modern hotel booking platform.",
    url: "https://hotel-room-booking-liard.vercel.app/",
    tags: ["React", "Full Stack"],
  },
  {
    title: "CRM Dashboard",
    desc: "Customer relationship management dashboard.",
    url: "https://crm-gray-six.vercel.app/dashboard",
    tags: ["Dashboard", "React"],
  },
  {
    title: "Real Estate Platform",
    desc: "Property listing and management website.",
    url: "https://real-estate-one-beige.vercel.app/",
    tags: ["Full Stack", "React"],
  },
  {
    title: "Compliance Platform",
    desc: "Compliance monitoring interface.",
    url: "https://icompaas.vercel.app/",
    tags: ["SaaS", "Dashboard"],
  },
  {
    title: "Travel Diary",
    desc: "Personal travel journaling platform.",
    url: "https://travel-diary-saikira.vercel.app/",
    tags: ["React", "Firebase"],
  },
  {
    title: "Careera Platform",
    desc: "Career guidance and planning platform.",
    url: "https://careera-lake.vercel.app/",
    tags: ["AI", "Full Stack"],
  },
];

const ProjectsSection = () => (
  <SectionWrapper id="projects">
    <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2">
      Featured <span className="gradient-text">Projects</span>
    </h2>
    <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-16" />

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p, i) => (
        <motion.a
          key={p.title}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="glass rounded-2xl overflow-hidden group hover:glow-border transition-all duration-300 block"
        >
          {/* Preview gradient */}
          <div className="h-40 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent flex items-center justify-center relative overflow-hidden">
            <span className="font-display text-xl font-bold text-primary/30 group-hover:text-primary/50 transition-colors">
              {p.title.split(" ").map(w => w[0]).join("")}
            </span>
            <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <HiExternalLink className="text-primary" size={16} />
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/10">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  </SectionWrapper>
);

export default ProjectsSection;
