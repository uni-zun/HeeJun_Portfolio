import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useMemo, useCallback } from "react";
import { Award, Smartphone, Globe, Calendar, Users, Monitor } from "lucide-react";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
          "Justand",
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

  const openModal = useCallback((project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  }, []);

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
            <motion.p
              variants={cardVariants}
              className="text-xl text-gray-600 font-light max-w-2xl mx-auto"
            >
              카드를 클릭하여 프로젝트의 상세 정보를 확인해보세요
            </motion.p>
          </motion.div>

          {/* 프로젝트 카드 그리드 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {projects.map((project, index) => {
              const IconComponent = project.icon;

              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  className="group cursor-pointer"
                  onClick={() => openModal(project)}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="relative rounded-2xl shadow-xl border border-white/20 overflow-hidden h-80 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${project.image})`,
                    }}
                  >
                    {/* 오버레이 그라데이션 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 group-hover:via-black/40 transition-all duration-300" />

                    {/* 우수상 뱃지 */}
                    {project.hasAward && (
                      <motion.div
                        className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-gray-500/90 backdrop-blur-sm rounded-full shadow-lg"
                        initial={{ rotate: -10, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{
                          delay: 0.5 + index * 0.1,
                          type: "spring",
                        }}
                      >
                        <Award className="w-4 h-4 text-white" />
                        <span className="text-xs font-bold text-white">
                          우수상
                        </span>
                      </motion.div>
                    )}

                    {/* 프로젝트 아이콘 */}
                    <div className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <IconComponent className="w-6 h-6 text-white/90" />
                    </div>

                    {/* 메인 콘텐츠 */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-6">
                      {/* 상단 정보 (호버 시 표시) */}
                      <motion.div
                        className="mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                        initial={false}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm font-medium text-white/90 bg-white/25 backdrop-blur-sm px-3 py-1 rounded-full">
                            {project.period}
                          </span>
                          <span className="text-sm font-medium text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            {project.result}
                          </span>
                        </div>

                        {/* 기술스택 미리보기 */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-white/25 backdrop-blur-sm rounded text-xs text-white/90 border border-white/20"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="px-2 py-1 bg-white/25 backdrop-blur-sm rounded text-xs text-white/90 border border-white/20">
                              +{project.techStack.length - 3}
                            </span>
                          )}
                        </div>

                        {/* 팀 정보 */}
                        <div className="flex items-center gap-4 text-white/80 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{project.teamSize}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{project.duration}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* 하단 제목 (항상 표시) */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-white/95 transition-colors drop-shadow-lg">
                          {project.title}
                        </h3>

                        <p className="text-white/90 font-light leading-relaxed text-sm md:text-base drop-shadow-md line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                          {project.subtitle}
                        </p>

                        {/* 자세히 보기 표시 */}
                        <div className="text-white/80 font-medium text-sm mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
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
              );
            })}
          </motion.div>
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
