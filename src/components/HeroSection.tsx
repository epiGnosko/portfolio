import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight, Terminal, Shield, Zap, Sparkles, ExternalLink } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface HeroSectionProps {
  onNavigateToProjects: () => void;
  onNavigateToTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToProjects,
  onNavigateToTerminal
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const titleContainerRef = useRef<HTMLHeadingElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const cardGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Staggered letter reveal for the name using Anime.js
    const letters = document.querySelectorAll('.hero-letter');
    if (letters.length > 0) {
      anime.remove('.hero-letter');
      anime({
        targets: '.hero-letter',
        opacity: [0, 1],
        translateY: [24, 0],
        scale: [0.8, 1],
        delay: anime.stagger(45, { start: 200 }),
        duration: 750,
        easing: 'easeOutExpo'
      });
    }

    // Subtitle & status badges entrance
    if (badgeRef.current) {
      anime({
        targets: badgeRef.current,
        opacity: [0, 1],
        translateY: [-12, 0],
        duration: 600,
        delay: 150,
        easing: 'easeOutQuad'
      });
    }

    if (cardGridRef.current) {
      anime({
        targets: '.hero-card-stagger',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100, { start: 400 }),
        duration: 800,
        easing: 'easeOutQuad'
      });
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    soundFx.playKeyClick();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    soundFx.playKeyClick();
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // Name split into individual spans for Anime.js staggered reveal
  const renderLetters = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="hero-letter inline-block opacity-0 font-bold"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      
      {/* Top micro status pill */}
      <div ref={badgeRef} className="opacity-0 mb-6 flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#40E0D0]/10 border border-[#40E0D0]/30 text-[#40E0D0] shadow-[0_0_12px_rgba(64,224,208,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#40E0D0] animate-ping" />
          <span>SLEEPER_BUILD // HYPRLAND_READY</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-400">
          <Shield className="w-3 h-3 text-[#40E0D0]" />
          <span>Kernel: {PERSONAL_INFO.systemSpecs.kernel}</span>
        </span>
        <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-400">
          <Zap className="w-3 h-3 text-[#40E0D0]" />
          <span>IPC Latency: &lt;0.28ms</span>
        </span>
      </div>

      {/* Main Name & Tagline */}
      <div className="space-y-4 mb-8">
        <h1
          ref={titleContainerRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white font-extrabold font-sans select-none"
        >
          {renderLetters(PERSONAL_INFO.name)}
        </h1>

        <p className="text-lg sm:text-2xl md:text-3xl text-neutral-300 font-medium max-w-4xl tracking-tight leading-snug">
          <span className="text-[#40E0D0] font-semibold">Architecting</span> autonomous systems, data pipelines, and low-latency environments.
        </p>

        <p className="text-sm sm:text-base text-neutral-400 font-normal max-w-3xl leading-relaxed">
          {PERSONAL_INFO.bio}
        </p>
      </div>

      {/* Tiling bento box layout for Hero metadata & quick actions */}
      <div ref={cardGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
        
        {/* Card 1: Contact Direct Line */}
        <div className="hero-card-stagger opacity-0 hypr-card p-4 rounded-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
            <span className="text-[#40E0D0] font-semibold flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" /> [01: CONTACT]
            </span>
            <span className="text-[10px] text-neutral-500">RAW_SOCKET</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5 group hover:border-[#40E0D0]/30 transition-all">
              <div className="flex items-center gap-2 text-neutral-300 truncate">
                <Mail className="w-3.5 h-3.5 text-[#40E0D0] shrink-0" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1 rounded text-neutral-400 hover:text-[#40E0D0] transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5 group hover:border-[#40E0D0]/30 transition-all">
              <div className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-3.5 h-3.5 text-[#40E0D0] shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>
              <button
                onClick={handleCopyPhone}
                className="p-1 rounded text-neutral-400 hover:text-[#40E0D0] transition-colors"
                title="Copy Phone"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#40E0D0]" /> {PERSONAL_INFO.location}</span>
            <span className="text-emerald-400">● Open for hire</span>
          </div>
        </div>

        {/* Card 2: Environment Specs (Sleeper Rig) */}
        <div className="hero-card-stagger opacity-0 hypr-card p-4 rounded-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
            <span className="text-[#40E0D0] font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> [02: WORKSTATION]
            </span>
            <span className="text-[10px] text-neutral-500">zenith.arch</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded bg-black/40 border border-white/5">
              <span className="text-[10px] text-neutral-500 block">WINDOW MGR</span>
              <span className="text-neutral-200 font-semibold">{PERSONAL_INFO.systemSpecs.wm}</span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-white/5">
              <span className="text-[10px] text-neutral-500 block">PRIMARY SHELL</span>
              <span className="text-neutral-200 font-semibold">{PERSONAL_INFO.systemSpecs.shell}</span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-white/5">
              <span className="text-[10px] text-neutral-500 block">CORE EDITOR</span>
              <span className="text-neutral-200 font-semibold">{PERSONAL_INFO.systemSpecs.editor}</span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-white/5">
              <span className="text-[10px] text-neutral-500 block">COMPUTE STATUS</span>
              <span className="text-emerald-400 font-semibold">100% Deterministic</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
            <span>Uptime: {PERSONAL_INFO.systemSpecs.uptime}</span>
            <span className="text-[#40E0D0]">v0.42-wayland</span>
          </div>
        </div>

        {/* Card 3: Instant Interactive Routing */}
        <div className="hero-card-stagger opacity-0 hypr-card p-4 rounded-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
            <span className="text-[#40E0D0] font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> [03: FAST EXECUTION]
            </span>
            <span className="text-[10px] text-neutral-500">SNAP_ACTION</span>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                soundFx.playKeyClick();
                onNavigateToProjects();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded bg-[#40E0D0]/10 hover:bg-[#40E0D0]/20 border border-[#40E0D0]/30 text-[#40E0D0] text-xs font-semibold transition-all group"
            >
              <span>Explore Bento Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                soundFx.playKeyClick();
                onNavigateToTerminal();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs transition-all group"
            >
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-[#40E0D0]" />
                <span>Open Interactive Neovim</span>
              </span>
              <span className="text-[10px] text-neutral-500 font-mono group-hover:text-neutral-300">:edit</span>
            </button>
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
            <a
              href="mailto:gurmukh050304@gmail.com"
              className="text-neutral-400 hover:text-[#40E0D0] flex items-center gap-1 transition-colors"
            >
              <span>Transmit Dispatch</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-neutral-500 font-mono">Mod+Return</span>
          </div>
        </div>

      </div>

    </section>
  );
};
