import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { SiReact, SiNodedotjs, SiFirebase, SiVercel, SiGithub } from "react-icons/si";

const floatingIcons = [
  { Icon: SiReact, delay: 0, x: -60, y: -40 },
  { Icon: SiNodedotjs, delay: 0.5, x: 60, y: -20 },
  { Icon: SiFirebase, delay: 1, x: -40, y: 40 },
  { Icon: SiVercel, delay: 1.5, x: 50, y: 50 },
  { Icon: SiGithub, delay: 2, x: -70, y: 10 },
];

const AboutSection = () => (
  <SectionWrapper id="about">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Left - Avatar & floating icons */}
      <div className="relative flex justify-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="w-64 h-64 md:w-80 md:h-80 rounded-3xl glass glow-border overflow-hidden relative"
        >
          <img 
            src="/profile.jpg" 
            alt="Naga Sai Kiran" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        {floatingIcons.map(({ Icon, delay, x, y }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay * 0.3, duration: 0.5 }}
            className="absolute"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
          >
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-primary animate-float" style={{ animationDelay: `${delay}s` }}>
              <Icon size={20} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right - Text */}
      <div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
          About <span className="gradient-text">Me</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mb-8" />
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I am <span className="text-foreground font-medium">Bathula Naga Sai Kiran</span>, a B.Tech Computer Science Engineering student graduating in 2026 from St. Mary's Integrated Campus.
          </p>
          <p>
            I specialize in building modern web applications, AI‑powered tools, automation workflows, and scalable SaaS platforms.
          </p>
          <p>
            I enjoy solving real‑world problems using technology and creating smart systems that improve business productivity.
          </p>
          <p>
            Currently I am also building my own startup product focused on men styling and fashion guidance using technology.
          </p>
        </div>
        <div className="flex gap-6 mt-8">
          {[
            { num: "10+", label: "Projects" },
            { num: "3+", label: "Years Coding" },
            { num: "2026", label: "Graduating" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-display font-bold text-primary">{s.num}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default AboutSection;
