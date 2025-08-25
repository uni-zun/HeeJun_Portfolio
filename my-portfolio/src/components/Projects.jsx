import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useMemo, useCallback } from "react";
import {
  Award,
  Smartphone,
  Globe,
  Calendar,
  Users,
  Monitor,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [currentProject, setCurrentProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  // 양방향 스크롤 페이드/이동
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const sectionFade = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const sectionEnterY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [50, 0, 0, -40]
  );
const projects = useMemo(
  () => [
    {
      id: 0,
      title: "WAA Player",
      subtitle: "디지털 사이니지 CMS",
      period: "2025.05",
      result: "팀 프로젝트",
      techStack: [
        "React.js",
        "TypeScript",
        "Electron",
        "Tailwind CSS",
        "Zustand",
      ],
      image: "/images/waa-player.gif",
      icon: Monitor,
      hasAward: true,
      teamSize: "6명",
      duration: "6주",
      detail: {
        goals: [
          "DRM 기반 암호화 영상을 네트워크 없이 안전하게 재생",
          "스케줄 기반 자동 재생과 심리스(Seamless) 전환 제공",
        ],
        background: [
          "고가 B2B 미디어 아트 콘텐츠 유출 방지 필요",
          "라이선스/키파일 기반 접근 제어가 가능한 오프라인 DRM 환경 요구",
        ],
        features: [
          "DRM 암호화 영상 재생",
          "일/주/월 스케줄 뷰 및 자동 재생",
          "심리스 전환",
          "키파일 기반 로그인",
          "기능별 온보딩 튜토리얼",
        ],
        role: {
          title: "프론트엔드 (스케줄러 UI/튜토리얼 단독 구현)",
          contributions: [
            "일/주/월 스케줄 UI 설계 및 반복/필터 로직 구현",
            "시간 선택·반복 설정·영상 목록 관리 UX 설계",
            "Shepherd.js 기반 기능별 투어(튜토리얼) 전체 구성",
            "TimePicker/모달 등 오버레이 UI와의 충돌(z-index/타이밍) 해결",
          ],
        },
        stackReasons: [
          { name: "React & TypeScript", reason: "모듈화와 타입 안정성 확보" },
          { name: "TailwindCSS & shadcn/ui", reason: "빠르고 일관된 고급 UI" },
          { name: "Shepherd.js", reason: "단계적·분기형 사용자 가이드에 적합" },
          { name: "zustand", reason: "전역 투어/스케줄 상태를 간결하게 관리" },
          { name: "Electron", reason: "로컬 데스크탑 앱 배포/보안 적합" },
        ],
        problems: [
          {
            title:
              "Shepherd.js와 TimePicker/모달 등 오버레이 UI가 겹치거나 닫히지 않는 현상",
            solution:
              "step의 beforeShowPromise로 UI 선조정, 오버레이 mount 타이밍과 z-index 제어, 다이얼로그 열린 상태 보호 로직 추가",
          },
        ],
        outcomes: [
          "데모에서 스케줄 기반 자동 재생의 안정성과 편의성 검증",
          "기능별 인터랙티브 튜토리얼로 초기 진입 장벽 대폭 완화",
        ],
        retrospective: {
          regrets: [
            "가이드·오버레이 동기화와 충돌 처리의 초기 난이도",
            "전역 스케줄 상태 구조화에 더 많은 시간 투입 필요",
          ],
          improvements: [
            "튜토리얼 훅에서 UI 의존성/예외 자동 정리",
            "컴포넌트 우선순위·조건부 렌더링 규칙 명확화",
          ],
          learnings: [
            "Shepherd.js 고급 이벤트/흐름 제어 실전 적용",
            "레이어링 설계로 z-index 충돌 예방",
          ],
          insights: [
            "잘 설계된 튜토리얼은 제품 완성도를 크게 끌어올림",
            "기술 완성도와 함께 사용자 흐름 설계가 핵심",
          ],
        },
      },
    },
    {
      id: 1,
      title: "윤종원",
      subtitle: "SSAFY 교육생을 위한 점심 메뉴 조회 웹 서비스",
      period: "2025.03",
      result: "개인 프로젝트",
      techStack: [
        "JavaScript",
        "React.js",
        "Framer Motion",
        "Style-components",
      ],
      image: "/images/yoonjongwon.png",
      icon: Globe,
      hasAward: false,
      teamSize: "2명",
      duration: "1주",
      detail: {
        goals: ["PC에서 SSAFY 점심 메뉴를 빠르게 확인"],
        background: [
          "모바일 앱에서 확인 과정이 번거롭고, 노트북 중심 사용 환경",
          "초기엔 메신저 수기 공유 → 체계적인 서비스 필요",
        ],
        features: [
          "오늘/내일 메뉴 프리뷰",
          "주간/월간 식단",
          "특식 데이 하이라이트",
          "OCR(Tesseract.js) 자동 인식/업로드",
          "관리자 등록·수정·평가",
        ],
        role: {
          title: "프론트엔드 (2인 팀)",
          contributions: [
            "모카무스 테마 UI/UX, 한눈에 보이는 인터페이스 설계",
            "LocalStorage 캐싱/로딩 상태로 UX·성능 개선",
          ],
        },
        stackReasons: [
          { name: "React", reason: "컴포넌트 기반 재사용·유지보수 용이" },
          {
            name: "styled-components",
            reason: "컴포넌트 단위 스타일 캡슐화·동적 스타일",
          },
          { name: "Framer Motion", reason: "부드러운 인터랙션" },
          { name: "Tesseract.js", reason: "브라우저 OCR로 서버 부하 감소" },
          { name: "LocalStorage", reason: "빈번하지 않은 데이터 캐싱" },
        ],
        problems: [
          {
            title: "OCR 인식률과 텍스트 구조화",
            solution:
              "정규식 기반 텍스트 정제/분류 로직으로 식당명·메뉴 자동 구분",
          },
          {
            title: "자주 변하지 않는 메뉴의 반복 로딩",
            solution: "날짜별 LocalStorage 캐시와 수동 초기화(새로고침) 제공",
          },
        ],
        metrics: [
          { label: "일평균 사용자", value: "약 80명", note: "SSAFY 교육생" },
        ],
        outcomes: [
          "메뉴 접근성 향상으로 시간 절약·편의성 증대",
          "기획→개발→배포 전 과정 실무 경험",
        ],
        retrospective: {
          regrets: [
            "이미지 품질에 따른 OCR 편차",
            "초기 기획 단계에서 사용자 피드백 수집 부족",
          ],
          improvements: [
            "딥러닝 OCR 도입 검토",
            "피드백 수집 루프 및 추천 실험",
          ],
          learnings: [
            "브라우저 OCR 활용과 캐싱 전략",
            "실사용자 서비스 운영 경험",
          ],
          insights: [
            "작은 문제라도 실수요 해결이 핵심 가치",
            "UX 디테일이 만족도에 큰 영향",
          ],
        },
      },
    },
    {
      id: 2,
      title: "네잎클로버",
      subtitle:
        "현지인 리뷰로 맛집 추천부터 일정·정산까지 지원하는 통합 여행 서비스",
      period: "2025.04",
      result: "팀 프로젝트",
      techStack: ["Flutter", "Dart", "Kotlin", "Provider"],
      image: "/images/fourleaf-clover.png",
      icon: Smartphone,
      hasAward: false,
      teamSize: "6명",
      duration: "7주",
      detail: {
        goals: ["현지인 리뷰 기반 추천과 일정·정산까지 원스톱 제공"],
        background: ["검색 피로·광고성 리뷰·정산 번거로움 해소 필요"],
        features: [
          "현지인 인증·등급 시스템, 위치 기반 매칭",
          "빅데이터/AI 태그 추출 추천",
          "그룹 여행 계획/정산, 소비 패턴 분석",
        ],
        role: {
          title: "Flutter 크로스플랫폼 앱 프론트엔드",
          contributions: [
            "메인/그룹/여행/정산 UI 구현",
            "카카오맵 네이티브 뷰 통합(Platform Channel)",
            "Provider 상태관리 설계, 카카오 공유 API 연동",
          ],
        },
        stackReasons: [
          { name: "Flutter", reason: "단일 코드베이스로 개발 속도↑" },
          { name: "Provider", reason: "복잡도 대비 단순한 상태 관리" },
          {
            name: "Kakao Map SDK(네이티브)",
            reason: "국내 친숙 UX·고품질 지도",
          },
          {
            name: "Platform Channel",
            reason: "네이티브와 양방향 통신 필요",
          },
        ],
        problems: [
          {
            title: "네이티브 이벤트(마커 클릭 등)를 Flutter로 안정 전달/식별",
            solution:
              "마커/라벨에 고유 ID 부여 후 Platform Channel로 전달, 중앙 Provider에서 참조/처리, 초기화 타이밍 조정",
          },
        ],
        outcomes: [
          "복잡한 일정·정산을 단순한 UX로 통합",
          "위치 기반 정보 제공으로 참여도 증가",
        ],
        retrospective: {
          regrets: [
            "일부 복잡 애니메이션에서 성능 고려 부족",
            "오프라인 모드·캐싱 전략 미흡",
          ],
          improvements: [
            "복잡 컴포넌트 분리·재사용 구조 개선",
            "네트워크 최적화 및 로컬 캐싱 도입",
          ],
          learnings: [
            "네이티브-플러터 통신/맵 연동 노하우",
            "피드백 기반 점진적 UX 개선",
          ],
          insights: [
            "초기 설계/구조화의 장기 유지보수 효과",
            "하이브리드 접근의 효율성",
          ],
        },
      },
    },
    {
      id: 3,
      title: "GAME PLANET",
      subtitle: "웹 기반 보드게임 플랫폼 서비스",
      period: "2025.02",
      result: "팀 프로젝트",
      techStack: ["React.js", "JavaScript", "Redux", "Tailwind CSS"],
      image: "/images/game-planet.png",
      icon: Globe,
      hasAward: true,
      teamSize: "6명",
      duration: "7주",
      detail: {
        goals: ["시간/공간 제약 없이 다수가 커스텀 게임 플레이"],
        background: ["오프라인 인원/장소 제약, 반복 플레이의 피로감 해결"],
        features: [
          "부루마불/캐치마인드",
          "커스텀 보드판 제작·승인",
          "실시간 화상(WebRTC/OpenVidu)·채팅 및 AI 욕설 감지",
          "관리자: 유저/커스텀/신고 관리",
        ],
        role: {
          title: "프론트엔드 (커스터마이징 & 관리자 UI/로직)",
          contributions: [
            "보드판 제작·선택 흐름 설계",
            "관리자 페이지(회원/커스텀/신고/욕설 관리) 구현",
          ],
        },
        stackReasons: [
          { name: "React", reason: "유지보수/재사용 용이" },
          { name: "Redux", reason: "복잡한 게임/유저 전역 상태 관리" },
          { name: "TailwindCSS", reason: "빠른 반응형 스타일링" },
          { name: "Canvas API", reason: "실시간 드로잉 공유에 적합" },
          { name: "Socket.io", reason: "실시간 통신" },
          { name: "WebRTC/OpenVidu", reason: "화상 채팅" },
        ],
        problems: [
          {
            title:
              "WebSocket 실시간 플레이와 Redux 상태관리를 동시에 안정화하는 데 실패",
            solution:
              "완성 우선순위 전환: 팀 병목 파트를 맡아 마무리하며 전체 완성도 확보(협업 관점의 선택과 집중)",
          },
        ],
        outcomes: [
          "커스터마이징 + 실시간 커뮤니케이션을 갖춘 플랫폼 구현",
          "데모에서 다수 사용자와 원활한 플레이 검증",
        ],
        retrospective: {
          regrets: [
            "담당 게임 기능을 끝까지 완성하지 못한 점",
            "TypeScript 미도입으로 타입 안정성 아쉬움",
          ],
          improvements: [
            "사전 학습/설계 확대, 유지보수 관점의 기술 선택",
            "실시간 통신/구조 관련 사전 실험 강화",
          ],
          learnings: ["실시간 통신·관리자 설계·커스터마이징 경험 축적"],
          insights: [
            "속도보다 방향과 설계가 중요",
            "팀을 위한 선택과 기록의 가치",
          ],
        },
      },
    },
  ],
  []
);

  const nextProject = useCallback(() => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevProject = useCallback(() => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const goToProject = useCallback((index) => {
    setCurrentProject(index);
  }, []);

  const openModal = useCallback((project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  }, []);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
      },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 40, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      },
    }),
    []
  );

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.3,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.3,
      },
    }),
  };

  const project = projects[currentProject];
  const IconComponent = project.icon;

  return (
    <>
      <motion.section
        ref={ref}
        className="min-h-screen bg-white py-32 relative overflow-hidden"
        style={{ opacity: sectionFade, y: sectionEnterY }}
      >
        {/* ===== 상단 경계: 은은한 그라데이션 섀도우 ===== */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-6 h-12 bg-gradient-to-b from-black/[0.06] to-transparent"
          style={{ opacity: sectionFade }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* 헤더 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-20"
          >
            <motion.h2
              variants={cardVariants}
              className="text-6xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight"
            >
              Projects
            </motion.h2>
            <motion.div
              variants={cardVariants}
              className="w-16 h-px bg-gray-900 mx-auto mb-8"
            />
          </motion.div>

          {/* 캐러셀 컨테이너 */}
          <div className="relative max-w-6xl mx-auto">
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full hover:bg-white/20 transition"
              disabled={projects.length <= 1}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full hover:bg-white/20 transition"
              disabled={projects.length <= 1}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "16/10" }}
            >
              <AnimatePresence mode="wait" custom={1}>
                <motion.div
                  key={currentProject}
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full"
                >
                  <motion.div
                    className="group cursor-pointer w-full h-full"
                    onClick={() => openModal(project)}
                    whileHover={{
                      scale: 1.02,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="relative w-full h-full bg-cover bg-center bg-no-repeat rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                      style={{ backgroundImage: `url(${project.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-all duration-300" />

                      {project.hasAward && (
                        <motion.div
                          className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-gray-500/90 backdrop-blur-sm rounded-full shadow-lg"
                          initial={{ rotate: -10, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                        >
                          <Award className="w-5 h-5 text-white" />
                          <span className="text-sm font-bold text-white">
                            우수상
                          </span>
                        </motion.div>
                      )}

                      <div className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                        <IconComponent className="w-8 h-8 text-white/90" />
                      </div>

                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                        <span className="text-white/90 text-sm font-medium">
                          {currentProject + 1} / {projects.length}
                        </span>
                      </div>

                      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                        <motion.div
                          className="mb-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                          initial={false}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-base font-medium text-white/90 bg-white/25 backdrop-blur-sm px-4 py-2 rounded-full">
                              {project.period}
                            </span>
                            <span className="text-base font-medium text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                              {project.result}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-3 mb-4">
                            {project.techStack.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-2 bg-white/25 backdrop-blur-sm rounded-lg text-sm text-white/90 border border-white/20"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.techStack.length > 4 && (
                              <span className="px-3 py-2 bg-white/25 backdrop-blur-sm rounded-lg text-sm text-white/90 border border-white/20">
                                +{project.techStack.length - 4}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-6 text-white/80 text-base">
                            <div className="flex items-center gap-2">
                              <Users className="w-5 h-5" />
                              <span>{project.teamSize}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-5 h-5" />
                              <span>{project.duration}</span>
                            </div>
                          </div>
                        </motion.div>

                        <div>
                          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 group-hover:text-white/95 transition-colors drop-shadow-lg">
                            {project.title}
                          </h3>

                          <p className="text-white/90 font-light leading-relaxed text-lg md:text-xl drop-shadow-md line-clamp-2 group-hover:line-clamp-none transition-all duration-300 mb-4">
                            {project.subtitle}
                          </p>

                          <div className="text-white/80 font-medium text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            자세히 보기 →
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black items-center justify-center hidden">
                        <IconComponent className="w-24 h-24 text-white/40" />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center mt-8 gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProject
                      ? "bg-gray-900 scale-125"
                      : "bg-gray-300 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={closeModal}
      />
    </>
  );
}
