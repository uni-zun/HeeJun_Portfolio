import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Layers, Settings, Award, GraduationCap } from "lucide-react";

export default function AboutMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // 상수 분리
  const MAIN_SKILLS = ["React.js", "JavaScript"];

  const ANIMATION_CONFIG = {
    spring: { stiffness: 400, damping: 25 },
    delays: { base: 0.3, category: 0.1, skill: 0.05 },
    duration: { timeline: 1, timelineDelay: 0.5 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  };

  const skillCategories = [
    {
      title: "Main Stack",
      icon: Code,
      skills: ["React.js", "JavaScript"],
    },
    {
      title: "Additional Stack",
      icon: Layers,
      skills: [
        "Tailwind CSS",
        "Framer Motion",
        "TypeScript",
        "Flutter",
        "Kotlin",
      ],
    },
    {
      title: "Tools",
      icon: Settings,
      skills: ["Git (GitHub/GitLab)", "VS Code", "Jira", "Notion", "Slack"],
    },
  ];

  const achievements = [
    {
      type: "award",
      period: "2025.05",
      title: "디지털 사이니지 CMS",
      subtitle: "WAA Player",
      result: "우수상",
      company: "삼성전자",
    },
    {
      type: "award",
      period: "2025.02",
      title: "웹 기반 보드게임 플랫폼",
      subtitle: "GAME PLANET",
      result: "우수상",
      company: "삼성전자",
    },
    {
      type: "education",
      period: "2024.07 ~ 2025.06",
      title: "삼성 청년 SW 아카데미",
      subtitle: "12기 교육과정",
      result: "진행 중",
      company: "",
    },
    {
      type: "education",
      period: "2016.03 ~ 2024.02",
      title: "조선대학교 수학과",
      subtitle: "학사 학위",
      result: "졸업",
      company: "",
    },
  ];

  // 스킬 스타일링 헬퍼 함수
  const getSkillStyles = (skill) => {
    const isMainSkill = MAIN_SKILLS.includes(skill);
    return {
      className: `font-light tracking-wide cursor-pointer relative ${
        isMainSkill ? "text-gray-900 font-medium" : "text-gray-600"
      }`,
      hoverColor: isMainSkill ? "#000000" : "#1f2937",
      underlineClass: "bg-gray-900",
    };
  };

  // 아이콘 컴포넌트 렌더링
  const renderTimelineIcon = (item) => {
    if (item.type === "award") {
      return (
        <Award className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors duration-300" />
      );
    }
    if (item.type === "education") {
      return (
        <GraduationCap className="w-4 h-4 text-gray-400 group-hover:text-gray-800 transition-colors duration-300" />
      );
    }
    return null;
  };

  // 스킬 아이템 렌더링
  const renderSkillItem = (skill, skillIndex, categoryIndex) => {
    const { className, hoverColor, underlineClass } = getSkillStyles(skill);
    const animationDelay =
      ANIMATION_CONFIG.delays.base +
      categoryIndex * ANIMATION_CONFIG.delays.category +
      skillIndex * ANIMATION_CONFIG.delays.skill;

    return (
      <motion.div
        key={skillIndex}
        className="relative"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          delay: animationDelay,
          type: "spring",
          stiffness: 100,
        }}
      >
        <motion.span
          className={className}
          whileHover={{
            color: hoverColor,
            x: 4,
            transition: { duration: 0.2 },
          }}
        >
          {skill}
          <motion.div
            className={`absolute bottom-0 left-0 w-0 h-px ${underlineClass}`}
            whileHover={{
              width: "100%",
              transition: { duration: 0.3 },
            }}
          />
        </motion.span>
      </motion.div>
    );
  };

  // 스킬 카테고리 렌더링
  const renderSkillCategory = (category, index) => {
    const IconComponent = category.icon;

    return (
      <motion.div key={index} variants={itemVariants} className="group">
        <motion.div
          className="flex items-center mb-6 cursor-pointer"
          whileHover={{ x: 8 }}
          transition={ANIMATION_CONFIG.spring}
        >
          <IconComponent className="w-5 h-5 text-gray-700 mr-4" />
          <h4 className="text-lg font-medium text-gray-900 tracking-wide">
            {category.title}
          </h4>
        </motion.div>

        <div className="space-y-3 ml-9">
          {category.skills.map((skill, skillIndex) =>
            renderSkillItem(skill, skillIndex, index)
          )}
        </div>
      </motion.div>
    );
  };

  // 타임라인 아이템 렌더링
  const renderTimelineItem = (item, index) => (
    <motion.div
      key={index}
      variants={itemVariants}
      className="relative flex items-start group cursor-pointer"
      whileHover={{
        x: 8,
        transition: ANIMATION_CONFIG.spring,
      }}
    >
      {/* 타임라인 포인트 */}
      <motion.div
        className="relative z-10 w-4 h-4 bg-white border-2 border-gray-300 rounded-full mr-8 mt-2 transition-colors duration-300"
        whileHover={{ scale: 1.2 }}
      >
        <motion.div className="absolute inset-0.5 bg-gray-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* 컨텐츠 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500 tracking-wide">
            {item.period}
          </span>
          {renderTimelineIcon(item)}
        </div>

        <h4 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-gray-700 transition-colors duration-300">
          {item.title}
        </h4>

        <p className="text-gray-600 font-light mb-2">{item.subtitle}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            {item.result}
          </span>
          {item.company && (
            <span className="text-xs text-gray-500 font-light">
              {item.company}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      ref={ref}
      className="min-h-screen bg-white py-32 relative overflow-hidden"
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
            variants={itemVariants}
            className="text-6xl md:text-7xl font-light text-gray-900 mb-8 tracking-tight"
          >
            About Me
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-16 h-px bg-gray-900 mx-auto"
          />
        </motion.div>

        {/* 메인 레이아웃 - 2열 그리드 */}
        <div className="grid lg:grid-cols-5 gap-16">
          {/* 왼쪽: Skills - 2/5 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2 space-y-12"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-light text-gray-900 mb-12 tracking-wide"
            >
              Technical Skills
            </motion.h3>

            {skillCategories.map(renderSkillCategory)}
          </motion.div>

          {/* 오른쪽: Timeline - 3/5 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-light text-gray-900 mb-12 tracking-wide"
            >
              Journey & Achievements
            </motion.h3>

            {/* 타임라인 */}
            <div className="relative">
              {/* 세로 라인 */}
              <motion.div
                className="absolute left-8 top-0 w-px bg-gray-200"
                initial={{ height: 0 }}
                animate={isInView ? { height: "100%" } : {}}
                transition={{
                  duration: ANIMATION_CONFIG.duration.timeline,
                  delay: ANIMATION_CONFIG.duration.timelineDelay,
                }}
              />

              <div className="space-y-12">
                {achievements.map(renderTimelineItem)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
