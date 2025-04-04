import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuColor, setMenuColor] = useState("text-white");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 초기 로드 시 헤더를 숨겨둡니다
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500); // 5분할 애니메이션 이후에 나타나도록 설정

    return () => clearTimeout(timer);
  }, []);

  const isActive = (href) => {
    if (href.startsWith("#")) {
      return router.asPath === href
        ? `${menuColor}`
        : `${menuColor} hover:opacity-80`;
    }
    return router.asPath.startsWith("/" + href)
      ? `${menuColor}`
      : `${menuColor} hover:opacity-80`;
  };

  useEffect(() => {
    // 메인 페이지가 아닌 경우 메뉴 색상을 검은색으로 설정
    if (router.pathname !== "/") {
      setMenuColor("text-black");
      return;
    }

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        // 헤더 표시/숨김 로직
        if (window.scrollY > lastScrollY) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
        setLastScrollY(window.scrollY);

        // 현재 스크롤 위치 (화면 중앙 기준)
        const viewportHeight = window.innerHeight;
        const currentScrollMiddle = window.scrollY + viewportHeight / 2;

        // 각 섹션의 위치 가져오기
        const sections = document.querySelectorAll(".w-full.min-h-screen");
        let isInWhiteTextSection = false;

        sections.forEach((section, index) => {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          // HeroSection, Career에 해당하는 섹션인지 확인 (CompanyLongScrollPage, SkillIntroPage, SkillPage는 제외)
          if (index === 0 || index === 4) {
            // 1번째와 5번째 섹션
            if (
              currentScrollMiddle >= sectionTop &&
              currentScrollMiddle <= sectionBottom
            ) {
              isInWhiteTextSection = true;
            }
          }
        });

        // 메뉴 색상 설정
        setMenuColor(isInWhiteTextSection ? "text-white" : "text-black");

        console.log("Current scroll middle:", currentScrollMiddle);
        console.log("Menu color:", isInWhiteTextSection ? "white" : "black");
      }
    };

    // 초기 실행
    handleScroll();

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, router.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 flex justify-between items-center px-[100px] py-1 transition-all duration-500 z-10
      ${showHeader ? "translate-y-0" : "-translate-y-full"}
      ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* 로고 */}
      <Link
        href="/"
        className="text-primary text-[48px] font-bold font-pistara"
      >
        waveware
      </Link>

      {/* 메뉴 */}
      <nav>
        <ul className="flex space-x-8 text-lg">
          <li>
            <Link
              href="/company"
              className={`transition-colors duration-300 ${isActive(
                "company"
              )}`}
            >
              Company
            </Link>
          </li>
          {/*<li><Link href="/technology" className={isActive('technology')}>Technology</Link></li>*/}
          <li>
            <Link
              href="/history"
              className={`transition-colors duration-300 ${isActive(
                "history"
              )}`}
            >
              History
            </Link>
          </li>
          <li>
            <Link
              href="/career"
              className={`transition-colors duration-300 ${isActive("career")}`}
            >
              Career
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`transition-colors duration-300 ${isActive(
                "contact"
              )}`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
