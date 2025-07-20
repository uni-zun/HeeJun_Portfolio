// src/pages/Home.jsx
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ScrollButtons from "../components/ScrollButtons";
import AboutMe from "../components/AboutMe";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ScrollButtons />

      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <AboutMe />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

export default Home;
