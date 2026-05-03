import AntigravityScene from "@/components/AntigravityScene";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TimelineSection from "@/components/TimelineSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import StartupSection from "@/components/StartupSection";
import ProcessSection from "@/components/ProcessSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AntigravityScene />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <StartupSection />
      <ProcessSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
