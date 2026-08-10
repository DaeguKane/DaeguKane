import { UserSpecs, SpecAnalysisReport } from '../types';

/**
 * Fallback Scouting Engine when running on static platforms (e.g., Netlify static deployment)
 * or when the backend server API returns non-JSON / HTML fallback responses.
 */
export function generateFallbackReport(specs: UserSpecs): SpecAnalysisReport {
  const name = specs.name || '지원자';
  const job = specs.targetJob || '희망 직무';
  const industry = specs.targetIndustry || '희망 산업';

  // Calculate rough score based on GPA, Language, Experience
  let score = 70;
  if (specs.gpa) {
    const numGpa = parseFloat(specs.gpa.split('/')[0]);
    if (!isNaN(numGpa)) {
      if (numGpa >= 4.0) score += 12;
      else if (numGpa >= 3.5) score += 8;
      else if (numGpa >= 3.0) score += 4;
    }
  }
  if (
    specs.languageScore &&
    (specs.languageScore.includes('800') ||
      specs.languageScore.includes('900') ||
      specs.languageScore.toLowerCase().includes('ih') ||
      specs.languageScore.toLowerCase().includes('al'))
  ) {
    score += 8;
  }
  if (specs.certificates && specs.certificates.length > 0) {
    score += Math.min(specs.certificates.length * 3, 10);
  }
  if (specs.experiencePeriod && specs.experiencePeriod !== '없음/신입') {
    score += 10;
  }

  let tier = 'Silver 1 (상위 35%)';
  if (score >= 92) {
    tier = 'ALL-STAR (상위 5%)';
  } else if (score >= 85) {
    tier = 'Gold 1 (상위 12%)';
  } else if (score >= 78) {
    tier = 'Gold 2 (상위 22%)';
  }

  const expStatus = specs.experiencePeriod && specs.experiencePeriod !== '없음/신입' ? '우수' : '적정';
  const certStatus = specs.certificates && specs.certificates.length > 0 ? '우수' : '적정';
  const langStatus = specs.languageScore ? '적정' : '부족';

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
      ]
    },
    recommended_jobs: [
      {
        rank: 1,
        industry: industry || 'IT/테크',
        job_title: job || '주요 핵심 직무',
        match_score: Math.min(score + 5, 98),
        reason: `${specs.major} 전공 지식과 프로젝트 및 자격증 스펙이 가장 강력한 시너지를 내는 1순위 직무입니다.`
      },
      {
        rank: 2,
        industry: industry || '전문 서비스',
        job_title: `${job} 전략 기획`,
        match_score: Math.min(score, 90),
        reason: '실무 경험과 학업 성실도를 바탕으로 직무 스펙트럼을 넓혀 지원 가능한 유망 직무입니다.'
      },
      {
        rank: 3,
        industry: '글로벌/중견',
        job_title: '사업 개발 및 오퍼레이션',
        match_score: Math.max(score - 8, 75),
        reason: '다양한 역량을 융합하여 기획과 실행을 동시에 이끌어낼 수 있는 확장 직무입니다.'
      }
    ],
    competitiveness_breakdown: {
      gpa: {
        status: '적정',
        comment: specs.gpa
          ? `학점 ${specs.gpa}로 기본 성실도를 충분히 입증할 수 있는 안정적 수준입니다.`
          : '기본 학업 수준을 보유하고 있습니다.'
      },
      language: {
        status: langStatus,
        comment: specs.languageScore
          ? `어학 성적(${specs.languageScore}) 보유로 실무 문서 독해 및 기본적인 비즈니스 소통이 가능합니다.`
          : '외국계 및 대기업 공채 지원을 위해 어학 성적 획득을 권장합니다.'
      },
      experience: {
        status: expStatus,
        comment:
          specs.experiencePeriod && specs.experiencePeriod !== '없음/신입'
            ? `실무/프로젝트 경험(${specs.experiencePeriod})이 직무와 직결되어 차별화 포인트로 작용합니다.`
            : '직무 유관 프로젝트나 인턴십 경험을 추가하여 서류 합격률을 높이기를 권장합니다.'
      },
      certificate: {
        status: certStatus,
        comment:
          specs.certificates && specs.certificates.length > 0
            ? `유관 자격증(${specs.certificates.join(', ')})을 보유하여 실무 이행 능력을 검증받았습니다.`
            : '직무 전문 자격증 추가 취득 시 서류 전형에서 경쟁력이 향상됩니다.'
      }
    },
    swot_analysis: {
      strengths: [
        '지원 직무에 대한 명확한 문제 의식과 열정',
        '프로젝트 및 자격증으로 입증된 직무 기초 실무력'
      ],
      weaknesses: [
        '자기소개서 작성 시 정량적 데이터(KPI) 및 구체적 숫자 제시 부족',
        '글로벌 비즈니스 어학 실전 활용 능력 보완 필요'
      ],
      opportunities: [
        `${industry} 산업 내 신규 인재 채용 수요 지속적 증가`,
        '수시 채용 및 직무 중심 채용 전환으로 실무 경험자 우대 트렌드'
      ],
      threats: [
        '유사 스펙 경쟁자들의 수치화된 자소서 어필 증가',
        '기업들의 수시 채용 전환으로 인한 즉시 전력감 요구 강화'
      ]
    },
    storytelling_guide: {
      title: '자소서 & 경험 스토리텔링 개편 가이드',
      before_after: [
        {
          before: '인턴 근무 당시 팀원들과 협력하여 프로젝트를 성공적으로 끝마쳤습니다.',
          after: `인턴 및 프로젝트 진행 중 주도적으로 문제 원인을 분석하고, 주간 KPI 리포트를 작성하여 프로젝트 효율을 25% 개선했습니다.`,
          key_point: '단순 참여 사실 나열이 아닌, 본인의 주도적 역할과 정량적 성과 수치(25% 개선) 명시'
        },
        {
          before: '학부 과정 중 관련 강의를 이수하며 직무 지식을 키웠습니다.',
          after: `관련 교과목을 이수하며 실무 데이터 분석 과제에서 A+ 평가를 받았고, 실제 자격증 취득까지 연계하여 검증된 직무 기초를 다졌습니다.`,
          key_point: '이수 사실에 그치지 않고 성과(A+) 및 자격증 연계로 자격 검증 완료'
        }
      ],
      headhunter_secret:
        '서류 합격자들의 90% 이상은 본인의 경험을 [상황-문제-나의 행동-정량적 결과(KPI)]의 STAR 프레임워크로 작성합니다. 숫자로 말하는 자소서가 면접관의 시선을 사로잡습니다.'
    },
    action_plan: {
      short_term: [
        '자소서 주요 항목에 정량적 숫자 및 성과 지표(KPI) 추가 작성하기',
        '희망 직무 관련 프로젝트 포트폴리오 PDF 정리 및 업데이트',
        '1분 자기소개 및 핵심 역량 어필 스크립트 작성'
      ],
      long_term: [
        '직무 관련 대표 자격증 및 유효 어학 성적 갱신',
        '희망 기업 지원 및 실전 면접 모의 테스트 진행',
        '직무 관련 커뮤니티 및 현직자 멘토링 네트워크 확보'
      ]
    }
  };
}
