// src/pages/Home.jsx
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section id="home">
        <Hero />
      </section>
      
      {/* 다음 섹션들이 여기에 들어갈 예정 */}
      <section id="about" className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-gray-600">About 섹션이 여기에 들어갈 예정입니다</p>
        </div>
      </section>
      
      <section id="projects" className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Projects</h2>
          <p className="text-gray-600">Projects 섹션이 여기에 들어갈 예정입니다</p>
        </div>
      </section>
      
      <section id="contact" className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-600">Contact 섹션이 여기에 들어갈 예정입니다</p>
        </div>
      </section>
    </div>
  )
}

export default Home