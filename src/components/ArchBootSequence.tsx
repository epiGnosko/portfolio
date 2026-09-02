import { useEffect, useRef, useCallback } from 'react';
import anime from 'animejs';
import { BOOT_LOGS } from '../data/portfolioData';
import { soundFx } from '../utils/soundEffects';
import { Terminal, ShieldCheck, Cpu, Play } from 'lucide-react';

interface ArchBootSequenceProps {
  onComplete: () => void;
  isRebooting?: boolean;
}

export const ArchBootSequence: React.FC<ArchBootSequenceProps> = ({ onComplete, isRebooting = false }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const logContainerRef = useRef<HTMLDivElement | null>(null);
  const okTargetRef = useRef<HTMLDivElement | null>(null);
  const hasFinishedRef = useRef(false);

  const triggerExplosionExit = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    soundFx.playBootBeep();

    if (containerRef.current) {
      anime({
        targets: containerRef.current,
        opacity: [1, 0],
        scale: [1, 1.5],
        duration: 700,
        easing: 'cubicBezier(0.25, 1, 0.3, 1)', // High-speed spring feel
        complete: () => {
          onComplete();
        }
      });
    } else {
      onComplete();
    }
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (hasFinishedRef.current) return;
    triggerExplosionExit();
  }, [triggerExplosionExit]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  useEffect(() => {
    // Reveal boot lines rapidly with Anime.js stagger
    const animation = anime({
      targets: '.arch-boot-line',
      opacity: [0, 1],
      translateX: [-8, 0],
      delay: anime.stagger(isRebooting ? 25 : 45, { start: 100 }),
      easing: 'easeOutQuad',
      begin: () => {
        soundFx.playKeyClick();
      },
      update: () => {
        if (logContainerRef.current) {
          logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
      },
      complete: () => {
        // Highlight and pulse the OK line
        if (okTargetRef.current) {
          anime({
            targets: okTargetRef.current,
            opacity: [0, 1],
            scale: [0.95, 1],
            duration: 350,
            easing: 'easeOutElastic(1, .8)',
            complete: () => {
              // Pause slightly to let user appreciate the prompt, then explosively scale out
              setTimeout(() => {
                triggerExplosionExit();
              }, 450);
            }
          });
        } else {
          setTimeout(triggerExplosionExit, 400);
        }
      }
    });

    return () => {
      animation.pause();
    };
  }, [isRebooting, triggerExplosionExit]);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="System Boot Sequence"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#050505] text-[#ededed] font-mono px-4 py-6 md:p-10 select-none overflow-hidden"
    >
      {/* Top simulated BIOS / Kernel header */}
      <div className="flex items-center justify-between border-b border-[#222] pb-3 text-xs md:text-sm text-neutral-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#40E0D0]" />
          <span className="text-[#40E0D0] font-semibold tracking-wider">ARCH LINUX (zenith-core)</span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline text-neutral-500">UEFI v2.8 (x86_64)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> LUKS: Verified
          </span>
          <button
            onClick={handleSkip}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-900 hover:bg-[#40E0D0]/10 hover:text-[#40E0D0] border border-neutral-800 text-xs transition-all"
            title="Skip boot animation"
          >
            <Play className="w-3 h-3 text-[#40E0D0]" />
            <span>Skip [ESC]</span>
          </button>
        </div>
      </div>

      {/* Center scrolling boot stream */}
      <div
        ref={logContainerRef}
        className="flex-1 my-4 overflow-y-auto space-y-1.5 text-xs md:text-sm leading-relaxed pr-2 font-mono scroll-smooth text-neutral-300"
      >
        {BOOT_LOGS.slice(0, -1).map((log, index) => {
          const isSystemdOk = log.includes('systemd') || log.includes('Started') || log.includes('Mounted');
          const isHardware = log.includes('e820') || log.includes('ACPI') || log.includes('Memory') || log.includes('CPU');
          return (
            <div
              key={index}
              className="arch-boot-line opacity-0 flex items-baseline gap-2 font-mono"
            >
              <span className="text-neutral-600 select-none shrink-0 font-light">
                {log.substring(0, 12)}
              </span>
              <span
                className={
                  isSystemdOk
                    ? 'text-neutral-200'
                    : isHardware
                    ? 'text-neutral-400'
                    : 'text-neutral-300'
                }
              >
                {log.substring(13)}
              </span>
            </div>
          );
        })}

        {/* Final bold OK highlight */}
        <div
          ref={okTargetRef}
          className="opacity-0 pt-3 pb-2 flex items-center gap-2 text-sm md:text-base font-bold text-[#40E0D0]"
        >
          <span className="px-2 py-0.5 rounded bg-[#40E0D0]/15 text-[#40E0D0] border border-[#40E0D0]/30 shadow-[0_0_12px_rgba(64,224,208,0.4)]">
            [ &nbsp;OK&nbsp; ]
          </span>
          <span className="tracking-wide">Reached target Graphical Interface // Hyprland Ready</span>
          <span className="inline-block w-2.5 h-4 bg-[#40E0D0] cursor-blink ml-1" />
        </div>
      </div>

      {/* Bottom status line */}
      <div className="border-t border-[#222] pt-3 flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-[#40E0D0]" />
          <span>Initramfs unpacked: 18ms</span>
          <span className="text-neutral-700">•</span>
          <span className="text-neutral-400">Target: Gurmukh Singh [SysArch]</span>
        </div>
        <div className="text-neutral-500">
          Press <kbd className="px-1.5 py-0.5 bg-neutral-900 text-neutral-300 rounded border border-neutral-700">Space</kbd> or <kbd className="px-1.5 py-0.5 bg-neutral-900 text-neutral-300 rounded border border-neutral-700">Esc</kbd> to launch immediately
        </div>
      </div>
    </div>
  );
};
