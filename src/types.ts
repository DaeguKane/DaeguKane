export type CompetitivenessStatus = '부족' | '적정' | '우수';

export interface CompetitivenessItem {
  status: CompetitivenessStatus;
  comment: string;
}

export interface RecommendedJob {
  rank: number;
  industry: string;
  job_title: string;
  match_score: number; // 0 ~ 100
  reason: string;
}

export interface OverallSummary {
  tier: string; // e.g. "A- (상위 20%)", "Gold 1 (상위 15%)"
  one_line_eval: string;
  top_strengths: string[];
  top_weaknesses: string[];
}

export interface CompetitivenessBreakdown {
  gpa: CompetitivenessItem;
  language: CompetitivenessItem;
  experience: CompetitivenessItem;
  certificate: CompetitivenessItem;
}

export interface ActionPlan {
  short_term: string[];
  long_term: string[];
}

export interface BeforeAfterStory {
  before: string;
  after: string;
  key_point: string;
}

export interface StorytellingGuide {
  title: string;
  before_after: BeforeAfterStory[];
  headhunter_secret: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

// Complete JSON output schema from Gemini AI
export interface SpecAnalysisReport {
  overall_summary: OverallSummary;
  recommended_jobs: RecommendedJob[];
  competitiveness_breakdown: CompetitivenessBreakdown;
  action_plan: ActionPlan;
  storytelling_guide?: StorytellingGuide;
  swot_analysis?: SwotAnalysis;
}

// User Input Specs
export interface UserSpecs {
  name: string;
  universityCategory: string; // e.g., "인서울 주요대", "지방 거점 국립대", "수도권 대학", "지방대", "해외대"
  major: string;
  gpa: string; // e.g. "3.6 / 4.5"
  languageScore: string; // e.g. "토익 850, 오픽 IM3"
  certificates: string[]; // e.g. ["ADsP", "컴활 1급"]
  experiencePeriod: string; // e.g. "인턴 6개월 + 직무 동아리 1년"
  targetIndustry?: string; // e.g. "IT / 커머스"
  targetJob?: string; // e.g. "서비스 기획 / 마케팅"
  coverLetterAndExperience: string; // 정성적 자소서/경험 내용
}

// Preset interface for 1-click test fill
export interface SpecPreset {
  id: string;
  title: string;
  badge: string;
  specs: UserSpecs;
}
