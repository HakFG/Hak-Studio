import About from "@/components/About";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import GameJams from "@/components/GameJams";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Blog />
        <GameJams />
        <About />
        <Contact />
      </main>
    </>
  );
}
