import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useMemo, useCallback } from "react";
import { Code, Layers, Settings, Award, GraduationCap } from "lucide-react";

export default function AboutMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [hasClickedBefore, setHasClickedBefore] = useState(false);

  // 스크롤 기반 페이드아웃 효과
  const { scrollY } = useScroll();

  // AboutMe 진입 효과 & 퇴장 효과
  const sectionFade = useTransform(scrollY, [200, 500], [0, 1]);
  const sectionEnterY = useTransform(scrollY, [200, 500], [50, 0]);

  // AboutMe 퇴장 효과
  const skillsFade = useTransform(scrollY, [1200, 1800], [1, 0]);
  const skillsExitY = useTransform(scrollY, [1200, 1800], [0, -80]);
  const timelineFade = useTransform(scrollY, [1200, 1800], [1, 0]);
  const timelineExitY = useTransform(scrollY, [1200, 1800], [0, 100]);

  // 상수 분리
  const MAIN_SKILLS = useMemo(() => ["React.js", "JavaScript"], []);

  const ANIMATION_CONFIG = useMemo(
    () => ({
      spring: { stiffness: 400, damping: 25 },
      delays: { base: 0.3, category: 0.1, skill: 0.05 },
      duration: { timeline: 1, timelineDelay: 0.5 },
      // 부드러운 애니메이션을 위한 최적화된 transition
      smoothTransition: { type: "spring", stiffness: 300, damping: 30 },
    }),
    []
  );

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08, 
          delayChildren: 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { y: 30, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 35, 
          mass: 0.8, 
        },
      },
    }),
    []
  );

  const skillCategories = useMemo(
    () => [
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
    ],
    []
  );

  const achievements = useMemo(
    () => [
      {
        type: "award",
        period: "2025.05",
        title: "디지털 사이니지 CMS",
        subtitle: "WAA Player",
        result: "우수상",
      },
      {
        type: "award",
        period: "2025.02",
        title: "웹 기반 보드게임 플랫폼",
        subtitle: "GAME PLANET",
        result: "우수상",
      },
      {
        type: "education",
        period: "2024.07 ~ 2025.06",
        title: "삼성 청년 SW AI 아카데미",
        subtitle: "12기 교육과정",
        result: "수료",
      },
      {
        type: "education",
        period: "2016.03 ~ 2024.02",
        title: "조선대학교 수학과",
        subtitle: "학사 학위",
        result: "졸업",
      },
    ],
    []
  );

  // 축하 이펙트 데이터 미리 계산
  const celebrationData = useMemo(() => {
    if (typeof window === "undefined")
      return { medals: [], diverseEmojis: [], celebrationEmojis: [] };

    const medals = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: i * 0.08,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.1,
    }));

    const celebrationEmojis = [
      "🏅",
      "🎉",
      "✨",
      "🎊",
      "🌟",
      "💫",
      "⭐",
      "🎈",
      "🎁",
      "🏆",
      "🥇",
      "👏",
      "🎯",
      "💎",
      "🔥",
      "💯",
    ];

    const diverseEmojis = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      emoji:
        celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)],
      delay: i * 0.12,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 15 + 25,
    }));

    return { medals, diverseEmojis, celebrationEmojis };
  }, []);

  // 축하 이펙트 트리거
  const triggerCelebration = useCallback(() => {
    setCelebrationActive(true);
    setHasClickedBefore(true);
    setTimeout(() => setCelebrationActive(false), 3000);
  }, []);

  // 축하 이펙트 컴포넌트
  const CelebrationEffect = useCallback(() => {
    const { medals, diverseEmojis } = celebrationData;

    return (
      <AnimatePresence mode="wait">
        {celebrationActive && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* 메달들 */}
            {medals.map((medal) => (
              <motion.div
                key={medal.id}
                className="absolute text-4xl select-none will-change-transform"
                style={{
                  left: medal.x,
                  top: medal.y,
                }}
                initial={{
                  scale: 0,
                  rotate: 0,
                  y: 0,
                }}
                animate={{
                  scale: [0, 1.3, 1],
                  rotate: 360,
                  y: -200,
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 2,
                  delay: medal.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                🏅
              </motion.div>
            ))}

            {/* 다양한 축하 이모지들 */}
            {diverseEmojis.map((item) => (
              <motion.div
                key={`emoji-${item.id}`}
                className="absolute select-none will-change-transform"
                style={{
                  left: item.x,
                  top: item.y,
                  fontSize: `${item.size}px`,
                }}
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: [0, 1.2, 0.9, 0],
                  opacity: [0, 1, 0.8, 0],
                  y: -150,
                  x: (Math.random() - 0.5) * 50,
                }}
                transition={{
                  duration: 2.2,
                  delay: item.delay,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              >
                {item.emoji}
              </motion.div>
            ))}

            {/* 반짝이 효과 */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full will-change-transform"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }, [celebrationActive, celebrationData]);

  // 스킬 스타일링 헬퍼 함수
  const getSkillStyles = useCallback(
    (skill) => {
      const isMainSkill = MAIN_SKILLS.includes(skill);
      return {
        className: `font-light tracking-wide cursor-pointer relative ${
          isMainSkill ? "text-gray-900 font-medium" : "text-gray-600"
        }`,
        hoverColor: isMainSkill ? "#000000" : "#1f2937",
        underlineClass: "bg-gray-900",
      };
    },
    [MAIN_SKILLS]
  );

  // 아이콘 컴포넌트 렌더링
  const renderTimelineIcon = useCallback((item) => {
    if (item.type === "award") {
      return (
        <Award className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors duration-300 ease-out" />
      );
    }
    if (item.type === "education") {
      return (
        <GraduationCap className="w-4 h-4 text-gray-400 group-hover:text-gray-800 transition-colors duration-300 ease-out" />
      );
    }
    return null;
  }, []);

  // 스킬 아이템 렌더링
  const renderSkillItem = useCallback(
    (skill, skillIndex, categoryIndex) => {
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
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
        >
          <motion.span
            className={className}
            whileHover={{
              color: hoverColor,
              x: 4,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
          >
            {skill}
            <motion.div
              className={`absolute bottom-0 left-0 w-0 h-px ${underlineClass}`}
              whileHover={{
                width: "100%",
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
            />
          </motion.span>
        </motion.div>
      );
    },
    [getSkillStyles, isInView, ANIMATION_CONFIG.delays]
  );

  // 스킬 카테고리 렌더링
  const renderSkillCategory = useCallback(
    (category, index) => {
      const IconComponent = category.icon;

      return (
        <motion.div key={index} variants={itemVariants} className="group">
          <motion.div
            className="flex items-center mb-6 cursor-pointer"
            whileHover={{ x: 8 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.6,
            }}
          >
            <IconComponent className="w-5 h-5 text-gray-700 mr-4 transition-colors duration-200 ease-out" />
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
    },
    [itemVariants, renderSkillItem]
  );

  // 타임라인 아이템 렌더링
  const renderTimelineItem = useCallback(
    (item, index) => (
      <motion.div
        key={index}
        variants={itemVariants}
        className={`relative flex items-start group ${
          item.type === "award" ? "cursor-pointer" : ""
        }`}
        whileHover={{
          x: 8,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.6,
          },
        }}
        onClick={() => {
          if (item.type === "award") {
            triggerCelebration();
          }
        }}
      >
        {/*클릭 힌트*/}
        {item.type === "award" && !hasClickedBefore && (
          <motion.div
            className="absolute -top-6 left-1/4 transform -translate-x-1/2 flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{
              delay: 1,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="text-gray-400 text-sm"
                animate={{ y: [0, 4, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                ↓
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 tracking-wide">
              {item.period}
            </span>
            {renderTimelineIcon(item)}
          </div>

          <div className="text-lg font-medium text-gray-900 mb-1 group-hover:text-gray-700 transition-colors duration-300 ease-out">
            {item.title}
          </div>

          <div className="text-gray-600 font-light mb-2">{item.subtitle}</div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              {item.result}
            </span>
          </div>
        </div>
      </motion.div>
    ),
    [itemVariants, hasClickedBefore, triggerCelebration, renderTimelineIcon]
  );

  return (
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
            style={{
              y: skillsExitY,
              opacity: skillsFade,
            }}
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
            style={{
              y: timelineExitY,
              opacity: timelineFade,
            }}
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
                className="absolute left-0 top-0 w-px bg-gray-200"
                initial={{ height: 0 }}
                animate={isInView ? { height: "100%" } : {}}
                transition={{
                  duration: ANIMATION_CONFIG.duration.timeline,
                  delay: ANIMATION_CONFIG.duration.timelineDelay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />

              <div className="space-y-12 pl-8">
                {achievements.map(renderTimelineItem)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 축하 이펙트 */}
      <CelebrationEffect />
    </motion.section>
  );
}
