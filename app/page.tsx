import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Experience from "@/components/Experience/Experience";
import Achievements from "@/components/Achievements/Achievements";
import Projects from "@/components/Projects/Projects";
import Skills from "@/components/Skills/Skills";
import Contact from "@/components/Contact/Contact";
import LoaderWrapper from "@/components/shared/LoaderWrapper";

export default function Home() {
  return (
    <LoaderWrapper>
      <main className="relative overflow-x-hidden">
        <Hero />
        <About />
        <Experience />
        <Achievements />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </LoaderWrapper>
  );
}
