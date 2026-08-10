import React, { useState } from 'react';
import { Trophy, Zap, RotateCcw, Volume2, VolumeX, ShieldCheck, Flame } from 'lucide-react';

interface NavbarProps {
  onReset: () => void;
  onOpenPresets: () => void;
  hasResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onReset, onOpenPresets, hasResult }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      // Audio feedback cue
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#071329]/95 backdrop-blur-md border-b-2 border-[#0052A5] text-white shadow-xl shadow-blue-950/40">
      {/* Top Stadium Live Ticker Banner */}
      <div className="bg-gradient-to-r from-[#074CA1] via-[#003B7A] to-[#0B1E3D] text-[11px] font-bold tracking-wider py-1 px-4 text-slate-100 flex items-center justify-between border-b border-blue-400/20 uppercase">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <div className="bg-white text-[#074CA1] font-black px-2 py-0.5 skew-x-[-15deg] italic text-[10px]">
            PRO-SCOUT
          </div>
          <span className="text-amber-300 font-black">2026 GLOBAL TALENT SCOUTING REPORT</span>
          <span className="text-blue-200/60">|</span>
          <span className="text-slate-200 animate-pulse">10년 차 헤드헌터 AI 스카우팅 엔진 가동 중 ⚡</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-blue-200">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            10,000+ 합격 데이터 비교
          </span>
          <span className="bg-white text-[#074CA1] font-black px-2 py-0.5 rounded-sm text-[10px] tracking-tight uppercase italic skew-x-[-10deg]">
            STADIUM ID: SEOUL-101
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo with Lions Sports Motif */}
        <button
          onClick={onReset}
          className="flex items-center gap-3 group text-left transition-transform active:scale-95 cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-br from-[#074CA1] via-[#0066FF] to-[#002966] rounded-lg shadow-lg shadow-blue-600/40 border border-cyan-400/30 transform -rotate-3 group-hover:rotate-0 transition-transform">
            <Trophy className="w-6 h-6 text-amber-300 animate-bounce" />
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 text-[9px] font-black px-1 rounded">
              MVP
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-amber-300 font-sans italic">
                FRESHMAN DRAFT
              </span>
              <span className="bg-white text-[#074CA1] text-[10px] font-black px-2 py-0.5 skew-x-[-15deg] italic uppercase tracking-wider">
                FITCAREER
              </span>
            </div>
            <p className="text-[10px] text-blue-200/80 font-medium tracking-wide">
              AI 스카우팅 리포트
            </p>
          </div>
        </button>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenPresets}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900/60 hover:bg-blue-800 text-cyan-300 border border-cyan-500/30 rounded-md text-xs font-bold transition-all hover:border-cyan-400 shadow-sm cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">샘플 스펙</span>
            <span>체험</span>
          </button>

          <button
            onClick={toggleSound}
            title="사운드 효과 토글"
            className="p-2 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700 rounded-md text-xs transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {hasResult && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-md text-xs transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>새 진단하기</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
