import { motion } from "framer-motion";

export default function ProjectDetail({ project }) {
  return (
    <div className="space-y-8">
      {/* 프로젝트 상세 내용 플레이스홀더 */}
      <div className="text-center py-16 border-2 border-dashed border-white/20 rounded-xl">
        <div className="text-white/60 text-lg mb-4">
          📝 프로젝트 상세 내용이 들어갈 예정입니다
        </div>
        <div className="text-white/40 text-sm">
          개발 과정, 주요 기능, 트러블슈팅, 성과 등의 내용이
          <br />
          이곳에 추가될 예정입니다.
        </div>
      </div>

      {/* 기술 스택 */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">기술 스택</h3>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
