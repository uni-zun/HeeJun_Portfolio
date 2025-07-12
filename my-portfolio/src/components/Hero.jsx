import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // 해체 애니메이션 (추가된 부분)
  const textFade = useTransform(scrollY, [0, 400], [1, 0]);
  const textExitY = useTransform(scrollY, [0, 400], [0, -80]);
  const imageFade = useTransform(scrollY, [0, 400], [1, 0]);
  const imageExitY = useTransform(scrollY, [0, 400], [0, 100]);

  // 마우스 인터랙션
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (clientY - innerHeight / 2) / (innerHeight / 2);
      mouseX.set(x * 8);
      mouseY.set(y * 8);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={ref}
      className="h-screen flex items-center justify-center relative bg-gradient-to-br from-white via-gray-200 to-gray-800 overflow-hidden"
    >
      {/* 파티클 */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-gray-400/30 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full mb-50 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* 프로필 이미지 */}
          <motion.div
            style={{
              y: imageExitY,
              opacity: imageFade,
              x: mouseXSpring,
              rotateY: useTransform(mouseXSpring, [-8, 8], [-2, 2]),
            }}
            initial={{ opacity: 0, x: -100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 1,
              type: "spring",
              stiffness: 100,
            }}
            className="flex justify-center md:justify-end"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
          >
            <div className="w-[350px] md:w-[450px] lg:w-[520px] aspect-[440/566] relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-black/5 blur-xl transform translate-x-2 translate-y-2"
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 border border-gray-300/0 rounded-lg"
                whileHover={{
                  borderColor: "rgb(156 163 175 / 0.3)",
                  transition: { duration: 0.3 },
                }}
              />
              <img
                src="/images/profile.png"
                alt="윤희준 프로필"
                className="w-full h-full object-contain drop-shadow-2xl relative z-10 transition-all duration-300 group-hover:drop-shadow-3xl"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 60%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 60%, transparent 100%)",
                }}
              />
            </div>
          </motion.div>

          {/* 텍스트 콘텐츠 */}
          <motion.div
            style={{
              y: textExitY,
              opacity: textFade,
              x: useTransform(mouseXSpring, [-8, 8], [2, -2]),
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.5,
              duration: 1,
              type: "spring",
              stiffness: 80,
            }}
            className="space-y-8 text-center md:text-left"
          >
            {/* 메인 멘트 */}
            <div className="space-y-2">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                꾸준히 성장하는
                <br />
                프론트엔드 개발자
                <br />
                <motion.span
                  className="font-bold text-gray-900 bg-gradient-to-r from-gray-700 via-gray-900 to-black bg-clip-text text-transparent inline-block mt-2 text-5xl md:text-6xl lg:text-7xl relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  윤희준
                </motion.span>{" "}
                <span className="text-gray-800">입니다.</span>
              </motion.h1>
            </div>

            {/* 서브 멘트 - 여기가 수정된 부분! */}
            <motion.div
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-light leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              보이는 화면 그 너머,
              <br />
              사용자에게{" "}
              <motion.span
                className="font-medium text-gray-800 relative inline-block"
                whileHover={{
                  color: "#1f2937",
                  transition: { duration: 0.2 },
                }}
              >
                '편하게 느껴지는 경험'
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                />
              </motion.span>
              을<br />
              만드는 개발을 지향합니다.
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 웨이브 */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-full h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.5"
            d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path fill="#ffffff" d="M0,0 C480,80 960,0 1440,80 L1440,0 L0,0 Z" />
        </svg>
      </div>
    </section>
  );
}
