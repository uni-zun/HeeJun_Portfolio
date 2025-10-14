import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import {
  Award,
  Smartphone,
  Globe,
  Calendar,
  Users,
  Monitor,
  ChevronDown,
} from "lucide-react";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const containerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);

  const projects = useMemo(
    () => [
      {
        id: 0,
        title: "WAA Player",
        subtitle: "디지털 사이니지 CMS",
        period: "2025.05",
        result: "팀 프로젝트",
        projectType: "SSAFY",
        techStack: [
          "React.js",
          "TypeScript",
          "Electron",
          "Tailwind CSS",
          "Zustand",
          "Shepherd.js",
        ],
        image: "/images/waa-player.gif",
        icon: Monitor,
        hasAward: true,
        teamSize: "6명",
        duration: "6주",
        detail: {
          goals: [
            "네트워크 없이도 암호화된 미디어 아트 콘텐츠를 안전하게 재생할 수 있는 로컬 기반 데스크탑 영상 플레이어 개발",
          ],
          background: [
            "고가의 B2B 영상 콘텐츠 유출을 막기 위한 오프라인 DRM 환경 및 라이선스 기반 콘텐츠 관리 필요성",
          ],
          role: {
            title:
              "프론트엔드 개발자 (스케줄러 UI 전반 & 튜토리얼 시스템 단독 구현)",
            contributions: [
              "복합 상태 관리 시스템: Zustand 기반 일/주/월 뷰별 독립적 상태 관리",
              "클라이언트 사이드 캐싱 시스템: 10분 TTL + 유효성 검사로 성능 최적화",
              "컨텍스트 인식 튜토리얼: 사용자 상황에 맞는 동적 가이드 시스템",
            ],
          },
          outcomes: [
            "고성능 캐싱으로 API 호출 최소화 및 반응속도 대폭 개선",
            "B2B 환경 최적화: 자동 재생 스케줄러로 무인 운영 환경 지원",
            "스케줄러 시스템 100% 단독 구현",
          ],
          problems: [
            {
              title: "복잡한 상태 동기화 이슈",
              solution: "중앙집중식 Zustand 스토어로 데이터 정합성 보장",
            },
            {
              title: "Shepherd.js 오버레이 UI 충돌",
              solution: "z-index 레이어링과 mount 타이밍 세밀 제어",
            },
          ],
          gallery: [
            "/images/waa-player-1.png",
            "/images/waa-player-2.png",
            "/images/waa-player-3.png",
            "/images/waa-player-4.png",
            "/images/waa-player-5.png",
            "/images/waa-player-6.png",
            "/images/waa-player-7.png",
          ],
        },
      },
      {
        id: 1,
        title: "윤종원",
        subtitle: "SSAFY 교육생을 위한 점심 메뉴 조회 웹 서비스",
        period: "2025.03",
        result: "개인 프로젝트",
        projectType: "SIDE",
        techStack: [
          "JavaScript",
          "React.js",
          "Framer Motion",
          "styled-components",
          "Tesseract.js",
        ],
        image: "/images/yoonjongwon.png",
        icon: Globe,
        hasAward: false,
        teamSize: "2명",
        duration: "1주",
        detail: {
          goals: [
            "SSAFY 교육생들이 점심 메뉴를 PC에서 편리하게 확인할 수 있는 웹 서비스 개발",
          ],
          background: [
            "기존 모바일 앱에서는 3단계를 거쳐야 했으며, 노트북 중심 환경에서 불편함 초래",
          ],
          role: {
            title: "프론트엔드 개발 담당 (2인 팀)",
            contributions: [
              "기존 3단계 클릭을 1단계로 단축",
              "6시간 TTL 캐싱으로 성능 최적화",
              "OCR 자동 인식 시스템 구현",
            ],
          },
          outcomes: [
            "5월 최고 913명 방문",
            "OCR 구조화 성공률 90% 이상",
            "사용자 만족도 향상",
          ],
          problems: [
            {
              title: "OCR 인식 정확도 이슈",
              solution: "정규식 기반 한글 메뉴명 선별 추출",
            },
          ],
          gallery: [
            "/images/yoonjongwon-1.png",
            "/images/yoonjongwon-2.png",
            "/images/yoonjongwon-1.gif",
          ],
        },
      },
      {
        id: 2,
        title: "네잎클로버",
        subtitle:
          "현지인 리뷰로 맛집 추천부터 일정·정산까지 지원하는 통합 여행 서비스",
        period: "2025.04",
        result: "팀 프로젝트",
        projectType: "SSAFY",
        techStack: [
          "Flutter",
          "Dart",
          "Kotlin",
          "Provider",
          "Geolocator",
          "Kakao SDK",
        ],
        image: "/images/fourleaf-clover.png",
        icon: Smartphone,
        hasAward: false,
        teamSize: "6명",
        duration: "7주",
        detail: {
          goals: [
            "현지인 리뷰 기반 맞춤 맛집 추천",
            "여행 계획부터 정산까지 원스톱 제공",
          ],
          background: ["광고성 리뷰 신뢰성 문제와 여행 정산 번거로움 해결"],
          role: {
            title: "Flutter 크로스플랫폼 앱 프론트엔드",
            contributions: [
              "Platform Channel 기반 카카오맵 SDK 통합",
              "Provider 패턴 기반 상태 관리 (8개 도메인)",
              "위치 기반 서비스 개발",
            ],
          },
          outcomes: [
            "Flutter-Android 네이티브 통합 성공",
            "전체 앱 핵심 기능 60% 담당",
            "확장 가능한 상태 관리 시스템 구축",
          ],
          problems: [
            {
              title: "Platform Channel 타입 안전성 문제",
              solution: "싱글톤 패턴과 HashMap으로 메모리 누수 방지",
            },
          ],
          gallery: [
            "/images/fourleaf-clover-1.png",
            "/images/fourleaf-clover-2.png",
            "/images/fourleaf-clover-3.png",
            "/images/fourleaf-clover-4.png",
            "/images/fourleaf-clover-5.png",
            "/images/fourleaf-clover-6.png",
            "/images/fourleaf-clover-7.png",
            "/images/fourleaf-clover-8.png",
            "/images/fourleaf-clover-9.png",
          ],
        },
      },
      {
        id: 3,
        title: "GAME PLANET",
        subtitle: "웹 기반 보드게임 플랫폼 서비스",
        period: "2025.02",
        result: "팀 프로젝트",
        projectType: "SSAFY",
        techStack: [
          "React.js",
          "JavaScript",
          "Redux",
          "Tailwind CSS",
          "Canvas API",
        ],
        image: "/images/game-planet.png",
        icon: Globe,
        hasAward: true,
        teamSize: "6명",
        duration: "7주",
        detail: {
          goals: ["시간과 공간 제약 없이 커스텀 게임을 즐길 수 있는 환경 제공"],
          background: ["오프라인 보드게임의 인원/장소 제약 해결"],
          role: {
            title: "프론트엔드 개발자",
            contributions: [
              "커스텀 보드판 제작 도구 UI/UX 구현",
              "관리자 대시보드 전체 페이지 구현",
              "Canvas API 기반 26개 타일 편집 시스템",
            ],
          },
          outcomes: [
            "커스터마이징 영역 100% 담당",
            "6명 동시 접속 원활한 플레이 시연 성공",
            "26개 타일 선택적 편집 가능",
          ],
          problems: [
            {
              title: "Canvas 이미지 로딩 동기화 이슈",
              solution: "비동기 처리 로직과 좌표 변환 시스템 구현",
            },
          ],
          gallery: [
            "/images/game-planet-1.png",
            "/images/game-planet-2.png",
            "/images/game-planet-3.png",
            "/images/game-planet-4.png",
          ],
        },
      },
    ],
    []
  );

  const openModal = useCallback((project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const sections =
        containerRef.current.querySelectorAll(".project-section");
      const scrollY = window.scrollY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = scrollY + rect.top;
        const sectionHeight = rect.height;

        if (
          scrollY >= sectionTop - window.innerHeight / 2 &&
          scrollY < sectionTop + sectionHeight - window.innerHeight / 2
        ) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div ref={containerRef} className="relative">
        <div className="fixed right-8 bottom-20 z-50 flex flex-col gap-3">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const section = document.getElementById(`project-${index}`);
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index
                  ? "bg-gray-900 scale-150"
                  : "bg-gray-300 hover:bg-gray-500"
              }`}
              aria-label={`Go to ${projects[index].title}`}
            />
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="min-h-screen flex items-center justify-center bg-white snap-start"
        >
          <div className="text-center px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-8xl font-light text-gray-900 mb-8 tracking-tight"
            >
              Projects
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-24 h-px bg-gray-900 mx-auto mb-12"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-600 mb-16"
            >
              스크롤하여 프로젝트를 살펴보세요
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
              }}
            >
              <ChevronDown className="w-8 h-8 text-gray-400 mx-auto" />
            </motion.div>
          </div>
        </motion.section>

        {projects.map((project, index) => {
          const IconComponent = project.icon;
          const isEven = index % 2 === 0;

          return (
            <section
              key={project.id}
              id={`project-${index}`}
              className={`project-section min-h-screen snap-start relative overflow-hidden ${
                index === 0
                  ? "bg-white"
                  : index === 1
                  ? "bg-gray-50"
                  : index === 2
                  ? "bg-gray-200"
                  : "bg-gray-900"
              }`}
            >
              <div className="relative z-10 min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-6 py-20 w-full">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      isEven ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`${isEven ? "" : "lg:order-2"}`}
                    >
                      <div
                        className="relative group cursor-pointer"
                        onClick={() => openModal(project)}
                      >
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="absolute -top-6 -right-6 w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 100 : -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                      className={`${isEven ? "" : "lg:order-1"}`}
                    >
                      <div className="flex items-center gap-4 mb-6 flex-wrap">
                        <div
                          className={`p-4 backdrop-blur-sm rounded-2xl shadow-lg ${
                            index === 3
                              ? "bg-white/10 border border-white/20"
                              : "bg-white/80"
                          }`}
                        >
                          <IconComponent
                            className={`w-10 h-10 ${
                              index === 3 ? "text-white" : "text-gray-700"
                            }`}
                          />
                        </div>

                        <div
                          className={`px-4 py-2 rounded-full shadow-lg font-medium text-sm border ${
                            index === 3
                              ? project.projectType === "SSAFY"
                                ? "bg-white/10 text-white border-white/30"
                                : "bg-white/20 text-white border-white/40"
                              : project.projectType === "SSAFY"
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-gray-600 text-white border-gray-600"
                          }`}
                        >
                          {project.projectType === "SSAFY" ? "SSAFY" : "SIDE"}
                        </div>

                        {project.hasAward && (
                          <div
                            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg border ${
                              index === 3
                                ? "bg-white/10 text-white border-white/30"
                                : "bg-gray-100 text-gray-900 border-gray-200"
                            }`}
                          >
                            <Award className="w-4 h-4" />
                            <span className="text-sm font-medium">우수상</span>
                          </div>
                        )}
                      </div>

                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`text-5xl md:text-6xl font-bold mb-4 ${
                          index === 3 ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {project.title}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`text-xl mb-8 leading-relaxed ${
                          index === 3 ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {project.subtitle}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap gap-3 mb-8"
                      >
                        {project.techStack?.map((tech, idx) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + idx * 0.05 }}
                            className={`px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow ${
                              index === 3
                                ? "bg-white/20 backdrop-blur-sm text-white border border-white/30"
                                : "bg-white/80 backdrop-blur-sm text-gray-700"
                            }`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className={`flex flex-wrap items-center gap-6 mb-8 ${
                          index === 3 ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          <span className="font-medium">{project.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          <span className="font-medium">
                            {project.teamSize}
                          </span>
                        </div>
                        <div
                          className={`px-4 py-1 rounded-full text-sm font-medium shadow-md ${
                            index === 3
                              ? "bg-white/20 backdrop-blur-sm text-white border border-white/30"
                              : "bg-white/80 backdrop-blur-sm"
                          }`}
                        >
                          {project.duration}
                        </div>
                        <div
                          className={`px-4 py-1 rounded-full text-sm font-medium shadow-md ${
                            index === 3
                              ? "bg-white/20 backdrop-blur-sm text-white border border-white/30"
                              : "bg-white/80 backdrop-blur-sm"
                          }`}
                        >
                          {project.result}
                        </div>
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        onClick={() => openModal(project)}
                        className={`px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-xl ${
                          index === 3
                            ? "bg-white text-gray-900 hover:bg-gray-100"
                            : "bg-gray-900 text-white hover:bg-gray-800"
                        }`}
                      >
                        프로젝트 상세보기 →
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={closeModal}
      />
    </>
  );
}
