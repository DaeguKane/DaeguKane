import React, { useState } from 'react';
import { UserSpecs, SpecPreset } from '../types';
import { SAMPLE_PRESETS } from '../data/samplePresets';
import { 
  GraduationCap, 
  Languages, 
  Award, 
  Briefcase, 
  FileText, 
  Plus, 
  X, 
  Upload, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Target, 
  CheckCircle2,
  FileCode,
  Flame
} from 'lucide-react';

interface SpecInputFormProps {
  onSubmit: (specs: UserSpecs) => void;
  initialSpecs?: UserSpecs;
}

export const SpecInputForm: React.FC<SpecInputFormProps> = ({ onSubmit, initialSpecs }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form state
  const [name, setName] = useState(initialSpecs?.name || '');
  const [universityCategory, setUniversityCategory] = useState(initialSpecs?.universityCategory || '인서울 주요 10개 대학');
  const [major, setMajor] = useState(initialSpecs?.major || '');
  const [gpa, setGpa] = useState(initialSpecs?.gpa || '');
  const [languageScore, setLanguageScore] = useState(initialSpecs?.languageScore || '');
  
  // Certificates tag system
  const [certificates, setCertificates] = useState<string[]>(
    initialSpecs?.certificates || ['컴퓨터활용능력 1급', 'ADsP']
  );
  const [certInput, setCertInput] = useState('');

  const [experiencePeriod, setExperiencePeriod] = useState(initialSpecs?.experiencePeriod || '');
  const [targetIndustry, setTargetIndustry] = useState(initialSpecs?.targetIndustry || 'IT / 콘텐츠 / 서비스');
  const [targetJob, setTargetJob] = useState(initialSpecs?.targetJob || '서비스 기획 / 마케팅');
  const [coverLetterAndExperience, setCoverLetterAndExperience] = useState(
    initialSpecs?.coverLetterAndExperience || ''
  );

  const [dragActive, setDragActive] = useState(false);
  const [fileLoadError, setFileLoadError] = useState<string | null>(null);

  // Certificate helper
  const addCertificate = () => {
    if (certInput.trim() && !certificates.includes(certInput.trim())) {
      setCertificates([...certificates, certInput.trim()]);
      setCertInput('');
    }
  };

  const removeCertificate = (certToRemove: string) => {
    setCertificates(certificates.filter((c) => c !== certToRemove));
  };

  // Preset auto fill
  const handleLoadPreset = (preset: SpecPreset) => {
    setName(preset.specs.name);
    setUniversityCategory(preset.specs.universityCategory);
    setMajor(preset.specs.major);
    setGpa(preset.specs.gpa);
    setLanguageScore(preset.specs.languageScore);
    setCertificates(preset.specs.certificates);
    setExperiencePeriod(preset.specs.experiencePeriod);
    setTargetIndustry(preset.specs.targetIndustry || '');
    setTargetJob(preset.specs.targetJob || '');
    setCoverLetterAndExperience(preset.specs.coverLetterAndExperience);
    setFileLoadError(null);
  };

  // Text file upload handler (.txt / .md / .csv plain text)
  const handleFileUpload = (file: File) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setFileLoadError('파일 크기는 5MB 이하만 가능합니다.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        setCoverLetterAndExperience((prev) => (prev ? `${prev}\n\n[업로드 파일: ${file.name}]\n${text}` : text));
        setFileLoadError(null);
      }
    };
    reader.onerror = () => {
      setFileLoadError('파일을 읽는 중 오류가 발생했습니다. 텍스트 형식인지 확인해주세요.');
    };
    reader.readAsText(file, 'UTF-8');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: name.trim() || '김취준',
      universityCategory,
      major: major.trim() || '경영/인문계열',
      gpa: gpa.trim() || '3.5 / 4.5',
      languageScore: languageScore.trim() || '오픽 IM3 / 토익 850',
      certificates,
      experiencePeriod: experiencePeriod.trim() || '직무 인턴 6개월 + 동아리 1년',
      targetIndustry,
      targetJob,
      coverLetterAndExperience,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Form Container with Vibrant Palette #0066FF Stadium Styling */}
      <div className="bg-[#0E244B] border-t-4 border-[#0066FF] border-x border-b border-blue-600/50 rounded-3xl shadow-2xl shadow-blue-950/80 overflow-hidden text-white">
        
        {/* Header Title Banner */}
        <div className="bg-gradient-to-r from-[#074CA1] via-[#003B7A] to-[#001D40] p-6 sm:p-8 border-b border-cyan-500/30 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="bg-white text-[#074CA1] text-[11px] font-black px-2.5 py-1 skew-x-[-15deg] italic uppercase tracking-widest inline-block shadow-md">
                PRO-SCOUT USER FORM
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 flex items-center gap-2 italic">
                <span>취업 경쟁력 스펙 진단 폼</span>
                <span className="text-amber-300 not-italic">⚾</span>
              </h2>
              <p className="text-xs sm:text-sm text-blue-200 mt-1">
                정량적 스펙 데이터와 정성적 자소서/경험 요약을 작성하여 AI 분석을 시작하세요.
              </p>
            </div>

            {/* Quick Sample Selector */}
            <div className="flex items-center gap-2 bg-[#071329]/80 p-2 rounded-xl border border-blue-400/30">
              <span className="text-[11px] text-cyan-300 font-bold whitespace-nowrap hidden sm:inline">
                샘플 불러오기:
              </span>
              <select
                onChange={(e) => {
                  const selected = SAMPLE_PRESETS.find((p) => p.id === e.target.value);
                  if (selected) handleLoadPreset(selected);
                }}
                className="bg-[#002D5E] text-white text-xs font-bold py-1.5 px-2 rounded-lg border border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
              >
                <option value="">-- 샘플 프로필 선택 --</option>
                {SAMPLE_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sports Baseball Base Stepper Indicator */}
          <div className="mt-8 grid grid-cols-3 gap-2 border-t border-blue-800/60 pt-6">
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left cursor-pointer ${
                currentStep === 1
                  ? 'bg-[#0052A5] border-amber-400 text-white shadow-lg shadow-blue-600/40 font-bold'
                  : 'bg-[#071329]/60 border-slate-700 text-slate-300 hover:border-blue-400'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                currentStep === 1 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}>
                1st
              </div>
              <div>
                <p className="text-xs font-black tracking-tight">1루: 정량 스펙</p>
                <p className="text-[10px] text-blue-200/70 hidden sm:block">학점·어학·자격증</p>
              </div>
            </button>

            <button
              onClick={() => setCurrentStep(2)}
              className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left cursor-pointer ${
                currentStep === 2
                  ? 'bg-[#0052A5] border-amber-400 text-white shadow-lg shadow-blue-600/40 font-bold'
                  : 'bg-[#071329]/60 border-slate-700 text-slate-300 hover:border-blue-400'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                currentStep === 2 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}>
                2nd
              </div>
              <div>
                <p className="text-xs font-black tracking-tight">2루: 자소서&경험</p>
                <p className="text-[10px] text-blue-200/70 hidden sm:block">정성적 스토리 및 파일</p>
              </div>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left cursor-pointer ${
                currentStep === 3
                  ? 'bg-[#0052A5] border-amber-400 text-white shadow-lg shadow-blue-600/40 font-bold'
                  : 'bg-[#071329]/60 border-slate-700 text-slate-300 hover:border-blue-400'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                currentStep === 3 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
              }`}>
                3rd
              </div>
              <div>
                <p className="text-xs font-black tracking-tight">3루: 희망 직무</p>
                <p className="text-[10px] text-blue-200/70 hidden sm:block">산업군 & 직무 타겟팅</p>
              </div>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitForm} className="p-6 sm:p-8 space-y-8">
          
          {/* STEP 1: Quantitative Specs */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 border-b border-blue-800/60 pb-3">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">기본 정보 및 정량 스펙 입력</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-blue-200 mb-2">
                    이름 / 닉네임
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="예: 김취준"
                    className="w-full bg-[#071329] border border-blue-500/40 focus:border-cyan-400 rounded-xl py-3 px-4 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  />
                </div>

                {/* University Category */}
                <div>
                  <label className="block text-xs font-bold text-blue-200 mb-2">
                    출신 대학 카테고리 (선택)
                  </label>
                  <select
                    value={universityCategory}
                    onChange={(e) => setUniversityCategory(e.target.value)}
                    className="w-full bg-[#071329] border border-blue-500/40 focus:border-cyan-400 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  >
                    <option value="인서울 주요 10개 대학">인서울 주요 10개 대학</option>
                    <option value="인서울 수도권 대학">인서울 / 수도권 대학</option>
                    <option value="지방 거점 국립대학">지방 거점 국립대학 (지거국)</option>
                    <option value="지방 4년제 대학">지방 4년제 대학</option>
                    <option value="해외 대학">해외 대학교</option>
                    <option value="전문대학 / 기타">전문대학 / 기타</option>
                  </select>
                </div>

                {/* Major */}
                <div>
                  <label className="block text-xs font-bold text-blue-200 mb-2">
                    전공 / 이중전공
                  </label>
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="예: 경영학과 / 컴퓨터공학 부전공"
                    className="w-full bg-[#071329] border border-blue-500/40 focus:border-cyan-400 rounded-xl py-3 px-4 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  />
                </div>

                {/* GPA */}
                <div>
                  <label className="block text-xs font-bold text-blue-200 mb-2">
                    학점 (GPA) <span className="text-amber-300">*</span>
                  </label>
                  <input
                    type="text"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    placeholder="예: 3.65 / 4.5 또는 3.8 / 4.3"
                    className="w-full bg-[#071329] border border-blue-500/40 focus:border-cyan-400 rounded-xl py-3 px-4 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  />
                </div>

                {/* Language Score */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-blue-200 mb-2 flex items-center justify-between">
                    <span>어학 성적 (토익, 오픽, 토익스피킹, 텝스, HSK 등)</span>
                    <Languages className="w-4 h-4 text-amber-400" />
                  </label>
                  <input
                    type="text"
                    value={languageScore}
                    onChange={(e) => setLanguageScore(e.target.value)}
                    placeholder="예: 오픽 IM3, 토익 850, 토익스피킹 IH"
                    className="w-full bg-[#071329] border border-blue-500/40 focus:border-cyan-400 rounded-xl py-3 px-4 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  />
                </div>

                {/* Certificates Tag Builder */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-blue-200 mb-2 flex items-center justify-between">
                    <span>보유 자격증 (엔터 또는 추가 버튼으로 등록)</span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </label>
                  
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={certInput}
                      onChange={(e) => setCertInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCertificate();
                        }
                      }}
                      placeholder="예: 컴퓨터활용능력 1급, ADsP, 정보처리기사, AFPK..."
                      className="flex-1 bg-[#071329] border border-blue-500/40 focus:border-cyan-400 rounded-xl py-2.5 px-4 text-white placeholder-slate-500 text-sm focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={addCertificate}
                      className="px-4 py-2.5 bg-[#0052A5] hover:bg-[#0066FF] text-white font-bold rounded-xl text-sm transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      추가
                    </button>
                  </div>

                  {/* Certificate Badges */}
                  <div className="flex flex-wrap gap-2 min-h-[36px] p-2 bg-[#071329]/50 rounded-xl border border-slate-800">
                    {certificates.length === 0 ? (
                      <span className="text-xs text-slate-500 self-center">등록된 자격증이 없습니다.</span>
                    ) : (
                      certificates.map((cert, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#003B7A] border border-cyan-400/40 text-cyan-200 text-xs font-bold shadow-sm"
                        >
                          <Award className="w-3 h-3 text-amber-400" />
                          {cert}
                          <button
                            type="button"
                            onClick={() => removeCertificate(cert)}
                            className="hover:text-red-400 text-slate-400 p-0.5 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Experience Period */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-blue-200 mb-2 flex items-center justify-between">
                    <span>직무 관련 경험 기간 & 요약 (인턴, 동아리, 공모전, 프로젝트 등)</span>
                    <Briefcase className="w-4 h-4 text-amber-400" />
                  </label>
                  <input
                    type="text"
                    value={experiencePeriod}
                    onChange={(e) => setExperiencePeriod(e.target.value)}
                    placeholder="예: 마케팅 스타트업 인턴 6개월 + 직무 학회 1년 + 공모전 입상 1회"
                    className="w-full bg-[#071329] border border-blue-500/40 focus:border-cyan-400 rounded-xl py-3 px-4 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-gradient-to-r from-[#0052A5] to-[#0066FF] hover:from-[#0066FF] hover:to-[#0052A5] text-white font-black rounded-xl text-sm shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>다음 루 진출 (자소서/경험 입력)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Cover Letter & Experience Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-blue-800/60 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">정성적 데이터 (자소서 및 경험 상세)</h3>
                </div>
                <span className="text-xs text-amber-300 font-bold bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                  AI 텍스트 파싱 지원
                </span>
              </div>

              <p className="text-xs text-slate-300">
                작성했던 자기소개서 항목, 경험 요약글, 프로젝트 설명글을 붙여넣거나 .txt 파일을 드래그하여 업로드하세요.
                AI가 핵심 성과 수치와 스토리 구성을 정밀 분석합니다.
              </p>

              {/* Drag & Drop File Upload Box */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                  dragActive
                    ? 'border-cyan-400 bg-cyan-950/30'
                    : 'border-blue-500/40 bg-[#071329]/60 hover:border-blue-400'
                }`}
              >
                <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-bounce" />
                <p className="text-xs font-bold text-white">
                  자소서 및 경험 텍스트 파일 (.txt, .md) 드래그 & 드롭
                </p>
                <p className="text-[11px] text-slate-400 mt-1">또는 아래에서 직접 파일 선택</p>
                
                <label className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-[#0052A5] hover:bg-[#0066FF] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors">
                  <FileCode className="w-3.5 h-3.5" />
                  <span>내 컴퓨터에서 파일 찾기</span>
                  <input
                    type="file"
                    accept=".txt,.md,.text"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                    }}
                  />
                </label>

                {fileLoadError && (
                  <p className="text-xs text-rose-400 mt-2 font-bold">{fileLoadError}</p>
                )}
              </div>

              {/* Cover Letter Text Area */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-blue-200">
                    자기소개서 / 경험 상세 설명 텍스트
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {coverLetterAndExperience.length}자 작성됨
                  </span>
                </div>
                <textarea
                  rows={10}
                  value={coverLetterAndExperience}
                  onChange={(e) => setCoverLetterAndExperience(e.target.value)}
                  placeholder="예:
[프로젝트 경험]
6개월간 마케팅 스타트업 인턴으로 유저 CAC를 25% 절감했습니다...

[자기소개서 지원동기]
저의 가장 큰 장점은 데이터 기반 문제 해결 능력입니다..."
                  className="w-full bg-[#071329] border border-blue-500/40 focus:border-cyan-400 rounded-2xl p-4 text-white placeholder-slate-500 text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>이전 (정량 스펙)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-gradient-to-r from-[#0052A5] to-[#0066FF] hover:from-[#0066FF] hover:to-[#0052A5] text-white font-black rounded-xl text-sm shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <span>다음 루 진출 (희망 직무)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Target Industry & Job */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 border-b border-blue-800/60 pb-3">
                <Target className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">희망 산업군 및 직무 타깃팅 (선택)</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-blue-200 mb-2">
                    희망 산업군
                  </label>
                  <select
                    value={targetIndustry}
                    onChange={(e) => setTargetIndustry(e.target.value)}
                    className="w-full bg-[#071329] border border-blue-500/40 focus:border-cyan-400 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  >
                    <option value="IT / 콘텐츠 / 플랫폼">IT / 콘텐츠 / 플랫폼</option>
                    <option value="이커머스 / 유통 / 물류">이커머스 / 유통 / 물류</option>
                    <option value="금융 / 은행 / 증권">금융 / 은행 / 증권</option>
                    <option value="제조 / 자동차 / 전자">제조 / 자동차 / 전자</option>
                    <option value="바이오 / 제약 / 헬스케어">바이오 / 제약 / 헬스케어</option>
                    <option value="공기업 / 공공기관 / 재단">공기업 / 공공기관 / 재단</option>
                    <option value="글로벌 / 무역 / 외국계">글로벌 / 무역 / 외국계</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-blue-200 mb-2">
                    희망 직무
                  </label>
                  <input
                    type="text"
                    value={targetJob}
                    onChange={(e) => setTargetJob(e.target.value)}
                    placeholder="예: 서비스 기획 / 마케팅 / 백엔드 개발"
                    className="w-full bg-[#071329] border border-blue-500/40 focus:border-cyan-400 rounded-xl py-3 px-4 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  />
                </div>
              </div>

              {/* Summary Preview Box before submission */}
              <div className="bg-[#071329]/80 border border-blue-500/30 rounded-2xl p-5 space-y-3">
                <h4 className="text-xs font-black text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  입력된 스펙 최종 확인
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-[#002B5E]/50 p-2.5 rounded-lg border border-blue-800">
                    <span className="text-slate-400 block text-[10px]">지원자/전공</span>
                    <span className="font-bold text-white">{name || '익명'} ({major || '미입력'})</span>
                  </div>
                  <div className="bg-[#002B5E]/50 p-2.5 rounded-lg border border-blue-800">
                    <span className="text-slate-400 block text-[10px]">학점</span>
                    <span className="font-bold text-cyan-300">{gpa || '미입력'}</span>
                  </div>
                  <div className="bg-[#002B5E]/50 p-2.5 rounded-lg border border-blue-800">
                    <span className="text-slate-400 block text-[10px]">어학 성적</span>
                    <span className="font-bold text-amber-300">{languageScore || '없음'}</span>
                  </div>
                  <div className="bg-[#002B5E]/50 p-2.5 rounded-lg border border-blue-800">
                    <span className="text-slate-400 block text-[10px]">자격증</span>
                    <span className="font-bold text-emerald-300">{certificates.length}개 보유</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>이전 (자소서/경험)</span>
                </button>

                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-2xl text-base shadow-2xl shadow-amber-500/40 flex items-center gap-3 cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
                >
                  <Sparkles className="w-5 h-5 text-slate-950 animate-spin" />
                  <span>10년차 AI 스카우팅 리포트 생성 시작</span>
                  <Flame className="w-5 h-5 text-rose-600 fill-rose-600" />
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};
