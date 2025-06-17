import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ScrollButtons() {
  const [showButtons, setShowButtons] = useState(false)

  // 스크롤 위치에 따라 버튼 표시/숨김
  useEffect(() => {
    const handleScroll = () => {
      setShowButtons(window.scrollY > 300) // 300px 스크롤 후 표시
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 맨 위로 이동
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // 맨 아래로 이동
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }

  if (!showButtons) return null

  return (
    <motion.div
      className="fixed right-8 bottom-8 z-40 flex flex-col space-y-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {/* 맨 위로 버튼 */}
      <motion.button
        onClick={scrollToTop}
        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center group"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <svg 
          className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 15l7-7 7 7" 
          />
        </svg>
      </motion.button>

      {/* 맨 아래로 버튼 */}
      <motion.button
        onClick={scrollToBottom}
        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center group"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <svg 
          className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </motion.button>
    </motion.div>
  )
}