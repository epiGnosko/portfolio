import React, { useRef, useState } from 'react';
import anime from 'animejs';
import { PROJECTS } from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';
import { Terminal, Zap, Activity, Eye, FileText, Network, ExternalLink } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface BentoCardProps {
  project: ProjectItem;
  index: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<SVGRectElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [showArch, setShowArch] = useState(false);

  const handleMouseEnter = () => {
    soundFx.playHoverTone();

    // SVG stroke-dashoffset perimeter animation via Anime.js
    if (rectRef.current) {
      anime.remove(rectRef.current);
      anime({
        targets: rectRef.current,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 550
      });
    }

    // Card elevation translateZ
    if (contentRef.current) {
      anime.remove(contentRef.current);
      anime({
        targets: contentRef.current,
        translateY: -4,
        scale: 1.008,
        duration: 250,
        easing: 'easeOutQuad'
      });
    }
  };

  const handleMouseLeave = () => {
    if (rectRef.current) {
      anime.remove(rectRef.current);
      anime({
        targets: rectRef.current,
        strokeDashoffset: [0, anime.setDashoffset],
        easing: 'easeOutSine',
        duration: 400
      });
    }

    if (contentRef.current) {
      anime.remove(contentRef.current);
      anime({
        targets: contentRef.current,
        translateY: 0,
        scale: 1,
        duration: 250,
        easing: 'easeOutQuad'
      });
    }
  };

  const getCategoryIcon = (cat: string) => {
    if (cat.includes('Neuroevolution') || cat.includes('AI') || cat.includes('RAG')) return <Network className="w-4 h-4 text-[#40E0D0]" />;
    if (cat.includes('Vision')) return <Eye className="w-4 h-4 text-[#40E0D0]" />;
    if (cat.includes('ETL') || cat.includes('Document') || cat.includes('Automation')) return <FileText className="w-4 h-4 text-[#40E0D0]" />;
    return <Zap className="w-4 h-4 text-[#40E0D0]" />;
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-lg overflow-hidden ${project.gridSpan} bg-[#0c0e12]/80 backdrop-blur-md transition-shadow duration-300 p-[1px]`}
      style={{ perspective: 1000 }}
    >
      {/* SVG glowing perimeter border for Anime.js stroke-dashoffset trick */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        style={{ overflow: 'visible' }}
      >
        <rect
          ref={rectRef}
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="8"
          fill="none"
          stroke="#40E0D0"
          strokeWidth="2"
          strokeDasharray="2000"
          strokeDashoffset="2000"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(64, 224, 208, 0.75))'
          }}
        />
      </svg>

      {/* Static subtle border fallback */}
      <div className="absolute inset-0 rounded-lg border border-white/5 pointer-events-none z-10" />

      {/* Card Content with 3D elevation */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-between p-5 md:p-6 bg-gradient-to-b from-[#11141a]/90 to-[#0a0c10]/95 rounded-lg"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <div>
          {/* Top metadata row */}
          <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-3 select-none">
            <span className="flex items-center gap-1.5 text-[#40E0D0] font-semibold">
              {getCategoryIcon(project.category)}
              <span>{project.category}</span>
            </span>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#40E0D0]/10 text-[#40E0D0] border border-[#40E0D0]/20 font-bold">
                {project.metrics.label}: {project.metrics.value}
              </span>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFx.playKeyClick();
                  }}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-[#40E0D0]/20 text-neutral-300 hover:text-[#40E0D0] border border-white/10 hover:border-[#40E0D0]/40 transition-colors"
                  title="View GitHub Repository"
                >
                  <ExternalLink className="w-3 h-3 text-[#40E0D0]" />
                  <span className="text-[10px] uppercase font-mono">Repo</span>
                </a>
              )}
              <span className="text-neutral-600 font-light">#{index + 1}</span>
            </div>
          </div>

          {/* Project Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-[#40E0D0] transition-colors">
            {project.title}
          </h3>

          <p className="text-xs md:text-sm text-[#40E0D0]/90 font-mono mb-3">
            {project.summary}
          </p>

          <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-sans mb-4">
            {project.description}
          </p>

          {/* Architecture flow toggle */}
          <div className="mb-4">
            <button
              onClick={() => {
                soundFx.playKeyClick();
                setShowArch(!showArch);
              }}
              className="text-xs font-mono text-neutral-400 hover:text-[#40E0D0] flex items-center gap-1.5 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-[#40E0D0]" />
              <span>{showArch ? 'Hide Architecture Pipeline [-]' : 'Inspect Pipeline Specs [+]'}</span>
            </button>

            {showArch && (
              <div className="mt-2.5 p-3 rounded bg-black/70 border border-[#40E0D0]/30 font-mono text-[11px] text-neutral-300 leading-relaxed animate-fadeIn">
                <div className="text-[#40E0D0] text-[10px] uppercase font-bold mb-1 tracking-wider">
                  Data Flow / Microservice Pipeline:
                </div>
                {project.architectureNotes}
              </div>
            )}
          </div>
        </div>

        {/* Bottom tags & impact */}
        <div className="pt-4 border-t border-white/5 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
              <Activity className="w-3 h-3" />
              <span>{project.impact}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[11px] bg-white/5 text-neutral-300 border border-white/10 hover:border-[#40E0D0]/40 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BentoProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="mb-10 border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#40E0D0] uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded bg-[#40E0D0]" />
            <span>Workspace 03 // Production Artifacts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Systems &amp; Autonomous Projects
          </h2>
        </div>
        <div className="text-xs text-neutral-500 font-mono">
          <span className="text-neutral-400">Interaction:</span> Hover to ignite perimeter SVG vector stroke &amp; 3D elevation
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-4">
        {PROJECTS.map((project, index) => (
          <BentoCard key={project.id} project={project} index={index} />
        ))}
      </div>

    </section>
  );
};
