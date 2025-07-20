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
  const [fireworksActive, setFireworksActive] = useState(false);
  const [particles, setParticles] = useState([]);
  const [hasClickedBefore, setHasClickedBefore] = useState(false);
  const { scrollY } = useScroll();

  const sectionFade = useTransform(scrollY, [200, 500], [0, 1]);
  const sectionEnterY = useTransform(scrollY, [200, 500], [50, 0]);
  const skillsFade = useTransform(scrollY, [1200, 1800], [1, 0]);
  const skillsExitY = useTransform(scrollY, [1200, 1800], [0, -80]);
  const timelineFade = useTransform(scrollY, [1200, 1800], [1, 0]);
  const timelineExitY = useTransform(scrollY, [1200, 1800], [0, 100]);

  const MAIN_SKILLS = useMemo(() => ["React.js", "JavaScript"], []);

  const ANIMATION_CONFIG = useMemo(
    () => ({
      spring: { stiffness: 400, damping: 25 },
      delays: { base: 0.3, category: 0.1, skill: 0.05 },
      duration: { timeline: 1, timelineDelay: 0.5 },
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

  const triggerFireworks = useCallback((e) => {
    const centerX = e.clientX || window.innerWidth / 2;
    const centerY = e.clientY || window.innerHeight / 2;
    const newParticles = Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * 2 * Math.PI;
      const radius = Math.random() * 150 + 100;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      const delay = i * 0.01;
      const size = Math.random() * 10 + 10;
      return {
        id: i,
        x,
        y,
        startX: centerX,
        startY: centerY,
        delay,
        size,
        color: ["#facc15", "#f43f5e", "#f97316", "#fef08a"][i % 4],
      };
    });
    setParticles(newParticles);
    setFireworksActive(true);
    setHasClickedBefore(true);
    setTimeout(() => setFireworksActive(false), 1400);
  }, []);

  const renderFireworks = useCallback(
    () => (
      <AnimatePresence>
        {fireworksActive && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  left: p.startX,
                  top: p.startY,
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  x: p.x - p.startX,
                  y: p.y - p.startY,
                  opacity: [1, 0.5, 0],
                  scale: 0.5,
                }}
                transition={{ duration: 2.8, delay: p.delay }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    ),
    [fireworksActive, particles]
  );

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
        onClick={(e) => {
          if (item.type === "award") {
            triggerFireworks(e);
          }
        }}
      >
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
    [itemVariants, triggerFireworks, renderTimelineIcon]
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

        <div className="grid lg:grid-cols-5 gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ y: skillsExitY, opacity: skillsFade }}
            className="lg:col-span-2 space-y-12"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-light text-gray-900 mb-12 tracking-wide"
            >
              Technical Skills
            </motion.h3>
            {skillCategories.map((category, index) => (
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
                  <category.icon className="w-5 h-5 text-gray-700 mr-4 transition-colors duration-200 ease-out" />
                  <h4 className="text-lg font-medium text-gray-900 tracking-wide">
                    {category.title}
                  </h4>
                </motion.div>
                <div className="space-y-3 ml-9">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay:
                          ANIMATION_CONFIG.delays.base +
                          index * ANIMATION_CONFIG.delays.category +
                          skillIndex * ANIMATION_CONFIG.delays.skill,
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 0.8,
                      }}
                    >
                      <motion.span
                        className={`font-light tracking-wide cursor-pointer relative ${
                          MAIN_SKILLS.includes(skill)
                            ? "text-gray-900 font-medium"
                            : "text-gray-600"
                        }`}
                        whileHover={{
                          color: MAIN_SKILLS.includes(skill)
                            ? "#000000"
                            : "#1f2937",
                          x: 4,
                          transition: { duration: 0.2, ease: "easeOut" },
                        }}
                      >
                        {skill}
                        <motion.div
                          className={`absolute bottom-0 left-0 w-0 h-px ${
                            MAIN_SKILLS.includes(skill)
                              ? "bg-gray-900"
                              : "bg-gray-900"
                          }`}
                          whileHover={{
                            width: "100%",
                            transition: {
                              duration: 0.3,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            },
                          }}
                        />
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ y: timelineExitY, opacity: timelineFade }}
            className="lg:col-span-3"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-light text-gray-900 mb-12 tracking-wide"
            >
              Journey & Achievements
            </motion.h3>
            <div className="relative">
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
      {renderFireworks()}
    </motion.section>
  );
}
