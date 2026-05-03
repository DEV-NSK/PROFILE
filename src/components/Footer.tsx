import { HiArrowUp } from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa";
import { SiInstagram, SiGithub } from "react-icons/si";

const Footer = () => (
  <footer className="border-t border-border py-12 px-4">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <p className="font-display font-semibold">© 2026 Bathula Naga Sai Kiran</p>
        <p className="text-sm text-muted-foreground">Full Stack Developer | AI Builder | Startup Founder</p>
      </div>
      <div className="flex items-center gap-4">
        {[
          { icon: FaLinkedinIn, url: "https://www.linkedin.com/in/bathula-naga-sai-kiran" },
          { icon: SiInstagram, url: "https://www.instagram.com/vibe.techie" },
          { icon: SiGithub, url: "https://github.com/DEV-NSK" },
        ].map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          >
            <s.icon size={16} />
          </a>
        ))}
        <a
          href="#"
          className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors ml-2"
        >
          <HiArrowUp size={16} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
