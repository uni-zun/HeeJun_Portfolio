import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { X, Calendar, Users, Award } from "lucide-react";
import ProjectDetail from "./ProjectDetail";

export default function ProjectModal({ project, isOpen, onClose }) {
  const modalVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: 0.8,
        y: 50,
      },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        y: 50,
        transition: {
          duration: 0.2,
        },
      },
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

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* 배경 오버레이 */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* 모달 콘텐츠 */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl border border-white/10"
        >
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="p-8 md:p-12">
            {/* 헤더 */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <project.icon className="w-10 h-10 text-white/70" />
                {project.hasAward && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-500/90 backdrop-blur-sm rounded-full">
                    <Award className="w-5 h-5 text-white" />
                    <span className="text-sm font-bold text-white">우수상</span>
                  </div>
                )}
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {project.title}
              </h2>
              <p className="text-xl text-white/80 font-light mb-6">
                {project.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{project.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{project.teamSize}</span>
                </div>
                <div className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {project.duration}
                </div>
                <div className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {project.result}
                </div>
              </div>
            </div>

            {/* 프로젝트 상세 내용 */}
            <ProjectDetail project={project} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
