import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const data = [
  {
    title: "sosCCTV",
    techStack: "Python, MediaPipe, PyTorch, MLflow, Apache Airflow, Discord API",
    role: "Personal",
    objective: "실시간 SOS 위험 행동 감지 및 즉각적 알림 파이프라인 구축",
    content: "MediaPipe 기반 모션 인식과 딥러닝 모델을 결합하고 MLflow 검증 및 Airflow 주간 자동 재학습 파이프라인을 구축하여, 위급 상황 발생 시 디스코드 캡처 알림을 제공하는 실시간 SOS 감지 시스템 구현",
    troubleshooting: "프레임 저하 및 감지 지연 문제 발생",
    solution: "최적화 모델 구조 변경 및 파인튜닝으로 해결",
    achievements: "모션 인식율 개선 및 24시간 안정적인 자동 재학습 파이프라인 구축 성공",
    contribution: 100,
    isFeatured: false
  },
  {
    title: "jasoser_AI",
    techStack: "Python, Hugging Face, OpenAI API, LangChain, PyTorch, Scikit-learn, Streamlit",
    role: "Personal",
    objective: "AI 기반 자기소개서 채용 평가 및 하이브리드 추천 시스템 개발",
    content: "로컬 SBERT 기반 코사인 유사도 분석과 LLM 정성 평가를 결합한 하이브리드 채용 평가 시스템 구현 및 Top-K 유사 문장 매칭을 통한 설명 가능한 AI(XAI) 확보",
    troubleshooting: "단일 LLM의 환각(Hallucination) 현상 발생",
    solution: "SBERT 코사인 유사도 점수와 교차 검증하여 방지",
    achievements: "평가 신뢰도 상승 및 근거 기반(XAI)의 명확한 피드백 제공 모델 완성",
    contribution: 100,
    isFeatured: false
  },
  {
    title: "StockFlow",
    techStack: "Python, Streamlit, Pandas, Matplotlib",
    role: "Personal",
    objective: "사용자 맞춤형 주가 빅데이터 분석 및 시각화 대시보드 구축",
    content: "FinanceDataReader와 크롤링을 활용한 사용자 맞춤형 주가 분석 및 시각화 대시보드 개발",
    troubleshooting: "대용량 금융 데이터 로딩 속도 저하 현상",
    solution: "데이터 캐싱(Caching) 및 Pandas 최적화로 해결",
    achievements: "다양한 주가 지표에 대한 직관적인 웹 대시보드 런칭",
    contribution: 100,
    isFeatured: false
  },
  {
    title: "Cronbot",
    techStack: "Python, GitHub Actions",
    role: "Personal",
    objective: "가상화폐 시세 자동 크롤링 및 실시간 알림 시스템 개발",
    content: "GitHub Actions와 Python을 활용한 5분 주기 실시간 비트코인 시세 자동 업데이트 시스템 구축",
    troubleshooting: "무료 서버 환경에서의 스케줄링 제한",
    solution: "GitHub Actions의 Cron 기능을 활용해 우회",
    achievements: "서버 비용 0원으로 24시간 안정적인 스케줄러 및 데이터 수집 봇 운영",
    contribution: 100,
    isFeatured: false
  },
  {
    title: "MSA 세미나",
    techStack: "시스템 아키텍처, 세미나 발표",
    role: "Team",
    objective: "금융권 Core Banking 시스템의 현대화(MSA) 세미나 기획 및 발표",
    content: "금융권 핵심 시스템(Core Banking) 특성을 고려한 단계적 MSA 전환 로드맵 및 파일럿 아키텍처 설계",
    troubleshooting: "레거시 시스템과 신규 MSA 간의 데이터 동기화 이슈",
    solution: "Saga 패턴 및 이벤트 드리븐 아키텍처 도입으로 설계 고도화",
    achievements: "성공적인 세미나 진행 및 현업 적용 가능한 수준의 파일럿 아키텍처 제안",
    contribution: 50,
    isFeatured: false
  },
  {
    title: "알고리집",
    techStack: "Streamlit, MySQL, Python, OpenAI, HTML, CSS",
    role: "Team",
    objective: "청년층 전세가 정보 및 대출 가이드 제공 서비스 개발",
    content: "Geopy와 Folium을 활용한 서울시 전세가 시각화 및 MZ세대 맞춤형 대출 가이드 Streamlit 웹 서비스 개발",
    troubleshooting: "대규모 공간 데이터 시각화 시 랜더링 버벅임 발생",
    solution: "공간 인덱싱 및 클러스터링 기반 시각화로 해결",
    achievements: "쉽고 직관적인 대출 추천 로직 및 동적 지도 시각화 뷰 구현",
    contribution: 50,
    isFeatured: false
  },
  {
    title: "상장사 스마트 검색",
    techStack: "Elasticsearch, Logstash, Kibana, Python, Streamlit",
    role: "Personal",
    objective: "주식 공시 및 종목 시멘틱 검색 엔진 기술 구축",
    content: "OpenAI 임베딩과 Elasticsearch를 결합한 RAG 기반 주식 시멘틱 검색 시스템 및 스트림릿 서비스 개발",
    troubleshooting: "BM25 키워드 검색의 한계",
    solution: "OpenAI 임베딩 벡터와 Elasticsearch 밀집 벡터(Dense Vector) 검색 결합으로 해결",
    achievements: "키워드 불일치 상황에서도 문맥 기반으로 정확히 주식 종목을 찾아내는 검색 엔진 상용화",
    contribution: 100,
    isFeatured: false
  },
  {
    title: "우리 인사이트",
    techStack: "Python, Scikit-learn, Matplotlib, Seaborn",
    role: "Team",
    objective: "금융 고객 소비 패턴 데이터 기반의 군집 분석 및 페르소나 도출",
    content: "K-Means 군집 분석 및 실루엣 계수 검증을 통한 우리카드 고객 소비 패턴 기반 페르소나 세분화",
    troubleshooting: "최적의 군집(K) 개수 선정 어려움",
    solution: "엘보우 기법과 실루엣 계수를 교차 검증하여 논리적 타당성 확보",
    achievements: "고객 맞춤형 마케팅 수립에 직결될 수 있는 5가지 핵심 페르소나 발굴",
    contribution: 50,
    isFeatured: false
  },
  {
    title: "OpenAI Chatbot",
    techStack: "PyQt5, Python, OpenAI API",
    role: "Personal",
    objective: "데스크톱 환경에서의 LLM 기반 멀티모달 챗봇 어플리케이션 제작",
    content: "OpenAI 기반 멀티모달 기능 통합 및 페르소나 챗봇 구축",
    troubleshooting: "GUI 응답 지연 현상 발생",
    solution: "PyQt5의 QThread 비동기 작업 처리로 해결",
    achievements: "웹 브라우저 없이 데스크톱에서 동작하는 반응형 AI 비서 앱 완성",
    contribution: 100,
    isFeatured: false
  },
  {
    title: "SCHEDY",
    techStack: "Figma, MongoDB, React",
    role: "Team",
    objective: "MERN 스택을 활용한 애자일 프로젝트 일정 관리 도구 개발",
    content: "MERN 스택 기반 드래그 앤 드롭 칸반 보드 및 실시간 일정 관리 웹앱 개발",
    troubleshooting: "드래그 앤 드롭 시 복잡한 컴포넌트 간 상태 충돌",
    solution: "전역 상태 관리 및 최적화된 리렌더링 통제로 개선",
    achievements: "부드러운 UX를 갖춘 직관적이고 실용적인 협업 툴 완성",
    contribution: 50,
    isFeatured: false
  },
  {
    title: "Rita's Artwork",
    techStack: "HTML, CSS, JavaScript",
    role: "Personal",
    objective: "인터랙티브 웹 갤러리 플랫폼 설계 및 구현",
    content: "그림 전시를 위한 반응형 갤러리 레이아웃 및 이미지 랜더링 프론트엔드 페이지 제작",
    troubleshooting: "다양한 크기의 기기에서 이미지가 깨지는 현상",
    solution: "CSS Grid 및 반응형 미디어 쿼리(Media Query)로 해결",
    achievements: "모바일, 태블릿, PC 모든 환경에서 아름다운 뷰를 제공하는 갤러리 런칭",
    contribution: 100,
    isFeatured: false
  },
  {
    title: "Random nail",
    techStack: "HTML, CSS, JavaScript, Kakao API",
    role: "Personal",
    objective: "랜덤 네일아트 디자인 추천 및 외부 SNS 연동 서비스 개발",
    content: "JavaScript 기반 랜덤 추천 알고리즘 구현 및 카카오톡 공유 API 연동 서비스 개발",
    troubleshooting: "외부 API(Kakao API) 연동 시 CORS 및 인증 에러",
    solution: "공식 문서 기반 Token 설정으로 해결",
    achievements: "빠르고 가벼운 랜딩 페이지 및 바이럴 공유가 가능한 기능 구현 완료",
    contribution: 100,
    isFeatured: false
  },
  {
    title: "GptNotebook",
    techStack: "HTML, CSS, JavaScript, Chrome Extension API",
    role: "Personal",
    objective: "ChatGPT 사용성 한계를 극복하는 브라우저 익스텐션 배포",
    content: "ChatGPT 사용자 편의성 향상을 위한 편집 및 내보내기 도구 'GPT NoteBook' 개발 및 크롬 웹 스토어 출시",
    troubleshooting: "DOM 구조 변경 시 익스텐션 동작 정지 현상",
    solution: "MutationObserver 적용으로 실시간 반영되게 해결",
    achievements: "실제 크롬 웹 스토어에 정식 배포되어 다운로드/설치 가능한 프로덕트 런칭",
    contribution: 100,
    isFeatured: false
  }
];

async function seed() {
  await prisma.project.deleteMany();
  for (const p of data) {
    await prisma.project.create({ data: p });
    console.log(`Created: ${p.title}`);
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
