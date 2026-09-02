import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Terminal, ArrowUp, Mail, Phone } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#07080a] py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top footer row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#40E0D0] font-bold text-sm">
              <Terminal className="w-4 h-4" />
              <span>GURMUKH SINGH // ZENITH-SYSTEMS</span>
            </div>
            <p className="text-neutral-500 text-xs font-sans max-w-md">
              Architecting autonomous systems, data pipelines, and low-latency environments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-neutral-300">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-1.5 hover:text-[#40E0D0] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#40E0D0]" />
              <span>{PERSONAL_INFO.email}</span>
            </a>
            <span className="text-neutral-700 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#40E0D0]" />
              <span>{PERSONAL_INFO.phone}</span>
            </span>
          </div>
        </div>

        {/* Middle row: specs & stack acknowledgment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-[11px] text-neutral-500">
          <div className="p-3 rounded bg-black/40 border border-white/5">
            <span className="text-neutral-400 font-semibold block mb-1">FRONTEND ENGINE</span>
            <span>Vite 7 + React 19 + TypeScript</span>
          </div>

          <div className="p-3 rounded bg-black/40 border border-white/5">
            <span className="text-neutral-400 font-semibold block mb-1">ANIMATION CORE</span>
            <span>Anime.js v3.2 (Stagger &amp; Elastic)</span>
          </div>

          <div className="p-3 rounded bg-black/40 border border-white/5">
            <span className="text-neutral-400 font-semibold block mb-1">DESIGN INSPIRATION</span>
            <span>Hyprland / Niri Tiling WM + Bento</span>
          </div>

          <div className="p-3 rounded bg-black/40 border border-white/5">
            <span className="text-neutral-400 font-semibold block mb-1">TARGET ENVIRONMENT</span>
            <span>Pitch Black (#050505) + Turquoise (#40E0D0)</span>
          </div>
        </div>

        {/* Bottom copyright & scroll top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-[11px] text-neutral-600">
          <div>
            &copy; {new Date().getFullYear()} Gurmukh Singh. Designed with a sleeper-build aesthetic.
          </div>

          <button
            onClick={() => {
              soundFx.playKeyClick();
              onScrollToTop();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-[#40E0D0]/10 hover:text-[#40E0D0] border border-white/10 text-neutral-400 transition-all group"
          >
            <span>Return to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
