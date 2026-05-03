import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { HiMail, HiPhone } from "react-icons/hi";
import { SiInstagram, SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

const socials = [
  { icon: FaLinkedinIn, url: "https://www.linkedin.com/in/bathula-naga-sai-kiran", label: "LinkedIn" },
  { icon: SiInstagram, url: "https://www.instagram.com/vibe.techie", label: "Instagram" },
  { icon: SiGithub, url: "https://github.com/DEV-NSK", label: "GitHub" },
];

const ContactSection = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <SectionWrapper id="contact">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2">
        Get In <span className="gradient-text">Touch</span>
      </h2>
      <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-16" />

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Info */}
        <div>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Have a project in mind or want to collaborate? Let's connect and build something amazing together.
          </p>
          <div className="space-y-4 mb-8">
            <a href="mailto:bathulasaikira2k2@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                <HiMail className="text-primary" />
              </div>
              bathulasaikira2k2@gmail.com
            </a>
            <a href="tel:+919014794676" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                <HiPhone className="text-primary" />
              </div>
              +91 9014794676
            </a>
          </div>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-border transition-all duration-300"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            required
            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary/50 focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors resize-none"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:shadow-[0_0_30px_hsl(190_95%_50%/0.4)] transition-all duration-300"
          >
            {sent ? "✓ Message Sent!" : "Send Message"}
          </motion.button>
        </form>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
