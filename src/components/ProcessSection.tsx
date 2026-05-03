import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { HiLightBulb, HiTemplate, HiCode, HiShieldCheck, HiCloudUpload, HiTrendingUp } from "react-icons/hi";

const steps = [
  { icon: HiLightBulb, title: "Idea & Problem", desc: "Understanding" },
  { icon: HiTemplate, title: "Design &", desc: "Architecture" },
  { icon: HiCode, title: "Development", desc: "Building" },
  { icon: HiShieldCheck, title: "Testing", desc: "Quality" },
  { icon: HiCloudUpload, title: "Deployment", desc: "Launch" },
  { icon: HiTrendingUp, title: "Scaling", desc: "Growth" },
];

const ProcessSection = () => (
  <SectionWrapper id="process">
    <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2">
      My <span className="gradient-text">Process</span>
    </h2>
    <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-16" />

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {steps.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass rounded-2xl p-6 text-center hover:glow-border transition-all duration-300 relative"
        >
          <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
            {i + 1}
          </div>
          <s.icon className="text-primary mx-auto mb-3" size={28} />
          <h4 className="font-display text-sm font-semibold">{s.title}</h4>
          <p className="text-xs text-muted-foreground">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default ProcessSection;
