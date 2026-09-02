import { useState, useEffect } from 'react';
import { ArchBootSequence } from './components/ArchBootSequence';
import { ConstellationCanvas } from './components/ConstellationCanvas';
import { WaybarHeader } from './components/WaybarHeader';
import { HeroSection } from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { BentoProjectsSection } from './components/BentoProjectsSection';
import { NeovimSkillsTerminal } from './components/NeovimSkillsTerminal';
import { AchievementsEducation } from './components/AchievementsEducation';
import { HyprlandKeybindsModal } from './components/HyprlandKeybindsModal';
import { Footer } from './components/Footer';
import { soundFx } from './utils/soundEffects';

export function App() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [isRebooting, setIsRebooting] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isKeybindsOpen, setIsKeybindsOpen] = useState(false);

  // Smooth navigation to sections
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -60;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Re-trigger simulated Arch boot sequence
  const handleReboot = () => {
    setIsRebooting(true);
    setBootCompleted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBootComplete = () => {
    setBootCompleted(true);
    setIsRebooting(false);
  };

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'projects', 'skills', 'achievements'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Hyprland-style keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === '1') {
        soundFx.playKeyClick();
        scrollToSection('hero');
      } else if (e.key === '2') {
        soundFx.playKeyClick();
        scrollToSection('experience');
      } else if (e.key === '3') {
        soundFx.playKeyClick();
        scrollToSection('projects');
      } else if (e.key === '4') {
        soundFx.playKeyClick();
        scrollToSection('skills');
      } else if (e.key === '5') {
        soundFx.playKeyClick();
        scrollToSection('achievements');
      } else if (e.key === 'b' || e.key === 'B') {
        soundFx.playKeyClick();
        handleReboot();
      } else if (e.key === 't' || e.key === 'T') {
        soundFx.playKeyClick();
        scrollToSection('skills');
      } else if (e.key === '?' || e.key === '/') {
        soundFx.playKeyClick();
        setIsKeybindsOpen(true);
      } else if (e.key === 'm' || e.key === 'M') {
        soundFx.enabled = !soundFx.enabled;
        soundFx.playKeyClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-[#40E0D0]/20 selection:text-[#40E0D0]">
      
      {/* 1. Simulated Loading Flash Screen (Arch Boot Sequence) */}
      {(!bootCompleted || isRebooting) && (
        <ArchBootSequence
          onComplete={handleBootComplete}
          isRebooting={isRebooting}
        />
      )}

      {/* 2. Interactive Constellation & Dot-Grid Background Canvas */}
      <ConstellationCanvas />

      {/* Main Workspace Frame */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Pinned Hyprland Waybar Top Status Header */}
        <WaybarHeader
          activeSection={activeSection}
          onNavigate={scrollToSection}
          onReboot={handleReboot}
          onOpenKeybinds={() => setIsKeybindsOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Section 2: Main Hero Section */}
          <HeroSection
            onNavigateToProjects={() => scrollToSection('projects')}
            onNavigateToTerminal={() => scrollToSection('skills')}
          />

          {/* Section 3: Experience Section (Tiling Layout) */}
          <ExperienceSection />

          {/* Section 4: Projects (Hover-Triggered Bento Box Grid) */}
          <BentoProjectsSection />

          {/* Section 5: Skills & Terminal Component */}
          <NeovimSkillsTerminal />

          {/* Section 6: Achievements & Education */}
          <AchievementsEducation />
        </main>

        {/* Footer */}
        <Footer onScrollToTop={() => scrollToSection('hero')} />

        {/* Hyprland Keybindings Modal */}
        <HyprlandKeybindsModal
          isOpen={isKeybindsOpen}
          onClose={() => setIsKeybindsOpen(false)}
        />
      </div>

    </div>
  );
}

export default App;
