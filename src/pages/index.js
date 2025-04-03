import { useRef, useEffect } from "react";
import HeroSection from "../kwon/main/HeroSection";
import Career from "../kwon/main/career";
import CompanyLongScrollPage from "../potato/components/companyLongScrollPage";
import SkillPage, { SkillIntroPage } from "../potato/components/skillPage";

export default function Home() {
  const heroRef = useRef(null);
  const longScrollRef = useRef(null);
  const skillRef = useRef(null);
  const skillIntroRef = useRef(null);
  const careerRef = useRef(null);

  useEffect(() => {
    let isThrottled = false;

    const handleScroll = (e) => {
      if (isThrottled) return;
      isThrottled = true;
      setTimeout(() => (isThrottled = false), 500);

      const delta = e.deltaY;
      const currentScroll = window.scrollY;
      const vh = window.innerHeight;

      const heroTop = heroRef.current?.offsetTop ?? 0;
      const longScrollTop = longScrollRef.current?.offsetTop ?? 0;
      const longScrollHeight = longScrollRef.current?.offsetHeight ?? 0;
      const skillTop = skillRef.current?.offsetTop ?? 0;
      const skillIntroTop = skillIntroRef.current?.offsetTop ?? 0;
      const skillIntroHeight = skillIntroRef.current?.offsetHeight ?? 0;
      const careerTop = careerRef.current?.offsetTop ?? 0;

      // Hero → Company (아래)
      if (currentScroll < vh * 0.5 && delta > 0) {
        longScrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      // Company → SkillIntro (아래)
      if (currentScroll >= longScrollTop + longScrollHeight - vh * 1.5 && currentScroll < skillIntroTop && delta > 0) {
        skillIntroRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      // SkillIntro → Skill (아래)
      if (currentScroll >= skillIntroTop + skillIntroHeight - vh * 1.5 && currentScroll < skillTop && delta > 0) {
        skillRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      // Skill → Career (아래)
      if (currentScroll >= skillTop && currentScroll < skillTop + vh && delta > 0) {
        careerRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      // Career → Skill (위로)
      if (currentScroll >= careerTop && delta < 0 && currentScroll < careerTop + vh) {
        skillRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      // Skill → SkillIntro (위로)
      if (currentScroll >= skillTop && delta < 0 && currentScroll < skillTop + 10) {
        skillIntroRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      // SkillIntro → Company (위로)
      if (currentScroll >= skillIntroTop && delta < 0 && currentScroll < skillIntroTop + 10) {
        longScrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }

      // Company → Hero (위로)
      if (currentScroll <= vh + 10 && delta < 0) {
        heroRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <div ref={heroRef} className="w-full min-h-screen">
        <HeroSection />
      </div>

      <div ref={longScrollRef} className="w-full min-h-screen">
        <CompanyLongScrollPage />
      </div>

      <div ref={skillIntroRef} className="w-full min-h-screen">
        <SkillIntroPage />
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
