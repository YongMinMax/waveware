import { useRef, useEffect, useState } from "react";
import HeroSection from "../kwon/main/HeroSection";
import HeroSection1 from "../kwon/main/HeroSection1";

import Career from "../kwon/main/career";
import CompanyLongScrollPage from "../potato/components/companyLongScrollPage";
import SkillPage, { SkillIntroPage, SkillTogglePage, useIsMobile } from "../potato/components/skillPage";
import { IndustrySection } from "../potato/components/skillPage copy";
import Layout from "../layouts/Layout";
import { useInView } from "framer-motion";

export default function Home() {
  // 스크롤을 잠구는 state
  const [isScrollLock, setIsScrollLock] = useState(false);
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
      // 스크롤 락
      if (isScrollLock) return;

      // 스크롤 이벤트 쓰로틀링
      if (isThrottled) return;
      isThrottled = true;
      setTimeout(() => (isThrottled = false), THROTTLE_TIME);

      const isDown = e.deltaY > 0;
      const p = getPos();

      if (isDown) {
        // 아래로 스크롤 - 다음 섹션의 시작점으로
        if (p.scroll < p.vh * 0.5) {
          // Hero → Skill
          scrollTo(refs.skill, "start");
        } else if (p.scroll >= p.skill.top + p.skill.height - p.vh * 1.3 && p.scroll < p.company.top) {
          // Skill → Company
          scrollTo(refs.company, "start");
        } else if (p.scroll >= p.company.top + p.company.height - p.vh * 1.3 && p.scroll < p.career.top) {
          // Company → Career
          scrollTo(refs.career, "start");
        } else if (p.scroll >= p.career.top && p.scroll < p.career.top + p.vh * 0.2) {
          // Carrer → Footer
          window.scrollTo({
            top: document.documentElement.scrollHeight, // 문서의 전체 높이
            behavior: "smooth", // 부드럽게 스크롤
          });
        }
      } else {
        // 위로 스크롤 - 이전 섹션의 끝점으로
        if (p.scroll >= p.career.top + p.vh * 0.2) {
          // Footer → Career
          scrollTo(refs.career, "end");
        } else if (p.scroll >= p.career.top && p.scroll < p.career.top + p.vh * 0.2) {
          // Career → Company
          scrollTo(refs.company, "end");
        } else if (p.scroll >= p.company.top - THRESHOLD * 10 && p.scroll < p.company.top + THRESHOLD * 30) {
          // Company → Skill
          scrollTo(refs.skill, "end");
        } else if (p.scroll <= p.vh + THRESHOLD * 30) {
          // Skill → Hero
          scrollTo(refs.hero, "end");
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [isScrollLock]);

  // 섹션 구성
  const sections = [
    { ref: refs.hero, component: <HeroSection /> },
    // { ref: refs.hero, component: <HeroSection1 /> },
    { ref: refs.skill, component: <SkillTogglePage handleScrollLock={{ isScrollLock, setIsScrollLock }} /> },
    { ref: refs.company, component: <CompanyLongScrollPage /> },
    { ref: refs.career, component: <Career /> },
    // { ref: refs.industry, component: <IndustrySection /> },
  ];

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroTop = refs.hero.current?.getBoundingClientRect().top;
      const heroBottom = refs.hero.current?.getBoundingClientRect().bottom;
      const careerTop = refs.career.current?.getBoundingClientRect().top;
      const careerBottom = refs.career.current?.getBoundingClientRect().bottom;

      const isHeroTouchingTop = heroTop <= 0 && heroBottom >= 0.1;
      const isCareerTouchingTop = careerTop <= 0 && careerBottom >= 0;

      setIsDark(isHeroTouchingTop || isCareerTouchingTop);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 상태 체크

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout title={"Home | waveware"} isDark={isDark}>
      {sections.map((section, index) => (
        <div key={index} ref={section.ref} className="w-full min-h-screen ">
          {section.component}
        </div>
      ))}
    </Layout>
  );
}
