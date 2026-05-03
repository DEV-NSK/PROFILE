import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { SiHtml5, SiJavascript, SiReact, SiNodedotjs, SiExpress, SiGithub, SiVercel, SiFirebase } from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { HiCog, HiChip, HiChat, HiLink } from "react-icons/hi";

const categories = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: SiHtml5, level: 90 },
      { name: "CSS", icon: FaCss3Alt, level: 85 },
      { name: "JavaScript", icon: SiJavascript, level: 85 },
      { name: "React", icon: SiReact, level: 80 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: 75 },
      { name: "Express.js", icon: SiExpress, level: 70 },
      { name: "API Dev", icon: HiLink, level: 80 },
    ],
  },
  {
    title: "AI & Automation",
    skills: [
      { name: "AI Integrations", icon: HiChip, level: 75 },
      { name: "Chatbot Systems", icon: HiChat, level: 70 },
      { name: "Automation", icon: HiCog, level: 80 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "GitHub", icon: SiGithub, level: 85 },
      { name: "Vercel", icon: SiVercel, level: 85 },
      { name: "Firebase", icon: SiFirebase, level: 75 },
    ],
  },
];

const SkillsSection = () => (
  <SectionWrapper id="skills">
    <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2">
      Technical <span className="gradient-text">Skills</span>
    </h2>
    <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-16" />

    <div className="grid md:grid-cols-2 gap-8">
      {categories.map((cat, ci) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: ci * 0.1 }}
          className="glass rounded-2xl p-6 hover:glow-border transition-all duration-300"
        >
          <h3 className="font-display text-lg font-semibold text-primary mb-6">{cat.title}</h3>
          <div className="space-y-5">
            {cat.skills.map((skill) => (
              <div key={skill.name} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm">
                    <skill.icon className="text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-foreground">{skill.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default SkillsSection;
