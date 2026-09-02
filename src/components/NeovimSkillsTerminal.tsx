import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';
import { Terminal, Code, ChevronRight } from 'lucide-react';

export const NeovimSkillsTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editor' | 'interactive'>('editor');
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [typedOutput, setTypedOutput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [cliInput, setCliInput] = useState<string>('');
  const [cliHistory, setCliHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'whoami', output: 'gurmukh (Autonomous Systems & Low-Latency Engineer)' },
    { cmd: 'uname -srm', output: 'Linux 6.12.9-arch1-1-zen x86_64' },
    { cmd: 'cat /proc/skills', output: 'Languages: Python, Rust, C/C++, Java, R, SQL, TypeScript\nTech: NEAT, Computer Vision, Docker, Linux, Git, n8n, PyTorch, LaTeX' }
  ]);

  const typingAnimationRef = useRef<anime.AnimeInstance | null>(null);
  const cliEndRef = useRef<HTMLDivElement | null>(null);

  // Skill text generation for recursive typing
  const getCategoryScript = (catIndex: number): string => {
    const cat = SKILL_CATEGORIES[catIndex];
    let script = `// --- ${cat.name.toUpperCase()} ---\n`;
    script += `export const ${cat.name.replace(/[^a-zA-Z0-9]/g, '')} = {\n`;
    cat.skills.forEach((s) => {
      script += `  "${s.name}": { level: "${s.level}", domain: "${s.tag}", stack: "${s.details}" },\n`;
    });
    script += `};\n`;
    return script;
  };

  const activeCategoryIndexRef = useRef(activeCategoryIndex);

  // Recursive Anime.js timeline function
  useEffect(() => {
    if (activeTab !== 'editor') return;

    let isMounted = true;

    const startRecursiveTyping = (catIdx: number) => {
      if (!isMounted) return;
      setActiveCategoryIndex(catIdx);
      activeCategoryIndexRef.current = catIdx;
      setIsTyping(true);

      const targetText = getCategoryScript(catIdx);
      const textHolder = { length: 0 };

      // Cancel previous animation if any
      if (typingAnimationRef.current) {
        typingAnimationRef.current.pause();
      }

      // Anime.js timeline typing out text smoothly
      const timeline = anime.timeline({
        easing: 'linear',
        complete: () => {
          if (!isMounted) return;
          setIsTyping(false);
          // Pause at completion, then recursively advance to the next category
          setTimeout(() => {
            if (!isMounted) return;
            const nextIdx = (catIdx + 1) % SKILL_CATEGORIES.length;
            startRecursiveTyping(nextIdx);
          }, 3500);
        }
      });

      timeline.add({
        targets: textHolder,
        length: targetText.length,
        duration: targetText.length * 18, // snappy typewriter speed
        round: 1,
        update: () => {
          if (!isMounted) return;
          setTypedOutput(targetText.substring(0, textHolder.length));
          if (Math.random() > 0.6) {
            soundFx.playKeyClick();
          }
        }
      });

      typingAnimationRef.current = timeline;
    };

    startRecursiveTyping(activeCategoryIndexRef.current);

    return () => {
      isMounted = false;
      if (typingAnimationRef.current) {
        typingAnimationRef.current.pause();
      }
    };
  }, [activeTab]);

  const handleManualCategorySelect = (idx: number) => {
    soundFx.playKeyClick();
    if (typingAnimationRef.current) {
      typingAnimationRef.current.pause();
    }
    setActiveCategoryIndex(idx);
    const targetText = getCategoryScript(idx);
    setTypedOutput(targetText);
    setIsTyping(false);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim();
    if (!cmd) return;

    soundFx.playKeyClick();
    let res = '';
    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setCliHistory([]);
      setCliInput('');
      return;
    } else if (lower === 'help') {
      res = 'Available commands: whoami, skills, languages, tech, uname, neofetch, clear, contact';
    } else if (lower === 'skills' || lower === 'languages') {
      res = 'Languages: Python, Rust, C/C++, Java, R, SQL, TypeScript/JavaScript\nTech: AI/ML (NEAT, Computer Vision), Docker, Linux (Arch/Debian), Git, n8n, PyTorch, LaTeX';
    } else if (lower === 'tech') {
      res = 'Core Tooling: Docker, n8n, Linux, Git, PyTorch, OpenCV, LaTeX, Neovim, Wayland';
    } else if (lower === 'whoami') {
      res = 'Gurmukh Singh — Systems, Autonomous Agents & Low-Latency Architecture';
    } else if (lower === 'uname' || lower === 'uname -a') {
      res = 'Linux zenith-workstation 6.12.9-arch1-1-zen #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux';
    } else if (lower === 'neofetch') {
      res = `OS: Arch Linux x86_64\nHost: Zenith Custom Sleeper Build\nKernel: 6.12.9-arch1-1-zen\nUptime: 14 days, 3 hours\nShell: zsh 5.9\nWM: Hyprland (Wayland)\nTerminal: alacritty\nCPU: High-Throughput x86_64 (16 Cores)\nMemory: 4.8GiB / 32.0GiB`;
    } else if (lower === 'contact') {
      res = 'Email: gurmukh050304@gmail.com | Phone: +91 9992153036';
    } else {
      res = `zsh: command not found: ${cmd}. Type 'help' for valid commands.`;
    }

    setCliHistory((prev) => [...prev, { cmd, output: res }]);
    setCliInput('');

    setTimeout(() => {
      if (cliEndRef.current) {
        cliEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const currentCategory = SKILL_CATEGORIES[activeCategoryIndex];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-mono">
      
      {/* Section Header */}
      <div className="mb-10 border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#40E0D0] uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded bg-[#40E0D0]" />
            <span>Workspace 04 // Neovim Buffer &amp; Core Runtime</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Technical Arsenal &amp; Skill Matrix
          </h2>
        </div>

        {/* Tab switcher: Neovim vs Interactive Shell */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-md border border-white/10 text-xs">
          <button
            onClick={() => {
              soundFx.playKeyClick();
              setActiveTab('editor');
            }}
            className={`px-3 py-1 rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'editor'
                ? 'bg-[#40E0D0] text-black font-bold shadow-[0_0_12px_rgba(64,224,208,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>nvim: skills.ts</span>
          </button>

          <button
            onClick={() => {
              soundFx.playKeyClick();
              setActiveTab('interactive');
            }}
            className={`px-3 py-1 rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'interactive'
                ? 'bg-[#40E0D0] text-black font-bold shadow-[0_0_12px_rgba(64,224,208,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>zsh: interactive</span>
          </button>
        </div>
      </div>

      {/* Main Mock Neovim / Terminal Window */}
      <div className="hypr-card rounded-lg overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Neovim Top Buffer Tabs */}
        <div className="bg-[#090b0e] px-3 py-1.5 border-b border-white/10 flex items-center justify-between text-xs select-none">
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleManualCategorySelect(0)}
              className={`px-3 py-1 rounded-t flex items-center gap-1.5 transition-all text-xs ${
                activeCategoryIndex === 0 && activeTab === 'editor'
                  ? 'bg-[#12151b] text-[#40E0D0] border-b-2 border-[#40E0D0] font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>1: languages.ts</span>
            </button>

            <button
              onClick={() => handleManualCategorySelect(1)}
              className={`px-3 py-1 rounded-t flex items-center gap-1.5 transition-all text-xs ${
                activeCategoryIndex === 1 && activeTab === 'editor'
                  ? 'bg-[#12151b] text-[#40E0D0] border-b-2 border-[#40E0D0] font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>2: ai_pipelines.ts</span>
            </button>

            <button
              onClick={() => handleManualCategorySelect(2)}
              className={`px-3 py-1 rounded-t flex items-center gap-1.5 transition-all text-xs ${
                activeCategoryIndex === 2 && activeTab === 'editor'
                  ? 'bg-[#12151b] text-[#40E0D0] border-b-2 border-[#40E0D0] font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>3: systems_devops.ts</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-neutral-500 text-[11px]">
            <span>TS-LSP: Connected</span>
            <span className="text-[#40E0D0]">● 0 errors</span>
          </div>
        </div>

        {/* Editor Body */}
        {activeTab === 'editor' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] bg-[#080a0d]">
            
            {/* Code Gutter & Buffer Area (Left: 7 cols) */}
            <div className="lg:col-span-7 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto relative">
              <div className="flex gap-4">
                
                {/* Line numbers */}
                <div className="select-none text-neutral-600 text-right pr-2 border-r border-white/5 space-y-0.5">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div
                      key={i}
                      className={i === 2 ? 'text-[#40E0D0] font-bold' : ''}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Animated Typing Code Content */}
                <div className="flex-1 whitespace-pre font-mono text-neutral-300">
                  <span className="text-[#40E0D0] font-medium">{typedOutput}</span>
                  <span className="inline-block w-2.5 h-4.5 bg-[#40E0D0] cursor-blink align-middle ml-0.5 shadow-[0_0_8px_#40E0D0]" />
                </div>
              </div>

              {/* Status pill */}
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
                  <span>{isTyping ? 'Anime.js Timeline typing...' : 'Buffer synchronized'}</span>
                </span>
                <span className="text-neutral-400">Click tabs above to switch</span>
              </div>
            </div>

            {/* Structured Visual Cards for Active Category (Right: 5 cols) */}
            <div className="lg:col-span-5 p-4 sm:p-6 bg-[#0c0e12]/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-[#40E0D0] uppercase font-bold tracking-wider">
                    {currentCategory.name}
                  </div>
                  <span className="text-[10px] text-neutral-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {currentCategory.skills.length} Items Indexed
                  </span>
                </div>

                <div className="space-y-2 max-h-[310px] overflow-y-auto pr-1">
                  {currentCategory.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded bg-black/40 border border-white/5 hover:border-[#40E0D0]/30 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white group-hover:text-[#40E0D0] transition-colors flex items-center gap-1.5">
                          <ChevronRight className="w-3 h-3 text-[#40E0D0]" />
                          <span>{skill.name}</span>
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#40E0D0]/10 text-[#40E0D0] border border-[#40E0D0]/20 font-semibold">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-sans pl-4">
                        {skill.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-neutral-500 flex items-center justify-between">
                <span>Domain: {currentCategory.description}</span>
                <span className="text-[#40E0D0]">READY</span>
              </div>
            </div>

          </div>
        ) : (
          /* Interactive Terminal Shell */
          <div className="p-4 sm:p-6 bg-[#080a0d] min-h-[380px] flex flex-col justify-between text-xs sm:text-sm font-mono">
            <div className="space-y-3 overflow-y-auto max-h-[320px] pr-2">
              <div className="text-neutral-500 text-xs">
                Welcome to Zenith Shell v2.4 (Gurmukh Singh Systems Workstation). Type <span className="text-[#40E0D0] font-bold">help</span> to view commands.
              </div>

              {cliHistory.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <span className="text-[#40E0D0]">gurmukh@zenith:~$</span>
                    <span className="text-white font-semibold">{item.cmd}</span>
                  </div>
                  <pre className="text-neutral-300 whitespace-pre-wrap pl-4 font-mono text-xs leading-relaxed border-l-2 border-[#40E0D0]/30 py-0.5">
                    {item.output}
                  </pre>
                </div>
              ))}
              <div ref={cliEndRef} />
            </div>

            {/* Command input prompt */}
            <form onSubmit={handleCliSubmit} className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
              <span className="text-[#40E0D0] shrink-0">gurmukh@zenith:~$</span>
              <input
                type="text"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="type 'skills', 'whoami', 'neofetch', or 'contact'..."
                className="flex-1 bg-transparent text-white focus:outline-none placeholder-neutral-600 font-mono text-xs sm:text-sm"
                autoFocus
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded bg-[#40E0D0]/20 text-[#40E0D0] border border-[#40E0D0]/30 text-xs hover:bg-[#40E0D0]/30 transition-all"
              >
                Exec
              </button>
            </form>
          </div>
        )}

        {/* Neovim Bottom Statusline */}
        <div className="bg-[#0e1117] border-t border-white/10 px-3 py-1 flex items-center justify-between text-[11px] font-mono select-none">
          <div className="flex items-center gap-2">
            <span className="bg-[#40E0D0] text-black font-extrabold px-2 py-0.5 rounded-sm">
              NORMAL
            </span>
            <span className="text-neutral-400">main [+]</span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-300">{activeCategoryIndex === 0 ? 'languages.ts' : activeCategoryIndex === 1 ? 'ai_pipelines.ts' : 'systems_devops.ts'}</span>
          </div>

          <div className="flex items-center gap-3 text-neutral-400">
            <span className="hidden sm:inline">utf-8[unix]</span>
            <span className="text-[#40E0D0]">typescript</span>
            <span>Ln 14, Col 2</span>
            <span className="text-neutral-600">100%</span>
          </div>
        </div>

      </div>

    </section>
  );
};
