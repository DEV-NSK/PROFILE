import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const items = [
  { year: "2023", title: "Started Learning", desc: "Started learning programming and web development." },
  { year: "2024", title: "Building Projects", desc: "Built multiple frontend and automation projects." },
  { year: "2025", title: "SaaS & AI", desc: "Building SaaS platforms, AI tools, and client demos." },
  { year: "2026", title: "Graduation & Beyond", desc: "Graduating B.Tech CSE and building scalable tech products." },
];

const TimelineSection = () => (
  <SectionWrapper id="journey">
    <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2">
      My <span className="gradient-text">Journey</span>
    </h2>
    <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-16" />

    <div className="relative max-w-2xl mx-auto">
      {/* Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />

      {items.map((item, i) => (
        <motion.div
          key={item.year}
          initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          className={`relative mb-12 pl-16 md:pl-0 ${
            i % 2 === 0 ? "md:pr-[55%]" : "md:pl-[55%]"
          }`}
        >
          {/* Dot */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-primary glow-primary" />
          <div className="glass rounded-2xl p-6 hover:glow-border transition-all duration-300">
            <span className="text-primary font-mono text-sm">{item.year}</span>
            <h3 className="font-display text-lg font-semibold mt-1">{item.title}</h3>
            <p className="text-muted-foreground text-sm mt-2">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default TimelineSection;
