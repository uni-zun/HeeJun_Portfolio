import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const textY = useTransform(scrollYProgress, [0, 1], [-150, 150])
  const imageY = useTransform(scrollYProgress, [0, 1], [-100, 100])

  return (
    <section
      ref={ref}
      className="h-screen flex items-center justify-center relative bg-gradient-to-br from-white via-gray-200 to-gray-800 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 w-full mb-50">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* 왼쪽 - 프로필 이미지 */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div className="w-[350px] md:w-[450px] lg:w-[520px] aspect-[440/566]">
              <img
                src="/images/profile.png"
                alt="윤희준 프로필"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* 오른쪽 - 텍스트 콘텐츠 */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8 text-center md:text-left"
          >
            {/* 메인 멘트 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-800 leading-tight">
              꾸준히 성장하는<br />
              프론트엔드 개발자{' '}
              <span className="font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-black bg-clip-text block mt-3">
                윤희준
              </span>
              입니다.
            </h1>

            {/* 서브 멘트 */}
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-light leading-relaxed">
              보이는 화면 그 너머,<br />
              사용자에게{' '}
              <span className="font-medium text-gray-800">'편하게 느껴지는 경험'</span>을<br />
              만드는 개발을 지향합니다.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-700 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}