import { UserSpecs, SpecAnalysisReport } from '../types';

/**
 * Realistic & Strict Scouting Engine
 * Evaluates candidate specs with objective headhunter standards.
 * Deducts points heavily for missing language, low GPA (< 3.0), no certificates, or empty cover letters.
 */
export function generateFallbackReport(specs: UserSpecs): SpecAnalysisReport {
  const name = specs.name || '지원자';
  const job = specs.targetJob || '희망 직무';
  const industry = specs.targetIndustry || '희망 산업';

  let score = 50; // Neutral starting base score

  // 1. GPA Evaluation
  let gpaStatus: '우수' | '적정' | '부족' = '적정';
  let gpaComment = '';
  if (specs.gpa) {
    const rawGpa = parseFloat(specs.gpa.split('/')[0]);
    if (!isNaN(rawGpa)) {
      if (rawGpa >= 4.0) {
        score += 15;
        gpaStatus = '우수';
        gpaComment = `학점 ${specs.gpa}로 최상위권 학업 성실도 및 성실성을 증명하고 있습니다.`;
      } else if (rawGpa >= 3.5) {
        score += 8;
        gpaStatus = '적정';
        gpaComment = `학점 ${specs.gpa}로 서류전형을 통과하기에 무난하고 안정적인 수준입니다.`;
      } else if (rawGpa >= 3.0) {
        score += 2;
        gpaStatus = '적정';
        gpaComment = `학점 ${specs.gpa}로 커트라인은 충족하나, 상위권 기업 지원 시 학점 우위는 기대하기 힘듭니다.`;
      } else {
        score -= 15;
        gpaStatus = '부족';
        gpaComment = `학점 ${specs.gpa}는 주요 기업 평균 대비 낮은 편입니다. 실무 경험 및 자격증으로 보완이 필수적입니다.`;
      }
    } else {
      gpaComment = '학점 정보가 명확히 입력되지 않았습니다.';
    }
  } else {
    score -= 5;
    gpaComment = '학점 정보 미입력으로 학업 성실도 평가 지표가 누락되었습니다.';
  }

  // 2. Language Score Evaluation
  let langStatus: '우수' | '적정' | '부족' = '부족';
  let langComment = '';
  const langText = (specs.languageScore || '').toLowerCase().trim();

  if (!langText || langText === '없음' || langText === '미보유' || langText === '없음/미보유') {
    score -= 18;
    langStatus = '부족';
    langComment = '유효 어학 성적이 없습니다. 주요 대기업/외국계 공채 서류전형 자동 필터링(탈락) 위험이 매우 높습니다.';
  } else if (
    langText.includes('900') ||
    langText.includes('950') ||
    langText.includes('al') ||
    langText.includes('level 8') ||
    langText.includes('8급')
  ) {
    score += 15;
    langStatus = '우수';
    langComment = `어학 성적(${specs.languageScore})이 최상위 수준으로, 글로벌 비즈니스 및 해외 사업무대 진출이 가능합니다.`;
  } else if (
    langText.includes('800') ||
    langText.includes('850') ||
    langText.includes('ih') ||
    langText.includes('level 7') ||
    langText.includes('level 6') ||
    langText.includes('7급')
  ) {
    score += 8;
    langStatus = '적정';
    langComment = `어학 성적(${specs.languageScore}) 보유로 대기업 공채 지원 자격 기준을 충족하고 있습니다.`;
  } else {
    score += 2;
    langStatus = '부족';
    langComment = `어학 성적(${specs.languageScore})이 다소 아쉽습니다. 대기업 공채 평균(토익 850+/OIC IH+)까지 상향 취득을 권장합니다.`;
  }

  // 3. Certificates Evaluation
  let certStatus: '우수' | '적정' | '부족' = '부족';
  let certComment = '';
  const certList = specs.certificates || [];

  if (certList.length >= 3) {
    score += 12;
    certStatus = '우수';
    certComment = `유관 자격증 ${certList.length}개(${certList.join(', ')}) 보유로 직무 전문성 지식을 명확히 증명했습니다.`;
  } else if (certList.length >= 1) {
    score += 6;
    certStatus = '적정';
    certComment = `직무 관련 자격증(${certList.join(', ')})을 보유하여 실무 기초 지식을 갖추었습니다.`;
  } else {
    score -= 8;
    certStatus = '부족';
    certComment = '직무 유관 자격증이 미보유 상태입니다. 전공/실무 경험이 부족할 경우 자격증으로 전문성을 증명해야 합니다.';
  }

  // 4. Practical Experience Evaluation
  let expStatus: '우수' | '적정' | '부족' = '부족';
  let expComment = '';
  const expPeriod = specs.experiencePeriod || '없음/신입';

  if (expPeriod.includes('1년 이상') || expPeriod.includes('3년 이상') || expPeriod.includes('경력')) {
    score += 18;
    expStatus = '우수';
    expComment = `풍부한 실무 경력(${expPeriod})을 보유하여, 채용 즉시 현업 투입이 가능한 강한 즉시전력감입니다.`;
  } else if (expPeriod.includes('6개월') || expPeriod.includes('인턴') || expPeriod.includes('프로젝트')) {
    score += 10;
    expStatus = '적정';
    expComment = `실무 인턴/프로젝트 경험(${expPeriod})으로 조직 적응력과 업무 이해도를 갖추고 있습니다.`;
  } else if (expPeriod.includes('3개월') || expPeriod.includes('단기')) {
    score += 4;
    expStatus = '적정';
    expComment = '단기 경험이 있으나, 깊이 있는 정량적 실무 성과를 자소서에 입체적으로 녹여내는 전략이 필요합니다.';
  } else {
    score -= 12;
    expStatus = '부족';
    expComment = '직무 유관 인턴 및 실무 경험이 부재합니다. 최근 수시채용 트렌드에서 감점 요인이 될 수 있습니다.';
  }

  // 5. Cover Letter Qualitative Check
  const coverText = specs.coverLetterAndExperience || '';
  if (coverText.length < 30) {
    score -= 15; // Heavy penalty for sparse/empty cover letter
  } else if (/\d+%|\d+원|\d+건|\d+배|kpi|kpi/i.test(coverText)) {
    score += 10; // Bonus for quantitative numbers
  }

  // Final Tier & Percentile Calibration
  let tier = '';
  let oneLineEval = '';

  if (score >= 88) {
    tier = 'ALL-STAR (상위 5%)';
    oneLineEval = `${name} 지원자는 ${industry} ${job} 분야 최상위권 스펙과 실무 자산을 두루 갖춘 즉시 전력 스카우트 1순위 후보입니다.`;
  } else if (score >= 76) {
    tier = 'Gold 1 (상위 15%)';
    oneLineEval = `${name} 지원자는 안정적인 스펙 밸런스를 갖추고 있어 대기업 및 주요 중견기업 공채에서 경쟁력이 높습니다.`;
  } else if (score >= 64) {
    tier = 'Gold 2 (상위 32%)';
    oneLineEval = `${name} 지원자는 기본기 스펙은 갖추고 있으나, 특정 약점 항목의 보완과 자소서 필살기 수치화가 시급합니다.`;
  } else if (score >= 50) {
    tier = 'Silver (상위 55%)';
    oneLineEval = `${name} 지원자는 현재 스펙으로 서류 통과가 아슬아슬한 경계선에 있습니다. 약점 보완 없이는 서류 탈락율이 높습니다.`;
  } else {
    tier = 'Bronze (상위 80% 이하)';
    oneLineEval = `${name} 지원자는 현재 어학/경력/자격증 등 주요 서류 정량 스펙이 크게 부족하여 대대적인 재정비가 필수적입니다.`;
  }

  // Strengths & Weaknesses Generation
  const topStrengths: string[] = [];
  const topWeaknesses: string[] = [];

  if (gpaStatus === '우수') topStrengths.push(`학점(${specs.gpa})을 통한 뛰어난 성실성과 학업 성취도 보증`);
  if (langStatus === '우수') topStrengths.push(`우수한 어학 성적(${specs.languageScore})으로 글로벌 소통 역량 확보`);
  if (expStatus === '우수' || expStatus === '적정') topStrengths.push(`지원 직무와 연결되는 인턴/실무 경험(${specs.experiencePeriod}) 보유`);
  if (certStatus === '우수') topStrengths.push(`직무 관련 주요 자격증 다수 보유로 전문성 증명`);

  if (topStrengths.length === 0) {
    topStrengths.push('희망 직무를 향한 명확한 지원 동기와 의지 보유');
    topStrengths.push('전공 학부 과정을 통한 기본 학문적 이해도');
  }

  if (langStatus === '부족') topWeaknesses.push('어학 성적 미보유 또는 미흡으로 서류전형 자동 검증 탈락 위험');
  if (expStatus === '부족') topWeaknesses.push('실무/인턴 경험 부재로 현 수시채용 시장에서의 즉시전력 어필 부족');
  if (gpaStatus === '부족') topWeaknesses.push('상대적으로 낮은 학점으로 인한 성실도 평가 감점');
  if (certStatus === '부족') topWeaknesses.push('직무 관련 검증 자격증 부재로 전문성 증명력 약화');

  if (topWeaknesses.length === 0) {
    topWeaknesses.push('정성적 자소서 스토리텔링 시 정량적 KPI(성과 숫자) 수치화 보완 필요');
    topWeaknesses.push('지원 기업 최신 비즈니스 이슈와의 접점 강화 필요');
  }

  return {
    overall_summary: {
      tier,
      one_line_eval: oneLineEval,
      top_strengths: topStrengths,
      top_weaknesses: topWeaknesses
    },
    recommended_jobs: [
      {
        rank: 1,
        industry: industry || '주요 산업군',
        job_title: job || '희망 직무',
        match_score: Math.min(Math.max(score, 45), 96),
        reason: `${specs.major || '전공'} 기반 지식과 제출된 스펙을 기반으로 가장 현실적으로 합격 가능성이 높은 메인 타깃 직무입니다.`
      },
      {
        rank: 2,
        industry: 'IT/서비스',
        job_title: `${job} 기획 및 운영`,
        match_score: Math.min(Math.max(score - 6, 40), 88),
        reason: '실무 관련 경험 및 커뮤니케이션 역량을 발휘하여 직무 스펙트럼을 다각화할 수 있는 서브 추천 직무입니다.'
      },
      {
        rank: 3,
        industry: '글로벌/중견',
        job_title: '사업 지원 및 오퍼레이션',
        match_score: Math.min(Math.max(score - 12, 35), 80),
        reason: '조직 관리 및 데이터 정리 역량을 바탕으로 안정적인 합격을 노려볼 수 있는 기획지원 직무입니다.'
      }
    ],
    competitiveness_breakdown: {
      gpa: {
        status: gpaStatus,
        comment: gpaComment
      },
      language: {
        status: langStatus,
        comment: langComment
      },
      experience: {
        status: expStatus,
        comment: expComment
      },
      certificate: {
        status: certStatus,
        comment: certComment
      }
    },
    swot_analysis: {
      strengths: topStrengths,
      weaknesses: topWeaknesses,
      opportunities: [
        `${industry} 산업군 내 직무 전문성 중심의 수시채용 기회 확대`,
        '자기소개서 내 정량적 성과(STAR 기법) 강조 시 서류 합격률 급상승'
      ],
      threats: [
        '유사 지원자들의 정량적 성과 수치화 및 실무 경험 비중 대폭 증가',
        '어학 및 주요 서류 스펙 미달 시 자동 AI 서류 스크리닝 탈락 위험'
      ]
    },
    storytelling_guide: {
      title: '자소서 & 경험 스토리텔링 개편 가이드',
      before_after: [
        {
          before: '프로젝트 과정에서 팀원들과 협력하여 성실하게 임무를 수행했습니다.',
          after: '프로젝트 진행 중 문제점을 발굴하고, 주간 진행률 KPI 표를 도입하여 업무 처리 속도를 20% 향상시켰습니다.',
          key_point: '단순 성실함 나열이 아닌, 문제 해결 행동과 정량적 숫자 성과(20% 향상) 명시'
        },
        {
          before: '학부 전공 수업을 이수하며 직무 관련 전공 지식을 높였습니다.',
          after: '관련 전공 과목에서 데이터 분석 프로젝트 A+를 획득하고 관련 자격증 취득으로 객관적 검증을 완료했습니다.',
          key_point: '수업 이수 사실을 넘어 우수한 성과(A+) 및 성과물과의 연계 증명'
        }
      ],
      headhunter_secret:
        '헤드헌터가 가장 먼저 보는 자소서는 [문제 상황 -> 내가 취한 행동 -> 정량적 결과(숫자, %)]가 작성된 자소서입니다. 추상적인 감성 표현을 모두 지우고 숫자로 말하세요.'
    },
    action_plan: {
      short_term: [
        langStatus === '부족' ? '🚨 필수: 대기업 서류 제출용 어학 성적(TOEIC/OIC/토스) 최우선 획득' : '자소서 주요 항목에 정량적 숫자 및 성과 지표(KPI) 추가 작성',
        expStatus === '부족' ? '🚨 필수: 직무 관련 인턴십 지원 또는 관련 서포터즈/프로젝트 참여' : '지원 희망 기업 맞춤형 포트폴리오 PDF 정리 및 업데이트',
        'STAR 프레임워크 기반 1분 자기소개 스크립트 작성'
      ],
      long_term: [
        '희망 직무 대표 전문 자격증 추가 취득',
        '희망 기업 지원 및 실전 면접 모의 테스트 진행',
        '직무 관련 커뮤니티 및 현직자 멘토링 네트워크 확보'
      ]
    }
  };
}
