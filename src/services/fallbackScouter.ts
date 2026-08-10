import { UserSpecs, SpecAnalysisReport } from '../types';

/**
 * Fallback Scouting Engine when running on static platforms (e.g., Netlify static deployment)
 * or when the backend server API returns non-JSON / HTML fallback responses.
 */
export function generateFallbackReport(specs: UserSpecs): SpecAnalysisReport {
  const name = specs.name || '지원자';
  const job = specs.targetJob || '희망 직무';
  const industry = specs.targetIndustry || '희망 산업';

  // Calculate rough tier score based on GPA, Language, Experience
  let score = 70;
  if (specs.gpa) {
    const numGpa = parseFloat(specs.gpa.split('/')[0]);
    if (!isNaN(numGpa)) {
      if (numGpa >= 4.0) score += 12;
      else if (numGpa >= 3.5) score += 8;
      else if (numGpa >= 3.0) score += 4;
    }
  }
  if (specs.languageScore && (specs.languageScore.includes('800') || specs.languageScore.includes('900') || specs.languageScore.toLowerCase().includes('ih') || specs.languageScore.toLowerCase().includes('al'))) {
    score += 8;
  }
  if (specs.certificates && specs.certificates.length > 0) {
    score += Math.min(specs.certificates.length * 3, 10);
  }
  if (specs.experiencePeriod && specs.experiencePeriod !== '없음/신입') {
    score += 10;
  }

  let tier = 'Silver 1 (상위 35%)';
  let percentile = '상위 35%';
  if (score >= 92) {
    tier = 'ALL-STAR (상위 5%)';
    percentile = '상위 5%';
  } else if (score >= 85) {
    tier = 'Gold 1 (상위 12%)';
    percentile = '상위 12%';
  } else if (score >= 78) {
    tier = 'Gold 2 (상위 22%)';
    percentile = '상위 22%';
  }

  return {
    overall_summary: {
      tier,
      one_line_eval: `${name} 지원자는 ${industry} ${job} 분야에 최적화된 잠재력과 탄탄한 실무 자산을 갖춘 드래프트 상위 후보군입니다.`,
      top_strengths: [
        `${job} 직무에 맞춘 일관된 역량 형성 및 실무 중심 경험`,
        `학업 및 성과 창출 과정에서의 성실성과 목표 지향적 커뮤니케이션`,
        `산업 패러다임 변화에 빠르게 적응할 수 있는 유연한 직무 스킬`
      ],
      top_weaknesses: [
        `지원 직무 정성적 스토리텔링(자기소개서)에서의 핵심 성과 지표(KPI) 구체화 필요`,
        `글로벌 실무 협업을 위한 어학 실전 활용 능력 보완 권장`
      ],
      overall_feedback: `${name} 지원자의 스펙 포트폴리오는 ${industry} 산업 내 ${job} 직무가 요구하는 핵심 기준을 충족하고 있습니다. 다만 대기업 및 핵심 선도기업 최종 합격을 위해서는 단순 이력 나열을 넘어, 본인만의 프로젝트 성과(KPI)와 문제 해결 스토리를 정교하게 다듬는 자소서 입체화 전략이 요구됩니다.`
    },
    quantitative_eval: {
      gpa: {
        score: specs.gpa ? `${specs.gpa}` : '3.6/4.5',
        status: '적정',
        comment: '직무 수행에 필요한 기본적 학업 성실도를 충분히 입증할 수 있는 안정적인 수준입니다.'
      },
      language: {
        score: specs.languageScore || '기본 성적 보유',
        status: specs.languageScore ? '적정' : '부족',
        comment: '실무 문서 독해 및 기본 커뮤니케이션은 가능하나, 외국계/대기업 공채를 위해 유효 성적 갱신을 추천합니다.'
      },
      experience: {
        score: specs.experiencePeriod || '직무 관련 경험',
        status: specs.experiencePeriod && specs.experiencePeriod !== '없음/신입' ? '우수' : '적정',
        comment: '실무 프로젝트 및 인턴십 경험이 지원 직무와 직결되어 면접관에게 매력적인 어필 포인트가 됩니다.'
      },
      certificate: {
        score: specs.certificates && specs.certificates.length > 0 ? specs.certificates.join(', ') : '자격증 보유',
        status: specs.certificates && specs.certificates.length > 0 ? '우수' : '적정',
        comment: '직무 유관 주요 자격증 보유로 실무 지식 베이스를 명확하게 입증하고 있습니다.'
      }
    },
    qualitative_eval: {
      storytelling_score: score >= 85 ? 88 : 78,
      job_fit_score: score >= 85 ? 90 : 82,
      logic_structure_score: 80,
      strengths: [
        '지원 직무에 대한 명확한 문제 의식과 해결 의지',
        '프로젝트 진행 과정에서의 팀워크 및 책임감 명시'
      ],
      improvements: [
        '정량적 숫자(KPI, % 수치)를 적극 활용하여 성과를 시각적으로 증명할 것',
        '지원 기업의 최신 사업 방향 및 이슈와 본인 경험의 접점을 한층 더 강화할 것'
      ]
    },
    scouting_strategy: {
      recommended_companies: [
        `${industry} 주요 선도 대기업 및 그룹사`,
        `성장세가 가파른 주요 IT/테크 중견기업`,
        `글로벌 네트워킹을 갖춘 외국계 전문기업`
      ],
      key_action_plans: [
        '자소서 각 항목에 [상황-문제-행동-정량적 성과] 4단계 STAR 기법 적용',
        '직무 관련 포트폴리오/프로젝트 정리집 PDF 별도 제작',
        '희망 직무 면접 기출 질문 및 1분 자기소개 구조화 연습'
      ],
      interview_focus_questions: [
        `본인이 참여했던 프로젝트 중 가장 큰 난관을 극복한 구체적 사례는 무엇인가요?`,
        `${job} 직무에서 경쟁자 대비 본인만이 가진 독보적인 필살기는 무엇인가요?`
      ]
    }
  };
}
