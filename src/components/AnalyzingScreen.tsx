import React, { useEffect, useState } from 'react';
import { Trophy, Zap, Activity, Database, Sparkles, CheckCircle2 } from 'lucide-react';

interface AnalyzingScreenProps {
  onComplete?: () => void;
}

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessageIdx, setCurrentMessageIdx] = useState(0);

  const messages = [
    '취준생 10,000명의 데이터 및 합격서류 매트릭스 로딩 중...',
    '10년 차 대기업/외국계 헤드헌터 AI 매칭 엔진 가동...',
    '학점 · 어학 · 자격증 · 직무 경험 4대 가중치 산출 중...',
    '자소서 문장 성과 수치화 & STAR 기법 정밀 파싱...',
    '상대적 백분위 및 최적 직무 TOP 3 스카우팅 리포트 완성 중...'
  ];

  useEffect(() => {
    // Progress gauge timer: smooth progress from 0% to 100% over ~3.2 seconds
    const startTime = Date.now();
    const duration = 3200; // 3.2 seconds total

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(progressInterval);
        // Small delay at 100% before triggering transition
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
        }, 400);
      }
    }, 40);

    // Message ticker interval
    const msgInterval = setInterval(() => {
      setCurrentMessageIdx((prev) => (prev + 1) % messages.length);
    }, 700);

    return () => {
      clearInterval(progressInterval);
      clearInterval(msgInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-[#0A1833] border-2 border-[#0052A5] rounded-3xl p-8 sm:p-12 shadow-2xl shadow-blue-950 text-center relative overflow-hidden text-white">
        
        {/* Stadium Spotlight Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(0,102,255,0.3),_transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-amber-300 to-blue-600 animate-pulse" />

        {/* Dynamic Radar Icon */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-600/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-cyan-400/40 animate-spin border-t-amber-400" />
          <div className="w-16 h-16 bg-gradient-to-br from-[#0052A5] to-blue-900 rounded-2xl flex items-center justify-center text-amber-300 shadow-xl border border-cyan-300/40 transform rotate-45">
            <Trophy className="w-8 h-8 -rotate-45 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-cyan-400/30 mb-3">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
          <span className="text-xs font-black text-cyan-300 uppercase tracking-widest">
            STADIUM AI ENGINE RUNNING
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
          AI 취업 스펙 스카우팅 리포트 분석 중
        </h2>

        <p className="text-xs sm:text-sm text-amber-300 font-bold mb-8 h-6 flex items-center justify-center gap-1.5 transition-all">
          <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
          <span>{messages[currentMessageIdx]}</span>
        </p>

        {/* Progress Bar Container */}
        <div className="space-y-3 max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>ANALYSIS PROGRESS</span>
            <span className="text-amber-300 font-black text-sm">{progress}%</span>
          </div>

          <div className="h-4 bg-[#071329] rounded-full p-1 border border-blue-500/40 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#0052A5] via-[#0066FF] to-amber-400 rounded-full transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Live Analysis Stats Ticker */}
        <div className="mt-10 grid grid-cols-3 gap-3 border-t border-blue-800/60 pt-6 text-left">
          <div className="bg-[#071329]/80 p-3 rounded-xl border border-blue-500/20">
            <span className="text-[10px] text-slate-400 block font-semibold">비교 데이터셋</span>
            <span className="text-xs sm:text-sm font-black text-cyan-300 flex items-center gap-1 mt-0.5">
              <Database className="w-3.5 h-3.5 text-blue-400" />
              10,000+ 건
            </span>
          </div>

          <div className="bg-[#071329]/80 p-3 rounded-xl border border-blue-500/20">
            <span className="text-[10px] text-slate-400 block font-semibold">평가 모델</span>
            <span className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-1 mt-0.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              10년차 헤드헌터
            </span>
          </div>

          <div className="bg-[#071329]/80 p-3 rounded-xl border border-blue-500/20">
            <span className="text-[10px] text-slate-400 block font-semibold">분석 항목</span>
            <span className="text-xs sm:text-sm font-black text-emerald-300 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              SWOT & 4D
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
