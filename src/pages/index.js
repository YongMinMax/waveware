import { useRef, useEffect } from "react";
import HeroSection from "../kwon/main/HeroSection";
import Career from "../kwon/main/career";
import CompanyLongScrollPage from "../potato/components/companyLongScrollPage";
import SkillPage from "../potato/components/skillPage";

export default function Home() {
  const heroRef = useRef(null);
  const longScrollRef = useRef(null);
  const skillRef = useRef(null);
  const careerRef = useRef(null);

  useEffect(() => {
    let lastScrollTime = 0;

    const handleScroll = (e) => {
      const now = Date.now();
      if (now - lastScrollTime < 800) return;
      lastScrollTime = now;

      const delta = e.deltaY;
      const currentScroll = window.scrollY;
      const vh = window.innerHeight;

      const heroTop = heroRef.current?.offsetTop ?? 0;
      const longScrollTop = longScrollRef.current?.offsetTop ?? 0;
      const longScrollHeight = longScrollRef.current?.offsetHeight ?? 0;
      const skillTop = skillRef.current?.offsetTop ?? 0;
      const careerTop = careerRef.current?.offsetTop ?? 0;

      // Hero → Company
      if (currentScroll < vh * 0.5 && delta > 0) {
        longScrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      // Company → Skill
      if (
        currentScroll >= longScrollTop + longScrollHeight - vh &&
        currentScroll < skillTop &&
        delta > 0
      ) {
        skillRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      // Skill → Career
      if (currentScroll >= skillTop + 0.5 * vh && delta > 0) {
        careerRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      // Career → Skill
      if (
        currentScroll >= careerTop &&
        delta < 0 &&
        currentScroll <= careerTop + vh
      ) {
        skillRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }

      // Skill → Company
      if (
        currentScroll >= skillTop &&
        delta < 0 &&
        currentScroll <= skillTop + 100
      ) {
        longScrollRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }

      // Company → Hero
      if (currentScroll <= vh + 100 && delta < 0) {
        heroRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div ref={heroRef} className="w-full min-h-screen">
        <HeroSection />
      </div>

      <div ref={longScrollRef} className="w-full min-h-screen">
        <CompanyLongScrollPage />
      </div>

      <div ref={skillRef} className="w-full min-h-screen">
        <SkillPage />
      </div>

      <div ref={careerRef} className="w-full min-h-screen">
        <Career />
      </div>
    </main>
  );
}
