import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { HiSparkles } from "react-icons/hi";

const StartupSection = () => (
  <SectionWrapper id="startup">
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-8 text-sm font-medium"
      >
        <HiSparkles /> Startup Builder
      </motion.div>

      <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
        Building the <span className="gradient-text">Future</span>
      </h2>

      <div className="glass rounded-3xl p-8 md:p-12 glow-border">
        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
          Currently building a startup product focused on <span className="text-foreground font-medium">men styling and fashion guidance</span>.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The goal is to create a smart platform that helps men improve their personal style using modern technology and intelligent recommendations.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="px-6 py-3 rounded-xl bg-accent/10 text-accent border border-accent/20 font-medium text-sm">
            🚀 Coming Soon
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default StartupSection;
