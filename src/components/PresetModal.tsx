import React from 'react';
import { SpecPreset } from '../types';
import { SAMPLE_PRESETS } from '../data/samplePresets';
import { X, Play, Trophy, Sparkles, UserCheck } from 'lucide-react';

interface PresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: SpecPreset) => void;
}

export const PresetModal: React.FC<PresetModalProps> = ({ isOpen, onClose, onSelectPreset }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0A1833] border-t-4 border-[#074CA1] border-x border-b border-blue-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-white text-[#074CA1] text-[10px] font-black px-2 py-0.5 skew-x-[-15deg] italic uppercase tracking-wider">
            PRO-SCOUT PRESETS
          </span>
          <span className="text-xs text-cyan-300 font-bold">SPECLENS SAMPLE DATA</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white mb-2 flex items-center gap-2 italic">
          <span>샘플 스펙 프로필 선택</span>
          <Sparkles className="w-5 h-5 text-amber-300 not-italic" />
        </h3>

        <p className="text-xs text-slate-300 mb-6">
          원하시는 합격자/취준생 샘플 스펙을 선택하시면 입력 폼이 자동으로 채워지고 AI 스카우팅 분석이 즉시 실행됩니다.
        </p>

        {/* Preset Cards List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                onSelectPreset(preset);
                onClose();
              }}
              className="w-full text-left bg-[#071329] hover:bg-[#003B7A] border border-blue-500/30 hover:border-amber-400 p-4 rounded-2xl transition-all shadow-md group cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    {preset.badge}
                  </span>
                  <span className="text-xs font-bold text-cyan-300">{preset.specs.name} 지원자</span>
                </div>
                <h4 className="text-sm font-black text-white group-hover:text-amber-200 transition-colors">
                  {preset.title}
                </h4>
                <p className="text-xs text-slate-400">
                  {preset.specs.major} | 학점: {preset.specs.gpa} | {preset.specs.languageScore}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-1 text-xs font-black text-cyan-300 group-hover:text-amber-300 bg-blue-900/60 px-3 py-2 rounded-xl border border-blue-500/40">
                <span>선택</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
