import { useState, useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TimelineSection from "@/components/TimelineSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollNav from "@/components/ScrollNav";
import NoiseOverlay from "@/components/NoiseOverlay";
import { useEasterEggs } from "@/hooks/useEasterEggs";

const Index = () => {
  // Check if returning visitor — skip loader
  const [showLoader, setShowLoader] = useState(() => {
    return !localStorage.getItem("portfolio_visited");
  });
  const [loaded, setLoaded] = useState(() => {
    return !!localStorage.getItem("portfolio_visited");
  });

  // Activate easter eggs globally
  useEasterEggs({ onReplayLoader: () => setShowLoader(true) });

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setLoaded(true);
    localStorage.setItem("portfolio_visited", "1");
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* Loading screen — first visit only */}
      {showLoader && <LoadingScreen onComplete={handleLoaderComplete} />}

      {/* Global UI — only render after load */}
      {loaded && (
        <>
          <CustomCursor />
          <ParticleBackground />
          <ScrollProgress />
          <NoiseOverlay />
          <Navbar />
          <ScrollNav />

          {/* Sections */}
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <TimelineSection />
            <ContactSection />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
