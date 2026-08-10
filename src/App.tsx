import React, { useState, useRef } from 'react';
import { UserSpecs, SpecAnalysisReport } from './types';
import { HeroLanding } from './components/HeroLanding';
import { SpecInputForm } from './components/SpecInputForm';
import { AnalyzingScreen } from './components/AnalyzingScreen';
import { ReportDashboard } from './components/ReportDashboard';
import { Navbar } from './components/Navbar';
import { PresetModal } from './components/PresetModal';
import { BaseballBackground } from './components/BaseballBackground';
import { AlertTriangle, RefreshCw } from 'lucide-react';

import { generateFallbackReport } from './services/fallbackScouter';

export default function App() {
  const [viewState, setViewState] = useState<'landing' | 'form' | 'analyzing' | 'report' | 'error'>('landing');
  const [currentUserSpecs, setCurrentUserSpecs] = useState<UserSpecs | null>(null);
  const [reportResult, setReportResult] = useState<SpecAnalysisReport | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);

  // Store report in ref or state until AnalyzingScreen progress hits 100%
  const pendingReportRef = useRef<SpecAnalysisReport | null>(null);
  const isAnalysisCompleteRef = useRef<boolean>(false);

  // Analyze API Call
  const handleAnalyzeSpecs = async (specs: UserSpecs) => {
    setCurrentUserSpecs(specs);
    setViewState('analyzing');
    setErrorMessage(null);
    setReportResult(null);

    pendingReportRef.current = null;
    isAnalysisCompleteRef.current = false;

    try {
      const response = await fetch('/api/analyze-specs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(specs),
      });

      const responseText = await response.text();
      const trimmedText = responseText.trim();

      // Check if response is HTML or not OK (e.g. static site hosting serving index.html)
      if (!response.ok || trimmedText.startsWith('<') || trimmedText.toLowerCase().includes('<!doctype')) {
        console.warn('Backend server API not found or returned HTML. Switching to Client Scouting Engine.');
        const fallbackData = generateFallbackReport(specs);
        pendingReportRef.current = fallbackData;
        
        // If AnalyzingScreen is already 100%, show report immediately
        if (isAnalysisCompleteRef.current) {
          setReportResult(fallbackData);
          setViewState('report');
        }
        return;
      }

      // Safe JSON Parse
      try {
        const data: SpecAnalysisReport = JSON.parse(trimmedText);
        pendingReportRef.current = data;

        if (isAnalysisCompleteRef.current) {
          setReportResult(data);
          setViewState('report');
        }
      } catch (parseError) {
        console.warn('Response is not valid JSON. Switching to Client Scouting Engine:', parseError);
        const fallbackData = generateFallbackReport(specs);
        pendingReportRef.current = fallbackData;

        if (isAnalysisCompleteRef.current) {
          setReportResult(fallbackData);
          setViewState('report');
        }
      }
    } catch (err: any) {
      console.warn('Spec Analysis server request failed. Using fallback scouter:', err);
      const fallbackData = generateFallbackReport(specs);
      pendingReportRef.current = fallbackData;

      if (isAnalysisCompleteRef.current) {
        setReportResult(fallbackData);
        setViewState('report');
      }
    }
  };

  // Called when AnalyzingScreen finishes its 0-100% progress animation
  const handleAnalyzingComplete = () => {
    isAnalysisCompleteRef.current = true;

    // If report data is already generated/fetched, proceed to report view
    if (pendingReportRef.current) {
      setReportResult(pendingReportRef.current);
      setViewState('report');
    } else {
      // If server is still processing, fallback data ensures immediate seamless UX
      if (currentUserSpecs) {
        const fallbackData = generateFallbackReport(currentUserSpecs);
        pendingReportRef.current = fallbackData;
        setReportResult(fallbackData);
        setViewState('report');
      }
    }
  };

  const handleReset = () => {
    setViewState('form');
    setReportResult(null);
  };

  const handleSelectPreset = (presetSpecs: UserSpecs) => {
    setCurrentUserSpecs(presetSpecs);
    setIsPresetModalOpen(false);
    handleAnalyzeSpecs(presetSpecs);
  };

  return (
    <div className="min-h-screen bg-[#050C1A] text-slate-100 font-sans relative selection:bg-amber-400 selection:text-slate-900 overflow-x-hidden">
      {/* Stadium Grid and Baseball Field Glow Background */}
      <BaseballBackground />

      {/* Main Sticky Navbar */}
      <Navbar
        onOpenPresets={() => setIsPresetModalOpen(true)}
        onNavigateHome={() => setViewState('landing')}
        onNavigateForm={() => setViewState('form')}
      />

      {/* Dynamic View Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {viewState === 'landing' && (
          <HeroLanding
            onStart={() => setViewState('form')}
            onOpenPresets={() => setIsPresetModalOpen(true)}
          />
        )}

        {viewState === 'form' && (
          <SpecInputForm
            initialSpecs={currentUserSpecs}
            onSubmit={handleAnalyzeSpecs}
            onOpenPresets={() => setIsPresetModalOpen(true)}
          />
        )}

        {viewState === 'analyzing' && (
          <AnalyzingScreen onComplete={handleAnalyzingComplete} />
        )}

        {viewState === 'report' && reportResult && (
          <ReportDashboard
            report={reportResult}
            userSpecs={
              currentUserSpecs || {
                name: '지원자',
                universityCategory: '대학교',
                major: '전공',
                gpa: '3.5 / 4.5',
                languageScore: '기본 어학',
                certificates: [],
                experiencePeriod: '신입',
                coverLetterAndExperience: '',
              }
            }
            onReset={handleReset}
          />
        )}

        {viewState === 'error' && (
          <div className="min-h-[50vh] flex items-center justify-center p-4">
            <div className="bg-[#0A1833] border-2 border-red-500/50 rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl shadow-red-950/50">
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400 mx-auto mb-4 border border-red-500/30">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-white mb-2">분석 오류 발생</h3>
              <p className="text-sm text-slate-300 mb-6 bg-red-950/30 p-3 rounded-xl border border-red-500/20 font-mono text-left break-all">
                {errorMessage || '알 수 없는 서버 오류가 발생했습니다.'}
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setViewState('form')}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold transition-all"
                >
                  입력 폼 수정하기
                </button>
                <button
                  onClick={() => currentUserSpecs && handleAnalyzeSpecs(currentUserSpecs)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  다시 시도하기
                </button>
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
    </div>
  );
}
