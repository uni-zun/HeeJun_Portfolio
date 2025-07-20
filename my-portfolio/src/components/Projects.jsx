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
  const { scrollY } = useScroll();

  // 스크롤 기반 애니메이션
  const sectionFade = useTransform(scrollY, [1000, 1400], [0, 1]);
  const sectionEnterY = useTransform(scrollY, [1000, 1400], [50, 0]);

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
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    }),
    []
  );

  const cardVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      },
    }),
    []
  );

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
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
        style={{
          opacity: sectionFade,
          y: sectionEnterY,
        }}
      >
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
          <div className="relative max-w-4xl mx-auto">
            {/* 이전/다음 버튼 - 아이콘만 */}
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

            {/* 캐러셀 슬라이드 */}
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
                      style={{
                        backgroundImage: `url(${project.image})`,
                      }}
                    >
                      {/* 오버레이 그라데이션 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-all duration-300" />

                      {/* 우수상 뱃지 - 회색 유지 */}
                      {project.hasAward && (
                        <motion.div
                          className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-gray-500/90 backdrop-blur-sm rounded-full shadow-lg"
                          initial={{ rotate: -10, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{
                            delay: 0.3,
                            type: "spring",
                          }}
                        >
                          <Award className="w-5 h-5 text-white" />
                          <span className="text-sm font-bold text-white">
                            우수상
                          </span>
                        </motion.div>
                      )}

                      {/* 프로젝트 아이콘 */}
                      <div className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                        <IconComponent className="w-8 h-8 text-white/90" />
                      </div>

                      {/* 프로젝트 번호 */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                        <span className="text-white/90 text-sm font-medium">
                          {currentProject + 1} / {projects.length}
                        </span>
                      </div>

                      {/* 메인 콘텐츠 */}
                      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                        {/* 상단 정보 (호버 시 표시) */}
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

                          {/* 기술스택 미리보기 */}
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

                          {/* 팀 정보 */}
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

                        {/* 하단 제목 (항상 표시) */}
                        <div>
                          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 group-hover:text-white/95 transition-colors drop-shadow-lg">
                            {project.title}
                          </h3>

                          <p className="text-white/90 font-light leading-relaxed text-lg md:text-xl drop-shadow-md line-clamp-2 group-hover:line-clamp-none transition-all duration-300 mb-4">
                            {project.subtitle}
                          </p>

                          {/* 자세히 보기 표시 */}
                          <div className="text-white/80 font-medium text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            자세히 보기 →
                          </div>
                        </div>
                      </div>

                      {/* 이미지 로드 실패 시 폴백 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black items-center justify-center hidden">
                        <IconComponent className="w-24 h-24 text-white/40" />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 인디케이터 */}
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

      {/* 모달 */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={closeModal}
      />
    </>
  );
}
