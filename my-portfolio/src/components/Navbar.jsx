import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function SideNavbar() {
  const [activeSection, setActiveSection] = useState('home')

  // 스크롤 위치에 따른 활성 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2 // 화면 중앙 기준
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    
    // 초기 로드 시에도 체크
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 섹션 이동 함수
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const navItems = [
    { id: 'about', label: 'ABOUT ME' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' }
  ]

  return (
    <motion.nav
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="flex flex-col space-y-8">
        {navItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
          >
            <motion.button
              className={`
                group relative tracking-wider transition-all duration-300
                whitespace-nowrap text-right
                ${activeSection === item.id 
                  ? 'text-lg font-bold text-gray-900 scale-110' 
                  : 'text-sm font-medium text-gray-600 hover:text-gray-800 hover:scale-105'
                }
              `}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ x: -8 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          </motion.div>
        ))}
        
        {/* 백그라운드 인디케이터 */}
        <motion.div
          className="absolute -right-4 top-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"
          style={{ height: `${navItems.length * 3}rem` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
      </div>
    </motion.nav>
  )
}