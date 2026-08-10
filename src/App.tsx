import React, { useState } from 'react';
import { UserSpecs, SpecAnalysisReport, SpecPreset } from './types';
import { SAMPLE_PRESETS } from './data/samplePresets';
import { Navbar } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { SpecInputForm } from './components/SpecInputForm';
import { AnalyzingScreen } from './components/AnalyzingScreen';
import { ReportDashboard } from './components/ReportDashboard';
import { PresetModal } from './components/PresetModal';
import { BaseballBackground } from './components/BaseballBackground';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function App() {
  const [viewState, setViewState] = useState<'landing' | 'form' | 'analyzing' | 'report' | 'error'>('landing');
  const [currentUserSpecs, setCurrentUserSpecs] = useState<UserSpecs | null>(null);
  const [reportResult, setReportResult] = useState<SpecAnalysisReport | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);

  // Analyze API Call
  const handleAnalyzeSpecs = async (specs: UserSpecs) => {
    setCurrentUserSpecs(specs);
    setViewState('analyzing');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(specs),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'AI 스펙 분석을 처리하는 중 오류가 발생했습니다.');
      }

      const data: SpecAnalysisReport = await response.json();
      setReportResult(data);
      setViewState('report');
    } catch (err: any) {
      console.error('Spec Analysis error:', err);
      setErrorMessage(err.message || '서버 통신 중 오류가 발생했습니다.');
      setViewState('error');
    }
  };

  // Quick preset trigger
  const handleSelectPreset = (preset: SpecPreset) => {
    setCurrentUserSpecs(preset.specs);
    handleAnalyzeSpecs(preset.specs);
  };

  const handleReset = () => {
    setViewState('landing');
    setCurrentUserSpecs(null);
    setReportResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#081836] font-sans antialiased selection:bg-amber-400 selection:text-slate-950 relative overflow-x-hidden">
      {/* Background Baseball Player Graphic (Fixed Watermark) */}
      <BaseballBackground />

      {/* Navigation Header */}
      <div className="relative z-10">
        <Navbar
          onReset={handleReset}
          onOpenPresets={() => setIsPresetModalOpen(true)}
          hasResult={viewState === 'report'}
        />
      </div>

      {/* Main Content Area */}
      <main className="pb-16 relative z-10">
        {viewState === 'landing' && (
          <HeroLanding
            onStartForm={() => setViewState('form')}
            onSelectPreset={handleSelectPreset}
            presets={SAMPLE_PRESETS}
          />
        )}

        {viewState === 'form' && (
          <SpecInputForm
            onSubmit={handleAnalyzeSpecs}
            initialSpecs={currentUserSpecs || undefined}
          />
        )}

        {viewState === 'analyzing' && <AnalyzingScreen />}

        {viewState === 'report' && reportResult && currentUserSpecs && (
          <ReportDashboard
            report={reportResult}
            userSpecs={currentUserSpecs}
            onReset={handleReset}
          />
        )}

        {viewState === 'error' && (
          <div className="max-w-xl mx-auto px-4 py-16 text-center text-white">
            <div className="bg-[#0A1833] border-2 border-rose-500/60 rounded-3xl p-8 shadow-2xl space-y-4">
              <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-2xl mx-auto flex items-center justify-center border border-rose-500/40">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-white">분석 오류 발생</h2>
              <p className="text-xs text-rose-300 leading-relaxed font-bold">
                {errorMessage}
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setViewState('form')}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  입력 폼 수정하기
                </button>
                {currentUserSpecs && (
                  <button
                    onClick={() => handleAnalyzeSpecs(currentUserSpecs)}
                    className="px-5 py-2.5 bg-[#0052A5] hover:bg-[#0066FF] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    <RefreshCw className="w-4 h-4" />
                    다시 시도하기
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Preset Modal */}
      <PresetModal
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        onSelectPreset={handleSelectPreset}
      />

      {/* Footer */}
      <footer className="border-t border-blue-900/40 bg-[#06132A] py-8 text-center text-xs text-slate-400 space-y-2 relative z-10">
        <p className="font-semibold text-blue-200/60">
          SpecLens (스펙렌즈) / FitCareer AI — 삼성 라이온즈 스타일 역동적 취업 스펙 스카우팅 엔진
        </p>
        <p className="text-[11px] text-slate-600">
          Based on 10th Year Headhunter AI Evaluation Engine & Gemini 3.6 Flash
        </p>
      </footer>
    </div>
  );
}
