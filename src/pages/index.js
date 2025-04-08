import { useRef, useEffect } from "react";
import HeroSection from "../kwon/main/HeroSection";
import HeroSection1 from "../kwon/main/HeroSection1";

import Career from "../kwon/main/career";
import CompanyLongScrollPage from "../potato/components/companyLongScrollPage";
import SkillPage, { SkillIntroPage, SkillTogglePage } from "../potato/components/skillPage";
import { IndustrySection } from "../potato/components/skillPage copy";

export default function Home() {
  // 섹션 참조
  const refs = {
    hero: useRef(null),
    company: useRef(null),
    skillIntro: useRef(null),
    skill: useRef(null),
    career: useRef(null),
  };

  useEffect(() => {
    let isThrottled = false;
    const THROTTLE_TIME = 500;
    const THRESHOLD = 10; // 섹션 감지를 위한 픽셀 임계값

    // 위치 계산 헬퍼
    const getPos = () => ({
      vh: window.innerHeight,
      scroll: window.scrollY,
      hero: { top: refs.hero.current?.offsetTop ?? 0 },
      company: {
        top: refs.company.current?.offsetTop ?? 0,
        height: refs.company.current?.offsetHeight ?? 0,
      },
      skillIntro: {
        top: refs.skillIntro.current?.offsetTop ?? 0,
        height: refs.skillIntro.current?.offsetHeight ?? 0,
      },
      skill: { top: refs.skill.current?.offsetTop ?? 0, height: refs.skill.current?.offsetHeight ?? 0 },
      career: { top: refs.career.current?.offsetTop ?? 0 },
    });

    // 섹션으로 스크롤 이동
    const scrollTo = (ref, block = "start") => ref.current?.scrollIntoView({ behavior: "smooth", block });

    const handleScroll = (e) => {
      // 스크롤 이벤트 쓰로틀링
      if (isThrottled) return;
      isThrottled = true;
      setTimeout(() => (isThrottled = false), THROTTLE_TIME);

      const isDown = e.deltaY > 0;
      const p = getPos();

      if (isDown) {
        // 아래로 스크롤 - 다음 섹션의 시작점으로
        if (p.scroll < p.vh * 0.5) {
          // Hero → Company
          scrollTo(refs.company, "start");
        } else if (p.scroll >= p.company.top + p.company.height - p.vh * 1.3 && p.scroll < p.skill.top) {
          // Company → Skill
          scrollTo(refs.skill, "start");
        } else if (p.scroll >= p.skill.top + p.skill.height - p.vh * 1.5 && p.scroll < p.career.top) {
          // Skill → Career
          scrollTo(refs.career, "start");
        }
      } else {
        // 위로 스크롤 - 이전 섹션의 끝점으로
        if (p.scroll >= p.career.top && p.scroll < p.career.top + p.vh) {
          // Career → Skill
          scrollTo(refs.skill, "end");
        } else if (p.scroll >= p.skill.top && p.scroll < p.skill.top + THRESHOLD) {
          // Skill → Company
          scrollTo(refs.company, "end");
        } else if (p.scroll <= p.vh + THRESHOLD * 3) {
          // Company → Hero
          scrollTo(refs.hero, "end");
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  // 섹션 구성
  const sections = [
    { ref: refs.hero, component: <HeroSection /> },
    // { ref: refs.hero, component: <HeroSection1 /> },
    { ref: refs.company, component: <CompanyLongScrollPage /> },
    // { ref: refs.skillIntro, component: <SkillIntroPage /> },
    { ref: refs.skill, component: <SkillTogglePage /> },
    { ref: refs.career, component: <Career /> },
    // { ref: refs.industry, component: <IndustrySection /> },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {sections.map((section, index) => (
        <div key={index} ref={section.ref} className="w-full min-h-screen">
          {section.component}
        </div>
      ))}
    </main>
  );
}
