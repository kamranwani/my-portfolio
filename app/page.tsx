import Hero from "./features/hero/Hero";
import About from "./features/about/About";
import Skills from "./features/skills/Skills";
import Exploring from "./features/exploring/Exploring";
import Experience from "./features/experience/Experience";
import Projects from "./features/projects/Projects";
import Contact from "./features/contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Exploring />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
