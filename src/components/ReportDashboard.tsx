import React, { useState, useEffect } from 'react';
import { SpecAnalysisReport, UserSpecs } from '../types';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Zap, 
  Award, 
  Target, 
  CheckSquare, 
  Square, 
  Share2, 
  Copy, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  FileEdit, 
  Lock, 
  Flame, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Printer
} from 'lucide-react';

interface ReportDashboardProps {
  report: SpecAnalysisReport;
  userSpecs: UserSpecs;
  onReset: () => void;
}

export const ReportDashboard: React.FC<ReportDashboardProps> = ({
  report,
  userSpecs,
  onReset,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  
  // Interactive Checklist State
  const [checkedShortTerm, setCheckedShortTerm] = useState<Record<number, boolean>>({});
  const [checkedLongTerm, setCheckedLongTerm] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Fire celebratory confetti on initial load
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0052A5', '#FFC700', '#00E5FF', '#FFFFFF']
      });
    } catch (e) {
      // ignore confetti error
    }
  }, []);

  const toggleShortTerm = (index: number) => {
    setCheckedShortTerm((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleLongTerm = (index: number) => {
    setCheckedLongTerm((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      // ignore
    }
  };

  const handleCopySummary = () => {
    try {
      const text = `[SPECLENS 취업 스펙 분석 결과]
- 지원자: ${userSpecs?.name || '지원자'}
- 종합 티어: ${report?.overall_summary?.tier || '진단 완료'}
- 헤드헌터 총평: ${report?.overall_summary?.one_line_eval || ''}
- 추천 직무 TOP 1: ${report?.recommended_jobs?.[0]?.job_title || ''} (${report?.recommended_jobs?.[0]?.match_score || 0}% 매칭)
- 상세 보기: ${window.location.href}`;
      navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch (e) {
      // ignore
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  // Status color helper for competitiveness items
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case '우수':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-black">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            우수 (STRONG)
          </span>
        );
      case '적정':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-black">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            적정 (SATISFIED)
          </span>
        );
      case '부족':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-black">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            보완 필요 (GAP)
          </span>
        );
    }
  };

  const overall = report?.overall_summary || {
    tier: 'Silver 1',
    one_line_eval: '스펙 종합 분석이 완료되었습니다.',
    top_strengths: [],
    top_weaknesses: []
  };

  const recommendedJobs = report?.recommended_jobs || [];
  const breakdown = report?.competitiveness_breakdown || {
    gpa: { status: '적정', comment: '학점 정보가 반영되었습니다.' },
    language: { status: '부족', comment: '어학 성적 반영되었습니다.' },
    experience: { status: '적정', comment: '직무 경험 반영되었습니다.' },
    certificate: { status: '적정', comment: '자격증 정보 반영되었습니다.' }
  };
  const swot = report?.swot_analysis || {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  };
  const storytelling = report?.storytelling_guide || {
    title: '자소서 & 경험 스토리텔링 개편 가이드',
    before_after: [],
    headhunter_secret: '자소서 내 정량적 성과 수치 작성이 합격의 열쇠입니다.'
  };
  const actionPlan = report?.action_plan || {
    short_term: [],
    long_term: []
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Print stylesheet support */}
      <style>{`
        @media print {
          header, button, .no-print {
            display: none !important;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          .print-card {
            background-color: #f8fafc !important;
            color: #0f172a !important;
            border: 1px solid #cbd5e1 !important;
          }
        }
      `}</style>

      {/* Floating Actions Top Banner */}
      <div className="no-print bg-[#071329]/90 backdrop-blur-md border border-blue-500/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-black text-amber-300 uppercase tracking-widest">
            SCOUTING REPORT GENERATED
          </span>
          <span className="text-slate-400 text-xs">|</span>
          <span className="text-xs text-slate-200 font-bold">{userSpecs?.name || '지원자'} 리포트</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handlePrintPdf}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0052A5] hover:bg-[#0066FF] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-300" />
            <span>리포트 PDF / 인쇄</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-700"
          >
            <Copy className="w-3.5 h-3.5 text-amber-400" />
            <span>{copiedSummary ? '복사 완료!' : '요약문 복사'}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-700"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{copiedLink ? '링크 복사됨!' : 'URL 공유'}</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>다시 진단</span>
          </button>
        </div>
      </div>

      {/* TOP HEADER CARD: Scouting Report Card */}
      <div className="print-card bg-gradient-to-br from-[#0E2752] via-[#00428A] to-[#00224A] border-t-4 border-[#0066FF] border-x border-b border-blue-500/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Player Main Info & Tier */}
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-white text-[#074CA1] text-xs font-black px-3 py-1 skew-x-[-15deg] italic uppercase tracking-widest shadow-md">
                PRO-SCOUT EVALUATION
              </span>
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                10TH YEAR HEADHUNTER REPORT
              </span>
              {userSpecs?.major && (
                <span className="bg-blue-900/80 text-cyan-300 border border-cyan-400/30 text-xs font-bold px-3 py-1 rounded-full">
                  {userSpecs.major}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight italic">
                {userSpecs?.name || '지원자'} <span className="text-slate-300 text-xl font-medium not-italic">지원자</span>
              </h1>
              <span className="text-sm text-cyan-300 font-bold">
                {userSpecs?.targetIndustry || '희망 산업'} · {userSpecs?.targetJob || '희망 직무'}
              </span>
            </div>

            {/* One Line Eval Banner */}
            <div className="bg-[#071329]/90 border-l-4 border-[#074CA1] p-4 rounded-r-2xl backdrop-blur-md">
              <p className="text-xs text-amber-300 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                헤드헌터 한 줄 총평
              </p>
              <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                "{overall.one_line_eval}"
              </p>
            </div>

            {/* Strengths / Weaknesses Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#050C1B]/80 p-3.5 rounded-xl border border-blue-500/30">
                <span className="text-xs font-bold text-cyan-300 block mb-2 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-cyan-400" /> 핵심 강점 (STRENGTHS)
                </span>
                <ul className="space-y-1">
                  {(overall.top_strengths || []).map((str, idx) => (
                    <li key={idx} className="text-xs text-slate-200 font-medium flex items-start gap-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#050C1B]/80 p-3.5 rounded-xl border border-blue-500/30">
                <span className="text-xs font-bold text-amber-300 block mb-2 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> 핵심 보완점 (GAPS)
                </span>
                <ul className="space-y-1">
                  {(overall.top_weaknesses || []).map((weak, idx) => (
                    <li key={idx} className="text-xs text-slate-200 font-medium flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Large Tier MVP Badge */}
          <div className="w-full lg:w-72 bg-[#071329] border-t-4 border-[#074CA1] border-x border-b border-amber-400/80 rounded-2xl p-6 text-center shadow-2xl relative flex flex-col items-center justify-center min-h-[230px]">
            <div className="absolute -top-3 bg-white text-[#074CA1] text-[10px] font-black px-3 py-0.5 skew-x-[-15deg] italic uppercase tracking-widest shadow-md">
              REALISTIC MARKET TIER
            </div>

            <div className="w-16 h-16 bg-gradient-to-br from-[#074CA1] to-blue-700 rounded-2xl flex items-center justify-center text-amber-300 mb-2 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform border border-cyan-400/40">
              <Trophy className="w-10 h-10 fill-current" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight italic skew-x-[-10deg]">
              {overall.tier}
            </h3>

            <p className="text-xs text-blue-200 mt-2 font-bold">
              동일 전공/희망직무 취준생 대비
            </p>

            <span className="mt-3 text-[11px] bg-white text-[#074CA1] px-3 py-1 font-black skew-x-[-10deg] italic uppercase">
              ★ MARKET POSITION
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: TOP 3 Recommended Jobs Target Map */}
      {recommendedJobs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                AI 추천 직무 타깃팅 맵 (TOP {recommendedJobs.length})
              </h2>
            </div>
            <span className="text-xs text-blue-200 font-semibold">
              스펙 & 경험 기반 최적 직무 매칭
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedJobs.map((job) => (
              <div
                key={job.rank}
                className="print-card bg-[#0A1833] border-2 border-[#0052A5] hover:border-cyan-400 rounded-2xl p-6 shadow-xl transition-all hover:-translate-y-1 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                      job.rank === 1
                        ? 'bg-amber-400 text-slate-950'
                        : job.rank === 2
                        ? 'bg-cyan-400 text-slate-950'
                        : 'bg-blue-600 text-white'
                    }`}>
                      DRAFT #{job.rank}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{job.industry}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-3">{job.job_title}</h3>

                  {/* Match Score Meter */}
                  <div className="bg-[#071329] p-3 rounded-xl border border-blue-900 mb-4">
                    <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-300">직무 적합도 MATCH</span>
                      <span className="text-amber-300 font-black text-sm">{job.match_score}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-[#0052A5] via-cyan-400 to-amber-400 rounded-full"
                        style={{ width: `${job.match_score}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {job.reason}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-blue-900/60 flex items-center justify-between text-[11px] text-cyan-300 font-bold">
                  <span>추천 지원 우선순위</span>
                  <span>★ TOP MATCH</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: 4-Factor Competitiveness Breakdown */}
      <div className="print-card bg-[#0A1833] border-t-4 border-[#074CA1] border-x border-b border-blue-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-blue-800/60 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white italic">
              01. 세부 항목별 경쟁력 차트 & 헤드헌터 평가
            </h2>
          </div>
          <span className="text-xs bg-white text-[#074CA1] px-3 py-1 font-black skew-x-[-15deg] italic">
            4-FACTORS BREAKDOWN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GPA */}
          <div className="bg-[#071329] p-5 rounded-2xl border border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                학점 (GPA)
              </span>
              {getStatusBadge(breakdown.gpa?.status)}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {breakdown.gpa?.comment || '학점 진단 결과'}
            </p>
          </div>

          {/* Language */}
          <div className="bg-[#071329] p-5 rounded-2xl border border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                어학 성적 (Language)
              </span>
              {getStatusBadge(breakdown.language?.status)}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {breakdown.language?.comment || '어학 성적 진단 결과'}
            </p>
          </div>

          {/* Experience */}
          <div className="bg-[#071329] p-5 rounded-2xl border border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                직무 경험 (Experience)
              </span>
              {getStatusBadge(breakdown.experience?.status)}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {breakdown.experience?.comment || '직무 경험 진단 결과'}
            </p>
          </div>

          {/* Certificate */}
          <div className="bg-[#071329] p-5 rounded-2xl border border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                자격증 (Certificate)
              </span>
              {getStatusBadge(breakdown.certificate?.status)}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {breakdown.certificate?.comment || '자격증 진단 결과'}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: SWOT Analysis Matrix */}
      {swot && (
        <div className="print-card bg-[#0A1833] border-2 border-[#0052A5] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-blue-800/60 pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                취업 시장 SWOT 입체 스카우팅 분석
              </h2>
            </div>
            <span className="text-xs bg-amber-400/10 text-amber-300 border border-amber-400/20 px-3 py-1 rounded-full font-bold">
              SWOT MATRIX
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-[#071329] p-5 rounded-2xl border-l-4 border-cyan-400 space-y-2">
              <h4 className="text-sm font-black text-cyan-300 flex items-center gap-1.5 uppercase tracking-wide">
                <span>[S] STRENGTHS (강점)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {(swot.strengths || []).map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-[#071329] p-5 rounded-2xl border-l-4 border-amber-400 space-y-2">
              <h4 className="text-sm font-black text-amber-300 flex items-center gap-1.5 uppercase tracking-wide">
                <span>[W] WEAKNESSES (약점)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {(swot.weaknesses || []).map((w, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="bg-[#071329] p-5 rounded-2xl border-l-4 border-emerald-400 space-y-2">
              <h4 className="text-sm font-black text-emerald-300 flex items-center gap-1.5 uppercase tracking-wide">
                <span>[O] OPPORTUNITIES (기회)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {(swot.opportunities || []).map((o, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="bg-[#071329] p-5 rounded-2xl border-l-4 border-rose-400 space-y-2">
              <h4 className="text-sm font-black text-rose-300 flex items-center gap-1.5 uppercase tracking-wide">
                <span>[T] THREATS (위협)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {(swot.threats || []).map((t, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: Storytelling Guide (Before -> After) */}
      {storytelling && (
        <div className="print-card bg-[#0A1833] border-2 border-[#0052A5] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-blue-800/60 pb-4">
            <div className="flex items-center gap-2">
              <FileEdit className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {storytelling.title || '자소서 & 경험 스토리텔링 개편 가이드'}
              </h2>
            </div>
            <span className="text-xs bg-cyan-900/80 text-cyan-300 px-3 py-1 rounded-full font-bold">
              STAR METHOD
            </span>
          </div>

          {/* Before -> After Blocks */}
          <div className="space-y-6">
            {(storytelling.before_after || []).map((item, idx) => (
              <div key={idx} className="bg-[#071329] rounded-2xl p-5 border border-blue-500/30 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* BEFORE */}
                  <div className="bg-[#0F1E38] p-4 rounded-xl border border-rose-500/30 space-y-1.5">
                    <span className="text-[11px] font-black text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30 uppercase">
                      BEFORE (기존 밋밋한 표현)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      "{item.before}"
                    </p>
                  </div>

                  {/* AFTER */}
                  <div className="bg-[#002D5E] p-4 rounded-xl border border-cyan-400/50 space-y-1.5">
                    <span className="text-[11px] font-black text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-400/40 uppercase">
                      AFTER (10년차 헤드헌터 수치화 개편)
                    </span>
                    <p className="text-xs text-white font-semibold leading-relaxed pt-1">
                      "{item.after}"
                    </p>
                  </div>
                </div>

                {/* Key Point */}
                <div className="bg-blue-950/60 p-3 rounded-xl border border-blue-800/60 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-200">
                    <strong className="text-amber-300">개편 핵심 포인트:</strong> {item.key_point}
                  </p>
                </div>
              </div>
            ))}

            {/* Headhunter Secret Strategy */}
            <div className="bg-gradient-to-r from-[#003B7A] to-[#001D40] p-5 rounded-2xl border-2 border-amber-400/60 space-y-2 shadow-lg">
              <h4 className="text-sm font-black text-amber-300 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                10년 차 헤드헌터의 서류 통과 비밀 전략
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {storytelling.headhunter_secret}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: Action Plan Checklist */}
      <div className="print-card bg-[#0A1833] border-2 border-[#0052A5] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-blue-800/60 pb-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-white">
              실전 보완 로드맵 & 실행 체크리스트
            </h2>
          </div>
          <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-bold">
            ACTIONABLE CHECKLIST
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Short Term */}
          <div className="bg-[#071329] p-5 rounded-2xl border border-blue-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-blue-900 pb-2">
              <h3 className="text-sm font-black text-cyan-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                단기 실행 과제 (1개월 내 완료)
              </h3>
              <span className="text-[10px] text-slate-400">클릭하여 완료 표시</span>
            </div>

            <div className="space-y-2.5">
              {(actionPlan.short_term || []).map((task, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleShortTerm(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                    checkedShortTerm[idx]
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-slate-400 line-through'
                      : 'bg-[#002D5E]/60 border-blue-500/20 hover:border-cyan-400 text-white font-medium'
                  }`}
                >
                  {checkedShortTerm[idx] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  )}
                  <span className="text-xs leading-relaxed">{task}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Long Term */}
          <div className="bg-[#071329] p-5 rounded-2xl border border-blue-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-blue-900 pb-2">
              <h3 className="text-sm font-black text-amber-300 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                중장기 실행 과제 (3개월 내 완료)
              </h3>
              <span className="text-[10px] text-slate-400">클릭하여 완료 표시</span>
            </div>

            <div className="space-y-2.5">
              {(actionPlan.long_term || []).map((task, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleLongTerm(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                    checkedLongTerm[idx]
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-slate-400 line-through'
                      : 'bg-[#002D5E]/60 border-blue-500/20 hover:border-amber-400 text-white font-medium'
                  }`}
                >
                  {checkedLongTerm[idx] ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <span className="text-xs leading-relaxed">{task}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="no-print bg-[#071329] p-6 rounded-2xl border border-blue-500/30 text-center space-y-4 shadow-xl">
        <p className="text-xs text-blue-200">
          본 리포트는 Gemini AI 알고리즘과 10년 차 헤드헌터 평가 데이터셋을 바탕으로 산출된 추정 결과입니다.
        </p>

        <div className="flex justify-center items-center gap-4 flex-wrap">
          <button
            onClick={onReset}
            className="px-6 py-3 bg-gradient-to-r from-[#0052A5] via-[#0066FF] to-[#0040A5] hover:from-[#0066FF] hover:to-[#0052A5] text-white font-black rounded-xl text-sm shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
          >
            새로운 스펙으로 다시 진단하기 ⚾
          </button>
        </div>
      </div>

    </div>
  );
};
