import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { HiAcademicCap } from "react-icons/hi";

const EducationSection = () => (
  <SectionWrapper id="education">
    <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2">
      <span className="gradient-text">Education</span>
    </h2>
    <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-16" />

    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="max-w-lg mx-auto glass rounded-2xl p-8 glow-border text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <HiAcademicCap className="text-primary" size={32} />
      </div>
      <h3 className="font-display text-xl font-semibold mb-2">St. Mary's Integrated Campus</h3>
      <p className="text-muted-foreground text-sm mb-1">Deshmukhi</p>
      <p className="text-primary font-medium">B.Tech Computer Science Engineering</p>
      <p className="text-muted-foreground text-sm mt-2">Expected Graduation: <span className="text-foreground">2026</span></p>
    </motion.div>
  </SectionWrapper>
);

export default EducationSection;
