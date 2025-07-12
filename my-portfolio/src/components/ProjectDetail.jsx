import { motion } from "framer-motion";

export default function ProjectDetail({ project }) {
  return (
    <div className="space-y-8">
      {/* 프로젝트 개요 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">프로젝트 개요</h3>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <p className="text-gray-700 leading-relaxed mb-4">
            {project.subtitle}
          </p>
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <div className="text-gray-400 text-3xl mb-3">📝</div>
            <div className="text-gray-600 font-medium mb-2">
              상세 내용 준비 중
            </div>
            <div className="text-gray-500 text-sm">
              프로젝트의 기획 배경, 개발 과정, 주요 기능 등의
              <br />
              상세한 내용이 곧 추가될 예정입니다.
            </div>
          </div>
        </div>
      </motion.div>

      {/* 기술 스택 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">기술 스택</h3>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-800 transition-colors cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 개발 기간 & 팀 구성 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            프로젝트 정보
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">개발 기간</span>
              <span className="font-medium text-gray-900">
                {project.duration}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">팀 구성</span>
              <span className="font-medium text-gray-900">
                {project.teamSize}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">프로젝트 유형</span>
              <span className="font-medium text-gray-900">
                {project.result}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">개발 시기</span>
              <span className="font-medium text-gray-900">
                {project.period}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            주요 성과
          </h4>
          <div className="space-y-3">
            {project.hasAward && (
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>프로젝트 우수상 수상</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>성공적인 팀 프로젝트 완수</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>최신 기술 스택 활용</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>사용자 경험 중심 설계</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 추가 개발 예정 섹션들 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* 주요 기능 */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            주요 기능
          </h4>
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <div className="text-gray-400 text-2xl mb-2">🔧</div>
            <div className="text-gray-500 text-sm">
              구현한 주요 기능들의
              <br />
              상세 설명이 추가될 예정입니다
            </div>
          </div>
        </div>

        {/* 기술적 도전 */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            기술적 도전
          </h4>
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <div className="text-gray-400 text-2xl mb-2">⚡</div>
            <div className="text-gray-500 text-sm">
              개발 과정에서 해결한
              <br />
              기술적 문제들이 추가될 예정입니다
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
