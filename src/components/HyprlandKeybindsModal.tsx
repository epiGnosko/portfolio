import React, { useEffect } from 'react';
import { X, Command } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface HyprlandKeybindsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HyprlandKeybindsModal: React.FC<HyprlandKeybindsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const keybinds = [
    { key: '1 - 5', desc: 'Switch workspace (Hero, Exp, Projects, Skills, Stats)', action: 'Navigate' },
    { key: 'b', desc: 'Reboot simulated Arch Linux boot sequence', action: 'Re-trigger boot' },
    { key: 't', desc: 'Jump straight to Neovim / Interactive shell', action: 'Terminal' },
    { key: 'm', desc: 'Toggle terminal synthesizer sound effects', action: 'Audio' },
    { key: 'Esc', desc: 'Close dialogs or bypass boot overlay', action: 'Dismiss' },
    { key: '?', desc: 'Show this Hyprland keybind cheatsheet', action: 'Help' }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="keybinds-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg hypr-card rounded-lg border border-[#40E0D0]/40 overflow-hidden shadow-[0_0_30px_rgba(64,224,208,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="bg-[#0b0d10] px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#40E0D0] font-bold">
            <Command className="w-3.5 h-3.5" />
            <span id="keybinds-title">HYPRLAND CHEATSHEET // ~/.config/hypr/hyprland.conf</span>
          </div>
          <button
            onClick={() => {
              soundFx.playKeyClick();
              onClose();
            }}
            className="p-1 rounded text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="text-xs text-neutral-400 mb-2">
            The portfolio is fully keyboard controllable, mirroring a tiling window manager environment:
          </div>

          <div className="space-y-2">
            {keybinds.map((kb, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded bg-black/50 border border-white/5 text-xs"
              >
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-0.5 rounded bg-neutral-800 text-[#40E0D0] border border-white/10 font-bold">
                    {kb.key}
                  </kbd>
                  <span className="text-neutral-300">{kb.desc}</span>
                </div>
                <span className="text-[10px] text-neutral-500">{kb.action}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
            <span>Sleeper Rig • Arch Linux</span>
            <span className="text-[#40E0D0]">Press ESC to return</span>
          </div>
        </div>
      </div>
    </div>
  );
};
