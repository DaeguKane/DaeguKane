import React from 'react';
import { SpecPreset } from '../types';
import { Trophy, Zap, Sparkles, Target, BarChart3, Shield, ArrowRight, CheckCircle2, UserCheck, Play } from 'lucide-react';

interface HeroLandingProps {
  onStartForm: () => void;
  onSelectPreset: (preset: SpecPreset) => void;
  presets: SpecPreset[];
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onStartForm,
  onSelectPreset,
  presets,
}) => {
  return (
    <div className="relative overflow-hidden bg-[#050C1B] text-white">
      {/* Dynamic Sports Background Stadium Lighting & Slanted Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(0,82,165,0.35),_transparent_70%)] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Slanted Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0052A5 0, #0052A5 1px, transparent 0, transparent 50px)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-24">
        {/* Top Tagline */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#074CA1]/50 border border-cyan-400/40 backdrop-blur-md shadow-lg shadow-blue-900/50">
            <span className="bg-white text-[#074CA1] font-black px-2 py-0.5 skew-x-[-15deg] italic text-[11px] uppercase">
              PRO-SCOUT
            </span>
            <span className="text-xs font-black text-cyan-300 uppercase tracking-widest">
              POWERFUL AI DRAFT ANALYZER
            </span>
            <span className="text-amber-400 font-bold text-xs">⚾ 2026 GLOBAL TALENT REPORT</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white font-sans italic">
            취업 스펙 드래프트! <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-cyan-300 underline decoration-amber-400/50 decoration-wavy not-italic">
              시장 MVP
            </span>가 될 수 있는가?
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            10년 차 대기업 & 글로벌 기업 전문 헤드헌터 AI가 <br className="hidden sm:inline" />
            당신의 <span className="text-cyan-300 font-bold">정량적 스펙(학점·어학·자격증)</span>과{' '}
            <span className="text-amber-300 font-bold">정성적 자소서</span>를 정밀 분석하여 <br className="hidden sm:inline" />
            현실적인 티어 및 최적의 직무 탑3 매칭 리포트를 생성합니다.
          </p>

          {/* Primary CTA Button */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartForm}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#074CA1] hover:bg-[#0066FF] text-white font-black text-lg tracking-tight shadow-2xl shadow-blue-600/50 border-2 border-cyan-300/40 transform skew-x-[-10deg] hover:skew-x-0 transition-all group cursor-pointer"
            >
              <Zap className="w-6 h-6 text-amber-300 fill-amber-300 group-hover:rotate-12 transition-transform" />
              <span className="skew-x-[10deg] group-hover:skew-x-0">내 스펙 AI 진단하기</span>
              <ArrowRight className="w-5 h-5 text-cyan-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 4 Core Value Propositions (PRD Key Feature Specifications F1 ~ F4) */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#0E2752]/95 border-t-4 border-[#0066FF] border-x border-b border-blue-400/40 hover:border-cyan-400 p-6 rounded-2xl transition-all shadow-xl hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-[#0052A5] rounded-xl flex items-center justify-center mb-4 text-amber-300 border border-blue-400/30 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white mb-2 flex items-center justify-between">
              <span className="italic">정밀 직무 추천</span>
              <span className="text-[10px] bg-white text-[#074CA1] px-2 py-0.5 font-black skew-x-[-15deg] italic">TOP 3</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              작성된 자소서와 스펙을 다각도로 파싱하여 상위 3개 적합 업종 및 직무를 매칭하고 구체적 사유를 제시합니다.
            </p>
          </div>

          <div className="bg-[#0E2752]/95 border-t-4 border-[#0066FF] border-x border-b border-blue-400/40 hover:border-cyan-400 p-6 rounded-2xl transition-all shadow-xl hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-[#0052A5] rounded-xl flex items-center justify-center mb-4 text-amber-300 border border-blue-400/30 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white mb-2 flex items-center justify-between">
              <span className="italic">현실적 위치 진단</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 font-black skew-x-[-15deg] italic">TIER BADGE</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              동일 전공 및 지원 직무 희망 취준생 대비 상대적 백분위(상위 %)와 현실적 티어(A-, Gold 등)를 평가합니다.
            </p>
          </div>

          <div className="bg-[#0E2752]/95 border-t-4 border-[#0066FF] border-x border-b border-blue-400/40 hover:border-cyan-400 p-6 rounded-2xl transition-all shadow-xl hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-[#0052A5] rounded-xl flex items-center justify-center mb-4 text-amber-300 border border-blue-400/30 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white mb-2 flex items-center justify-between">
              <span className="italic">4대 요소 SWOT</span>
              <span className="text-[10px] bg-cyan-400 text-slate-950 px-2 py-0.5 font-black skew-x-[-15deg] italic">4-FACTORS</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              학점, 어학, 자격증, 직무경험 4대 핵심 항목별 수치 및 강점/약점/기회/위협을 입체적으로 도출합니다.
            </p>
          </div>

          <div className="bg-[#0E2752]/95 border-t-4 border-[#0066FF] border-x border-b border-blue-400/40 hover:border-cyan-400 p-6 rounded-2xl transition-all shadow-xl hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-[#0052A5] rounded-xl flex items-center justify-center mb-4 text-amber-300 border border-blue-400/30 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white mb-2 flex items-center justify-between">
              <span className="italic">자소서 스토리 개편</span>
              <span className="text-[10px] bg-emerald-400 text-slate-950 px-2 py-0.5 font-black skew-x-[-15deg] italic">ACTION PLAN</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Before & After 자소서 문장 개편 가이드 및 1개월/3개월 내 실행 가능한 액션 체크리스트를 바로 제공합니다.
            </p>
          </div>
        </div>

        {/* Preset Quick Trial Section */}
        <div className="mt-16 bg-gradient-to-r from-[#003B7A] via-[#0E2752] to-[#002B5B] border-2 border-[#0066FF] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-blue-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded tracking-wide uppercase">
                  1-CLICK TEST
                </span>
                <h2 className="text-xl font-bold text-white">
                  대표 프로필 스펙으로 1초 진단해보기
                </h2>
              </div>
              <p className="text-xs text-blue-200 mt-1">
                직접 작성하기 전, 샘플 스펙 데이터를 선택하여 AI 헤드헌터 리포트 결과를 체험해보세요.
              </p>
            </div>
            <span className="text-xs text-cyan-300 font-semibold flex items-center gap-1">
              <UserCheck className="w-4 h-4 text-amber-400" />
              4가지 대표 지원자 스펙 준비됨
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className="text-left bg-[#071329] hover:bg-[#003C7A] border border-blue-500/30 hover:border-amber-400/80 p-4 rounded-xl transition-all shadow-md group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      {preset.badge}
                    </span>
                    <Play className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                    {preset.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                    {preset.specs.gpa} | {preset.specs.languageScore} | {preset.specs.major}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-cyan-300 font-bold group-hover:text-amber-300">
                  <span>스펙 진단 선택</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-blue-200/80">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>10년 차 대기업/외국계 헤드헌터 평가 가이드라인</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Gemini 3.6 Flash AI 엔진 적용</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>개인 정보 마스킹 및 보안 규정 준수</span>
          </div>
        </div>
      </div>
    </div>
  );
};
