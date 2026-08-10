import { SpecPreset } from '../types';

export const SAMPLE_PRESETS: SpecPreset[] = [
  {
    id: 'preset-1',
    title: 'IT / 서비스기획 · 마케터 지망생',
    badge: '인문계/경영 · 실무 프로젝트 보유',
    specs: {
      name: '김사자',
      universityCategory: '인서울 주요 10개 대학',
      major: '경영학 / 언론정보학 이중전공',
      gpa: '3.65 / 4.5',
      languageScore: '오픽 IM3, 토익 860',
      certificates: ['컴퓨터활용능력 1급', 'ADsP(데이터분석준전문가)'],
      experiencePeriod: '마케팅 스타트업 인턴 6개월 + 대학생 직무 학회 1년 + 공모전 입상 1회',
      targetIndustry: 'IT / 커머스 / 플랫폼',
      targetJob: '서비스 기획 (PM) / 퍼포먼스 마케팅',
      coverLetterAndExperience: `[인턴십 경험 - 스타트업 앱 퍼포먼스 마케팅 개선]
6개월간 뷰티 커머스 앱 마케팅 팀 인턴으로 근무하며 신규 유저 유입 CAC(고객획득비용)를 25% 절감했습니다.
유저 이탈 구간을 데이터로 분석하여 메인 배너 A/B 테스트를 진행했고, CTR을 2.1%에서 4.8%로 끌어올렸습니다.

[학회 프로젝트 - 데이터 기반 서비스 기획]
대학생 IT 서비스 기획 학회에서 대학생 맞춤형 중고거래 어플리케이션 Wireframe을 제작하고 1,000명의 유저 설문 조사를 바탕으로 MVP(최소기능제품)를 정의했습니다.

[자기소개서 작성글]
저의 가장 큰 장점은 데이터 분석을 통해 고객의 숨겨진 불편함(Pain Point)을 발굴하고 이를 직관적인 서비스 UX로 풀어내는 실행력입니다. 입사 후 수치 기반의 의사결정으로 대기업 유저 지표 향상에 기여하겠습니다.`
    }
  },
  {
    id: 'preset-2',
    title: 'SW / 데이터 엔지니어 지망생',
    badge: '이공계/컴공 · 부트캠프 프로젝트 보유',
    specs: {
      name: '박블루',
      universityCategory: '지방 거점 국립대',
      major: '컴퓨터공학과',
      gpa: '3.82 / 4.5',
      languageScore: '토익 780, 토익스피킹 IH (140)',
      certificates: ['정보처리기사', 'SQLD'],
      experiencePeriod: 'SSAFY SW 부트캠프 1년 + 산학협력 프로젝트 6개월 + 오픈소스 기여',
      targetIndustry: 'IT / 금융 IT / 엔터프라이즈',
      targetJob: '백엔드 개발자 / 데이터 엔지니어',
      coverLetterAndExperience: `[산학협력 프로젝트 - 실시간 분산 데이터 처리 시스템 개발]
Spring Boot 및 Kafka, Redis를 활용하여 초당 5,000건의 실시간 트래픽을 처리하는 대용량 이벤트 처리 서버를 구축했습니다.
쿼리 튜닝 및 인덱스 최적화를 통해 평균 API 응답 속도를 320ms에서 45ms로 85% 개선했습니다.

[부트캠프 최종 우수 프로젝트]
6명으로 구성된 팀에서 백엔드 팀장을 맡아 Docker 및 Kubernetes 기반 CI/CD 파이프라인을 자동화하여 배포 주기를 일단위로 단축했습니다.

[자기소개서 작성글]
단순히 코드를 작성하는 것을 넘어 서비스 성능 병목을 수치적으로 측정하고 시스템 구조 개선으로 해결하는 과정에서 희열을 느낍니다.`
    }
  },
  {
    id: 'preset-3',
    title: '해외영업 / 글로벌 사업개발 지망생',
    badge: '어학 우수 · 교환학생 & 해외 봉사',
    specs: {
      name: '이라이온',
      universityCategory: '수도권 주요 대학',
      major: '국제통상학과 / 영문학',
      gpa: '3.42 / 4.5',
      languageScore: '토익 975, 오픽 AL, 무역영어 1급',
      certificates: ['유통관리사 2급', '무역영어 1급'],
      experiencePeriod: '미국 교환학생 1년 + 글로벌 무역상사 인턴 4개월 + KOTRA 해외봉사단',
      targetIndustry: '종합상사 / 글로벌 자동차 / 뷰티 수출',
      targetJob: '해외영업 / 글로벌 물류 / B2B 사업개발',
      coverLetterAndExperience: `[글로벌 인턴십 - 미주 지역 B2B 바이어 발굴]
무역상사 미주 사업부 인턴으로 근무하며 현지 유통 바이어 30개사 Cold Email 마케팅을 전개, 미팅 성사율 15%를 기록했습니다.
수출 통관 서류(B/L, C/O, Packing List) 작성 업무를 직접 담당하여 납기 지연 0건 달성에 기여했습니다.

[미국 교환학생 및 로컬 커뮤니티 리더]
미국 유학 중 로컬 비즈니스 동아리를 주도하며 한국 화장품 팝업스토어를 개최, 사흘간 3,000달러의 매출을 올렸습니다.

[자기소개서 작성글]
다양한 문화권 사람들과의 원활한 커뮤니케이션 능력과 현지 시장을 철저히 분석하는 집요함을 보유하고 있습니다.`
    }
  },
  {
    id: 'preset-4',
    title: '공기업 / 금융권 행정 지망생',
    badge: '고학점 · 정량 스펙 보유',
    specs: {
      name: '최스트라이크',
      universityCategory: '지방 거점 국립대',
      major: '행정학과 / 경제학 부전공',
      gpa: '4.15 / 4.5',
      languageScore: '토익 920, 토익스피킹 AL (160)',
      certificates: ['한국사능력검정시험 1급', '컴퓨터활용능력 1급', 'AFPK'],
      experiencePeriod: '공공기관 청년인턴 5개월 + 금융권 서포터즈 1년',
      targetIndustry: '금융공기업 / 은행 / 행정 공공기관',
      targetJob: '일반행정 / 금융영업 / 기획행정',
      coverLetterAndExperience: `[공공기관 청년인턴 - 민원 행정 처리 프로세스 단축]
5개월간 국민건강보험공단 지사 인턴으로 대민 상담 및 서류 수신 업무를 담당했습니다.
자주 묻는 질문(FAQ) 매뉴얼을 자체 제작하여 민원 대기 시간을 평균 10분 단축했습니다.

[금융권 고객 만족 서포터즈]
시중은행 서포터즈 활동 시 고령층 디지털 금융 소외 해소를 위한 쉬운 앱 UI 가이드북을 기획하여 지점 배포 승인을 받았습니다.

[자기소개서 작성글]
성실함과 정직함, 철저한 법규 및 지침 준수 마인드로 고객과 조직에 신뢰를 주는 직원이 되겠습니다.`
    }
  }
];
