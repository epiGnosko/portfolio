import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { EXPERIENCES } from '../data/portfolioData';
import type { ExperienceItem } from '../types/portfolio';
import { Calendar, MapPin, CheckCircle2, Layers, Server, Users, Award } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const direction = entry.target.getAttribute('data-direction');
            const targetEl = entry.target as HTMLElement;

            // Trigger Anime.js elastic slide-in
            anime({
              targets: targetEl,
              translateX: [direction === 'left' ? -70 : 70, 0],
              opacity: [0, 1],
              scale: [0.95, 1],
              duration: 1150,
              easing: 'easeOutElastic(1, .8)',
              begin: () => {
                soundFx.playHoverTone();
              }
            });

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const getTypeIcon = (type: ExperienceItem['type']) => {
    switch (type) {
      case 'internship':
        return <Server className="w-4 h-4 text-[#40E0D0]" />;
      case 'leadership':
        return <Users className="w-4 h-4 text-[#40E0D0]" />;
      case 'mentorship':
        return <Award className="w-4 h-4 text-[#40E0D0]" />;
    }
  };

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Tiling Section Header */}
      <div className="mb-12 border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#40E0D0] uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded bg-[#40E0D0]" />
            <span>Workspace 02 // Process Tree</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering & Leadership Experience
          </h2>
        </div>
        <div className="text-xs text-neutral-500 font-mono flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <Layers className="w-3.5 h-3.5 text-[#40E0D0]" />
            <span>Layout: Hyprland Split</span>
          </span>
          <span className="text-neutral-700">|</span>
          <span>Easing: easeOutElastic(1, .8)</span>
        </div>
      </div>

      {/* Interactive Tiling Experience Blocks */}
      <div className="space-y-6">
        {EXPERIENCES.map((item, index) => {
          const isEven = index % 2 === 0;
          const direction = isEven ? 'left' : 'right';

          return (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              data-exp-index={index}
              data-direction={direction}
              className="opacity-0 hypr-card rounded-lg overflow-hidden border border-white/10 hover:border-[#40E0D0]/40 transition-all duration-300 group"
            >
              {/* Hyprland Window Title Bar */}
              <div className="bg-[#0b0d10] px-4 py-2 border-b border-white/5 flex items-center justify-between font-mono text-xs select-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-neutral-600">|</span>
                  <span className="text-neutral-400 group-hover:text-[#40E0D0] transition-colors flex items-center gap-1.5">
                    {getTypeIcon(item.type)}
                    <span className="font-semibold text-neutral-200">{item.company}</span>
                    <span className="text-neutral-500">[{item.role.toLowerCase().replace(/\s+/g, '_')}.sh]</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300 text-[10px]">
                    {item.badge}
                  </span>
                  <span className="text-neutral-500 hidden sm:inline">pid:{4000 + index * 42}</span>
                </div>
              </div>

              {/* Window Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#40E0D0] transition-colors">
                      {item.role}
                    </h3>
                    <div className="text-[#40E0D0] font-medium text-base mt-0.5">
                      {item.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                      <Calendar className="w-3.5 h-3.5 text-[#40E0D0]" />
                      <span>{item.period}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-[#40E0D0]" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                <p className="text-sm md:text-base text-neutral-300 leading-relaxed mb-6 font-sans">
                  {item.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2.5 mb-6">
                  {item.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-[#40E0D0] shrink-0 mt-0.5 opacity-80 group-hover:opacity-100" />
                      <span className="leading-normal">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-1.5 font-mono text-xs">
                  <span className="text-neutral-500 text-[11px] mr-1">STACK:</span>
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-black/60 text-neutral-300 border border-white/10 group-hover:border-[#40E0D0]/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
