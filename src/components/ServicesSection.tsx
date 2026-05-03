import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { HiChat, HiCog, HiGlobeAlt, HiChartBar, HiChip, HiCode } from "react-icons/hi";

const services = [
  { icon: HiChat, title: "AI Chatbots", desc: "Intelligent chatbots for customer support and automation." },
  { icon: HiCog, title: "Automation Systems", desc: "Automating business workflows to save time and reduce manual work." },
  { icon: HiGlobeAlt, title: "SaaS Platforms", desc: "Modern scalable SaaS applications for startups and businesses." },
  { icon: HiChartBar, title: "Dashboards", desc: "CRM, admin dashboards, and analytics platforms." },
  { icon: HiChip, title: "AI Applications", desc: "AI powered tools that improve productivity and insights." },
  { icon: HiCode, title: "Modern Websites", desc: "High-performance websites for businesses and startups." },
];

const ServicesSection = () => (
  <SectionWrapper id="services">
    <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2">
      What I Can <span className="gradient-text">Build</span>
    </h2>
    <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-16" />

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="glass rounded-2xl p-8 group hover:glow-border transition-all duration-300 cursor-default"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:glow-primary transition-all duration-300">
            <s.icon className="text-primary" size={24} />
          </div>
          <h3 className="font-display text-lg font-semibold mb-3">{s.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default ServicesSection;
