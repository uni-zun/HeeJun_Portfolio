import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import {
  X,
  Calendar,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ProjectModal({ project, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project?.id]);

  const modalVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      },
      exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
    }),
    []
  );

  const backdropVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    }),
    []
  );

  if (!isOpen || !project) return null;

  const galleryImages = (project.detail?.gallery || []).filter(Boolean);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const IconComponent = project.icon;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-[95vw] h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors z-50 shadow-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex h-full">
            {/* 왼쪽: 갤러리 영역 (70%) */}
            <div className="w-[70%] bg-gray-50 relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={galleryImages[currentImageIndex]}
                  alt={`${project.title} - ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain p-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* 이미지 카운터 */}
              <div className="absolute top-6 left-6 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>

              {/* 이미지 네비게이션 */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-all shadow-xl z-20"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-all shadow-xl z-20"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>

                  {/* 이미지 인디케이터 */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/75 w-2"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 오른쪽: 정보 영역 (30%) */}
            <div className="w-[30%] bg-white overflow-y-auto">
              <div className="p-8">
                {/* 헤더 */}
                <div className="mb-6">
                  {/* 아이콘 */}
                  <div className="mb-4">
                    <div className="p-4 bg-gray-100 rounded-xl inline-block">
                      <IconComponent className="w-10 h-10 text-gray-700" />
                    </div>
                  </div>

                  {/* 뱃지들 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.projectType === "SSAFY"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-600 text-white"
                      }`}
                    >
                      {project.projectType === "SSAFY" ? "SSAFY" : "SIDE"}
                    </div>
                    {project.hasAward && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                        <Award className="w-3 h-3 text-gray-700" />
                        <span className="text-xs font-medium text-gray-700">
                          우수상
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 제목 */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {project.subtitle}
                  </p>

                  {/* 메타 정보 */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{project.teamSize}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {project.duration}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {project.result}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-200 my-6" />

                {/* 담당 역할 */}
                {project.detail?.role && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <div className="w-1 h-4 bg-gray-900 rounded-full" />
                      담당 역할
                    </h3>
                    <p className="text-xs text-gray-600 font-medium mb-2">
                      {project.detail.role.title}
                    </p>
                    <div className="space-y-1">
                      {project.detail.role.contributions
                        ?.slice(0, 3)
                        .map((contribution, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-xs text-gray-600"
                          >
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span className="leading-relaxed">
                              {contribution}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div className="h-px bg-gray-200 my-6" />

                {/* 주요 성과 */}
                {project.detail?.outcomes && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <div className="w-1 h-4 bg-gray-900 rounded-full" />
                      주요 성과
                    </h3>
                    <div className="space-y-1">
                      {project.detail.outcomes
                        .slice(0, 3)
                        .map((outcome, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-xs text-gray-600"
                          >
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span className="font-medium leading-relaxed">
                              {outcome}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div className="h-px bg-gray-200 my-6" />

                {/* 기술 스택 */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-1 h-4 bg-gray-900 rounded-full" />
                    기술 스택
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-gray-200 my-6" />

                {/* 기술적 도전 */}
                {project.detail?.problems &&
                  project.detail.problems.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <div className="w-1 h-4 bg-gray-900 rounded-full" />
                        기술적 도전
                      </h3>
                      <div className="space-y-3">
                        {project.detail.problems
                          .slice(0, 2)
                          .map((problem, index) => (
                            <div
                              key={index}
                              className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="font-semibold text-gray-900 text-xs mb-1">
                                {problem.title}
                              </div>
                              <div className="text-gray-600 text-xs leading-relaxed">
                                {problem.solution}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
