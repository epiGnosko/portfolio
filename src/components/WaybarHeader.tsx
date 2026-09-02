import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw, HelpCircle, Terminal, Cpu, HardDrive, Wifi, Battery } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface WaybarHeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onReboot: () => void;
  onOpenKeybinds: () => void;
}

const WORKSPACES = [
  { id: 'hero', key: '1', label: 'HERO' },
  { id: 'experience', key: '2', label: 'EXP' },
  { id: 'projects', key: '3', label: 'PROJECTS' },
  { id: 'skills', key: '4', label: 'TERMINAL' },
  { id: 'achievements', key: '5', label: 'ACHIEVE' }
];

export const WaybarHeader: React.FC<WaybarHeaderProps> = ({
  activeSection,
  onNavigate,
  onReboot,
  onOpenKeybinds
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState(soundFx.enabled);
  const [cpuUsage, setCpuUsage] = useState(14);
  const [ramUsage, setRamUsage] = useState(4.8);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(
        d.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subtle telemetry jitter for sleeper build realism
  useEffect(() => {
    const jitter = setInterval(() => {
      setCpuUsage(Math.floor(10 + Math.random() * 12));
      setRamUsage(Number((4.6 + Math.random() * 0.4).toFixed(1)));
    }, 4000);
    return () => clearInterval(jitter);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    soundFx.enabled = next;
    setSoundEnabled(next);
    if (next) soundFx.playKeyClick();
  };

  return (
    <header className="sticky top-0 z-40 w-full px-2 sm:px-4 pt-2 pb-1 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 font-mono select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-xs">
        
        {/* Left: Hyprland Workspace Switches */}
        <div className="flex items-center gap-1 bg-[#0d0f12]/90 px-1.5 py-1 rounded-md border border-white/10 shadow-inner">
          <div className="flex items-center gap-1.5 px-2 text-[#40E0D0] font-bold tracking-tight">
            <span className="w-2 h-2 rounded-full bg-[#40E0D0] shadow-[0_0_8px_#40E0D0] animate-pulse" />
            <span className="hidden md:inline">HYPR</span>
          </div>

          <div className="flex items-center gap-1">
            {WORKSPACES.map((ws) => {
              const isActive = activeSection === ws.id;
              return (
                <button
                  key={ws.id}
                  onClick={() => {
                    soundFx.playKeyClick();
                    onNavigate(ws.id);
                  }}
                  className={`relative px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                    isActive
                      ? 'bg-[#40E0D0] text-[#050505] font-bold shadow-[0_0_12px_rgba(64,224,208,0.4)]'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/80'
                  }`}
                  title={`Workspace ${ws.key}: ${ws.label}`}
                >
                  <span className="opacity-70 mr-1">{ws.key}:</span>
                  <span>{ws.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Window Title (Sleeper Vibe) */}
        <div className="hidden lg:flex items-center gap-2 text-neutral-400 bg-[#0d0f12]/70 px-3 py-1 rounded-md border border-white/5">
          <Terminal className="w-3.5 h-3.5 text-[#40E0D0]" />
          <span className="text-neutral-500">gurmukh@zenith:</span>
          <span className="text-[#40E0D0]">~/{activeSection}</span>
          <span className="text-neutral-600 font-light">[bsp/master]</span>
        </div>

        {/* Right: Waybar Status Widgets */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* CPU / RAM telemetry */}
          <div className="hidden sm:flex items-center gap-2 bg-[#0d0f12]/80 px-2 py-1 rounded border border-white/5 text-neutral-400">
            <span className="flex items-center gap-1" title="CPU Load">
              <Cpu className="w-3 h-3 text-[#40E0D0]" />
              <span className="text-neutral-300 font-mono">{cpuUsage}%</span>
            </span>
            <span className="text-neutral-700">|</span>
            <span className="flex items-center gap-1" title="RAM Allocated">
              <HardDrive className="w-3 h-3 text-[#40E0D0]" />
              <span className="text-neutral-300 font-mono">{ramUsage}G</span>
            </span>
            <span className="hidden xl:inline text-neutral-700">|</span>
            <span className="hidden xl:flex items-center gap-1 text-neutral-400" title="Network Link">
              <Wifi className="w-3 h-3 text-[#40E0D0]" />
              <span className="text-neutral-300 font-mono">1.2Gbps</span>
            </span>
            <span className="hidden xl:inline text-neutral-700">|</span>
            <span className="hidden xl:flex items-center gap-1 text-neutral-400" title="Battery">
              <Battery className="w-3 h-3 text-emerald-400" />
              <span className="text-neutral-300 font-mono">100%</span>
            </span>
          </div>

          {/* Sound Synthesizer toggle */}
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded transition-all border ${
              soundEnabled
                ? 'bg-[#40E0D0]/10 border-[#40E0D0]/40 text-[#40E0D0]'
                : 'bg-[#0d0f12] border-white/5 text-neutral-500 hover:text-neutral-300'
            }`}
            title={soundEnabled ? 'Terminal Audio: Enabled' : 'Terminal Audio: Muted'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Re-trigger boot sequence */}
          <button
            onClick={() => {
              soundFx.playKeyClick();
              onReboot();
            }}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#0d0f12] hover:bg-[#40E0D0]/15 hover:text-[#40E0D0] border border-white/10 text-neutral-400 transition-all"
            title="Reboot simulated Arch sequence"
          >
            <RotateCcw className="w-3 h-3 text-[#40E0D0]" />
            <span className="hidden sm:inline text-[11px]">Reboot</span>
          </button>

          {/* Keybinds modal trigger */}
          <button
            onClick={() => {
              soundFx.playKeyClick();
              onOpenKeybinds();
            }}
            className="p-1.5 rounded bg-[#0d0f12] hover:bg-neutral-800 text-neutral-400 hover:text-[#40E0D0] border border-white/5 transition-all"
            title="Hyprland Keybindings [?]"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          {/* System Clock */}
          <div className="bg-[#0d0f12] px-2 py-1 rounded border border-white/5 text-[#40E0D0] font-mono tracking-widest text-[11px] shadow-sm">
            {timeStr || '00:00:00'}
          </div>
        </div>

      </div>
    </header>
  );
};
