import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { EDUCATION_DATA, STATS, ACCOLADES } from '../data/portfolioData';
import { Trophy, Award, GraduationCap, CheckCircle2, TrendingUp, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const AchievementsEducation: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animatedStats, setAnimatedStats] = useState<Record<string, string>>({
    'isi-rank': '0',
    'leetcode': '0',
    'iit-cgpa': '0.0',
    'efficiency': '0'
  });
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            soundFx.playHoverTone();

            // Run Anime.js count-up for each stat
            STATS.forEach((stat) => {
              const counter = { val: 0 };
              const decimals = stat.decimals || 0;

              anime({
                targets: counter,
                val: stat.targetValue,
                duration: 1800,
                easing: 'easeOutExpo',
                round: decimals === 0 ? 1 : 10,
                update: () => {
                  setAnimatedStats((prev) => ({
                    ...prev,
                    [stat.id]: counter.val.toFixed(decimals)
                  }));
                }
              });
            });

            // Accolades cards fade-in stagger
            anime({
              targets: '.accolade-card',
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(150, { start: 200 }),
              duration: 800,
              easing: 'easeOutQuad'
            });

            // Education cards slide-in
            anime({
              targets: '.education-card',
              opacity: [0, 1],
              translateX: [-30, 0],
              delay: anime.stagger(150, { start: 300 }),
              duration: 900,
              easing: 'easeOutQuad'
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getStatIcon = (name: string) => {
    switch (name) {
      case 'trophy':
        return <Trophy className="w-5 h-5 text-[#40E0D0]" />;
      case 'code':
        return <TrendingUp className="w-5 h-5 text-[#40E0D0]" />;
      case 'award':
        return <Award className="w-5 h-5 text-[#40E0D0]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#40E0D0]" />;
    }
  };

  return (
    <section id="achievements" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="mb-12 border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 font-mono">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#40E0D0] uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded bg-[#40E0D0]" />
            <span>Workspace 05 // Metrics &amp; Proven Benchmarks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Accolades, Rankings &amp; Education
          </h2>
        </div>
        <div className="text-xs text-neutral-500 font-mono">
          <span>Animation: Anime.js numeric interpolation (0 → target)</span>
        </div>
      </div>

      {/* Numerical Stats Count-up Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14 font-mono">
        {STATS.map((stat) => (
          <div
            key={stat.id}
            className="hypr-card p-5 rounded-lg border border-white/10 flex flex-col justify-between group hover:border-[#40E0D0]/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 rounded bg-[#40E0D0]/10 border border-[#40E0D0]/20">
                {getStatIcon(stat.iconName)}
              </span>
              <span className="text-[10px] text-neutral-500 bg-white/5 px-2 py-0.5 rounded">
                BENCHMARK
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-[#40E0D0] transition-colors tracking-tight">
                <span>{stat.prefix || ''}</span>
                <span>{animatedStats[stat.id] || '0'}</span>
                <span>{stat.suffix || ''}</span>
              </div>
              <div className="text-sm font-semibold text-neutral-200 mt-1">
                {stat.label}
              </div>
            </div>

            <p className="text-xs text-neutral-400 mt-3 pt-3 border-t border-white/5 font-sans leading-normal">
              {stat.subtext}
            </p>
          </div>
        ))}
      </div>

      {/* Accolades & Competitive Honors */}
      <div className="mb-14">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-mono">
          <Trophy className="w-5 h-5 text-[#40E0D0]" />
          <span>Competitive Accolades &amp; Honors</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ACCOLADES.map((item, idx) => (
            <div
              key={idx}
              className="accolade-card opacity-0 hypr-card p-6 rounded-lg border border-white/10 flex flex-col justify-between group hover:border-[#40E0D0]/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-[#40E0D0] font-bold">{item.category}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>

                <div className="text-2xl font-black text-white mb-1 group-hover:text-[#40E0D0] transition-colors font-mono">
                  {item.achievement}
                </div>

                <div className="text-xs text-[#40E0D0] font-mono mb-3">
                  {item.badge}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Rank status: {item.rank}</span>
                <Star className="w-3.5 h-3.5 text-[#40E0D0]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Education Section */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-mono">
          <GraduationCap className="w-5 h-5 text-[#40E0D0]" />
          <span>Academic Foundation</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {EDUCATION_DATA.map((edu, eIdx) => (
            <div
              key={eIdx}
              className="education-card opacity-0 hypr-card p-6 sm:p-7 rounded-lg border border-white/10 flex flex-col justify-between group hover:border-[#40E0D0]/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-2">
                  <span className="text-[#40E0D0] font-semibold">{edu.period}</span>
                  <span className="px-2 py-0.5 rounded bg-[#40E0D0]/10 text-[#40E0D0] border border-[#40E0D0]/20 font-bold">
                    CGPA: {edu.cgpa} / {edu.maxCgpa}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-[#40E0D0] transition-colors mb-1">
                  {edu.institution}
                </h4>

                <div className="text-sm font-medium text-neutral-300 mb-4">
                  {edu.degree}
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5 font-sans">
                  {edu.details}
                </p>

                {/* Coursework pills */}
                <div>
                  <div className="text-xs font-mono text-neutral-400 mb-2">
                    Key Coursework:
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {edu.coursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded bg-black/50 text-neutral-300 border border-white/10 text-[11px]"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Verified Academic Record</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#40E0D0]" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
